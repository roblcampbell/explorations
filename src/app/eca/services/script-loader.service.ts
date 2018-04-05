import {Injectable, NgZone} from '@angular/core';

@Injectable()
export class ScriptLoaderService {

  constructor(private zone: NgZone) {

  }

  load(url) {
    const rejectFunc = (err) => {
      let errMsg = 'Could not load script: ${url}';
      if (err) {
        errMsg += ' Reason: ${err}';
      }
      console.log(errMsg);
      return errMsg;
    };
    return new Promise((resolve, reject) => {
      this.zone.runOutsideAngular(() => {
        const scriptElement = document.createElement('script');

        scriptElement.src = url;
        scriptElement.type = 'text/javascript';
        scriptElement.async = true;
        scriptElement.charset = 'utf-8';
        scriptElement.onload = resolve;

        console.log(`Loading ${url} into <head>`);
        document
          .getElementsByTagName('head')[0]
          .appendChild(scriptElement);
      });
    }).catch(rejectFunc);
  }
}
