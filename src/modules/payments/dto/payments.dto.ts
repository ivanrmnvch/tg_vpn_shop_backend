export default class PaymentsDto {
	tgPayId: string;
	providePayId: string;
	tgId: number;
	serviceCode: string;
	totalAmount: number;
	currency?: string;
	date: number;
}
