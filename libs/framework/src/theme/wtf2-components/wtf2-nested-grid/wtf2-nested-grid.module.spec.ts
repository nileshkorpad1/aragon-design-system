import { Wtf2NestedGridModule } from './wtf2-nested-grid.module';

describe('Wtf2NestedGridModule', () => {
  let wtf2NestedGridModule: Wtf2NestedGridModule;

  beforeEach(() => {
    wtf2NestedGridModule = new Wtf2NestedGridModule();
  });

  it('should create an instance', () => {
    expect(wtf2NestedGridModule).toBeTruthy();
  });
});
