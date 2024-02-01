"use client";
import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
// import { variables } from "../UIFactory/Data.";
import { Input } from "../UI";
export const Form = () => {
  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  return (
    <div className="pl-4">
      <h1>Anywhere in your app!</h1>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <form onSubmit={handleSubmit} className="flex gap-2 items-center ">
            <div className="flex flex-col">
                
              <Input
                element="Enter Your Email"
                type="email"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                className="border-2 border-black"
              />
              {/* <label>Email</label>
          <input
            type="email"
            name="email"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.email}
            className="border-2 border-black"
          /> */}
              {errors.email && touched.email && errors.email}
            </div>

            <div className="flex flex-col">
            <Input
                element="Enter Your Password"
                type="password"
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                className="border-2 border-black"
              /> 
              {/* <label>Password</label>
              <input
                type="password"
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                className="border-2 border-black"
              /> */}
              {errors.password && touched.password && errors.password}
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-black text-white w-[60px] h-[40px]"
            >
              Submit
            </button>
          </form>
        )}
      </Formik>
    </div>
  );
};
