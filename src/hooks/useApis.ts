import { useState, useEffect } from "react";
import { iApiType } from "@/utils/types";
import { fetchApis, createApi } from "@/services/apiService";

export const useApis = () => {
    const [apis, setApis] = useState<iApiType[]>([]);

    const getApis = async () => {
        const fetchedApis = await fetchApis();
        setApis(fetchedApis);
    }

    const handleAPI = async (api: iApiType) => {
        await createApi(api)
    }

    useEffect(() => {
        getApis();
    }, [])

    return {
        apis,
        setApis,
        handleAPI
    };
};