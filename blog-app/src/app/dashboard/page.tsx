"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export const zformSchema = z.object({
  title: z.string().trim().min(2, {
    message: "title must be at least 2 characters.",
  }),
  description: z.string().trim().min(10, {
    message: "description must be at least 10 characters",
  }),
  image: z
    .instanceof(File)
    .refine((file) => file.size > 0, "Image file is required"),
});

export type formSchema = z.infer<typeof zformSchema>;

export default function ProfileForm() {
  const router = useRouter();
  const form = useForm<formSchema>({
    resolver: zodResolver(zformSchema),
    defaultValues: {
      title: "",
    },
  });
  const onSubmit = async (data: formSchema) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("image", data.image);

    try {
      const res = await fetch("/api/post", {
        method: "POST",
        body: formData,
      });

      const result = await res.json();
      if (result.success) {
        toast.success(result.message);
        form.reset();
        router.push("/");
      } else {
        toast.error(result.error || "Something went wrong");
      }
    } catch (err) {
      console.error("Post creation failed:", err);
      toast.error("Something went wrong");
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 max-w-[500px] mx-auto my-5 border p-4 rounded-lg shadow-md"
      >
        <div className="flex flex-col ">
          <h2 className="text-2xl font-bold capitalize">post</h2>
          <p className="text-sm text-muted-foreground font-light">
            add new post
          </p>
        </div>
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>title</FormLabel>
              <FormControl>
                <Input placeholder="title" {...field} />
              </FormControl>

              {form.formState.errors.title?.message ? (
                <p className="text-red-500  font-light text-sm">
                  {form.formState.errors.title.message}
                </p>
              ) : null}
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>description</FormLabel>
              <FormControl>
                <Input placeholder="description" {...field} />
              </FormControl>

              {form.formState.errors.description?.message ? (
                <p className="text-red-500  font-light text-sm">
                  {form.formState.errors.description.message}
                </p>
              ) : null}
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image</FormLabel>
              <FormControl>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    field.onChange(e.target.files?.[0]);
                  }}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
                     file:rounded-md file:border-0
                     file:text-sm file:font-semibold
                     file:bg-stone-100 file:text-stone-700
                     hover:file:bg-violet-100"
                />
              </FormControl>

              {form.formState.errors.image?.message && (
                <p className="text-red-500 font-light text-sm">
                  {form.formState.errors.image.message}
                </p>
              )}
            </FormItem>
          )}
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
