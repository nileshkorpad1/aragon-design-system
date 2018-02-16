import {fakeAsync, ComponentFixture, TestBed} from '@angular/core/testing';
import {Component} from '@angular/core';
import {By} from '@angular/platform-browser';
import {Wtf2DividerModule} from './divider-module';


describe('Wtf2Divider', () => {

  let fixture: ComponentFixture<Wtf2DividerTestComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [Wtf2DividerModule],
      declarations: [Wtf2DividerTestComponent],
    });

    TestBed.compileComponents();
    fixture = TestBed.createComponent(Wtf2DividerTestComponent);
  }));

  it('should apply vertical class to vertical divider', () => {
    fixture.componentInstance.vertical = true;
    fixture.detectChanges();

    const divider = fixture.debugElement.query(By.css('wtf2-divider'));
    expect(divider.nativeElement.classList).toContain('wtf2-divider');
    expect(divider.nativeElement.classList).toContain('wtf2-divider-vertical');
  });

  it('should apply horizontal class to horizontal divider', () => {
    fixture.componentInstance.vertical = false;
    fixture.detectChanges();

    const divider = fixture.debugElement.query(By.css('wtf2-divider'));
    expect(divider.nativeElement.classList).toContain('wtf2-divider');
    expect(divider.nativeElement.classList).not.toContain('wtf2-divider-vertical');
    expect(divider.nativeElement.classList).toContain('wtf2-divider-horizontal');
  });

  it('should apply inset class to inset divider', () => {
    fixture.componentInstance.inset = true;
    fixture.detectChanges();

    const divider = fixture.debugElement.query(By.css('wtf2-divider'));
    expect(divider.nativeElement.classList).toContain('wtf2-divider');
    expect(divider.nativeElement.classList).toContain('wtf2-divider-inset');
  });

  it('should apply inset and vertical classes to vertical inset divider', () => {
    fixture.componentInstance.vertical = true;
    fixture.componentInstance.inset = true;
    fixture.detectChanges();

    const divider = fixture.debugElement.query(By.css('wtf2-divider'));
    expect(divider.nativeElement.classList).toContain('wtf2-divider');
    expect(divider.nativeElement.classList).toContain('wtf2-divider-inset');
    expect(divider.nativeElement.classList).toContain('wtf2-divider-vertical');
  });

  it('should add aria roles properly', () => {
    fixture.detectChanges();

    const divider = fixture.debugElement.query(By.css('wtf2-divider'));
    expect(divider.nativeElement.getAttribute('role')).toBe('separator');
  });
});

@Component({
  template: `<wtf2-divider [vertical]="vertical" [inset]="inset"></wtf2-divider>`
})
class Wtf2DividerTestComponent {
  vertical: boolean;
  inset: boolean;
}
