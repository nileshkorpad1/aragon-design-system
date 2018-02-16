import { GroupDemoModule } from './group-demo.module';

describe('GroupDemoModule', () => {
  let groupDemoModule: GroupDemoModule;

  beforeEach(() => {
    groupDemoModule = new GroupDemoModule();
  });

  it('should create an instance', () => {
    expect(groupDemoModule).toBeTruthy();
  });
});
