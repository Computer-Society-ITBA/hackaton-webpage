import React from "react";
import dynamic from "next/dynamic";

const NoSSR = ({ children }) => {
  return <>{children}</>;
};

export default dynamic(() => Promise.resolve(NoSSR), { ssr: false });
