'use strict';
// Postgres DB

class dbInterface
{
    //constructor of the class
    constructor()
    {
        //"this" points to the current object
        this.promise = require('bluebird');
		let options = {
			// Initialization Options
			promiseLib: this.promise
		};
		this.pgp = require('pg-promise')(options);
		let connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/esn';
		this.db = this.pgp(connectionString);
    }

    //member function
    /**
		var ctz_body = {
			name : "Hector1",
			password: "Niceday1"
		};
	**/
    addCitizen(ctz_body)
    {
    	return this.db.none(
    		'insert into citizen (name, password)' +
    		'values (${name}, ${password})',
    		ctz_body
    	);
    }

    /**
		var state_body = {
			name : 'Ivor',
			online : false
		}
	**/
    updateCitizenState(state_body)
    {
    	return this.db.none('update citizen set online=${online} where name=${name}', state_body);
    }

    checkCitizen(name)
    {
        return this.db.one('select name from citizen where name=$1', [name]);
    }

    getAllCitizen()
    {
    	return this.db.any('select name, online from citizen');
    }

    getCitizen(name)
    {
        return this.db.any('select name, online from citizen where name=$1', [name]);
    }

    /**
		var auth_body = {
			name : 'Ivor',
			password : 'ssssss'
		}
	**/
    authenticate(auth_body)
    {
    	return this.db.one('select id from citizen where name=${name} and password=${password}',
    						auth_body);
    }

    getPublicMessage()
    {
    	return this.db.any('select * from message');
    }

    getPublicMessageOfUser(name)
    {
        return this.db.any('select * from message where sender=$1', [name]);
    }

    /**
		var msg_body = {
			text : "HelloFSEsss",
			timestamp : "09/30/2016",
			sender : "Bob",
			status : "OK",
			location : "Building 19",
		};
	**/
    postPublicMessage(msg_body)
    {
    	return this.db.none(
    		'insert into message (sender, text, timestamp, status, location)' +
    		'values (${sender}, ${text}, ${timestamp}, ${status}, ${location})',
    		msg_body
    	);
    }

    // Send a chat message to another user
    postPrivateMessage(msg_body)
    {
        return this.db.none(
            'insert into privateMessages (sender, receiver, text, timestamp, status, location)' +
            'values (${sender}, ${receiver}, ${text}, ${timestamp}, ${status}, ${location})',
            msg_body
        );
    }

    // Retrieve all private chat messages between two users
    getPrivateMessage(username1, username2)
    {
        return this.db.any('select * from privateMessages where sender=$1 and receiver=$2',
                [username1], [username2]);
    }

    // Retrieve all users with whom a user has privately chatted with
    getPrivateChatUsers(username)    
    {
        return this.db.any('select sender from privateMessages where receiver=$1 ', [username]);
    }
}

var db = new dbInterface();
module.exports = db;