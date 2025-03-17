import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { once } from "node:events";
import { generateText, type CoreMessage } from "ai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import "dotenv/config";

const googleConfigure = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_API_KEY,
});

export const startServer = async () => {
  console.log("Starting server...");
  console.log("API Key:", process.env.GOOGLE_API_KEY);

  const app = new Hono();
  app.post("/api/get-completions", async (ctx) => {
    console.log("Received POST request");
    const messages: CoreMessage[] = await ctx.req.json();
    console.log("Messages:", messages);
    const result = await generateText({
      model: googleConfigure("gemini-1.5-flash"),
      messages,
    });
    const responseMessage: CoreMessage = {
      role: "assistant",
      content: result.text,
    };
    return ctx.json([responseMessage]);
  });

  try {
    const server = serve({
      fetch: app.fetch,
      port: 4317,
      hostname: "127.0.0.1",
    });

    server.on("error", (err) => {
      console.error("Server error:", err);
    });

    await once(server, "listening");
    console.log("Server running on http://localhost:4317");
    return server;
  } catch (error) {
    console.error("Failed to start server:", error);
    throw error; // Propagate the error
  }
};