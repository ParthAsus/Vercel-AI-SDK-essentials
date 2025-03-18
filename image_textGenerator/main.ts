import { generateText, streamText } from "ai";
import googleConfigure from "../config/main";
const systemPrompt =
  `You will receive an image to analyze. ` +
  `Write a concise alt text that vividly describes every detail of the image, leaving nothing out. ` +
  `Paint a picture with simple, everyday words, turning the scene into a short, captivating story. ` +
  `Focus on colors, shapes, actions, and emotions to hook the reader, making them feel part of the moment. ` +
  `Keep it brief but rich, so the description flows naturally and sparks curiosity.`;

export const describeImage = async (imageUrl: string) => {
  const { text } = await generateText({
    model: googleConfigure("gemini-1.5-flash"),
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
};

export const describeImageAsStreamText = async (imageUrl: string) => {
  const { textStream } = await streamText({
    model: googleConfigure("gemini-1.5-flash"),
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
  for await (const text of textStream) {
    process.stdout.write(text);
    fullText += text;
  }

  return fullText;
};

describeImage("https://www.freep.com/gcdn/authoring/authoring-images/2025/03/13/PLSJ/82373947007-invincible.jpg?crop=1999,1125,x0,y300&width=1999&height=1125&format=pjpg&auto=webp").then(result => console.log(result)).catch(error => console.log(error));

describeImageAsStreamText(
  "https://www.freep.com/gcdn/authoring/authoring-images/2025/03/13/PLSJ/82373947007-invincible.jpg?crop=1999,1125,x0,y300&width=1999&height=1125&format=pjpg&auto=webp"
);
