"use client";

import { useRouter } from "next/navigation";

interface loginButtonProps {
  children: React.ReactNode;
  mode?: "redirect" | "modal";
}

export default function LoginButton({
  children,
  mode = "redirect",
}: loginButtonProps) {
  const router = useRouter();
  function handleClick() {
    router.push("/auth/login");
  }

  if (mode == "modal") {
    return <span>todo : implement modal</span>;
  }

  return (
    <span onClick={handleClick} className="cursor-pointer">
      {children}
    </span>
  );
}
