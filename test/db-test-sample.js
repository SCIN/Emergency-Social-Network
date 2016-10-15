'use strict';

const assert = require('assert');
const db = require('../utils/db');

describe('db', function() {
  // complying to JSDoc syntax
  describe('.getAllCitizen()', function() {
    it('should return 2 citizen dummies', function() {
      // mocha accepts promise; just return the promise like the following
      return db.getAllCitizen()
      .then(citizens => {
        // assume the db contains the seed data in utils/ESN.sql
        assert.strictEqual(citizens[0].name, 'Ivor');
        assert.strictEqual(citizens[1].name, 'Ivory');
      });
    });
  });
});
