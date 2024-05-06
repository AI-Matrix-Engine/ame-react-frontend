"use client";

import * as React from "react";
import { Button } from "@/components/_shared/Button";
import { LeftModel } from "@/components/playground/model";
import { useAuth } from "@/context/AuthContext";

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
  const { flag1, flag2, setFlag1, setFlag2, setContextData, version, contextData } =
    useAuth();

  React.useEffect(() => {
    setIsOpenModel((prev) => ({
      ...prev,
      model: contextData[version-1].variablesData.length - 1,
      advanced: true,
    }));
  }, [contextData]);

  const handleModelOpen = (modelID: number) => {
    if (modelID === isOpenModel.model)
      setIsOpenModel({ model: -1, advanced: false });
    else setIsOpenModel({ model: modelID, advanced: false });
  };
  const handleAdvancedOpen = () => {
    setIsOpenModel((prev) => ({ ...prev, advanced: !prev.advanced }));
  };

  const changeTitle = (id: number, text: string) => {
    const currentVariableData = contextData[version - 1].variablesData;
    
    const updateVariableData = currentVariableData.map((item:any, index:number) => {
      if(index === id) item.title = text.replace(/[^a-zA-Z0-9]/g, '_');
      return item;
    })
    const updateContextData = contextData.map((item: any, key: number) => {
      if (key == version - 1) {
        item.variablesData = updateVariableData;
      }
      return item;
    });

    setContextData(updateContextData);
  };

  return (
    <div className={`container-height flex overflow-y-auto`}>
      {isExpand && (
        <div className="w-full h-full flex flex-col items-center border-zinc-200 pl-[9.92px] pr-[0.37em]">
          <Button
            className="w-full text-[#3478F7] dark:text-[#3478F7]"
            size="sm"
            onClick={() => setFlag1(!flag1)}
          >
            Convert to Variable
          </Button>
          <Button
            className="w-full mt-[10px] text-[#B4B8FF] dark:text-[#B4B8FF]"
            size="sm"
            onClick={() => setFlag2(!flag2)}
          >
            Make Section Optional
          </Button>
          <div className="w-full mt-[10px]">
            {contextData[version-1].variablesData.map((vdata: any, key: number) => (
              <LeftModel
                modelName={vdata.title}
                messageIndex={vdata.messageIndex}
                text={vdata.text}
                key={key}
                modelId={key}
                changeTitle={changeTitle}
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
