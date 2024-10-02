create table public.tg_users_meta
(
    id         bigint                  not null
        constraint tg_users_meta_pk
            unique
        constraint tg_users_meta_tg_users_id_fk
            references public.tg_users,
    trial      boolean   default false not null,
    created_at timestamp default now() not null,
    updated_at timestamp default now() not null
);

comment on table public.tg_users_meta is 'Мета информация о telegram пользователях';
comment on constraint tg_users_meta_pk on public.tg_users_meta is 'Telegram id пользователя';
comment on constraint tg_users_meta_tg_users_id_fk on public.tg_users_meta is 'Telegram id пользователя';
comment on column public.tg_users_meta.trial is 'Пробный период';
comment on column public.tg_users_meta.created_at is 'Дата создания';
comment on column public.tg_users_meta.updated_at is 'Дата обновления';

