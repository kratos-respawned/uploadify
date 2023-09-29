"use client";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";

import { useRef, useState } from "react";
type OAuthProviders = "github" | "google";
export function LoginContainer() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const OAuthLogin = async (provider: OAuthProviders) => {
    setIsLoading(true);
    try {
      await signIn(provider, {
        callbackUrl: "/",
      });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className=" max-w-sm w-full">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl text-center">Login</CardTitle>
        <CardDescription className="text-center">Enter your email below to login</CardDescription>
      </CardHeader>
      <CardContent className="">
        <Button
          disabled={isLoading}
          className="mx-auto flex"
          onClick={() => OAuthLogin("github")}
          variant="outline"
        >
          <GitHubLogoIcon className="mr-2 h-4 w-4" />
          Github
        </Button>
      </CardContent>
    </Card>
  );
}
