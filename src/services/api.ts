// /src/lib/api.ts
import axios from 'axios';

// Centralized Axios instance for REST APIs for AI Matrix Engine Backend
export const aiMatrixAPI = axios.create({
    baseURL: process.env.NEXT_PUBLIC_AIMATRIX_URL || 'https://dev-back.aimatrixengine.com/'
});

export const subAiAPI = {
    api: "oai/api",
    apiCallHistory: "oai/apicallhistory"
}