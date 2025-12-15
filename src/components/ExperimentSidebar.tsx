import { Settings, Target, SplitSquareVertical, BarChart3 } from "lucide-react";
import { NavLink } from "./NavLink";

interface ExperimentSidebarProps {
  experimentId: string;
}

const experimentNavItems = [
  { title: "Configuration", path: "configuration", icon: Settings },
  { title: "Targeting", path: "targeting", icon: Target },
  { title: "Variations", path: "variations", icon: SplitSquareVertical },
  { title: "Traffic Allocation", path: "traffic", icon: Target },
  { title: "Metrics", path: "metrics", icon: BarChart3 },
  { title: "Integrations", path: "integrations", icon: Settings },
];

export function ExperimentSidebar({ experimentId }: ExperimentSidebarProps) {
  return (
    <aside className="w-56 border-r border-border bg-card h-full">
      <nav className="p-4 space-y-1">
        {experimentNavItems.map((item) => (
          <NavLink
            key={item.path}
            href={`/experiment/${experimentId}/${item.path}`}
            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-accent/10 transition-colors text-sm"
            activeClassName="bg-accent/20 text-accent font-semibold"
          >
            <item.icon className="h-4 w-4" />
            <span>{item.title}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
