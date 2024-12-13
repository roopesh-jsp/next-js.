import React from "react";
export const generateMetadata = ({ params }) => {
  return {
    title: {
      // absolute: "hahah",
      default: `prd ${params.pid}`,
      default: `prd ${params.pid}`,
    },
  };
};
export default function page({ params }) {
  return <div>page no - - {params.pid}</div>;
}
