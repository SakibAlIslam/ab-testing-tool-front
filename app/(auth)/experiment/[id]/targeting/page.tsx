"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";
import { Label } from "@/src/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Plus, Trash2 } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/src/components/ui/radio-group";
import { useState } from "react";

interface Condition {
  id: string;
  operator: string;
  value: string;
}

export default function Targeting() {
  const [conditions, setConditions] = useState<Condition[]>([
    { id: "1", operator: "contains", value: "example.com" },
  ]);
  const [logic, setLogic] = useState<"all" | "any">("all");

  const addCondition = () => {
    setConditions([
      ...conditions,
      { id: Date.now().toString(), operator: "contains", value: "" },
    ]);
  };

  const removeCondition = (id: string) => {
    setConditions(conditions.filter((c) => c.id !== id));
  };

  const updateCondition = (id: string, field: keyof Condition, value: string) => {
    setConditions(
      conditions.map((c) => (c.id === id ? { ...c, [field]: value } : c))
    );
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <Card className="border-border">
        <CardHeader>
          <CardTitle>Triggers</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="trigger-type">When to trigger this experiment</Label>
            <Select defaultValue="dom">
              <SelectTrigger id="trigger-type">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="immediate">Immediately</SelectItem>
                <SelectItem value="dom">DOM Ready</SelectItem>
                <SelectItem value="url">URL Changes</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card className="border-border">
        <CardHeader>
          <CardTitle>Conditions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label>Match logic</Label>
            <RadioGroup value={logic} onValueChange={(v) => setLogic(v as "all" | "any")}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="all" id="all" />
                <Label htmlFor="all" className="font-normal cursor-pointer">
                  All conditions must match (AND)
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="any" id="any" />
                <Label htmlFor="any" className="font-normal cursor-pointer">
                  Any condition can match (OR)
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-3">
            <Label>URL Conditions</Label>
            {conditions.map((condition, index) => (
              <div key={condition.id} className="flex gap-2 items-center">
                <span className="text-sm text-muted-foreground w-8">
                  {index + 1}.
                </span>
                <Select
                  value={condition.operator}
                  onValueChange={(v) => updateCondition(condition.id, "operator", v)}
                >
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="contains">Contains</SelectItem>
                    <SelectItem value="is">Is</SelectItem>
                    <SelectItem value="starts">Starts with</SelectItem>
                    <SelectItem value="ends">Ends with</SelectItem>
                  </SelectContent>
                </Select>
                <Input
                  value={condition.value}
                  onChange={(e) =>
                    updateCondition(condition.id, "value", e.target.value)
                  }
                  placeholder="Enter URL pattern..."
                  className="flex-1"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeCondition(condition.id)}
                  disabled={conditions.length === 1}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}

            <Button variant="outline" size="sm" onClick={addCondition} className="gap-2">
              <Plus className="h-4 w-4" />
              Add Condition
            </Button>
          </div>

          <Button>Save Targeting</Button>
        </CardContent>
      </Card>
    </div>
  );
}
