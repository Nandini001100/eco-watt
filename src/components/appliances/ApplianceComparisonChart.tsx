
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

interface ApplianceComparisonChartProps {
  chartData: Array<{
    name: string;
    energy: number;
    cost: number;
  }>;
}

const ApplianceComparisonChart: React.FC<ApplianceComparisonChartProps> = ({ chartData }) => {
  return (
    <Card className="energy-card">
      <CardHeader>
        <CardTitle>Appliance Comparison</CardTitle>
        <CardDescription>Visual comparison of your appliances' energy usage</CardDescription>
      </CardHeader>
      <CardContent className="h-96">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis yAxisId="left" orientation="left" stroke="#4CAF50" label={{ value: 'Energy (kWh)', angle: -90, position: 'insideLeft' }} />
            <YAxis yAxisId="right" orientation="right" stroke="#2196F3" label={{ value: 'Cost (₹)', angle: -90, position: 'right' }} />
            <Tooltip />
            <Legend />
            <Bar yAxisId="left" dataKey="energy" name="Monthly Energy (kWh)" fill="#4CAF50" />
            <Bar yAxisId="right" dataKey="cost" name="Monthly Cost (₹)" fill="#2196F3" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default ApplianceComparisonChart;
