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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startServer = void 0;
var hono_1 = require("hono");
var node_server_1 = require("@hono/node-server");
var node_events_1 = require("node:events");
var ai_1 = require("ai");
var google_1 = require("@ai-sdk/google");
require("dotenv/config");
var googleConfigure = (0, google_1.createGoogleGenerativeAI)({
    apiKey: process.env.GOOGLE_API_KEY,
});
var startServer = function () { return __awaiter(void 0, void 0, void 0, function () {
    var app, server, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log("Starting server...");
                console.log("API Key:", process.env.GOOGLE_API_KEY);
                app = new hono_1.Hono();
                app.post("/api/get-completions", function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
                    var messages, result, responseMessage;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                console.log("Received POST request");
                                return [4 /*yield*/, ctx.req.json()];
                            case 1:
                                messages = _a.sent();
                                console.log("Messages:", messages);
                                return [4 /*yield*/, (0, ai_1.generateText)({
                                        model: googleConfigure("gemini-1.5-flash"),
                                        messages: messages,
                                    })];
                            case 2:
                                result = _a.sent();
                                responseMessage = {
                                    role: "assistant",
                                    content: result.text,
                                };
                                return [2 /*return*/, ctx.json([responseMessage])];
                        }
                    });
                }); });
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                server = (0, node_server_1.serve)({
                    fetch: app.fetch,
                    port: 4317,
                    hostname: "127.0.0.1",
                });
                server.on("error", function (err) {
                    console.error("Server error:", err);
                });
                return [4 /*yield*/, (0, node_events_1.once)(server, "listening")];
            case 2:
                _a.sent();
                console.log("Server running on http://localhost:4317");
                return [2 /*return*/, server];
            case 3:
                error_1 = _a.sent();
                console.error("Failed to start server:", error_1);
                throw error_1; // Propagate the error
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.startServer = startServer;
