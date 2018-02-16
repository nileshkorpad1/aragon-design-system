import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {Wtf2EditorComponent} from './wtf2-editor.component';
import {Wtf2EditorToolbarComponent} from "./wtf2-editor-toolbar.component";
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";

describe('Wtf2EditorComponent', () => {
  let component: Wtf2EditorComponent;
  let fixture: ComponentFixture<Wtf2EditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, HttpClientModule ],
      declarations: [Wtf2EditorComponent, Wtf2EditorToolbarComponent, ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Wtf2EditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
