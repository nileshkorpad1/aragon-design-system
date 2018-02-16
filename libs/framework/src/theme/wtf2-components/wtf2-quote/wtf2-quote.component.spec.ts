import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Wtf2QuoteComponent } from './wtf2-quote.component';

describe('Wtf2QuoteComponent', () => {
  let component: Wtf2QuoteComponent;
  let fixture: ComponentFixture<Wtf2QuoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Wtf2QuoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Wtf2QuoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
