"use client";
import { logoutAction } from "@/actions/auth.actions";
import { usePathname } from "next/navigation";

import Link from "next/link";
import { useState } from "react";
function NavLinks({ user }: any) {
  const pathname = usePathname();
  const [userData, setUserData] = useState(user);
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
        {!userData ? (
          <Link
            href="/login"
            className={`hover:border-b-2 hover:border-stone-300 transition-all ${
              isActive("/login") ? "border-b-2 border-stone-300" : ""
            }`}
          >
            login
          </Link>
        ) : (
          <Link
            href="/"
            onClick={() => {
              setUserData(null);
              logoutAction();
            }}
            className={`hover:border-b-2 hover:border-red-300 transition-all `}
          >
            logout
          </Link>
        )}
      </div>
    </nav>
  );
}

export default NavLinks;
