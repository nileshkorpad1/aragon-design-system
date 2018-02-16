import {inject, TestBed} from '@angular/core/testing';

import {Wtf2EditorService} from './wtf2-editor.service';
import {HttpClientModule} from "@angular/common/http";

describe('Wtf2EditorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientModule ],
      providers: [Wtf2EditorService]
    });
  });

  it('should be created', inject([Wtf2EditorService], (service: Wtf2EditorService) => {
    expect(service).toBeTruthy();
  }));
});
