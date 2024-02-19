"use client";
import React from "react";
import { Checkbox } from "../UI/checkbox";
import { Calendar } from "../UI/calendar";
import { Label } from "@/components/UI/label";
import { RadioGroup, RadioGroupItem } from "@/components/UI/radio-group";
import { Switch } from "@/components/UI/switch";
import { CopyIcon } from "@radix-ui/react-icons";
import { useToast } from "@/components/UI/use-toast";

import { ComboboxDemo } from "./Combobox";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/UI/dialog";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/UI/tooltip";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/UI/pagination";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/UI/tabs";
import { Separator } from "@/components/UI/separator";
import { Button } from "../UI/button";
import { Input } from "../UI";
import { DataTable } from "./DataTable";
import { columns } from "./Columns";
import { NavigationBar } from "../Home/NavigationBar";

export const Create = () => {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const { toast } = useToast();

  const data = [
    { id: "728ed52f", amount: 100, status: "pending", email: "m@example.com" },
    { id: "728ed52f1", amount: 10, status: "start", email: "mmm@abc.com" },
    {
      id: "728ed52f2",
      amount: 200,
      status: "complete",
      email: "mub@example.com",
    },
    { id: "728ed52f", amount: 100, status: "pending", email: "m@example.com" },
    { id: "728ed52f1", amount: 10, status: "start", email: "mmm@abc.com" },
    {
      id: "728ed52f2",
      amount: 200,
      status: "complete",
      email: "mub@example.com",
    },
    { id: "728ed52f", amount: 100, status: "pending", email: "m@example.com" },
    { id: "728ed52f1", amount: 10, status: "start", email: "mmm@abc.com" },
    {
      id: "728ed52f2",
      amount: 200,
      status: "complete",
      email: "mub@example.com",
    },
    { id: "728ed52f", amount: 100, status: "pending", email: "m@example.com" },
    { id: "728ed52f1", amount: 10, status: "start", email: "mmm@abc.com" },
    {
      id: "728ed52f2",
      amount: 200,
      status: "complete",
      email: "mub@example.com",
    },
    { id: "728ed52f", amount: 100, status: "pending", email: "m@example.com" },
    { id: "728ed52f1", amount: 10, status: "start", email: "mmm@abc.com" },
    {
      id: "728ed52f2",
      amount: 200,
      status: "complete",
      email: "mub@example.com",
    },
  ];

  return (
    <div className="p-6">
      <div>
        <h4 className="text-sky-400 text-center">Checkbox</h4>
        <div className="flex items-center space-x-2">
          <Checkbox id="terms3" />
          <label
            htmlFor="terms3"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Accept terms and conditions
          </label>
        </div>
      </div>
      <div className="flex flex-col">
        <h4 className="text-sky-400 text-center">Caleneder</h4>

        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md border"
        />
      </div>
      <h4 className="text-sky-400 text-center">Radio Button</h4>
      <div>
        <RadioGroup defaultValue="option-one">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="option-one" id="option-one" />
            <Label htmlFor="option-one">Option One</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="option-two" id="option-two" />
            <Label htmlFor="option-two">Option Two</Label>
          </div>
        </RadioGroup>
      </div>
      <h4 className="text-sky-400 text-center">Switch</h4>
      <div className="flex items-center space-x-2">
        <Switch id="airplane-mode" />
        <Label htmlFor="airplane-mode">Airplane Mode</Label>
      </div>
      <div>
        <h4 className="text-sky-400 text-center">Combobox</h4>
        <ComboboxDemo />
      </div>
      <div>
        <h4 className="text-sky-400 text-center">Dialog</h4>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Share</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Share link</DialogTitle>
              <DialogDescription>
                Anyone who has this link will be able to view this.
              </DialogDescription>
            </DialogHeader>
            <div className="flex items-center space-x-2">
              <div className="grid flex-1 gap-2">
                <Label htmlFor="link" className="sr-only">
                  Link
                </Label>
                <Input
                  id="link"
                  defaultValue="https://ui.shadcn.com/docs/installation"
                  readOnly
                />
              </div>
              <Button type="submit" size="sm" className="px-3">
                <span className="sr-only">Copy</span>
                <CopyIcon className="h-4 w-4" />
              </Button>
            </div>
            <DialogFooter className="sm:justify-start">
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Close
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div>
        <h4 className="text-sky-400 text-center">Toast</h4>
        <Button
          variant="outline"
          onClick={() => {
            toast({
              description: "Your message has been sent.",
            });
          }}
        >
          Show Toast
        </Button>
      </div>
      <div>
        <h4 className="text-sky-400 text-center">Tooltip</h4>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline">Hover</Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Add to library</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <div>
        <h4 className="text-sky-400 text-center">Tabs</h4>
        <Tabs defaultValue="account" className="w-[400px]">
          <TabsList>
            <TabsTrigger value="account">Account</TabsTrigger>

            <TabsTrigger value="password">Password</TabsTrigger>
          </TabsList>
          <TabsContent value="account">
            Make changes to your account here.
          </TabsContent>
          <Separator />
          <TabsContent value="password">Change your password here.</TabsContent>
        </Tabs>
      </div>
      <div>
        <h4 className="text-sky-400 text-center">Data Table</h4>
        <DataTable columns={columns} data={data} />
      </div>
      <div>
        <h4 className="text-sky-400 text-center">Form Data</h4>
        <NavigationBar />
        {/* <FormData additionalClasses={"flex justify-around items-center"} /> */}
      </div>

      <div>
        <h4 className="text-sky-400 text-center">Pagination</h4>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};
