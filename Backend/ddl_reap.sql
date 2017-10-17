CREATE TABLE exercise (
  id serial,
  name varchar(255),
  difficulty smallint,
  reward int,
  description text,
  primary key(id)
);