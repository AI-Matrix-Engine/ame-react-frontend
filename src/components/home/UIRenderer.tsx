import React from "react";
import { CustomTable } from "./CustomTable";
import { CustomTab } from "./CustomTab";
import { Dialog, DialogClose, DialogContent, DialogFooter, Textarea, Checkbox, Dropdown, Input, RadioGroup, RadioGroupItem, Calendar, Label, Button, Switch } from "../_shared";

export const UIRenderer = ({ element, onChange, field }: any) => {
  const [open, setOpen] = React.useState(false);

  const handleChangeValue = (value: string | boolean) => {
    onChange({ ...element, value: value });
    field.onChange(value);
  };

  const handleDropDownInputChange = (value: string) => {
    const updateElement = {
      ...element,
      source_params: {
        ...element.source_params,
        options: {
          ...element.source_params.options,
          inputField: {
            ...element.source_params.options.inputField,
            value: value,
          },
        },
      },
    };

    onChange(updateElement);
  };

  const openDialog = () => {
    setOpen(!open);
  };

  switch (element?.source_params?.type) {
    case "dropdown":
    case "dropdown_with_other_option":
      return (
        <div>
          <Dropdown
            value={element.value}
            onClick={(value: string) => handleChangeValue(value)}
            options={element?.source_params?.options?.options}
            placeHolder={element?.source_params?.options?.placeholder}
            {...field}
          />
          {element.value === "Other" && (
            <div className="mt-2">
              <Input
                element={element.source_params.options.inputField}
                placeholder={
                  element.source_params.options.inputField.placeholder
                }
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleDropDownInputChange(e.target.value)
                }
              />
            </div>
          )}
        </div>
      );
    case "input":
      return (
        <Input
          element={element}
          placeholder="Filter emails..."
          className="w-full"
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
        <div className={`flex ${element?.source_params?.classes} gap-2`}>
          {element?.source_params?.options.map(
            (item: { id: string; value: string; label: string }) => {
              return (
                <div className="flex items-center space-x-2">
                  <Checkbox
                    key={item.id}
                    id={item.id}
                    value={item.value}
                    onChange={(e: React.FormEvent<HTMLInputElement>) =>
                      handleChangeValue((e.target as HTMLInputElement).checked)
                    }
                    {...field}
                  />

                  <Label>{item.label}</Label>
                </div>
              );
            }
          )}
        </div>
      );
    case "radio":
      return (
        <div className={`flex ${element?.source_params?.classes} gap-2`}>
          {element?.source_params?.options?.options.map(
            (item: { id: string; value: string; label: string }) => {
              return (
                <RadioGroup
                  name={"radio"}
                  defaultValue={"option_1"}
                  onChange={(e: React.FormEvent<HTMLButtonElement>) => {
                    handleChangeValue((e.target as HTMLButtonElement).value);
                  }}
                  {...field}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      name="radio"
                      id={item.id}
                      value={item.value}
                      {...field}
                    />
                    <Label htmlFor={item.id}>{item.label}</Label>
                  </div>
                </RadioGroup>
              );
            }
          )}
        </div>
      );
    case "switch":
      return (
        <div className="flex items-center gap-2">
          <Switch
            id={element?.label}
            onChange={(e: React.FormEvent<HTMLButtonElement>) =>
              handleChangeValue((e.target as HTMLButtonElement)?.value)
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
    case "dialog":
      return (
        <div>
          <Button variant="outline" onClick={() => openDialog()}>
            Open
          </Button>
          <Dialog open={open} onOpenChange={openDialog}>
            <DialogContent className="sm:max-w-md">
              <div className="flex items-center space-x-2">
                <div className="grid flex-1 gap-2">
                  <Label htmlFor="link" className="sr-only">
                    Link
                  </Label>
                  <Input
                    id="link"
                    defaultValue="https://ui.shadcn.com/docs/installation"
                    {...field}
                  />
                </div>
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
      );
    case "table":
      return (
        <div>
          <CustomTable data={element.source_params.data} />
        </div>
      );
    case "tab":
      return (
        <div>
          <CustomTab data={element.source_params.data} />
        </div>
      );
    default:
      return null;
  }
};

{
  /* <Checkbox
value={element.value}
onChange={(event: React.FormEvent<HTMLButtonElement>) =>
  handleChangeValue((event.target as HTMLInputElement).checked)
}
{...field}
/>
<Label>{element?.source_params?.options?.label}</Label> */
}
