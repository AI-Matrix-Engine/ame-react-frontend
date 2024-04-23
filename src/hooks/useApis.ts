import { useState, useEffect } from "react";
import { iApiType } from "@/utils/types";
import { fetchApis, createApi } from "@/services/apiService";
import { eApiProvider, eApiPurpose } from "@/utils/types";

export const useApis = () => {
    const [apis, setApis] = useState<iApiType[]>([]);

    const getApis = async () => {
        const fetchedApis = await fetchApis();
        setApis(fetchedApis);
    }

    const api: iApiType = {
        name: "asdf",
        version: "version",
        is_active: true,
        link_to_documentation: "https://api.com",
        value: 'asdf',
        provider: eApiProvider.CODEBERT,
        purpose: eApiPurpose.BROAD_AI_TASKS,
        chat_completion_requests: [2],
        image_task_Requests: [1],
        audio_speech_requests: [1],
        audio_transcription_requests: [1],
        audio_translation_requests: [1],
        endpoints: [1],
        response: [1],
        apiCosts: [2],
        errors: [1]
    }

    const handleAPI = async() => {
        await createApi(api)
    }

    useEffect(() => {
        getApis();

        handleAPI();
    }, [])

    return {
        apis,
        setApis
    };
};