import Link from "next/link";
import React from "react";

export default function page() {
  return (
    <div>
      {" "}
      <h1>list of products ...</h1>
      <div className="flex flex-col mx-10 my-5">
        <Link href="/products/1">prd 1</Link>
        <Link href="/products/2">prd 2</Link>
        <Link href="/products/3">prd 3</Link>
      </div>
    </div>
  );
}
