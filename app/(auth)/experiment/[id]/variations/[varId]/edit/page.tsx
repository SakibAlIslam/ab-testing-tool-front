"use client";

import { Button } from "@/src/components/ui/button";
import { Label } from "@/src/components/ui/label";
import { Textarea } from "@/src/components/ui/textarea";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";

const mockVariations: Record<string, { name: string; js: string; css: string }> = {
  "var-0": {
    name: "Control",
    js: "// Control - no changes",
    css: "/* Control - no changes */",
  },
  "var-1": {
    name: "Variation A",
    js: "// Change banner text and CTA\ndocument.querySelector('.hero-title').textContent = 'New Feature Launched!';\ndocument.querySelector('.cta-button').textContent = 'Get Started Now';",
    css: ".hero-title {\n  color: hsl(51, 100%, 60%);\n  font-size: 3rem;\n}\n\n.cta-button {\n  background: hsl(51, 100%, 60%);\n  color: hsl(220, 13%, 9%);\n}",
  },
};

export default function EditVariation() {
  const params = useParams();
  const router = useRouter();
  
  const varId = params?.varId as string;
  const variation = mockVariations[varId || "var-0"];

  const handleSave = () => {
    // Save logic here
    router.back();
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.back()}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h2 className="text-2xl font-bold">Edit {variation?.name || "Variation"}</h2>
          <p className="text-muted-foreground mt-1">
            Define code changes for this variation
          </p>
        </div>
      </div>

      <div className="space-y-6 border border-border rounded-lg p-6 bg-card">
        <div className="space-y-2">
          <Label htmlFor="js-code">JavaScript</Label>
          <Textarea
            id="js-code"
            className="font-mono text-sm bg-code-bg min-h-[300px]"
            placeholder="// Add your variation-specific JavaScript here"
            defaultValue={variation?.js}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="css-code">CSS</Label>
          <Textarea
            id="css-code"
            className="font-mono text-sm bg-code-bg min-h-[300px]"
            placeholder="/* Add your variation-specific CSS here */"
            defaultValue={variation?.css}
          />
        </div>

        <div className="flex gap-2 pt-4">
          <Button onClick={handleSave} className="flex-1">
            Save Variation
          </Button>
          <Button
            variant="outline"
            onClick={() => router.back()}
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}
