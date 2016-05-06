"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var core_1 = require('@angular/core');
var rxjs_1 = require('rxjs');
var socket_browser_1 = require('./socket.browser');
var SocketService = (function () {
    function SocketService(io) {
        var _this = this;
        this.io = io;
        this.array = [];
        this.connection = new rxjs_1.BehaviorSubject(false);
        this.eventStream = new rxjs_1.BehaviorSubject('Default');
        this.arraySream = new rxjs_1.BehaviorSubject([]);
        this.socket = io.connect('localhost:8080');
        this.socket.on('connect', function () {
            console.log('Connected');
            _this.connection.next(true);
            _this.socket.on('message', function (message) {
                _this.eventStream.next(message);
                _this.array.push(message);
                _this.arraySream.next(_this.array);
            });
        });
        this.socket.on('disconnect', function () {
            console.log('Disconnected');
        });
    }
    SocketService.prototype.on = function (event) {
        return this.eventStream;
    };
    SocketService.prototype.all = function (event) {
        return this.arraySream;
    };
    SocketService.prototype.send = function (event, data) {
        var _this = this;
        this.connection.subscribe(function (connected) {
            if (connected) {
                _this.socket.emit(event, data);
                _this.eventStream.next(data);
                _this.array.push(data);
                _this.arraySream.next(_this.array);
            }
        });
    };
    SocketService = __decorate([
        core_1.Injectable(),
        __param(0, core_1.Inject(socket_browser_1.socketToken)), 
        __metadata('design:paramtypes', [Object])
    ], SocketService);
    return SocketService;
}());
exports.SocketService = SocketService;
//# sourceMappingURL=socket.service.js.map