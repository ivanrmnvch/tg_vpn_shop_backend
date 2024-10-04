create table public.servers
(
    ip         varchar(15)             not null
        constraint servers_pk
            primary key,
    country    varchar                 not null,
    domain     varchar(2)              not null,
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
comment on column public.servers.country is 'Страна';
comment on column public.servers.domain is 'Домен страны';
comment on column public.servers.sni is 'Server Name Indication';
comment on column public.servers.pbk is 'Публичный ключ';
comment on constraint servers_pk_2 on public.servers is 'Публичный ключ';
comment on column public.servers.sid is 'Короткий id';
comment on constraint servers_pk_3 on public.servers is 'Короткий id';
comment on column public.servers.created_at is 'Дата создания';
comment on column public.servers.updated_at is 'Дата обновления';
