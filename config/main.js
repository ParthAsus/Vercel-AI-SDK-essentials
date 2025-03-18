"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
var google_1 = require("@ai-sdk/google");
var googleConfigure = (0, google_1.createGoogleGenerativeAI)({
    apiKey: process.env.GOOGLE_API_KEY,
});
exports.default = googleConfigure;
