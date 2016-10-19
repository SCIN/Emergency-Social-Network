'use strict';

const assert = require('assert');
const db = require('../utils/db');

describe('db', function() {
	describe('.getAnnouncements', function() {
		it('should return at least one annoucement', function() {
			return db.getAnnouncements()
			.then(annoucements => {
				annoucements = annoucements.filter(a => a.sender == 'Ivor' || a.sender == 'Ivory')
							.sort((a, b) => a.sender.localeCompare(b.sender));
				assert.strictEqual(annoucements[0].sender, 'Ivor');
				assert.strictEqual(annoucements[0].text, 'Hello, this is an announcement from Ivor');
				assert.strictEqual(annoucements[1].sender, 'Ivory');
				assert.strictEqual(annoucements[1].text, 'Hello, this is an announcement');
			});
		});
	});

	describe('.postAnnouncement', function() {
		it('should post a new annoucement', function() {
			const announcement_body = {
				text : "There is going to be an earthquake in about 5 minuts.",
				timestamp : "2016-10-21",
				sender : "Ivory",
				location : "Building 23"
			};

			return db.postAnnouncement(announcement_body).then(() => {
				return db.getAnnouncements().then(annoucements => {
					for(var annoucement of annoucements) {
						var exist = true;
						for(var key of annoucements.keys()) {
							if (annoucement.key != announcement_body.key) {
								exist = false;
							}
						}
					}
					assert.strictEqual(exist, true);
				});
			});
		});
	});
});