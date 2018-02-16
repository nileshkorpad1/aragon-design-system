import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Wtf2FileUploadComponent } from './wtf2-file-upload.component';

describe('Wtf2FileUploadComponent', () => {
  let component: Wtf2FileUploadComponent;
  let fixture: ComponentFixture<Wtf2FileUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Wtf2FileUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Wtf2FileUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
