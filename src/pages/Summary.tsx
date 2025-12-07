
import { useState, useEffect } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import AppHeader from '@/components/layout/AppHeader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { calculateEnergySummary, getCurrentMonthData } from '@/utils/mockData';

const Summary = () => {
  const [monthData, setMonthData] = useState<any[]>([]);
  const [summary, setSummary] = useState({
    totalConsumption: 0,
    totalCost: 0,
    dailyAvgConsumption: 0,
    dailyAvgCost: 0,
    daysCompleted: 0
  });

  useEffect(() => {
    const { currentMonthData } = getCurrentMonthData();
    setMonthData(currentMonthData);
    
    const summaryData = calculateEnergySummary(currentMonthData);
    setSummary(summaryData);
  }, []);

  return (
    <AppLayout>
      <AppHeader />
      
      <div className="space-y-6">
        <Card className="energy-card">
          <CardHeader>
            <CardTitle>Current Month Summary</CardTitle>
            <CardDescription>Detailed breakdown of your energy consumption this month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-4 bg-muted/30 rounded-lg text-center">
                <h3 className="text-lg font-medium text-muted-foreground">Total Consumption</h3>
                <p className="text-3xl font-bold mt-2">{summary.totalConsumption} <span className="text-lg">kWh</span></p>
              </div>
              <div className="p-4 bg-muted/30 rounded-lg text-center">
                <h3 className="text-lg font-medium text-muted-foreground">Total Cost</h3>
                <p className="text-3xl font-bold mt-2">₹{summary.totalCost}</p>
              </div>
              <div className="p-4 bg-muted/30 rounded-lg text-center">
                <h3 className="text-lg font-medium text-muted-foreground">Daily Average</h3>
                <p className="text-3xl font-bold mt-2">{summary.dailyAvgConsumption} <span className="text-lg">kWh</span></p>
              </div>
              <div className="p-4 bg-muted/30 rounded-lg text-center">
                <h3 className="text-lg font-medium text-muted-foreground">Daily Cost</h3>
                <p className="text-3xl font-bold mt-2">₹{summary.dailyAvgCost}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="energy-card">
          <CardHeader>
            <CardTitle>Daily Consumption Data</CardTitle>
            <CardDescription>Day-by-day breakdown of your energy usage</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Day</TableHead>
                    <TableHead>Consumption (kWh)</TableHead>
                    <TableHead>Cost (₹)</TableHead>
                    <TableHead className="text-right">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {monthData
                    .filter(day => day.consumption !== null)
                    .reverse()  // Show most recent first
                    .map((day, index) => {
                      const previousDay = index < monthData.length - 1 ? 
                        monthData.filter(d => d.consumption !== null).reverse()[index + 1] : 
                        null;
                      
                      const isLowerThanPrevious = previousDay ? 
                        day.consumption < previousDay.consumption : 
                        false;
                        
                      const date = new Date(day.date);
                      const formattedDate = date.toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric'
                      });
                      
                      return (
                        <TableRow key={day.day}>
                          <TableCell>{formattedDate}</TableCell>
                          <TableCell>Day {day.day}</TableCell>
                          <TableCell>{day.consumption} kWh</TableCell>
                          <TableCell>₹{day.cost}</TableCell>
                          <TableCell className="text-right">
                            {previousDay && (
                              <Badge 
                                className={isLowerThanPrevious ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'}
                              >
                                {isLowerThanPrevious ? '✅ Saved' : '⚠️ Increased'}
                              </Badge>
                            )}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default Summary;
