"use client";

import { Button } from "@/components/ui/button";
import { ClipboardIcon, ClockIcon } from "@radix-ui/react-icons";
import { useState } from "react";
export const Keys = ({
  api_key,
  secret,
}: {
  api_key: string;
  secret: string;
}) => {
  const [copied, setCopied] = useState<boolean>(true);
  return (
    <div className="bg-black  px-5 py-4 rounded-lg ">
      <div className="pb-4 flex justify-between items-center">
        <p>.env.local</p>
        <Button
          onClick={() => {
            console.log("clicked");
            setCopied(false);
            navigator.clipboard
              .writeText(`API_KEY=${api_key}\nAPI_SECRET=${secret}`)
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
      </div>
      <div className="pb-1 text-primary">
        <span className="mr-2">$</span>API_KEY:
        <span className="ml-3 text-white">{api_key?.slice(0, 30) + "..."}</span>
      </div>
      <div className="text-primary">
        <span className="mr-2">$</span>API_SECRET:
        <span className="ml-3 text-white">{secret?.slice(0, 30) + "..."}</span>
      </div>
    </div>
  );
};
