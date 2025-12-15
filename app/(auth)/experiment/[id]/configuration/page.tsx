import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { Textarea } from "@/src/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { Button } from "@/src/components/ui/button";

export default function Configuration() {
  return (
    <div className="space-y-6 max-w-4xl">
      <Card className="border-border">
        <CardHeader>
          <CardTitle>General Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="exp-name">Experiment Name</Label>
            <Input
              id="exp-name"
              placeholder="e.g., Homepage Banner Test"
              defaultValue="Homepage Banner Test"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="exp-desc">Description</Label>
            <Textarea
              id="exp-desc"
              placeholder="Describe the purpose of this experiment..."
              rows={3}
              defaultValue="Testing different hero banner designs to improve conversion"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="exp-type">Experiment Type</Label>
            <Select defaultValue="ab">
              <SelectTrigger id="exp-type">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ab">A/B Test</SelectItem>
                <SelectItem value="multivariate">Multivariate</SelectItem>
                <SelectItem value="personalization">Personalization</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card className="border-border">
        <CardHeader>
          <CardTitle>Global Code</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="global-js">Global JavaScript</Label>
            <Textarea
              id="global-js"
              className="font-mono text-sm bg-code-bg"
              placeholder="// JavaScript that runs before all variations"
              rows={6}
              defaultValue="// Track experiment view\nwindow.dataLayer = window.dataLayer || [];\nwindow.dataLayer.push({ event: 'experiment_view' });"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="global-css">Global CSS</Label>
            <Textarea
              id="global-css"
              className="font-mono text-sm bg-code-bg"
              placeholder="/* CSS that applies to all variations */"
              rows={6}
              defaultValue=".experiment-banner {\n  transition: all 0.3s ease;\n}"
            />
          </div>

          <Button>Save Configuration</Button>
        </CardContent>
      </Card>
    </div>
  );
}
