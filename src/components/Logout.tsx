"use client";
import { signOut } from "next-auth/react";
import { Button } from "./ui/button";
import { DropdownMenuItem } from "./ui/dropdown-menu";

export const Logout = () => {
  return (
    <DropdownMenuItem
      onClick={() => signOut({ callbackUrl: "/" })}
      className="focus:bg-destructive/80"
    >
      Log out
    </DropdownMenuItem>
  );
};
