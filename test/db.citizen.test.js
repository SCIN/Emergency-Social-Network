'use strict';

const assert = require('assert');
const db = require('../utils/db');

describe('db', function() {
  describe('.addCitizen()', function() {
    it('should add new citizen', function() {
        const dummy = {
          name : "Hector1",
          password: "Niceday1"
        };
        return db.addCitizen(dummy).then(() => {
          return db.getCitizen(dummy.name).then(citizens => {
            assert(citizens.length > 0);
          });
        });
    });
  });
  describe('.updateCitizenState()', function() {
    it('should update citizen status to true', function() {
      const state_body = {
        name : 'Ivor',
        online : true,
      };
      return db.updateCitizenState(state_body).then(() => {
        return db.getCitizen(state_body.name).then(citizens => {
          const citizen = citizens[0];
          assert.strictEqual(citizen.online, true);
        });
      });
    });
    it('should update citizen status to false', function() {
      const state_body = {
        name : 'Ivor',
        online : false,
      };
      return db.updateCitizenState(state_body).then(() => {
        return db.getCitizen(state_body.name).then(citizens => {
          const citizen = citizens[0];
          assert.strictEqual(citizen.online, false);
        });
      });
    });
  });
  describe('.checkCitizen()', function() {
    it('should resolve success when citizen is found', function() {
      return db.checkCitizen('Ivor');
    });
    it('should fail when citizen is not found', function() {
      return db.checkCitizen('the-name-definitely-not-exist')
      .then(() => assert.fail(null, null, 'checkCitizen goes to then() which is not acceptable'), () => {});
    });
  });
  describe('.getCitizen()', function() {
    it('should return citizen', function() {
      return db.getCitizen('Ivor').then(citizens => {
        assert.strictEqual(citizens[0].name, 'Ivor');
      });
    });
  });
  describe('.authenticate()', function() {
    it('should approve with correct password', function() {
      const auth_body = {
        name : 'Ivor',
        password : 'lalala',
      };
      return db.authenticate(auth_body);
    });
    it('should fail with incorrect password', function() {
      const auth_body = {
        name : 'Ivor',
        password : 'definitely-wrong-password',
      };
      return db.authenticate(auth_body)
      .then(() => assert.fail(null, null, 'authenticate goes to then() which is not acceptable'), () => {});
    });
  });
});
