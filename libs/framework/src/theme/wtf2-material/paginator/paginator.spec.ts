import {async, ComponentFixture, TestBed, inject, tick, fakeAsync} from '@angular/core/testing';
import {Component, ViewChild} from '@angular/core';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {dispatchMouseEvent} from '@angular/cdk/testing';
import {ThemePalette} from '../core';
import {Wtf2Select} from '../select';
import {By} from '@angular/platform-browser';
import {Wtf2PaginatorModule, Wtf2Paginator, Wtf2PaginatorIntl} from './index';


describe('Wtf2Paginator', () => {
  let fixture: ComponentFixture<Wtf2PaginatorApp>;
  let component: Wtf2PaginatorApp;
  let paginator: Wtf2Paginator;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        Wtf2PaginatorModule,
        NoopAnimationsModule,
      ],
      declarations: [
        Wtf2PaginatorApp,
        Wtf2PaginatorWithoutPageSizeApp,
        Wtf2PaginatorWithoutOptionsApp,
        Wtf2PaginatorWithoutInputsApp,
        Wtf2PaginatorWithStringValues
      ],
      providers: [Wtf2PaginatorIntl]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Wtf2PaginatorApp);
    fixture.detectChanges();

    component = fixture.componentInstance;
    paginator = component.paginator;
  });

  describe('with the default internationalization provider', () => {
    it('should show the right range text', () => {
      const rangeElement = fixture.nativeElement.querySelector('.wtf2-paginator-range-label');

      // View second page of list of 100, each page contains 10 items.
      component.length = 100;
      component.pageSize = 10;
      component.pageIndex = 1;
      fixture.detectChanges();
      expect(rangeElement.innerText).toBe('11 - 20 of 100');

      // View third page of list of 200, each page contains 20 items.
      component.length = 200;
      component.pageSize = 20;
      component.pageIndex = 2;
      fixture.detectChanges();
      expect(rangeElement.innerText).toBe('41 - 60 of 200');

      // View first page of list of 0, each page contains 5 items.
      component.length = 0;
      component.pageSize = 5;
      component.pageIndex = 2;
      fixture.detectChanges();
      expect(rangeElement.innerText).toBe('0 of 0');

      // View third page of list of 12, each page contains 5 items.
      component.length = 12;
      component.pageSize = 5;
      component.pageIndex = 2;
      fixture.detectChanges();
      expect(rangeElement.innerText).toBe('11 - 12 of 12');

      // View third page of list of 10, each page contains 5 items.
      component.length = 10;
      component.pageSize = 5;
      component.pageIndex = 2;
      fixture.detectChanges();
      expect(rangeElement.innerText).toBe('11 - 15 of 10');

      // View third page of list of -5, each page contains 5 items.
      component.length = -5;
      component.pageSize = 5;
      component.pageIndex = 2;
      fixture.detectChanges();
      expect(rangeElement.innerText).toBe('11 - 15 of 0');
    });

    it('should show right aria-labels for select and buttons', () => {
      const select = fixture.nativeElement.querySelector('.wtf2-select');
      expect(select.getAttribute('aria-label')).toBe('Items per page:');

      expect(getPreviousButton(fixture).getAttribute('aria-label')).toBe('Previous page');
      expect(getNextButton(fixture).getAttribute('aria-label')).toBe('Next page');
    });

    it('should re-render when the i18n labels change',
      inject([Wtf2PaginatorIntl], (intl: Wtf2PaginatorIntl) => {
        const label = fixture.nativeElement.querySelector('.wtf2-paginator-page-size-label');

        intl.itemsPerPageLabel = '1337 items per page';
        intl.changes.next();
        fixture.detectChanges();

        expect(label.textContent!.trim()).toBe('1337 items per page');
      }));
  });

  describe('when navigating with the next and previous buttons', () => {
    it('should be able to go to the next page', () => {
      expect(paginator.pageIndex).toBe(0);

      dispatchMouseEvent(getNextButton(fixture), 'click');

      expect(paginator.pageIndex).toBe(1);
      expect(component.pageEvent).toHaveBeenCalledWith(jasmine.objectContaining({
        previousPageIndex: 0,
        pageIndex: 1
      }));
    });

    it('should be able to go to the previous page', () => {
      paginator.pageIndex = 1;
      fixture.detectChanges();
      expect(paginator.pageIndex).toBe(1);

      dispatchMouseEvent(getPreviousButton(fixture), 'click');

      expect(paginator.pageIndex).toBe(0);
      expect(component.pageEvent).toHaveBeenCalledWith(jasmine.objectContaining({
        previousPageIndex: 1,
        pageIndex: 0
      }));
    });
  });

  it('should be able to show the first/last buttons', () => {
    expect(getFirstButton(fixture))
        .toBeNull('Expected first button to not exist.');

    expect(getLastButton(fixture))
        .toBeNull('Expected last button to not exist.');

    fixture.componentInstance.showFirstLastButtons = true;
    fixture.detectChanges();

    expect(getFirstButton(fixture))
        .toBeTruthy('Expected first button to be rendered.');

    expect(getLastButton(fixture))
        .toBeTruthy('Expected last button to be rendered.');
  });

  it('should mark itself as initialized', fakeAsync(() => {
    let isMarkedInitialized = false;
    paginator.initialized.subscribe(() => isMarkedInitialized = true);

    tick();
    expect(isMarkedInitialized).toBeTruthy();
  }));

  it('should not allow a negative pageSize', () => {
    paginator.pageSize = -1337;
    expect(paginator.pageSize).toBeGreaterThanOrEqual(0);
  });

  it('should not allow a negative pageIndex', () => {
    paginator.pageSize = -42;
    expect(paginator.pageIndex).toBeGreaterThanOrEqual(0);
  });

  it('should be able to set the color of the form field', () => {
    const formField: HTMLElement = fixture.nativeElement.querySelector('.wtf2-form-field');

    expect(formField.classList).toContain('wtf2-primary');

    component.color = 'accent';
    fixture.detectChanges();

    expect(formField.classList).not.toContain('wtf2-primary');
    expect(formField.classList).toContain('wtf2-accent');
  });

  describe('when showing the first and last button', () => {

    beforeEach(() => {
      component.showFirstLastButtons = true;
      fixture.detectChanges();
    });

    it('should show right aria-labels for first/last buttons', () => {
      expect(getFirstButton(fixture).getAttribute('aria-label')).toBe('First page');
      expect(getLastButton(fixture).getAttribute('aria-label')).toBe('Last page');
    });

    it('should be able to go to the last page via the last page button', () => {
      expect(paginator.pageIndex).toBe(0);

      dispatchMouseEvent(getLastButton(fixture), 'click');

      expect(paginator.pageIndex).toBe(9);
      expect(component.pageEvent).toHaveBeenCalledWith(jasmine.objectContaining({
        previousPageIndex: 0,
        pageIndex: 9
      }));
    });

    it('should be able to go to the first page via the first page button', () => {
      paginator.pageIndex = 3;
      fixture.detectChanges();
      expect(paginator.pageIndex).toBe(3);

      dispatchMouseEvent(getFirstButton(fixture), 'click');

      expect(paginator.pageIndex).toBe(0);
      expect(component.pageEvent).toHaveBeenCalledWith(jasmine.objectContaining({
        previousPageIndex: 3,
        pageIndex: 0
      }));
    });

    it('should disable navigating to the next page if at last page', () => {
      component.goToLastPage();
      fixture.detectChanges();
      expect(paginator.pageIndex).toBe(9);
      expect(paginator.hasNextPage()).toBe(false);

      component.pageEvent.calls.reset();
      dispatchMouseEvent(getNextButton(fixture), 'click');

      expect(component.pageEvent).not.toHaveBeenCalled();
      expect(paginator.pageIndex).toBe(9);
    });

    it('should disable navigating to the previous page if at first page', () => {
      expect(paginator.pageIndex).toBe(0);
      expect(paginator.hasPreviousPage()).toBe(false);

      component.pageEvent.calls.reset();
      dispatchMouseEvent(getPreviousButton(fixture), 'click');

      expect(component.pageEvent).not.toHaveBeenCalled();
      expect(paginator.pageIndex).toBe(0);
    });

  });

  it('should mark for check when inputs are changed directly', () => {
    const rangeElement = fixture.nativeElement.querySelector('.wtf2-paginator-range-label');

    expect(rangeElement.innerText).toBe('1 - 10 of 100');

    paginator.length = 99;
    fixture.detectChanges();
    expect(rangeElement.innerText).toBe('1 - 10 of 99');

    paginator.pageSize = 6;
    fixture.detectChanges();
    expect(rangeElement.innerText).toBe('1 - 6 of 99');

    paginator.pageIndex = 1;
    fixture.detectChanges();
    expect(rangeElement.innerText).toBe('7 - 12 of 99');

    // Having one option and the same page size should remove the select menu
    expect(fixture.nativeElement.querySelector('.wtf2-select')).not.toBeNull();
    paginator.pageSize = 10;
    paginator.pageSizeOptions = [10];
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.wtf2-select')).toBeNull();
  });

  it('should default the page size options to the page size if no options provided', () => {
    const withoutOptionsAppFixture = TestBed.createComponent(Wtf2PaginatorWithoutOptionsApp);
    withoutOptionsAppFixture.detectChanges();

    expect(withoutOptionsAppFixture.componentInstance.paginator._displayedPageSizeOptions)
        .toEqual([10]);
  });

  it('should default the page size to the first page size option if not provided', () => {
    const withoutPageSizeAppFixture = TestBed.createComponent(Wtf2PaginatorWithoutPageSizeApp);
    withoutPageSizeAppFixture.detectChanges();

    expect(withoutPageSizeAppFixture.componentInstance.paginator.pageSize).toEqual(10);
  });

  it('should show a sorted list of page size options including the current page size', () => {
    expect(paginator._displayedPageSizeOptions).toEqual([5, 10, 25, 100]);

    component.pageSize = 30;
    fixture.detectChanges();
    expect(paginator.pageSizeOptions).toEqual([5, 10, 25, 100]);
    expect(paginator._displayedPageSizeOptions).toEqual([5, 10, 25, 30, 100]);

    component.pageSizeOptions = [100, 25, 10, 5];
    fixture.detectChanges();
    expect(paginator._displayedPageSizeOptions).toEqual([5, 10, 25, 30, 100]);
  });

  it('should be able to change the page size while keeping the first item present', () => {
    // Start on the third page of a list of 100 with a page size of 10.
    component.pageIndex = 4;
    component.pageSize = 10;
    component.length = 100;
    fixture.detectChanges();

    // The first item of the page should be item with index 40
    expect(paginator.pageIndex * paginator.pageSize).toBe(40);

    // The first item on the page is now 25. Change the page size to 25 so that we should now be
    // on the second page where the top item is index 25.
    component.pageEvent.calls.reset();
    paginator._changePageSize(25);

    expect(component.pageEvent).toHaveBeenCalledWith(jasmine.objectContaining({
      pageIndex: 1,
      pageSize: 25
    }));

    // The first item on the page is still 25. Change the page size to 8 so that we should now be
    // on the fourth page where the top item is index 24.
    component.pageEvent.calls.reset();
    paginator._changePageSize(8);

    expect(component.pageEvent).toHaveBeenCalledWith(jasmine.objectContaining({
      pageIndex: 3,
      pageSize: 8
    }));

    // The first item on the page is 24. Change the page size to 16 so that we should now be
    // on the first page where the top item is index 0.
    component.pageEvent.calls.reset();
    paginator._changePageSize(25);

    expect(component.pageEvent).toHaveBeenCalledWith(jasmine.objectContaining({
      pageIndex: 0,
      pageSize: 25
    }));
  });

  it('should keep track of the right number of pages', () => {
    component.pageSize = 10;
    component.length = 100;
    fixture.detectChanges();
    expect(paginator.getNumberOfPages()).toBe(10);

    component.pageSize = 10;
    component.length = 0;
    fixture.detectChanges();
    expect(paginator.getNumberOfPages()).toBe(0);

    component.pageSize = 10;
    component.length = 10;
    fixture.detectChanges();
    expect(paginator.getNumberOfPages()).toBe(1);
  });

  it('should show a select only if there are multiple options', () => {
    expect(paginator._displayedPageSizeOptions).toEqual([5, 10, 25, 100]);
    expect(fixture.nativeElement.querySelector('.wtf2-select')).not.toBeNull();

    // Remove options so that the paginator only uses the current page size (10) as an option.
    // Should no longer show the select component since there is only one option.
    component.pageSizeOptions = [];
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.wtf2-select')).toBeNull();
  });

  it('should handle the number inputs being passed in as strings', () => {
    const withStringFixture = TestBed.createComponent(Wtf2PaginatorWithStringValues);
    withStringFixture.detectChanges();

    const withStringPaginator = withStringFixture.componentInstance.paginator;
    expect(withStringPaginator.pageIndex).toEqual(0);
    expect(withStringPaginator.length).toEqual(100);
    expect(withStringPaginator.pageSize).toEqual(10);
    expect(withStringPaginator.pageSizeOptions).toEqual([5, 10, 25, 100]);
  });

  it('should be able to hide the page size select', () => {
    const element = fixture.nativeElement;

    expect(element.querySelector('.wtf2-paginator-page-size'))
        .toBeTruthy('Expected select to be rendered.');

    fixture.componentInstance.hidePageSize = true;
    fixture.detectChanges();

    expect(element.querySelector('.wtf2-paginator-page-size'))
        .toBeNull('Expected select to be removed.');
  });

  it('should be able to disable all the controls in the paginator via the binding', () => {
    const select: Wtf2Select = fixture.debugElement.query(By.directive(Wtf2Select)).componentInstance;

    fixture.componentInstance.pageIndex = 1;
    fixture.componentInstance.showFirstLastButtons = true;
    fixture.detectChanges();

    expect(select.disabled).toBe(false);
    expect(getPreviousButton(fixture).hasAttribute('disabled')).toBe(false);
    expect(getNextButton(fixture).hasAttribute('disabled')).toBe(false);
    expect(getFirstButton(fixture).hasAttribute('disabled')).toBe(false);
    expect(getLastButton(fixture).hasAttribute('disabled')).toBe(false);

    fixture.componentInstance.disabled = true;
    fixture.detectChanges();

    expect(select.disabled).toBe(true);
    expect(getPreviousButton(fixture).hasAttribute('disabled')).toBe(true);
    expect(getNextButton(fixture).hasAttribute('disabled')).toBe(true);
    expect(getFirstButton(fixture).hasAttribute('disabled')).toBe(true);
    expect(getLastButton(fixture).hasAttribute('disabled')).toBe(true);
  });

});

function getPreviousButton(fixture: ComponentFixture<any>) {
  return fixture.nativeElement.querySelector('.wtf2-paginator-navigation-previous');
}

function getNextButton(fixture: ComponentFixture<any>) {
  return fixture.nativeElement.querySelector('.wtf2-paginator-navigation-next');
}

function getFirstButton(fixture: ComponentFixture<any>) {
    return fixture.nativeElement.querySelector('.wtf2-paginator-navigation-first');
}

function getLastButton(fixture: ComponentFixture<any>) {
    return fixture.nativeElement.querySelector('.wtf2-paginator-navigation-last');
}

@Component({
  template: `
    <wtf2-paginator [pageIndex]="pageIndex"
                   [pageSize]="pageSize"
                   [pageSizeOptions]="pageSizeOptions"
                   [hidePageSize]="hidePageSize"
                   [showFirstLastButtons]="showFirstLastButtons"
                   [length]="length"
                   [color]="color"
                   [disabled]="disabled"
                   (page)="pageEvent($event)">
    </wtf2-paginator>
  `,
})
class Wtf2PaginatorApp {
  pageIndex = 0;
  pageSize = 10;
  pageSizeOptions = [5, 10, 25, 100];
  hidePageSize = false;
  showFirstLastButtons = false;
  length = 100;
  disabled: boolean;
  pageEvent = jasmine.createSpy('page event');
  color: ThemePalette;

  @ViewChild(Wtf2Paginator, {static: false}) paginator: Wtf2Paginator;

  goToLastPage() {
    this.pageIndex = Math.ceil(this.length / this.pageSize) - 1;
  }
}

@Component({
  template: `
    <wtf2-paginator></wtf2-paginator>
  `,
})
class Wtf2PaginatorWithoutInputsApp {
  @ViewChild(Wtf2Paginator, {static: false}) paginator: Wtf2Paginator;
}

@Component({
  template: `
    <wtf2-paginator [pageSizeOptions]="[10, 20, 30]"></wtf2-paginator>
  `,
})
class Wtf2PaginatorWithoutPageSizeApp {
  @ViewChild(Wtf2Paginator, {static: false}) paginator: Wtf2Paginator;
}

@Component({
  template: `
    <wtf2-paginator [pageSize]="10"></wtf2-paginator>
  `,
})
class Wtf2PaginatorWithoutOptionsApp {
  @ViewChild(Wtf2Paginator, {static: false}) paginator: Wtf2Paginator;
}

@Component({
  template: `
    <wtf2-paginator pageIndex="0"
                   pageSize="10"
                   [pageSizeOptions]="['5', '10', '25', '100']"
                   length="100">
    </wtf2-paginator>
  `
  })
class Wtf2PaginatorWithStringValues {
  @ViewChild(Wtf2Paginator, {static: false}) paginator: Wtf2Paginator;
}
