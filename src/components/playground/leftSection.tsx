"use client";

import * as React from "react";
import { Button } from "@/components/_shared/Button";
import { LeftModel } from "@/components/playground/model";

const modelName = ["PLACES TO VISIT", "PLACES TO VISIT", "PLACES TO VISIT"];

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
    <div className={`container-height flex overflow-y-auto`}>
      {isExpand && (
        <div className="w-full h-full flex flex-col items-center border-zinc-200 pl-[9.92px] pr-[0.37em]">
          <Button className="w-full rounded">Convert to Variable</Button>
          <Button className="w-full rounded mt-[10px]">
            Make Section Optional
          </Button>
          <div className="w-full mt-[10px]">
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