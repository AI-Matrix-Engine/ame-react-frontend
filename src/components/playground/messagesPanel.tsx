"use client";
import React, { useEffect, useState } from "react";
import Prompt from "@/components/playground/prompt";
import { LuPlusCircle } from "react-icons/lu";
import { useAuth } from "@/context/AuthContext";

interface iPData {
  role: string;
  text: string;
  isExpand: boolean;
  isFocus: boolean;
}

let selectedStr: string = '';

const MessagePanel = ({ width, index, isResizable, onMouseDown }: any) => {
  const { promptData, setPromptData, version, contextData, setContextData, flag1, flag2 } =
    useAuth();
  const [isExpand, setIsExpand] = React.useState(-1);
  const [componentMounted, setComponentMounted] = useState<boolean>(false);

  useEffect(() => {
    setComponentMounted(true);
  }, []);

  useEffect(() => {
    if (componentMounted) {
      handleHighlight();
    }
  }, [flag1]);

  useEffect(() => {
    if (componentMounted) {
      handleHighlightOpt();
    }
  }, [flag2]);

  // useEffect(() => {
  //   if (componentMounted) {
  //     handleHighlightoOpt();
  //   }
  // }, [flag2]);

  const handleHighlight = () => {
    const currentVariableData = contextData[version - 1].variablesData;
    const pData = contextData[version - 1].promptData;
    let variableName: string = "VARIABLE_";
    if (currentVariableData.length < 10)
      variableName += `${version}00${currentVariableData.length + 1}`;
    else if (currentVariableData.length < 100)
      variableName += `0${currentVariableData.length + 1}`;
    else variableName += `${currentVariableData.length + 1}`;

    const expandIndex = pData
      .map((prop: any, index: number) => {
        if (prop.isFocus) return index;
      })
      .filter((e: any) => e !== undefined)[0];
    const tempText = pData[expandIndex].text;
    let temp = tempText.replace(
      selectedStr,
      `<span style="color: blue; font-style: italic; font-weight: bold;">{${variableName}}</span>`
    );

    const updateData = pData.map((data: any, i: number) => {
      if (i === expandIndex) data.text = temp;
      return data;
    });

    const newVariableData = [
      ...currentVariableData,
      {
        flag: "placeholderPattern",
        messageIndex: expandIndex,
        title: variableName,
        text: `<span style="color: blue; font-style: italic; font-weight: bold;">${selectedStr}</span>`,
        advanced: {
          elementType: 'TextArea',
          dValue: "",
          helpText: '',
          databaseField: {
            fieldID: '928dt1f04b8b9c73488be089',
            displayName: ''
          },
        },
      },
    ];

    const updateContextData = contextData.map((item: any, key: number) => {
      if (key == version - 1) {
        item.promptData = updateData;
        if (selectedStr !== "") {
          item.variablesData = newVariableData;
        }
      }
      return item;
    });

    setContextData(updateContextData);
    // console.log(contextData);

    // if (selectedStr !== "") setVariableData(newVariableData);
    // selectedStr = "";
  };

  const handleHighlightOpt = () => {
    const currentVariableData = contextData[version - 1].variablesData;
    const pData = contextData[version - 1].promptData;
    let variableName: string = "VARIABLE_";
    if (currentVariableData.length < 10)
      variableName += `${version}00${currentVariableData.length + 1}`;
    else if (currentVariableData.length < 100)
      variableName += `0${currentVariableData.length + 1}`;
    else variableName += `${currentVariableData.length + 1}`;

    const expandIndex = pData
      .map((prop: any, index: number) => {
        if (prop.isFocus) return index;
      })
      .filter((e: any) => e !== undefined)[0];
    const tempText = pData[expandIndex].text;
    let temp = tempText.replace(
      selectedStr,
      `<span style="color: orange; font-style: italic; font-weight: bold;">[${variableName}]</span>`
    );

    const updateData = pData.map((data: any, i: number) => {
      if (i === expandIndex) data.text = temp;
      return data;
    });

    const newVariableData = [
      ...currentVariableData,
      {
        flag: "sectionPattern",
        messageIndex: expandIndex,
        title: variableName,
        text: `<span style="color: orange; font-style: italic; font-weight: bold;">${selectedStr}</span>`,
        advanced: {
          elementType: 'TextArea',
          dValue: "",
          helpText: '',
          databaseField: {
            fieldID: '928dt1f04b8b9c73488be089',
            displayName: ''
          },
        },
      },
    ];

    const updateContextData = contextData.map((item: any, key: number) => {
      if (key == version - 1) {
        item.promptData = updateData;
        if (selectedStr !== "") {
          item.variablesData = newVariableData;
        }
      }
      return item;
    });

    setContextData(updateContextData);
  };

  const handleExpand = (index: number) => {
    if (index === isExpand) setIsExpand(-1);
    else setIsExpand(index);

    const currentPromptData = contextData[version - 1].promptData;
    const updatePromptData = currentPromptData.map(
      (prompt: any, key: number) => {
        if (key === index) prompt.isExpand = !prompt.isExpand;
        return prompt;
      }
    );

    const updateContextData = contextData.map((item:any, key:number) => {
      if(key == (version-1)) {
        item.promptData = updatePromptData;
      }
      return item;
    })

    setContextData(updateContextData);
  };

  const addPrompt = () => {
    const currentPromptData = contextData[version - 1].promptData;
    const newAssistPrompt: iPData = {
      isFocus: true,
      isExpand: true,
      role: "assistant",
      text: "",
    };
    const newUserPrompt: iPData = {
      isFocus: true,
      isExpand: true,
      role: "user",
      text: "",
    };
    let updatedPromptData = [];
    if (currentPromptData[currentPromptData.length - 1].role === "user") {
      updatedPromptData = [...currentPromptData, newAssistPrompt];
    } else {
      updatedPromptData = [...currentPromptData, newUserPrompt];
    }

    const updateContextData = contextData.map((item:any, key:number) => {
      if(key == (version-1)) {
        item.promptData = updatedPromptData;
      }
      return item;
    })
    setContextData(updateContextData);
  };

  const handleFocus = (index: number) => {
    const currentPromptData = contextData[version - 1].promptData;
    const updatePromptData = currentPromptData.map(
      (prompt: any, key: number) => {
        if (key === index) prompt.isFocus = true;
        else prompt.isFocus = false;

        return prompt;
      }
    );

    const updateContextData = contextData.map((item:any, key:number) => {
      if(key == (version-1)) {
        item.promptData = updatePromptData;
      }
      return item;
    })
    setContextData(updateContextData);
  };

  const handleSelectedStr = (str:string) => {
    selectedStr = str;
  }

  return (
    <div
      className={`overflow-y-auto relative pt-[6px] h-full px-[0.37em]`}
      style={{
        width: `${width}%`,
        borderLeft: index === 1 ? "1px solid #3F3F46" : "",
      }}
    >
      {contextData[version - 1].promptData.map((prompt: any, index: number) => (
        <Prompt
          isExpand={prompt.isExpand}
          role={prompt.role}
          index={index}
          key={index}
          handleFocus={handleFocus}
          setIsExpand={handleExpand}
          setPData={setPromptData}
          setSelectedStr={handleSelectedStr}
          pData={promptData}
          text={prompt.text}
        />
      ))}
      <div
        className="flex items-center cursor-pointer p-2 rounded-md [transition:all_.3s_ease-in-out] hover:border-[#0e8157] hover:bg-[#dcdce0] dark:hover:bg-[#2b2b2b]"
        onClick={() => addPrompt()}
      >
        <LuPlusCircle className="text-black text-[16px] mr-[8.35px] dark:text-[#d9d9e3]" />
        <span className="text-[14px] font-semibold text-black dark:text-[#d9d9e3]">
          Add Messages
        </span>
      </div>

      {isResizable && (
        <div
          style={{
            position: "absolute",
            right: 0,
            top: 0,
            bottom: 0,
            width: "5px",
            cursor: "col-resize",
          }}
          onMouseDown={(e) => onMouseDown(index, e)}
        />
      )}
    </div>
  );
};

export default MessagePanel;
