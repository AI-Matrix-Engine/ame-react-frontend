import React from "react";
import { Input, Dropdown, Textarea, Label } from "../UI";

const selectKeyWord = [
  { value: "0", label: "Select Keyword Type" },
  { value: "1", label: "Service Keyword" },
  { value: "2", label: "Product Keyword" },
  { value: "3", label: "Educational Keyword About a Service" },
  { value: "4", label: "Educational Keyword About a Product" },
  { value: "5", label: "Business Keyword" },
  { value: "6", label: "Non-Business Keyword" },
  { value: "other", label: "Other (Enter Below)" },
];

export const CustomValueForm = () => {
  return (
    <div className="flex flex-wrap mt-10" id="variablesRow">
       <p id="initialText" className="text-gray-500 mb-4">
        Enter Custom Values
        </p>
       
      <div className="w-full" id="containerVariables">
        <div className="mb-3">
          <div className="flex">
            <div className="input-group mb-3 w-full">
              <span className="input-group-text  ">Industry Name</span>
              <Input
                type="text"
                className="form-control border"
                placeholder="Enter Industry Name..."
                id="INDUSTRY_NAME_1001"
                name="INDUSTRY_NAME_1001"
              />
            </div>
          </div>
        </div>

        <Dropdown options={selectKeyWord} />

        <div className="input-group mb-3">
          <Label>Input Range</Label>
          <Input
            type="range"
            className="form-range w-full"
            id="INPUT_RANGE_1001"
            name="undefined"
          />
          <span id="undefined" className="ml-2"></span>
        </div>

        <div className="mb-3">
          <div className="w-full">
            <div className="form-floating w-full">
              <Textarea
                placeholder="Enter custom instructions..."
                aria-label="Custom Instructions Input"
                id="CUSTOM_INSTRUCTIONS_1001"
                name="CUSTOM_INSTRUCTIONS_1001"
              />
            </div>
          </div>
        </div>

        <div className="mb-3">
          <div className="w-full">
            <div className="input-group mb-3">
              <span className="input-group-text  ">Ideal Client</span>
              <Input
                type="text"
                className="form-control border"
                placeholder="Enter your absolutely ideal client... (Example: 'Enterprise-Level Corporate IT Departments')"
                id="IDEAL_CLIENT_1001"
                name="IDEAL_CLIENT_1001"
              />
            </div>
          </div>
        </div>

        <div className="mb-3">
          <div className="w-full">
            <div>
              <Textarea
                placeholder="Enter or paste a list of keywords..."
                aria-label="Keyword List Input"
                id="KEYWORD_LIST_1001"
                name="KEYWORD_LIST_1001"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
