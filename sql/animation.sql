CREATE TYPE showFormat AS ENUM ('Movie','Television', 'Miniseries', 'Special', 'Other');
CREATE TYPE showStatus AS ENUM ('Currently Airing', 'Finished');

CREATE TABLE Animation (
	id integer NOT NULL,
	title text NOT NULL,
	synopsis text NOT NULL,
	format showFormat NOT NULL, 
	status showStatus NOT NULL, -- We do not need to return this (useful for redundancy in the future) //should be a derived data-type in future
	release date NOT NULL,
	season text GENERATED ALWAYS AS
		(case 
			when ((date_part('month', release) <= 2) and (date_part('month', release) >= 1)) Then 'Winter'
		 	when ((date_part('month', release) <= 5) and (date_part('month', release) >= 3)) Then 'Spring' 
		 	when ((date_part('month', release) <= 8) and (date_part('month', release) >= 6)) Then 'Summer' 
		 	when ((date_part('month', release) <= 11) and (date_part('month', release) >= 9)) Then 'Autumn' 
		 	when (date_part('month', release) >= 12) Then 'Winter' 
		end) STORED, 
	episodes integer,
	runtime integer,
	cover text NOT NULL DEFAULT '/covers/none.jpg', -- Should hold cover for future reasons (but not useful currently)
	trailer text NOT NULL, 
	views integer NOT NULL,
	reviews integer NOT NULL,
	average_rating decimal(2,1) NOT NULL,
	PRIMARY KEY(id)
);

CREATE TABLE Genre (
	a_id integer NOT NULL,
	genre text NOT NULL,
	CONSTRAINT fk_animation
		FOREIGN KEY(a_id)
			REFERENCES Animation(id),
	PRIMARY KEY (a_id, genre)
);

CREATE TABLE Sequel (
	sequel integer NOT NULL,
	prequel integer NOT NULL,
	CONSTRAINT fk_sequel
		FOREIGN KEY(sequel)
			REFERENCES Animation(id),
	CONSTRAINT fk_prequel
		FOREIGN KEY(prequel)
			REFERENCES Animation(id),
	PRIMARY KEY (sequel, prequel)
);

CREATE TABLE Other (
	a_id integer NOT NULL,
	other integer NOT NULL,
	CONSTRAINT fk_animation
		FOREIGN KEY(a_id)
			REFERENCES Animation(id),
	CONSTRAINT fk_other
		FOREIGN KEY(other)
			REFERENCES Animation(id),
	PRIMARY KEY (a_id, other)
);

CREATE TABLE Alternative (
	a_id integer NOT NULL,
	alternative integer NOT NULL,
	CONSTRAINT fk_animation
		FOREIGN KEY(a_id)
			REFERENCES Animation(id),
	CONSTRAINT fk_alternative
		FOREIGN KEY(alternative)
			REFERENCES Animation(id),
	PRIMARY KEY (a_id, alternative)
);