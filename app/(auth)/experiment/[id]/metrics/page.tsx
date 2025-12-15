"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";
import { Label } from "@/src/components/ui/label";
import { Input } from "@/src/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { Button } from "@/src/components/ui/button";
import { Checkbox } from "@/src/components/ui/checkbox";
import { Trash2, Plus } from "lucide-react";
import { Badge } from "@/src/components/ui/badge";

const metrics = [
  {
    id: "1",
    title: "Button Click",
    description: "Track CTA button clicks",
    type: "click",
    selector: ".cta-button",
    isPrimary: true,
  },
  {
    id: "2",
    title: "Page View",
    description: "Track thank you page visits",
    type: "pageview",
    selector: "/thank-you",
    isPrimary: false,
  },
];

export default function Metrics() {
  return (
    <div className="space-y-6 max-w-4xl">
      <Card className="border-border">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Goals & Metrics</CardTitle>
            <Button size="sm" variant="outline" className="gap-2">
              <Plus className="h-4 w-4" />
              Add Metric
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {metrics.map((metric) => (
            <div
              key={metric.id}
              className="p-4 rounded-lg border border-border bg-card space-y-4"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold">{metric.title}</h4>
                    {metric.isPrimary && (
                      <Badge variant="outline" className="bg-primary/20 text-primary border-primary/30">
                        Primary
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {metric.description}
                  </p>
                </div>
                <Button variant="ghost" size="icon">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-xs">Type</Label>
                  <Select value={metric.type}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="click">Click</SelectItem>
                      <SelectItem value="pageview">Page View</SelectItem>
                      <SelectItem value="custom">Custom Event</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-xs">
                    {metric.type === "pageview" ? "URL Pattern" : "CSS Selector"}
                  </Label>
                  <Input
                    defaultValue={metric.selector}
                    className="font-mono text-sm"
                    placeholder={
                      metric.type === "pageview"
                        ? "/thank-you"
                        : ".button-class"
                  }
                  readOnly
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id={`primary-${metric.id}`} checked={metric.isPrimary} />
                <label
                  htmlFor={`primary-${metric.id}`}
                  className="text-sm font-medium leading-none cursor-pointer"
                >
                  Set as primary metric
                </label>
              </div>
            </div>
          ))}

          <div className="p-4 rounded-lg border border-dashed border-border bg-muted/20">
            <div className="space-y-4">
              <h4 className="font-medium text-sm">Add New Metric</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="new-title" className="text-xs">
                    Title
                  </Label>
                  <Input id="new-title" placeholder="e.g., Form Submit" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-type" className="text-xs">
                    Type
                  </Label>
                  <Select>
                    <SelectTrigger id="new-type">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="click">Click</SelectItem>
                      <SelectItem value="pageview">Page View</SelectItem>
                      <SelectItem value="custom">Custom Event</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-selector" className="text-xs">
                  CSS Selector / URL
                </Label>
                <Input
                  id="new-selector"
                  className="font-mono text-sm"
                  placeholder=".button-class or /page-url"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="new-primary" />
                <label
                  htmlFor="new-primary"
                  className="text-sm font-medium leading-none cursor-pointer"
                >
                  Set as primary metric
                </label>
              </div>
              <Button size="sm" className="gap-2">
                <Plus className="h-4 w-4" />
                Create Metric
              </Button>
            </div>
          </div>

          <Button>Save All Metrics</Button>
        </CardContent>
      </Card>
    </div>
  );
}
