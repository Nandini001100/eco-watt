
import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  AlertTriangle, 
  Zap, 
  CheckCircle, 
  TrendingUp, 
  Clock,
  DollarSign,
  Target
} from 'lucide-react';
import { cn } from "@/lib/utils";

interface Alert {
  id: string;
  type: 'WARNING' | 'CRITICAL' | 'SUCCESS' | 'INFO';
  title: string;
  message: string;
  time: string;
  icon: 'budget' | 'appliance' | 'savings' | 'forecast' | 'consumption';
  isRead: boolean;
}

interface AlertsListProps {
  filter: 'all' | 'unread';
}

const AlertsList = ({ filter }: AlertsListProps) => {
  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: '1',
      type: 'WARNING',
      title: 'Budget Alert',
      message: 'You are 85% through your monthly budget of ₹3000. Consider reducing consumption.',
      time: '2 hours ago',
      icon: 'budget',
      isRead: false
    },
    {
      id: '2',
      type: 'CRITICAL',
      title: 'High Consumption Detected',
      message: 'Air Conditioner consumed 8.5 kWh today, 25% higher than usual.',
      time: '4 hours ago',
      icon: 'appliance',
      isRead: false
    },
    {
      id: '3',
      type: 'SUCCESS',
      title: 'Daily Savings Goal Met',
      message: 'Great job! You saved 2.1 kWh compared to yesterday.',
      time: '1 day ago',
      icon: 'savings',
      isRead: true
    },
    {
      id: '4',
      type: 'WARNING',
      title: 'Weekly Forecast Update',
      message: 'Based on current usage, you may exceed budget by ₹150 this month.',
      time: '2 days ago',
      icon: 'forecast',
      isRead: true
    },
    {
      id: '5',
      type: 'INFO',
      title: 'Peak Hours Notification',
      message: 'Peak hours (6-10 PM) starting soon. Consider reducing usage.',
      time: '3 days ago',
      icon: 'consumption',
      isRead: true
    }
  ]);

  const getIcon = (iconType: string) => {
    const iconMap = {
      budget: DollarSign,
      appliance: Zap,
      savings: Target,
      forecast: TrendingUp,
      consumption: Clock
    };
    const IconComponent = iconMap[iconType as keyof typeof iconMap] || AlertTriangle;
    return <IconComponent className="h-5 w-5" />;
  };

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'WARNING':
        return 'border-l-yellow-500 bg-yellow-50 dark:bg-yellow-950';
      case 'CRITICAL':
        return 'border-l-red-500 bg-red-50 dark:bg-red-950';
      case 'SUCCESS':
        return 'border-l-green-500 bg-green-50 dark:bg-green-950';
      case 'INFO':
        return 'border-l-blue-500 bg-blue-50 dark:bg-blue-950';
      default:
        return 'border-l-gray-500 bg-gray-50 dark:bg-gray-950';
    }
  };

  const getBadgeVariant = (type: string) => {
    switch (type) {
      case 'WARNING':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'CRITICAL':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'SUCCESS':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'INFO':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const markAsRead = (alertId: string) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === alertId ? { ...alert, isRead: true } : alert
    ));
  };

  const filteredAlerts = filter === 'unread' 
    ? alerts.filter(alert => !alert.isRead)
    : alerts;

  return (
    <div className="space-y-4">
      {filteredAlerts.map((alert) => (
        <Card 
          key={alert.id}
          className={cn(
            "border-l-4 transition-all duration-200",
            getAlertColor(alert.type),
            !alert.isRead && "shadow-md"
          )}
        >
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3 flex-1">
                <div className={cn(
                  "p-2 rounded-full",
                  alert.type === 'WARNING' && "bg-yellow-100 text-yellow-600 dark:bg-yellow-900 dark:text-yellow-400",
                  alert.type === 'CRITICAL' && "bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-400",
                  alert.type === 'SUCCESS' && "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400",
                  alert.type === 'INFO' && "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400"
                )}>
                  {getIcon(alert.icon)}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className={cn(
                      "font-semibold text-sm",
                      !alert.isRead && "text-foreground",
                      alert.isRead && "text-muted-foreground"
                    )}>
                      {alert.title}
                    </h3>
                    {!alert.isRead && (
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    )}
                  </div>
                  
                  <p className={cn(
                    "text-sm mb-2",
                    !alert.isRead && "text-foreground",
                    alert.isRead && "text-muted-foreground"
                  )}>
                    {alert.message}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      {alert.time}
                    </span>
                    
                    <div className="flex items-center gap-2">
                      <Badge 
                        variant="outline" 
                        className={cn("text-xs", getBadgeVariant(alert.type))}
                      >
                        {alert.type}
                      </Badge>
                      
                      {!alert.isRead && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => markAsRead(alert.id)}
                          className="text-xs h-6 px-2"
                        >
                          Mark as read
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
      
      {filteredAlerts.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">All caught up!</h3>
            <p className="text-muted-foreground">
              {filter === 'unread' 
                ? "No unread alerts at the moment."
                : "No alerts to display."
              }
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AlertsList;
