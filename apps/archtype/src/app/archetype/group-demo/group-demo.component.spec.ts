import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupDemoComponent } from './group-demo.component';

describe('GroupDemoComponent', () => {
  let component: GroupDemoComponent;
  let fixture: ComponentFixture<GroupDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
