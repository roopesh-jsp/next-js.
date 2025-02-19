"use server";

import { FormSchema, TForm } from "@/schemas/FormSchema";
import { resolve } from "path";

export async function FormAction(formData: TForm) {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const validData = FormSchema.safeParse(formData);
  if (validData.success) {
    console.log(validData);
  }
}
