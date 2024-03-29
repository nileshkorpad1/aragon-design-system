import {Component, DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {Wtf2Chip, Wtf2ChipsModule} from './index';

describe('Chip Remove', () => {
  let fixture: ComponentFixture<TestChip>;
  let testChip: TestChip;
  let chipDebugElement: DebugElement;
  let chipNativeElement: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [Wtf2ChipsModule],
      declarations: [
        TestChip
      ]
    });

    TestBed.compileComponents();
  }));

  beforeEach(async(() => {
    fixture = TestBed.createComponent(TestChip);
    testChip = fixture.debugElement.componentInstance;
    fixture.detectChanges();

    chipDebugElement = fixture.debugElement.query(By.directive(Wtf2Chip));
    chipNativeElement = chipDebugElement.nativeElement;
  }));

  describe('basic behavior', () => {
    it('should applies the `wtf2-chip-remove` CSS class', () => {
      let buttonElement = chipNativeElement.querySelector('button')!;

      expect(buttonElement.classList).toContain('wtf2-chip-remove');
    });

    it('should emits (removed) on click', () => {
      let buttonElement = chipNativeElement.querySelector('button')!;

      testChip.removable = true;
      fixture.detectChanges();

      spyOn(testChip, 'didRemove');

      buttonElement.click();
      fixture.detectChanges();

      expect(testChip.didRemove).toHaveBeenCalled();
    });

    it('should not remove if parent chip is disabled', () => {
      let buttonElement = chipNativeElement.querySelector('button')!;

      testChip.disabled = true;
      testChip.removable = true;
      fixture.detectChanges();

      spyOn(testChip, 'didRemove');

      buttonElement.click();
      fixture.detectChanges();

      expect(testChip.didRemove).not.toHaveBeenCalled();
    });

  });
});

@Component({
  template: `
    <wtf2-chip
      [removable]="removable"
      [disabled]="disabled"
      (removed)="didRemove()"><button wtf2ChipRemove></button></wtf2-chip>
  `
})
class TestChip {
  removable: boolean;
  disabled = false;

  didRemove() {}
}
