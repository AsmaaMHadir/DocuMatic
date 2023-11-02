
import OpenAI from 'openai';

export class OpenAIclass {
    constructor(apiKey) {
        // Create the Configuration and OpenAIApi instances
        this.openai = new OpenAI({
            apiKey: apiKey 
        });
    }
    // Asynchronous function to generate text from the OpenAI API
    async generateText(prompt, model, max_tokens, temperature = 0.85) {
        try {
            // Send a request to the OpenAI API to generate text
            const response = await this.openai.chat.completions.create({
                model,
                messages : [
                    {"role": "user", "content": prompt},
                ],
                max_tokens,
                n: 1,
                temperature,
            });
               // Return the text of the response
            return response.choices[0].message;
        } catch (error) {
            throw error;
        }
    }
}