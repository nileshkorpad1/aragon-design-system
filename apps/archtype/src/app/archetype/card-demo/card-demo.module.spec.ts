import { CardDemoModule } from './card-demo.module';

describe('CardDemoModule', () => {
  let cardDemoModule: CardDemoModule;

  beforeEach(() => {
    cardDemoModule = new CardDemoModule();
  });

  it('should create an instance', () => {
    expect(cardDemoModule).toBeTruthy();
  });
});
