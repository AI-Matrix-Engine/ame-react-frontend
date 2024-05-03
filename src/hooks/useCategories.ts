// src/hooks/useCategories.tsx
import { useState, useEffect } from "react";
import { iSelectType } from "@/utils/types";
import { fetchCategories } from "@/services/categoryService";

export const useCategories = () => {
  const [categories, setCategories] = useState<iSelectType[]>([]);
  const [subCategories, setSubCategories] = useState<iSelectType[]>([]);
  const [categorySelectedValue, setCategorySelectedValue] =
    useState<string>("");
  const [subCategorySelectedValue, setSubCategorySelectedValue] =
    useState<string>("");

  useEffect(() => {
    const loadCategories = async () => {
      const fetchedCategories = await fetchCategories();
      setCategories(fetchedCategories);
    };

    loadCategories();
  }, []);

  const handleCategoryChange = (value: string) => {
    const selectedCategory = categories.find((cat) => cat.value === value);
    setCategorySelectedValue(value);
    setSubCategories(selectedCategory?.subCategories ?? []);
  };

  return {
    categories,
    subCategories,
    setCategories,
    setSubCategories,
    categorySelectedValue,
    subCategorySelectedValue,
    setCategorySelectedValue,
    setSubCategorySelectedValue,
    handleCategoryChange,
  };
};
