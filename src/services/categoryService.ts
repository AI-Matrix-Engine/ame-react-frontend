// src/services/categoryService.ts
import axios from 'axios';
import { iSelectType } from "@/utils/types";
import { aiMatrixAPI } from './api';

export const fetchCategories = async (): Promise<iSelectType[]> => {
    try {
        const response = await axios.get(`${aiMatrixAPI.defaults.baseURL}oai/allcategory/`);
        const formattedCategories: iSelectType[] = response.data.reduce((acc: iSelectType[], item: any) => {
            if (item.parent_category === null) {
                acc.push({
                    label: item.name,
                    value: item.id.toString(),
                    subCategories: []
                });
            } else {
                const parentIndex = acc.findIndex(cat => cat.value === item.parent_category.toString());
                if (parentIndex > -1) {
                    const parentCategory = acc[parentIndex];
                    if (parentCategory.subCategories) {
                        parentCategory.subCategories.push({
                            label: item.name,
                            value: item.id.toString()
                        });
                    } else {
                        parentCategory.subCategories = [{
                            label: item.name,
                            value: item.id.toString()
                        }];
                    }
                }
            }
            return acc;
        }, []);
        return formattedCategories;
    } catch (error) {
        console.error('Failed to fetch categories', error);
        return []; // Return empty array on error
    }
};

export const addCategory = async (category: { name: string, parent_category: number | null }): Promise<void> => {
    try {
        const response = await axios.post(`${aiMatrixAPI.defaults.baseURL}oai/allcategory/`, category);
        console.log('Category added successfully:', response.data);
    } catch (error) {
        console.error('Failed to add category', error);
    }
};

export const fetchCategoryById = async (id: number): Promise<iSelectType | null> => {
    try {
        const categories: iSelectType[] = await fetchCategories();

        const result = categories.find((item: iSelectType) => item.value === id.toString());

        return result || null;
    } catch (err) {
        console.error(`Failed to fetch category by id`, err);
        
        return null;
    }
};

export const updateCategoryById = async (id: number, category: { name: string, parent_category: number | null }): Promise<void> => {
    try {
        const response = await axios.put(`${aiMatrixAPI.defaults.baseURL}oai/allcategory/${id}/`, category);
        console.log('Category updated successfully.', response.data)
    } catch (err) {
        console.error(`Failed to update category by id`, err);
    }
}

export const patchCategoryById = async (id: number, category: { name: string, parent_category: number | null }): Promise<void> => {
    try {
        const response = await axios.patch(`${aiMatrixAPI.defaults.baseURL}oai/allcategory/${id}/`, category);
        console.log('Category patched successfully.', response.data)
    } catch (err) {
        console.error(`Failed to patch category by id`, err);
    }
}

export const deleteCategoryById = async (id: number): Promise<void> => {
    try {
        const response = await axios.delete(`${aiMatrixAPI.defaults.baseURL}oai/allcategory/${id}/`);
        console.log('Category deleted successfully.', response.data)
    } catch (err) {
        console.error(`Failed to delete category by id`, err);
    }
}