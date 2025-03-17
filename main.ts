import { generateText, streamText, type CoreMessage } from 'ai';
import {createGoogleGenerativeAI } from '@ai-sdk/google';
import 'dotenv/config';

const googleConfigure = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_API_KEY,
});

export const generateMyAnswer = async(prompt: string) => {
  const {textStream} = await streamText({
    model: googleConfigure('gemini-1.5-flash'),
    messages: [
      {
        role: 'system',
        content:  `You are a text summarizer. ` +
        `Summarize the text you receive. ` +
        `Be concise. ` +
        `Return only the summary. ` +
        `Do not use the phrase "here is a summary". ` +
        `Highlight relevant phrases in bold. ` ,
      },
      {
        role: 'user',
        content: prompt
      }
    ]
  });

  let fullText = '';
  for await(const text of textStream){
    process.stdout.write(text);
    fullText += text;
  }
  // return fullText;
};




generateMyAnswer("Invinscible season 3 summeriazed").then(answer => console.log(answer)).catch(error => console.log(error));