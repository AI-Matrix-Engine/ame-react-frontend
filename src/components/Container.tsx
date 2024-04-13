import type { FC, PropsWithChildren } from "react";
import React from "react";

const Container: FC<PropsWithChildren> = ({ children }) => {
  return <div className="flex flex-col max-w-[1440px] w-full mx-auto">{children}</div>;
};

export default Container;
