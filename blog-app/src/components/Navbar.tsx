"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

function Navbar() {
  const pathname = usePathname();
  console.log("pathname:", pathname);

  // Helper to conditionally add active styling
  const isActive = (path: string) => pathname === path;

  return (
    <nav className="flex justify-between items-center p-4 gap-4 bg-gray-800 text-white">
      <div>
        <h1 className="text-lg text-stone-200 font-semibold">My blog</h1>
      </div>
      <div className=" gap-4 text-stone-300 hidden sm:flex">
        <Link
          href="/"
          className={` hover:border-b-2 hover:border-stone-300 transition-all ${
            isActive("/") ? "border-stone-300 border-b-2" : ""
          }`}
        >
          home
        </Link>
        <Link
          href="/dashboard"
          className={`hover:border-b-2 hover:border-stone-300 transition-all ${
            isActive("/dashboard") ? "border-b-2 border-stone-300" : ""
          }`}
        >
          dashboard
        </Link>
        <Link
          href="/login"
          className={`hover:border-b-2 hover:border-stone-300 transition-all ${
            isActive("/login") ? "border-b-2 border-stone-300" : ""
          }`}
        >
          login
        </Link>
        <Link
          href="/signup"
          className={`hover:border-b-2 hover:border-stone-300 transition-all ${
            isActive("/signup") ? "border-b-2 border-stone-300" : ""
          }`}
        >
          signup
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
