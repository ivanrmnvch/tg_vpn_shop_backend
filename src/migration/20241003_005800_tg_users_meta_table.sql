create table public.tg_users_meta
(
    id         bigint                  not null
        constraint tg_users_meta_pk
            unique
        constraint tg_users_meta_tg_users_id_fk
            references public.tg_users,
    client_id     uuid   default uuid_generate_v4() not null
        constraint tg_users_meta_pk_2
            unique,
    created_at timestamp default now() not null,
    updated_at timestamp default now() not null
);

comment on table public.tg_users_meta is 'Мета информация о telegram пользователях';
comment on column public.tg_users_meta.id is 'Telegram id пользователя';
comment on constraint tg_users_meta_pk on public.tg_users_meta is 'Telegram id пользователя';
comment on constraint tg_users_meta_tg_users_id_fk on public.tg_users_meta is 'Telegram id пользователя';
comment on column public.tg_users_meta.client_id is 'VPN id пользователя';
comment on constraint tg_users_meta_pk_2 on public.tg_users_meta is 'VPN id пользователя';
comment on column public.tg_users_meta.created_at is 'Дата создания';
comment on column public.tg_users_meta.updated_at is 'Дата обновления';
