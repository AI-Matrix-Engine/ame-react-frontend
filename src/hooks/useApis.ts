import { useState, useEffect } from "react";
import { iApiType, eApiProvider, eApiPurpose } from "@/utils/types";
import { fetchApis, createApi, fetchApiById, updateApiById, deleteApiById } from "@/services/apiService";

export const useApis = () => {
    const [apis, setApis] = useState<iApiType[]>([]);
    const [api, setApi] = useState<iApiType | null>(null);

    const getApis = async () => {
        const fetchedApis = await fetchApis();
        setApis(fetchedApis);
    }

    const handleCreateAPI = async (api: iApiType) => {
        await createApi(api)
    }

    const handleFetchApiById = async (id: number) => {
        const result = await fetchApiById(id);
        setApi(result);
    }

    const handleDeleteApiById = async (id: number) => {
        await deleteApiById(id);
    }

    const handleUpdateApiById = async (id: number, api: iApiType) => {
        await updateApiById(id, api)
    }

    useEffect(() => {
        getApis();
    }, [])

    return {
        apis,
        setApis,
        handleCreateAPI,
        handleFetchApiById,
        handleUpdateApiById,
        handleDeleteApiById
    };
};