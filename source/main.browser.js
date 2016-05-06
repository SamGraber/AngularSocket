"use strict";
var platform_browser_dynamic_1 = require('@angular/platform-browser-dynamic');
var app_component_1 = require('./app.component');
var socket_browser_1 = require('./services/socket/socket.browser');
platform_browser_dynamic_1.bootstrap(app_component_1.AppComponent, [socket_browser_1.BROWSER_SOCKET_PROVIDERS]);
//# sourceMappingURL=main.browser.js.map