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
    const { object } = yield (0, ai_1.generateObject)({
        model: googleConfigure('gemini-1.5-flash'),
        schema: RecipeSchema,
        prompt,
        schemaName: "Recipe",
        system: `You are helping a user create a recipe. ` +
            `Use Indian English variants of ingredient names,`,
    });
    return object.recipe;
});
exports.createRecipe = createRecipe;
(0, exports.createRecipe)("how to make butter chicken").then(result => console.dir(result, { depth: null })).catch(error => console.dir(error));
