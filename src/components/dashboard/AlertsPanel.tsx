
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { calculateForecast, getCurrentMonthData } from '@/utils/mockData';
import { Bell } from 'lucide-react';

const AlertsPanel = () => {
  const [alerts, setAlerts] = useState<{ title: string; description: string; type: 'warning' | 'info' | 'success' }[]>([]);

  useEffect(() => {
    const { currentMonthData } = getCurrentMonthData();
    const forecast = calculateForecast(currentMonthData);
    
    const newAlerts = [];
    
    // Budget alert
    if (forecast.isOverBudget) {
      newAlerts.push({
        title: 'Budget Alert',
        description: `You're projected to exceed your monthly budget by ₹${(forecast.forecastedTotalCost - 3000).toFixed(2)}. Try to save ${forecast.dailySavingsNeeded.toFixed(1)} kWh per day to stay under budget.`,
        type: 'warning' as const
      });
    }
    
    // Daily consumption alert
    const today = currentMonthData.filter(day => day.consumption !== null).pop();
    const yesterday = currentMonthData.filter(day => day.consumption !== null).slice(-2)[0];
    
    if (today && yesterday) {
      if (today.consumption > yesterday.consumption) {
        newAlerts.push({
          title: 'Consumption Increase',
          description: `Today's consumption (${today.consumption} kWh) is higher than yesterday (${yesterday.consumption} kWh).`,
          type: 'info' as const
        });
      } else {
        newAlerts.push({
          title: 'Good Job!',
          description: `You used less energy today (${today.consumption} kWh) compared to yesterday (${yesterday.consumption} kWh).`,
          type: 'success' as const
        });
      }
    }
    
    // Peak hour alert (just an example)
    newAlerts.push({
      title: 'Daily Report',
      description: 'Your daily consumption report is now available. Check the dashboard for details.',
      type: 'info' as const
    });
    
    setAlerts(newAlerts);
  }, []);

  return (
    <Card className="energy-card">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Notifications</CardTitle>
          <span className="bg-muted rounded-full p-1">
            <Bell className="h-4 w-4" />
          </span>
        </div>
        <CardDescription>Important alerts and notifications</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {alerts.map((alert, index) => (
            <Alert 
              key={index} 
              variant={alert.type === 'warning' ? 'destructive' : 'default'}
              className={`
                ${alert.type === 'warning' ? 'bg-energy-warning/15 text-energy-warning border-energy-warning/30' : ''}
                ${alert.type === 'success' ? 'bg-energy-success/15 text-energy-success border-energy-success/30' : ''}
                ${alert.type === 'info' ? 'bg-energy-accent/15 text-energy-accent border-energy-accent/30' : ''}
              `}
            >
              <AlertTitle>{alert.title}</AlertTitle>
              <AlertDescription>{alert.description}</AlertDescription>
            </Alert>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default AlertsPanel;
