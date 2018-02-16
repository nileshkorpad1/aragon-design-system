import { AccordionGridCheckboxModule } from './accordion-grid-checkbox.module';

describe('AccordionGridCheckboxModule', () => {
  let accordionGridCheckboxModule: AccordionGridCheckboxModule;

  beforeEach(() => {
    accordionGridCheckboxModule = new AccordionGridCheckboxModule();
  });

  it('should create an instance', () => {
    expect(accordionGridCheckboxModule).toBeTruthy();
  });
});
