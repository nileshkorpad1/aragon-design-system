import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Wtf2RowDetailsComponent } from './wtf2-row-details.component';

describe('Wtf2RowDetailsComponent', () => {
  let component: Wtf2RowDetailsComponent;
  let fixture: ComponentFixture<Wtf2RowDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Wtf2RowDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Wtf2RowDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
