import {Component} from '@angular/core';
import {TestBed, async, ComponentFixture, fakeAsync, flush} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {Wtf2ToolbarModule} from './index';

describe('Wtf2Toolbar', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [Wtf2ToolbarModule],
      declarations: [ToolbarSingleRow, ToolbarMultipleRows, ToolbarMixedRowModes],
    });

    TestBed.compileComponents();
  }));

  describe('with single row', () => {
    let fixture: ComponentFixture<ToolbarSingleRow>;
    let testComponent: ToolbarSingleRow;
    let toolbarElement: HTMLElement;

    beforeEach(() => {
      fixture = TestBed.createComponent(ToolbarSingleRow);
      testComponent = fixture.debugElement.componentInstance;
      toolbarElement = fixture.debugElement.query(By.css('.wtf2-toolbar')).nativeElement;
    });

    it('should apply class based on color attribute', () => {
      testComponent.toolbarColor = 'primary';
      fixture.detectChanges();

      expect(toolbarElement.classList.contains('wtf2-primary')).toBe(true);

      testComponent.toolbarColor = 'accent';
      fixture.detectChanges();

      expect(toolbarElement.classList.contains('wtf2-primary')).toBe(false);
      expect(toolbarElement.classList.contains('wtf2-accent')).toBe(true);

      testComponent.toolbarColor = 'warn';
      fixture.detectChanges();

      expect(toolbarElement.classList.contains('wtf2-accent')).toBe(false);
      expect(toolbarElement.classList.contains('wtf2-warn')).toBe(true);
    });

    it('should not wrap the first row contents inside of a generated element', () => {
      expect(toolbarElement.firstElementChild!.tagName).toBe('SPAN',
          'Expected the <span> element of the first row to be a direct child of the toolbar');
    });
  });

  describe('with multiple rows', () => {

    it('should project each toolbar-row element inside of the toolbar', () => {
      const fixture = TestBed.createComponent(ToolbarMultipleRows);
      fixture.detectChanges();

      expect(fixture.debugElement.queryAll(By.css('.wtf2-toolbar > .wtf2-toolbar-row')).length)
        .toBe(2, 'Expected one toolbar row to be present while no content is projected.');
    });

    it('should throw an error if different toolbar modes are mixed', () => {
      expect(() => {
        const fixture = TestBed.createComponent(ToolbarMixedRowModes);
        fixture.detectChanges();
      }).toThrowError(/attempting to combine different/i);
    });

    it('should throw an error if a toolbar-row is added later', fakeAsync(() => {
      const fixture = TestBed.createComponent(ToolbarMixedRowModes);

      fixture.componentInstance.showToolbarRow = false;
      fixture.detectChanges();
      flush();

      expect(() => {
        try {
          fixture.componentInstance.showToolbarRow = true;
          fixture.detectChanges();
          flush();
        } catch {
          flush();
        }
      }).toThrowError(/attempting to combine different/i);
    }));
  });

});


@Component({
  template: `
    <wtf2-toolbar [color]="toolbarColor">
      <span>First Row</span>
    </wtf2-toolbar>
  `
})
class ToolbarSingleRow {
  toolbarColor: string;
}

@Component({
  template: `
    <wtf2-toolbar>
      <wtf2-toolbar-row>First Row</wtf2-toolbar-row>
      <wtf2-toolbar-row>Second Row</wtf2-toolbar-row>
    </wtf2-toolbar>
  `
})
class ToolbarMultipleRows {}

@Component({
  template: `
    <wtf2-toolbar>
      First Row
      <wtf2-toolbar-row *ngIf="showToolbarRow">Second Row</wtf2-toolbar-row>
    </wtf2-toolbar>
  `
})
class ToolbarMixedRowModes {
  showToolbarRow: boolean = true;
}
