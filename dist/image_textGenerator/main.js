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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.describeImageAsStreamText = exports.describeImage = void 0;
const ai_1 = require("ai");
const main_1 = __importDefault(require("../config/main"));
const systemPrompt = `You will receive an image to analyze. ` +
    `minimum 20 lines atleast` +
    `Write a concise alt text that vividly describes every detail of the image, leaving nothing out. ` +
    `Paint a picture with simple, everyday words, turning the scene into a short, captivating story. ` +
    `Focus on colors, shapes, actions, and emotions to hook the reader, making them feel part of the moment. ` +
    `Keep it brief but rich, so the description flows naturally and sparks curiosity.`;
const describeImage = (imageUrl) => __awaiter(void 0, void 0, void 0, function* () {
    const { text } = yield (0, ai_1.generateText)({
        model: (0, main_1.default)("gemini-1.5-flash"),
        system: systemPrompt,
        messages: [
            {
                role: "user",
                content: [
                    {
                        type: "image",
                        image: new URL(imageUrl),
                    },
                ],
            },
        ],
    });
    return text;
});
exports.describeImage = describeImage;
const describeImageAsStreamText = (imageUrl) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, e_1, _b, _c;
    const { textStream } = yield (0, ai_1.streamText)({
        model: (0, main_1.default)("gemini-1.5-flash"),
        system: systemPrompt,
        messages: [
            {
                role: "user",
                content: [
                    {
                        type: "image",
                        image: new URL(imageUrl),
                    },
                ],
            },
        ],
    });
    let fullText = "";
    try {
        for (var _d = true, textStream_1 = __asyncValues(textStream), textStream_1_1; textStream_1_1 = yield textStream_1.next(), _a = textStream_1_1.done, !_a; _d = true) {
            _c = textStream_1_1.value;
            _d = false;
            const text = _c;
            process.stdout.write(text);
            fullText += text;
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (!_d && !_a && (_b = textStream_1.return)) yield _b.call(textStream_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return fullText;
});
exports.describeImageAsStreamText = describeImageAsStreamText;
// describeImage("https://www.freep.com/gcdn/authoring/authoring-images/2025/03/13/PLSJ/82373947007-invincible.jpg?crop=1999,1125,x0,y300&width=1999&height=1125&format=pjpg&auto=webp").then(result => console.log(result)).catch(error => console.log(error));
(0, exports.describeImageAsStreamText)("https://www.freep.com/gcdn/authoring/authoring-images/2025/03/13/PLSJ/82373947007-invincible.jpg?crop=1999,1125,x0,y300&width=1999&height=1125&format=pjpg&auto=webp");
