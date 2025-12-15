"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/src/components/ui/card";
import { Switch } from "@/src/components/ui/switch";
import { Checkbox } from "@/src/components/ui/checkbox";
import { Label } from "@/src/components/ui/label";
import { useState } from "react";
import { Badge } from "@/src/components/ui/badge";

const integrations = [
  {
    id: "ga4",
    name: "Google Analytics 4",
    description: "Push experiment and variation details to view GA4 custom reports",
    logo: "📊",
    hasAudienceSync: true,
  },
  {
    id: "segment",
    name: "Segment",
    description: "Send experiment events to Segment for unified analytics",
    logo: "🔄",
    hasAudienceSync: false,
  },
  {
    id: "mixpanel",
    name: "Mixpanel",
    description: "Track experiment variations and conversions in Mixpanel",
    logo: "📈",
    hasAudienceSync: true,
  },
  {
    id: "amplitude",
    name: "Amplitude",
    description: "Analyze experiment performance with Amplitude analytics",
    logo: "📉",
    hasAudienceSync: true,
  },
];

export default function Integrations() {
  const [enabledIntegrations, setEnabledIntegrations] = useState<Record<string, boolean>>({
    ga4: true,
    segment: false,
    mixpanel: false,
    amplitude: false,
  });

  const [audienceSync, setAudienceSync] = useState<Record<string, boolean>>({
    ga4: true,
    mixpanel: false,
    amplitude: false,
  });

  const toggleIntegration = (id: string) => {
    setEnabledIntegrations(prev => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const toggleAudienceSync = (id: string) => {
    setAudienceSync(prev => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h2 className="text-2xl font-bold">Integrations</h2>
        <p className="text-muted-foreground mt-1">
          Connect your experiment with third-party analytics platforms
        </p>
      </div>

      <div className="grid gap-4">
        {integrations.map((integration) => (
          <Card key={integration.id} className="border-border">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="text-4xl">{integration.logo}</div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <CardTitle>{integration.name}</CardTitle>
                      {enabledIntegrations[integration.id] && (
                        <Badge variant="outline" className="bg-success/20 text-success border-success/30">
                          Active
                        </Badge>
                      )}
                    </div>
                    <CardDescription>{integration.description}</CardDescription>
                  </div>
                </div>
                <Switch
                  checked={enabledIntegrations[integration.id]}
                  onCheckedChange={() => toggleIntegration(integration.id)}
                />
              </div>
            </CardHeader>
            
            {enabledIntegrations[integration.id] && integration.hasAudienceSync && (
              <CardContent className="border-t border-border pt-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id={`${integration.id}-audience`}
                    checked={audienceSync[integration.id]}
                    onCheckedChange={() => toggleAudienceSync(integration.id)}
                  />
                  <Label 
                    htmlFor={`${integration.id}-audience`}
                    className="text-sm font-normal cursor-pointer"
                  >
                    Set up Variations as Audiences in {integration.name}
                  </Label>
                </div>
                <p className="text-xs text-muted-foreground mt-2 ml-6">
                  Create audience segments for each variation to enable advanced targeting
                </p>
              </CardContent>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}
