import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WYSIWYGLayoutComponent } from './wysiwyg-layout.component';

describe('WYSIWYGLayoutComponent', () => {
  let component: WYSIWYGLayoutComponent;
  let fixture: ComponentFixture<WYSIWYGLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WYSIWYGLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WYSIWYGLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
