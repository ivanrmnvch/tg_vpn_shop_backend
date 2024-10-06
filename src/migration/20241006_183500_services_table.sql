create table public.services
(
    id           uuid      default uuid_generate_v4() not null
        constraint services_pk
            primary key,
    service_code varchar                              not null
        constraint services_pk_2
            unique,
    created_at   timestamp default now()              not null,
    updated_at   timestamp default now()              not null
);

comment on table public.services is 'Таблица VPN услуг';
comment on column public.services.id is 'ID VPN услуги';
comment on constraint services_pk on public.services is 'ID VPN услуги';
comment on column public.services.service_code is 'Кодовое название VPN услуги';
comment on constraint services_pk_2 on public.services is 'Кодовое название VPN услуги';
comment on column public.services.created_at is 'Дата создания';
comment on column public.services.updated_at is 'Дата обновления';

