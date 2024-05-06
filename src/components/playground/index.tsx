"use client";
import React, { useEffect, useState } from "react";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import SectionSplitter from "@/components/playground/spliter";
import { GoPlusCircle } from "react-icons/go";
import { FaBars } from "react-icons/fa6";

import { ModelSettingsDrawer } from "@/components/home/modelSettingsDrawer";

import { Button, Dropdown, Input } from "../_shared";
import { MdOutlineLightMode, MdOutlineNightlight } from "react-icons/md";
import { HiDotsVertical } from "react-icons/hi";

import VariablesPanel from "@/components/playground/variablesPanel";
import ResponsePanel from "@/components/playground/responsePanel";
import MessagesPanel from "@/components/playground/messagesPanel";
import { useAuth } from "@/context/AuthContext";

const initialData: any = {
  promptData: [
    {
      isFocus: false,
      isExpand: false,
      role: "system",
      text: ``,
    },
    {
      isFocus: false,
      isExpand: false,
      role: `user`,
      text: ``,
    },
  ],
  variablesData: [],
  OptionalText: [],
  responseData: [
    {
      isOpen: false,
      isMoved: false,
      _id: "6616e8d7c4dd135b3e82fddb",
      model: "gpt-4-turbo",
      name: "GPT-4 Turbo Latest 2024-04-09",
      class: "gpt-4",
      text: "**This is bold text.** *This is italic text.*",
      limitations: {
        context_window: 16000,
        max_tokens: 4096,
        capabilities: ["text", "image", "video", "audio", "search", "tools"],
      },
      api: {
        provider: "OpenAI",
        endpoint: "chat_completions",
      },
      controls: [
        {
          id: "temperature",
          componentType: "slider",
          label: "Temperature",
          helpText:
            "The higher the temperature, the more random the text. 0.0 is deterministic.",
          type: "float",
          value: 0.7,
          min: 0.0,
          max: 1.0,
          step: 0.01,
        },
      ],
    },
  ],
};

const HorizontalAdjustableSections: React.FC = () => {
  const { version, setVersion, contextData, setContextData } = useAuth();

  const handleSaveNew = () => {
    const newVersionNumber = contextData.length + 1;
    const newAddContextData = { version: newVersionNumber, ...initialData };
    contextData.push(newAddContextData);
    setContextData(contextData);
    setVersion(newVersionNumber);
  };

  return (
    <div className="h-full container-height pb-1 dark:bg-[#18181b]">
      <div className="flex items-center px-[30px] justify-between h-[60px]">
        <div className="flex items-center">
          <div className="p-2 rounded-full  [box-shadow:#0d704c80_0px_0px_20px_0px,_#0d704c80_0px_0px_20px_0px] cursor-pointer">
            <GoPlusCircle size={20} className="dark:text-white" />
          </div>
          <FaBars className="ml-[31px] text-[25px] mr-[25px] cursor-pointer dark:text-white" />
          <Input
            className="min-w-[300px] w-[300px]"
            aria-label="Full name"
            defaultValue="Start Generic Job Posting from Job Title"
          />
          <div className="ml-[20px] mr-[20px]">
            <Dropdown
              options={contextData.map((item: any) => ({
                value: item.version,
                label: "Version " + item.version,
              }))}
              className="outline-none"
              value={version}
              onClick={(e: any) => setVersion(e)}
            />
          </div>
          <Button className="cursor-pointer bg-[#202020] border border-[#3F3F46] text-[12px]">
            Save Update
          </Button>
          <Button
            className="cursor-pointer ml-[20px] bg-[#202020] border border-[#3F3F46] text-[12px]"
            onClick={handleSaveNew}
          >
            Save New
          </Button>
        </div>
        <div className="flex items-center">
          <HiDotsVertical className="font-semibold text-xl cursor-pointer dark:text-white" />
        </div>
      </div>
      <div className="flex for-playground-height">
        <PanelGroup direction="horizontal">
          <Panel defaultSize={20} minSize={0}>
            <VariablesPanel />
          </Panel>
          <PanelResizeHandle className="group">
            <SectionSplitter />
          </PanelResizeHandle>
          <Panel defaultSize={30} minSize={0}>
            <MessagesPanel />
          </Panel>
          <PanelResizeHandle className="group">
            <SectionSplitter />
          </PanelResizeHandle>
          <Panel minSize={0}>
            <ResponsePanel />
          </Panel>
        </PanelGroup>
        <ModelSettingsDrawer />
      </div>
    </div>
  );
};

export default HorizontalAdjustableSections;
