"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { Textarea } from "@/src/components/ui/textarea";
import { Card, CardContent } from "@/src/components/ui/card";
import { Check } from "lucide-react";
import { cn } from "@/src/lib/utils";

const experimentTypes = [
  {
    id: "ab",
    title: "A/B Test",
    description: "Compare two or more versions of a page.",
  },
  {
    id: "personalization",
    title: "Personalization",
    description: "Target specific visitors with a unique experience.",
  },
  {
    id: "split-url",
    title: "Split URL",
    description: "Redirect traffic to different URLs.",
  },
  {
    id: "redirect",
    title: "Redirect",
    description: "Simple redirect test.",
  },
];

export default function CreateExperiment() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedType, setSelectedType] = useState<string>("ab");

  const handleCreate = () => {
    // Generate a new experiment ID (in real app, this would come from backend)
    const newExpId = `exp-${Date.now()}`;
    
    // Redirect to the configuration page of the new experiment
    router.push(`/experiment/${newExpId}/configuration`);
  };

  return (
    <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center">
      <div className="w-full max-w-2xl space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Create new experiment</h1>
          <p className="text-muted-foreground mt-2">
            Set up a new experiment to optimize your website
          </p>
        </div>

        <div className="space-y-6">
          {/* Experiment Name */}
          <div className="space-y-2">
            <Label htmlFor="exp-name" className="text-base">
              Experiment Name
            </Label>
            <Input
              id="exp-name"
              placeholder="e.g., Homepage Banner Test"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="h-12 text-base focus-visible:ring-primary"
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="exp-description" className="text-base">
              Description (Optional)
            </Label>
            <Textarea
              id="exp-description"
              placeholder="Describe the purpose of this experiment..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="text-base"
            />
          </div>

          {/* Experiment Type */}
          <div className="space-y-3">
            <Label className="text-base">
              What type of experiment do you want to run?
            </Label>
            <div className="grid grid-cols-2 gap-4">
              {experimentTypes.map((type) => (
                <Card
                  key={type.id}
                  className={cn(
                    "cursor-pointer transition-all hover:border-primary/50",
                    selectedType === type.id
                      ? "border-primary border-2 bg-primary/5"
                      : "border-border"
                  )}
                  onClick={() => setSelectedType(type.id)}
                >
                  <CardContent className="p-4 relative">
                    {selectedType === type.id && (
                      <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                        <Check className="h-3 w-3 text-background" />
                      </div>
                    )}
                    <h3 className="font-semibold mb-1">{type.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {type.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 pt-4">
          <Button
            variant="outline"
            onClick={() => router.push("/experiments")}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            onClick={handleCreate}
            disabled={!name.trim()}
            className="flex-1 glow-effect"
          >
            Create Experiment
          </Button>
        </div>
      </div>
    </div>
  );
}
