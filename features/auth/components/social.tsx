"use client";

import { FaGithub } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";

import { usePending } from "@/stores/pending";

import { Button } from "@/components/ui/button";

const Social = () => {
  const { isPending } = usePending();

  return (
    <div className="flex flex-col gap-4">
      <Button
        variant="outline"
        className="w-full hover:bg-secondary/80"
        disabled={isPending}
      >
        <FcGoogle className="h-5 w-5" />
        <span>Sign in with with Google</span>
      </Button>
      <Button
        variant="outline"
        className="w-full hover:bg-secondary/80"
        disabled={isPending}
      >
        <FaGithub className="h-5 w-5" />
        <span>Sign in with with Github</span>
      </Button>
    </div>
  );
};

export default Social;
