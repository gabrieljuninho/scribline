/* eslint-disable @typescript-eslint/no-unused-expressions */
"use client";

import { useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";

import { FaGithub } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";

import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

import { usePending } from "@/stores/pending";

import { Button } from "@/components/ui/button";

const Social = () => {
  const { isPending } = usePending();

  const urlParams = useSearchParams();
  const callBackUrl = urlParams.get("callbackUrl");

  const handleClick = (provider: "google" | "github") => {
    signIn(provider), { callbackUrl: callBackUrl || DEFAULT_LOGIN_REDIRECT };
  };

  return (
    <div className="flex flex-col gap-4">
      <Button
        variant="outline"
        className="w-full hover:bg-secondary/80"
        onClick={() => handleClick("google")}
        disabled={isPending}
      >
        <FcGoogle className="h-5 w-5" />
        <span>Sign in with with Google</span>
      </Button>
      <Button
        variant="outline"
        className="w-full hover:bg-secondary/80"
        onClick={() => handleClick("github")}
        disabled={isPending}
      >
        <FaGithub className="h-5 w-5" />
        <span>Sign in with with Github</span>
      </Button>
    </div>
  );
};

export default Social;
