import { Wtf2GridModule } from './wtf2-grid.module';

describe('Wtf2GridModule', () => {
  let wtf2GridModule: Wtf2GridModule;

  beforeEach(() => {
    wtf2GridModule = new Wtf2GridModule();
  });

  it('should create an instance', () => {
    expect(wtf2GridModule).toBeTruthy();
  });
});
