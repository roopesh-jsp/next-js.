import React from "react";

export default function RootLayout({ children, analytics, settings }) {
  return (
    <div>
      RootLayout
      {children}
      {analytics}
      {settings}
    </div>
  );
}
