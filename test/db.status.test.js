'use strict';

const assert = require('assert');
const db = require('../utils/db');

describe('db', function() {
	describe('.updateCitizenStatus', function() {
		it('should update citizen status to emergency', function() {
			const status_body = {
				userName : 'Ivor',
				statusCode : 'emergency',
				location : 'Bldg 33',
				timestamp : '2016-6-7'
			};

			return db.updateCitizenStatus(status_body).then(() => {
				return db.getAllCitizenStatus().then(citizens => {
					for(var citizen of citizens) {
						if (citizen.name == status_body.userName) {
							assert.strictEqual(citizen.status, status_body.statusCode);
							assert.strictEqual(citizen.location, status_body.location);
							assert.strictEqual(citizen.timestamp, status_body.timestamp);
						}
					}
				});
			});
		});

		it('should update citizen status to help', function() {
			const status_body = {
				userName : 'Ivor',
				statusCode : 'help',
				location : 'Bldg 33',
				timestamp : '2016-6-7'
			};

			return db.updateCitizenStatus(status_body).then(() => {
				return db.getAllCitizenStatus().then(citizens => {
					for(var citizen of citizens) {
						if (citizen.name == status_body.userName) {
							assert.strictEqual(citizen.status, status_body.statusCode);
							assert.strictEqual(citizen.location, status_body.location);
							assert.strictEqual(citizen.timestamp, status_body.timestamp);
						}
					}
				});
			});
		});

		it('should update citizen status to ok', function() {
			const status_body = {
				userName : 'Ivor',
				statusCode : 'ok',
				location : 'Bldg 33',
				timestamp : '2016-6-7'
			};

			return db.updateCitizenStatus(status_body).then(() => {
				return db.getAllCitizenStatus().then(citizens => {
					for(var citizen of citizens) {
						if (citizen.name == status_body.userName) {
							assert.strictEqual(citizen.status, status_body.statusCode);
							assert.strictEqual(citizen.location, status_body.location);
							assert.strictEqual(citizen.timestamp, status_body.timestamp);
						}
					}
				});
			});
		});
	});

	describe('.getStatusHistory', function() {
		it('should return status history for one particular citizen', function() {
			return db.getStatusHistory('Ivor').then(histories => {
				assert.strictEqual(histories[0].name, 'Ivor');
				assert.strictEqual(histories[0].location, 'Bldg 33');
				assert.strictEqual(histories[0].status, 'emergency');
				assert.strictEqual(histories[0].timestamp, '2016-6-7');
			});
		});
	});
});

