"use client";

import * as React from "react";
import { Button } from "@/components/UI/button";
import { LeftModel } from "@/components/Playground/model";
import { TbMinusVertical } from "react-icons/tb";
import { GoChevronRight } from "react-icons/go";

const modelName = [
  "PLACES TO VISIT",
  "PLACES TO VISIT",
  "PLACES TO VISIT",
  "PLACES TO VISIT",
  "PLACES TO VISIT",
  "PLACES TO VISIT",
  "PLACES TO VISIT",
  "PLACES TO VISIT",
];

interface iModelOpenFlag {
  model: number;
  advanced: boolean;
}

export const LeftSidebar = () => {
  const [isOpenModel, setIsOpenModel] = React.useState<iModelOpenFlag>({
    model: -1,
    advanced: false,
  });
  const [isExpand, setIsExpand] = React.useState<boolean>(true);

  const handleModelOpen = (modelID: number) => {
    if (modelID === isOpenModel.model)
      setIsOpenModel({ model: -1, advanced: false });
    else setIsOpenModel({ model: modelID, advanced: false });
  };
  const handleAdvancedOpen = () => {
    setIsOpenModel(prev => ({ ...prev, advanced: !prev.advanced }));
  };
  return (
    <div
      className={`${
        isExpand ? "w-[250px] min-w-[250px]" : "w-[23px] border-r-[1px] border-zinc-200"
      } pt-3 container-height flex`}
    >
      {isExpand && (
        <div className="w-full h-full flex flex-col items-center px-1 overflow-y-scroll border-r-[1px] border-zinc-200">
          <Button className="w-full mb-1 bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded">Convert to Variable</Button>
          <Button className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Make Section Optional</Button>
          {modelName.map((model: string, key: number) => (
            <LeftModel
              modelName={model}
              key={key}
              modelId={key}
              isAdvancedOpen={isOpenModel.advanced}
              isOpen={isOpenModel.model === key ? true : false}
              setIsOpenModel={handleModelOpen}
              setIsOpenAdvanced={handleAdvancedOpen}
            />
          ))}
        </div>
      )}
      {/* <div className="h-full flex items-center w-[23px]">
        {isExpand ? (
          <TbMinusVertical
            color="#fff"
            className="cursor-pointer text-[20px]"
            onClick={() => setIsExpand(!isExpand)}
          />
        ) : (
          <GoChevronRight
            color="#fff"
            className="cursor-pointer text-[20px]"
            onClick={() => setIsExpand(!isExpand)}
          />
        )}
      </div> */}
    </div>
  );
};
