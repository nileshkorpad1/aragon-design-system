import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {CdkTableModule} from '@angular/cdk/table';
import {
  createFakeEvent,
  createMouseEvent,
  dispatchMouseEvent,
  wrappedErrorMessage
} from '@angular/cdk/testing';
import {Component, ElementRef, ViewChild} from '@angular/core';
import {async, ComponentFixture, fakeAsync, inject, TestBed, tick} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Wtf2TableModule} from '../table/index';
import {
  Wtf2Sort,
  Wtf2SortHeader,
  Wtf2SortHeaderIntl,
  Wtf2SortModule,
  Sort,
  SortDirection
} from './index';
import {
  getSortDuplicateSortableIdError,
  getSortHeaderMissingIdError,
  getSortHeaderNotContainedWithinSortError,
  getSortInvalidDirectionError,
} from './sort-errors';


describe('Wtf2Sort', () => {
  let fixture: ComponentFixture<SimpleWtf2SortApp>;
  let component: SimpleWtf2SortApp;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [Wtf2SortModule, Wtf2TableModule, CdkTableModule, NoopAnimationsModule],
      declarations: [
        SimpleWtf2SortApp,
        CdkTableWtf2SortApp,
        Wtf2TableWtf2SortApp,
        Wtf2SortHeaderMissingWtf2SortApp,
        Wtf2SortDuplicateWtf2SortableIdsApp,
        Wtf2SortableMissingIdApp,
        Wtf2SortableInvalidDirection
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleWtf2SortApp);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should have the sort headers register and deregister themselves', () => {
    const sortables = component.wtf2Sort.sortables;
    expect(sortables.size).toBe(4);
    expect(sortables.get('defaultA')).toBe(component.defaultA);
    expect(sortables.get('defaultB')).toBe(component.defaultB);

    fixture.destroy();
    expect(sortables.size).toBe(0);
  });

  it('should mark itself as initialized', fakeAsync(() => {
    let isMarkedInitialized = false;
    component.wtf2Sort.initialized.subscribe(() => isMarkedInitialized = true);

    tick();
    expect(isMarkedInitialized).toBeTruthy();
  }));

  it('should use the column definition if used within a cdk table', () => {
    let cdkTableWtf2SortAppFixture = TestBed.createComponent(CdkTableWtf2SortApp);
    let cdkTableWtf2SortAppComponent = cdkTableWtf2SortAppFixture.componentInstance;

    cdkTableWtf2SortAppFixture.detectChanges();
    cdkTableWtf2SortAppFixture.detectChanges();

    const sortables = cdkTableWtf2SortAppComponent.wtf2Sort.sortables;
    expect(sortables.size).toBe(3);
    expect(sortables.has('column_a')).toBe(true);
    expect(sortables.has('column_b')).toBe(true);
    expect(sortables.has('column_c')).toBe(true);
  });

  it('should use the column definition if used within an wtf2 table', () => {
    let wtf2TableWtf2SortAppFixture = TestBed.createComponent(Wtf2TableWtf2SortApp);
    let wtf2TableWtf2SortAppComponent = wtf2TableWtf2SortAppFixture.componentInstance;

    wtf2TableWtf2SortAppFixture.detectChanges();
    wtf2TableWtf2SortAppFixture.detectChanges();

    const sortables = wtf2TableWtf2SortAppComponent.wtf2Sort.sortables;
    expect(sortables.size).toBe(3);
    expect(sortables.has('column_a')).toBe(true);
    expect(sortables.has('column_b')).toBe(true);
    expect(sortables.has('column_c')).toBe(true);
  });

  describe('checking correct arrow direction and view state for its various states', () => {
    let expectedStates: Map<string, {viewState: string, arrowDirection: string}>;

    beforeEach(() => {
      // Starting state for the view and directions - note that overrideStart is reversed to be desc
      expectedStates = new Map<string, {viewState: string, arrowDirection: string}>([
        ['defaultA', {viewState: 'asc', arrowDirection: 'asc'}],
        ['defaultB', {viewState: 'asc', arrowDirection: 'asc'}],
        ['overrideStart', {viewState: 'desc', arrowDirection: 'desc'}],
        ['overrideDisableClear', {viewState: 'asc', arrowDirection: 'asc'}],
      ]);
      component.expectViewAndDirectionStates(expectedStates);
    });

    it('should be correct when mousing over headers and leaving on mouseleave', () => {
      // Mousing over the first sort should set the view state to hint (asc)
      component.dispatchMouseEvent('defaultA', 'mouseenter');
      expectedStates.set('defaultA', {viewState: 'asc-to-hint', arrowDirection: 'asc'});
      component.expectViewAndDirectionStates(expectedStates);

      // Mousing away from the first sort should hide the arrow
      component.dispatchMouseEvent('defaultA', 'mouseleave');
      expectedStates.set('defaultA', {viewState: 'hint-to-asc', arrowDirection: 'asc'});
      component.expectViewAndDirectionStates(expectedStates);

      // Mousing over another sort should set the view state to hint (desc)
      component.dispatchMouseEvent('overrideStart', 'mouseenter');
      expectedStates.set('overrideStart', {viewState: 'desc-to-hint', arrowDirection: 'desc'});
      component.expectViewAndDirectionStates(expectedStates);
    });

    it('should be correct when mousing over header and then sorting', () => {
      // Mousing over the first sort should set the view state to hint
      component.dispatchMouseEvent('defaultA', 'mouseenter');
      expectedStates.set('defaultA', {viewState: 'asc-to-hint', arrowDirection: 'asc'});
      component.expectViewAndDirectionStates(expectedStates);

      // Clicking sort on the header should set it to be active immediately
      // (since it was already hinted)
      component.dispatchMouseEvent('defaultA', 'click');
      expectedStates.set('defaultA', {viewState: 'active', arrowDirection: 'active-asc'});
      component.expectViewAndDirectionStates(expectedStates);
    });

    it('should be correct when cycling through a default sort header', () => {
      // Sort the header to set it to the active start state
      component.sort('defaultA');
      expectedStates.set('defaultA', {viewState: 'asc-to-active', arrowDirection: 'active-asc'});
      component.expectViewAndDirectionStates(expectedStates);

      // Sorting again will reverse its direction
      component.dispatchMouseEvent('defaultA', 'click');
      expectedStates.set('defaultA', {viewState: 'active', arrowDirection: 'active-desc'});
      component.expectViewAndDirectionStates(expectedStates);

      // Sorting again will remove the sort and animate away the view
      component.dispatchMouseEvent('defaultA', 'click');
      expectedStates.set('defaultA', {viewState: 'active-to-desc', arrowDirection: 'desc'});
      component.expectViewAndDirectionStates(expectedStates);
    });

    it('should not enter sort with animations if an animations is disabled', () => {
      // Sort the header to set it to the active start state
      component.defaultA._disableViewStateAnimation = true;
      component.sort('defaultA');
      expectedStates.set('defaultA', {viewState: 'active', arrowDirection: 'active-asc'});
      component.expectViewAndDirectionStates(expectedStates);

      // Sorting again will reverse its direction
      component.defaultA._disableViewStateAnimation = true;
      component.dispatchMouseEvent('defaultA', 'click');
      expectedStates.set('defaultA', {viewState: 'active', arrowDirection: 'active-desc'});
      component.expectViewAndDirectionStates(expectedStates);
    });

    it('should be correct when sort has changed while a header is active', () => {
      // Sort the first header to set up
      component.sort('defaultA');
      expectedStates.set('defaultA', {viewState: 'asc-to-active', arrowDirection: 'active-asc'});
      component.expectViewAndDirectionStates(expectedStates);

      // Sort the second header and verify that the first header animated away
      component.dispatchMouseEvent('defaultB', 'click');
      expectedStates.set('defaultA', {viewState: 'active-to-asc', arrowDirection: 'asc'});
      expectedStates.set('defaultB', {viewState: 'asc-to-active', arrowDirection: 'active-asc'});
      component.expectViewAndDirectionStates(expectedStates);
    });

    it('should be correct when sort has been disabled', () => {
      // Mousing over the first sort should set the view state to hint
      component.disabledColumnSort = true;
      fixture.detectChanges();

      component.dispatchMouseEvent('defaultA', 'mouseenter');
      component.expectViewAndDirectionStates(expectedStates);
    });
  });

  it('should be able to cycle from asc -> desc from either start point', () => {
    component.disableClear = true;

    component.start = 'asc';
    testSingleColumnSortDirectionSequence(fixture, ['asc', 'desc']);

    // Reverse directions
    component.start = 'desc';
    testSingleColumnSortDirectionSequence(fixture, ['desc', 'asc']);
  });

  it('should be able to cycle asc -> desc -> [none]', () => {
    component.start = 'asc';
    testSingleColumnSortDirectionSequence(fixture, ['asc', 'desc', '']);
  });

  it('should be able to cycle desc -> asc -> [none]', () => {
    component.start = 'desc';
    testSingleColumnSortDirectionSequence(fixture, ['desc', 'asc', '']);
  });

  it('should allow for the cycling the sort direction to be disabled per column', () => {
    const button = fixture.nativeElement.querySelector('#defaultA button');

    component.sort('defaultA');
    expect(component.wtf2Sort.direction).toBe('asc');
    expect(button.getAttribute('disabled')).toBeFalsy();

    component.disabledColumnSort = true;
    fixture.detectChanges();

    component.sort('defaultA');
    expect(component.wtf2Sort.direction).toBe('asc');
    expect(button.getAttribute('disabled')).toBe('true');
  });

  it('should allow for the cycling the sort direction to be disabled for all columns', () => {
    const button = fixture.nativeElement.querySelector('#defaultA button');

    component.sort('defaultA');
    expect(component.wtf2Sort.active).toBe('defaultA');
    expect(component.wtf2Sort.direction).toBe('asc');
    expect(button.getAttribute('disabled')).toBeFalsy();

    component.disableAllSort = true;
    fixture.detectChanges();

    component.sort('defaultA');
    expect(component.wtf2Sort.active).toBe('defaultA');
    expect(component.wtf2Sort.direction).toBe('asc');
    expect(button.getAttribute('disabled')).toBe('true');

    component.sort('defaultB');
    expect(component.wtf2Sort.active).toBe('defaultA');
    expect(component.wtf2Sort.direction).toBe('asc');
    expect(button.getAttribute('disabled')).toBe('true');
  });

  it('should reset sort direction when a different column is sorted', () => {
    component.sort('defaultA');
    expect(component.wtf2Sort.active).toBe('defaultA');
    expect(component.wtf2Sort.direction).toBe('asc');

    component.sort('defaultA');
    expect(component.wtf2Sort.active).toBe('defaultA');
    expect(component.wtf2Sort.direction).toBe('desc');

    component.sort('defaultB');
    expect(component.wtf2Sort.active).toBe('defaultB');
    expect(component.wtf2Sort.direction).toBe('asc');
  });

  it('should throw an error if an Wtf2Sortable is not contained within an Wtf2Sort directive', () => {
    expect(() => TestBed.createComponent(Wtf2SortHeaderMissingWtf2SortApp).detectChanges())
        .toThrowError(wrappedErrorMessage(getSortHeaderNotContainedWithinSortError()));
  });

  it('should throw an error if two Wtf2Sortables have the same id', () => {
    expect(() => TestBed.createComponent(Wtf2SortDuplicateWtf2SortableIdsApp).detectChanges())
        .toThrowError(wrappedErrorMessage(getSortDuplicateSortableIdError('duplicateId')));
  });

  it('should throw an error if an Wtf2Sortable is missing an id', () => {
    expect(() => TestBed.createComponent(Wtf2SortableMissingIdApp).detectChanges())
        .toThrowError(wrappedErrorMessage(getSortHeaderMissingIdError()));
  });

  it('should throw an error if the provided direction is invalid', () => {
    expect(() => TestBed.createComponent(Wtf2SortableInvalidDirection).detectChanges())
        .toThrowError(wrappedErrorMessage(getSortInvalidDirectionError('ascending')));
  });

  it('should allow let Wtf2Sortable override the default sort parameters', () => {
    testSingleColumnSortDirectionSequence(
        fixture, ['asc', 'desc', '']);

    testSingleColumnSortDirectionSequence(
        fixture, ['desc', 'asc', ''], 'overrideStart');

    testSingleColumnSortDirectionSequence(
        fixture, ['asc', 'desc'], 'overrideDisableClear');
  });

  it('should apply the aria-labels to the button', () => {
    const button = fixture.nativeElement.querySelector('#defaultA button');
    expect(button.getAttribute('aria-label')).toBe('Change sorting for defaultA');
  });

  it('should toggle indicator hint on button focus/blur and hide on click', () => {
    const header = fixture.componentInstance.defaultA;
    const button = fixture.nativeElement.querySelector('#defaultA button');
    const focusEvent = createFakeEvent('focus');
    const blurEvent = createFakeEvent('blur');

    // Should start without a displayed hint
    expect(header._showIndicatorHint).toBeFalsy();

    // Focusing the button should show the hint, blurring should hide it
    button.dispatchEvent(focusEvent);
    expect(header._showIndicatorHint).toBeTruthy();

    button.dispatchEvent(blurEvent);
    expect(header._showIndicatorHint).toBeFalsy();

    // Show the indicator hint. On click the hint should be hidden
    button.dispatchEvent(focusEvent);
    expect(header._showIndicatorHint).toBeTruthy();

    header._handleClick();
    expect(header._showIndicatorHint).toBeFalsy();
  });

  it('should toggle indicator hint on mouseenter/mouseleave and hide on click', () => {
    const header = fixture.componentInstance.defaultA;
    const headerElement = fixture.nativeElement.querySelector('#defaultA');
    const mouseenterEvent = createMouseEvent('mouseenter');
    const mouseleaveEvent = createMouseEvent('mouseleave');

    // Should start without a displayed hint
    expect(header._showIndicatorHint).toBeFalsy();

    // Mouse enter should show the hint, blurring should hide it
    headerElement.dispatchEvent(mouseenterEvent);
    expect(header._showIndicatorHint).toBeTruthy();

    headerElement.dispatchEvent(mouseleaveEvent);
    expect(header._showIndicatorHint).toBeFalsy();

    // Show the indicator hint. On click the hint should be hidden
    headerElement.dispatchEvent(mouseenterEvent);
    expect(header._showIndicatorHint).toBeTruthy();

    header._handleClick();
    expect(header._showIndicatorHint).toBeFalsy();
  });

  it('should apply the aria-sort label to the header when sorted', () => {
    const sortHeaderElement = fixture.nativeElement.querySelector('#defaultA');
    expect(sortHeaderElement.getAttribute('aria-sort')).toBe(null);

    component.sort('defaultA');
    fixture.detectChanges();
    expect(sortHeaderElement.getAttribute('aria-sort')).toBe('ascending');

    component.sort('defaultA');
    fixture.detectChanges();
    expect(sortHeaderElement.getAttribute('aria-sort')).toBe('descending');

    component.sort('defaultA');
    fixture.detectChanges();
    expect(sortHeaderElement.getAttribute('aria-sort')).toBe(null);
  });

  it('should re-render when the i18n labels have changed',
    inject([Wtf2SortHeaderIntl], (intl: Wtf2SortHeaderIntl) => {
      const header = fixture.debugElement.query(By.directive(Wtf2SortHeader)).nativeElement;
      const button = header.querySelector('.wtf2-sort-header-button');

      intl.sortButtonLabel = () => 'Sort all of the things';
      intl.changes.next();
      fixture.detectChanges();

      expect(button.getAttribute('aria-label')).toBe('Sort all of the things');
    })
  );

  it('should not render the arrow if sorting is disabled for that column', fakeAsync(() => {
    const sortHeaderElement = fixture.nativeElement.querySelector('#defaultA');

    // Switch sorting to a different column before asserting.
    component.sort('defaultB');
    fixture.componentInstance.disabledColumnSort = true;
    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    expect(sortHeaderElement.querySelector('.wtf2-sort-header-arrow')).toBeFalsy();
  }));

  it('should render the arrow if a disabled column is being sorted by', fakeAsync(() => {
    const sortHeaderElement = fixture.nativeElement.querySelector('#defaultA');

    component.sort('defaultA');
    fixture.componentInstance.disabledColumnSort = true;
    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    expect(sortHeaderElement.querySelector('.wtf2-sort-header-arrow')).toBeTruthy();
  }));

});

/**
 * Performs a sequence of sorting on a single column to see if the sort directions are
 * consistent with expectations. Detects any changes in the fixture to reflect any changes in
 * the inputs and resets the Wtf2Sort to remove any side effects from previous tests.
 */
function testSingleColumnSortDirectionSequence(fixture: ComponentFixture<SimpleWtf2SortApp>,
                                               expectedSequence: SortDirection[],
                                               id: SimpleWtf2SortAppColumnIds = 'defaultA') {
  // Detect any changes that were made in preparation for this sort sequence
  fixture.detectChanges();

  // Reset the sort to make sure there are no side affects from previous tests
  const component = fixture.componentInstance;
  component.wtf2Sort.active = '';
  component.wtf2Sort.direction = '';

  // Run through the sequence to confirm the order
  let actualSequence = expectedSequence.map(() => {
    component.sort(id);

    // Check that the sort event's active sort is consistent with the Wtf2Sort
    expect(component.wtf2Sort.active).toBe(id);
    expect(component.latestSortEvent.active).toBe(id);

    // Check that the sort event's direction is consistent with the Wtf2Sort
    expect(component.wtf2Sort.direction).toBe(component.latestSortEvent.direction);
    return component.wtf2Sort.direction;
  });
  expect(actualSequence).toEqual(expectedSequence);

  // Expect that performing one more sort will loop it back to the beginning.
  component.sort(id);
  expect(component.wtf2Sort.direction).toBe(expectedSequence[0]);
}

/** Column IDs of the SimpleWtf2SortApp for typing of function params in the component (e.g. sort) */
type SimpleWtf2SortAppColumnIds = 'defaultA' | 'defaultB' | 'overrideStart' | 'overrideDisableClear';

@Component({
  template: `
    <div wtf2Sort
         [wtf2SortActive]="active"
         [wtf2SortDisabled]="disableAllSort"
         [wtf2SortStart]="start"
         [wtf2SortDirection]="direction"
         [wtf2SortDisableClear]="disableClear"
         (wtf2SortChange)="latestSortEvent = $event">
      <div id="defaultA"
           #defaultA
           wtf2-sort-header="defaultA"
           [disabled]="disabledColumnSort">
        A
      </div>
      <div id="defaultB"
           #defaultB
           wtf2-sort-header="defaultB">
        B
      </div>
      <div id="overrideStart"
           #overrideStart
           wtf2-sort-header="overrideStart" start="desc">
        D
      </div>
      <div id="overrideDisableClear"
           #overrideDisableClear
           wtf2-sort-header="overrideDisableClear"
           disableClear>
        E
      </div>
    </div>
  `
})
class SimpleWtf2SortApp {
  latestSortEvent: Sort;

  active: string;
  start: SortDirection = 'asc';
  direction: SortDirection = '';
  disableClear: boolean;
  disabledColumnSort = false;
  disableAllSort = false;

  @ViewChild(Wtf2Sort, {static: false}) wtf2Sort: Wtf2Sort;
  @ViewChild('defaultA', {static: false}) defaultA: Wtf2SortHeader;
  @ViewChild('defaultB', {static: false}) defaultB: Wtf2SortHeader;
  @ViewChild('overrideStart', {static: false}) overrideStart: Wtf2SortHeader;
  @ViewChild('overrideDisableClear', {static: false}) overrideDisableClear: Wtf2SortHeader;

  constructor (public elementRef: ElementRef<HTMLElement>) { }

  sort(id: SimpleWtf2SortAppColumnIds) {
    this.dispatchMouseEvent(id, 'click');
  }

  dispatchMouseEvent(id: SimpleWtf2SortAppColumnIds, event: string) {
    const sortElement = this.elementRef.nativeElement.querySelector(`#${id}`)!;
    dispatchMouseEvent(sortElement, event);
  }

  /**
   * Checks expectations for each sort header's view state and arrow direction states. Receives a
   * map that is keyed by each sort header's ID and contains the expectation for that header's
   * states.
   */
  expectViewAndDirectionStates(
      viewStates: Map<string, {viewState: string, arrowDirection: string}>) {
    const sortHeaders = new Map([
      ['defaultA', this.defaultA],
      ['defaultB', this.defaultB],
      ['overrideStart', this.overrideStart],
      ['overrideDisableClear', this.overrideDisableClear]
    ]);

    viewStates.forEach((viewState, id) => {
      expect(sortHeaders.get(id)!._getArrowViewState()).toEqual(viewState.viewState);
      expect(sortHeaders.get(id)!._getArrowDirectionState()).toEqual(viewState.arrowDirection);
    });
  }
}


class FakeDataSource extends DataSource<any> {
  connect(collectionViewer: CollectionViewer): Observable<any[]> {
    return collectionViewer.viewChange.pipe(map(() => []));
  }
  disconnect() {}
}

@Component({
  template: `
    <cdk-table [dataSource]="dataSource" wtf2Sort>
      <ng-container cdkColumnDef="column_a">
        <cdk-header-cell *cdkHeaderCellDef #sortHeaderA wtf2-sort-header> Column A </cdk-header-cell>
        <cdk-cell *cdkCellDef="let row"> {{row.a}} </cdk-cell>
      </ng-container>

      <ng-container cdkColumnDef="column_b">
        <cdk-header-cell *cdkHeaderCellDef #sortHeaderB wtf2-sort-header> Column B </cdk-header-cell>
        <cdk-cell *cdkCellDef="let row"> {{row.b}} </cdk-cell>
      </ng-container>

      <ng-container cdkColumnDef="column_c">
        <cdk-header-cell *cdkHeaderCellDef #sortHeaderC wtf2-sort-header> Column C </cdk-header-cell>
        <cdk-cell *cdkCellDef="let row"> {{row.c}} </cdk-cell>
      </ng-container>

      <cdk-header-row *cdkHeaderRowDef="columnsToRender"></cdk-header-row>
      <cdk-row *cdkRowDef="let row; columns: columnsToRender"></cdk-row>
    </cdk-table>
  `
})
class CdkTableWtf2SortApp {
  @ViewChild(Wtf2Sort, {static: false}) wtf2Sort: Wtf2Sort;

  dataSource = new FakeDataSource();
  columnsToRender = ['column_a', 'column_b', 'column_c'];
}

@Component({
  template: `
    <wtf2-table [dataSource]="dataSource" wtf2Sort>
      <ng-container wtf2ColumnDef="column_a">
        <wtf2-header-cell *wtf2HeaderCellDef #sortHeaderA wtf2-sort-header> Column A </wtf2-header-cell>
        <wtf2-cell *wtf2CellDef="let row"> {{row.a}} </wtf2-cell>
      </ng-container>

      <ng-container wtf2ColumnDef="column_b">
        <wtf2-header-cell *wtf2HeaderCellDef #sortHeaderB wtf2-sort-header> Column B </wtf2-header-cell>
        <wtf2-cell *wtf2CellDef="let row"> {{row.b}} </wtf2-cell>
      </ng-container>

      <ng-container wtf2ColumnDef="column_c">
        <wtf2-header-cell *wtf2HeaderCellDef #sortHeaderC wtf2-sort-header> Column C </wtf2-header-cell>
        <wtf2-cell *wtf2CellDef="let row"> {{row.c}} </wtf2-cell>
      </ng-container>

      <wtf2-header-row *wtf2HeaderRowDef="columnsToRender"></wtf2-header-row>
      <wtf2-row *wtf2RowDef="let row; columns: columnsToRender"></wtf2-row>
    </wtf2-table>
  `
})
class Wtf2TableWtf2SortApp {
  @ViewChild(Wtf2Sort, {static: false}) wtf2Sort: Wtf2Sort;

  dataSource = new FakeDataSource();
  columnsToRender = ['column_a', 'column_b', 'column_c'];
}


@Component({
  template: `<div wtf2-sort-header="a"> A </div>`
})
class Wtf2SortHeaderMissingWtf2SortApp { }


@Component({
  template: `
    <div wtf2Sort>
      <div wtf2-sort-header="duplicateId"> A </div>
      <div wtf2-sort-header="duplicateId"> A </div>
    </div>
  `
})
class Wtf2SortDuplicateWtf2SortableIdsApp { }


@Component({
  template: `
    <div wtf2Sort>
      <div wtf2-sort-header> A </div>
    </div>
  `
})
class Wtf2SortableMissingIdApp { }


@Component({
  template: `
    <div wtf2Sort wtf2SortDirection="ascending">
      <div wtf2-sort-header="a"> A </div>
    </div>
  `
})
class Wtf2SortableInvalidDirection { }
