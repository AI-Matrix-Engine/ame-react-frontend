import React from "react";
import { Dropdown, Input } from "../UI";
import { Textarea } from "../UI/textarea";
import { Checkbox } from "../UI/checkbox";
import { RadioGroup, RadioGroupItem } from "../UI/radio-group";
import { Switch } from "../UI/switch";
import { Calendar } from "../UI/calendar";
import { Label } from "../UI/label";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "../UI/dialog";
import { Button } from "../UI/button";
import { CustomTable } from "./CustomTable";
import { CustomTab } from "./CustomTab";

export const UIRenderer = ({ element, onChange, field }: any) => {
  const [open, setOpen] = React.useState(false);

  const handleChangeValue = (value: string | boolean) => {
    console.log("value", value);

    onChange({ ...element, value: value });
  };

  const openDialog = () => {
    setOpen(!open);
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
        <div className="flex items-center gap-2">
          <Checkbox
            value={element.value}
            onChange={(event: React.FormEvent<HTMLButtonElement>) =>
              handleChangeValue((event.target as HTMLInputElement).checked)
            }
            {...field}
          />
          <Label>{element?.source_params?.options?.label}</Label>
        </div>
      );
    case "radio":
      return (
        <div className="flex items-center gap-2">
          {element?.source_params?.options?.options.map((item, index) => {
            return (
              <RadioGroup
                name={"radio"}
                defaultValue={""}
                onChange={(e: React.FormEvent<HTMLButtonElement>) => {
                  handleChangeValue((e.target as HTMLButtonElement).value);
                }}
                {...field}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    name= "radio"
                    value={item.id}
                    id={item.id}
                    // onChange={(e: React.FormEvent<HTMLButtonElement>) => {
                    //   handleChangeValue((e.target as HTMLButtonElement).value);
                    // }}
                    {...field}
                  />
                  <Label htmlFor={item.id}>{item.label}</Label>
                </div>
              </RadioGroup>
            );
          })}
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
      case 'tab':
        return(
          <div>
            <CustomTab data={element.source_params.data} />
          </div>
        )
    default:
      return null;
  }
};
