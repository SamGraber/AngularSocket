import { Injectable, Inject } from '@angular/core';
import { Observable, ReplaySubject, BehaviorSubject } from 'rxjs';

import { socketToken } from './socket.browser';

@Injectable()
export class SocketService {
	private socket: any;
	private connection: BehaviorSubject<boolean>;
	private eventStream: BehaviorSubject<any>;
	private arraySream: BehaviorSubject<any[]>;
	private array: any[] = [];
	
	constructor(@Inject(socketToken) private io: any) {
		this.connection = new BehaviorSubject<boolean>(false);
		this.eventStream = new BehaviorSubject<any>('Default');
		this.arraySream = new BehaviorSubject<any>([]);
		this.socket = io.connect('localhost:8080');
		this.socket.on('connect', (): void => {
			console.log('Connected');
			this.connection.next(true);
			this.socket.on('message', (message: string): void => {
				this.eventStream.next(message);
				this.array.push(message);
				this.arraySream.next(this.array);
			});
		});
		this.socket.on('disconnect', (): void => {
			console.log('Disconnected');
		});
	}
	
	on(event: string): Observable<any> {
		return this.eventStream;
	}
	
	all(event: string): Observable<any> {
		return this.arraySream;
	}
	
	send(event: string, data: any): void {
		this.connection.subscribe(connected => {
			if (connected) {
				this.socket.emit(event, data);
				this.eventStream.next(data);
				this.array.push(data);
				this.arraySream.next(this.array);
			}
		});
	}
}