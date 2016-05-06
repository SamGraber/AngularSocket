import { bootstrap }    from '@angular/platform-browser-dynamic';

import { AppComponent } from './app.component';
import { BROWSER_SOCKET_PROVIDERS } from './services/socket/socket.browser';

bootstrap(AppComponent, [BROWSER_SOCKET_PROVIDERS]);
