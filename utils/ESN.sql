DROP DATABASE IF EXISTS esn;
CREATE DATABASE esn;
\c esn;
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
	status TEXT
);
INSERT INTO citizen (name, password, online, status)
	VALUES ('Ivor', 'lalala', TRUE, 'ok');
INSERT INTO citizen (name, password, online, status)
	VALUES ('Ivory', 'lalala', FALSE, 'ok');

INSERT INTO message (text, timestamp, sender, status, location)
	VALUES ('Hello', '2016-1-1', 'Ivor', 'ok', 'Bldg 23');

INSERT INTO message (text, timestamp, sender, status, location)
	VALUES ('Hello', '2016-2-1', 'Ivory', 'ok', 'Bldg 19');

INSERT INTO privateMessages (text, timestamp, sender, receiver, status, location)
	VALUES ('Hello Ivory', '2016-1-1', 'Ivor', 'Ivory', 'ok', 'Bldg 23');

INSERT INTO privateMessages (text, timestamp, sender, receiver, status, location)
	VALUES ('Hello Ivor', '2016-2-1', 'Ivory', 'Ivor', 'ok', 'Bldg 19');