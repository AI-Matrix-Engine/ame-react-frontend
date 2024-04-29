"use client";
import React, { useState } from "react";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import SectionSplitter from "./spliter";
import { GoPlusCircle } from "react-icons/go";
import { FaBars } from "react-icons/fa6";

import { Button, Dropdown, Input } from "../_shared";
import { MdOutlineLightMode, MdOutlineNightlight } from "react-icons/md";
import { HiDotsVertical } from "react-icons/hi";

import LeftSection from "./leftSection";
import RightSection from "./rightSection";
import MiddleSection from "./middleSection";

const recipies = [
  { value: "0", label: "Version 1" },
  { value: "1", label: "Version 2" },
  { value: "2", label: "Version 3" },
  { value: "3", label: "Version 4" },
];

const HorizontalAdjustableSections: React.FC = () => {
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
            <Dropdown options={recipies} className="outline-none" />
          </div>
          <Button className="cursor-pointer bg-[#202020] border border-[#3F3F46]">
            Save Update
          </Button>
          <Button className="cursor-pointer ml-[20px] bg-[#202020] border border-[#3F3F46]">
            Save New
          </Button>
        </div>
        <div className="flex items-center">
          <HiDotsVertical className="font-semibold text-xl cursor-pointer dark:text-white" />
        </div>
      </div>
      <PanelGroup direction="horizontal" className="adjustable-height">
        <Panel defaultSize={20} minSize={0}>
          <LeftSection />
        </Panel>
        <PanelResizeHandle className="group">
          <SectionSplitter />
        </PanelResizeHandle>
        <Panel minSize={0}>
          <MiddleSection />
        </Panel>
        <PanelResizeHandle className="group">
          <SectionSplitter />
        </PanelResizeHandle>
        <Panel defaultSize={30} minSize={0}>
          <RightSection />
        </Panel>
      </PanelGroup>
    </div>
  );
};

export default HorizontalAdjustableSections;