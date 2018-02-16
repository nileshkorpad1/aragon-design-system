import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TreePartiallyComponent } from './tree-partially.component';

describe('TreePartiallyComponent', () => {
  let component: TreePartiallyComponent;
  let fixture: ComponentFixture<TreePartiallyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TreePartiallyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TreePartiallyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
