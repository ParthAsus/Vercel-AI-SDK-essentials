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
exports.createRecipe = void 0;
const ai_1 = require("ai");
const google_1 = require("@ai-sdk/google");
const zod_1 = require("zod");
require("dotenv/config");
const IngredientSchema = zod_1.z.object({
    name: zod_1.z.string().describe("The name of the ingredient (e.g., 'flour', 'spinach')"),
    quantity: zod_1.z.string().describe("The amount of the ingredient (e.g., '2 cups', '1 tsp')"),
    notes: zod_1.z.string().optional().describe("Optional additional details about the ingredient (e.g., 'chopped', 'fresh')"),
});
const RecipeSchema = zod_1.z.object({
    recipe: zod_1.z.object({
        name: zod_1.z.string().describe("The name of the recipe (e.g., 'Vegetarian Lasagna')"),
        ingredients: zod_1.z
            .array(IngredientSchema)
            .describe("List of ingredients used in the recipe"),
        origin: zod_1.z.string().describe("Cultural or geographical origin of the recipe (e.g., 'Italy')"),
        benefits: zod_1.z
            .array(zod_1.z.string())
            .describe("Health or other benefits of the dish (e.g., 'Rich in calcium')"),
        prepTime: zod_1.z.string().describe("Time required to prepare the dish (e.g., '20 minutes')"),
        cookTime: zod_1.z.string().describe("Time required to cook the dish (e.g., '45 minutes')"),
        servings: zod_1.z.number().int().describe("Number of servings the recipe yields (e.g., 4)"),
        instructions: zod_1.z
            .array(zod_1.z.string())
            .describe("Step-by-step instructions to cook the recipe"),
        difficulty: zod_1.z
            .enum(['easy', 'medium', 'hard'])
            .describe("Difficulty level of the recipe ('easy', 'medium', or 'hard')"),
        category: zod_1.z.string().describe("Category of the dish (e.g., 'main', 'dessert')"),
        tips: zod_1.z
            .array(zod_1.z.string())
            .optional()
            .describe("Optional tips or variations for cooking the recipe"),
    })
});
const googleConfigure = (0, google_1.createGoogleGenerativeAI)({
    apiKey: process.env.GOOGLE_API_KEY,
});
const createRecipe = (prompt) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, e_1, _b, _c;
    const result = yield (0, ai_1.streamObject)({
        model: googleConfigure('gemini-1.5-flash'),
        schema: RecipeSchema,
        prompt,
        schemaName: "Recipe",
        // output: "array",
        system: `You are helping a user create a recipe. ` +
            `Use Indian English variants of ingredient names,`,
    });
    try {
        for (var _d = true, _e = __asyncValues(result.partialObjectStream), _f; _f = yield _e.next(), _a = _f.done, !_a; _d = true) {
            _c = _f.value;
            _d = false;
            const obj = _c;
            console.clear();
            console.dir(obj.recipe);
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (!_d && !_a && (_b = _e.return)) yield _b.call(_e);
        }
        finally { if (e_1) throw e_1.error; }
    }
    const finalObject = yield result.object;
    return finalObject.recipe;
});
exports.createRecipe = createRecipe;
(0, exports.createRecipe)("how to make butter chicken");
