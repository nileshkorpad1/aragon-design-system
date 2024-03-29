import {TestBed, async, inject} from '@angular/core/testing';
import {Component, ViewEncapsulation} from '@angular/core';
import {By} from '@angular/platform-browser';
import {Platform} from '@angular/cdk/platform';
import {_getShadowRoot} from './progress-spinner';
import {
  Wtf2ProgressSpinnerModule,
  Wtf2ProgressSpinner,
  WTF2_PROGRESS_SPINNER_DEFAULT_OPTIONS,
} from './index';

describe('Wtf2ProgressSpinner', () => {
  const supportsShadowDom = typeof document.createElement('div').attachShadow !== 'undefined';

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [Wtf2ProgressSpinnerModule],
      declarations: [
        BasicProgressSpinner,
        IndeterminateProgressSpinner,
        ProgressSpinnerWithValueAndBoundMode,
        ProgressSpinnerWithColor,
        ProgressSpinnerCustomStrokeWidth,
        ProgressSpinnerCustomDiameter,
        SpinnerWithColor,
        ProgressSpinnerWithStringValues,
        IndeterminateSpinnerInShadowDom,
      ],
    }).compileComponents();
  }));

  it('should apply a mode of "determinate" if no mode is provided.', () => {
    let fixture = TestBed.createComponent(BasicProgressSpinner);
    fixture.detectChanges();

    let progressElement = fixture.debugElement.query(By.css('wtf2-progress-spinner'));
    expect(progressElement.componentInstance.mode).toBe('determinate');
  });

  it('should not modify the mode if a valid mode is provided.', () => {
    let fixture = TestBed.createComponent(IndeterminateProgressSpinner);
    fixture.detectChanges();

    let progressElement = fixture.debugElement.query(By.css('wtf2-progress-spinner'));
    expect(progressElement.componentInstance.mode).toBe('indeterminate');
  });

  it('should define a default value of zero for the value attribute', () => {
    let fixture = TestBed.createComponent(BasicProgressSpinner);
    fixture.detectChanges();

    let progressElement = fixture.debugElement.query(By.css('wtf2-progress-spinner'));
    expect(progressElement.componentInstance.value).toBe(0);
  });

  it('should set the value to 0 when the mode is set to indeterminate', () => {
    let fixture = TestBed.createComponent(ProgressSpinnerWithValueAndBoundMode);
    let progressElement = fixture.debugElement.query(By.css('wtf2-progress-spinner'));
    fixture.componentInstance.mode = 'determinate';
    fixture.detectChanges();

    expect(progressElement.componentInstance.value).toBe(50);
    fixture.componentInstance.mode = 'indeterminate';
    fixture.detectChanges();
    expect(progressElement.componentInstance.value).toBe(0);
  });

  it('should retain the value if it updates while indeterminate', () => {
    let fixture = TestBed.createComponent(ProgressSpinnerWithValueAndBoundMode);
    let progressElement = fixture.debugElement.query(By.css('wtf2-progress-spinner'));

    fixture.componentInstance.mode = 'determinate';
    fixture.detectChanges();
    expect(progressElement.componentInstance.value).toBe(50);

    fixture.componentInstance.mode = 'indeterminate';
    fixture.detectChanges();
    expect(progressElement.componentInstance.value).toBe(0);

    fixture.componentInstance.value = 75;
    fixture.detectChanges();
    expect(progressElement.componentInstance.value).toBe(0);

    fixture.componentInstance.mode = 'determinate';
    fixture.detectChanges();
    expect(progressElement.componentInstance.value).toBe(75);
  });

  it('should use different `circle` elements depending on the mode', () => {
    const fixture = TestBed.createComponent(ProgressSpinnerWithValueAndBoundMode);

    fixture.componentInstance.mode = 'determinate';
    fixture.detectChanges();

    const determinateCircle = fixture.nativeElement.querySelector('circle');

    fixture.componentInstance.mode = 'indeterminate';
    fixture.detectChanges();

    const indeterminateCircle = fixture.nativeElement.querySelector('circle');

    expect(determinateCircle).toBeTruthy();
    expect(indeterminateCircle).toBeTruthy();
    expect(determinateCircle).not.toBe(indeterminateCircle);
  });

  it('should clamp the value of the progress between 0 and 100', () => {
    let fixture = TestBed.createComponent(BasicProgressSpinner);
    fixture.detectChanges();

    let progressElement = fixture.debugElement.query(By.css('wtf2-progress-spinner'));
    let progressComponent = progressElement.componentInstance;

    progressComponent.value = 50;
    expect(progressComponent.value).toBe(50);

    progressComponent.value = 0;
    expect(progressComponent.value).toBe(0);

    progressComponent.value = 100;
    expect(progressComponent.value).toBe(100);

    progressComponent.value = 999;
    expect(progressComponent.value).toBe(100);

    progressComponent.value = -10;
    expect(progressComponent.value).toBe(0);
  });

  it('should default to a stroke width that is 10% of the diameter', () => {
    const fixture = TestBed.createComponent(ProgressSpinnerCustomDiameter);
    const spinner = fixture.debugElement.query(By.directive(Wtf2ProgressSpinner));

    fixture.componentInstance.diameter = 67;
    fixture.detectChanges();

    expect(spinner.componentInstance.strokeWidth).toBe(6.7);
  });

  it('should allow a custom diameter', () => {
    const fixture = TestBed.createComponent(ProgressSpinnerCustomDiameter);
    const spinner = fixture.debugElement.query(By.css('wtf2-progress-spinner')).nativeElement;
    const svgElement = fixture.nativeElement.querySelector('svg');

    fixture.componentInstance.diameter = 32;
    fixture.detectChanges();

    expect(parseInt(spinner.style.width))
        .toBe(32, 'Expected the custom diameter to be applied to the host element width.');
    expect(parseInt(spinner.style.height))
        .toBe(32, 'Expected the custom diameter to be applied to the host element height.');
    expect(parseInt(svgElement.style.width))
        .toBe(32, 'Expected the custom diameter to be applied to the svg element width.');
    expect(parseInt(svgElement.style.height))
        .toBe(32, 'Expected the custom diameter to be applied to the svg element height.');
    expect(svgElement.getAttribute('viewBox'))
        .toBe('0 0 25.2 25.2', 'Expected the custom diameter to be applied to the svg viewBox.');
  });

  it('should add a style tag with the indeterminate animation to the document head when using a ' +
    'non-default diameter', inject([Platform], (platform: Platform) => {
      // On Edge and IE we use a fallback animation because the
      // browser doesn't support aniwtf2ing SVG correctly.
      if (platform.EDGE || platform.TRIDENT) {
        return;
      }

      const fixture = TestBed.createComponent(ProgressSpinnerCustomDiameter);
      fixture.componentInstance.diameter = 32;
      fixture.detectChanges();

      expect(document.head.querySelectorAll('style[wtf2-spinner-animation="32"]').length).toBe(1);

      // Change to something different so we get another tag.
      fixture.componentInstance.diameter = 64;
      fixture.detectChanges();

      expect(document.head.querySelectorAll('style[wtf2-spinner-animation="32"]').length).toBe(1);
      expect(document.head.querySelectorAll('style[wtf2-spinner-animation="64"]').length).toBe(1);

      // Change back to the initial one.
      fixture.componentInstance.diameter = 32;
      fixture.detectChanges();

      expect(document.head.querySelectorAll('style[wtf2-spinner-animation="32"]').length).toBe(1);
      expect(document.head.querySelectorAll('style[wtf2-spinner-animation="64"]').length).toBe(1);
  }));

  it('should allow a custom stroke width', () => {
    const fixture = TestBed.createComponent(ProgressSpinnerCustomStrokeWidth);

    fixture.componentInstance.strokeWidth = 40;
    fixture.detectChanges();

    const circleElement = fixture.nativeElement.querySelector('circle');
    const svgElement = fixture.nativeElement.querySelector('svg');

    expect(parseInt(circleElement.style.strokeWidth)).toBe(40, 'Expected the custom stroke ' +
      'width to be applied to the circle element as a percentage of the element size.');
    expect(svgElement.getAttribute('viewBox'))
      .toBe('0 0 130 130', 'Expected the viewBox to be adjusted based on the stroke width.');
  });

  it('should expand the host element if the stroke width is greater than the default', () => {
    const fixture = TestBed.createComponent(ProgressSpinnerCustomStrokeWidth);
    const element = fixture.debugElement.nativeElement.querySelector('.wtf2-progress-spinner');

    fixture.componentInstance.strokeWidth = 40;
    fixture.detectChanges();

    expect(element.style.width).toBe('100px');
    expect(element.style.height).toBe('100px');
  });

  it('should not collapse the host element if the stroke width is less than the default', () => {
    const fixture = TestBed.createComponent(ProgressSpinnerCustomStrokeWidth);
    const element = fixture.debugElement.nativeElement.querySelector('.wtf2-progress-spinner');

    fixture.componentInstance.strokeWidth = 5;
    fixture.detectChanges();

    expect(element.style.width).toBe('100px');
    expect(element.style.height).toBe('100px');
  });

  it('should set the color class on the wtf2-spinner', () => {
    let fixture = TestBed.createComponent(SpinnerWithColor);
    fixture.detectChanges();

    let progressElement = fixture.debugElement.query(By.css('wtf2-spinner'));

    expect(progressElement.nativeElement.classList).toContain('wtf2-primary');

    fixture.componentInstance.color = 'accent';
    fixture.detectChanges();

    expect(progressElement.nativeElement.classList).toContain('wtf2-accent');
    expect(progressElement.nativeElement.classList).not.toContain('wtf2-primary');
  });

  it('should set the color class on the wtf2-progress-spinner', () => {
    let fixture = TestBed.createComponent(ProgressSpinnerWithColor);
    fixture.detectChanges();

    let progressElement = fixture.debugElement.query(By.css('wtf2-progress-spinner'));

    expect(progressElement.nativeElement.classList).toContain('wtf2-primary');

    fixture.componentInstance.color = 'accent';
    fixture.detectChanges();

    expect(progressElement.nativeElement.classList).toContain('wtf2-accent');
    expect(progressElement.nativeElement.classList).not.toContain('wtf2-primary');
  });

  it('should remove the underlying SVG element from the tab order explicitly', () => {
    const fixture = TestBed.createComponent(BasicProgressSpinner);

    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('svg').getAttribute('focusable')).toBe('false');
  });

  it('should handle the number inputs being passed in as strings', () => {
    const fixture = TestBed.createComponent(ProgressSpinnerWithStringValues);
    const spinner = fixture.debugElement.query(By.directive(Wtf2ProgressSpinner));
    const svgElement = spinner.nativeElement.querySelector('svg');

    fixture.detectChanges();

    expect(spinner.componentInstance.diameter).toBe(37);
    expect(spinner.componentInstance.strokeWidth).toBe(11);
    expect(spinner.componentInstance.value).toBe(25);

    expect(spinner.nativeElement.style.width).toBe('37px');
    expect(spinner.nativeElement.style.height).toBe('37px');
    expect(svgElement.style.width).toBe('37px');
    expect(svgElement.style.height).toBe('37px');
    expect(svgElement.getAttribute('viewBox')).toBe('0 0 38 38');
  });

  it('should update the element size when changed dynamically', () => {
    let fixture = TestBed.createComponent(BasicProgressSpinner);
    let spinner = fixture.debugElement.query(By.directive(Wtf2ProgressSpinner));
    spinner.componentInstance.diameter = 32;
    fixture.detectChanges();
    expect(spinner.nativeElement.style.width).toBe('32px');
    expect(spinner.nativeElement.style.height).toBe('32px');
  });

  it('should be able to set a default diameter', () => {
    TestBed
      .resetTestingModule()
      .configureTestingModule({
        imports: [Wtf2ProgressSpinnerModule],
        declarations: [BasicProgressSpinner],
        providers: [{
          provide: WTF2_PROGRESS_SPINNER_DEFAULT_OPTIONS,
          useValue: {diameter: 23}
        }]
      })
      .compileComponents();

    const fixture = TestBed.createComponent(BasicProgressSpinner);
    fixture.detectChanges();

    const progressElement = fixture.debugElement.query(By.css('wtf2-progress-spinner'));
    expect(progressElement.componentInstance.diameter).toBe(23);
  });

  it('should be able to set a default stroke width', () => {
    TestBed
      .resetTestingModule()
      .configureTestingModule({
        imports: [Wtf2ProgressSpinnerModule],
        declarations: [BasicProgressSpinner],
        providers: [{
          provide: WTF2_PROGRESS_SPINNER_DEFAULT_OPTIONS,
          useValue: {strokeWidth: 7}
        }]
      })
      .compileComponents();

    const fixture = TestBed.createComponent(BasicProgressSpinner);
    fixture.detectChanges();

    const progressElement = fixture.debugElement.query(By.css('wtf2-progress-spinner'));
    expect(progressElement.componentInstance.strokeWidth).toBe(7);
  });

  it('should set `aria-valuenow` to the current value in determinate mode', () => {
    const fixture = TestBed.createComponent(ProgressSpinnerWithValueAndBoundMode);
    const progressElement = fixture.debugElement.query(By.css('wtf2-progress-spinner'));
    fixture.componentInstance.mode = 'determinate';
    fixture.componentInstance.value = 37;
    fixture.detectChanges();

    expect(progressElement.nativeElement.getAttribute('aria-valuenow')).toBe('37');
  });

  it('should clear `aria-valuenow` in indeterminate mode', () => {
    const fixture = TestBed.createComponent(ProgressSpinnerWithValueAndBoundMode);
    const progressElement = fixture.debugElement.query(By.css('wtf2-progress-spinner'));
    fixture.componentInstance.mode = 'determinate';
    fixture.componentInstance.value = 89;
    fixture.detectChanges();

    expect(progressElement.nativeElement.hasAttribute('aria-valuenow')).toBe(true);

    fixture.componentInstance.mode = 'indeterminate';
    fixture.detectChanges();

    expect(progressElement.nativeElement.hasAttribute('aria-valuenow')).toBe(false);
  });

  it('should add the indeterminate animation style tag to the Shadow root', () => {
    // The test is only relevant in browsers that support Shadow DOM.
    if (!supportsShadowDom) {
      return;
    }

    const fixture = TestBed.createComponent(IndeterminateSpinnerInShadowDom);
    fixture.componentInstance.diameter = 27;
    fixture.detectChanges();

    const spinner = fixture.debugElement.query(By.css('wtf2-progress-spinner')).nativeElement;
    const shadowRoot = _getShadowRoot(spinner, document) as HTMLElement;

    expect(shadowRoot.querySelector('style[wtf2-spinner-animation="27"]')).toBeTruthy();

    fixture.componentInstance.diameter = 15;
    fixture.detectChanges();

    expect(shadowRoot.querySelector('style[wtf2-spinner-animation="27"]')).toBeTruthy();
  });

  it('should not duplicate style tags inside the Shadow root', () => {
    // The test is only relevant in browsers that support Shadow DOM.
    if (!supportsShadowDom) {
      return;
    }

    const fixture = TestBed.createComponent(IndeterminateSpinnerInShadowDom);
    fixture.componentInstance.diameter = 39;
    fixture.detectChanges();

    const spinner = fixture.debugElement.query(By.css('wtf2-progress-spinner')).nativeElement;
    const shadowRoot = _getShadowRoot(spinner, document) as HTMLElement;

    expect(shadowRoot.querySelectorAll('style[wtf2-spinner-animation="39"]').length).toBe(1);

    // Change to something different so we get another tag.
    fixture.componentInstance.diameter = 61;
    fixture.detectChanges();

    expect(shadowRoot.querySelectorAll('style[wtf2-spinner-animation="39"]').length).toBe(1);
    expect(shadowRoot.querySelectorAll('style[wtf2-spinner-animation="61"]').length).toBe(1);

    // Change back to the initial one.
    fixture.componentInstance.diameter = 39;
    fixture.detectChanges();

    expect(shadowRoot.querySelectorAll('style[wtf2-spinner-animation="39"]').length).toBe(1);
    expect(shadowRoot.querySelectorAll('style[wtf2-spinner-animation="61"]').length).toBe(1);
  });

});


@Component({template: '<wtf2-progress-spinner></wtf2-progress-spinner>'})
class BasicProgressSpinner {}

@Component({template: '<wtf2-progress-spinner [strokeWidth]="strokeWidth"></wtf2-progress-spinner>'})
class ProgressSpinnerCustomStrokeWidth {
  strokeWidth: number;
}

@Component({template: '<wtf2-progress-spinner [diameter]="diameter"></wtf2-progress-spinner>'})
class ProgressSpinnerCustomDiameter {
  diameter: number;
}

@Component({template: '<wtf2-progress-spinner mode="indeterminate"></wtf2-progress-spinner>'})
class IndeterminateProgressSpinner { }

@Component({
  template: '<wtf2-progress-spinner [value]="value" [mode]="mode"></wtf2-progress-spinner>'
})
class ProgressSpinnerWithValueAndBoundMode {
  mode = 'indeterminate';
  value = 50;
}

@Component({template: `<wtf2-spinner [color]="color"></wtf2-spinner>`})
class SpinnerWithColor { color: string = 'primary'; }

@Component({template: `<wtf2-progress-spinner value="50" [color]="color"></wtf2-progress-spinner>`})
class ProgressSpinnerWithColor { color: string = 'primary'; }

@Component({
  template: `
    <wtf2-progress-spinner value="25" diameter="37" strokeWidth="11"></wtf2-progress-spinner>
  `
})
class ProgressSpinnerWithStringValues { }


@Component({
  template: `
    <wtf2-progress-spinner mode="indeterminate" [diameter]="diameter"></wtf2-progress-spinner>
  `,
  encapsulation: ViewEncapsulation.ShadowDom,
})
class IndeterminateSpinnerInShadowDom {
  diameter: number;
}
