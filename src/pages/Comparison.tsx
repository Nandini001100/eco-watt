
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
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const Comparison = () => {
  const [currentData, setCurrentData] = useState<any[]>([]);
  const [previousData, setPreviousData] = useState<any[]>([]);
  const [savingSummary, setSavingSummary] = useState({
    kwhSaved: 0,
    moneySaved: 0,
  });
  const [chartData, setChartData] = useState<any[]>([]);

  useEffect(() => {
    const { currentMonthData, previousMonthData, currentMonth, previousMonth } = getCurrentMonthData();
    setCurrentData(currentMonthData);
    setPreviousData(previousMonthData);
    
    // Calculate energy and money saved
    const currentSummary = calculateEnergySummary(currentMonthData);
    const previousSummary = calculateEnergySummary(previousMonthData);
    
    // Use the minimum number of days to compare fairly
    const daysToCompare = Math.min(currentSummary.daysCompleted, previousSummary.daysCompleted);
    
    const currentConsumption = currentMonthData
      .filter(day => day.consumption !== null)
      .slice(0, daysToCompare)
      .reduce((sum, day) => sum + day.consumption, 0);
      
    const previousConsumption = previousMonthData
      .filter(day => day.consumption !== null)
      .slice(0, daysToCompare)
      .reduce((sum, day) => sum + day.consumption, 0);
    
    const kwhSaved = previousConsumption - currentConsumption;
    const moneySaved = kwhSaved * 5;
    
    setSavingSummary({
      kwhSaved,
      moneySaved
    });
    
    // Prepare data for the line chart
    const preparedChartData = [];
    for (let i = 0; i < daysToCompare; i++) {
      preparedChartData.push({
        day: i + 1,
        current: currentMonthData[i].consumption,
        previous: previousMonthData[i].consumption
      });
    }
    setChartData(preparedChartData);
    
    // Get month names for display
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const currentMonthName = monthNames[currentMonth - 1];
    const previousMonthName = monthNames[previousMonth - 1];
  }, []);

  return (
    <AppLayout>
      <AppHeader />
      
      <div className="space-y-6">
        <Card className="energy-card">
          <CardHeader>
            <CardTitle>Monthly Comparison</CardTitle>
            <CardDescription>Compare your energy usage with the previous month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="p-6 bg-muted/30 rounded-lg">
                <h3 className="text-lg font-medium text-center mb-4">Energy Saved</h3>
                <div className="text-center">
                  <span className={`text-5xl font-bold ${savingSummary.kwhSaved >= 0 ? 'text-energy-success' : 'text-energy-danger'}`}>
                    {savingSummary.kwhSaved >= 0 ? '+' : ''}{savingSummary.kwhSaved.toFixed(1)}
                  </span>
                  <span className="text-2xl ml-2">kWh</span>
                </div>
                <p className="text-center mt-2 text-muted-foreground">
                  {savingSummary.kwhSaved >= 0 
                    ? 'You have reduced your energy consumption!' 
                    : 'Your energy consumption has increased.'
                  }
                </p>
              </div>
              
              <div className="p-6 bg-muted/30 rounded-lg">
                <h3 className="text-lg font-medium text-center mb-4">Money Saved</h3>
                <div className="text-center">
                  <span className={`text-5xl font-bold ${savingSummary.moneySaved >= 0 ? 'text-energy-success' : 'text-energy-danger'}`}>
                    {savingSummary.moneySaved >= 0 ? '+' : ''}₹{Math.abs(savingSummary.moneySaved).toFixed(2)}
                  </span>
                </div>
                <p className="text-center mt-2 text-muted-foreground">
                  {savingSummary.moneySaved >= 0 
                    ? 'Your energy savings translate to real money saved!' 
                    : 'Your increased consumption has cost you more.'
                  }
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="energy-card">
          <CardHeader>
            <CardTitle>Consumption Comparison</CardTitle>
            <CardDescription>Compare your daily energy usage between months</CardDescription>
          </CardHeader>
          <CardContent className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={chartData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis 
                  dataKey="day" 
                  label={{ value: 'Day of Month', position: 'insideBottom', offset: -5 }} 
                />
                <YAxis 
                  label={{ value: 'kWh', angle: -90, position: 'insideLeft' }} 
                />
                <Tooltip 
                  formatter={(value: number) => [`${value} kWh`, '']}
                  labelFormatter={(label) => `Day ${label}`} 
                />
                <Legend verticalAlign="top" height={36} />
                <Line 
                  type="monotone" 
                  dataKey="current" 
                  name="Current Month" 
                  stroke="#4CAF50" 
                  strokeWidth={2}
                  activeDot={{ r: 6 }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="previous" 
                  name="Previous Month" 
                  stroke="#9E9E9E" 
                  strokeWidth={2}
                  activeDot={{ r: 6 }} 
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="energy-card">
            <CardHeader>
              <CardTitle>Current Month Data</CardTitle>
              <CardDescription>Daily consumption for current month</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Day</TableHead>
                      <TableHead>Consumption (kWh)</TableHead>
                      <TableHead>Cost (₹)</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {currentData
                      .filter(day => day.consumption !== null)
                      .slice(0, 10) // Show first 10 days for brevity
                      .map((day) => (
                        <TableRow key={day.day}>
                          <TableCell>Day {day.day}</TableCell>
                          <TableCell>{day.consumption} kWh</TableCell>
                          <TableCell>₹{day.cost}</TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
          
          <Card className="energy-card">
            <CardHeader>
              <CardTitle>Previous Month Data</CardTitle>
              <CardDescription>Daily consumption for previous month</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Day</TableHead>
                      <TableHead>Consumption (kWh)</TableHead>
                      <TableHead>Cost (₹)</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {previousData
                      .filter(day => day.consumption !== null)
                      .slice(0, 10) // Show first 10 days for brevity
                      .map((day) => (
                        <TableRow key={day.day}>
                          <TableCell>Day {day.day}</TableCell>
                          <TableCell>{day.consumption} kWh</TableCell>
                          <TableCell>₹{day.cost}</TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};

export default Comparison;
