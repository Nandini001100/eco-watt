
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCheck } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

interface AlertsHeaderProps {
  filter: 'all' | 'unread';
  setFilter: (filter: 'all' | 'unread') => void;
}

const AlertsHeader = ({ filter, setFilter }: AlertsHeaderProps) => {
  const { toast } = useToast();
  
  const handleMarkAllAsRead = () => {
    toast({
      title: "All alerts marked as read",
      description: "You're all caught up!",
    });
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-4 bg-card rounded-lg border">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Badge variant="destructive" className="bg-red-500">
            2 unread
          </Badge>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleMarkAllAsRead}
            className="text-muted-foreground hover:text-foreground"
          >
            <CheckCheck className="h-4 w-4 mr-1" />
            Mark all as read
          </Button>
        </div>
      </div>
      
      <Tabs value={filter} onValueChange={(value) => setFilter(value as 'all' | 'unread')}>
        <TabsList>
          <TabsTrigger value="all" className="relative">
            All Alerts
            <Badge variant="secondary" className="ml-2 h-5 text-xs">5</Badge>
          </TabsTrigger>
          <TabsTrigger value="unread" className="relative">
            Unread
            <Badge variant="destructive" className="ml-2 h-5 text-xs">2</Badge>
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
};

export default AlertsHeader;
