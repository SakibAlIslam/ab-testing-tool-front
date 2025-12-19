"use client";

import { Button } from "@/src/components/ui/button";
import { Label } from "@/src/components/ui/label";
import { CodeEditor } from "@/src/components/ui/code-editor";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/src/components/ui/tabs";
import { ArrowLeft, RefreshCw, Save } from "lucide-react";
import { useRouter, useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

// Types for API responses
interface Experiment {
  id: string;
  name: string;
  targetUrl: string;
}

interface Variation {
  id: string;
  name: string;
  css: string;
  js: string;
}

// API functions
const fetchExperiment = async (experimentId: string): Promise<Experiment> => {
  const response = await fetch(`/api/experiments/${experimentId}`);
  if (!response.ok) {
    throw new Error('Failed to fetch experiment');
  }
  return response.json();
};

const fetchVariation = async (variationId: string): Promise<Variation> => {
  const response = await fetch(`/api/variations/${variationId}`);
  if (!response.ok) {
    throw new Error('Failed to fetch variation');
  }
  return response.json();
};

const updateVariation = async ({ variationId, css, js }: { variationId: string; css: string; js: string }) => {
  const response = await fetch(`/api/variations/${variationId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ css, js }),
  });
  
  if (!response.ok) {
    throw new Error('Failed to update variation');
  }
  
  return response.json();
};

export default function EditVariation() {
  const params = useParams();
  const router = useRouter();
  const queryClient = useQueryClient();
  
  const experimentId = params?.id as string;
  const variationId = params?.varId as string;
  
  // State for form fields
  const [cssCode, setCssCode] = useState("");
  const [jsCode, setJsCode] = useState("");
  const [isDirty, setIsDirty] = useState(false);
  const [iframeKey, setIframeKey] = useState(0);
  
  // Fetch experiment data
  const { data: experiment, isLoading: experimentLoading, error: experimentError } = useQuery({
    queryKey: ['experiment', experimentId],
    queryFn: () => fetchExperiment(experimentId),
    enabled: !!experimentId,
  });
  
  // Fetch variation data
  const { data: variation, isLoading: variationLoading, error: variationError } = useQuery({
    queryKey: ['variation', variationId],
    queryFn: () => fetchVariation(variationId),
    enabled: !!variationId,
  });
  
  // Initialize form data when variation loads
  useEffect(() => {
    if (variation) {
      setCssCode(variation.css || "");
      setJsCode(variation.js || "");
    }
  }, [variation]);
  
  // Update variation mutation
  const updateMutation = useMutation({
    mutationFn: updateVariation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['variation', variationId] });
      setIsDirty(false);
      toast.success("Variation saved successfully!");
    },
    onError: (error: Error) => {
      toast.error(`Failed to save variation: ${error.message}`);
    },
  });
  
  // Handle form changes
  const handleCssChange = (value: string) => {
    setCssCode(value);
    setIsDirty(true);
  };
  
  const handleJsChange = (value: string) => {
    setJsCode(value);
    setIsDirty(true);
  };
  
  // Handle save
  const handleSave = async () => {
    if (!variationId) return;
    
    updateMutation.mutate({
      variationId,
      css: cssCode,
      js: jsCode,
    });
  };
  
  // Handle preview refresh
  const handleRefreshPreview = () => {
    setIframeKey(prev => prev + 1);
  };
  
  // Always show the editor, only show loading state for the preview
  const previewUrl = `/editor/preview?experimentId=${experimentId}&variationId=${variationId}`;
  const hasDataError = experimentError || variationError;
  
  return (
    <div className="space-y-6 max-w-6xl">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.back()}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div className="flex-1">
          <h2 className="text-2xl font-bold">Edit {variation?.name || "Variation"}</h2>
          {/* <p className="text-muted-foreground mt-1">
            Experiment: {experiment?.name} • Target: {experiment?.targetUrl}
          </p> */}
        </div>
      </div>

      {/* Code Editor Section with Tabs */}
      <div className="border border-border rounded-lg bg-card">
        <Tabs defaultValue="css" className="w-full">
          <div className="px-6 pt-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="css">CSS</TabsTrigger>
              <TabsTrigger value="javascript">JavaScript</TabsTrigger>
            </TabsList>
          </div>
          
          <div className="p-6 pt-4">
            <TabsContent value="css" className="mt-0">
              <div className="space-y-2">
                <Label htmlFor="css-code">CSS Code</Label>
                <CodeEditor
                  language="css"
                  value={cssCode}
                  onChange={handleCssChange}
                  height="350px"
                  placeholder="/* Add your variation-specific CSS here */"
                />
              </div>
            </TabsContent>
            
            <TabsContent value="javascript" className="mt-0">
              <div className="space-y-2">
                <Label htmlFor="js-code">JavaScript Code</Label>
                <CodeEditor
                  language="javascript"
                  value={jsCode}
                  onChange={handleJsChange}
                  height="350px"
                  placeholder="// Add your variation-specific JavaScript here"
                />
              </div>
            </TabsContent>
          </div>
        </Tabs>
        
        {/* Action Buttons */}
        <div className="px-6 pb-6">
          <div className="flex gap-2 pt-4 border-t border-border">
            <Button 
              onClick={handleSave} 
              className="flex-1"
              disabled={!isDirty || updateMutation.isPending}
            >
              {updateMutation.isPending ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Save Variation
                </>
              )}
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

      {/* Preview Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Preview</h3>
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefreshPreview}
            className="gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            Refresh Preview
          </Button>
        </div>
        
        <div className="border border-border rounded-lg bg-card overflow-hidden">
          <div className="bg-muted px-4 py-2 border-b border-border">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-destructive"></div>
              <div className="w-3 h-3 rounded-full bg-warning"></div>
              <div className="w-3 h-3 rounded-full bg-success"></div>
              <span className="ml-2 text-sm text-muted-foreground font-mono">
                {experiment?.targetUrl || 'No target URL available'}
              </span>
            </div>
          </div>
          
          <div className="relative" style={{ height: '600px' }}>
            {hasDataError ? (
              <div className="absolute inset-0 flex items-center justify-center bg-muted/50">
                <div className="text-center p-6">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-destructive/10 flex items-center justify-center">
                    <RefreshCw className="h-6 w-6 text-destructive" />
                  </div>
                  <h3 className="text-lg font-semibold text-destructive mb-2">Preview Unavailable</h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    {hasDataError instanceof Error ? hasDataError.message : 'Failed to load experiment or variation data'}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    You can still edit your CSS and JavaScript code above.
                  </p>
                </div>
              </div>
            ) : (
              <iframe
                key={iframeKey}
                src={previewUrl}
                className="w-full h-full border-0"
                title="Variation Preview"
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                onLoad={() => {
                  // Optional: Handle iframe load completion
                }}
                onError={() => {
                  toast.error("Failed to load preview");
                }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
