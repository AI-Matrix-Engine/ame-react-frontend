"use client";

import * as React from "react";
import { Select } from "@/components/UI/select";
import { Dropdown, Input, Label } from "@/components/UI";
import {
  MdOutlineKeyboardArrowRight,
  MdOutlineKeyboardArrowDown,
} from "react-icons/md";
import RangeSlider from "@/components/UI/rangeSlider";
import { responseData } from "../Data";

interface iModel {
  model: any;
  isOpen: boolean;
  isAdvancedOpen: boolean;
  modelId: number;
  setIsOpenModel: Function;
  setIsOpenAdvanced: Function;
}

export const Model = ({
  model,
  isOpen,
  modelId,
  isAdvancedOpen,
  setIsOpenAdvanced,
  setIsOpenModel,
}: iModel) => {
  const [providerValue, setProviderValue] = React.useState<string | null>();
  const [modelValue, setModelValue] = React.useState<string | null>();
  const [optValue, setOptValue] = React.useState<any>("");

  const [providerData, setProviderData] = React.useState<any>([{ value: null, label: "Select Provider" }]);
  const [modelData, setModelData] = React.useState<any>([
    { value: null, label: "Select Model" },
  ]);
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

    return result;
  };

  React.useEffect(() => {
    let providerList: any = [{ value: null, label: "Select Provider" }];
    providerList = providerList.concat(
      responseData.map((e: any, index: number) => {
        return { value: e.api.provider, label: e.api.provider };
      })
    );
    setProviderData(removeDuplicates(providerList));
    if (model.api.provider == "") {
      setProviderValue(null);
    } else {
      setProviderValue(model.api.provider);
      let tempModelList: any = [{ value: null, label: "Select Model" }];
      tempModelList = tempModelList.concat(
        responseData
          .map((emp: any, index: number) => {
            if (emp.api.provider == model.api.provider)
              return { value: emp.model, label: emp.model };
          })
          .filter((ev) => ev != undefined)
      );
      setModelData(tempModelList);
      setModelFlag(false);
      setOptFlag(true);
      setModelValue(model.model);

      let tempOptList = responseData
        .map((emp: any, index: number) => {
          if (emp.api.provider == model.api.provider) return emp.controls;
        })
        .filter((ee) => ee != undefined);
      setOptData(tempOptList[0]);
    }
  }, []);

  const handleProvider = (e: any) => {
    setProviderValue(e);

    if (e != null) {
      setModelFlag(false);
      setModelValue(null);
      setOptFlag(false);
    } else {
      setModelFlag(true);
      setOptFlag(false);
      setModelValue(null);
    }

    let tempModelList: any = [{ value: null, label: "Select Model" }];
    tempModelList = tempModelList.concat(
      responseData
        .map((emp: any, index: number) => {
          if (emp.api.provider == e)
            return { value: emp.model, label: emp.model };
        })
        .filter((ev) => ev != undefined)
    );

    setModelData(tempModelList);
  };

  const handleModel = (e: any) => {
    setModelValue(e);

    if (e != null) setOptFlag(true);
    else setOptFlag(false);

    let tempOptList = responseData
      .map((emp: any, index: number) => {
        if (emp.api.provider == providerValue) return emp.controls;
      })
      .filter((ee) => ee != undefined);
    setOptData(tempOptList[0]);

    // tempModelList.unshift({ value: null, label: "Select" });
    // console.log(tempModelList);
    // setModelData(tempModelList);

    // let tempOptList = responseData
    //   .map((emp: any, index: number) => {
    //     if (emp.api.provider == e)
    //       return { value: emp.model, label: emp.model };
    //   })
    //   .filter((ev) => ev != undefined);
  };

  return (
    <div className="w-full pb-1 pt-4">
      <p
        className="flex items-center text-[#000] text-[14px] font-medium mb-1 cursor-pointer [transition:all_.3s_ease-in-out] dark:text-white"
        onClick={() => setIsOpenModel(modelId)}
      >
        {`MODEL ${modelId + 1}`}
        {isOpen ? (
          <MdOutlineKeyboardArrowDown className="ml-1" />
        ) : (
          <MdOutlineKeyboardArrowRight className="ml-1" />
        )}
      </p>
      {isOpen && (
        <>
          <div className="w-full">
            <div className="">
              <Dropdown
                options={providerData}
                onClick={handleProvider}
                className="text-[12px] rounded-xl"
                value={providerValue}
              />
              <div className="h-[10px]" />
              <Dropdown
                options={modelData}
                disabled={modelFlag}
                value={modelValue}
                onClick={handleModel}
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
                {optData.map((opt: any, index: number) => {
                  if (opt.componentType == "slider") {
                    return (
                      <RangeSlider
                        key={index}
                        min={opt.min}
                        max={opt.max}
                        step={opt.step}
                        label={opt.label}
                        defaultValue={opt.value}
                      />
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

{
  /* <RangeSlider
  min={opt.min}
  max={opt.max}
  step={opt.step}
  label={opt.label}
  defaultValue={opt.value}
/>; */
}
