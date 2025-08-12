"use client";
import React from "react";
import { Button } from "../ui/button";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { signIn } from "next-auth/react";
import { defalut_redirect } from "@/routes";

function Social() {
  const onClick = (provider: "google" | "github") => {
    signIn(provider, {
      callbackUrl: defalut_redirect,
    });
  };
  return (
    <div className=" flex items-center gap-x-2 w-full mt-5">
      <Button
        onClick={() => onClick("google")}
        size="lg"
        variant={"outline"}
        className="w-[50%] cursor-pointer"
      >
        <FaGoogle className="h-5 w-5" />
      </Button>
      <Button
        size="lg"
        onClick={() => onClick("github")}
        variant={"outline"}
        className="w-[50%] cursor-pointer"
      >
        <FaGithub className="h-5 w-5" />
      </Button>
    </div>
  );
}

export default Social;
