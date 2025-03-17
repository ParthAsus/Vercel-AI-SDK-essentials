"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startServer = void 0;
const hono_1 = require("hono");
const node_server_1 = require("@hono/node-server");
const node_events_1 = require("node:events");
const ai_1 = require("ai");
const google_1 = require("@ai-sdk/google");
require("dotenv/config");
const googleConfigure = (0, google_1.createGoogleGenerativeAI)({
    apiKey: process.env.GOOGLE_API_KEY,
});
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Starting server...");
    const app = new hono_1.Hono();
    app.post("/api/get-completions", (ctx) => __awaiter(void 0, void 0, void 0, function* () {
        console.log("Received POST request");
        const messages = yield ctx.req.json();
        console.log("Messages:", messages);
        const result = yield (0, ai_1.generateText)({
            model: googleConfigure("gemini-1.5-flash"),
            messages,
        });
        const responseMessage = {
            role: "assistant",
            content: result.text,
        };
        return ctx.json([responseMessage]);
    }));
    const server = (0, node_server_1.serve)({
        fetch: app.fetch,
        port: 4317,
        hostname: "0.0.0.0",
    });
    yield (0, node_events_1.once)(server, "listening");
    console.log("Server running on http://localhost:4317");
    return server;
});
exports.startServer = startServer;
