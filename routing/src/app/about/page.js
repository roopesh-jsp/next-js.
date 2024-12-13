"use client";
import { useRouter } from "next/navigation";
import React from "react";
// export const metadata = {
//   title: "about",
// };
export default function Page() {
  const router = useRouter();
  function handelClick() {
    router.push("/");
  }
  return (
    <div>
      about us page
      <button onClick={handelClick}>click me !</button>
    </div>
  );
}
