"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { FilterForm, CustomValueForm, RunRecipe, MatrixResults } from ".";


const formSchema = z.object({
    username: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    password: z.string().min(2, {
        message: "Password must be at least 2 characters.",
    }),
});

export const FormData = ({ additionalClasses = "" }: any) => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            password: "",
        },
    });
    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
    }

    return (
        <>
            <FilterForm/>
            <CustomValueForm/>
            <RunRecipe/>
            <MatrixResults/>
        </>
    );
};

/* OpenAI API CALL Sample:
import React, { useEffect, useState } from 'react';
import { getOpenAIResponse } from '../lib/openaiService';

const MyComponent: React.FC = () => {
  const [response, setResponse] = useState('');

  useEffect(() => {
    getOpenAIResponse("What is the capital of Iran?")
      .then(data => {
        setResponse(data.choices[0].message.content);
      })
      .catch(error => console.error('Failed to fetch from OpenAI:', error));
  }, []);

  return (
    <div>
      <p>OpenAI Response: {response}</p>
    </div>
  );
};

export default MyComponent;

 */