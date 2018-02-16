import { Wtf2SkeletonModule } from './skeleton.module';

describe('Wtf2SkeletonModule', () => {
  let wtf2SkeletonModule: Wtf2SkeletonModule;

  beforeEach(() => {
    wtf2SkeletonModule = new Wtf2SkeletonModule();
  });

  it('should create an instance', () => {
    expect(wtf2SkeletonModule).toBeTruthy();
  });
});
