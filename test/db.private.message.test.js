'use strict';

const assert = require('assert');
const db = require('../utils/db');

describe('db', function() {
	describe('.getPrivateMessage', function() {
		it('should return at least two messages', function() {
			const names = {
	            username1 : 'Ivor',
	            username2 : 'Ivory'
	        };

			return db.getPrivateMessage(names)
			.then(messages => {
				for(var message of messages) {
					if(message.sender == 'Ivor')
						assert.strictEqual(message.receiver, 'Ivory');
					else if(message.sender =='Ivory')
						assert.strictEqual(message.receiver, 'Ivor');
				}
			});
		});
	});

	describe('.getPrivateChatUsers', function() {
		it('should return at least one particular user', function() {
			return db.getPrivateChatUsers('Ivor')
			.then(usernames => {
				assert.strictEqual(usernames[0].username, 'Ivory');
			});
		});
	});

	describe('.postPrivateMessage', function() {
		it('should post new message', function() {
			const private_msg_body = {
				text : "Hello Let's Private",
				timestamp : "2016-10-21",
				sender : "Ivory",
				receiver : "Ivor",
				status : "ok",
				location : "Building 19"
			};
			
			return db.postPrivateMessage(private_msg_body).then(() => {
				var names = {
					username1: private_msg_body.sender,
					username2: private_msg_body.receiver
				};

				return db.getPrivateMessage(names).then(messages => {
					for(var message of messages) {
						var exist = true;
						for(var key of messages.keys()) {
							if (message.key != private_msg_body.key) {
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