create table RANDOM(
    id int primary key auto_increment,
    kanji varchar(5) not null UNIQUE,
    strokes int(3)
);

--@block
insert into RANDOM (kanji, strokes) VALUES
    ('ling',13),
    ('chong',12);


--@block
select * from RANDOM;

--@block
select count(kanji) from RANDOM 

--@block
ALTER TABLE javi AUTO_INCREMENT = 1;

--@block
delete from javi
where id >0;

--@block 
select * from javi;

--@block
select * from csv;