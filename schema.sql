drop table if exists fields;
create table fields(
id integer not null,
name string not null,
commodity string not null,
memo string not null
);
drop table if exists latlng;
create table latlng(
id integer not null,
lat real not null,
lng real not null
);
