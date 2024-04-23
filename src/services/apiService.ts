import axios from 'axios';
import { iApiType } from "@/utils/types";
import { aiMatrixAPI } from './api';

export const fetchApis = async (): Promise<iApiType[]> => {
    try {
        const response = await axios.get(`${aiMatrixAPI.defaults.baseURL}oai/api/`);
        const formattedApis: iApiType[] = response.data;
        return formattedApis;
    } catch (error) {
        console.error('Failed to fetch categories', error);
        return []; // Return empty array on error
    }
};

export const createApi = async (api: any): Promise<void> => {
    try {  
        const response = await axios.post(`${aiMatrixAPI.defaults.baseURL}oai/api/`, api);
        console.log('Api added successfully.', response.data);
    } catch (error) {
        console.error('Failed to add api', error);
    }
}