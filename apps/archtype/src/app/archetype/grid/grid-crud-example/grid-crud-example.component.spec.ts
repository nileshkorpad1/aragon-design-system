import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GridCrudExampleComponent } from './grid-crud-example.component';

describe('GridCrudExampleComponent', () => {
  let component: GridCrudExampleComponent;
  let fixture: ComponentFixture<GridCrudExampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GridCrudExampleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GridCrudExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
