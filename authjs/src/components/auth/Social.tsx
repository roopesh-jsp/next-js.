import React from "react";
import { Button } from "../ui/button";
import { FaGithub, FaGoogle } from "react-icons/fa";

function Social() {
  return (
    <div className=" flex items-center gap-x-2 w-full mt-5">
      <Button size="lg" variant={"outline"} className="w-[50%] cursor-pointer">
        <FaGoogle className="h-5 w-5" />
      </Button>
      <Button size="lg" variant={"outline"} className="w-[50%] cursor-pointer">
        <FaGithub className="h-5 w-5" />
      </Button>
    </div>
  );
}

export default Social;
