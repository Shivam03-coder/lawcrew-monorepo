"use client";

import React, { useState } from "react";
import clsx from "clsx";

const formNavs = ["Case Details", "Billing Details", "Opponent Details"];

interface AddCaseFormNavsProps {
  active: string;
  setActive: (active: string) => void;
}

const AddCaseFormSubNavsProps = ({
  active,
  setActive,
}: AddCaseFormNavsProps & {
  active: string;
  setActive: (active: string) => void;
}) => {
  return (
    <nav className="mb-5 w-full space-y-1 border-2 border-primary/15 p-3">
      {formNavs.map((item) => (
        <button
          key={item}
          onClick={() => setActive(item)}
          className={clsx(
            "flex w-full items-center justify-start gap-2 rounded-md px-4 py-3 text-sm font-medium transition-all",
            active === item
              ? "border-l-4 border-primary bg-primary/5 text-primary"
              : "text-muted-foreground hover:bg-accent hover:text-primary",
          )}
        >
          {item}
        </button>
      ))}
    </nav>
  );
};

export default AddCaseFormSubNavsProps;
