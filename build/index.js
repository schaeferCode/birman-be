"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
var app_1 = __importDefault(require("./app"));
dotenv_1.default.config();
// start server
var port = process.env.PORT || 3000;
app_1.default.listen(port);
// eslint-disable-next-line no-console
console.log("Server listening at " + port);
