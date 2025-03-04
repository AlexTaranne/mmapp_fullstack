-- Active: 1739781170886@@127.0.0.1@3306@mmapp
CREATE TABLE category (
  id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,  
  name VARCHAR(255) NOT NULL UNIQUE  
);

CREATE TABLE fighter (
  id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
  lastName VARCHAR(255) NOT NULL,
  firstName VARCHAR(255) NOT NULL,
  nationality VARCHAR(155) NOT NULL,
  photo VARCHAR(255),
  category_id INT,  
  FOREIGN KEY (category_id) REFERENCES category(id) ON DELETE SET NULL
);

-- Création de la vue pour récupérer les fighters avec leur catégorie
CREATE VIEW fighter_view AS
SELECT 
  fighter.id, 
  fighter.lastName, 
  fighter.firstName, 
  fighter.nationality, 
  fighter.photo, 
  category.name AS category_name
FROM fighter
LEFT JOIN category ON fighter.category_id = category.id;

-- Insertion des catégories
INSERT INTO category (name) VALUES 
('Flyweight'), 
('Bantamweight'), 
('Featherweight'), 
('Lightweight'), 
('Welterweight'), 
('Middleweight'), 
('Light Heavyweight'), 
('Heavyweight');


-- Insertion de plusieurs combattants avec leurs catégories en une seule requête
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
  ("Saint-Denis", "Benoit", "France", "https://dmxg5wxfqgb4u.cloudfront.net/styles/athlete_bio_full_body/s3/2025-01/5/SAINT_DENIS_BENOIT_L_03-09.png?itok=EvDfVI0a", 4),
  ("Gane", "Cyril", "France", "https://dmxg5wxfqgb4u.cloudfront.net/styles/athlete_bio_full_body/s3/2025-01/5/GANE_CIRYL_L_12-07.png?itok=FskbLuVB", 8),
  ("Oliveira", "Charles", "Brésil", "https://dmxg5wxfqgb4u.cloudfront.net/styles/athlete_bio_full_body/s3/2025-01/5/OLIVEIRA_CHARLES_L_11-16.png?itok=ReesBWpC", 4),
  ("Sy", "Oumar", "France", "https://dmxg5wxfqgb4u.cloudfront.net/styles/athlete_bio_full_body/s3/2024-09/SY_OUMAR_L_09-28.png?itok=t2Vgwrqz", 7),
  ("Charriére", "Morgan", "France", "https://dmxg5wxfqgb4u.cloudfront.net/styles/athlete_bio_full_body/s3/2024-09/CHARRIERE_MORGAN_L_09-28.png?itok=gz8rxX8J", 3),
  ("Peirera", "Alex", "Brésil", "https://dmxg5wxfqgb4u.cloudfront.net/styles/athlete_bio_full_body/s3/2025-01/5/PEREIRA_ALEX_L_BELT_10-05.png?itok=-HWopS_9", 7),
  ("Topuria", "Ilia", "Espagne", "https://dmxg5wxfqgb4u.cloudfront.net/styles/athlete_bio_full_body/s3/2025-01/5/TOPURIA_ILIA_L_BELT_10-26.png?itok=4a1uyWfc", 4),
  ("Dvalishvili", "Merab", "Géorgie", "https://dmxg5wxfqgb4u.cloudfront.net/styles/athlete_bio_full_body/s3/2025-01/7/DVALISHVILI_MERAB_L_BELT_01-18.png?itok=6d15Ml6s", 2),
  ("Poirier", "Dustin", "USA", "https://dmxg5wxfqgb4u.cloudfront.net/styles/athlete_bio_full_body/s3/2025-01/5/POIRIER_DUSTIN_L_06-01.png?itok=YHikGku5", 4),
  ("O'Malley", "Sean", "USA", "https://dmxg5wxfqgb4u.cloudfront.net/styles/athlete_bio_full_body/s3/2025-01/5/OMALLEY_SEAN_L_08-19.png?itok=PZizstP4", 2),
  ("Aldo", "José", "Brésil", "https://dmxg5wxfqgb4u.cloudfront.net/styles/athlete_bio_full_body/s3/2025-01/5/ALDO_JOSE_L_10-05.png?itok=wNRyukeK", 3),
  ("Allen", "Arnold", "Angleterre", "https://dmxg5wxfqgb4u.cloudfront.net/styles/athlete_bio_full_body/s3/2025-01/5/ALLEN_ARNOLD_L_07-27.png?itok=i7153C9o", 3),
  ("Allen", "Brendan", "USA", "https://dmxg5wxfqgb4u.cloudfront.net/styles/athlete_bio_full_body/s3/2025-02/ALLEN_BRENDAN_L_02-22.png?itok=obbqxSz5", 6),
  ("Almeida", "Jailton", "Brésil", "https://dmxg5wxfqgb4u.cloudfront.net/styles/athlete_bio_full_body/s3/2025-01/7/ALMEIDA_JAILTON_L_01-18.png?itok=jpP9dOKh", 8),
  ("Alves", "Thiago", "Brésil", "https://dmxg5wxfqgb4u.cloudfront.net/styles/athlete_bio_full_body/s3/2019-01/ALVES_THIAGO_L.png?VersionId=_iXg0Zp.wNih3AwI7LIRzu9dvtBESmRn&itok=bpPsB6RG", 5),
  ("Anderson", "Anderson", "Australie", "https://dmxg5wxfqgb4u.cloudfront.net/styles/athlete_bio_full_body/s3/2021-03/68788%252Fprofile-galery%252Ffullbodyleft-picture%252FANDERSON_MEGAN_L_03-06.png?itok=xHtxrVFj", 1),
  ("Ankalaev", "Magomed", "Russie", "https://dmxg5wxfqgb4u.cloudfront.net/styles/athlete_bio_full_body/s3/2025-01/5/ANKALAEV_MAGOMED_L_10-26.png?itok=Izjyp3QA", 7),
  ("Asakura", "Kai", "Japon", "https://dmxg5wxfqgb4u.cloudfront.net/styles/athlete_bio_full_body/s3/2025-01/5/ASAKURA_KAI_L.png?itok=ndm2cO6E", 1),
  ("Aspinall", "Tom", "Angleterre", "https://dmxg5wxfqgb4u.cloudfront.net/styles/athlete_bio_full_body/s3/2025-01/5/ASPINALL_TOM_BELT_L_07-27.png?itok=mpDy18w4", 8),
  ("Barber", "Maycee", "USA", "https://dmxg5wxfqgb4u.cloudfront.net/styles/athlete_bio_full_body/s3/2025-01/5/BARBER_MAYCEE_L_03-09.png?itok=XYMS3_hC", 1),
  ("Barboza", "Edson", "Brésil", "https://dmxg5wxfqgb4u.cloudfront.net/styles/athlete_bio_full_body/s3/2025-01/5/BARBOZA_EDSON_L_05-18.png?itok=6OKNDzxW", 3),
  ("Battle", "Bryan", "USA", "https://dmxg5wxfqgb4u.cloudfront.net/styles/athlete_bio_full_body/s3/2024-03/BATTLE_BRYAN_L_03-16.png?itok=UhJpvRSl", 5),
  ("Blachowicz", "Jan", "Pologne", "https://dmxg5wxfqgb4u.cloudfront.net/styles/athlete_bio_full_body/s3/2025-01/5/BLACHOWICZ_JAN_L_05-14.png?itok=Sro23H6g", 7),
  ("Ngannou", "Francis", "Cameroon", "https://www.pronostic-mma.com/wp-content/uploads/2024/07/profil-francis-ngannou.png", 8),
  ("Volkanovski", "Alex", "Australia", "https://dmxg5wxfqgb4u.cloudfront.net/styles/athlete_bio_full_body/s3/2025-01/5/VOLKANOVSKI_ALEXANDER_L_02-17.png?itok=n9TnCDKb", 3),
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
  ("Ortega", "Bryan", "USA", "https://dmxg5wxfqgb4u.cloudfront.net/styles/athlete_bio_full_body/s3/2025-01/5/ORTEGA_BRIAN_L_09-14.png?itok=pUV9T7HB", 3);
  
