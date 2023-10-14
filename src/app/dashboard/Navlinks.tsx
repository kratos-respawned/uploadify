"use client";
import { BackpackIcon, FileIcon, LockOpen1Icon } from "@radix-ui/react-icons";
import Link from "next/link";
import { Navlinks } from "./layout";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export const Navlink = ({ name, url }: { name: Navlinks; url: string }) => {
  const path = usePathname();
  const Icon = ({ name }: { name: Navlinks }) => {
    switch (name) {
      case "Files":
        return <FileIcon className="w-4 h-4" />;
      case "API Keys":
        return <LockOpen1Icon className="w-4 h-4" />;
      case "Billing":
        return <BackpackIcon className="w-4 h-4" />;
      default:
        return <FileIcon className="w-4 h-4" />;
    }
  };
  const isActive = path === url;
  return (
    <Link
      href={url}
      className={cn(
        "flex gap-2  items-center px-3 py-2 rounded-lg",
        isActive && "bg-primary "
      )}
    >
      <Icon name={name} />
      {name}
    </Link>
  );
};
