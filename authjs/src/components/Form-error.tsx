import React from "react";
import { BsExclamationTriangleFill } from "react-icons/bs";

function FormError({ message }: { message: string | undefined }) {
  if (!message) return null;
  return (
    <div className="bg-destructive/15 px-5 py-3  rounded-md flex items-center gap-x-2 tet-sm text-destructive">
      <BsExclamationTriangleFill className="h-4 w-4" />
      <p>{message}</p>
    </div>
  );
}

export default FormError;
