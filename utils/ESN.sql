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


INSERT INTO citizen (name, password, status)
	VALUES ('Ivor', 'lalala', 'ok');
INSERT INTO citizen (name, password, status)
	VALUES ('Ivory', 'lalala', 'ok');

INSERT INTO message (text, timestamp, sender, status, location)
	VALUES ('Hello', '2016-1-1', 'Ivor', 'ok', 'Bldg 23');

INSERT INTO message (text, timestamp, sender, status, location)
	VALUES ('Hello', '2016-2-1', 'Ivory', 'ok', 'Bldg 19');

INSERT INTO privateMessages (text, timestamp, sender, receiver, status, location)
	VALUES ('Hello Ivory', '2016-1-1', 'Ivor', 'Ivory', 'ok', 'Bldg 23');

INSERT INTO privateMessages (text, timestamp, sender, receiver, status, location)
	VALUES ('Hello Ivor', '2016-2-1', 'Ivory', 'Ivor', 'ok', 'Bldg 19');

INSERT INTO announcements (text, timestamp, sender, location)
	VALUES ('Hello, this is an announcement from Ivor', '2016-1-1', 'Ivor', 'Bldg 23');

INSERT INTO announcements (text, timestamp, sender, location)
	VALUES ('Hello, this is an announcement', '2016-2-1', 'Ivory', 'Bldg 19');