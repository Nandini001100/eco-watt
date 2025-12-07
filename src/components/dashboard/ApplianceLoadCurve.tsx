
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { generateHourlyData } from '@/utils/mockData';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Button } from "../ui/button";
import { Clock } from "lucide-react";

interface ApplianceLoadCurveProps {
  appliance: {
    id: number;
    name: string;
    wattage: number;
    dailyUsageHours: number;
  };
}

const ApplianceLoadCurve: React.FC<ApplianceLoadCurveProps> = ({ appliance }) => {
  const hourlyData = generateHourlyData(appliance);
  
  const chartConfig = {
    consumption: {
      label: "Energy (kWh)",
      theme: {
        light: "#2196F3",
        dark: "#90CAF9"
      }
    }
  };
  
  return (
    <Card className="energy-card">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle className="text-lg">{appliance.name} - 24 Hour Usage Pattern</CardTitle>
          <CardDescription>Hourly energy consumption in kWh</CardDescription>
        </div>
        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
          <Clock className="h-4 w-4 text-blue-600" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-72">
          <ChartContainer config={chartConfig} className="h-full w-full">
            <LineChart data={hourlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="hour" 
                tickFormatter={(hour) => `${hour}:00`}
                label={{ value: 'Hour of Day', position: 'insideBottom', offset: -10 }}
                padding={{ left: 0, right: 0 }}
              />
              <YAxis 
                label={{ value: 'Energy (kWh)', angle: -90, position: 'insideLeft', offset: 10 }}
              />
              <ChartTooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="rounded-lg border bg-background p-2 shadow-sm">
                        <div className="grid grid-cols-2 gap-2">
                          <div className="font-medium">Time:</div>
                          <div>{`${payload[0].payload.hour}:00`}</div>
                          <div className="font-medium">Energy:</div>
                          <div>{`${payload[0].value} kWh`}</div>
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Line
                type="monotone"
                dataKey="consumption"
                stroke="#2196F3"
                strokeWidth={2}
                activeDot={{ r: 6 }}
                dot={{ r: 4 }}
              />
              <Legend />
            </LineChart>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default ApplianceLoadCurve;
