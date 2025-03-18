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
exports.createRecipe = void 0;
var ai_1 = require("ai");
var google_1 = require("@ai-sdk/google");
var zod_1 = require("zod");
require("dotenv/config");
var IngredientSchema = zod_1.z.object({
    name: zod_1.z.string().describe("The name of the ingredient (e.g., 'flour', 'spinach')"),
    quantity: zod_1.z.string().describe("The amount of the ingredient (e.g., '2 cups', '1 tsp')"),
    notes: zod_1.z.string().optional().describe("Optional additional details about the ingredient (e.g., 'chopped', 'fresh')"),
});
var RecipeSchema = zod_1.z.object({
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
var googleConfigure = (0, google_1.createGoogleGenerativeAI)({
    apiKey: process.env.GOOGLE_API_KEY,
});
var createRecipe = function (prompt) { return __awaiter(void 0, void 0, void 0, function () {
    var object;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, ai_1.generateObject)({
                    model: googleConfigure('gemini-1.5-flash'),
                    schema: RecipeSchema,
                    prompt: prompt,
                    schemaName: "Recipe",
                    system: "You are helping a user create a recipe. " +
                        "Use Indian English variants of ingredient names,",
                })];
            case 1:
                object = (_a.sent()).object;
                return [2 /*return*/, object.recipe];
        }
    });
}); };
exports.createRecipe = createRecipe;
(0, exports.createRecipe)("how to make butter chicken").then(function (result) { return console.dir(result, { depth: null }); }).catch(function (error) { return console.dir(error); });
