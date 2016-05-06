import { Component } from '@angular/core';
import { COMMON_DIRECTIVES, FORM_DIRECTIVES } from '@angular/common';
import { Observable } from 'rxjs';

import { SocketService } from './services/socket/socket.service';

@Component({
	moduleId: module.id,
	selector: 'my-app',
	templateUrl: 'app.component.html',
	providers: [SocketService],
	// directives: [COMMON_DIRECTIVES, FORM_DIRECTIVES],
})
export class AppComponent {
	newMessage: string;
	
	constructor(private socket: SocketService) {}
	
	messages(): Observable<string[]> {
		return this.socket.all('message');
	}
	
	addMessage(): void {
		this.socket.send('message', this.newMessage);
		this.newMessage = null;
	}
}
