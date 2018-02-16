import { AddCustomerModule } from './add-customer.module';

describe('AddCustomerModule', () => {
  let addCustomerModule: AddCustomerModule;

  beforeEach(() => {
    addCustomerModule = new AddCustomerModule();
  });

  it('should create an instance', () => {
    expect(addCustomerModule).toBeTruthy();
  });
});
