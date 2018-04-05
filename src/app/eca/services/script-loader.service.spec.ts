import {TestBed, inject} from '@angular/core/testing';

import {ScriptLoaderService} from './script-loader.service';

describe('ScriptLoaderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ScriptLoaderService],
    });
  });

  it('should be created', inject([ScriptLoaderService], (service: ScriptLoaderService) => {
    expect(service).toBeTruthy();
  }));

  describe('load', () => {
    it('should create an element and append it to the HEAD', (done) => {
      inject([ScriptLoaderService], (service: ScriptLoaderService) => {

        const testElement: any = {};
        const appendChild = jasmine.createSpy('appendChild');

        spyOn(document, 'createElement').and.returnValue(testElement);
        spyOn(document, 'getElementsByTagName').and.returnValue([{
          appendChild,
        }]);

        service.load('some.random.url').then(() => {
          expect(document.createElement).toHaveBeenCalled();
          expect(testElement.src).toBe('some.random.url');
          expect(appendChild).toHaveBeenCalledWith(testElement);
          done();
        });

        testElement.onload();
      })();
    });
  });

});
