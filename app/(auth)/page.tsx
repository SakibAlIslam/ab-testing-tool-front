import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";
import { FlaskConical, Activity, TrendingUp } from "lucide-react";

export default function Dashboard() {
  const stats = [
    {
      title: "Active Experiments",
      value: "3",
      icon: FlaskConical,
      description: "Currently running",
    },
    {
      title: "Total Traffic",
      value: "12.4k",
      icon: Activity,
      description: "This week",
    },
    {
      title: "Conversion Rate",
      value: "+18%",
      icon: TrendingUp,
      description: "vs. last week",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Overview of your experimentation platform
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {stats.map((stat) => (
          <Card key={stat.title} className="border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-border">
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-4 text-sm">
              <div className="h-2 w-2 rounded-full bg-success" />
              <div className="flex-1">
                <p className="font-medium">Homepage Banner Test launched</p>
                <p className="text-muted-foreground text-xs">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <div className="h-2 w-2 rounded-full bg-warning" />
              <div className="flex-1">
                <p className="font-medium">Checkout Flow paused for edits</p>
                <p className="text-muted-foreground text-xs">5 hours ago</p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <div className="h-2 w-2 rounded-full bg-info" />
              <div className="flex-1">
                <p className="font-medium">Product Page CTA completed</p>
                <p className="text-muted-foreground text-xs">1 day ago</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
