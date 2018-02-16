import {
  fakeAsync,
  async,
  tick,
  ComponentFixture,
  TestBed,
  discardPeriodicTasks,
  flush,
} from '@angular/core/testing';
import {Component, ElementRef, ViewChild} from '@angular/core';
import {By} from '@angular/platform-browser';
import {BrowserAnimationsModule, NoopAnimationsModule} from '@angular/platform-browser/animations';
import {Wtf2Drawer, Wtf2SidenavModule, Wtf2DrawerContainer} from './index';
import {Direction} from '@angular/cdk/bidi';
import {A11yModule} from '@angular/cdk/a11y';
import {PlatformModule} from '@angular/cdk/platform';
import {ESCAPE} from '@angular/cdk/keycodes';
import {dispatchKeyboardEvent, createKeyboardEvent, dispatchEvent} from '@angular/cdk/testing';
import {CdkScrollable} from '@angular/cdk/scrolling';


describe('Wtf2Drawer', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [Wtf2SidenavModule, A11yModule, PlatformModule, NoopAnimationsModule],
      declarations: [
        BasicTestApp,
        DrawerContainerNoDrawerTestApp,
        DrawerSetToOpenedFalse,
        DrawerSetToOpenedTrue,
        DrawerDynamicPosition,
        DrawerWithFocusableElements,
        DrawerOpenBinding,
        DrawerWithoutFocusableElements,
      ],
    });

    TestBed.compileComponents();
  }));

  describe('methods', () => {
    it('should be able to open', fakeAsync(() => {
      const fixture = TestBed.createComponent(BasicTestApp);

      fixture.detectChanges();

      const testComponent: BasicTestApp = fixture.debugElement.componentInstance;
      const drawer = fixture.debugElement.query(By.directive(Wtf2Drawer));
      const drawerBackdropElement = fixture.debugElement.query(By.css('.wtf2-drawer-backdrop'));

      drawerBackdropElement.nativeElement.style.transition = 'none';
      fixture.debugElement.query(By.css('.open')).nativeElement.click();
      fixture.detectChanges();

      expect(testComponent.openCount).toBe(0);
      expect(testComponent.openStartCount).toBe(0);

      tick();
      expect(testComponent.openStartCount).toBe(1);
      fixture.detectChanges();

      expect(testComponent.openCount).toBe(1);
      expect(testComponent.openStartCount).toBe(1);
      expect(getComputedStyle(drawer.nativeElement).visibility).toBe('visible');
      expect(getComputedStyle(drawerBackdropElement.nativeElement).visibility).toBe('visible');
    }));

    it('should be able to close', fakeAsync(() => {
      const fixture = TestBed.createComponent(BasicTestApp);

      fixture.detectChanges();

      const testComponent: BasicTestApp = fixture.debugElement.componentInstance;
      const drawer = fixture.debugElement.query(By.directive(Wtf2Drawer));
      const drawerBackdropElement = fixture.debugElement.query(By.css('.wtf2-drawer-backdrop'));

      drawerBackdropElement.nativeElement.style.transition = 'none';
      fixture.debugElement.query(By.css('.open')).nativeElement.click();
      fixture.detectChanges();
      flush();
      fixture.detectChanges();

      fixture.debugElement.query(By.css('.close')).nativeElement.click();
      fixture.detectChanges();

      expect(testComponent.closeCount).toBe(0);
      expect(testComponent.closeStartCount).toBe(0);

      flush();
      expect(testComponent.closeStartCount).toBe(1);
      fixture.detectChanges();

      expect(testComponent.closeCount).toBe(1);
      expect(testComponent.closeStartCount).toBe(1);
      expect(getComputedStyle(drawer.nativeElement).visibility).toBe('hidden');
      expect(getComputedStyle(drawerBackdropElement.nativeElement).visibility).toBe('hidden');
    }));

    it('should resolve the open method promise with the new state of the drawer', fakeAsync(() => {
      const fixture = TestBed.createComponent(BasicTestApp);
      fixture.detectChanges();
      const drawer: Wtf2Drawer =
          fixture.debugElement.query(By.directive(Wtf2Drawer)).componentInstance;

      drawer.open().then(result => expect(result).toBe('open'));
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
    }));

    it('should resolve the close method promise with the new state of the drawer', fakeAsync(() => {
      const fixture = TestBed.createComponent(BasicTestApp);
      fixture.detectChanges();
      const drawer = fixture.debugElement.query(By.directive(Wtf2Drawer));
      const drawerInstance: Wtf2Drawer = drawer.componentInstance;

      drawerInstance.open();
      fixture.detectChanges();
      flush();
      fixture.detectChanges();

      drawerInstance.close().then(result => expect(result).toBe('close'));
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
    }));

    it('should be able to close while the open animation is running', fakeAsync(() => {
      const fixture = TestBed.createComponent(BasicTestApp);
      fixture.detectChanges();

      const testComponent: BasicTestApp = fixture.debugElement.componentInstance;
      fixture.debugElement.query(By.css('.open')).nativeElement.click();
      fixture.detectChanges();

      expect(testComponent.openCount).toBe(0);
      expect(testComponent.closeCount).toBe(0);

      tick();
      fixture.debugElement.query(By.css('.close')).nativeElement.click();
      fixture.detectChanges();

      flush();
      fixture.detectChanges();

      expect(testComponent.openCount).toBe(1);
      expect(testComponent.closeCount).toBe(1);
    }));

    it('does not throw when created without a drawer', fakeAsync(() => {
      expect(() => {
        let fixture = TestBed.createComponent(BasicTestApp);
        fixture.detectChanges();
        tick();
      }).not.toThrow();
    }));

    it('should emit the backdropClick event when the backdrop is clicked', fakeAsync(() => {
      let fixture = TestBed.createComponent(BasicTestApp);
      fixture.detectChanges();

      let testComponent: BasicTestApp = fixture.debugElement.componentInstance;
      let openButtonElement = fixture.debugElement.query(By.css('.open')).nativeElement;

      openButtonElement.click();
      fixture.detectChanges();
      flush();

      expect(testComponent.backdropClickedCount).toBe(0);

      fixture.debugElement.query(By.css('.wtf2-drawer-backdrop')).nativeElement.click();
      fixture.detectChanges();
      flush();

      expect(testComponent.backdropClickedCount).toBe(1);

      openButtonElement.click();
      fixture.detectChanges();
      flush();

      fixture.debugElement.query(By.css('.close')).nativeElement.click();
      fixture.detectChanges();
      flush();

      expect(testComponent.backdropClickedCount).toBe(1);
    }));

    it('should close when pressing escape', fakeAsync(() => {
      let fixture = TestBed.createComponent(BasicTestApp);

      fixture.detectChanges();

      let testComponent: BasicTestApp = fixture.debugElement.componentInstance;
      let drawer = fixture.debugElement.query(By.directive(Wtf2Drawer));

      drawer.componentInstance.open();
      fixture.detectChanges();
      tick();

      expect(testComponent.openCount).toBe(1, 'Expected one open event.');
      expect(testComponent.openStartCount).toBe(1, 'Expected one open start event.');
      expect(testComponent.closeCount).toBe(0, 'Expected no close events.');
      expect(testComponent.closeStartCount).toBe(0, 'Expected no close start events.');

      const event = dispatchKeyboardEvent(drawer.nativeElement, 'keydown', ESCAPE);
      fixture.detectChanges();
      flush();

      expect(testComponent.closeCount).toBe(1, 'Expected one close event.');
      expect(testComponent.closeStartCount).toBe(1, 'Expected one close start event.');
      expect(event.defaultPrevented).toBe(true);
    }));

    it('should not close when pressing escape with a modifier', fakeAsync(() => {
      let fixture = TestBed.createComponent(BasicTestApp);

      fixture.detectChanges();

      let testComponent: BasicTestApp = fixture.debugElement.componentInstance;
      let drawer = fixture.debugElement.query(By.directive(Wtf2Drawer));

      drawer.componentInstance.open();
      fixture.detectChanges();
      tick();

      expect(testComponent.closeCount).toBe(0, 'Expected no close events.');
      expect(testComponent.closeStartCount).toBe(0, 'Expected no close start events.');

      const event = createKeyboardEvent('keydown', ESCAPE);
      Object.defineProperty(event, 'altKey', {get: () => true});
      dispatchEvent(drawer.nativeElement, event);
      fixture.detectChanges();
      flush();

      expect(testComponent.closeCount).toBe(0, 'Expected still no close events.');
      expect(testComponent.closeStartCount).toBe(0, 'Expected still no close start events.');
      expect(event.defaultPrevented).toBe(false);
    }));

    it('should fire the open event when open on init', fakeAsync(() => {
      let fixture = TestBed.createComponent(DrawerSetToOpenedTrue);

      fixture.detectChanges();
      tick();

      expect(fixture.componentInstance.openCallback).toHaveBeenCalledTimes(1);
    }));

    it('should not close by pressing escape when disableClose is set', fakeAsync(() => {
      let fixture = TestBed.createComponent(BasicTestApp);
      let testComponent = fixture.debugElement.componentInstance;
      let drawer = fixture.debugElement.query(By.directive(Wtf2Drawer));

      drawer.componentInstance.disableClose = true;
      drawer.componentInstance.open();
      fixture.detectChanges();
      tick();

      dispatchKeyboardEvent(drawer.nativeElement, 'keydown', ESCAPE);
      fixture.detectChanges();
      tick();

      expect(testComponent.closeCount).toBe(0);
      expect(testComponent.closeStartCount).toBe(0);
    }));

    it('should not close by clicking on the backdrop when disableClose is set', fakeAsync(() => {
      let fixture = TestBed.createComponent(BasicTestApp);
      let testComponent = fixture.debugElement.componentInstance;
      let drawer = fixture.debugElement.query(By.directive(Wtf2Drawer)).componentInstance;

      drawer.disableClose = true;
      drawer.open();
      fixture.detectChanges();
      tick();

      fixture.debugElement.query(By.css('.wtf2-drawer-backdrop')).nativeElement.click();
      fixture.detectChanges();
      tick();

      expect(testComponent.closeCount).toBe(0);
      expect(testComponent.closeStartCount).toBe(0);
    }));

    it('should restore focus on close if focus is inside drawer', fakeAsync(() => {
      let fixture = TestBed.createComponent(BasicTestApp);

      fixture.detectChanges();

      let drawer = fixture.debugElement.query(By.directive(Wtf2Drawer)).componentInstance;
      let openButton = fixture.componentInstance.openButton.nativeElement;
      let drawerButton = fixture.componentInstance.drawerButton.nativeElement;

      openButton.focus();
      drawer.open();
      fixture.detectChanges();
      flush();
      drawerButton.focus();

      drawer.close();
      fixture.detectChanges();
      flush();

      expect(document.activeElement)
          .toBe(openButton, 'Expected focus to be restored to the open button on close.');
    }));

    it('should not restore focus on close if focus is outside drawer', fakeAsync(() => {
      let fixture = TestBed.createComponent(BasicTestApp);
      let drawer: Wtf2Drawer = fixture.debugElement
          .query(By.directive(Wtf2Drawer)).componentInstance;
      fixture.detectChanges();

      let openButton = fixture.componentInstance.openButton.nativeElement;
      let closeButton = fixture.componentInstance.closeButton.nativeElement;

      openButton.focus();
      drawer.open();

      fixture.detectChanges();
      tick();
      closeButton.focus();

      drawer.close();
      fixture.detectChanges();
      tick();

      expect(document.activeElement)
          .toBe(closeButton, 'Expected focus not to be restored to the open button on close.');
    }));
  });

  describe('attributes', () => {
    it('should correctly parse opened="false"', () => {
      let fixture = TestBed.createComponent(DrawerSetToOpenedFalse);

      fixture.detectChanges();

      let drawer = fixture.debugElement.query(By.directive(Wtf2Drawer)).componentInstance;

      expect((drawer as Wtf2Drawer).opened).toBe(false);
    });

    it('should correctly parse opened="true"', () => {
      let fixture = TestBed.createComponent(DrawerSetToOpenedTrue);

      fixture.detectChanges();

      let drawer = fixture.debugElement.query(By.directive(Wtf2Drawer)).componentInstance;

      expect((drawer as Wtf2Drawer).opened).toBe(true);
    });

    it('should remove align attr from DOM', () => {
      const fixture = TestBed.createComponent(BasicTestApp);
      fixture.detectChanges();

      const drawerEl = fixture.debugElement.query(By.css('wtf2-drawer')).nativeElement;
      expect(drawerEl.hasAttribute('align'))
          .toBe(false, 'Expected drawer not to have a native align attribute.');
    });

    it('should throw when multiple drawers have the same position', fakeAsync(() => {
      const fixture = TestBed.createComponent(DrawerDynamicPosition);
      fixture.detectChanges();
      tick();

      const testComponent: DrawerDynamicPosition = fixture.debugElement.componentInstance;
      testComponent.drawer1Position = 'end';

      expect(() => {
        try {
          fixture.detectChanges();
          tick(0);
        } catch {
          tick(0);
        }
      }).toThrow();
    }));

    it('should not throw when drawers swap positions', () => {
      const fixture = TestBed.createComponent(DrawerDynamicPosition);
      fixture.detectChanges();

      const testComponent: DrawerDynamicPosition = fixture.debugElement.componentInstance;
      testComponent.drawer1Position = 'end';
      testComponent.drawer2Position = 'start';

      expect(() => fixture.detectChanges()).not.toThrow();
    });

    it('should bind 2-way bind on opened property', fakeAsync(() => {
      const fixture = TestBed.createComponent(DrawerOpenBinding);
      fixture.detectChanges();

      let drawer: Wtf2Drawer = fixture.debugElement
          .query(By.directive(Wtf2Drawer)).componentInstance;

      drawer.open();
      fixture.detectChanges();
      tick();

      expect(fixture.componentInstance.isOpen).toBe(true);
    }));

    it('should not throw when a two-way binding is toggled quickly while aniwtf2ing',
      fakeAsync(() => {
        TestBed
          .resetTestingModule()
          .configureTestingModule({
            imports: [Wtf2SidenavModule, BrowserAnimationsModule],
            declarations: [DrawerOpenBinding],
          })
          .compileComponents();

        const fixture = TestBed.createComponent(DrawerOpenBinding);
        fixture.detectChanges();

        // Note that we need actual timeouts and the `BrowserAnimationsModule`
        // in order to test it correctly.
        setTimeout(() => {
          fixture.componentInstance.isOpen = !fixture.componentInstance.isOpen;
          expect(() => fixture.detectChanges()).not.toThrow();

          setTimeout(() => {
            fixture.componentInstance.isOpen = !fixture.componentInstance.isOpen;
            expect(() => fixture.detectChanges()).not.toThrow();
          }, 1);

          tick(1);
        }, 1);

        tick(1);
      }));

  });

  describe('focus trapping behavior', () => {
    let fixture: ComponentFixture<DrawerWithFocusableElements>;
    let testComponent: DrawerWithFocusableElements;
    let drawer: Wtf2Drawer;
    let firstFocusableElement: HTMLElement;
    let lastFocusableElement: HTMLElement;

    beforeEach(() => {
      fixture = TestBed.createComponent(DrawerWithFocusableElements);
      fixture.detectChanges();
      testComponent = fixture.debugElement.componentInstance;
      drawer = fixture.debugElement.query(By.directive(Wtf2Drawer)).componentInstance;
      firstFocusableElement = fixture.debugElement.query(By.css('.input1')).nativeElement;
      lastFocusableElement = fixture.debugElement.query(By.css('.input2')).nativeElement;
      lastFocusableElement.focus();
    });

    it('should trap focus when opened in "over" mode', fakeAsync(() => {
      testComponent.mode = 'over';
      fixture.detectChanges();
      lastFocusableElement.focus();

      drawer.open();
      fixture.detectChanges();
      tick();

      expect(document.activeElement).toBe(firstFocusableElement);
    }));

    it('should trap focus when opened in "push" mode', fakeAsync(() => {
      testComponent.mode = 'push';
      fixture.detectChanges();
      lastFocusableElement.focus();

      drawer.open();
      fixture.detectChanges();
      tick();

      expect(document.activeElement).toBe(firstFocusableElement);
    }));

    it('should not trap focus when opened in "side" mode', fakeAsync(() => {
      testComponent.mode = 'side';
      fixture.detectChanges();
      lastFocusableElement.focus();

      drawer.open();
      fixture.detectChanges();
      tick();

      expect(document.activeElement).toBe(lastFocusableElement);
    }));

    it('should focus the drawer if there are no focusable elements', fakeAsync(() => {
      fixture.destroy();

      const nonFocusableFixture = TestBed.createComponent(DrawerWithoutFocusableElements);
      const drawerEl = nonFocusableFixture.debugElement.query(By.directive(Wtf2Drawer));
      nonFocusableFixture.detectChanges();

      drawerEl.componentInstance.open();
      nonFocusableFixture.detectChanges();
      tick();

      expect(document.activeElement).toBe(drawerEl.nativeElement);
    }));

    it('should be able to disable auto focus', fakeAsync(() => {
      testComponent.autoFocus = false;
      testComponent.mode = 'push';
      fixture.detectChanges();
      lastFocusableElement.focus();

      drawer.open();
      fixture.detectChanges();
      tick();

      expect(document.activeElement).not.toBe(firstFocusableElement);
    }));

  });
});

describe('Wtf2DrawerContainer', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [Wtf2SidenavModule, A11yModule, PlatformModule, NoopAnimationsModule],
      declarations: [
        DrawerContainerTwoDrawerTestApp,
        DrawerDelayed,
        DrawerSetToOpenedTrue,
        DrawerContainerStateChangesTestApp,
        AutosizeDrawer,
        BasicTestApp,
        DrawerContainerWithContent,
      ],
    });

    TestBed.compileComponents();
  }));

  it('should be able to open and close all drawers', fakeAsync(() => {
    const fixture = TestBed.createComponent(DrawerContainerTwoDrawerTestApp);

    fixture.detectChanges();

    const testComponent: DrawerContainerTwoDrawerTestApp =
      fixture.debugElement.componentInstance;
    const drawers = fixture.debugElement.queryAll(By.directive(Wtf2Drawer));

    expect(drawers.every(drawer => drawer.componentInstance.opened)).toBe(false);

    testComponent.drawerContainer.open();
    fixture.detectChanges();
    tick();

    expect(drawers.every(drawer => drawer.componentInstance.opened)).toBe(true);

    testComponent.drawerContainer.close();
    fixture.detectChanges();
    flush();

    expect(drawers.every(drawer => drawer.componentInstance.opened)).toBe(false);
  }));

  it('should animate the content when a drawer is added at a later point', fakeAsync(() => {
    const fixture = TestBed.createComponent(DrawerDelayed);

    fixture.detectChanges();

    const contentElement = fixture.debugElement.nativeElement.querySelector('.wtf2-drawer-content');

    expect(parseInt(contentElement.style.marginLeft)).toBeFalsy();

    fixture.componentInstance.showDrawer = true;
    fixture.detectChanges();

    fixture.componentInstance.drawer.open();
    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    expect(parseInt(contentElement.style.marginLeft)).toBeGreaterThan(0);
  }));

  it('should recalculate the margin if a drawer is destroyed', fakeAsync(() => {
    const fixture = TestBed.createComponent(DrawerContainerStateChangesTestApp);

    fixture.detectChanges();
    fixture.componentInstance.drawer.open();
    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    const contentElement = fixture.debugElement.nativeElement.querySelector('.wtf2-drawer-content');
    const initialMargin = parseInt(contentElement.style.marginLeft);

    expect(initialMargin).toBeGreaterThan(0);

    fixture.componentInstance.renderDrawer = false;
    fixture.detectChanges();
    tick();

    expect(contentElement.style.marginLeft).toBe('');
  }));

  it('should recalculate the margin if the drawer mode is changed', fakeAsync(() => {
    const fixture = TestBed.createComponent(DrawerContainerStateChangesTestApp);

    fixture.detectChanges();
    fixture.componentInstance.drawer.open();
    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    const contentElement = fixture.debugElement.nativeElement.querySelector('.wtf2-drawer-content');
    const initialMargin = parseInt(contentElement.style.marginLeft);

    expect(initialMargin).toBeGreaterThan(0);

    fixture.componentInstance.mode = 'over';
    fixture.detectChanges();

    expect(contentElement.style.marginLeft).toBe('');
  }));

  it('should recalculate the margin if the direction has changed', fakeAsync(() => {
    const fixture = TestBed.createComponent(DrawerContainerStateChangesTestApp);

    fixture.detectChanges();
    fixture.componentInstance.drawer.open();
    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    const contentElement = fixture.debugElement.nativeElement.querySelector('.wtf2-drawer-content');
    const margin = parseInt(contentElement.style.marginLeft);

    expect(margin).toBeGreaterThan(0);

    fixture.componentInstance.direction = 'rtl';
    fixture.detectChanges();

    expect(contentElement.style.marginLeft).toBe('');
    expect(parseInt(contentElement.style.marginRight)).toBe(margin);
  }));

  it('should not animate when the sidenav is open on load ', fakeAsync(() => {
    TestBed
      .resetTestingModule()
      .configureTestingModule({
        imports: [Wtf2SidenavModule, BrowserAnimationsModule],
        declarations: [DrawerSetToOpenedTrue],
      })
      .compileComponents();

    const fixture = TestBed.createComponent(DrawerSetToOpenedTrue);

    fixture.detectChanges();
    tick();

    const container = fixture.debugElement.nativeElement.querySelector('.wtf2-drawer-container');

    expect(container.classList).not.toContain('wtf2-drawer-transition');
  }));

  it('should recalculate the margin if a drawer changes size while open in autosize mode',
    fakeAsync(() => {
      const fixture = TestBed.createComponent(AutosizeDrawer);

      fixture.detectChanges();
      fixture.componentInstance.drawer.open();
      fixture.detectChanges();
      tick();
      fixture.detectChanges();

      const contentEl = fixture.debugElement.nativeElement.querySelector('.wtf2-drawer-content');
      const initialMargin = parseInt(contentEl.style.marginLeft);

      expect(initialMargin).toBeGreaterThan(0);

      fixture.componentInstance.fillerWidth = 200;
      fixture.detectChanges();
      tick(10);
      fixture.detectChanges();

      expect(parseInt(contentEl.style.marginLeft)).toBeGreaterThan(initialMargin);
      discardPeriodicTasks();
    }));

  it('should not set a style property if it would be zero', fakeAsync(() => {
      const fixture = TestBed.createComponent(AutosizeDrawer);
      fixture.detectChanges();

      const content = fixture.debugElement.nativeElement.querySelector('.wtf2-drawer-content');
      expect(content.style.marginLeft).toBe('', 'Margin should be omitted when drawer is closed');

      // Open the drawer and resolve the open animation.
      fixture.componentInstance.drawer.open();
      fixture.detectChanges();
      tick();
      fixture.detectChanges();

      expect(content.style.marginLeft).not.toBe('', 'Margin should be present when drawer is open');

      // Close the drawer and resolve the close animation.
      fixture.componentInstance.drawer.close();
      fixture.detectChanges();
      flush();
      fixture.detectChanges();

      expect(content.style.marginLeft).toBe('', 'Margin should be removed after drawer close.');

      discardPeriodicTasks();
    }));

    it('should be able to toggle whether the container has a backdrop', fakeAsync(() => {
      const fixture = TestBed.createComponent(BasicTestApp);
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('.wtf2-drawer-backdrop')).toBeTruthy();

      fixture.componentInstance.hasBackdrop = false;
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('.wtf2-drawer-backdrop')).toBeFalsy();
    }));

    it('should be able to explicitly enable the backdrop in `side` mode', fakeAsync(() => {
      const fixture = TestBed.createComponent(BasicTestApp);
      const root = fixture.nativeElement;
      fixture.detectChanges();

      fixture.componentInstance.drawer.mode = 'side';
      fixture.detectChanges();
      fixture.componentInstance.drawer.open();
      fixture.detectChanges();
      tick();
      fixture.detectChanges();

      let backdrop = root.querySelector('.wtf2-drawer-backdrop.wtf2-drawer-shown');

      expect(backdrop).toBeFalsy();

      fixture.componentInstance.hasBackdrop = true;
      fixture.detectChanges();
      backdrop = root.querySelector('.wtf2-drawer-backdrop.wtf2-drawer-shown');

      expect(backdrop).toBeTruthy();
      expect(fixture.componentInstance.drawer.opened).toBe(true);

      backdrop.click();
      fixture.detectChanges();
      tick();

      expect(fixture.componentInstance.drawer.opened).toBe(false);
    }));

    it('should expose a scrollable when the consumer has not specified drawer content',
      fakeAsync(() => {
        const fixture = TestBed.createComponent(DrawerContainerTwoDrawerTestApp);

        fixture.detectChanges();

        expect(fixture.componentInstance.drawerContainer.scrollable instanceof CdkScrollable)
            .toBe(true);
      }));

    it('should expose a scrollable when the consumer has specified drawer content',
      fakeAsync(() => {
        const fixture = TestBed.createComponent(DrawerContainerWithContent);

        fixture.detectChanges();

        expect(fixture.componentInstance.drawerContainer.scrollable instanceof CdkScrollable)
            .toBe(true);
      }));


});


/** Test component that contains an Wtf2DrawerContainer but no Wtf2Drawer. */
@Component({template: `<wtf2-drawer-container></wtf2-drawer-container>`})
class DrawerContainerNoDrawerTestApp { }

/** Test component that contains an Wtf2DrawerContainer and 2 Wtf2Drawer in the same position. */
@Component({
  template: `
    <wtf2-drawer-container>
      <wtf2-drawer position="start"></wtf2-drawer>
      <wtf2-drawer position="end"></wtf2-drawer>
    </wtf2-drawer-container>`,
})
class DrawerContainerTwoDrawerTestApp {
  @ViewChild(Wtf2DrawerContainer, {static: false}) drawerContainer: Wtf2DrawerContainer;
}

/** Test component that contains an Wtf2DrawerContainer and one Wtf2Drawer. */
@Component({
  template: `
    <wtf2-drawer-container (backdropClick)="backdropClicked()" [hasBackdrop]="hasBackdrop">
      <wtf2-drawer #drawer="wtf2Drawer" position="start"
                 (opened)="open()"
                 (openedStart)="openStart()"
                 (closed)="close()"
                 (closedStart)="closeStart()">
        <button #drawerButton>Content</button>
      </wtf2-drawer>
      <button (click)="drawer.open()" class="open" #openButton></button>
      <button (click)="drawer.close()" class="close" #closeButton></button>
    </wtf2-drawer-container>`,
})
class BasicTestApp {
  openCount = 0;
  openStartCount = 0;
  closeCount = 0;
  closeStartCount = 0;
  backdropClickedCount = 0;
  hasBackdrop: boolean | null = null;

  @ViewChild('drawer', {static: false}) drawer: Wtf2Drawer;
  @ViewChild('drawerButton', {static: false}) drawerButton: ElementRef<HTMLButtonElement>;
  @ViewChild('openButton', {static: false}) openButton: ElementRef<HTMLButtonElement>;
  @ViewChild('closeButton', {static: false}) closeButton: ElementRef<HTMLButtonElement>;

  open() {
    this.openCount++;
  }

  openStart() {
    this.openStartCount++;
  }

  close() {
    this.closeCount++;
  }

  closeStart() {
    this.closeStartCount++;
  }

  backdropClicked() {
    this.backdropClickedCount++;
  }
}

@Component({
  template: `
    <wtf2-drawer-container>
      <wtf2-drawer #drawer mode="side" opened="false">
        Closed Drawer.
      </wtf2-drawer>
    </wtf2-drawer-container>`,
})
class DrawerSetToOpenedFalse { }

@Component({
  template: `
    <wtf2-drawer-container>
      <wtf2-drawer #drawer mode="side" opened="true" (opened)="openCallback()">
        Closed Drawer.
      </wtf2-drawer>
    </wtf2-drawer-container>`,
})
class DrawerSetToOpenedTrue {
  openCallback = jasmine.createSpy('open callback');
}

@Component({
  template: `
    <wtf2-drawer-container>
      <wtf2-drawer #drawer mode="side" [(opened)]="isOpen">
        Closed Drawer.
      </wtf2-drawer>
    </wtf2-drawer-container>`,
})
class DrawerOpenBinding {
  isOpen = false;
}

@Component({
  template: `
    <wtf2-drawer-container>
      <wtf2-drawer #drawer1 [position]="drawer1Position"></wtf2-drawer>
      <wtf2-drawer #drawer2 [position]="drawer2Position"></wtf2-drawer>
    </wtf2-drawer-container>`,
})
class DrawerDynamicPosition {
  drawer1Position = 'start';
  drawer2Position = 'end';
}

@Component({
  // Note: we use inputs here, because they're guaranteed
  // to be focusable across all platforms.
  template: `
    <wtf2-drawer-container>
      <wtf2-drawer position="start" [mode]="mode" [autoFocus]="autoFocus">
        <input type="text" class="input1"/>
      </wtf2-drawer>
      <input type="text" class="input2"/>
    </wtf2-drawer-container>`,
})
class DrawerWithFocusableElements {
  mode: string = 'over';
  autoFocus = true;
}

@Component({
  template: `
    <wtf2-drawer-container>
      <wtf2-drawer position="start" mode="over">
        <button disabled>Not focusable</button>
      </wtf2-drawer>
    </wtf2-drawer-container>`,
})
class DrawerWithoutFocusableElements {}

@Component({
  template: `
    <wtf2-drawer-container>
      <wtf2-drawer *ngIf="showDrawer" #drawer mode="side">Drawer</wtf2-drawer>
    </wtf2-drawer-container>
  `,
})
class DrawerDelayed {
  @ViewChild(Wtf2Drawer, {static: false}) drawer: Wtf2Drawer;
  showDrawer = false;
}


@Component({
  template: `
    <wtf2-drawer-container [dir]="direction">
      <wtf2-drawer *ngIf="renderDrawer" [mode]="mode" style="width:100px"></wtf2-drawer>
    </wtf2-drawer-container>`,
})
class DrawerContainerStateChangesTestApp {
  @ViewChild(Wtf2Drawer, {static: false}) drawer: Wtf2Drawer;
  @ViewChild(Wtf2DrawerContainer, {static: false}) drawerContainer: Wtf2DrawerContainer;

  direction: Direction = 'ltr';
  mode = 'side';
  renderDrawer = true;
}


@Component({
  template: `
    <wtf2-drawer-container autosize>
      <wtf2-drawer mode="push" [position]="drawer1Position">
        Text
        <div [style.width.px]="fillerWidth"></div>
      </wtf2-drawer>
    </wtf2-drawer-container>`,
})
class AutosizeDrawer {
  @ViewChild(Wtf2Drawer, {static: false}) drawer: Wtf2Drawer;
  fillerWidth = 0;
}


@Component({
  template: `
    <wtf2-drawer-container>
      <wtf2-drawer>Drawer</wtf2-drawer>
      <wtf2-drawer-content>Content</wtf2-drawer-content>
    </wtf2-drawer-container>
  `,
})
class DrawerContainerWithContent {
  @ViewChild(Wtf2DrawerContainer, {static: false}) drawerContainer: Wtf2DrawerContainer;
}
