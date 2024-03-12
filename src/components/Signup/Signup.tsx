"use client";
import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input, Label, FormField, FormMessage, Form, Button } from "../UI";
import { Half2Icon } from "@radix-ui/react-icons";
import { auth, db } from "../../../firebaseConfig";
import { getDatabase, ref, set } from "firebase/database";
const formSchema = z
  .object({
    firstName: z
      .string()
      .min(2, {
        message: "First Name must be at least 2 characters",
      })
      .max(15, {
        message: "First Name should be less than 15 charadters",
      }),
    lastName: z
      .string()
      .min(2, {
        message: "Last Name must be at least 2 characters",
      })
      .max(15, {
        message: "Last Name should be less than 15 characters",
      }),
    email: z.string().email("This is not a valid email."),
    createPassword: z.string().min(2, {
      message: "Password must be at least 2 characters.",
    }),
    confirmPassword: z.string(),
  })
  .superRefine(({ confirmPassword, createPassword }, ctx) => {
    if (confirmPassword !== createPassword) {
      console.log("Hi");

      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "The passwords did not match",
        path: ["confirmPassword"],
      });
    }
  });

export const Signup = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      createPassword: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values) {
    alert(
      `Your First Name is ${values.firstName} and Your Email is ${values.email}`
    );
  
    await set(ref(db, "users"), {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      password: values.createPassword,
    });
    alert("Data Added successfully");
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
              name={"firstName"}
              render={({ field }) => {
                return (
                  <div className="flex flex-col py-1 ">
                    <Label className=" text-black  text-sm">First Name: </Label>
                    <Input
                      type="input"
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
              name={"lastName"}
              render={({ field }) => {
                return (
                  <div className="flex flex-col py-1">
                    <Label className=" text-black text-sm">Last Name: </Label>
                    <Input
                      type="input"
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
              name={"createPassword"}
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
            <FormField
              control={form.control}
              name={"confirmPassword"}
              render={({ field }) => {
                return (
                  <div className="flex flex-col  py-1">
                    <Label className=" text-black text-sm">
                      {" "}
                      Confirm Password:{" "}
                    </Label>
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
              <Button className="bg-[#252b36] my-0.5">
                Sign Up
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};
