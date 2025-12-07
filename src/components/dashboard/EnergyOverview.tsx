
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { 
  getCurrentMonthData, 
  calculateEnergySummary, 
  calculateForecast 
} from '@/utils/mockData';

const EnergyOverview = () => {
  const [currentData, setCurrentData] = useState<any[]>([]);
  const [previousData, setPreviousData] = useState<any[]>([]);
  const [summary, setSummary] = useState({
    totalConsumption: 0,
    totalCost: 0,
    savingsPercentage: 0,
    isOverBudget: false,
  });

  useEffect(() => {
    const { currentMonthData, previousMonthData } = getCurrentMonthData();
    setCurrentData(currentMonthData);
    setPreviousData(previousMonthData);

    const currentSummary = calculateEnergySummary(currentMonthData);
    const prevSummary = calculateEnergySummary(previousMonthData);
    
    // Calculate days to compare (use same number of days from both months)
    const daysToCompare = Math.min(currentSummary.daysCompleted, prevSummary.daysCompleted);
    
    // Calculate consumption for equal number of days
    const currentConsumption = currentMonthData
      .filter(day => day.consumption !== null)
      .slice(0, daysToCompare)
      .reduce((sum, day) => sum + day.consumption, 0);
      
    const previousConsumption = previousMonthData
      .filter(day => day.consumption !== null)
      .slice(0, daysToCompare)
      .reduce((sum, day) => sum + day.consumption, 0);
    
    // Calculate savings percentage
    const difference = previousConsumption - currentConsumption;
    const savingsPercentage = previousConsumption > 0 
      ? Math.round((difference / previousConsumption) * 100) 
      : 0;
    
    const forecast = calculateForecast(currentMonthData);
    
    setSummary({
      totalConsumption: currentSummary.totalConsumption,
      totalCost: currentSummary.totalCost,
      savingsPercentage,
      isOverBudget: forecast.isOverBudget,
    });
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <Card className="energy-card">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-medium text-muted-foreground">Total Consumption</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-end">
            <span className="text-3xl font-bold">{summary.totalConsumption}</span>
            <span className="text-lg ml-1 mb-0.5">kWh</span>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            This month so far
          </p>
        </CardContent>
      </Card>
      
      <Card className="energy-card">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-medium text-muted-foreground">Total Cost</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-end">
            <span className="text-3xl font-bold">₹{summary.totalCost}</span>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            At ₹5 per kWh
          </p>
        </CardContent>
      </Card>
      
      <Card className="energy-card">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-medium text-muted-foreground">Energy Savings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-end justify-between mb-2">
            <div className="flex items-end">
              <span className="text-3xl font-bold">{summary.savingsPercentage}%</span>
            </div>
            <span className={`text-sm ${summary.savingsPercentage >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {summary.savingsPercentage >= 0 ? 'Saved' : 'Increased'} vs. Last Month
            </span>
          </div>
          <Progress 
            value={Math.abs(summary.savingsPercentage)} 
            max={100}
            className={`h-2 ${summary.savingsPercentage >= 0 ? 'bg-muted' : 'bg-red-100'}`}
          >
            <div 
              className={`h-full ${summary.savingsPercentage >= 0 ? 'bg-green-600' : 'bg-red-600'}`}
              style={{ width: `${Math.abs(summary.savingsPercentage)}%` }}
            />
          </Progress>
          <p className="text-sm text-muted-foreground mt-2">
            {summary.savingsPercentage >= 0 
              ? `You're using less energy than last month!` 
              : `You're using more energy than last month.`}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default EnergyOverview;
