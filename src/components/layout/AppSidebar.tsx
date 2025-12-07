import { useNavigate, useLocation } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarTrigger,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { 
  BarChart, Calendar, Settings, Database, Bolt, Plug, 
  ChartLine, FileText, Bell
} from 'lucide-react';

const AppSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const mainMenu = [
    {
      title: "Dashboard",
      icon: BarChart,
      path: "/dashboard",
    },
    {
      title: "Monthly Summary",
      icon: FileText,
      path: "/summary",
    },
    {
      title: "Comparison",
      icon: ChartLine,
      path: "/comparison",
    },
    {
      title: "Forecasting",
      icon: Calendar,
      path: "/forecasting",
    },
    {
      title: "Alerts",
      icon: Bell,
      path: "/alerts",
    },
  ];

  const secondaryMenu = [
    {
      title: "Rewards",
      icon: Bolt,
      path: "/rewards",
    },
    {
      title: "Appliances",
      icon: Plug,
      path: "/appliances",
    },
    {
      title: "Settings",
      icon: Settings,
      path: "/settings",
    },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <Sidebar>
      <SidebarHeader className="flex items-center px-4 py-2 h-14">
        <div className="flex gap-2 items-center">
          <div className="w-8 h-8 rounded bg-primary flex items-center justify-center">
            <Bolt className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="font-semibold text-lg">EcoSmart</span>
        </div>
        <SidebarTrigger className="ml-auto md:hidden" />
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Analytics</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainMenu.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton 
                    className={isActive(item.path) ? "bg-sidebar-accent" : ""}
                    onClick={() => navigate(item.path)}
                  >
                    <item.icon className="h-5 w-5 mr-3" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        <SidebarGroup>
          <SidebarGroupLabel>Management</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {secondaryMenu.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton 
                    className={isActive(item.path) ? "bg-sidebar-accent" : ""}
                    onClick={() => navigate(item.path)}
                  >
                    <item.icon className="h-5 w-5 mr-3" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter className="px-4 py-3 text-xs text-muted-foreground">
        <div>EcoSmart Energy Dashboard v1.0</div>
        <div>Saving energy, one day at a time</div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
