import React, { useState } from "react";
import { UIRenderer } from "./UIRenderer";
import { MinusCircle } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Form, FormField, FormMessage  } from "../UI";
import { iIntakeFormDesktopProps } from "@/utils/types";

export const IntakeForm = ({
  customFields,
  onDelete,
  handleChange,
  className,
  isShowSubmit = true,
}: iIntakeFormDesktopProps) => {
  const [hoveredIndex, setHoveredIndex] = useState(-1);

  const customFieldsSchema = z.object(
    customFields.reduce((acc, item) => {
      let fieldSchema;

      if (
        item.source_params.type === "checkbox" ||
        item.source_params.type === "switch"
      ) {
        // For checkboxes and switches, the field is boolean
        fieldSchema = z.boolean();

        if (item.source_params.validation.required) {
          // For required checkboxes or switches, set nonempty validation
          fieldSchema = z.boolean({
            required_error: "This field is required.",
          });
        }
      } else {
        // For other types, like text inputs, use string validation
        fieldSchema = z.string();

        if (item.source_params.validation.required) {
          fieldSchema = fieldSchema.nonempty("This field is required.");
        }

        if (item.source_params.validation.minLength) {
          fieldSchema = fieldSchema.min(
            item.source_params.validation.minLength,
            {
              message: `Minimum length is ${item.source_params.validation.minLength}.`,
            }
          );
        }

        if (item.source_params.validation.maxLength) {
          fieldSchema = fieldSchema.max(
            item.source_params.validation.maxLength,
            {
              message: `Maximum length is ${item.source_params.validation.maxLength}.`,
            }
          );
        }
      }

      return {
        ...acc,
        [item.UUID]: fieldSchema,
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

    console.log("Submitted Value", submittedValue);
  };
  
  return (
    <div className='w-full'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
          {customFields.map((element, index) => {
            return (
              <div
                key={index}
                //className="flex gap-4 md:flex-column items-start md:items-center border-b border-gray-300 p-4 mb-4 rounded mt-2"
                //className="flex gap-4 md:flex-column items-start md:items-center border-b border-gray-300 p-4 mb-2 rounded mt-2"
                //className="flex gap-4 md:flex-column items-start md:items-center border-b border-gray-300 p-4 mb-2 rounded mt-2"
                className="flex gap-4 md:flex-column items-start md:items-center border-b border-gray-300 p-4 mb-1 rounded mt-1"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(-1)}
              >
                <FormField
                  control={form.control}
                  name={element.UUID as never}
                  render={({ field }) => {
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
                {hoveredIndex === index && (
                  <MinusCircle
                    className="text-gray-400 cursor-pointer mt-auto md:mt-0"
                    onClick={() => onDelete(element.UUID)}
                  />
                )}
              </div>
            );
          })}

          {customFields.length > 0 && isShowSubmit && (
            <Button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 mt-2 ml-auto block rounded-md hover:bg-blue-600"
            >
              Submit
            </Button>
          )}
        </form>
      </Form>
    </div>
  );
};
