import {Direction, Directionality} from '@angular/cdk/bidi';
import {
  DOWN_ARROW,
  END,
  HOME,
  LEFT_ARROW,
  PAGE_DOWN,
  PAGE_UP,
  RIGHT_ARROW,
  UP_ARROW,
} from '@angular/cdk/keycodes';
import {dispatchFakeEvent, dispatchKeyboardEvent} from '@angular/cdk/testing';
import {Component, ViewChild} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {Wtf2NativeDateModule} from '../core';
import {JAN} from '../testing';
import {By} from '@angular/platform-browser';
import {Wtf2CalendarBody} from './calendar-body';
import {Wtf2MultiYearView, yearsPerPage, yearsPerRow} from './multi-year-view';

describe('Wtf2MultiYearView', () => {
  let dir: {value: Direction};

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        Wtf2NativeDateModule,
      ],
      declarations: [
        Wtf2CalendarBody,
        Wtf2MultiYearView,

        // Test components.
        StandardMultiYearView,
        MultiYearViewWithDateFilter,
      ],
      providers: [
        {provide: Directionality, useFactory: () => dir = {value: 'ltr'}}
      ]
    });

    TestBed.compileComponents();
  }));

  describe('standard multi-year view', () => {
    let fixture: ComponentFixture<StandardMultiYearView>;
    let testComponent: StandardMultiYearView;
    let multiYearViewNativeElement: Element;

    beforeEach(() => {
      fixture = TestBed.createComponent(StandardMultiYearView);
      fixture.detectChanges();

      let multiYearViewDebugElement = fixture.debugElement.query(By.directive(Wtf2MultiYearView));
      multiYearViewNativeElement = multiYearViewDebugElement.nativeElement;
      testComponent = fixture.componentInstance;
    });

    it('has correct number of years', () => {
      let cellEls = multiYearViewNativeElement.querySelectorAll('.wtf2-calendar-body-cell')!;
      expect(cellEls.length).toBe(yearsPerPage);
    });

    it('shows selected year if in same range', () => {
      let selectedEl = multiYearViewNativeElement.querySelector('.wtf2-calendar-body-selected')!;
      expect(selectedEl.innerHTML.trim()).toBe('2020');
    });

    it('does not show selected year if in different range', () => {
      testComponent.selected = new Date(2040, JAN, 10);
      fixture.detectChanges();

      let selectedEl = multiYearViewNativeElement.querySelector('.wtf2-calendar-body-selected');
      expect(selectedEl).toBeNull();
    });

    it('fires selected change event on cell clicked', () => {
      let cellEls = multiYearViewNativeElement.querySelectorAll('.wtf2-calendar-body-cell');
      (cellEls[cellEls.length - 1] as HTMLElement).click();
      fixture.detectChanges();

      let selectedEl = multiYearViewNativeElement.querySelector('.wtf2-calendar-body-selected')!;
      expect(selectedEl.innerHTML.trim()).toBe('2039');
    });

    it('should emit the selected year on cell clicked', () => {
      let cellEls = multiYearViewNativeElement.querySelectorAll('.wtf2-calendar-body-cell');

      (cellEls[1] as HTMLElement).click();
      fixture.detectChanges();

      const normalizedYear: Date = fixture.componentInstance.selectedYear;
      expect(normalizedYear.getFullYear()).toEqual(2017);
    });

    it('should mark active date', () => {
      let cellEls = multiYearViewNativeElement.querySelectorAll('.wtf2-calendar-body-cell');
      expect((cellEls[1] as HTMLElement).innerText.trim()).toBe('2017');
      expect(cellEls[1].classList).toContain('wtf2-calendar-body-active');
    });

    describe('a11y', () => {
      it('should set the correct role on the internal table node', () => {
        const table = multiYearViewNativeElement.querySelector('table')!;
        expect(table.getAttribute('role')).toBe('presentation');
      });

      describe('calendar body', () => {
        let calendarBodyEl: HTMLElement;
        let calendarInstance: StandardMultiYearView;

        beforeEach(() => {
          calendarInstance = fixture.componentInstance;
          calendarBodyEl =
            fixture.debugElement.nativeElement.querySelector('.wtf2-calendar-body') as HTMLElement;
          expect(calendarBodyEl).not.toBeNull();
          dir.value = 'ltr';
          fixture.componentInstance.date = new Date(2017, JAN, 1);
          dispatchFakeEvent(calendarBodyEl, 'focus');
          fixture.detectChanges();
        });

        it('should decrement year on left arrow press', () => {
          dispatchKeyboardEvent(calendarBodyEl, 'keydown', LEFT_ARROW);
          fixture.detectChanges();

          expect(calendarInstance.date).toEqual(new Date(2016, JAN, 1));

          dispatchKeyboardEvent(calendarBodyEl, 'keydown', LEFT_ARROW);
          fixture.detectChanges();

          expect(calendarInstance.date).toEqual(new Date(2015, JAN, 1));
        });

        it('should increment year on right arrow press', () => {
          dispatchKeyboardEvent(calendarBodyEl, 'keydown', RIGHT_ARROW);
          fixture.detectChanges();

          expect(calendarInstance.date).toEqual(new Date(2018, JAN, 1));

          dispatchKeyboardEvent(calendarBodyEl, 'keydown', RIGHT_ARROW);
          fixture.detectChanges();

          expect(calendarInstance.date).toEqual(new Date(2019, JAN, 1));
        });

        it('should go up a row on up arrow press', () => {
          dispatchKeyboardEvent(calendarBodyEl, 'keydown', UP_ARROW);
          fixture.detectChanges();

          expect(calendarInstance.date)
            .toEqual(new Date(2017 - yearsPerRow, JAN, 1));

          dispatchKeyboardEvent(calendarBodyEl, 'keydown', UP_ARROW);
          fixture.detectChanges();

          expect(calendarInstance.date)
            .toEqual(new Date(2017 - yearsPerRow * 2, JAN, 1));
        });

        it('should go down a row on down arrow press', () => {
          dispatchKeyboardEvent(calendarBodyEl, 'keydown', DOWN_ARROW);
          fixture.detectChanges();

          expect(calendarInstance.date)
            .toEqual(new Date(2017 + yearsPerRow, JAN, 1));

          dispatchKeyboardEvent(calendarBodyEl, 'keydown', DOWN_ARROW);
          fixture.detectChanges();

          expect(calendarInstance.date)
            .toEqual(new Date(2017 + yearsPerRow * 2, JAN, 1));
        });

        it('should go to first year in current range on home press', () => {
          dispatchKeyboardEvent(calendarBodyEl, 'keydown', HOME);
          fixture.detectChanges();

          expect(calendarInstance.date).toEqual(new Date(2016, JAN, 1));

          dispatchKeyboardEvent(calendarBodyEl, 'keydown', HOME);
          fixture.detectChanges();

          expect(calendarInstance.date).toEqual(new Date(2016, JAN, 1));
        });

        it('should go to last year in current range on end press', () => {
          dispatchKeyboardEvent(calendarBodyEl, 'keydown', END);
          fixture.detectChanges();

          expect(calendarInstance.date).toEqual(new Date(2039, JAN, 1));

          dispatchKeyboardEvent(calendarBodyEl, 'keydown', END);
          fixture.detectChanges();

          expect(calendarInstance.date).toEqual(new Date(2039, JAN, 1));
        });

        it('should go to same index in previous year range page up press', () => {
          dispatchKeyboardEvent(calendarBodyEl, 'keydown', PAGE_UP);
          fixture.detectChanges();

          expect(calendarInstance.date)
            .toEqual(new Date(2017 - yearsPerPage, JAN, 1));

          dispatchKeyboardEvent(calendarBodyEl, 'keydown', PAGE_UP);
          fixture.detectChanges();

          expect(calendarInstance.date)
              .toEqual(new Date(2017 - yearsPerPage * 2, JAN, 1));
        });

        it('should go to same index in next year range on page down press', () => {
          dispatchKeyboardEvent(calendarBodyEl, 'keydown', PAGE_DOWN);
          fixture.detectChanges();

          expect(calendarInstance.date)
            .toEqual(new Date(2017 + yearsPerPage, JAN, 1));

          dispatchKeyboardEvent(calendarBodyEl, 'keydown', PAGE_DOWN);
          fixture.detectChanges();

          expect(calendarInstance.date)
            .toEqual(new Date(2017 + yearsPerPage * 2, JAN, 1));
        });

      });
    });

  });

  describe('multi year view with date filter', () => {
    let fixture: ComponentFixture<MultiYearViewWithDateFilter>;
    let multiYearViewNativeElement: Element;

    beforeEach(() => {
      fixture = TestBed.createComponent(MultiYearViewWithDateFilter);
      fixture.detectChanges();

      const multiYearViewDebugElement = fixture.debugElement.query(By.directive(Wtf2MultiYearView));
      multiYearViewNativeElement = multiYearViewDebugElement.nativeElement;
    });

    it('should disablex years with no enabled days', () => {
      const cells = multiYearViewNativeElement.querySelectorAll('.wtf2-calendar-body-cell');
      expect(cells[0].classList).not.toContain('wtf2-calendar-body-disabled');
      expect(cells[1].classList).toContain('wtf2-calendar-body-disabled');
    });
  });
});


@Component({
  template: `
    <wtf2-multi-year-view [(activeDate)]="date" [(selected)]="selected"
                         (yearSelected)="selectedYear=$event"></wtf2-multi-year-view>`
})
class StandardMultiYearView {
  date = new Date(2017, JAN, 1);
  selected = new Date(2020, JAN, 1);
  selectedYear: Date;

  @ViewChild(Wtf2MultiYearView, {static: false}) multiYearView: Wtf2MultiYearView<Date>;
}

@Component({
  template: `
    <wtf2-multi-year-view [activeDate]="activeDate" [dateFilter]="dateFilter"></wtf2-multi-year-view>
    `
})
class MultiYearViewWithDateFilter {
  activeDate = new Date(2017, JAN, 1);
  dateFilter(date: Date) {
    return date.getFullYear() !== 2017;
  }
}
