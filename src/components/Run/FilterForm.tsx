import React from "react";
import { Dropdown } from "../UI";

const recipies = [
  { value: "0", label: "Select the Recipe Category" },
  { value: "3", label: "Content Writing" },
  { value: "1", label: "SEO" },
  { value: "9", label: "Random Recipes" },
  { value: "12", label: "System Core" },
  { value: "14", label: "Tests" },
  { value: "17", label: "Uncategorized" },
  { value: "20", label: "Fun For Kids" },
  { value: "24", label: "Coding" },
  { value: "27", label: "Test 2" },
  { value: "29", label: "Legal" },
  { value: "45", label: "AME Django Backend" },
  { value: "50", label: "Image Analysis" },
  { value: "55", label: "fasdfasdfasdf" },
  { value: "57", label: "test" },
  { value: "59", label: "fffffffff" },
];

const subCategoryRecipies = [
  { value: "0", label: "Select Recipe Subcategory" },
  { value: "7", label: "Keyword Categorization" },
  { value: "8", label: "Basic Keyword Research" },
  { value: "2", label: "Advanced Keyword Research" },
  { value: "48", label: "Content Analysis" },
  { value: "54", label: "Image SEO" },
];

const chooseRecipe = [
  { value: "0", label: "Choose Recipe" },
  { value: "118", label: "sdfsdfsdfsdfsdfsdfsdfsdf" },
  { value: "117", label: "sdfsdfsdfsdfsdfsdfsdfsdf" },
  { value: "119", label: "sdfsdfsdfsdfsdfsdfsdfsdf" },
  { value: "83", label: "Keyword Categorization Master App" },
];

export const FilterForm = () => {
  return (
    <div className="flex flex-wrap mt-3 flex-col">
      <div className="w-full px-3 mb-2">
        <Dropdown placeHolder="Recipe Category" options={recipies} />
      </div>
      <div className="w-full px-3 mb-2">
        <Dropdown
          placeHolder="Recipe Subcategory"
          options={subCategoryRecipies}
        />
      </div>
      <div className="w-full px-3 mb-2">
        <Dropdown placeHolder="Choose Recipe" options={chooseRecipe} />
      </div>
    </div>
  );
};
