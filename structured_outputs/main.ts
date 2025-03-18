import { generateObject } from 'ai';
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import {z} from 'zod';
import "dotenv/config";


const IngredientSchema = z.object({
  name: z.string().describe("The name of the ingredient (e.g., 'flour', 'spinach')"),
  quantity: z.string().describe("The amount of the ingredient (e.g., '2 cups', '1 tsp')"),
  notes: z.string().optional().describe("Optional additional details about the ingredient (e.g., 'chopped', 'fresh')"),
});

const RecipeSchema = z.object({
  recipe: z.object({
    name: z.string().describe("The name of the recipe (e.g., 'Vegetarian Lasagna')"),
    ingredients: z
      .array(IngredientSchema)
      .describe("List of ingredients used in the recipe"),
    origin: z.string().describe("Cultural or geographical origin of the recipe (e.g., 'Italy')"),
    benefits: z
      .array(z.string())
      .describe("Health or other benefits of the dish (e.g., 'Rich in calcium')"),
    prepTime: z.string().describe("Time required to prepare the dish (e.g., '20 minutes')"),
    cookTime: z.string().describe("Time required to cook the dish (e.g., '45 minutes')"),
    servings: z.number().int().describe("Number of servings the recipe yields (e.g., 4)"),
    instructions: z
      .array(z.string())
      .describe("Step-by-step instructions to cook the recipe"),
    difficulty: z
      .enum(['easy', 'medium', 'hard'])
      .describe("Difficulty level of the recipe ('easy', 'medium', or 'hard')"),
    category: z.string().describe("Category of the dish (e.g., 'main', 'dessert')"),
    tips: z
      .array(z.string())
      .optional()
      .describe("Optional tips or variations for cooking the recipe"),
  })
});


const googleConfigure = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_API_KEY,
});


export const createRecipe = async(prompt: string) => {
  const {object} = await generateObject({
    model: googleConfigure('gemini-1.5-flash'),
    schema: RecipeSchema,
    prompt,
    schemaName: "Recipe",
    system: 
    `You are helping a user create a recipe. ` +
    `Use Indian English variants of ingredient names,`,
  });

  return object.recipe;
}

createRecipe("how to make butter chicken").then(result => console.dir(result, {depth: null})).catch(error => console.dir(error));