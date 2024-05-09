"use client";
import React, { useEffect, useState } from "react";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import SectionSplitter from "@/components/playground1/spliter";
import { GoPlusCircle } from "react-icons/go";
import { FaBars } from "react-icons/fa6";

import { ModelSettingsDrawer } from "@/components/home/modelSettingsDrawer";

import { Button, Dropdown, Input } from "../_shared";
import { MdOutlineLightMode, MdOutlineNightlight } from "react-icons/md";
import { HiDotsVertical } from "react-icons/hi";

import VariablesPanel from "@/components/playground1/variablesPanel";
import ResponsePanel from "@/components/playground1/responsePanel";
import MessagesPanel from "@/components/playground1/messagesPanel";
import { socketService } from "@/lib/socket";
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
  responseData: [],
};

const HorizontalAdjustableSections: React.FC = () => {
  const { version, setVersion, contextData, setContextData } = useAuth();
  const { user } = useAuth();

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
