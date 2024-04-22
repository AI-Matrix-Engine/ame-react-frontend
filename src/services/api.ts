// /src/lib/api.ts
import axios from 'axios';

// Centralized Axios instance for REST APIs for AI Matrix Engine Backend
export const aiMatrixAPI = axios.create({
    baseURL: 'https://aimatrixengine.com/'
});
