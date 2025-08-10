import { CheckCircleIcon } from "lucide-react";
import React from "react";
import { BsExclamationTriangleFill } from "react-icons/bs";

function FormSuccess({ message }: { message: string }) {
  if (!message) return null;
  return (
    <div className="bg-emerald-500/15 px-5 py-3  rounded-md flex items-center gap-x-2 tet-sm text-emerald-500">
      <CheckCircleIcon className="h-4 w-4" />
      <p>{message}</p>
    </div>
  );
}

export default FormSuccess;
