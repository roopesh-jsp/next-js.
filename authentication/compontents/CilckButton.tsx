"use client";
import React from "react";

function CilckButton({
  children,
  click,
}: {
  children: React.ReactNode;
  click: () => void;
}) {
  return <button onClick={click}>{children}</button>;
}

export default CilckButton;
