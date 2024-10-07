create table public.transaction
(
    tg_payment_charge_id varchar(47) not null
        constraint transaction_pk
            primary key,
    provider_payment_charge_id uuid not null
        constraint transaction_pk_3
            unique,
    tg_id      bigint                  not null
        constraint transaction_tg_users_id_fk
            references public.tg_users,
    service_code varchar not null
        constraint transaction_services_service_code_fk
            references public.services (service_code),
    total_amount decimal(6) not null,
    currency varchar(3) default 'RUB' not null,
    "date" integer not null,
    created_at timestamp default now() not null,
    updated_at timestamp default now() not null
);

comment on table public.transaction is 'Таблица оформленных заказов';
comment on constraint transaction_pk on public.transaction is 'Идентификатор платежа telegram';
comment on column public.transaction.tg_id is 'Telegram id пользователя';
comment on constraint transaction_tg_users_id_fk on public.transaction is 'Telegram id пользователя';
comment on column public.transaction.created_at is 'Дата создания';
comment on column public.transaction.updated_at is 'Дата обновления';
comment on column public.transaction.tg_payment_charge_id is 'Идентификатор платежа telegram';
comment on column public.transaction.service_code is 'Код услуги';
comment on constraint transaction_services_service_code_fk on public.transaction is 'Код услуги';
comment on column public.transaction.provider_payment_charge_id is 'Идентификатор платежа провайдера';
comment on column public.transaction.total_amount is 'Сумма платежа';
comment on column public.transaction.date is 'Дата платежа';
comment on column public.transaction.currency is 'Валюта';
