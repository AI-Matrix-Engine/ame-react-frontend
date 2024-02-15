import React from "react";
import { JsonDataType } from "./JsonData.";
import { UIRenderer } from "./UIRenderer";
import { DeleteIcon, Minus, RemoveFormattingIcon } from "lucide-react";
import { Form, FormField, FormMessage } from "../UI/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../UI/button";

type Props = {
  customFields: JsonDataType[];
  onDelete: (id: string) => void;
  handleChange: (element: JsonDataType) => void;
  className?: string;
};

export const IntakeForm = ({
  customFields,
  onDelete,
  handleChange,
  className,
}: Props) => {
  const customFieldsSchema = z.object(
    customFields.reduce((acc, item) => {
      return {
        ...acc,
        [item.UUID]: item.source_params.validation.required
          ? z.string().nonempty("This field is required.")
          : z.string(),
      };
    }, {})
  );

  const form = useForm({
    resolver: zodResolver(customFieldsSchema),
    defaultValues: customFields.reduce((acc, item) => {
      return {
        ...acc,
        [item.UUID]: item.value,
      };
    }, {}),
  });

  const onSubmit = (values: { [key: string]: string }) => {
    const submittedValue = customFields.map((element) => {
      return {
        ...element,
        value: values[element.UUID],
      };
    });

    console.log(values, submittedValue);
  };
  return (
    <div className={className}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          {customFields.map((element, index) => {
            return (
              <div
                key={index}
                className="flex gap-4 border border-gray-300 p-4 mb-4"
              >
                <FormField
                  control={form.control}
                  name={element.UUID}
                  render={({ field }) => {
                    console.log("fieldValue", field);
                    return (
                      <div className="flex flex-col w-full">
                        <UIRenderer
                          element={element}
                          onChange={handleChange}
                          field={field}
                        />
                        <FormMessage />
                      </div>
                    );
                  }}
                />
                <Button
                  className="bg-gray-400 text-white px-4 py-2 mt-2 rounded-md hover:bg-gray-400"
                  onClick={() => onDelete(element.UUID)}
                >
                  <Minus />
                </Button>
              </div>
            );
          })}

          {customFields.length > 0 && (
            <Button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 mt-2 rounded-md hover:bg-blue-600"
            >
              Submit
            </Button>
          )}
        </form>
      </Form>
    </div>
  );
};
