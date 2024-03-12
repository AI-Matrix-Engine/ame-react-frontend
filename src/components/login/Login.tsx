"use client";
import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input, Label, FormField, FormMessage, Form, Button } from "../UI";
import { Half2Icon } from "@radix-ui/react-icons";

const formSchema = z.object({
  email: z.string().email("This is not a valid email."),
  password: z.string().min(2, {
    message: "Password must be at least 2 characters.",
  }),
});

export const Login = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values) {
    alert(
      `Your Name is ${values.username} and Your Password is ${values.password}`
    );
    form.reset();
  }

  return (
    <div className={" mx-auto mt-24 w-96 rounded overflow-hidden "}>
      <div className=" p-4 flex justify-center gap-1 bg-[#252b36] items-center">
        <h4 className="   text-[#f7f7f7] ">AIDRM</h4>
        <Half2Icon color="white" width={16} height={16} />
      </div>
      <div className={"p-5 bg-white"}>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name={"email"}
              render={({ field }) => {
                return (
                  <div className="flex flex-col py-1">
                    <Label className=" text-black text-sm">Email: </Label>
                    <Input
                      type="email"
                      className="focus:border[#e0e0e0] text-black"
                      {...field}
                    />
                    <FormMessage />
                  </div>
                );
              }}
            />
            <FormField
              control={form.control}
              name={"password"}
              render={({ field }) => {
                return (
                  <div className="flex flex-col  py-1">
                    <Label className=" text-black text-sm"> Password: </Label>
                    <Input
                      type="password"
                      className="focus:border-[#e0e0e0] text-black"
                      {...field}
                    />
                    <FormMessage />
                  </div>
                );
              }}
            />
            <div className="flex justify-center pt-3.5">
              <Button className="bg-[#252b36] my-0.5 ">Log in</Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};
