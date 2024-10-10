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
    trial      boolean   default false not null,
    trial_start_date timestamp,
    trial_end_date timestamp,
    created_at timestamp default now() not null,
    updated_at timestamp default now() not null
);

comment on table public.tg_users_meta is 'Мета информация о telegram пользователях';
comment on column public.tg_users_meta.id is 'Telegram id пользователя';
comment on constraint tg_users_meta_pk on public.tg_users_meta is 'Telegram id пользователя';
comment on constraint tg_users_meta_tg_users_id_fk on public.tg_users_meta is 'Telegram id пользователя';
comment on column public.tg_users_meta.client_id is 'VPN id пользователя';
comment on constraint tg_users_meta_pk_2 on public.tg_users_meta is 'VPN id пользователя';
comment on column public.tg_users_meta.trial is 'Пробный период';
comment on column public.tg_users_meta.trial_start_date is 'Дата начала действия пробного периода';
comment on column public.tg_users_meta.trial_end_date is 'Дата окончания действия пробного периода';
comment on column public.tg_users_meta.created_at is 'Дата создания';
comment on column public.tg_users_meta.updated_at is 'Дата обновления';
