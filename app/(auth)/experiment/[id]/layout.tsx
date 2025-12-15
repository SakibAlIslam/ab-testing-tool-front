"use client";

import React, { useState, useEffect } from "react";
import { ExperimentSidebar } from "@/src/components/ExperimentSidebar";
import { Button } from "@/src/components/ui/button";
import { Badge } from "@/src/components/ui/badge";
import { Eye, Play, Pause } from "lucide-react";
import { PreviewModal } from "@/src/components/PreviewModal";

const mockExperiment = {
  id: "exp-001",
  name: "Homepage Banner Test",
  status: "active" as const,
};

const mockVariations = [
  { id: "var-0", name: "Control" },
  { id: "var-1", name: "Variation A" },
  { id: "var-2", name: "Variation B" },
];

export default function ExperimentLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}) {
  const [experimentId, setExperimentId] = useState<string>("");
  const [previewOpen, setPreviewOpen] = useState(false);

  React.useEffect(() => {
    params.then((p) => setExperimentId(p.id));
  }, [params]);

  if (!experimentId) {
    return null; // or a loading spinner
  }

  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-3xl font-bold tracking-tight">{mockExperiment.name}</h1>
          <Badge
            variant="outline"
            className={
              mockExperiment.status === "active"
                ? "bg-success/20 text-success border-success/30"
                : "bg-warning/20 text-warning border-warning/30"
            }
          >
            {mockExperiment.status === "active" ? (
              <Play className="h-3 w-3 mr-1" />
            ) : (
              <Pause className="h-3 w-3 mr-1" />
            )}
            {mockExperiment.status}
          </Badge>
        </div>

        <Button
          className="gap-2"
          onClick={() => setPreviewOpen(true)}
        >
          <Eye className="h-4 w-4" />
          Preview
        </Button>
      </div>

      <div className="flex gap-6">
        <ExperimentSidebar experimentId={experimentId} />
        
        <div className="flex-1">
          {children}
        </div>
      </div>

      <PreviewModal
        open={previewOpen}
        onOpenChange={setPreviewOpen}
        experimentId={experimentId}
        variations={mockVariations}
      />
    </>
  );
}
