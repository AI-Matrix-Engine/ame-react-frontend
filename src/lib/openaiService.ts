import { openaiAPI } from './api';

export const getOpenAIResponse = async (userMessage: string) => {
    const payload = {
        model: "gpt-4-turbo-2024-04-09",
        messages: [
            { role: "system", content: "You're a helpful assistant" },
            { role: "user", content: userMessage }
        ],
        temperature: 1,
        max_tokens: 256,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0
    };

    try {
        const { data } = await openaiAPI.post('chat/completions', payload);
        return data;
    } catch (error) {
        console.error('Error fetching OpenAI data:', error);
        throw error;
    }
};
