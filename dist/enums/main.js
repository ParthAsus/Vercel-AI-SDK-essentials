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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.classifySentiment = void 0;
const ai_1 = require("ai");
require("dotenv/config");
const main_1 = __importDefault(require("../config/main"));
const classifySentiment = (prompt) => __awaiter(void 0, void 0, void 0, function* () {
    const { object } = yield (0, ai_1.generateObject)({
        model: (0, main_1.default)('gemini-1.5-flash'),
        output: 'enum',
        enum: ["positive", "negative", "neutral"],
        prompt,
        system: `Classify the sentiment of the text as either ` +
            `positive, negative, or neutral.`,
    });
    return object;
});
exports.classifySentiment = classifySentiment;
(0, exports.classifySentiment)("i like invincible show").then(result => console.log(result));
