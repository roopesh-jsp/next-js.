import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import React from "react";

async function page() {
  const session = await auth();
  return (
    <div>
      {JSON.stringify(session)}
      <form
        className="mx-auto w-fit mt-10 capitalize"
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <Button className="capitalize cursor-pointer" type="submit">
          sign out
        </Button>
      </form>
    </div>
  );
}

export default page;
