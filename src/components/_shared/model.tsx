"use client";

import * as React from "react";
import { Dropdown, Input, Label, Switch } from "@/components/_shared";
import {
  MdOutlineKeyboardArrowRight,
  MdOutlineKeyboardArrowDown,
} from "react-icons/md";
import RangeSlider from "@/components/_shared/rangeSlider";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";

interface iModel {
  model: any;
  isOpen: boolean;
  isAdvancedOpen: boolean;
  modelId: number;
  setIsOpenModel: Function;
  setIsOpenAdvanced: Function;
  isModelSetting: boolean;
}

export const Model = ({
  model,
  isOpen,
  modelId,
  isAdvancedOpen,
  setIsOpenAdvanced,
  setIsOpenModel,
  isModelSetting
}: iModel) => {
  const { contextData, setContextData, version } = useAuth();
  const [responseData, setResponseData] = React.useState<any>();
  const [providerValue, setProviderValue] = React.useState<string | null>();
  const [modelValue, setModelValue] = React.useState<string | null>();
  const [optValue, setOptValue] = React.useState<any>("");

  const [providerData, setProviderData] = React.useState<any>();
  const [modelData, setModelData] = React.useState<any>();
  const [optData, setOptData] = React.useState<any>();

  const [modelFlag, setModelFlag] = React.useState(true);
  const [optFlag, setOptFlag] = React.useState(false);

  const removeDuplicates = (arr: any) => {
    const uniqueLabels: any = {};
    const result: any = [];

    arr.forEach((item: any) => {
      if (!uniqueLabels[item.label]) {
        result.push(item);
        uniqueLabels[item.label] = true;
      }
    });
    result.unshift({ value: null, label: "Select Provider" });

    return result;
  };

  React.useEffect(() => {
    const getModelData = async () => {
      const totalData = await axios.get(
        "https://aimatrix-api.vercel.app/api/aimodels"
      );
      const responseData = totalData.data;
      setResponseData(responseData);
      if (responseData) {
        let providerList = responseData.map((e: any, index: number) => {
          let pair: any = { value: "", label: "" };
          if (e.api.provider === undefined) {
            pair = { value: e.provider, label: e.provider };
          } else pair = { value: e.api.provider, label: e.api.provider };

          return pair;
        });
        setProviderData(removeDuplicates(providerList));
        if (model.api.provider === "") {
          setProviderValue(null);
        } else {
          setProviderValue(model.api.provider);
          let tempModelList = responseData
            .map((emp: any, index: number) => {
              if (emp.api.provider === model.api.provider)
                return { value: emp.model, label: emp.model };
            })
            .filter((ev: any) => ev !== undefined);
          setModelData(tempModelList);
          setModelFlag(false);
          setOptFlag(true);
          setModelValue(model.model);

          let tempOptList = responseData
            .map((emp: any, index: number) => {
              if (emp.api.provider === model.api.provider) return emp.controls;
            })
            .filter((ee: any) => ee !== undefined);
          setOptData(tempOptList[0]);
        }
      }
    };

    getModelData();
  }, []);

  const handleProvider = (e: any) => {
    setProviderValue(e);
    const currentResponseData = contextData[version-1].responseData;
    const updateResponseData = currentResponseData.map((item:any, index:number) => {
      if(modelId === index) {
        item.api.provider = e;
        item.name = "";
        if(e == null) item.model = '';
      }
      return item;
    })

    const updateContextData = contextData.map((item: any, key: number) => {
      if (key === version - 1) {
        item.responseData = updateResponseData;
      }
      return item;
    });
    setContextData(updateContextData);

    if (e !== null) {
      setModelFlag(false);
      setModelValue(null);
      setOptFlag(false);
    } else {
      setModelFlag(true);
      setOptFlag(false);
      setModelValue(null);
    }

    let tempModelList = responseData
      .map((emp: any, index: number) => {
        if (emp.api.provider === e)
          return { value: emp.model, label: emp.model };
      })
      .filter((ev: any) => ev !== undefined);

    tempModelList.unshift({ value: null, label: "Select Model" })
    setModelData(tempModelList);
  };

  const handleModel = (e: any) => {
    setModelValue(e);
    var modelName = "";
    if (e !== null) {
      setOptFlag(true);
      modelName = responseData.filter((item: any) => item?.model == e)[0].name;
    }
    else setOptFlag(false);

    let tempOptList = responseData
      .map((emp: any) => {
        if (emp.api.provider === providerValue) return emp.controls;
      })
      .filter((ee: any) => ee !== undefined);
    setOptData(tempOptList[0]);


    const currentResponseData = contextData[version-1].responseData;
    const updateResponseData = currentResponseData.map((item:any, index:number) => {
      if(modelId === index) {
        item.model = e;
        item.controls = tempOptList[0];
        if(e !== null) item.name = modelName;
        else item.name = "";
      }
      return item;
    })

    const updateContextData = contextData.map((item: any, key: number) => {
      if (key === version - 1) {
        item.responseData = updateResponseData;
      }
      return item;
    });
    setContextData(updateContextData);

    // tempModelList.unshift({ value: null, label: "Select" });
    // console.log(tempModelList);
    // setModelData(tempModelList);

    // let tempOptList = responseData
    //   .map((emp: any, index: number) => {
    //     if (emp.api.provider === e)
    //       return { value: emp.model, label: emp.model };
    //   })
    //   .filter((ev) => ev !== undefined);
  };

  return (
    <div className="w-full pt-3">
      <div
        className="text-[#000] text-[14px] font-medium mb-1 cursor-pointer [transition:all_.3s_ease-in-out] dark:text-white"
        onClick={() => setIsOpenModel(modelId)}
      >
        <p className="flex items-center" title={model.name !== "" && model.name}>
          {model.name !== "" ? (model.name.length > 20 ? model.name.substr(0, 20)+"..." : model.name) : `MODEL ${modelId + 1}`}
          {isModelSetting ? (
            <MdOutlineKeyboardArrowDown className="ml-1" />
          ) : (
            <MdOutlineKeyboardArrowRight className="ml-1" />
          )}
        </p>
      </div>
      {isModelSetting && (
        <>
          <div className="w-full">
            <div>
              <Dropdown
                options={providerData}
                onClick={handleProvider}
                placeHolder="Select Provider"
                className="text-[12px] rounded-xl"
                value={providerValue}
              />
              <div className="h-[10px]" />
              <Dropdown
                options={modelData}
                disabled={modelFlag}
                value={modelValue}
                onClick={handleModel}
                placeHolder="Select Model"
                className="text-[12px] rounded-xl"
              />
            </div>
          </div>
          <div className="mt-4 w-full">
            <p
              className="flex items-center text-[#000] text-[12px] mb-1 cursor-pointer [transition:all_.3s_ease-in-out] dark:text-white"
              onClick={() => setIsOpenAdvanced()}
            >
              ADVANCED OPTION
              {isAdvancedOpen && optFlag ? (
                <MdOutlineKeyboardArrowDown className="ml-1" />
              ) : (
                <MdOutlineKeyboardArrowRight className="ml-1" />
              )}
            </p>
            {isAdvancedOpen && optFlag && (
              <div className="mt-[15px]">
                {optData &&
                  optData.map((opt: any, index: number) => {
                    if (opt.componentType === "slider") {
                      return (
                        <RangeSlider
                          key={`${index}sliderindex`}
                          helpText={opt.helpText}
                          min={opt.min}                                                                                                                                                                                                                                    
                          max={opt.max}
                          step={opt.step}
                          label={opt.label}
                          defaultValue={opt.value}
                        />
                      );
                    }
                    if (opt.componentType === "input") {
                      return (
                        <div className="mb-[15px]">
                          <Label
                            className="text-[12px] font-normal dark:text-white"
                            key={`${index}labelindex`}
                          >
                            {opt.label}
                          </Label>
                          <Input key={`${index}inputindex`} />
                        </div>
                      );
                    }
                    if (opt.componentType === "switch") {
                      return (
                        <div className="flex flex-col mb-[15px]">
                          <Label
                            className="text-[12px] font-normal dark:text-white"
                            key={`${index}label1index`}
                          >
                            {opt.label}
                          </Label>
                          <Switch value={opt.value} />
                        </div>
                      );
                    }
                    if (opt.componentType === "switchGroup") {
                      return (
                        <div>
                          <Label
                            className="text-[14px] dark:text-white"
                            key={`${index}label1index`}
                          >
                            {opt.label}
                          </Label>
                          <div className="">
                            {opt.choices.map((item: any, index: number) => (
                              <div
                                className="flex flex-col mb-[5px]"
                                key={`${index}switcGP`}
                              >
                                <Label
                                  className="text-[12px] font-normal mr-2 dark:text-white"
                                  key={`${index}label2index`}
                                >
                                  {item.label}
                                </Label>
                                <Switch value={item.value} />
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    }
                  })}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};
