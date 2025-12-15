"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";
import { Label } from "@/src/components/ui/label";
import { Input } from "@/src/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/ui/select";
import { Button } from "@/src/components/ui/button";
import { Alert, AlertDescription } from "@/src/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { useState } from "react";

const initialVariations = [
  { id: "var-0", name: "Control", weight: 50 },
  { id: "var-1", name: "Variation A", weight: 50 },
];

export default function TrafficAllocation() {
  const [totalTraffic, setTotalTraffic] = useState(100);
  const [distributionMode, setDistributionMode] = useState("manual");
  const [variations, setVariations] = useState(initialVariations);

  const totalWeight = variations.reduce((sum, v) => sum + v.weight, 0);
  const isValid = totalWeight === 100;

  const updateVariationWeight = (id: string, weight: number) => {
    setVariations(variations.map(v => 
      v.id === id ? { ...v, weight: Math.max(0, Math.min(100, weight)) } : v
    ));
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h2 className="text-2xl font-bold">Traffic Allocation</h2>
        <p className="text-muted-foreground mt-1">
          Control how traffic is distributed across your experiment variations
        </p>
      </div>

      <Card className="border-border">
        <CardHeader>
          <CardTitle>Total Traffic Participation</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="total-traffic">
              Fraction of total traffic to include in your experiment
            </Label>
            <div className="flex items-center gap-2">
              <Input
                id="total-traffic"
                type="number"
                min="0"
                max="100"
                value={totalTraffic}
                onChange={(e) => setTotalTraffic(Number(e.target.value))}
                className="w-32"
              />
              <span className="text-muted-foreground">%</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Percentage of visitors who will be included in experiment
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="border-border">
        <CardHeader>
          <CardTitle>Distribution Mode</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="distribution-mode">
              Select how traffic should be distributed
            </Label>
            <Select value={distributionMode} onValueChange={setDistributionMode}>
              <SelectTrigger id="distribution-mode" className="w-full max-w-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="manual">Manual</SelectItem>
                <SelectItem value="statistical">Statistical Engine</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">
              {distributionMode === "manual" 
                ? "Manually control the traffic split between variations"
                : "Let the statistical engine optimize traffic distribution automatically"}
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="border-border">
        <CardHeader>
          <CardTitle>Variation Weights</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            {variations.map((variation) => (
              <div key={variation.id} className="flex items-center justify-between gap-4">
                <Label className="flex-1">{variation.name}</Label>
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    min="0"
                    max="100"
                    value={variation.weight}
                    onChange={(e) => updateVariationWeight(variation.id, Number(e.target.value))}
                    className="w-24"
                  />
                  <span className="text-muted-foreground w-4">%</span>
                </div>
              </div>
            ))}
          </div>

          {!isValid && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Total weight must equal 100%. Current total: {totalWeight}%
              </AlertDescription>
            </Alert>
          )}

          <div className="flex items-center justify-between pt-4 border-t border-border">
            <span className="text-sm font-medium">Total:</span>
            <span className={`text-sm font-bold ${isValid ? "text-success" : "text-destructive"}`}>
              {totalWeight}%
            </span>
          </div>

          <Button 
            className="w-full" 
            disabled={!isValid}
          >
            Save Traffic Allocation
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
