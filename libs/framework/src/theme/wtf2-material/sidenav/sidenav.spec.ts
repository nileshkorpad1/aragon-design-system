import {Component} from '@angular/core';
import {async, TestBed, ComponentFixture} from '@angular/core/testing';
import {Wtf2Sidenav, Wtf2SidenavModule} from './index';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {By} from '@angular/platform-browser';


describe('Wtf2Sidenav', () => {
  let fixture: ComponentFixture<SidenavWithFixedPosition>;
  let sidenavEl: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [Wtf2SidenavModule, NoopAnimationsModule],
      declarations: [SidenavWithFixedPosition],
    });

    TestBed.compileComponents();

    fixture = TestBed.createComponent(SidenavWithFixedPosition);
    fixture.detectChanges();

    sidenavEl = fixture.debugElement.query(By.directive(Wtf2Sidenav)).nativeElement;
  }));

  it('should be fixed position when in fixed mode', () => {
    expect(sidenavEl.classList).toContain('wtf2-sidenav-fixed');

    fixture.componentInstance.fixed = false;
    fixture.detectChanges();

    expect(sidenavEl.classList).not.toContain('wtf2-sidenav-fixed');
  });

  it('should set fixed bottom and top when in fixed mode', () => {
    expect(sidenavEl.style.top).toBe('20px');
    expect(sidenavEl.style.bottom).toBe('30px');

    fixture.componentInstance.fixed = false;
    fixture.detectChanges();

    expect(sidenavEl.style.top).toBeFalsy();
    expect(sidenavEl.style.bottom).toBeFalsy();
  });
});


@Component({
  template: `
    <wtf2-sidenav-container>
      <wtf2-sidenav
          #drawer
          [fixedInViewport]="fixed"
          [fixedTopGap]="fixedTop"
          [fixedBottomGap]="fixedBottom">
        Drawer.
      </wtf2-sidenav>
      <wtf2-sidenav-content>
        Some content.
      </wtf2-sidenav-content>
    </wtf2-sidenav-container>`,
})
class SidenavWithFixedPosition {
  fixed = true;
  fixedTop = 20;
  fixedBottom = 30;
}
