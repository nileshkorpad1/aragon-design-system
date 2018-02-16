import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Wtf2PriceFormatComponent } from './wtf2-price-format.component';

describe('Wtf2PriceFormatComponent', () => {
  let component: Wtf2PriceFormatComponent;
  let fixture: ComponentFixture<Wtf2PriceFormatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Wtf2PriceFormatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Wtf2PriceFormatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
