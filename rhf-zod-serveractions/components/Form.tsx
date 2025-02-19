"use client";
import { FormAction } from "@/actions/FormActions";
import { FormSchema, TForm } from "@/schemas/FormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";

function Form() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(FormSchema),
    mode: "onBlur",
  });

  async function onSubmit(formData: TForm) {
    console.log(formData);
    await FormAction(formData);
    reset();
  }
  console.log(errors);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-5 mx-auto w-72 rounded-xl shadow-md border-black my-4 bg-slate-100 p-5"
    >
      <input
        type="text"
        {...register("name")}
        placeholder="name"
        className="border-black px-3 py-1 rounded-sm
"
      />
      {errors?.name ? (
        <div className=" text-red-500 font-semibold text-lg">
          {errors.name?.message}
        </div>
      ) : (
        <></>
      )}

      <input
        type="email"
        {...register("email")}
        placeholder="email"
        className="border-black px-3 py-1 rounded-sm
"
      />
      {errors?.email ? (
        <div className=" text-red-500 font-semibold text-lg">
          {errors.email?.message}
        </div>
      ) : (
        <></>
      )}
      <input
        type="password"
        {...register("password")}
        placeholder="password"
        className="border-black px-3 py-1 rounded-sm
"
      />
      {errors?.password ? (
        <div className=" text-red-500 font-semibold text-lg">
          {errors.password?.message}
        </div>
      ) : (
        <></>
      )}
      <button
        disabled={isSubmitting}
        className="px-5 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700"
      >
        {isSubmitting ? "submitting ... " : "submit"}
      </button>
    </form>
  );
}

export default Form;
