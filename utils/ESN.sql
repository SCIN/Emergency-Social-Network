DROP table IF EXISTS citizen;
DROP table IF EXISTS message;
DROP table IF EXISTS privatemessages;
DROP table IF EXISTS statushistory;
DROP table IF EXISTS announcements;

CREATE TABLE message (
	ID SERIAL PRIMARY KEY,
	text TEXT,
	timestamp TEXT,
	sender TEXT,
	status TEXT,
	location TEXT
);

CREATE TABLE privateMessages (
	ID SERIAL PRIMARY KEY,
	text TEXT,
	timestamp TEXT,
	sender TEXT,
	receiver TEXT,
	status TEXT,
	location TEXT
);

CREATE TABLE citizen (
	ID SERIAL PRIMARY KEY,
	name TEXT,
	password TEXT,
	online BOOLEAN,
	status TEXT,
	location TEXT,
	timestamp TEXT
);

CREATE TABLE statusHistory (
	ID SERIAL PRIMARY KEY,
	name TEXT,
	status TEXT,
	location TEXT,
	timestamp TEXT
);

CREATE TABLE announcements (
	ID SERIAL PRIMARY KEY,
	text TEXT,
	timestamp TEXT,
	sender TEXT,
	location TEXT
);


INSERT INTO citizen (name, password, online, status)
	VALUES ('Ivor', '9aa6e5f2256c17d2d430b100032b997c', false, 'ok');
INSERT INTO citizen (name, password, online, status)
	VALUES ('Ivory', '9aa6e5f2256c17d2d430b100032b997c', false, 'ok');

INSERT INTO message (text, timestamp, sender, status, location)
	VALUES ('Hello', '10:37:36 PM 10/01/2016', 'Ivor', 'ok', 'Bldg 23');

INSERT INTO message (text, timestamp, sender, status, location)
	VALUES ('Hello', '11:37:36 PM 10/01/2016', 'Ivory', 'ok', 'Bldg 19');

INSERT INTO privateMessages (text, timestamp, sender, receiver, status, location)
	VALUES ('Hello Ivory', '10:37:36 PM 10/01/2016', 'Ivor', 'Ivory', 'ok', 'Bldg 23');

INSERT INTO privateMessages (text, timestamp, sender, receiver, status, location)
	VALUES ('Hello Ivor', '11:37:36 PM 10/01/2016', 'Ivory', 'Ivor', 'ok', 'Bldg 19');

INSERT INTO announcements (text, timestamp, sender, location)
	VALUES ('Hello, this is an announcement from Ivor', '10:37:36 PM 10/01/2016', 'Ivor', 'Bldg 23');

INSERT INTO announcements (text, timestamp, sender, location)
	VALUES ('Hello, this is an announcement', '11:37:36 PM 10/01/2016', 'Ivory', 'Bldg 19');