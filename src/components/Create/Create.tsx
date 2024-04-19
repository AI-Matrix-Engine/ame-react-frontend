"use client";
import React, { useMemo, useState } from "react";
import { Input, Button, Dropdown, Label } from "../UI";
import { AddCategory, AppOverview, AIConversationSettings } from ".";
import { AIModelSpecifications } from "./AIModelSpecifications";
import { ComboBox } from "@/components/UI/Combobox";
import { iSelectType } from "@/utils/types";

const categoryList = [
  {
    label: "Select the AI App Category",
    value: "1",
    subCategories: [{ label: "Select Recipe Subcategory", value: "1" }],
  },
  {
    label: "Content Writing",
    value: "2",
    subCategories: [
      { label: "Select Recipe Subcategory", value: "1" },
      { label: "Product Page Writing", value: "2" },
      { label: "Service Page Content", value: "3" },
      { label: "Blog Article Writing", value: "4" },
      { label: "School Papers", value: "5" },
      { label: "Content Research", value: "6" },
      { label: "FAQ Assistance", value: "7" },
      { label: "Other Content", value: "8" },
    ],
  },
  {
    label: "SEO",
    value: "3",
    subCategories: [
      { label: "Select Recipe Subcategory", value: "1" },
      { label: "Keyword Categorization", value: "2" },
      { label: "Basic Keyword Research", value: "3" },
      { label: "Advanced Keyword Research", value: "4" },
      { label: "Content Analysis", value: "5" },
      { label: "Image SEO", value: "6" },
    ],
  },
  {
    label: "Random Recipes",
    value: "4",
    subCategories: [
      { label: "Select Recipe Subcategory", value: "1" },
      { label: "Small Tasks", value: "2" },
    ],
  },
  {
    label: "System Core",
    value: "5",
    subCategories: [
      { label: "Select Recipe Subcategory", value: "1" },
      { label: "Q&A Assistance", value: "2" },
      { label: "Matrix Bot Options", value: "3" },
      { label: "Recipe Building Assistants", value: "4" },
      { label: "Fine Tuning Data", value: "5" },
    ],
  },
  {
    label: "Tests",
    value: "6",
    subCategories: [
      { label: "Select Recipe Subcategory", value: "1" },
      { label: "Quick Access (Deleted Nightly)", value: "2" },
      { label: "Tests (Deleted every 7 days)", value: "3" },
      { label: "System Tests", value: "4" },
    ],
  },
  {
    label: "Uncategorized",
    value: "7",
    subCategories: [
      { label: "Select Recipe Subcategory", value: "1" },
      { label: "Needs category to be created", value: "2" },
    ],
  },
  {
    label: "Fun For Kids",
    value: "8",
    subCategories: [
      { label: "Select Recipe Subcategory", value: "1" },
      { label: "Other fun for kids", value: "2" },
    ],
  },
  {
    label: "Coding",
    value: "9",
    subCategories: [
      { label: "Select Recipe Subcategory", value: "1" },
      { label: "Other Coding", value: "2" },
      { label: "AME Backend Django", value: "3" },
    ],
  },
  {
    label: "Test 2",
    value: "10",
    subCategories: [
      { label: "Select Recipe Subcategory", value: "1" },
      { label: "Other Test 2", value: "2" },
    ],
  },
  {
    label: "Legal",
    value: "11",
    subCategories: [
      { label: "Select Recipe Subcategory", value: "1" },
      { label: "Other Legal", value: "2" },
      { label: "Deposition Prep", value: "3" },
    ],
  },
  {
    label: "AME Django Backend",
    value: "12",
    subCategories: [
      { label: "Select Recipe Subcategory", value: "1" },
      { label: "Other AME Django Backend", value: "2" },
    ],
  },
  {
    label: "Image Analytics",
    value: "13",
    subCategories: [
      { label: "Select Recipe Subcategory", value: "1" },
      { label: "Other Image Analysis", value: "2" },
      { label: "General Image Analysis", value: "3" },
    ],
  },
];

const PAGE_TITLE = "Create Matrix Recipes";
//const APP_INPUT_LABEL = "AI App Name";
const APP_INPUT_PLACEHOLDER = "App name...";

const NEW_CATEGORY_TITLE = "Add Category";
const NEW_CATEGORY_INPUT_LABEL = "New Category Name";
const NEW_CATEGORY_PROPS = {
  title: NEW_CATEGORY_TITLE,
  inputLabel: NEW_CATEGORY_INPUT_LABEL,
};

const NEW_SUB_CATEGORY_TITLE = "Add Sub Category";
const NEW_SUB_CATEGORY_INPUT_LABEL = "New Sub Category Name";
const NEW_SUB_CATEGORY_PROPS = {
  title: NEW_SUB_CATEGORY_TITLE,
  inputLabel: NEW_SUB_CATEGORY_INPUT_LABEL,
};

const TOGGLE_ADD_CATEGORY_VALUE = "Add_Category";
const TOGGLE_ADD_SUB_CATEGORY_VALUE = "Add_Sub_Category";

const ADD_CATEGORY_BTN = "Add Category";
const ADD_SUB_CATEGORY_BTN = "Add Sub Category";

const frameworks = [
  {
    value: "next.js",
    label: "Next.js",
  },
  {
    value: "sveltekit",
    label: "SvelteKit",
  },
  {
    value: "nuxt.js",
    label: "Nuxt.js",
  },
  {
    value: "remix",
    label: "Remix",
  },
  {
    value: "astro",
    label: "Astro",
  },
];

export const Create = () => {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
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
  const [categories, setCategories] = useState(categoryList);
  const [categorySelectedValue, setCategorySelectedValue] = useState("");
  const [subCategories, setSubCategories] = useState<iSelectType[]>([]);
  const [subCategorySelectedValue, setSubCategorySelectedValue] = useState("");
  const [toggleAddCategory, setToggleAddCategory] = useState<string>("");
  const [appOverView, setAppOverView] = useState({
    aiDescription: "",
    apiProviderSelectedValue: "",
    apiEndpointSelectedValue: "",
    aiModelSelectedValue: "",
    configurationSelectedValue: "",
  });

  const handleCategoryChange = (value: string) => {
    const filteredCategory = categories.find(
        (category: iSelectType) => category.value == value
    );
    const filteredSubcategories = filteredCategory?.subCategories;
    setCategorySelectedValue(value);
    filteredSubcategories &&
    filteredSubcategories.length &&
    setSubCategories(filteredSubcategories);
  };

  const handleNewCategory = (newCategory: any) => {
    const newUpdatedCategory = {
      ...newCategory,
      value: categories.length + 1,
      subCategories: [],
    };

    setCategories([...categories, newUpdatedCategory]);
    setToggleAddCategory("");
  };

  const handleNewSubCategory = (newSubCategory: any) => {
    const newUpdatedSubCategory = {
      ...newSubCategory,
      value: subCategories.length + 1,
    };
    // update the category with new sub category
    const updatedCategory = categories.map((category) => {
      if (category.value === categorySelectedValue) {
        category.subCategories.push(newUpdatedSubCategory);
      }
      return category;
    });

    setCategories(updatedCategory);

    setSubCategories([...subCategories, newUpdatedSubCategory]);
    setToggleAddCategory("");
  };

  const handleAppOverViewChange = (value: any) => {
    setAppOverView(value);
  };

  const isShowAiModelSpecifications = useMemo(() => {
    if (
        appOverView?.aiDescription &&
        appOverView?.apiProviderSelectedValue &&
        appOverView?.apiEndpointSelectedValue &&
        appOverView?.aiModelSelectedValue &&
        appOverView?.configurationSelectedValue
    ) {
      return true;
    } else {
      return false;
    }
  }, [appOverView]);

  return (
      <div className="p-6">
        <h2 className="text-4xl font-extrabold dark:text-white mb-8 text-center">
          {PAGE_TITLE}
        </h2>

        <Input type="input" placeholder={APP_INPUT_PLACEHOLDER} id="link" />

        <div className="flex justify-between items-end gap-4 mb-4 mt-2">

          <ComboBox
              placeHolder="Category"
              options={categories || []}
              onClick={(value: string) => handleCategoryChange(value)}
              value={categorySelectedValue}
          />

          {/* <Dropdown
          placeHolder="Category"
          value={categorySelectedValue}
          onClick={(value: string) => handleCategoryChange(value)}
          options={categories}
        /> */}
          <Button onClick={() => setToggleAddCategory(TOGGLE_ADD_CATEGORY_VALUE)}>
            {ADD_CATEGORY_BTN}
          </Button>
        </div>

        {categorySelectedValue ? (
            <div className="flex justify-between items-end gap-4 mb-4 mt-2">

              <ComboBox
                  placeHolder="Sub Category"
                  options={subCategories || []}
                  onClick={(value: string) => setSubCategorySelectedValue(value)}
                  value={subCategorySelectedValue}
              />
              <Button
                  onClick={() => setToggleAddCategory(TOGGLE_ADD_SUB_CATEGORY_VALUE)}
              >
                {ADD_SUB_CATEGORY_BTN}
              </Button>
            </div>
        ) : undefined}

        {toggleAddCategory === TOGGLE_ADD_CATEGORY_VALUE && (
            <AddCategory
                {...NEW_CATEGORY_PROPS}
                handleNewCategory={handleNewCategory}
                onCancel={() => setToggleAddCategory("")}
            />
        )}

        {toggleAddCategory === TOGGLE_ADD_SUB_CATEGORY_VALUE && (
            <AddCategory
                {...NEW_SUB_CATEGORY_PROPS}
                handleNewCategory={handleNewSubCategory}
                onCancel={() => setToggleAddCategory("")}
            />
        )}
        {subCategorySelectedValue ? (
            <AppOverview handleAppOverViewChange={handleAppOverViewChange} />
        ) : undefined}

        {isShowAiModelSpecifications && <AIModelSpecifications />}

        {isShowAiModelSpecifications && <AIConversationSettings />}
      </div>
  );
};
