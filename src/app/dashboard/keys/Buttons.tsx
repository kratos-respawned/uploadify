"use client";
import { experimental_useFormStatus as useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { ClipboardIcon, ClockIcon } from "@radix-ui/react-icons";
import { useState } from "react";

export const KeygenBtn = () => {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      disabled={pending}
      className=" max-sm:px-3 max-sm:py-2 max-sm:text-xs mb-5 ml-auto flex"
    >
      Revoke
    </Button>
  );
};

export const CopyKeyBtn = ({
  apiKey,
  secret,
}: {
  apiKey: string;
  secret: string;
}) => {
  const [copied, setCopied] = useState<boolean>(true);
  return (
    <Button
      onClick={() => {
        console.log("clicked");
        setCopied(false);
        navigator.clipboard
          .writeText(`API_KEY=${apiKey}\nAPI_SECRET=${secret}`)
          .then(() => {
            console.log("Copied to clipboard");
            setCopied(true);
          })
          .catch((err) => {
            console.log("Error: Could not copy text: ", err);
          });
      }}
      size={"icon"}
      disabled={!copied}
      variant={"outline"}
    >
      {copied ? <ClipboardIcon /> : <ClockIcon />}
    </Button>
  );
};
