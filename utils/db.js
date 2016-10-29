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

    // unused?
    // update online/offline
    updateCitizenState(state_body)
    {
    	return this.db.none('update citizen set online=${online} where name=${name}', state_body);
    }

    // unused?
    getAllCitizen()
    {
    	return this.db.any('select name, online from citizen');
    }

    getAllCitizenStatus()
    {
        return this.db.any('select name,status,location,timestamp from citizen');
    }

    // no need online
    getCitizen(name)
    {
        return this.db.one('select name, online from citizen where name=$1', [name]);
    }

    searchCitizenGiveName(name)
    {
        return this.db.any("select name, online, status, location, timestamp from citizen where name like '%" + name + "%'");
    }

    searchCitizenGivenStatus(status)
    {
        return this.db.any('select name, online, status, location, timestamp from citizen where status=$1', [status]);

    }

    searchAnnouncements(words)
    {

    }

    searchPublicMessages(words)
    {

    }

    searchPrivateMessages(name, words)
    {

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
    postPublicMessage(public_msg_body)
    {
    	return this.db.none(
    		'insert into message (sender, text, timestamp, status, location)' +
    		'values (${sender}, ${text}, ${timestamp}, ${status}, ${location})',
    		public_msg_body
    	);
    }

    // Send a chat message to another user
    /**
        const private_msg_body = {
            text : "Hello Let's Private",
            timestamp : "2016-10-21",
            sender : "Ivory",
            receiver : "Ivor",
            status : "ok",
            location : "Building 19"
        };
    **/
    postPrivateMessage(private_msg_body)
    {
        return this.db.none(
            'insert into privateMessages (sender, receiver, text, timestamp, status, location)' +
            'values (${sender}, ${receiver}, ${text}, ${timestamp}, ${status}, ${location})',
            private_msg_body
        );
    }

    // Retrieve all private chat messages between two users
    /**
        const names = {
            username1 : 'Ivor',
            username2 : 'Ivory'
        }
    **/
    getPrivateMessage(names)
    {
        return this.db.any('select * from privateMessages where sender=${username1} and receiver=${username2} ' + 
            'UNION select * from privateMessages where sender=${username2} and receiver=${username1}',names);
    }

    // Retrieve all users with whom a user has privately chatted with
    getPrivateChatUsers(username)    
    {
        return this.db.any('select sender as username from privateMessages where receiver=$1 ' + 
                     'UNION select receiver from privateMessages where sender=$1', [username]);
    }

    // update status
    updateCitizenStatus(status_body)
    {
        this.db.none(
            'insert into statusHistory (name, status, location, timestamp)' +
            'values (${userName}, ${statusCode}, $(location), $(timestamp))',
            status_body
        );

        return this.db.none('update citizen set status=${statusCode}, location=${location}, timestamp=${timestamp} where name=${userName}', status_body);
    }

    // get status history
    getStatusHistory(name)
    {     
        return this.db.any('select * from statusHistory where name=$1', [name]);
    }

    // get all announcements
    getAnnouncements()
    {
        return this.db.any('select * from announcements');
    }

    // post an announcement
    /**
        const announcement_body = {
            text : "There is going to be an earthquake in about 5 minuts.",
            timestamp : "2016-10-21",
            sender : "Ivory",
            location : "Building 23"
        };
    **/
    postAnnouncement(announcement_body)
    {
        return this.db.none(
            'insert into announcements (sender, text, timestamp, location)' +
            'values (${sender}, ${text}, ${timestamp}, ${location})',
            announcement_body
        );
    }
}

var db = new dbInterface();
module.exports = db;