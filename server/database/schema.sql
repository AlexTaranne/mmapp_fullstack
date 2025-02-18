
create table user (
  id int unsigned primary key auto_increment not null,
  email varchar(255) not null unique,
  password varchar(255) not null
);

create table item (
  id int unsigned primary key auto_increment not null,
  title varchar(255) not null,
  user_id int unsigned not null,
  foreign key(user_id) references user(id)
);

CREATE table fighter (
  id int AUTO_INCREMENT PRIMARY KEY not NULL,
  lastName VARCHAR(255) NOT null,
  firstName VARCHAR(255) not null,
  nationality VARCHAR(155) not null,
  photo VARCHAR(255)
);

insert INTO fighter(lastName, firstName, nationality, photo) values ("Saint-Denis", "Benoit", "France", "https://dmxg5wxfqgb4u.cloudfront.net/styles/athlete_bio_full_body/s3/2025-01/5/PEREIRA_ALEX_L_BELT_10-05.png?itok=-HWopS_9");
insert into user(id, email, password)
values
  (1, "jdoe@mail.com", "123456");

insert into item(id, title, user_id)
values
  (1, "Stuff", 1),
  (2, "Doodads", 1);
