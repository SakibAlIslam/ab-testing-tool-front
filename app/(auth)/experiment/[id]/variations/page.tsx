"use client";

import { Button } from "@/src/components/ui/button";
import { Plus, Trash2, Edit } from "lucide-react";
import { useRouter, useParams } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/components/ui/table";

const variations = [
  { id: "var-0", name: "Control" },
  { id: "var-1", name: "Variation A" },
];

export default function Variations() {
  const router = useRouter();
  const params = useParams();
  const experimentId = params?.id as string;

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Variations</h2>
          <p className="text-muted-foreground mt-1">
            Manage your experiment variations
          </p>
        </div>
        <Button variant="outline" className="gap-2">
          <Plus className="h-4 w-4" />
          Add Variation
        </Button>
      </div>

      <div className="border border-border rounded-lg overflow-hidden bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Variation Name</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {variations.map((variation) => (
              <TableRow key={variation.id}>
                <TableCell className="font-medium">{variation.name}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-2"
                      onClick={() =>
                        router.push(`/experiment/${experimentId}/variations/${variation.id}/edit`)
                      }
                    >
                      <Edit className="h-4 w-4" />
                      Edit
                    </Button>
                    {variation.id !== "var-0" && (
                      <Button variant="outline" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
