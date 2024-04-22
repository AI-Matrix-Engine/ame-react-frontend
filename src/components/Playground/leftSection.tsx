"use client";

import * as React from "react";
import { Button } from "@/components/UI/button";
import { LeftModel } from "@/components/Playground/model";

const modelName = [
  "PLACES TO VISIT",
  "PLACES TO VISIT",
  "PLACES TO VISIT",
];

interface iModelOpenFlag {
  model: number;
  advanced: boolean;
}

const LeftSection = () => {
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
    setIsOpenModel((prev) => ({ ...prev, advanced: !prev.advanced }));
  };
  return (
    <div
      className={`container-height flex overflow-y-auto`}
    >
      {isExpand && (
        <div className="w-full h-full flex flex-col items-center border-zinc-200 pl-[9.92px] pr-[0.37em]">
          <div className="">
            <Button className="w-full mb-[17.19px] rounded">
              Convert to Variable
            </Button>
            <Button className="w-full rounded">
              Make Section Optional
            </Button>
          </div>
          <div className="w-full mt-[20px]">
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
        </div>
      )}
    </div>
  );
};

export default LeftSection;