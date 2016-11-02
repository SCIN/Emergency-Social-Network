'use strict';

const assert = require('assert');
const db = require('../utils/db');

describe('db', function() {
	describe('.searchCitizenGivenName', function() {
		it('should return citizens who matches the given name', function() {
			return db.searchCitizenGivenName('Ivor')
			.then(citizens => {
				citizens.forEach(function(citizen) {
					assert.notStrictEqual(citizen.name.indexOf('Ivor'), -1);
				});
			});
		});
	});

	describe('.searchCitizenGivenStatus', function() {
		it('should return citizens who matches the given status', function() {
			return db.searchCitizenGivenStatus('OK')
			.then(citizens => {
				citizens.forEach(function(citizen) {
					assert.notStrictEqual(citizen.status.indexOf('OK'), -1);
				});
			});
		});
	});

	describe('.searchAnnouncements', function() {
		const words = ['Hello'];

		it('should return announcements who matches the given word', function() {
			return db.searchAnnouncements(words, 1)
			.then(announcements => {
				announcements.forEach(function(announcement) {
					words.forEach(function(word) {
						assert.notStrictEqual(announcement.text.indexOf(word), -1);
					});
				});
			});
		});
	});

	describe('.searchAnnouncements', function() {
		const words = ['He', 'llo'];

		it('should return announcements who matches the given words', function() {
			return db.searchAnnouncements(words, 1)
			.then(announcements => {
				announcements.forEach(function(announcement) {
					words.forEach(function(word) {
						assert.notStrictEqual(announcement.text.indexOf(word), -1);
					});
				});
			});
		});
	});

	describe('.searchAnnouncements', function() {
		const words = [];

		it('should fail when searching without any words', function() {
			return db.searchAnnouncements(words, 1)
			.then(announcements => assert.fail(1, 2, 'searchAnnouncements goes to then() which is not acceptable', '>'), () => {});
		});
	});

	describe('.searchPublicMessages', function() {
		const words = ['Hello'];

		it('should return public messages who matches the given word', function() {
			return db.searchPublicMessages(words, 1)
			.then(public_messages => {
				public_messages.forEach(function(public_message) {
					words.forEach(function(word) {
						assert.notStrictEqual(public_message.text.indexOf(word), -1);
					});
				});
			});
		});
	});

	describe('.searchPublicMessages', function() {
		const words = ['He', 'llo'];

		it('should return public messages who matches the given words', function() {
			return db.searchPublicMessages(words, 1)
			.then(public_messages => {
				public_messages.forEach(function(public_message) {
					words.forEach(function(word) {
						assert.notStrictEqual(public_message.text.indexOf(word), -1);
					});
				});
			});
		});
	});

	describe('.searchPublicMessages', function() {
		const words = [];

		it('should fail when searching without any words', function() {
			return db.searchPublicMessages(words, 1)
			.then(public_messages => assert.fail(1, 2, 'searchPublicMessages goes to then() which is not acceptable', '>'), () => {});
		});
	});

	describe('.searchPrivateMessages', function() {
		const name = 'Ivor';
		const words = ['He', 'llo'];

		it('should return public messages who matches the given word', function() {
			return db.searchPrivateMessages(name, words, 1)
			.then(private_messages => {
				private_messages.forEach(function(private_message) {
					assert(private_message.sender.indexOf(name) !== -1 || private_message.receiver.indexOf(name) !== -1);
					words.forEach(function(word) {
						assert.notStrictEqual(private_message.text.indexOf(word), -1);
					});
				});
			});
		});
	});
});