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
const main_1 = require("./server/main");
function fetchAndDisplayMessages() {
    return __awaiter(this, void 0, void 0, function* () {
        yield (0, main_1.startServer)();
        const messagesToSend = [
            {
                role: "user",
                content: "what did i ask before?",
            },
        ];
        const response = yield fetch("http://127.0.0.1:4317/api/get-completions", {
            method: "POST",
            body: JSON.stringify(messagesToSend),
            headers: {
                "Content-Type": "application/json",
            },
        });
        const newMessages = (yield response.json());
        const allMessages = [...messagesToSend, ...newMessages];
        console.dir(allMessages, { depth: null });
    });
}
fetchAndDisplayMessages().catch((error) => console.error("Error:", error));
