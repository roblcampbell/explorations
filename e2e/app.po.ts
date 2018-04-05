import {browser, by, element} from 'protractor';
import {createWriteStream} from 'fs';
import * as request from 'request';

export class AppPage {

  navigateBeforeAll(timeout?, token?) {
    beforeAll(async () => {
      await this.navigateTo(timeout, token);
    });
  }

  navigateTo(timeout = 2000, token?) {
    return new Promise((resolve, reject) => {
      // apparently browser.get() isn't actually returning a promise
      // wrap a timeout in a promise so we can await navigation
      // tslint:disable-next-line
      request({
        url: 'https://api-gateway-dev.drcedirect.com/eca-security-service/all-development-v0/v0/authenticate',
        method: 'post',
        json: {
          username: 'eca-local-scanning-web-ui@example.com',
          password: 'Test123$',
        },
      }, (error, response, body) => {
        browser.get(`/scan?t=${token || body.token}`);
        setTimeout(() => {
          resolve();
        }, timeout);
      });
    });
  }

  getHeaderNavElement() {
    return element(by.css('.ecaPortalHeader_nav'));
  }

  getTitleText() {
    return element(by.css('app-root h1')).getText();
  }

  getBatchCardElement() {
    return element(by.css('#app-controls .mat-card'));
  }

  getListItemByContent(text) {
    return element(by.cssContainingText('.mat-list-item-content', text));
  }

  getSpinnerByContent(text) {
    return this.getListItemByContent(text)
      .element(by.css('mat-progress-spinner'));
  }

  getIconByContent(text, icon) {
    return this.getListItemByContent(text)
      .element(by.cssContainingText('.mat-list-icon', icon));
  }

  getDoneButton() {
    return element(by.cssContainingText('button', 'Done'));
  }

  screenshot(filename) {
    browser.takeScreenshot().then((png) => {
      const stream = createWriteStream(filename);
      stream.write(new Buffer(png, 'base64'));
      stream.end();
    });
  }
}
