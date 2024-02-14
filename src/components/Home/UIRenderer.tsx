import React from "react";
import { Dropdown, Input } from "../UI";
import { Textarea } from "../UI/textarea";
import { Checkbox } from "../UI/checkbox";
import { RadioGroup, RadioGroupItem } from "../UI/radio-group";
import { Switch } from "../UI/switch";
import { Calendar } from "../UI/calendar";
import { Label } from "../UI/label";

export const UIRenderer = ({ element, onChange, field }: any) => {
  const handleChangeValue = (value: string | boolean) => {
    console.log("value", value);

    onChange({ ...element, value: value });
  };

  switch (element?.source_params?.type) {
    case "standard_dropdown":
    case "dropdown_with_other_option":
      return (
        <Dropdown
          value={element.value}
          onClick={(value: string) => handleChangeValue(value)}
          options={element?.source_params?.options?.options}
          placeHolder={element?.source_params?.options?.placeholder}
          {...field}
        />
      );
    case "standard_text_input":
      return (
        <Input
          element={element}
          placeholder="Filter emails..."
          className="max-w-sm"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleChangeValue(e.target.value)
          }
          {...field}
        />
      );
    case "textarea":
      return (
        <div className="w-full">
          <Textarea
            placeholder="Enter Message"
            element={element}
            handleChange={(value: string) => handleChangeValue(value)}
            {...field}
          />
        </div>
      );
    case "checkbox":
      return (
        <div className="flex items-center gap-2">
          <Checkbox
            value={element.value}
            onChange={(event: React.FormEvent<HTMLButtonElement>) =>
              handleChangeValue((event.target as HTMLInputElement).checked)
            }
            // {...field}
          />
          <Label>{element?.source_params?.options?.label}</Label>
        </div>
      );
    case "radio":
      return (
        <div>
          <RadioGroup
            defaultValue={element.value}
            onChange={(e: React.FormEvent<HTMLButtonElement>) => {
              handleChangeValue((e.target as HTMLButtonElement).value);
            }}
            {...field}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value={element?.value}
                id={element.label}
                {...field}
              />
              <Label htmlFor="option-one">{element?.label}</Label>
            </div>
          </RadioGroup>
        </div>
      );
    case "switch":
      return (
        <div className="flex items-center gap-2">
          <Switch
            onChange={(e: React.FormEvent<HTMLButtonElement>) =>
              handleChangeValue((e.target as HTMLButtonElement).value)
            }
            value={element.value}
            {...field}
          />
          <Label>{element?.label}</Label>
        </div>
      );
    case "calendar":
      return (
        <Calendar
          value={element.value}
          onChange={(value: string) => handleChangeValue(value)}
          {...field}
        />
      );
    default:
      return null;
  }
};
