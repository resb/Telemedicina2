'use strict';

describe('Specialties E2E Tests:', function () {
  describe('Test Specialties page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/specialties');
      expect(element.all(by.repeater('specialty in specialties')).count()).toEqual(0);
    });
  });
});
