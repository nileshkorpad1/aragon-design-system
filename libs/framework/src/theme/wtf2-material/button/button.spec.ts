import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {Component, DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';
import {Wtf2ButtonModule, Wtf2Button} from './index';
import {Wtf2Ripple, ThemePalette} from '../core';


describe('Wtf2Button', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [Wtf2ButtonModule],
      declarations: [TestApp],
    });

    TestBed.compileComponents();
  }));

  // General button tests
  it('should apply class based on color attribute', () => {
    let fixture = TestBed.createComponent(TestApp);

    let testComponent = fixture.debugElement.componentInstance;
    let buttonDebugElement = fixture.debugElement.query(By.css('button'));
    let aDebugElement = fixture.debugElement.query(By.css('a'));

    testComponent.buttonColor = 'primary';
    fixture.detectChanges();
    expect(buttonDebugElement.nativeElement.classList.contains('wtf2-primary')).toBe(true);
    expect(aDebugElement.nativeElement.classList.contains('wtf2-primary')).toBe(true);

    testComponent.buttonColor = 'accent';
    fixture.detectChanges();
    expect(buttonDebugElement.nativeElement.classList.contains('wtf2-accent')).toBe(true);
    expect(aDebugElement.nativeElement.classList.contains('wtf2-accent')).toBe(true);

    testComponent.buttonColor = null;
    fixture.detectChanges();

    expect(buttonDebugElement.nativeElement.classList).not.toContain('wtf2-accent');
    expect(aDebugElement.nativeElement.classList).not.toContain('wtf2-accent');
  });

  it('should expose the ripple instance', () => {
    const fixture = TestBed.createComponent(TestApp);
    fixture.detectChanges();

    const button = fixture.debugElement.query(By.directive(Wtf2Button)).componentInstance;
    expect(button.ripple).toBeTruthy();
  });

  it('should not clear previous defined classes', () => {
    let fixture = TestBed.createComponent(TestApp);
    let testComponent = fixture.debugElement.componentInstance;
    let buttonDebugElement = fixture.debugElement.query(By.css('button'));

    buttonDebugElement.nativeElement.classList.add('custom-class');

    testComponent.buttonColor = 'primary';
    fixture.detectChanges();

    expect(buttonDebugElement.nativeElement.classList.contains('wtf2-primary')).toBe(true);
    expect(buttonDebugElement.nativeElement.classList.contains('custom-class')).toBe(true);

    testComponent.buttonColor = 'accent';
    fixture.detectChanges();

    expect(buttonDebugElement.nativeElement.classList.contains('wtf2-primary')).toBe(false);
    expect(buttonDebugElement.nativeElement.classList.contains('wtf2-accent')).toBe(true);
    expect(buttonDebugElement.nativeElement.classList.contains('custom-class')).toBe(true);
  });

  describe('button[wtf2-fab]', () => {
    it('should have accent palette by default', () => {
      const fixture = TestBed.createComponent(TestApp);
      const fabButtonDebugEl = fixture.debugElement.query(By.css('button[wtf2-fab]'));

      fixture.detectChanges();

      expect(fabButtonDebugEl.nativeElement.classList)
        .toContain('wtf2-accent', 'Expected fab buttons to use accent palette by default');
    });
  });

  describe('button[wtf2-mini-fab]', () => {
    it('should have accent palette by default', () => {
      const fixture = TestBed.createComponent(TestApp);
      const miniFabButtonDebugEl = fixture.debugElement.query(By.css('button[wtf2-mini-fab]'));

      fixture.detectChanges();

      expect(miniFabButtonDebugEl.nativeElement.classList)
        .toContain('wtf2-accent', 'Expected mini-fab buttons to use accent palette by default');
    });
  });

  // Regular button tests
  describe('button[wtf2-button]', () => {
    it('should handle a click on the button', () => {
      let fixture = TestBed.createComponent(TestApp);
      let testComponent = fixture.debugElement.componentInstance;
      let buttonDebugElement = fixture.debugElement.query(By.css('button'));

      buttonDebugElement.nativeElement.click();
      expect(testComponent.clickCount).toBe(1);
    });

    it('should not increment if disabled', () => {
      let fixture = TestBed.createComponent(TestApp);
      let testComponent = fixture.debugElement.componentInstance;
      let buttonDebugElement = fixture.debugElement.query(By.css('button'));

      testComponent.isDisabled = true;
      fixture.detectChanges();

      buttonDebugElement.nativeElement.click();

      expect(testComponent.clickCount).toBe(0);
    });

    it('should disable the native button element', () => {
      let fixture = TestBed.createComponent(TestApp);
      let buttonNativeElement = fixture.nativeElement.querySelector('button');
      expect(buttonNativeElement.disabled).toBeFalsy('Expected button not to be disabled');

      fixture.componentInstance.isDisabled = true;
      fixture.detectChanges();
      expect(buttonNativeElement.disabled).toBeTruthy('Expected button to be disabled');
    });

  });

  // Anchor button tests
  describe('a[wtf2-button]', () => {
    it('should not redirect if disabled', () => {
      let fixture = TestBed.createComponent(TestApp);
      let testComponent = fixture.debugElement.componentInstance;
      let buttonDebugElement = fixture.debugElement.query(By.css('a'));

      testComponent.isDisabled = true;
      fixture.detectChanges();

      buttonDebugElement.nativeElement.click();
    });

    it('should remove tabindex if disabled', () => {
      let fixture = TestBed.createComponent(TestApp);
      let testComponent = fixture.debugElement.componentInstance;
      let buttonDebugElement = fixture.debugElement.query(By.css('a'));
      expect(buttonDebugElement.nativeElement.getAttribute('tabIndex')).toBe(null);

      testComponent.isDisabled = true;
      fixture.detectChanges();
      expect(buttonDebugElement.nativeElement.getAttribute('tabIndex')).toBe('-1');
    });

    it('should add aria-disabled attribute if disabled', () => {
      let fixture = TestBed.createComponent(TestApp);
      let testComponent = fixture.debugElement.componentInstance;
      let buttonDebugElement = fixture.debugElement.query(By.css('a'));
      fixture.detectChanges();
      expect(buttonDebugElement.nativeElement.getAttribute('aria-disabled')).toBe('false');

      testComponent.isDisabled = true;
      fixture.detectChanges();
      expect(buttonDebugElement.nativeElement.getAttribute('aria-disabled')).toBe('true');
    });

    it('should not add aria-disabled attribute if disabled is false', () => {
      let fixture = TestBed.createComponent(TestApp);
      let testComponent = fixture.debugElement.componentInstance;
      let buttonDebugElement = fixture.debugElement.query(By.css('a'));
      fixture.detectChanges();
      expect(buttonDebugElement.nativeElement.getAttribute('aria-disabled'))
        .toBe('false', 'Expect aria-disabled="false"');
      expect(buttonDebugElement.nativeElement.getAttribute('disabled'))
        .toBeNull('Expect disabled="false"');

      testComponent.isDisabled = false;
      fixture.detectChanges();
      expect(buttonDebugElement.nativeElement.getAttribute('aria-disabled'))
        .toBe('false', 'Expect no aria-disabled');
      expect(buttonDebugElement.nativeElement.getAttribute('disabled'))
        .toBeNull('Expect no disabled');
    });

    it('should be able to set a custom tabindex', () => {
      let fixture = TestBed.createComponent(TestApp);
      let testComponent = fixture.debugElement.componentInstance;
      let buttonElement = fixture.debugElement.query(By.css('a')).nativeElement;

      fixture.componentInstance.tabIndex = 3;
      fixture.detectChanges();

      expect(buttonElement.getAttribute('tabIndex'))
          .toBe('3', 'Expected custom tabindex to be set');

      testComponent.isDisabled = true;
      fixture.detectChanges();

      expect(buttonElement.getAttribute('tabIndex'))
          .toBe('-1', 'Expected custom tabindex to be overwritten when disabled.');
    });
  });

  // Ripple tests.
  describe('button ripples', () => {
    let fixture: ComponentFixture<TestApp>;
    let testComponent: TestApp;
    let buttonDebugElement: DebugElement;
    let buttonRippleDebugElement: DebugElement;
    let buttonRippleInstance: Wtf2Ripple;
    let anchorDebugElement: DebugElement;
    let anchorRippleDebugElement: DebugElement;
    let anchorRippleInstance: Wtf2Ripple;

    beforeEach(() => {
      fixture = TestBed.createComponent(TestApp);
      fixture.detectChanges();

      testComponent = fixture.componentInstance;

      buttonDebugElement = fixture.debugElement.query(By.css('button[wtf2-button]'));
      buttonRippleDebugElement = buttonDebugElement.query(By.directive(Wtf2Ripple));
      buttonRippleInstance = buttonRippleDebugElement.injector.get<Wtf2Ripple>(Wtf2Ripple);

      anchorDebugElement = fixture.debugElement.query(By.css('a[wtf2-button]'));
      anchorRippleDebugElement = anchorDebugElement.query(By.directive(Wtf2Ripple));
      anchorRippleInstance = anchorRippleDebugElement.injector.get<Wtf2Ripple>(Wtf2Ripple);
    });

    it('should disable the ripple if wtf2RippleDisabled input is set', () => {
      expect(buttonRippleInstance.disabled).toBeFalsy();

      testComponent.rippleDisabled = true;
      fixture.detectChanges();

      expect(buttonRippleInstance.disabled).toBeTruthy();
    });

    it('should disable the ripple when the button is disabled', () => {
      expect(buttonRippleInstance.disabled).toBeFalsy(
        'Expected an enabled button[wtf2-button] to have an enabled ripple'
      );
      expect(anchorRippleInstance.disabled).toBeFalsy(
        'Expected an enabled a[wtf2-button] to have an enabled ripple'
      );

      testComponent.isDisabled = true;
      fixture.detectChanges();

      expect(buttonRippleInstance.disabled).toBeTruthy(
        'Expected a disabled button[wtf2-button] not to have an enabled ripple'
      );
      expect(anchorRippleInstance.disabled).toBeTruthy(
        'Expected a disabled a[wtf2-button] not to have an enabled ripple'
      );
    });
  });
});

/** Test component that contains an Wtf2Button. */
@Component({
  selector: 'test-app',
  template: `
    <button [tabIndex]="tabIndex" wtf2-button type="button" (click)="increment()"
      [disabled]="isDisabled" [color]="buttonColor" [disableRipple]="rippleDisabled">
      Go
    </button>
    <a [tabIndex]="tabIndex" href="http://www.google.com" wtf2-button [disabled]="isDisabled"
      [color]="buttonColor">
      Link
    </a>
    <button wtf2-fab>Fab Button</button>
    <button wtf2-mini-fab>Mini Fab Button</button>
  `
})
class TestApp {
  clickCount: number = 0;
  isDisabled: boolean = false;
  rippleDisabled: boolean = false;
  buttonColor: ThemePalette;
  tabIndex: number;

  increment() {
    this.clickCount++;
  }
}
