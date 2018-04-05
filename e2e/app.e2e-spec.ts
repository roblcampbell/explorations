import {AppPage} from './app.po';
import {browser} from 'protractor';

// If a promise rejects after an async test function has finished,
// halt and catch fire instead of silently passing the test.
process.on('unhandledRejection', (up) => {
  throw up;
});

describe('hitting page with an invalid token', () => {
  const page: AppPage = new AppPage();

  page.navigateBeforeAll(1000, 'some_invalid_token');

  it('should redirect the user to the unauthorized route', async () => {
    expect(await browser.getCurrentUrl()).toMatch(/\/unauthorized$/);
  });
});

describe('my-app-name-ui App', () => {
  const page: AppPage = new AppPage();

  page.navigateBeforeAll(1000);

  it('should display title', async () => {
    expect(await page.getTitleText()).toEqual('DRC My App Name');
  });

  it('should display the portal navigation header', async () => {
    const headerNav = page.getHeaderNavElement();
    expect(await headerNav.isDisplayed()).toBeTruthy();
  });

  it('should display a batch status card', async () => {
    const cardElement = page.getBatchCardElement();
    expect(await cardElement.isDisplayed()).toBeTruthy();
  });

});
