CREATE EXTENSION IF NOT EXISTS "uuid-ossp";


CREATE TYPE status AS ENUM ('undecided', 'voting', 'agreed', 'rejected', 'requested', 'confirmed', 'denied');
-- undecided: no action has been taken to decide this detail
-- voting: voting has been invoked on this detail
-- agreed: voting has been concluded on this detail, and the decision is YES
-- rejected: voting has been concluded on this detail, and the decision is NO
-- requested: waiting to hear a response from the outside party (e.g. venue or band)
-- confirmed: this detail has been decided and confirmed by all involved parties
-- denied: the outside party has declined


-- USERS TABLE --

DROP TABLE IF EXISTS users;

CREATE TABLE users (
    user_id UUID NOT NULL DEFAULT uuid_generate_v4 (),
    name VARCHAR (50) UNIQUE NOT NULL,
    password VARCHAR (50) NOT NULL,
    email VARCHAR (255) UNIQUE NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    last_login TIMESTAMP,
    PRIMARY KEY(user_id)
);


-- TODO: create a separated script to populate the DB with dummy data

INSERT INTO users (name, password, email)
VALUES
    ('casey', 'supersecret', 'caseympfischer@gmail.com');



-- EVENTS TABLE --

DROP TABLE IF EXISTS events;

CREATE TABLE events (
    event_id UUID NOT NULL DEFAULT uuid_generate_v4 (),
    description VARCHAR (255),
    created_by UUID,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    PRIMARY KEY(event_id),
    CONSTRAINT fk_event_user
        FOREIGN KEY(created_by)
            REFERENCES users(user_id)
            ON DELETE SET NULL
);


-- EVENT DATES TABLE --

DROP TABLE IF EXISTS event_dates;

CREATE TABLE event_dates (
    event_date_id UUID NOT NULL DEFAULT uuid_generate_v4 (),
    date DATE NOT NULL,
    event_id UUID NOT NULL,
    date_status STATUS,
    CONSTRAINT fk_event_date_event
        FOREIGN KEY(event_id)
            REFERENCES events(event_id)
            ON DELETE CASCADE
);


-- EVENT BANDS TABLE --

DROP TABLE IF EXISTS event_bands;

CREATE TABLE event_bands (
    event_band_id UUID DEFAULT uuid_generate_v4 (),
    name VARCHAR (255) NOT NULL,
    event_id UUID NOT NULL,
    band_status STATUS,
    CONSTRAINT fk_event_band_event
        FOREIGN KEY(event_id)
            REFERENCES events(event_id)
            ON DELETE CASCADE
);


-- EVENT VENUES TABLE --

DROP TABLE IF EXISTS event_venues;

CREATE TABLE event_venues (
    event_venue_id UUID DEFAULT uuid_generate_v4 (),
    name VARCHAR (255) NOT NULL,
    event_id UUID NOT NULL,
    venue_status STATUS,
    CONSTRAINT fk_event_venue_event
        FOREIGN KEY(event_id)
            REFERENCES events(event_id)
            ON DELETE CASCADE
);

