create table public.servers
(
    ip         varchar(15)             not null
        constraint servers_pk
            primary key,
    name varchar(5) not null
        constraint servers_pk_4
            unique,
    country    varchar                 not null,
    country_code     varchar(2)              not null,
    sni varchar default 'www.microsoft.com' not null,
    pbk        varchar(43)             not null
        constraint servers_pk_2
            unique,
    sid        varchar(16)             not null
        constraint servers_pk_3
            unique,
    created_at timestamp default now() not null,
    updated_at timestamp default now() not null
);

comment on table public.servers is 'Данные vpn серверов';
comment on column public.servers.ip is 'IP адрес сервера';
comment on constraint servers_pk on public.servers is 'IP адрес сервера';
comment on column public.servers.country is 'Название страны';
comment on column public.servers.country_code is 'Домен страны';
comment on column public.servers.sni is 'Server Name Indication';
comment on column public.servers.pbk is 'Публичный ключ';
comment on constraint servers_pk_2 on public.servers is 'Публичный ключ';
comment on column public.servers.sid is 'Короткий id';
comment on constraint servers_pk_3 on public.servers is 'Короткий id';
comment on column public.servers.created_at is 'Дата создания';
comment on column public.servers.updated_at is 'Дата обновления';
comment on column public.servers.name is 'Кодовое название сервера';
comment on constraint servers_pk_4 on public.servers is 'Кодовое название сервера';
