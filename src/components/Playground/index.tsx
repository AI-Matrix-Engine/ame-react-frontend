"use client";
import React, { useState, useEffect } from "react";
import { LeftSidebar } from "./leftsidebar";
import { PromptSection } from "./promptSection";
import { ResponseSection } from "./responseSection";

const Playground = () => {
  const [sectionWidths, setSectionWidths] = useState<number[]>([50, 50]);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [draggingIndex, setDraggingIndex] = useState<number | null>(null);
  const [initialX, setInitialX] = useState<number>(0);

  const handleMouseDown = (
    index: number,
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    setIsDragging(true);
    setDraggingIndex(index);
    setInitialX(event.clientX);
  };

  const handleMouseMove = (event: MouseEvent) => {
    if (!isDragging || draggingIndex === null) return;

    const deltaX = event.clientX - initialX;

    // Calculate the new width for the dragging div
    const newWidths = [...sectionWidths];
    newWidths[draggingIndex] += (deltaX / window.innerWidth) * 100;

    // Distribute the change in width to the adjacent divs
    if (draggingIndex > 0) {
      const change = (deltaX / window.innerWidth) * 100;
      newWidths[draggingIndex - 1] -= change;
    }
    if (draggingIndex < sectionWidths.length - 1) {
      const change = (deltaX / window.innerWidth) * 100;
      newWidths[draggingIndex + 1] -= change;
    }

    setInitialX(event.clientX);
    setSectionWidths(newWidths);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setDraggingIndex(null);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    } else {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);
  return (
    <div className="bg-white container-height flex">
      <LeftSidebar />
      <div className="flex container-height w-full">
        {sectionWidths.map((width, index) =>
          index === 0 ? (
            <PromptSection
              key={index}
              index={index}
              width={width}
              isResizable={index < 1}
              onMouseDown={handleMouseDown}
            />
          ) : (
            <ResponseSection
              key={index}
              index={index}
              width={width}
              isResizable={index < 1}
              onMouseDown={handleMouseDown}
            />
          )
        )}
      </div>
    </div>
  );
};

export default Playground;
