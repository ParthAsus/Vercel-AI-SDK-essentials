import { type CoreMessage } from "ai";
import { startServer } from "./server/main";

async function fetchAndDisplayMessages() {
  await startServer();

  const messagesToSend: CoreMessage[] = [
    {
      role: "user",
      content: "What's the capital of Wales?",
    },
  ];

  const response = await fetch("http://127.0.0.1:4317/api/get-completions", {
    method: "POST",
    body: JSON.stringify(messagesToSend),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const newMessages = (await response.json()) as CoreMessage[];

  const allMessages = [...messagesToSend, ...newMessages];

  console.dir(allMessages, { depth: null });
}

fetchAndDisplayMessages().catch((error) =>
  console.error("Error:", error)
);