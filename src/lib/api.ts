// /src/lib/api.ts
import axios from 'axios';

// Centralized Axios instance for REST APIs
export const aimatrixAPI = axios.create({
    baseURL: 'http://aimatrixengine.com/'
});

export const openaiAPI = axios.create({
    baseURL: 'https://api.openai.com/',
    headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
    }
});

// Add Firebase and other API configurations here



