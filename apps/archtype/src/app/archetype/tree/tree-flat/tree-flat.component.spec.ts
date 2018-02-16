import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TreeFlatComponent } from './tree-flat.component';

describe('TreeFlatComponent', () => {
  let component: TreeFlatComponent;
  let fixture: ComponentFixture<TreeFlatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TreeFlatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TreeFlatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
