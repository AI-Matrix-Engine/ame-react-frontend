import { useState, useEffect } from "react";
import { iApiType } from "@/utils/types";
import {
  fetchTotalData,
  createData,
  fetchOneDataById,
  updateDataById,
  deleteDataById,
} from "@/services/integrateService";
import { subAiAPI } from "@/services/api";

export const useApis = () => {
  const [apis, setApis] = useState<iApiType[]>([]);
  const [api, setApi] = useState<iApiType | null>(null);

  const getApis = async () => {
    const fetchedApis: iApiType[] = await fetchTotalData(subAiAPI.api);
    setApis(fetchedApis);
  };

  const handleCreateAPI = async (apiData: iApiType) => {
    await createData(subAiAPI.api, apiData);
  };

  const handleFetchApiById = async (id: number) => {
    const result: iApiType | null = await fetchOneDataById(subAiAPI.api, id);
    setApi(result);
  };

  const handleDeleteApiById = async (id: number) => {
    await deleteDataById(subAiAPI.api, id);
  };

  const handleUpdateApiById = async (id: number, apiData: iApiType) => {
    await updateDataById(subAiAPI.api, id, apiData);
  };

  useEffect(() => {
    getApis();
  }, []);

  return {
    apis,
    setApis,
    handleCreateAPI,
    handleFetchApiById,
    handleUpdateApiById,
    handleDeleteApiById,
  };
};
