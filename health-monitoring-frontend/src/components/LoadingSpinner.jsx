import { Activity } from "lucide-react";

export default function LoadingSpinner({ text = "Loading...", fullScreen = false }) {
  const content = (
    <div className="flex flex-col items-center justify-center gap-3">
      <Activity className="h-8 w-8 animate-pulse text-primary" />
      <p className="text-sm font-medium text-muted-foreground animate-pulse">{text}</p>
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
        {content}
      </div>
    );
  }

  return (
    <div className="flex w-full items-center justify-center p-8">
      {content}
    </div>
  );
}
