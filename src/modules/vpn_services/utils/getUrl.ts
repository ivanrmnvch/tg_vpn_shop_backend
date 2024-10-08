import IURLData from '../interfaces/IURLData';

export const getUrl = ({
	clientId,
	ip,
	sni,
	pbk,
	sid,
	country,
}: IURLData): string =>
	`vless://${clientId}@${ip}:443/?type=tcp&encryption=none&flow=xtls-rprx-vision&sni=${sni}&alpn=h2&fp=chrome&security=reality&pbk=${pbk}&sid=${sid}&packetEncoding=xudp#${country}_test`;
