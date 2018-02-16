import { TestBed } from '@angular/core/testing';

import { GroupDemoService } from './group-demo.service';

describe('GroupDemoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GroupDemoService = TestBed.get(GroupDemoService);
    expect(service).toBeTruthy();
  });
});
