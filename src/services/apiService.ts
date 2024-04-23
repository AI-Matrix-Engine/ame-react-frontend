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

export const createApi = async (api: iApiType): Promise<void> => {
    try {
        const response = await axios.post(`${aiMatrixAPI.defaults.baseURL}oai/api/`, api);
        console.log('Api added successfully.', response.data);
    } catch (error) {
        console.error('Failed to add api', error);
    }
}

export const fetchApiById = async (id: number): Promise<iApiType | null> => {
    try {
        const response = await axios.get(`${aiMatrixAPI.defaults.baseURL}oai/api/${id}`);
        const formattedApis: iApiType = response.data;
        return formattedApis;
    } catch (error) {
        console.error('Failed to fetch category', error);
        return null; // Return empty array on error
    }
}

export const updateApiById = async (id: number, api: iApiType): Promise<void> => {
    try {
        const response = await axios.put(`${aiMatrixAPI.defaults.baseURL}oai/api/${id}/`, api);
        console.log('Api updated successfully.', response.data)
    } catch (err) {
        console.error(`Failed to update api by id`, err);
    }
}

export const partialUpdateApiById = async (id: number, api: any): Promise<void> => {
    try {
        const response = await axios.patch(`${aiMatrixAPI.defaults.baseURL}oai/api/${id}/`, api);
        console.log('Api updated successfully.', response.data)
    } catch (err) {
        console.error(`Failed to update api by id`, err);
    }
}

export const deleteApiById = async (id: number): Promise<void> => {
    try {
        const response = await axios.delete(`${aiMatrixAPI.defaults.baseURL}oai/api/${id}`);
        console.log('Api deleted successfully.', response.data)
    } catch (err) {
        console.error(`Failed to delete api by id`, err);
    }
}