import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Wtf2ExpansionToolbarComponent } from './wtf2-expansion-toolbar.component';

describe('Wtf2ExpansionToolbarComponent', () => {
  let component: Wtf2ExpansionToolbarComponent;
  let fixture: ComponentFixture<Wtf2ExpansionToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Wtf2ExpansionToolbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Wtf2ExpansionToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
