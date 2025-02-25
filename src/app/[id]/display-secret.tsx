"use client";

import React from "react";
import { Button } from "~/components/ui/button";
import { EyeIcon } from "lucide-react";
import { deleteSecret } from "~/server/actions/secrets";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";

export default function DisplaySecret(props: {
  secret: {
    id: string;
    content: string;
  };
}) {
  const [showSecret, setShowSecret] = React.useState(false);

  return (
    <TooltipProvider>
      <section className={"flex flex-col gap-4"}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={async () => {
                setShowSecret(!showSecret);
                await deleteSecret(props.secret.id);
              }}
            >
              <EyeIcon />
              {showSecret ? "Hide" : "Show"} secret
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Note: the secret will be deleted upon viewing</p>
          </TooltipContent>
        </Tooltip>

        {showSecret && (
          <pre className={"rounded-xl bg-muted/50 p-4 shadow-md"}>
            {props.secret.content}
          </pre>
        )}
      </section>
    </TooltipProvider>
  );
}
