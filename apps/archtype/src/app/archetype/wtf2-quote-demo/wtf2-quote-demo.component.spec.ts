import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Wtf2QuoteDemoComponent } from './wtf2-quote-demo.component';

describe('Wtf2QuoteDemoComponent', () => {
  let component: Wtf2QuoteDemoComponent;
  let fixture: ComponentFixture<Wtf2QuoteDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Wtf2QuoteDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Wtf2QuoteDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
