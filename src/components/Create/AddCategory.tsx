import React from "react";
import { Textarea, Input, Label, Button } from "../UI";

type Props = {
  title: string;
  inputLabel: string;
  handleNewCategory: (category: { label: string; description: string }) => void;
  onCancel: () => void;
};

const TEXTAREA_PLACEHOLDER = "Write your description here...";
const INPUT_CATEGORY_NAME = "Write your category name here...";

export const AddCategory = ({
  title,
  inputLabel,
  handleNewCategory,
  onCancel,
}: Props) => {
  const [category, setCategory] = React.useState({
    label: "",
    description: "",
  });

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCategory({ ...category, label: event.target.value });
  };

  const handleDescriptionChange = (value: string) => {
    setCategory({ ...category, description: value });
  };

  const onSave = () => {
    handleNewCategory(category);
  };

  return (
    <div className="p-6">
      <h5 className="text-xl font-bold dark:text-white">{title}</h5>

      <Label htmlFor="email" className="mb-2">
        {inputLabel}
      </Label>
      <Input
        type="input"
        placeholder={INPUT_CATEGORY_NAME}
        id="label"
        onChange={onChange}
      />
      <Textarea
        placeholder={TEXTAREA_PLACEHOLDER}
        id="description"
        handleChange={handleDescriptionChange}
      />

      <div className="flex justify-end gap-4 mb-4 mt-2">
        <Button onClick={() => onSave()}>Save</Button>

        <Button onClick={() => onCancel()}>Cancel</Button>
      </div>
    </div>
  );
};
