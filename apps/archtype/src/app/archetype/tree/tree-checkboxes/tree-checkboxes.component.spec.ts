import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TreeCheckboxesComponent } from './tree-checkboxes.component';

describe('TreeCheckboxesComponent', () => {
  let component: TreeCheckboxesComponent;
  let fixture: ComponentFixture<TreeCheckboxesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TreeCheckboxesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TreeCheckboxesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
