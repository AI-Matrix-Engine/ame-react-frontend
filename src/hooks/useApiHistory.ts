import { useState, useEffect } from "react";
import { iApiCallHistoryType, iApiCallHistoryInputType } from "@/utils/types";
import {
  fetchTotalData,
  createData,
  fetchOneDataById,
  updateDataById,
  deleteDataById,
} from "@/services/integrateService";
import { subAiAPI } from "@/services/api";

export const useApiHistory = () => {
  const [histories, FetchHistories] = useState<iApiCallHistoryType[]>([]);
  const [history, FetchHistory] = useState<iApiCallHistoryType | null>(null);

  const getApiHistories = async () => {
    const fetchedHistories: iApiCallHistoryType[] = await fetchTotalData(
      subAiAPI.apiCallHistory
    );
    FetchHistories(fetchedHistories);
  };

  const reqData: iApiCallHistoryInputType = {
    full_request: {},
    full_response: {},
    additional_details: {},
    response_quality: 214836323,
    response_quality_feedback: "string111",
    use_for_training: true,
    api: null,
    ai_model: null,
    recipe_category: null,
    prompt_recipe: null,
  };

  const handleCreateHistory = async (historyData: iApiCallHistoryInputType) => {
    await createData(subAiAPI.apiCallHistory, historyData);
  };

  const handleFetchHistoryById = async (id: number) => {
    const result: iApiCallHistoryType | null = await fetchOneDataById(
      subAiAPI.apiCallHistory,
      id
    );
    FetchHistory(result);
  };

  const handleDeleteHistoryById = async (id: number) => {
    await deleteDataById(subAiAPI.apiCallHistory, id);
  };

  const handleUpdateHistoryById = async (
    id: number,
    historyData: iApiCallHistoryInputType
  ) => {
    await updateDataById(subAiAPI.apiCallHistory, id, historyData);
  };

  useEffect(() => {
    getApiHistories();

    handleCreateHistory(reqData);
  }, []);

  return {
    histories,
    FetchHistories,
    handleCreateHistory,
    handleFetchHistoryById,
    handleUpdateHistoryById,
    handleDeleteHistoryById,
  };
};
