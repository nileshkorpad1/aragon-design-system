import {ComponentFixture, TestBed, fakeAsync} from '@angular/core/testing';
import {Component, DebugElement, ViewEncapsulation, ViewChild} from '@angular/core';
import {By} from '@angular/platform-browser';
import {Wtf2Badge, Wtf2BadgeModule} from './index';
import {ThemePalette} from '../core';

describe('Wtf2Badge', () => {
  let fixture: ComponentFixture<any>;
  let testComponent: BadgeTestApp;
  let badgeNativeElement: HTMLElement;
  let badgeDebugElement: DebugElement;

  beforeEach(fakeAsync(() => {
    TestBed
        .configureTestingModule({
          imports: [Wtf2BadgeModule],
          declarations: [BadgeTestApp, PreExistingBadge, NestedBadge, BadgeOnTemplate],
        })
        .compileComponents();

    fixture = TestBed.createComponent(BadgeTestApp);
    testComponent = fixture.debugElement.componentInstance;
    fixture.detectChanges();

    badgeDebugElement = fixture.debugElement.query(By.directive(Wtf2Badge));
    badgeNativeElement = badgeDebugElement.nativeElement;
  }));

  it('should update the badge based on attribute', () => {
    let badgeContentDebugElement = badgeNativeElement.querySelector('.wtf2-badge-content')!;

    expect(badgeContentDebugElement.textContent).toContain('1');

    testComponent.badgeContent = '22';
    fixture.detectChanges();

    badgeContentDebugElement = badgeNativeElement.querySelector('.wtf2-badge-content')!;
    expect(badgeContentDebugElement.textContent).toContain('22');
  });

  it('should apply class based on color attribute', () => {
    testComponent.badgeColor = 'primary';
    fixture.detectChanges();
    expect(badgeNativeElement.classList.contains('wtf2-badge-primary')).toBe(true);

    testComponent.badgeColor = 'accent';
    fixture.detectChanges();
    expect(badgeNativeElement.classList.contains('wtf2-badge-accent')).toBe(true);

    testComponent.badgeColor = 'warn';
    fixture.detectChanges();
    expect(badgeNativeElement.classList.contains('wtf2-badge-warn')).toBe(true);

    testComponent.badgeColor = undefined;
    fixture.detectChanges();

    expect(badgeNativeElement.classList).not.toContain('wtf2-badge-accent');
  });

  it('should update the badge position on direction change', () => {
    expect(badgeNativeElement.classList.contains('wtf2-badge-above')).toBe(true);
    expect(badgeNativeElement.classList.contains('wtf2-badge-after')).toBe(true);

    testComponent.badgeDirection = 'below before';
    fixture.detectChanges();

    expect(badgeNativeElement.classList.contains('wtf2-badge-below')).toBe(true);
    expect(badgeNativeElement.classList.contains('wtf2-badge-before')).toBe(true);
  });

  it('should change visibility to hidden', () => {
    expect(badgeNativeElement.classList.contains('wtf2-badge-hidden')).toBe(false);

    testComponent.badgeHidden = true;
    fixture.detectChanges();

    expect(badgeNativeElement.classList.contains('wtf2-badge-hidden')).toBe(true);
  });

  it('should change badge sizes', () => {
    expect(badgeNativeElement.classList.contains('wtf2-badge-medium')).toBe(true);

    testComponent.badgeSize = 'small';
    fixture.detectChanges();

    expect(badgeNativeElement.classList.contains('wtf2-badge-small')).toBe(true);

    testComponent.badgeSize = 'large';
    fixture.detectChanges();

    expect(badgeNativeElement.classList.contains('wtf2-badge-large')).toBe(true);
  });

  it('should change badge overlap', () => {
    expect(badgeNativeElement.classList.contains('wtf2-badge-overlap')).toBe(false);

    testComponent.badgeOverlap = true;
    fixture.detectChanges();

    expect(badgeNativeElement.classList.contains('wtf2-badge-overlap')).toBe(true);
  });

  it('should toggle `aria-describedby` depending on whether the badge has a description', () => {
    const badgeContent = badgeNativeElement.querySelector('.wtf2-badge-content')!;

    expect(badgeContent.getAttribute('aria-describedby')).toBeFalsy();

    testComponent.badgeDescription = 'Describing a badge';
    fixture.detectChanges();

    expect(badgeContent.getAttribute('aria-describedby')).toBeTruthy();

    testComponent.badgeDescription = '';
    fixture.detectChanges();

    expect(badgeContent.getAttribute('aria-describedby')).toBeFalsy();
  });

  it('should toggle visibility based on whether the badge has content', () => {
    const classList = badgeNativeElement.classList;

    expect(classList.contains('wtf2-badge-hidden')).toBe(false);

    testComponent.badgeContent = '';
    fixture.detectChanges();

    expect(classList.contains('wtf2-badge-hidden')).toBe(true);

    testComponent.badgeContent = 'hello';
    fixture.detectChanges();

    expect(classList.contains('wtf2-badge-hidden')).toBe(false);

    testComponent.badgeContent = ' ';
    fixture.detectChanges();

    expect(classList.contains('wtf2-badge-hidden')).toBe(true);

    testComponent.badgeContent = 0;
    fixture.detectChanges();

    expect(classList.contains('wtf2-badge-hidden')).toBe(false);
  });

  it('should apply view encapsulation on create badge content', () => {
    const badge = badgeNativeElement.querySelector('.wtf2-badge-content')!;
    let encapsulationAttr: Attr | undefined;

    for (let i = 0; i < badge.attributes.length; i++) {
      if (badge.attributes[i].name.startsWith('_ngcontent-')) {
        encapsulationAttr = badge.attributes[i];
        break;
      }
    }

    expect(encapsulationAttr).toBeTruthy();
  });

  it('should toggle a class depending on the badge disabled state', () => {
    const element: HTMLElement = badgeDebugElement.nativeElement;

    expect(element.classList).not.toContain('wtf2-badge-disabled');

    testComponent.badgeDisabled = true;
    fixture.detectChanges();

    expect(element.classList).toContain('wtf2-badge-disabled');
  });

  it('should update the aria-label if the description changes', () => {
    const badgeContent = badgeNativeElement.querySelector('.wtf2-badge-content')!;

    fixture.componentInstance.badgeDescription = 'initial content';
    fixture.detectChanges();

    expect(badgeContent.getAttribute('aria-label')).toBe('initial content');

    fixture.componentInstance.badgeDescription = 'changed content';
    fixture.detectChanges();

    expect(badgeContent.getAttribute('aria-label')).toBe('changed content');

    fixture.componentInstance.badgeDescription = '';
    fixture.detectChanges();

    expect(badgeContent.hasAttribute('aria-label')).toBe(false);
  });

  it('should clear any pre-existing badges', () => {
    const preExistingFixture = TestBed.createComponent(PreExistingBadge);
    preExistingFixture.detectChanges();

    expect(preExistingFixture.nativeElement.querySelectorAll('.wtf2-badge-content').length).toBe(1);
  });

  it('should not clear badge content from child elements', () => {
    const preExistingFixture = TestBed.createComponent(NestedBadge);
    preExistingFixture.detectChanges();

    expect(preExistingFixture.nativeElement.querySelectorAll('.wtf2-badge-content').length).toBe(2);
  });

  it('should expose the badge element', () => {
    const badgeElement = badgeNativeElement.querySelector('.wtf2-badge-content')!;
    expect(fixture.componentInstance.badgeInstance.getBadgeElement()).toBe(badgeElement);
  });

  it('should throw if badge is not attached to an element node', () => {
    expect(() => {
      TestBed.createComponent(BadgeOnTemplate);
    }).toThrowError(/wtf2Badge must be attached to an element node/);
  });

});

/** Test component that contains a Wtf2Badge. */
@Component({
  // Explicitly set the view encapsulation since we have a test that checks for it.
  encapsulation: ViewEncapsulation.Emulated,
  styles: ['span { color: hotpink; }'],
  template: `
    <span [wtf2Badge]="badgeContent"
          [wtf2BadgeColor]="badgeColor"
          [wtf2BadgePosition]="badgeDirection"
          [wtf2BadgeHidden]="badgeHidden"
          [wtf2BadgeSize]="badgeSize"
          [wtf2BadgeOverlap]="badgeOverlap"
          [wtf2BadgeDescription]="badgeDescription"
          [wtf2BadgeDisabled]="badgeDisabled">
      home
    </span>
  `
})
class BadgeTestApp {
  @ViewChild(Wtf2Badge, {static: false}) badgeInstance: Wtf2Badge;
  badgeColor: ThemePalette;
  badgeContent: string | number = '1';
  badgeDirection = 'above after';
  badgeHidden = false;
  badgeSize = 'medium';
  badgeOverlap = false;
  badgeDescription: string;
  badgeDisabled = false;
}


@Component({
  template: `
    <span wtf2Badge="Hello">
      home
      <div class="wtf2-badge-content">Pre-existing badge</div>
    </span>
  `
})
class PreExistingBadge {
}


@Component({
  template: `
    <span wtf2Badge="Hello">
      home
      <span wtf2Badge="Hi">Something</span>
    </span>
  `
})
class NestedBadge {
}


@Component({
  template: `
    <ng-template wtf2Badge="1">Notifications</ng-template>
  `
})
class BadgeOnTemplate {
}
