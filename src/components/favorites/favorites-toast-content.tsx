"use client";
import { CircleX, CircleCheck } from "lucide-react";
import { Fighter } from "@/types/rankings-schema.types";

type ToastToggleContentProps = {
  fighter: Fighter;
  actionType: "add" | "remove";
};

export const ToastToggleContent = ({
  fighter,
  actionType,
}: ToastToggleContentProps) => (
  <div className="flex items-center">
    {actionType === "remove" ? (
      <CircleX className="mr-2" />
    ) : (
      <CircleCheck className="mr-2" />
    )}
    <span>{`${fighter.name} ${
      actionType === "remove" ? "removed from" : "added to"
    } favorites!`}</span>
  </div>
);

export const ToastResetContent = () => (
  <div className="flex items-center">
    <CircleX className="mr-2" />
    <span>All fighters removed from favorites!</span>
  </div>
);
