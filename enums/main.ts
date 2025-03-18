
import {generateObject} from 'ai';
import "dotenv/config";
import googleConfigure from "../config/main";


export const classifySentiment = async(prompt: string) => {
  const {object} = await generateObject({
    model: googleConfigure('gemini-1.5-flash'),
    output: 'enum',
    enum: ["positive", "negative", "neutral"],
    prompt,
    system:  `Classify the sentiment of the text as either ` +
    `positive, negative, or neutral.`,
  });

  return object;
}

classifySentiment("i like invincible show").then(result => console.log(result));


