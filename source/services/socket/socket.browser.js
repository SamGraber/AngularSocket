"use strict";
var core_1 = require('@angular/core');
exports.socketToken = new core_1.OpaqueToken('Socket io');
exports.BROWSER_SOCKET_PROVIDERS = [
    core_1.provide(exports.socketToken, { useValue: io }),
];
//# sourceMappingURL=socket.browser.js.map