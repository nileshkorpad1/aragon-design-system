import { AutocompleteModule } from './autocomplete.module';

describe('AutocompleteModule', () => {
  let autocompleteModule: AutocompleteModule;

  beforeEach(() => {
    autocompleteModule = new AutocompleteModule();
  });

  it('should create an instance', () => {
    expect(autocompleteModule).toBeTruthy();
  });
});
