import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { Kafka, Producer } from 'kafkajs';
import NewVPNClientDto from './dto/newVPNClient.dto';

@Injectable()
export default class KafkaService implements OnModuleDestroy {
	private producer: Producer;

	constructor() {
		const kafka = new Kafka({
			clientId: 'my-app', // Уникальный идентификатор клиента
			brokers: ['kafka:9092'], // Адреса ваших брокеров
		});

		this.producer = kafka.producer();

		this.connectProducer();
	}

	private async connectProducer() {
		await this.producer.connect();
		console.log('Kafka Producer is ready');

		this.producer.on('producer.connect', () => {
			console.log('Producer connected');
		});

		this.producer.on('producer.disconnect', () => {
			console.log('Producer disconnected');
		});
	}

	async sendMessage(topic: string, message: string): Promise<void> {
		try {
			await this.producer.send({
				topic,
				messages: [{ value: message }],
			});
			console.log(`Sent message: ${message}`);
		} catch (err) {
			console.error('Failed to send message', err);
			throw err;
		}
	}

	async addNewVPNClient(message: NewVPNClientDto) {
		return this.sendMessage('vpn-events-test12', JSON.stringify(message));
	}

	async onModuleDestroy() {
		await this.producer.disconnect();
	}
}

// import { Injectable, OnModuleDestroy } from '@nestjs/common';
// import * as Kafka from 'node-rdkafka';
//
// import NewVPNClientDto from './dto/newVPNClient.dto';
//
// @Injectable()
// export default class KafkaService implements OnModuleDestroy {
// 	private producer: Kafka.Producer;
//
// 	constructor() {
// 		this.producer = new Kafka.Producer({
// 			'metadata.broker.list': 'localhost:9092',
// 			dr_cb: true,
// 			dr_msg_cb: true,
// 		});
//
// 		this.producer.connect();
//
// 		this.producer.on('ready', () => {
// 			console.log('Kafka Producer is ready');
// 		});
//
// 		this.producer.on('event.error', (err) => {
// 			console.error('Producer error:', err);
// 		});
//
// 		this.producer.on('delivery-report', (err, report) => {
// 			if (err) {
// 				console.error('Delivery report error:', err);
// 			} else {
// 				console.log('Message delivered:', report);
// 			}
// 		});
//
// 		this.producer.setPollInterval(100);
// 	}
//
// 	async sendMessage(topic: string, message: string): Promise<void> {
// 		return new Promise((resolve, reject) => {
// 			try {
// 				this.producer.produce(
// 					topic,
// 					null,
// 					Buffer.from(message),
// 					null,
// 					Date.now()
// 				);
// 				console.log(`Sent message: ${message}`);
// 				resolve();
// 			} catch (err) {
// 				console.error('Failed to send message', err);
// 				reject(err);
// 			}
// 		});
// 	}
//
// 	async addNewVPNClient(message: NewVPNClientDto) {
// 		return this.sendMessage('vpn-events-test123', JSON.stringify(message));
// 	}
//
// 	onModuleDestroy() {
// 		this.producer.disconnect();
// 	}
// }
