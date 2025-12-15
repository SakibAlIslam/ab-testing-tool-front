"use client";

import { Button } from "@/src/components/ui/button";
import { Badge } from "@/src/components/ui/badge";
import { Input } from "@/src/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/components/ui/table";
import { Plus, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const experiments = [
  {
    id: "exp-001",
    name: "Homepage Banner Test",
    status: "active",
    type: "A/B Test",
    lastEdited: "2 hours ago",
  },
  {
    id: "exp-002",
    name: "Checkout Flow Optimization",
    status: "paused",
    type: "Multivariate",
    lastEdited: "5 hours ago",
  },
  {
    id: "exp-003",
    name: "Product Page CTA",
    status: "active",
    type: "A/B Test",
    lastEdited: "1 day ago",
  },
  {
    id: "exp-004",
    name: "Navigation Menu Redesign",
    status: "draft",
    type: "Personalization",
    lastEdited: "3 days ago",
  },
];

export default function AllExperiments() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredExperiments = experiments.filter(exp =>
    exp.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-success/20 text-success border-success/30";
      case "paused":
        return "bg-warning/20 text-warning border-warning/30";
      case "draft":
        return "bg-muted text-muted-foreground border-border";
      default:
        return "bg-muted text-muted-foreground border-border";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">All Experiments</h1>
          <p className="text-muted-foreground mt-2">
            Manage and monitor your A/B tests
          </p>
        </div>
        <Button 
          className="gap-2 glow-effect"
          onClick={() => router.push("/experiments/create")}
        >
          <Plus className="h-4 w-4" />
          New Experiment
        </Button>
      </div>

      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search experiments..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="rounded-lg border border-border bg-card">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead>Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Last Edited</TableHead>
              <TableHead className="w-[100px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredExperiments.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                  No experiments found matching "{searchQuery}"
                </TableCell>
              </TableRow>
            ) : (
              filteredExperiments.map((exp) => (
              <TableRow
                key={exp.id}
                className="cursor-pointer hover:bg-accent/5"
                onClick={() => router.push(`/experiment/${exp.id}/configuration`)}
              >
                <TableCell className="font-medium">{exp.name}</TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={getStatusColor(exp.status)}
                  >
                    {exp.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {exp.type}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {exp.lastEdited}
                </TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      router.push(`/experiment/${exp.id}/configuration`);
                    }}
                  >
                    View
                  </Button>
                </TableCell>
              </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
