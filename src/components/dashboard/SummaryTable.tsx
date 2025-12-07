
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { calculateEnergySummary, getCurrentMonthData } from '@/utils/mockData';

const SummaryTable = () => {
  const [summary, setSummary] = useState({
    totalConsumption: 0,
    totalCost: 0,
    dailyAvgConsumption: 0,
    dailyAvgCost: 0,
    daysCompleted: 0
  });

  useEffect(() => {
    const { currentMonthData } = getCurrentMonthData();
    const summaryData = calculateEnergySummary(currentMonthData);
    setSummary(summaryData);
  }, []);

  return (
    <Card className="energy-card">
      <CardHeader>
        <CardTitle>Current Month Summary</CardTitle>
        <CardDescription>Key metrics for your energy usage this month</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">Total Consumption</TableCell>
              <TableCell className="text-right">{summary.totalConsumption} kWh</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Total Cost</TableCell>
              <TableCell className="text-right">₹{summary.totalCost}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Days Completed</TableCell>
              <TableCell className="text-right">{summary.daysCompleted} days</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Daily Average Consumption</TableCell>
              <TableCell className="text-right">{summary.dailyAvgConsumption} kWh</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Daily Average Cost</TableCell>
              <TableCell className="text-right">₹{summary.dailyAvgCost}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default SummaryTable;
