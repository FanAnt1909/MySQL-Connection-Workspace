--@block
create table maria (
    id int primary key AUTO_INCREMENT,
    kanji varchar(10),
    strokes varchar(3)
)
--@block 
drop table maria;

--@block
insert into maria(kanji, strokes) 
values('ling_long', 10);


--@block
select * from maria
where id = 1;