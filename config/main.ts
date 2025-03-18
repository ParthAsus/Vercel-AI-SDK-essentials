import "dotenv/config";
import { createGoogleGenerativeAI } from "@ai-sdk/google";


const googleConfigure = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_API_KEY,
});


export default googleConfigure;