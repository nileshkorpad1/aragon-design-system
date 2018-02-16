import {browser, by, element} from 'protractor';

describe('progress-spinner', () => {
  beforeEach(async () => await browser.get('/progress-spinner'));

  it('should render a determinate progress spinner', async () => {
    expect(await element(by.css('wtf2-progress-spinner')).isPresent()).toBe(true);
  });

  it('should render an indeterminate progress spinner', async () => {
    expect(await element(by.css('wtf2-progress-spinner[mode="indeterminate"]')).isPresent())
        .toBe(true);
  });

  it('should render a spinner', async () => {
    expect(await element(by.css('wtf2-spinner')).isPresent()).toBe(true);
  });
});
