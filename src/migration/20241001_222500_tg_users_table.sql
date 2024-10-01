create table public.tg_users
(
    id         bigint                  not null
        constraint tg_users_pk
            primary key,
    first_name varchar(64)             not null,
    username   varchar(32)             not null,
    lang       varchar(2)              not null,
    created_at timestamp default now() not null,
    updated_at timestamp default now() not null
);

comment on table public.tg_users is 'Таблица пользователей telegram';
comment on column public.tg_users.id is 'Telegram id пользователя';
comment on constraint tg_users_pk on public.tg_users is 'Telegram id пользователя';
comment on column public.tg_users.first_name is 'Имя пользователя';
comment on column public.tg_users.username is 'Login telegram пользователя';
comment on column public.tg_users.lang is 'Язык пользователя';
comment on column public.tg_users.created_at is 'Дата создания';
comment on column public.tg_users.updated_at is 'Дата обновления';

