import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Copy, Check } from "lucide-react";
import { useState } from "react";
import { toast } from "../hooks/use-toast";

interface PreviewModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  experimentId: string;
  variations: Array<{ id: string; name: string }>;
}

export function PreviewModal({
  open,
  onOpenChange,
  experimentId,
  variations,
}: PreviewModalProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const generatePreviewUrl = (varId: string) => {
    return `${window.location.origin}?exp_id=${experimentId}&var_id=${varId}`;
  };

  const copyToClipboard = (url: string, varId: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(varId);
    toast({
      title: "Link copied!",
      description: "Preview URL copied to clipboard",
    });
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Preview Links</DialogTitle>
          <DialogDescription>
            Copy these URLs to preview each variation of your experiment
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3 mt-4">
          {variations.map((variation) => {
            const url = generatePreviewUrl(variation.id);
            const isCopied = copiedId === variation.id;

            return (
              <div
                key={variation.id}
                className="flex items-center justify-between gap-4 p-4 rounded-lg border border-border bg-card"
              >
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm mb-1">{variation.name}</p>
                  <p className="text-xs text-muted-foreground truncate font-mono">
                    {url}
                  </p>
                </div>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => copyToClipboard(url, variation.id)}
                  className="shrink-0"
                >
                  {isCopied ? (
                    <Check className="h-4 w-4 text-success" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
}
