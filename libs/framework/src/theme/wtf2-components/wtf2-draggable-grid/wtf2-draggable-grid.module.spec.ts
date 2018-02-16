import { Wtf2DraggableGridModule } from './wtf2-draggable-grid.module';

describe('Wtf2DraggableGridModule', () => {
  let wtf2DraggableGridModule: Wtf2DraggableGridModule;

  beforeEach(() => {
    wtf2DraggableGridModule = new Wtf2DraggableGridModule();
  });

  it('should create an instance', () => {
    expect(wtf2DraggableGridModule).toBeTruthy();
  });
});
