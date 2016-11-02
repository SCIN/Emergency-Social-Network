'use strict';

const assert = require('assert');
const db = require('../utils/db');

describe('db', function() {
  describe('.getCitizen()', function() {
    it('should return citizen', function() {
      return db.getCitizen('Ivor').then(citizen => {
        assert.strictEqual(citizen.name, 'Ivor');
      });
    });
  });

  describe('.addCitizen()', function() {
    it('should add new citizen', function() {
        const dummy = {
          name : "Hector1",
          password: "Niceday1"
        };
        return db.addCitizen(dummy).then(() => {
          return db.getCitizen(dummy.name).then(citizen => {
            assert.strictEqual(citizen.name, dummy.name);
          });
        });
    });
  });

  describe('.updateCitizenState()', function() {
    it('should update citizen online status to true', function() {
      const state_body = {
        name : 'Ivor',
        online : true
      };
      return db.updateCitizenState(state_body).then(() => {
        return db.getCitizen(state_body.name).then(citizen => {
          assert.strictEqual(citizen.online, true);
        });
      });
    });

    it('should update citizen online status to false', function() {
      const state_body = {
        name : 'Ivor',
        online : false
      };
      return db.updateCitizenState(state_body).then(() => {
        return db.getCitizen(state_body.name).then(citizen => {
          assert.strictEqual(citizen.online, false);
        });
      });
    });
  });

  // complying to JSDoc syntax
  describe('.getAllCitizen()', function() {
    it('should return 2 citizen dummies', function() {
      // mocha accepts promise; just return the promise like the following
      return db.getAllCitizen()
      .then(citizens => {
        // assume the db contains the seed data in utils/ESN.sql
        // filter out unexpected names and sort with name
        citizens = citizens.filter(a => a.name == 'Ivor' || a.name == 'Ivory')
        .sort((a, b) => a.name.localeCompare(b.name));
        assert.strictEqual(citizens[0].name, 'Ivor');
        assert.strictEqual(citizens[1].name, 'Ivory');
      });
    });
  });

  describe('.getAllCitizenStatus', function() {
    it('should return 2 citizen dummies', function() {
      return db.getAllCitizenStatus()
      .then(citizens => {
        citizens = citizens.filter(a => a.name == 'Ivor' || a.name == 'Ivory')
        .sort((a, b) => a.name.localeCompare(b.name));
        assert.strictEqual(citizens[0].name, 'Ivor');
        assert.strictEqual(citizens[1].name, 'Ivory');
        assert.strictEqual(citizens[0].status, 'OK');
        assert.strictEqual(citizens[1].status, 'OK');
      });
    });
  });

  describe('.authenticate()', function() {
    it('should approve with correct password', function() {
      const auth_body = {
        name : 'Ivor',
        password : '9aa6e5f2256c17d2d430b100032b997c'
      };
      return db.authenticate(auth_body);
    });

    it('should fail with incorrect password', function() {
      const auth_body = {
        name : 'Ivor',
        password : 'definitely-wrong-password',
      };
      return db.authenticate(auth_body)
      .then(() => assert.fail(1, 2, 'authenticate goes to then() which is not acceptable', '>'), () => {});
    });
  });
});
