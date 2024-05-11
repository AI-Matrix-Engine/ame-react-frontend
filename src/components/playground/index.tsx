"use client";
import React, { useEffect, useState } from "react";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import SectionSplitter from "@/components/playground/spliter";
import { GoPlusCircle } from "react-icons/go";
import { FaBars } from "react-icons/fa6";

import { ModelSettingsDrawer } from "@/components/home/modelSettingsDrawer";

import { Button, Dropdown, Input, Label } from "../_shared";
import { MdOutlineLightMode, MdOutlineNightlight } from "react-icons/md";
import { HiDotsVertical } from "react-icons/hi";

import VariablesPanel from "@/components/playground/variablesPanel";
import ResponsePanel from "@/components/playground/responsePanel";
import MessagesPanel from "@/components/playground/messagesPanel";
import { socketService } from "@/lib/socket";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/_shared/Dialog";

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
      isFormat: 0,
      isOpen: true,
      isMoved: false,
      _id: "",
      model: "",
      name: "",
      class: "",
      text: "",
      limitations: {
        context_window: 16000,
        max_tokens: 4096,
        capabilities: ["text", "image", "video", "audio", "search", "tools"],
      },
      api: {
        provider: "",
        endpoint: "",
      },
      controls: [],
    },
  ],
};

const HorizontalAdjustableSections: React.FC = () => {
  const { user, version, setVersion, contextData, setContextData } = useAuth();

  const [open, setOpen] = useState<boolean>(false);

  const handleSaveUpdate = async (data: any) => {
    try {
      // Call API for saving current chat data
      const response = await axios.put(
        "https://aimatrix-api.vercel.app/api/playground",
        {
          user_id: user?.uid,
          data: data,
        }
      );

      if (response.status !== 200) {
        console.error("Unexpected response status:", response.status);
      }
    } catch (error) {
      // Handle any errors during the API call
      console.error("Error saving chat data:", error);
    }
  };

  const handleSaveNew = () => {
    const newVersionNumber = contextData.length + 1;
    const newAddContextData = { version: newVersionNumber, ...initialData };
    contextData.push(newAddContextData);
    setContextData(contextData);
    setVersion(newVersionNumber);

    handleSaveUpdate(contextData);
  };

  const openDialog = () => {
    setOpen(!open);
  };

  return (
    <>
      <div className="h-full container-height pb-1 dark:bg-[#18181b]">
        <div className="flex items-center pl-[9.92px] justify-between h-[60px]">
          <div className="flex items-center">
            {/* <div className="p-2 rounded-full  [box-shadow:#0d704c80_0px_0px_20px_0px,_#0d704c80_0px_0px_20px_0px] cursor-pointer">
              <GoPlusCircle size={20} className="dark:text-white" />
            </div> */}
            {/* <FaBars className="ml-[31px] text-[25px] mr-[25px] cursor-pointer dark:text-white" /> */}
            <Input
              className="min-w-[300px] w-[300px]"
              aria-label="Full name"
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
            <Button
              onClick={() => setOpen(true)}
              className="cursor-pointer bg-[#202020] border border-[#3F3F46] text-[12px]"
            >
              Save Update
            </Button>
            <Button
              className="cursor-pointer ml-[20px] bg-[#202020] border border-[#3F3F46] text-[12px]"
              onClick={handleSaveNew}
            >
              Save New
            </Button>
          </div>
          {/* <div className="flex items-center">
            <HiDotsVertical className="font-semibold text-xl cursor-pointer dark:text-white" />
          </div> */}
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
      <Dialog open={open} onOpenChange={openDialog}>
        <DialogContent className="sm:max-w-lg">
          <DialogTitle className="text-center text-black dark:text-white">
            Confirm
          </DialogTitle>
          <DialogDescription className="text-center">
            Are you writing over the previous version?
          </DialogDescription>
          <DialogFooter className="sm:justify-center">
            <DialogClose asChild>
              <Button
                onClick={() => handleSaveUpdate(contextData)}
                className="cursor-pointer bg-[#202020] border border-[#3F3F46] text-[12px]"
              >
                Yes
              </Button>
            </DialogClose>
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                No
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default HorizontalAdjustableSections;
