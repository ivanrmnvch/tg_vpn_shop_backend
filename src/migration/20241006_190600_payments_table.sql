create table public.payments
(
    tg_payment_charge_id varchar(47) not null
        constraint payments_pk
            primary key,
    provider_payment_charge_id uuid not null
        constraint payments_pk_3
            unique,
    tg_id      bigint                  not null
        constraint payments_tg_users_id_fk
            references public.tg_users,
    total_amount decimal(6) not null,
    currency varchar(3) default 'RUB' not null,
    "date" integer not null,
    created_at timestamp default now() not null,
    updated_at timestamp default now() not null
);

comment on table public.payments is 'Таблица платежей';
comment on constraint payments_pk on public.payments is 'Идентификатор платежа telegram';
comment on column public.payments.tg_id is 'Telegram id пользователя';
comment on constraint payments_tg_users_id_fk on public.payments is 'Telegram id пользователя';
comment on column public.payments.created_at is 'Дата создания';
comment on column public.payments.updated_at is 'Дата обновления';
comment on column public.payments.tg_payment_charge_id is 'Идентификатор платежа telegram';
comment on column public.payments.provider_payment_charge_id is 'Идентификатор платежа провайдера';
comment on column public.payments.total_amount is 'Сумма платежа';
comment on column public.payments.date is 'Дата платежа';
comment on column public.payments.currency is 'Валюта';
