
import { useState, useEffect } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import AppHeader from '@/components/layout/AppHeader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { calculateForecast, calculateEnergySummary, getCurrentMonthData } from '@/utils/mockData';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const Forecasting = () => {
  const [currentData, setCurrentData] = useState<any[]>([]);
  const [summary, setSummary] = useState({
    totalConsumption: 0,
    totalCost: 0,
    dailyAvgConsumption: 0,
    daysCompleted: 0
  });
  const [forecast, setForecast] = useState({
    forecastedTotalConsumption: 0,
    forecastedTotalCost: 0,
    isOverBudget: false,
    dailySavingsNeeded: 0,
    daysRemaining: 0
  });
  const [monthBudget, setMonthBudget] = useState(3000);

  useEffect(() => {
    const { currentMonthData } = getCurrentMonthData();
    setCurrentData(currentMonthData);
    
    const summaryData = calculateEnergySummary(currentMonthData);
    setSummary(summaryData);
    
    const forecastData = calculateForecast(currentMonthData, 30, monthBudget);
    setForecast(forecastData);
  }, [monthBudget]);

  return (
    <AppLayout>
      <AppHeader />
      
      <div className="space-y-6">
        <Card className="energy-card">
          <CardHeader>
            <CardTitle>Energy Forecast</CardTitle>
            <CardDescription>Predicted energy consumption and costs for the month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-4 bg-muted/30 rounded-lg">
                <h3 className="text-sm font-medium text-muted-foreground">Current Consumption</h3>
                <p className="text-2xl font-bold mt-1">{summary.totalConsumption} kWh</p>
                <p className="text-xs text-muted-foreground mt-1">After {summary.daysCompleted} days</p>
              </div>
              
              <div className="p-4 bg-muted/30 rounded-lg">
                <h3 className="text-sm font-medium text-muted-foreground">Forecasted Total</h3>
                <p className="text-2xl font-bold mt-1">{forecast.forecastedTotalConsumption} kWh</p>
                <p className="text-xs text-muted-foreground mt-1">Projected for full month</p>
              </div>
              
              <div className="p-4 bg-muted/30 rounded-lg">
                <h3 className="text-sm font-medium text-muted-foreground">Daily Average</h3>
                <p className="text-2xl font-bold mt-1">{summary.dailyAvgConsumption} kWh</p>
                <p className="text-xs text-muted-foreground mt-1">Average daily consumption</p>
              </div>
              
              <div className="p-4 bg-muted/30 rounded-lg">
                <h3 className="text-sm font-medium text-muted-foreground">Days Remaining</h3>
                <p className="text-2xl font-bold mt-1">{forecast.daysRemaining}</p>
                <p className="text-xs text-muted-foreground mt-1">Until end of month</p>
              </div>
            </div>
            
            <div className="mt-8">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium">Forecasted Bill: ₹{forecast.forecastedTotalCost}</h3>
                <span className="text-sm text-muted-foreground">Budget: ₹{monthBudget}</span>
              </div>
              <div className="relative pt-1">
                <Progress 
                  value={forecast.forecastedTotalCost} 
                  max={monthBudget * 1.5} 
                  className="h-2"
                >
                  <div 
                    className={`h-full ${forecast.isOverBudget ? 'bg-energy-danger' : 'bg-energy-success'}`}
                    style={{ width: `${(forecast.forecastedTotalCost / (monthBudget * 1.5)) * 100}%` }}
                  />
                </Progress>
                <div 
                  className="absolute top-0 w-0.5 h-4 bg-black" 
                  style={{ left: `${(monthBudget / (monthBudget * 1.5)) * 100}%` }}
                />
              </div>
              <div className="text-xs text-right mt-1 text-muted-foreground">
                {forecast.isOverBudget 
                  ? `Exceeds budget by ₹${(forecast.forecastedTotalCost - monthBudget).toFixed(2)}` 
                  : `Under budget by ₹${(monthBudget - forecast.forecastedTotalCost).toFixed(2)}`
                }
              </div>
            </div>
            
            <div className="mt-8">
              {forecast.isOverBudget ? (
                <Alert className="bg-energy-warning/15 text-energy-warning border-energy-warning/30">
                  <AlertTitle>Budget Alert</AlertTitle>
                  <AlertDescription>
                    <p>You're projected to exceed your monthly budget of ₹{monthBudget}.</p>
                    <p className="font-medium mt-2">
                      Savings Plan: Reduce your consumption by {forecast.dailySavingsNeeded.toFixed(1)} kWh per day 
                      for the remaining {forecast.daysRemaining} days to stay within budget.
                    </p>
                  </AlertDescription>
                </Alert>
              ) : (
                <Alert className="bg-energy-success/15 text-energy-success border-energy-success/30">
                  <AlertTitle>On Track</AlertTitle>
                  <AlertDescription>
                    <p>You're projected to stay within your monthly budget of ₹{monthBudget}.</p>
                    <p className="font-medium mt-2">
                      Keep up your energy-saving habits! You're on track to save 
                      ₹{(monthBudget - forecast.forecastedTotalCost).toFixed(2)} this month.
                    </p>
                  </AlertDescription>
                </Alert>
              )}
            </div>
          </CardContent>
        </Card>
        
        <Card className="energy-card">
          <CardHeader>
            <CardTitle>Energy-Saving Recommendations</CardTitle>
            <CardDescription>Tips to reduce your energy consumption</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 border rounded-lg">
                <h3 className="font-medium">Appliance Usage</h3>
                <p className="text-muted-foreground mt-1">
                  Turn off air conditioners when not needed and set thermostats to 24-25°C to save up to 
                  1.2 kWh per day.
                </p>
              </div>
              
              <div className="p-4 border rounded-lg">
                <h3 className="font-medium">Lighting Optimization</h3>
                <p className="text-muted-foreground mt-1">
                  Replace any remaining incandescent bulbs with LED bulbs to save up to 
                  0.5 kWh per day.
                </p>
              </div>
              
              <div className="p-4 border rounded-lg">
                <h3 className="font-medium">Vampire Power</h3>
                <p className="text-muted-foreground mt-1">
                  Unplug electronics when not in use to prevent standby power consumption. 
                  This can save up to 0.3 kWh per day.
                </p>
              </div>
              
              <div className="p-4 border rounded-lg">
                <h3 className="font-medium">Peak Hours</h3>
                <p className="text-muted-foreground mt-1">
                  Shift heavy appliance usage away from peak hours (6-10 PM) to reduce grid strain 
                  and potentially benefit from time-of-use rates.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default Forecasting;
