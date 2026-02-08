import OpenAI from 'openai';

// Only create the client if API key is available
export const openrouter = process.env.OPENROUTER_API_KEY 
  ? new OpenAI({
      apiKey: process.env.OPENROUTER_API_KEY,
      baseURL: 'https://openrouter.ai/api/v1',
    })
  : null;
