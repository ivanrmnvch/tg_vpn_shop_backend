create table public.transaction
(
    id         serial
        constraint transaction_pk
            primary key,
    tg_id      bigint                  not null
        constraint transaction_tg_users_id_fk
            references public.tg_users,
    service_id uuid                    not null
        constraint transaction_services_id_fk
            references public.services,
    created_at timestamp default now() not null,
    updated_at timestamp default now() not null
);

comment on table public.transaction is 'Таблица оформленных заказов';
comment on column public.transaction.id is 'ID заказа';
comment on constraint transaction_pk on public.transaction is 'ID заказа';
comment on column public.transaction.tg_id is 'Telegram id пользователя';
comment on constraint transaction_tg_users_id_fk on public.transaction is 'Telegram id пользователя';
comment on column public.transaction.service_id is 'Купленная услуга';
comment on constraint transaction_services_id_fk on public.transaction is 'Купленная услуга';
comment on column public.transaction.created_at is 'Дата создания';
comment on column public.transaction.updated_at is 'Дата обновления';

