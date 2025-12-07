
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

const EnergyCalculationGuide: React.FC = () => {
  return (
    <Card className="energy-card">
      <CardHeader>
        <CardTitle>Energy Calculation Guide</CardTitle>
        <CardDescription>How energy consumption and costs are calculated</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="p-4 bg-muted/30 rounded-lg">
            <h3 className="font-medium">Energy (kWh)</h3>
            <p className="text-muted-foreground mt-1">
              Energy (kWh) = (Wattage × Hours Used) / 1000
            </p>
            <p className="text-sm mt-2">
              Example: A 500W device used for 3 hours = (500 × 3) / 1000 = 1.5 kWh
            </p>
          </div>
          
          <div className="p-4 bg-muted/30 rounded-lg">
            <h3 className="font-medium">Cost (₹)</h3>
            <p className="text-muted-foreground mt-1">
              Cost (₹) = Energy × ₹5
            </p>
            <p className="text-sm mt-2">
              Example: 1.5 kWh × ₹5 = ₹7.5
            </p>
          </div>
          
          <div className="p-4 bg-muted/30 rounded-lg">
            <h3 className="font-medium">Monthly Calculations</h3>
            <p className="text-muted-foreground mt-1">
              Monthly Energy (kWh) = Daily Energy × 30 days
            </p>
            <p className="text-muted-foreground mt-1">
              Monthly Cost (₹) = Monthly Energy × ₹5
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EnergyCalculationGuide;
