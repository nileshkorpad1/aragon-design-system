import {Directionality} from '@angular/cdk/bidi';
import {Component} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {Wtf2NativeDateModule} from '../core';
import {DEC, FEB, JAN} from '../testing';
import {By} from '@angular/platform-browser';
import {Wtf2Calendar} from './calendar';
import {Wtf2DatepickerIntl} from './datepicker-intl';
import {Wtf2DatepickerModule} from './datepicker-module';
import {yearsPerPage} from './multi-year-view';

describe('Wtf2CalendarHeader', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        Wtf2NativeDateModule,
        Wtf2DatepickerModule,
      ],
      declarations: [
        // Test components.
        StandardCalendar,
      ],
      providers: [
        Wtf2DatepickerIntl,
        {provide: Directionality, useFactory: () => ({value: 'ltr'})},
      ],
    });

    TestBed.compileComponents();
  }));

  describe('standard calendar', () => {
    let fixture: ComponentFixture<StandardCalendar>;
    let testComponent: StandardCalendar;
    let calendarElement: HTMLElement;
    let periodButton: HTMLElement;
    let prevButton: HTMLElement;
    let nextButton: HTMLElement;
    let calendarInstance: Wtf2Calendar<Date>;

    beforeEach(() => {
      fixture = TestBed.createComponent(StandardCalendar);
      fixture.detectChanges();

      let calendarDebugElement = fixture.debugElement.query(By.directive(Wtf2Calendar));
      calendarElement = calendarDebugElement.nativeElement;
      periodButton = calendarElement.querySelector('.wtf2-calendar-period-button') as HTMLElement;
      prevButton = calendarElement.querySelector('.wtf2-calendar-previous-button') as HTMLElement;
      nextButton = calendarElement.querySelector('.wtf2-calendar-next-button') as HTMLElement;

      calendarInstance = calendarDebugElement.componentInstance;
      testComponent = fixture.componentInstance;
    });

    it('should be in month view with specified month active', () => {
      expect(calendarInstance.currentView).toBe('month');
      expect(calendarInstance.activeDate).toEqual(new Date(2017, JAN, 31));
    });

    it('should toggle view when period clicked', () => {
      expect(calendarInstance.currentView).toBe('month');

      periodButton.click();
      fixture.detectChanges();

      expect(calendarInstance.currentView).toBe('multi-year');

      periodButton.click();
      fixture.detectChanges();

      expect(calendarInstance.currentView).toBe('month');
    });

    it('should go to next and previous month', () => {
      expect(calendarInstance.activeDate).toEqual(new Date(2017, JAN, 31));

      nextButton.click();
      fixture.detectChanges();

      expect(calendarInstance.activeDate).toEqual(new Date(2017, FEB, 28));

      prevButton.click();
      fixture.detectChanges();

      expect(calendarInstance.activeDate).toEqual(new Date(2017, JAN, 28));
    });

    it('should go to previous and next year', () => {
      periodButton.click();
      fixture.detectChanges();

      expect(calendarInstance.currentView).toBe('multi-year');
      expect(calendarInstance.activeDate).toEqual(new Date(2017, JAN, 31));

      (calendarElement.querySelector('.wtf2-calendar-body-active') as HTMLElement).click();
      fixture.detectChanges();

      expect(calendarInstance.currentView).toBe('year');

      nextButton.click();
      fixture.detectChanges();

      expect(calendarInstance.activeDate).toEqual(new Date(2018, JAN, 31));

      prevButton.click();
      fixture.detectChanges();

      expect(calendarInstance.activeDate).toEqual(new Date(2017, JAN, 31));
    });

    it('should go to previous and next multi-year range', () => {
      periodButton.click();
      fixture.detectChanges();

      expect(calendarInstance.currentView).toBe('multi-year');
      expect(calendarInstance.activeDate).toEqual(new Date(2017, JAN, 31));

      nextButton.click();
      fixture.detectChanges();

      expect(calendarInstance.activeDate).toEqual(new Date(2017 + yearsPerPage, JAN, 31));

      prevButton.click();
      fixture.detectChanges();

      expect(calendarInstance.activeDate).toEqual(new Date(2017, JAN, 31));
    });

    it('should go back to month view after selecting year and month', () => {
      periodButton.click();
      fixture.detectChanges();

      expect(calendarInstance.currentView).toBe('multi-year');
      expect(calendarInstance.activeDate).toEqual(new Date(2017, JAN, 31));

      let yearCells = calendarElement.querySelectorAll('.wtf2-calendar-body-cell');
      (yearCells[0] as HTMLElement).click();
      fixture.detectChanges();

      expect(calendarInstance.currentView).toBe('year');
      expect(calendarInstance.activeDate).toEqual(new Date(2016, JAN, 31));

      let monthCells = calendarElement.querySelectorAll('.wtf2-calendar-body-cell');
      (monthCells[monthCells.length - 1] as HTMLElement).click();
      fixture.detectChanges();

      expect(calendarInstance.currentView).toBe('month');
      expect(calendarInstance.activeDate).toEqual(new Date(2016, DEC, 31));
      expect(testComponent.selected).toBeFalsy('no date should be selected yet');
    });

  });
});

@Component({
  template: `
    <wtf2-calendar
        [startAt]="startDate"
        [(selected)]="selected"
        (yearSelected)="selectedYear=$event"
        (monthSelected)="selectedMonth=$event">
    </wtf2-calendar>`
})
class StandardCalendar {
  selected: Date;
  selectedYear: Date;
  selectedMonth: Date;
  startDate = new Date(2017, JAN, 31);
}
