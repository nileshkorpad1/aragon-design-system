import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {Component, DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';
import {
  dispatchFakeEvent,
  dispatchKeyboardEvent,
  createKeyboardEvent,
  dispatchEvent,
} from '@angular/cdk/testing';
import {SPACE, ENTER} from '@angular/cdk/keycodes';
import {Wtf2Option, Wtf2OptionModule} from './index';

describe('Wtf2Option component', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [Wtf2OptionModule],
      declarations: [BasicOption]
    }).compileComponents();
  }));

  it('should complete the `stateChanges` stream on destroy', () => {
    const fixture = TestBed.createComponent(BasicOption);
    fixture.detectChanges();

    const optionInstance: Wtf2Option =
        fixture.debugElement.query(By.directive(Wtf2Option)).componentInstance;
    const completeSpy = jasmine.createSpy('complete spy');
    const subscription = optionInstance._stateChanges.subscribe({complete: completeSpy});

    fixture.destroy();
    expect(completeSpy).toHaveBeenCalled();
    subscription.unsubscribe();
  });

  it('should not emit to `onSelectionChange` if selecting an already-selected option', () => {
    const fixture = TestBed.createComponent(BasicOption);
    fixture.detectChanges();

    const optionInstance: Wtf2Option =
        fixture.debugElement.query(By.directive(Wtf2Option)).componentInstance;

    optionInstance.select();
    expect(optionInstance.selected).toBe(true);

    const spy = jasmine.createSpy('selection change spy');
    const subscription = optionInstance.onSelectionChange.subscribe(spy);

    optionInstance.select();
    fixture.detectChanges();

    expect(optionInstance.selected).toBe(true);
    expect(spy).not.toHaveBeenCalled();

    subscription.unsubscribe();
  });

  it('should not emit to `onSelectionChange` if deselecting an unselected option', () => {
    const fixture = TestBed.createComponent(BasicOption);
    fixture.detectChanges();

    const optionInstance: Wtf2Option =
        fixture.debugElement.query(By.directive(Wtf2Option)).componentInstance;

    optionInstance.deselect();
    expect(optionInstance.selected).toBe(false);

    const spy = jasmine.createSpy('selection change spy');
    const subscription = optionInstance.onSelectionChange.subscribe(spy);

    optionInstance.deselect();
    fixture.detectChanges();

    expect(optionInstance.selected).toBe(false);
    expect(spy).not.toHaveBeenCalled();

    subscription.unsubscribe();
  });

  it('should be able to set a custom id', () => {
    const fixture = TestBed.createComponent(BasicOption);

    fixture.componentInstance.id = 'custom-option';
    fixture.detectChanges();

    const optionInstance = fixture.debugElement.query(By.directive(Wtf2Option)).componentInstance;

    expect(optionInstance.id).toBe('custom-option');
  });

  it('should select the option when pressing space', () => {
    const fixture = TestBed.createComponent(BasicOption);
    fixture.detectChanges();

    const optionDebugElement = fixture.debugElement.query(By.directive(Wtf2Option));
    const optionNativeElement: HTMLElement = optionDebugElement.nativeElement;
    const optionInstance: Wtf2Option = optionDebugElement.componentInstance;
    const spy = jasmine.createSpy('selection change spy');
    const subscription = optionInstance.onSelectionChange.subscribe(spy);

    const event = dispatchKeyboardEvent(optionNativeElement, 'keydown', SPACE);
    fixture.detectChanges();

    expect(spy).toHaveBeenCalled();
    expect(event.defaultPrevented).toBe(true);
    subscription.unsubscribe();
  });

  it('should select the option when pressing enter', () => {
    const fixture = TestBed.createComponent(BasicOption);
    fixture.detectChanges();

    const optionDebugElement = fixture.debugElement.query(By.directive(Wtf2Option));
    const optionNativeElement: HTMLElement = optionDebugElement.nativeElement;
    const optionInstance: Wtf2Option = optionDebugElement.componentInstance;
    const spy = jasmine.createSpy('selection change spy');
    const subscription = optionInstance.onSelectionChange.subscribe(spy);

    const event = dispatchKeyboardEvent(optionNativeElement, 'keydown', ENTER);
    fixture.detectChanges();

    expect(spy).toHaveBeenCalled();
    expect(event.defaultPrevented).toBe(true);
    subscription.unsubscribe();
  });

  it('should not do anything when pressing the selection keys with a modifier', () => {
    const fixture = TestBed.createComponent(BasicOption);
    fixture.detectChanges();

    const optionDebugElement = fixture.debugElement.query(By.directive(Wtf2Option));
    const optionNativeElement: HTMLElement = optionDebugElement.nativeElement;
    const optionInstance: Wtf2Option = optionDebugElement.componentInstance;
    const spy = jasmine.createSpy('selection change spy');
    const subscription = optionInstance.onSelectionChange.subscribe(spy);

    [ENTER, SPACE].forEach(key => {
      const event = createKeyboardEvent('keydown', key);
      Object.defineProperty(event, 'shiftKey', {get: () => true});
      dispatchEvent(optionNativeElement, event);
      fixture.detectChanges();

      expect(event.defaultPrevented).toBe(false);
    });

    expect(spy).not.toHaveBeenCalled();
    subscription.unsubscribe();
  });

  describe('ripples', () => {
    let fixture: ComponentFixture<BasicOption>;
    let optionDebugElement: DebugElement;
    let optionNativeElement: HTMLElement;
    let optionInstance: Wtf2Option;

    beforeEach(() => {
      fixture = TestBed.createComponent(BasicOption);
      fixture.detectChanges();

      optionDebugElement = fixture.debugElement.query(By.directive(Wtf2Option));
      optionNativeElement = optionDebugElement.nativeElement;
      optionInstance = optionDebugElement.componentInstance;
    });

    it('should show ripples by default', () => {
      expect(optionInstance.disableRipple).toBeFalsy('Expected ripples to be enabled by default');
      expect(optionNativeElement.querySelectorAll('.wtf2-ripple-element').length)
        .toBe(0, 'Expected no ripples to show up initially');

      dispatchFakeEvent(optionNativeElement, 'mousedown');
      dispatchFakeEvent(optionNativeElement, 'mouseup');

      expect(optionNativeElement.querySelectorAll('.wtf2-ripple-element').length)
        .toBe(1, 'Expected one ripple to show up after a fake click.');
    });

    it('should not show ripples if the option is disabled', () => {
      expect(optionNativeElement.querySelectorAll('.wtf2-ripple-element').length)
        .toBe(0, 'Expected no ripples to show up initially');

      fixture.componentInstance.disabled = true;
      fixture.detectChanges();

      dispatchFakeEvent(optionNativeElement, 'mousedown');
      dispatchFakeEvent(optionNativeElement, 'mouseup');

      expect(optionNativeElement.querySelectorAll('.wtf2-ripple-element').length)
        .toBe(0, 'Expected no ripples to show up after click on a disabled option.');
    });

  });

});

@Component({
  template: `<wtf2-option [id]="id" [disabled]="disabled"></wtf2-option>`
})
class BasicOption {
  disabled: boolean;
  id: string;
}
