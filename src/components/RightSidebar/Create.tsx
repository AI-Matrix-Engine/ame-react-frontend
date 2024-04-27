"use client";
import React, {useEffect, useState, useMemo} from "react";
import axios from 'axios';
import {Input, Button, Dropdown, Label} from "../UI";
import {AddCategory, AppOverview, AIConversationSettings} from ".";
import {AIModelSpecifications} from "./AIModelSpecifications";
import {ComboBox} from "@/components/UI/Combobox";
import {useCategories} from '@/hooks/useCategories';
import {iSelectType} from "@/utils/types";

interface CategoryInfo {
    label: string;
    value: string;
}


const PAGE_TITLE = "Create Matrix Recipes";
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


export const Create = () => {
    const {
        categories,
        subCategories,
        setCategories,
        setSubCategories,
        categorySelectedValue,
        subCategorySelectedValue,
        setSubCategorySelectedValue,
        handleCategoryChange
    } = useCategories();

    const [toggleAddCategory, setToggleAddCategory] = React.useState<string>("");
    const [appOverview, setAppOverview] = React.useState({
        aiDescription: "",
        apiProviderSelectedValue: "",
        apiEndpointSelectedValue: "",
        aiModelSelectedValue: "",
        configurationSelectedValue: "",
    });

    const handleNewCategory = (newCategory: { label: string, description: string }) => {
        const newUpdatedCategory = {
            label: newCategory.label,
            value: (categories.length + 1).toString(),
            subCategories: [] as iSelectType[],  // Ensuring it is initialized properly
            description: newCategory.description  // Handling description if needed elsewhere
        };
        setCategories([...categories, newUpdatedCategory]);
        setToggleAddCategory("");
    };

    const handleNewSubCategory = (newSubCategory: { label: string, description: string }) => {
        const newUpdatedSubCategory = {
            label: newSubCategory.label,
            value: (subCategories.length + 1).toString(),
            description: newSubCategory.description  // Handling description if needed
        };
        const updatedCategories = categories.map(category => {
            if (category.value === categorySelectedValue) {
                return {
                    ...category,
                    subCategories: [...(category.subCategories ?? []), newUpdatedSubCategory]
                };
            }
            return category;
        });

        setCategories(updatedCategories);
        setSubCategories([...subCategories, newUpdatedSubCategory]);
        setToggleAddCategory("");
    };

    const handleAppOverviewChange = (value: any) => {
        setAppOverview(value);
    };


    const isShowAiModelSpecifications = useMemo(() => (
        appOverview.aiDescription &&
        appOverview.apiProviderSelectedValue &&
        appOverview.apiEndpointSelectedValue &&
        appOverview.aiModelSelectedValue &&
        appOverview.configurationSelectedValue
    ), [appOverview]);

    return (
        <div className="p-6">
            <h2 className="text-4xl font-extrabold dark:text-white mb-8 text-center">
                {PAGE_TITLE}
            </h2>
            <Input type="input" placeholder={APP_INPUT_PLACEHOLDER} id="link"/>
            <div className="flex justify-between items-end gap-4 mb-4 mt-2">
                <ComboBox
                    placeHolder="Category"
                    options={categories}
                    onClick={handleCategoryChange}
                    value={categorySelectedValue}
                />
                <Button onClick={() => setToggleAddCategory(TOGGLE_ADD_CATEGORY_VALUE)}>
                    {ADD_CATEGORY_BTN}
                </Button>
            </div>
            {categorySelectedValue && (
                <div className="flex justify-between items-end gap-4 mb-4 mt-2">
                    <ComboBox
                        placeHolder="Sub Category"
                        options={subCategories}
                        onClick={setSubCategorySelectedValue}
                        value={subCategorySelectedValue}
                    />
                    <Button onClick={() => setToggleAddCategory(TOGGLE_ADD_SUB_CATEGORY_VALUE)}>
                        {ADD_SUB_CATEGORY_BTN}
                    </Button>
                </div>
            )}
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
                <AppOverview handleAppOverViewChange={handleAppOverviewChange}/>
            ) : undefined}
            {isShowAiModelSpecifications && <AIModelSpecifications/>}
            {isShowAiModelSpecifications && <AIConversationSettings/>}
        </div>
    );
};
