import { Github, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const AppIntro = () => {
  return (
    <div className="mb-8 space-y-4">
      <div className="space-y-2">
        <div className="flex items-center gap-2 justify-center lg:justify-start">
          <Sparkles className="h-8 w-8 text-primary" />
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Reviewizer AI
          </h1>
        </div>
        <p className="text-muted-foreground text-center lg:text-left">
          Get AI-powered summaries of Steam game reviews in seconds
        </p>
      </div>

      <div className="bg-card border border-border rounded-lg p-4 space-y-3">
        <p className="text-sm">
          Search up to <span className="font-semibold text-primary">3 Steam games</span> to get comprehensive AI summaries of their reviews, including positive and negative points.
        </p>
        <Button
          variant="outline"
          size="sm"
          className="w-full lg:w-auto"
          asChild
        >
          <a
            href="https://github.com/MiguelHigueraDev/reviewizer"
            target="_blank"
            rel="noreferrer"
          >
            <Github className="h-4 w-4" />
            View on GitHub
          </a>
        </Button>
      </div>
    </div>
  );
};

export default AppIntro;
