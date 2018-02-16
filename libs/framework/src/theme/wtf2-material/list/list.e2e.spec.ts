import {browser} from 'protractor';
import {expectToExist} from '@angular/cdk/testing/e2e';

describe('list', () => {
  beforeEach(async () => await browser.get('/list'));

  it('should render a list container', async () => {
    await expectToExist('wtf2-list');
  });

  it('should render list items inside the list container', async () => {
    await expectToExist('wtf2-list wtf2-list-item');
  });
});
