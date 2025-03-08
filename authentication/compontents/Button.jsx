"use client";
import React from "react";
import { useFormStatus } from "react-dom";

export function Button({ children, pending }) {
  return (
    <button
      disabled={pending}
      className="px-5 py-2 capitalize bg-black font-semibold w-fit rounded-lg shadow-2xl cursor-pointer transition-all hover:rounded-xl mx-auto mt-5"
    >
      {pending ? "pending..." : children}
    </button>
  );
}
