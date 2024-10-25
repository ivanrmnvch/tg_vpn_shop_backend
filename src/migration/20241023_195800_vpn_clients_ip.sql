create table public.vpn_clients_ip
(
    id integer not null
        constraint vpn_clients_ip_vpn_clients_id_fk
            references public.vpn_clients,
    ip varchar(15) not null
);

comment on table public.vpn_clients_ip is 'Таблица ip адресов VPN клиента';
comment on column public.vpn_clients_ip.id is 'Идентификатор VPN клиента';
comment on constraint vpn_clients_ip_vpn_clients_id_fk on public.vpn_clients_ip is 'Идентификатор VPN клиента';
comment on column public.vpn_clients_ip.ip is 'IP адрес VPN клиента';

