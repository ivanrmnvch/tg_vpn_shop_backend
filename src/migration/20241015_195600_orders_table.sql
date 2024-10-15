create table public.orders
(
    id           serial
        constraint orders_pk
            primary key,
    tg_id        bigint                  not null
        constraint orders_tg_users_id_fk
            references public.tg_users,
    service_code varchar                 not null
        constraint orders_services_service_code_fk
            references public.services (service_code),
    payment_id   uuid                    not null
        constraint orders_payments_provider_payment_charge_id_fk
            references public.payments (provider_payment_charge_id),
    start_date   timestamp default now() not null,
    end_date     timestamp               not null,
    created_at   timestamp default now() not null,
    updated_at   timestamp default now() not null
);

comment on table public.orders is 'Таблица оформленных заказов';
comment on column public.orders.id is 'Идентификатор заказа ';
comment on constraint orders_pk on public.orders is 'Идентификатор заказа';
comment on column public.orders.tg_id is 'Telegram id пользователя';
comment on constraint orders_tg_users_id_fk on public.orders is 'Telegram id пользователя';
comment on column public.orders.service_code is 'Код услуги';
comment on constraint orders_services_service_code_fk on public.orders is 'Код услуги';
comment on column public.orders.payment_id is 'Идентификатор платежа';
comment on constraint orders_payments_provider_payment_charge_id_fk on public.orders is 'Идентификатор платежа';
comment on column public.orders.start_date is 'Дата начала действия услуги';
comment on column public.orders.end_date is 'Дата окончания действия услуги';
comment on column public.orders.created_at is 'Дата создания';
comment on column public.orders.updated_at is 'Дата обновления';
