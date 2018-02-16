import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsdemoComponent } from './settingsdemo.component';

describe('SettingsdemoComponent', () => {
  let component: SettingsdemoComponent;
  let fixture: ComponentFixture<SettingsdemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsdemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsdemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
