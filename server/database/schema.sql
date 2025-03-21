-- Active: 1739781170886@@127.0.0.1@3306@mmapp
CREATE TABLE category (
  id INT AUTO_INCREMENT PRIMARY KEY,  
  name VARCHAR(255) NOT NULL UNIQUE  
);

CREATE TABLE fighter (
  id INT AUTO_INCREMENT PRIMARY KEY,
  lastName VARCHAR(255) NOT NULL,
  firstName VARCHAR(255) NOT NULL,
  nationality VARCHAR(155) NOT NULL,
  photo VARCHAR(255),
  category_id INT,  
  wins INT DEFAULT 0,
  losses INT DEFAULT 0,
  nickname VARCHAR(255) DEFAULT NULL,
  CONSTRAINT fk_category FOREIGN KEY (category_id) REFERENCES category(id) ON DELETE SET NULL
);
CREATE VIEW fighter_view AS
SELECT 
  fighter.id, 
  fighter.lastName, 
  fighter.firstName, 
  fighter.nationality, 
  fighter.photo, 
  category.name AS category_name,
  fighter.wins,
  fighter.losses,
  fighter.nickname
FROM fighter
LEFT JOIN category ON fighter.category_id = category.id;

CREATE TABLE user (
  id INT AUTO_INCREMENT PRIMARY KEY,
  firstName VARCHAR (255),
  lastName VARCHAR (255),
  email varchar(255) not null unique,
  hashed_password VARCHAR(255) not null,
   role VARCHAR(50) NOT NULL DEFAULT 'utilisateur'
   
);

INSERT into user (firstName, lastName, email, hashed_password, role) values 
("Alex", "Taranne", "alex@gmail.com", "$argon2id$v=19$m=19456,t=2,p=1$PFBU/IIofJEU6xalUJqz6w$f1V+bZ7QACupP0IZAKs3c1Q57IHVbNbf+6W6grp5+4I", "administrateur"),
("toto", "toto", "alextaranne@gmail.com","$argon2id$v=19$m=19456,t=2,p=1$PFBU/IIofJEU6xalUJqz6w$f1V+bZ7QACupP0IZAKs3c1Q57IHVbNbf+6W6grp5+4I", "utilisateur" );

INSERT INTO category (name) VALUES 
('Flyweight'), 
('Bantamweight'), 
('Featherweight'), 
('Lightweight'), 
('Welterweight'), 
('Middleweight'), 
('Light Heavyweight'), 
('Heavyweight');


INSERT INTO fighter (lastName, firstName, nationality, photo, category_id) 
VALUES
  ("Johnson", "Demetrious", "USA", "https://dmxg5wxfqgb4u.cloudfront.net/styles/athlete_bio_full_body/s3/2018-10/JOHNSON_DEMETRIOUS_L.png?VersionId=HRDdP7nmVjZwEyiRKdzDsVlwTPEUIfm_&itok=w8-eTUeL", 1),  -- Flyweight
  ("Cejudo", "Henry", "USA", "https://dmxg5wxfqgb4u.cloudfront.net/styles/athlete_bio_full_body/s3/2025-02/CEJUDO_HENRY_L_02-22.png?itok=GkWSytbY", 2),  -- Bantamweight
  ("Holloway", "Max", "USA", "https://dmxg5wxfqgb4u.cloudfront.net/styles/athlete_bio_full_body/s3/2024-04/HOLLOWAY_MAX_L_04-13.png?itok=U9IB8OUQ", 3),  -- Featherweight
  ("McGregor", "Conor", "Ireland", "https://dmxg5wxfqgb4u.cloudfront.net/styles/athlete_bio_full_body/s3/2021-07/MCGREGOR_CONOR_L_07-10.png?itok=xbg9Kwfj", 4),  -- Lightweight
  ("Usman", "Kamaru", "Nigeria", "https://dmxg5wxfqgb4u.cloudfront.net/styles/athlete_bio_full_body/s3/2025-01/5/USMAN_KAMARU_L_10-21.png?itok=VXrrBgWG", 5),  -- Welterweight
  ("Adesanya", "Israel", "Nigeria", "https://dmxg5wxfqgb4u.cloudfront.net/styles/athlete_bio_full_body/s3/2025-01/ADESANYA_ISRAEL_L_02-01.png?itok=Qgh08Spj", 6),  -- Middleweight
  ("Jones", "Jon", "USA", "https://dmxg5wxfqgb4u.cloudfront.net/styles/athlete_bio_full_body/s3/2025-01/5/JONES_JON_L_BELT_11-16.png?itok=CUPv7ubQ", 7),  -- Light Heavyweight
  ("Miocic", "Stipe", "USA", "https://dmxg5wxfqgb4u.cloudfront.net/styles/athlete_bio_full_body/s3/2024-10/2/MIOCIC_STIPE_L.png?itok=vGdTrhWf", 8),  -- Heavyweight
  ("Saint Denis", "Benoit", "France", "https://dmxg5wxfqgb4u.cloudfront.net/styles/athlete_bio_full_body/s3/2025-01/5/SAINT_DENIS_BENOIT_L_03-09.png?itok=EvDfVI0a", 4),
  ("Oliveira", "Charles", "Brésil", "https://dmxg5wxfqgb4u.cloudfront.net/styles/athlete_bio_full_body/s3/2025-01/5/OLIVEIRA_CHARLES_L_11-16.png?itok=ReesBWpC", 4),
  ("Pereira", "Alex", "Brésil", "https://dmxg5wxfqgb4u.cloudfront.net/styles/athlete_bio_full_body/s3/2025-01/5/PEREIRA_ALEX_L_BELT_10-05.png?itok=-HWopS_9", 7),
  ("Topuria", "Ilia", "Espagne", "https://dmxg5wxfqgb4u.cloudfront.net/styles/athlete_bio_full_body/s3/2025-01/5/TOPURIA_ILIA_L_BELT_10-26.png?itok=4a1uyWfc", 4),
  ("Dvalishvili", "Merab", "Géorgie", "https://dmxg5wxfqgb4u.cloudfront.net/styles/athlete_bio_full_body/s3/2025-01/7/DVALISHVILI_MERAB_L_BELT_01-18.png?itok=6d15Ml6s", 2),
  ("Poirier", "Dustin", "USA", "https://dmxg5wxfqgb4u.cloudfront.net/styles/athlete_bio_full_body/s3/2025-01/5/POIRIER_DUSTIN_L_06-01.png?itok=YHikGku5", 4),
  ("O'Malley", "Sean", "USA", "https://dmxg5wxfqgb4u.cloudfront.net/styles/athlete_bio_full_body/s3/2025-01/5/OMALLEY_SEAN_L_08-19.png?itok=PZizstP4", 2),
  ("Aldo", "José", "Brésil", "https://dmxg5wxfqgb4u.cloudfront.net/styles/athlete_bio_full_body/s3/2025-01/5/ALDO_JOSE_L_10-05.png?itok=wNRyukeK", 3),
  ("Allen", "Arnold", "Angleterre", "https://dmxg5wxfqgb4u.cloudfront.net/styles/athlete_bio_full_body/s3/2025-01/5/ALLEN_ARNOLD_L_07-27.png?itok=i7153C9o", 3),
  ("Allen", "Brendan", "USA", "https://dmxg5wxfqgb4u.cloudfront.net/styles/athlete_bio_full_body/s3/2025-02/ALLEN_BRENDAN_L_02-22.png?itok=obbqxSz5", 6),
  ("Almeida", "Jailton", "Brésil", "https://dmxg5wxfqgb4u.cloudfront.net/styles/athlete_bio_full_body/s3/2025-01/7/ALMEIDA_JAILTON_L_01-18.png?itok=jpP9dOKh", 8),
  ("Alves", "Thiago", "Brésil", "https://dmxg5wxfqgb4u.cloudfront.net/styles/athlete_bio_full_body/s3/2019-01/ALVES_THIAGO_L.png?VersionId=_iXg0Zp.wNih3AwI7LIRzu9dvtBESmRn&itok=bpPsB6RG", 5),
  ("Anderson", "Megan", "Australie", "https://dmxg5wxfqgb4u.cloudfront.net/styles/athlete_bio_full_body/s3/2021-03/68788%252Fprofile-galery%252Ffullbodyleft-picture%252FANDERSON_MEGAN_L_03-06.png?itok=xHtxrVFj", 1),
  ("Ankalaev", "Magomed", "Russie", "https://dmxg5wxfqgb4u.cloudfront.net/styles/athlete_bio_full_body/s3/2025-01/5/ANKALAEV_MAGOMED_L_10-26.png?itok=Izjyp3QA", 7),
  ("Asakura", "Kai", "Japon", "https://dmxg5wxfqgb4u.cloudfront.net/styles/athlete_bio_full_body/s3/2025-01/5/ASAKURA_KAI_L.png?itok=ndm2cO6E", 1),
  ("Aspinall", "Tom", "Angleterre", "https://dmxg5wxfqgb4u.cloudfront.net/styles/athlete_bio_full_body/s3/2025-01/5/ASPINALL_TOM_BELT_L_07-27.png?itok=mpDy18w4", 8),
  ("Barber", "Maycee", "USA", "https://dmxg5wxfqgb4u.cloudfront.net/styles/athlete_bio_full_body/s3/2025-01/5/BARBER_MAYCEE_L_03-09.png?itok=XYMS3_hC", 1),
  ("Barboza", "Edson", "Brésil", "https://dmxg5wxfqgb4u.cloudfront.net/styles/athlete_bio_full_body/s3/2025-01/5/BARBOZA_EDSON_L_05-18.png?itok=6OKNDzxW", 3),
  ("Battle", "Bryan", "USA", "https://dmxg5wxfqgb4u.cloudfront.net/styles/athlete_bio_full_body/s3/2024-03/BATTLE_BRYAN_L_03-16.png?itok=UhJpvRSl", 5),
  ("Blachowicz", "Jan", "Pologne", "https://dmxg5wxfqgb4u.cloudfront.net/styles/athlete_bio_full_body/s3/2025-01/5/BLACHOWICZ_JAN_L_05-14.png?itok=Sro23H6g", 7),
  ("Ngannou", "Francis", "Cameroon", "https://www.pronostic-mma.com/wp-content/uploads/2024/07/profil-francis-ngannou.png", 8),
  ("Volkanovski", "Alexander", "Australia", "https://dmxg5wxfqgb4u.cloudfront.net/styles/athlete_bio_full_body/s3/2025-01/5/VOLKANOVSKI_ALEXANDER_L_02-17.png?itok=n9TnCDKb", 3),
  ("Ferguson", "Tony", "USA", "https://dmxg5wxfqgb4u.cloudfront.net/styles/athlete_bio_full_body/s3/2024-08/FERGUSON_TONY_L_08-03.png?itok=fUZVHpYl", 4),
  ("Namajunas", "Rose", "USA", "https://dmxg5wxfqgb4u.cloudfront.net/styles/athlete_bio_full_body/s3/2025-01/5/NAMAJUNAS_ROSE_L_07-13.png?itok=0755HalR", 3),
  ("Shevchenko", "Valentina", "Kyrgyzstan", "https://dmxg5wxfqgb4u.cloudfront.net/styles/athlete_bio_full_body/s3/2025-01/5/SHEVCHENKO_VALENTINA_L_BELT_03-05.png?itok=CnKl02RK", 3),
  ("Pena", "Juliana", "USA", "https://dmxg5wxfqgb4u.cloudfront.net/styles/athlete_bio_full_body/s3/2025-01/5/PENA_JULIANNA_L_BELT_07-30.png?itok=ln4aPF-V", 3),
  ("Khabib", "Nurmagomedov", "Russia", "https://dmxg5wxfqgb4u.cloudfront.net/styles/athlete_bio_full_body/s3/image/fighter_images/Khabib_Nurmagomedov/1NURMAGOMEDOV_KHABIB_L.png?itok=MDKzcpwv", 4),
  ("Costa", "Paulo", "Brazil", "https://dmxg5wxfqgb4u.cloudfront.net/styles/athlete_bio_full_body/s3/2025-01/5/COSTA_PAULO_L_06-01.png?itok=iWcdJ7qN", 6),
  ("Fiziev", "Rafael", "Kazakhstan", "https://dmxg5wxfqgb4u.cloudfront.net/styles/athlete_bio_full_body/s3/2025-01/5/FIZIEV_RAFAEL_L_09-23.png?itok=4kI8PzCT", 4),
  ("Yan", "Petr", "Russia", "https://dmxg5wxfqgb4u.cloudfront.net/styles/athlete_bio_full_body/s3/2025-01/5/YAN_PETR_L_11-23.png?itok=isjcRLJt", 2),
  ("Garbrandt", "Cody", "USA", "https://dmxg5wxfqgb4u.cloudfront.net/styles/athlete_bio_full_body/s3/2023-12/GARBRANDT_CODY_L_12-16.png?itok=MmR3oduF", 2),
  ("Edgar", "Frankie", "USA", "https://dmxg5wxfqgb4u.cloudfront.net/styles/athlete_bio_full_body/s3/2021-11/67978%252Fprofile-galery%252Ffullbodyleft-picture%252FEDGAR_FRANKIE_L_11-06.png?itok=GirRfbaO", 2),
  ("Dillashaw", "T.J.", "USA", "https://dmxg5wxfqgb4u.cloudfront.net/styles/athlete_bio_full_body/s3/2021-07/DILLASHAW_TJ_L_07-24.png?itok=iWWWrBlv", 2),
  ("Hooker", "Dan", "New Zealand", "https://dmxg5wxfqgb4u.cloudfront.net/styles/athlete_bio_full_body/s3/2025-01/5/HOOKER_DAN_L_08-17.png?itok=1VAO8kcJ", 3),
  ("Moreno", "Brandon", "Mexico", "https://dmxg5wxfqgb4u.cloudfront.net/styles/athlete_bio_full_body/s3/2022-07/MORENO_BRANDON_L_06-12.png?itok=-Gi9L7O0", 1),
  ("Makhachev", "Islam", "Russie", "https://dmxg5wxfqgb4u.cloudfront.net/styles/athlete_bio_full_body/s3/2025-01/7/MAKHACHEV_ISLAM_L_BELT_01-18.png?itok=VptniX86", 4),
  ("Pantoja", "Alexandre", "Brésil", "https://dmxg5wxfqgb4u.cloudfront.net/styles/athlete_bio_full_body/s3/2025-01/5/PANTOJA_ALEXANDRE_L_BELT_12-07.png?itok=NqCK2FLq", 1),
  ("Du Plessis", "Dricus", "Afrique du Sud", "https://dmxg5wxfqgb4u.cloudfront.net/styles/athlete_bio_full_body/s3/2025-02/DU_PLESSIS_DRICUS_L_BELT_02-08.png?itok=MZTU4b4p", 6),
  ("Edwards", "Leon", "Angleterre", "https://dmxg5wxfqgb4u.cloudfront.net/styles/athlete_bio_full_body/s3/2025-01/5/EDWARDS_LEON_L_08-20.png?itok=kVEURjwd", 5),
  ("Strickland", "Sean", "USA", "https://dmxg5wxfqgb4u.cloudfront.net/styles/athlete_bio_full_body/s3/2025-01/5/STRICKLAND_SEAN_L_06-01.png?itok=Wum6qrCe", 6),
  ("Rakhmonov", "Shavkat", "Kazakstan", "https://dmxg5wxfqgb4u.cloudfront.net/styles/athlete_bio_full_body/s3/2025-01/5/RAKHMONOV_SHAVKAT_L_12-07.png?itok=oasJwCB_", 6),
  ("Della Maddalena", "Jack", "Austalie", "https://dmxg5wxfqgb4u.cloudfront.net/styles/athlete_bio_full_body/s3/2025-01/5/DELLA_MADDALENA_JACK_L_09-16.png?itok=7DAHGYPv", 6),
  ("Machado Garry", "Ian", "Ireland", "https://dmxg5wxfqgb4u.cloudfront.net/styles/athlete_bio_full_body/s3/2025-01/5/GARRY_IAN_L_06-29.png?itok=seAGjSPf", 6),
  ("Lopes", "Diego", "Mexique", "https://dmxg5wxfqgb4u.cloudfront.net/styles/athlete_bio_full_body/s3/2025-01/5/LOPES_DIEGO_L_09-14.png?itok=YrFMMIIg", 3),
  ("Ortega", "Brian", "USA", "https://dmxg5wxfqgb4u.cloudfront.net/styles/athlete_bio_full_body/s3/2025-01/5/ORTEGA_BRIAN_L_09-14.png?itok=pUV9T7HB", 3),
  ("Vera", "Marlon", "Colombie", "https://www.octagon-api.com/fighters/marlon-vera.webp", 3),
  ("Fiorot", "Manon", "France", "https://www.octagon-api.com/fighters/manon-fiorot.webp", 2),
  ("Tsarukyan", "Arman", "Arménie", "https://www.octagon-api.com/fighters/arman-tsarukyan.webp", 3),
  ("Gaethje", "Justin", "USA", "https://www.octagon-api.com/fighters/justin-gaethje.webp", 4),
  ("Chandler", "Michael", "USA", "https://www.octagon-api.com/fighters/michael-chandler.webp", 4),
  ("Moicano", "Renato", "Brésil", "https://www.octagon-api.com/fighters/renato-moicano.webp", 4),
  ("Pimblett", "Paddy", "Angleterre", "https://www.octagon-api.com/fighters/paddy-pimblett.webp", 4),
  ("Burns", "Gilbert", "Brésil", "https://www.octagon-api.com/fighters/gilbert-burns.webp", 5),
  ("Covington", "Colby", "USA", "https://www.octagon-api.com/fighters/colby-covington.webp",5),
  ("Page", "Michael", "Angleterre", "https://www.octagon-api.com/fighters/michael-page.webp",6),
  ("Luque", "Vincente", "USA", "https://www.octagon-api.com/fighters/vicente-luque.webp", 5),
  ("Imavov", "Nassourdine", "France", "https://www.octagon-api.com/fighters/nassourdine-imavov.webp", 6),
  ("Chimaev", "Khamzat", "Russie", "https://www.octagon-api.com/fighters/khamzat-chimaev.webp", 7),
  ("Whittaker", "Robert", "Nouvelle-Zélande", "https://www.octagon-api.com/fighters/robert-whittaker.webp", 7),
  ("Borralho", "Caio", "Brésil", "https://www.octagon-api.com/fighters/caio-borralho.webp", 7),
  ("Cannonier", "Jared", "USA", "https://www.octagon-api.com/fighters/jared-cannonier.webp", 7),
  ("Vettori", "Marvin", "Italie", "https://www.octagon-api.com/fighters/marvin-vettori.webp", 7),
  ("Hernandez", "Anthony", "USA", "https://www.octagon-api.com/fighters/anthony-hernandez.webp", 7),
  ("Dolidze", "Roman", "Géorgie", "https://www.octagon-api.com/fighters/roman-dolidze.webp", 7),
  ("Pereira", "Michel", "Brésil", "https://www.octagon-api.com/fighters/michel-pereira.webp", 7),
  ("Kopylov", "Roman", "Russie", "https://www.octagon-api.com/fighters/roman-kopylov.webp", 7),
  ("Prochazka", "Jiri", "République Tchéque", "https://www.octagon-api.com/fighters/jiri-prochazka.webp", 7),
  ("Hill", "Jamahal", "USA", "https://www.octagon-api.com/fighters/jamahal-hill.webp", 7),
  ("Rakic", "Aleksandar", "Autriche", "https://www.octagon-api.com/fighters/aleksandar-rakic.webp", 7),
  ("Rountree", "Khalil", "USA", "https://www.octagon-api.com/fighters/khalil-rountree-jr.webp", 7),
  ("Zahabi", "Aiemann", "Canada", "https://www.octagon-api.com/fighters/aiemann-zahabi.webp", 2),
  ("Perez", "Ailin", "Argentine", "https://www.octagon-api.com/fighters/ailin-perez.webp", 2),
  ("Perez", "Alex", "USA", "https://www.octagon-api.com/fighters/alex-perez.webp", 1),
  ("Grasso", "Alexa", "Mexique", "https://www.octagon-api.com/fighters/alexa-grasso.webp", 3),
  ("Volkov", "Alexander", "Russie", "https://www.octagon-api.com/fighters/alexander-volkov.webp", 8 ),
  ("Sterling", "Aljamain", "USA", "https://www.octagon-api.com/fighters/aljamain-sterling.webp", 3),
  ("Menifield", "Alonzo", "USA", "https://www.octagon-api.com/fighters/alonzo-menifield.webp", 7),
  ("Lemos", "Amanada", "Brésil", "https://www.octagon-api.com/fighters/amanda-lemos.webp", 1),
  ("Ribas", "Amanda", "Brésil", "https://www.octagon-api.com/fighters/amanda-ribas.webp",1 ),
  ("Albazi", "Amir", "Irak", "https://www.octagon-api.com/fighters/amir-albazi.webp", 1),
  ("Hill", "Angela", "USA", "https://www.octagon-api.com/fighters/angela-hill.webp", 1 ),
  ("Smith", "Anthony", "USA", "https://www.octagon-api.com/fighters/anthony-smith.webp", 7),
  ("Almabayev", "Asu", "Kazakstan", "https://www.octagon-api.com/fighters/assu-almabayev.webp", 1),
  ("Kape", "Manel", "Angola", "https://www.octagon-api.com/fighters/manel-kape.webp",1 ),
  ("Erceg", "Steve", "Australie", "https://www.octagon-api.com/fighters/steve-erceg.webp", 1),
  ("Elliott", "Tim", "USA", "https://www.octagon-api.com/fighters/tim-elliott.webp",2),
  ("Silva", "Bruno", "Brésil", "https://www.octagon-api.com/fighters/bruno-silva.webp", 2 ),
  ("Temirov", "Ramazan", "Ouzbekistan", "https://www.octagon-api.com/fighters/ramazan-temirov.webp", 2),
  ("Johnson", "Charles", "USA", "https://www.octagon-api.com/fighters/charles-johnson.webp",1 ),
  ("Nurmagomedov", "Umar", "Russie", "https://www.octagon-api.com/fighters/umar-nurmagomedov.webp", 2 ),
  ("Sandhagen", "Cory", "USA", "https://www.octagon-api.com/fighters/cory-sandhagen.webp", 2),
  ("Rodriguez", "Yair", "Mexique", "https://www.octagon-api.com/fighters/yair-rodriguez.webp", 3),
  ("Emmett", "Josh", "USA", "https://www.octagon-api.com/fighters/josh-emmett.webp", 3),
  ("Evloev", "Mosvar", "Russie", "https://www.octagon-api.com/fighters/movsar-evloev.webp", 3),
  ("Chikadze", "Giga", "Géorgie", "https://www.octagon-api.com/fighters/giga-chikadze.webp", 3),
  ("Tate", "Miesha", "USA", "https://www.octagon-api.com/fighters/miesha-tate.webp", 2),
  ("Cavalcanti", "Jacqueline", "Brésil", "https://www.octagon-api.com/fighters/jacqueline-cavalcanti.webp", 2),
  ("McGhee", "Marcus", "USA", "https://www.octagon-api.com/fighters/marcus-mcghee.webp", 2),
  ("Edwards", "Joselyne", "Panama", "https://www.octagon-api.com/fighters/joselyne-edwards.webp", 2),
  ("Dariush", "Beneil", "Iran", "https://www.octagon-api.com/fighters/beneil-dariush.webp", 4),
  ("Royval", "Bradon", "USA", "https://www.octagon-api.com/fighters/brandon-royval.webp", 1),
  ("Mytchell", "Bryce", "USA", "https://www.octagon-api.com/fighters/bryce-mitchell.webp", 3),
  ("Kattar", "Calvin", "USA", "https://www.octagon-api.com/fighters/calvin-kattar.webp", 3),
  ("Prates", "Carlos", "Brésil", "https://www.octagon-api.com/fighters/carlos-prates.webp", 5),
  ("Ulberg", "Carlos", "Nouvelle-Zélande", "https://www.octagon-api.com/fighters/carlos-ulberg.webp", 7),
  ("Figueiredo", "Deiveson", "Brésil", "https://www.octagon-api.com/fighters/deiveson-figueiredo.webp", 2 ),
  ("Song", "Yadong", "Chine", "https://www.octagon-api.com/fighters/yadong-song.webp", 2),
  ("Oezdemir", "Volkan", "Suisse", "https://www.octagon-api.com/fighters/volkan-oezdemir.webp", 7),
  ("Pavlovich", "Sergei", "Russie", "https://www.octagon-api.com/fighters/sergei-pavlovich.webp", 8),
  ("Blaydes", "Curtis", "USA", "https://www.octagon-api.com/fighters/curtis-blaydes.webp", 8),
  ("Spivac", "Serghei", "Moldavie", "https://www.octagon-api.com/fighters/serghei-spivac.webp", 8),
  ("Tybura", "Marcin", "Pologne", "https://www.octagon-api.com/fighters/marcin-tybura.webp", 8),
  ("Lewis", "Derek", "USA", "https://www.octagon-api.com/fighters/derrick-lewis.webp", 8),
  ("Tuivasa", "Tai", "Nouvelle-Zélande", "https://www.octagon-api.com/fighters/tai-tuivasa.webp", 8),
  ("Weili", "Zhang", "Chine", "https://www.octagon-api.com/fighters/weili-zhang.webp", 2 ),
  ("Blanchfield", "Erin", "USA", "https://www.octagon-api.com/fighters/erin-blanchfield.webp", 2),
  ("Harrison", "Kayla", "USA", "https://www.octagon-api.com/fighters/kayla-harrison.webp", 3),
  ("Pennington", "Raquel", "USA", "https://www.octagon-api.com/fighters/raquel-pennington.webp", 3),
  ("Andrade", "Jessica", "Brésil", "https://www.octagon-api.com/fighters/jessica-andrade.webp", 2),
  ("Cortez", "Tracy", "USA", "https://www.octagon-api.com/fighters/tracy-cortez.webp", 2),
  ("Aldana", "Irene", "Mexique", "https://www.octagon-api.com/fighters/irene-aldana.webp", 2),
  ("Brady", "Sean", "USA", "https://www.octagon-api.com/fighters/sean-brady.webp", 5),
  ("Font", "Rob", "USA", "https://www.octagon-api.com/fighters/sean-brady.webp", 2),
  ("Walker", "Johnny", "Brésil", "https://www.octagon-api.com/fighters/johnny-walker.webp", 6),
  ("Buckley", "Joaquin", "USA", "https://www.octagon-api.com/fighters/joaquin-buckley.webp", 6),
  ("Cornolle", "Nora", "France", "https://www.octagon-api.com/fighters/nora-cornolle.webp", 2),
  ("Santos", "Yana", "Russie", "https://www.octagon-api.com/fighters/yana-santos.webp", 2),
  ("Rosa", "Karol", "Brésil", "https://www.octagon-api.com/fighters/karol-rosa.webp", 2),
  ("Luciendo", "Iasmin", "Brésil", "https://www.octagon-api.com/fighters/iasmin-lucindo.webp", 1),
  ("Maverick", "Miranda", "USA  ", "https://www.octagon-api.com/fighters/miranda-maverick.webp", 2),
  ("Da Silva", "Ariane", "Brésil", "https://www.octagon-api.com/fighters/ariane-da-silva.webp", 2),
  ("De Ridder", "Reinier", "Netherlands", "https://www.octagon-api.com/fighters/reinier-de-ridder.webp", 6),
  ("Teixeira", "Tallison", "Brazil", "https://www.octagon-api.com/fighters/tallison-teixeira.webp", 8),
  ("Nzechukwu","Kennedy", "USA", "https://www.octagon-api.com/fighters/kennedy-nzechukwu.webp", 8),
  ("Dern", "Mackenzie", "USA", "https://www.octagon-api.com/fighters/mackenzie-dern.webp", 2);






  
  
INSERT INTO fighter (lastName ,firstName , nationality, photo, category_id, wins, losses, nickname) 
VALUES
  ("Sy", "Oumar", "France", "https://dmxg5wxfqgb4u.cloudfront.net/styles/athlete_bio_full_body/s3/2024-09/SY_OUMAR_L_09-28.png?itok=t2Vgwrqz", 7, 9, 1, "Zoo"),
  ("Charrière","Morgan" , "France", "https://dmxg5wxfqgb4u.cloudfront.net/styles/athlete_bio_full_body/s3/2024-09/CHARRIERE_MORGAN_L_09-28.png?itok=gz8rxX8J", 3, 20, 10, "The Last Pirate"),
  ("Cyril", "Gane", "France", "https://dmxg5wxfqgb4u.cloudfront.net/styles/athlete_bio_full_body/s3/2025-01/5/GANE_CIRYL_L_12-07.png?itok=FskbLuVB", 8, 13, 2, "Bon Gamin"),
  ("Kelvin", "Gastelum", "USA", "https://dmxg5wxfqgb4u.cloudfront.net/styles/athlete_bio_full_body/s3/2024-06/GASTELUM_KELVIN_L_06-22.png?itok=vDE-t591", 7, 19, 9,""),
  ("Drew", "Dober", "USA", "https://dmxg5wxfqgb4u.cloudfront.net/styles/athlete_bio_full_body/s3/2024-07/DOBER_DREW_L_07-13.png?itok=_4hmtKXV", 4, 27, 14, ""),
  ("Bahamondes", "Ignacio", "Chili", "https://dmxg5wxfqgb4u.cloudfront.net/styles/athlete_bio_full_body/s3/2025-02/BAHAMONDES_IGNACIO_L_09-14.png?itok=ZJB3DbIY", 4, 16, 5, "La Jaula"),
  ("Donald", "Cerrone", "USA", "https://dmxg5wxfqgb4u.cloudfront.net/styles/athlete_bio_full_body/s3/2022-05/06971e1e-4aa9-404e-96f4-b50c2f56c21f%252FCERRONE_DONALD_L_05-07.png?itok=QUtbOg5n", 5, 36, 17, "Cowboy"),
  ("Taylor", "Lapilus", "France", "https://dmxg5wxfqgb4u.cloudfront.net/styles/athlete_bio_full_body/s3/2024-09/LAPILUS_TAYLOR_L_09-28.png?itok=IloTp4AE", 2, 21, 4 , "Double Impact"),
  ("Paul", "Hughes", "Irelande", "https://pflmma-prod.s3.amazonaws.com/fighters/bodyshots/e5028d164d1414a6fab3b02d25f1cee2-1.png", 2,13, 2, "Big News" ),
  ("Jorge", "Masvidal", "Cuba", "https://dmxg5wxfqgb4u.cloudfront.net/styles/athlete_bio_full_body/s3/2023-06/MASVIDAL_JORGE_L_04-08.png?itok=e6d7F5uq", 5, 35, 17, "Gamebred" ),
  ("Nate", "Diaz", "USA", "https://dmxg5wxfqgb4u.cloudfront.net/styles/athlete_bio_full_body/s3/2023-02/DIAZ_NATE_L_09-10.png?itok=FC69VI8H", 5,22, 13, "" ),
  ("Anderson", "Corey", "USA", "https://www.ufc.com/images/styles/athlete_bio_full_body/s3/2020-02/ANDERSON_COREY_L.png?VersionId=.CDYKJ1oE6XrUF64Z67E0wo20v4GTQ39&itok=ZjcXA3px", 7, 14, 5, "Overtime"),
  ("Nick", "Diaz" , "USA", "https://www.ufc.com/images/styles/athlete_bio_full_body/s3/2021-09/68907%252Fprofile-galery%252Ffullbodyleft-picture%252FDIAZ_NICK_L_09-25.png?itok=BKjybtEW", 6, 26, 11, ""),
  ("Robbie", "Lawler", "USA", "https://www.ufc.com/images/styles/athlete_bio_full_body/s3/2023-07/LAWLER_ROBBIE_L_07-08.png?itok=l4zNY6F4", 6, 30, 16, "Ruthless"),
  ("Niko", "Price", "USA", "https://www.ufc.com/images/styles/athlete_bio_full_body/s3/2024-05/PRICE_NIKO_L_06-01.png?itok=chooWOHY", 6, 16, 8, "The Hybrid"),
  ("Nickal","Bo" , "USA", "https://www.ufc.com/images/styles/athlete_bio_full_body/s3/2024-11/NICKAL_BO_L_11-16.png?itok=Ny0jQ60x", 6, 7, 0, "Dagestani Killer"),
  ("Stephens","Jeremy" , "USA", "https://www.ufc.com/images/styles/athlete_bio_full_body/s3/2021-04/68227%252Fprofile-galery%252Ffullbodyleft-picture%252FSTEPHENS_JEREMY_L_04-17.png?itok=r9oqGjwu", 4, 28, 19, "Lil' Heaten"),
  ("Jones", "Mason", "Wales", "https://www.ufc.com/images/styles/athlete_bio_full_body/s3/2022-07/JONES_MASON_L_07-23.png?itok=OwyGfGD6", 4, 11, 2, "The Dragon"),
  ("Nelson","Gunnar" , 'Iceland', "https://www.ufc.com/images/styles/athlete_bio_full_body/s3/2023-03/NELSON_GUNNAR_L_03-18.png?itok=_usckJU4", 6, 19, 5, "Gunni"),
  ("Holland", "Kevin", "USA", "https://www.ufc.com/images/styles/athlete_bio_full_body/s3/2025-01/4/HOLLAND_KEVIN_L_01-18.png?itok=_og7g7uk", 5, 26, 13, "TrailBlazer"),
  ("McCann", "Molly", "England", "https://www.ufc.com/images/styles/athlete_bio_full_body/s3/2024-07/MCCANN_MOLLY_L_07-27.png?itok=40zTRfRD", 1, 14, 7, "Meatball"),
  ("Thainara", "Alexia", "Brazil", "https://www.ufc.com/images/styles/athlete_bio_full_body/s3/2024-09/THAINARA_ALEXIA_L_09-24.png?itok=QGxIj10C", 1, 11, 1, "Burguesinha"),
  ("Torres", "Manuel", "Mexico", "https://www.ufc.com/images/styles/athlete_bio_full_body/s3/2024-09/TORRES_MANUEL_L_09-14.png?itok=-rw7Rdpw", 4, 15, 3, "El Loco"),
  ("Pyfer", "Joe", "USA", "https://www.ufc.com/images/styles/athlete_bio_full_body/s3/2024-06/PYFER_JOE_L_06-29.png?itok=ydMfkko6", 7, 13, 3, "Bodybagz");
  



