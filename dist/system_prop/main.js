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
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateMyAnswer = void 0;
const ai_1 = require("ai");
const google_1 = require("@ai-sdk/google");
require("dotenv/config");
const googleConfigure = (0, google_1.createGoogleGenerativeAI)({
    apiKey: process.env.GOOGLE_API_KEY,
});
const generateMyAnswer = (prompt) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, e_1, _b, _c;
    const { textStream } = yield (0, ai_1.streamText)({
        model: googleConfigure('gemini-1.5-flash'),
        messages: [
            {
                role: 'system',
                content: `You are a text summarizer. ` +
                    `Summarize the text you receive. ` +
                    `Be concise. ` +
                    `Return only the summary. ` +
                    `Do not use the phrase "here is a summary". ` +
                    `Highlight relevant phrases in bold. `,
            },
            {
                role: 'user',
                content: prompt
            }
        ]
    });
    let fullText = '';
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
    // return fullText;
});
exports.generateMyAnswer = generateMyAnswer;
(0, exports.generateMyAnswer)("Invinscible season 3 summeriazed").then(answer => console.log(answer)).catch(error => console.log(error));
