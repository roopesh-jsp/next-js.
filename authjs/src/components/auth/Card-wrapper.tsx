import React from "react";
import { Card, CardFooter } from "../ui/card";
import Header from "./Header";
import Social from "./Social";
import Link from "next/link";

interface props {
  children: React.ReactNode;
  headerLabel: string;
  backButtonLabel: string;
  backButtonUrl: string;
  showSocial?: boolean;
}
function Cardwrapper({
  children,
  headerLabel,
  backButtonLabel,
  backButtonUrl,
  showSocial = true,
}: props) {
  return (
    <Card className="w-[400px] shadow-md p-4">
      <Header label={headerLabel} />
      {children}
      {showSocial && (
        <CardFooter>
          <Social />
        </CardFooter>
      )}
      <button className="text-sm underline">
        <Link href={backButtonUrl}> {backButtonLabel}</Link>
      </button>
    </Card>
  );
}

export default Cardwrapper;
