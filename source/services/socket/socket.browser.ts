declare var io: any;
import { Provider, OpaqueToken, provide } from '@angular/core';

export const socketToken: OpaqueToken = new OpaqueToken('Socket io');
export const BROWSER_SOCKET_PROVIDERS: Provider[] = [
	provide(socketToken, { useValue: io }),
];
