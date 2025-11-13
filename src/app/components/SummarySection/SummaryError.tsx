// Returned when summary is generated, mainly because of inappropriate reviews or lack of them.
import { AlertCircle, ExternalLink } from "lucide-react";
import React from "react";
import { Button } from "@/components/ui/button";

const SummaryError = ({ error }: { error: Error }) => {
  return (
    <div className="bg-card border border-destructive/50 rounded-lg p-8 min-h-[400px] flex flex-col items-center justify-center gap-6 text-center">
      <div className="rounded-full bg-destructive/10 p-4">
        <AlertCircle className="h-12 w-12 text-destructive" />
      </div>

      <div className="space-y-2 max-w-md">
        <h3 className="font-semibold text-lg">Unable to Generate Summary</h3>
        <p className="text-sm text-muted-foreground">
          {error.message}
        </p>
      </div>

      <div className="bg-muted/50 rounded-lg p-4 max-w-md">
        <p className="text-xs text-muted-foreground">
          This usually happens due to insufficient reviews or inappropriate content.
          You can try generating the summary again, or check the game&apos;s reviews
          directly on Steam.
        </p>
      </div>

      <Button variant="outline" size="sm" asChild>
        <a
          href="https://store.steampowered.com"
          target="_blank"
          rel="noreferrer"
        >
          <ExternalLink className="h-4 w-4" />
          View on Steam
        </a>
      </Button>
    </div>
  );
};

export default SummaryError;
