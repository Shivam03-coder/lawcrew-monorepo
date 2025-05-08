"use client";

import { ArrowBigDown, File, MapPin } from "lucide-react";
import React, { FC, useRef, useState } from "react";

const markers = Array.from({ length: 83 }, (_, i) => i);

const Ruler = () => {
  const [leftMargin, setLeftMargin] = useState(56);
  const [rightMargin, setRightMargin] = useState(56);
  const [isDraggingLeft, setIsDraggingLeft] = useState(false);
  const [isDraggingRight, setIsDraggingRight] = useState(false);

  const rulerRef = useRef<HTMLDivElement>(null);

  const handleLeftMouseDown = () => {
    setIsDraggingLeft(true);
  };
  const handleRightMouseDown = () => {
    setIsDraggingRight(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    const PAGE_WIDTH = 816;
    const MINIMUM_SPACE = 100;
    if (isDraggingLeft || isDraggingRight || rulerRef.current) {
      const container = rulerRef.current?.querySelector("#ruler-container");
      if (container) {
        const containerRect = container.getBoundingClientRect();
        const relativeX = e.clientX - containerRect.left;
        const rawPosition = Math.max(0, Math.min(816, relativeX));

        if (isDraggingLeft) {
          const maxLeftPosition = 816 - rightMargin - MINIMUM_SPACE;
          const newLeftPosition = Math.min(rawPosition, maxLeftPosition);
          setLeftMargin(newLeftPosition);
        } else if (isDraggingRight) {
          const maxRightPosition = 816 - (leftMargin + MINIMUM_SPACE);
          const newRightPosition = Math.max(816 - rawPosition, 0);
          const constrainedRightPosition = Math.min(
            newRightPosition,
            maxRightPosition,
          );
          setRightMargin(constrainedRightPosition);
        }
      }
    }
  };

  const handleMouseUp = () => {
    setIsDraggingLeft(false);
    setIsDraggingRight(false);
  };

  const handleLeftDoubleClick = () => {
    setLeftMargin(56);
  };
  const handleRightDoubleClick = () => {
    setRightMargin(56);
  };
  return (
    <div
      ref={rulerRef}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseMove}
      className="relative mx-auto mt-2 flex h-6 w-[816px] select-none items-end border-b border-gray-200 print:hidden"
    >
      <div
        id="ruler-container"
        className="relative mx-auto h-full w-full max-w-[816px]"
      >
        <div className="absolute inset-x-0 bottom-0 h-full">
          <Marker
            isLeft={true}
            position={leftMargin}
            isDragging={isDraggingLeft}
            onDoubleClick={handleLeftDoubleClick}
            onMouseDown={handleLeftMouseDown}
          />
          <Marker
            isLeft={false}
            position={rightMargin}
            isDragging={isDraggingRight}
            onDoubleClick={handleRightDoubleClick}
            onMouseDown={handleRightMouseDown}
          />
          <div className="relative h-full w-[816px]">
            {markers.map((marker) => {
              const position = (marker * 816) / 82;
              return (
                <div
                  className="absolute bottom-0"
                  style={{ left: `${position}px` }}
                  key={marker}
                >
                  {marker % 10 === 0 ? (
                    <>
                      <div className="absolute bottom-0 h-2 w-[1px] bg-primary/80" />
                      <span className="absolute bottom-2 -translate-x-1/2 transform text-[10px] text-primary/70">
                        {marker / 10 + 1}
                      </span>
                    </>
                  ) : marker % 5 === 0 ? (
                    <div className="absolute bottom-0 h-1.5 w-[1px] bg-primary/80" />
                  ) : (
                    <div className="absolute bottom-0 h-1 w-[1px] bg-primary/80" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ruler;

interface MarkerProps {
  position: number;
  isLeft: boolean;
  isDragging: boolean;
  onMouseDown: () => void;
  onDoubleClick: () => void;
}

export const Marker: FC<MarkerProps> = ({
  position,
  isLeft,
  isDragging,
  onMouseDown,
  onDoubleClick,
}) => {
  return (
    <div
      className={`absolute top-0 z-[5] h-6 w-6 cursor-ew-resize ${isDragging ? "opacity-80" : ""}`}
      onMouseDown={onMouseDown}
      onDoubleClick={onDoubleClick}
      style={{
        [isLeft ? "left" : "right"]: 0,
        transform: `translateX(${isLeft ? position : -position}px)`,
      }}
    >
      <MapPin
        size={20}
        className={`absolute top-0 h-full w-full ${isLeft ? "text-blue-600" : "text-red-600"}`}
        fill="currentColor"
      />
      <div
        className="absolute left-1/2 top-4 -translate-x-1/2 transform transition-opacity duration-150"
        style={{
          height: "100vh",
          width: "1px",
          transform: "scaleX(0.5)",
          backgroundColor: "darkblue",
          display: isDragging ? "block" : "none",
        }}
      />
    </div>
  );
};
