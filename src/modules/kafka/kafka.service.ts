import { Injectable, OnModuleDestroy } from '@nestjs/common';
import * as Kafka from 'node-rdkafka';

@Injectable()
export default class KafkaService implements OnModuleDestroy {
	private producer: Kafka.Producer;

	constructor() {
		this.producer = new Kafka.Producer({
			'metadata.broker.list': 'localhost:9092',
			'dr_cb': true,
			'dr_msg_cb': true,
		});

	  const connect =	this.producer.connect();

		console.log("connect", connect);

		this.producer.on('ready', () => {
			console.log('Kafka Producer is ready');
		});

		this.producer.on('event.error', (err) => {
			console.error('Producer error:', err);
		});

		this.producer.on('delivery-report', (err, report) => {
			if (err) {
				console.error('Delivery report error:', err);
			} else {
				console.log('Message delivered:', report);
			}
		});

		this.producer.setPollInterval(100);
	}

	async sendMessage(topic: string, message: string): Promise<void> {
		return new Promise((resolve, reject) => {
			try {
				this.producer.produce(
					topic,
					null,
					Buffer.from(JSON.stringify(message)),
					null,
					Date.now()
				);
				console.log(`Sent message: ${message}`);
				resolve();
			} catch (err) {
				console.error('Failed to send message', err);
				reject(err);
			}
		});
	}

	onModuleDestroy() {
		this.producer.disconnect();
	}
}
