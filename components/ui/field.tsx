"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface FieldProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: "horizontal" | "vertical";
}

export function Field({ 
  className, 
  orientation = "vertical", 
  children, 
  ...props 
}: FieldProps) {
  return (
    <div
      className={cn(
        "flex gap-2",
        orientation === "horizontal" ? "flex-row" : "flex-col",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
