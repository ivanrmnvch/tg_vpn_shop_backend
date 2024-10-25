create table public.vpn_clients
(
    id          serial
        constraint vpn_clients_pk
            primary key,
    login       uuid      default uuid_generate_v4() not null,
    connections integer   default 3                  not null,
    active      boolean   default true               not null,
    created_at  timestamp default now()              not null,
    updated_at  timestamp default now()              not null
);

comment on table public.vpn_clients is 'Таблица VPN клиентов';
comment on column public.vpn_clients.id is 'Идентификатор VPN клиента';
comment on constraint vpn_clients_pk on public.vpn_clients is 'Идентификатор VPN клиента';
comment on column public.vpn_clients.login is 'Логин VPN клиента';
comment on column public.vpn_clients.connections is 'Максимальное количество ip адресов VPN клиента';
comment on column public.vpn_clients.active is 'VPN клиент active';
comment on column public.vpn_clients.created_at is 'Дата создания';
comment on column public.vpn_clients.updated_at is 'Дата обновления';

