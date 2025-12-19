"use client";

import { LayoutDashboard, FlaskConical, Settings, LogOut, User } from "lucide-react";
import { NavLink } from "./NavLink";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  useSidebar,
} from "./ui/sidebar";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "./ui/button";
import { useAuth } from "../contexts/AuthContext";

const navItems = [
  { title: "Dashboard", href: "/", icon: LayoutDashboard },
  { title: "All Experiments", href: "/experiments", icon: FlaskConical },
  { title: "Settings", href: "/settings", icon: Settings },
];

export function GlobalSidebar() {
  const { open } = useSidebar();
  const { logout, user } = useAuth();

  return (
    <Sidebar collapsible="icon" className="border-r border-border">
      <SidebarHeader className="border-b border-border p-4">
        <div className="flex items-center justify-between">
          {open && (
            <h1 className="text-xl font-bold glow-text">
              Brainlabs
            </h1>
          )}
          <ThemeToggle />
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      href={item.href}
                      end
                      className="hover:bg-sidebar-accent transition-colors"
                      activeClassName="bg-sidebar-accent text-sidebar-primary font-semibold"
                    >
                      <item.icon className="h-5 w-5" />
                      {open && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-border p-4">
        <div className="flex flex-col gap-2">
          {user && (
            <Button
              variant="ghost"
              size="sm"
              asChild
              className="justify-start gap-2 hover:bg-sidebar-accent"
            >
              <NavLink
                href="/profile"
                className="hover:bg-sidebar-accent transition-colors"
                activeClassName="bg-sidebar-accent text-sidebar-primary font-semibold"
              >
                <User className="h-4 w-4" />
                {open && <span>Profile</span>}
              </NavLink>
            </Button>
          )}
          {open && user && (
            <div className="text-sm text-muted-foreground truncate px-2">
              {user.name}
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={logout}
            className="justify-start gap-2 hover:bg-sidebar-accent"
          >
            <LogOut className="h-4 w-4" />
            {open && <span>Logout</span>}
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
