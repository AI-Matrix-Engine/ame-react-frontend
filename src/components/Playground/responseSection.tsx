"use client";
import React from "react";

export const ResponseSection = ({ width, index, isResizable, onMouseDown }: any) => {
  return (
    <div
      className={`overflow-auto relative text-white p-2 ${index === 1 && "border border-zinc-200"} `}
      style={{
        width: `${width}%`,
      }}
    >
      Response
      {isResizable && (
        <div
          style={{
            position: "absolute",
            right: 0,
            top: 0,
            bottom: 0,
            width: "5px",
            cursor: "col-resize",
          }}
          onMouseDown={(e) => onMouseDown(index, e)}
        />
      )}
    </div>
  );
};
