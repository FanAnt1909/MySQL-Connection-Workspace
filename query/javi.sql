create table javi(
    id int primary key auto_increment,
    Word varchar(20) not null unique,
    Kana varchar(20) not null,
    Mean TEXT not null
);
--@block
describe table javi;

--@block
select id from random
where kanji in ('ching', 'chong', 'long') 
--@block
select * from random;

--@block
INSERT INTO javi (Word, Kana, Mean) 
VALUES ('ling', 'jing', 'watery');

--@block
delete from javi 
where id like 1; 

