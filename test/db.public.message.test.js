'use strict';

const assert = require('assert');
const db = require('../utils/db');

describe('db', function() {
	describe('.getPublicMessage', function() {
		it('should return at least two messages', function() {
			return db.getPublicMessage()
			.then(messages => {
				messages = messages.filter(a => a.sender == 'Ivor' || a.sender == 'Ivory')
							.sort((a, b) => a.sender.localeCompare(b.sender));
				assert.strictEqual(messages[0].sender, 'Ivor');
				assert.strictEqual(messages[0].timestamp, '2016-1-1');
				assert.strictEqual(messages[1].sender, 'Ivory');
				assert.strictEqual(messages[1].timestamp, '2016-2-1');
			});
		});
	});

	describe('.getPublicMessageOfUser', function() {
		it('should return only the messages of one particular user', function() {
			return db.getPublicMessageOfUser('Ivor')
			.then(messages => {
				for(var message of messages) {
					assert.strictEqual(message.sender, 'Ivor');
				}
			});
		});
	});

	describe('.postPublicMessage', function() {
		it('should post new message', function() {
			const msg_body = {
				text : "HelloFSEsss",
				timestamp : "2016-9-21",
				sender : "Ivory",
				status : "ok",
				location : "Building 19"
			};
			
			return db.postPublicMessage(msg_body).then(() => {
				return db.getPublicMessage().then(messages => {
					for(var message of messages) {
						var exist = true;
						for(var key of messages.keys()) {
							if (message.key != msg_body.key) {
								exist = false;
							}
						}
            assert.strictEqual(exist, true);
					}
				});
			});
		});
	});
});