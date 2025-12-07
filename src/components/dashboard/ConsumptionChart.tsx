
import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { getCurrentMonthData } from '@/utils/mockData';

const ConsumptionChart = () => {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    // Get the current month data
    const { currentMonthData } = getCurrentMonthData();
    
    // Format the data for the chart (only include days with data)
    const chartData = currentMonthData
      .filter(day => day.consumption !== null)
      .map(day => ({
        date: day.day, // Just show day number for cleaner x-axis
        consumption: day.consumption
      }));
    
    setData(chartData);
  }, []);

  return (
    <Card className="energy-card col-span-full">
      <CardHeader>
        <CardTitle>Daily Energy Consumption</CardTitle>
        <CardDescription>Your energy consumption (kWh) over the current month</CardDescription>
      </CardHeader>
      <CardContent className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
            <XAxis 
              dataKey="date" 
              label={{ value: 'Day', position: 'insideBottom', offset: -5 }} 
            />
            <YAxis 
              label={{ value: 'kWh', angle: -90, position: 'insideLeft' }} 
            />
            <Tooltip 
              formatter={(value: number) => [`${value} kWh`, 'Consumption']}
              labelFormatter={(label) => `Day ${label}`} 
            />
            <Legend verticalAlign="top" height={36} />
            <Line 
              type="monotone" 
              dataKey="consumption" 
              name="Energy Consumption"
              stroke="#4CAF50" 
              strokeWidth={2}
              dot={{ r: 3 }} 
              activeDot={{ r: 6 }} 
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default ConsumptionChart;
