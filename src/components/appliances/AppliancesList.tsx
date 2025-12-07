
import React, { useState } from 'react';
import { 
  Table, TableBody, TableCell, TableHead, 
  TableHeader, TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, Clock, Plug } from 'lucide-react';
import ApplianceLoadCurve from '@/components/dashboard/ApplianceLoadCurve';

interface AppliancesListProps {
  appliances: Array<{
    id: number;
    name: string;
    wattage: number;
    dailyUsageHours: number;
    dailyEnergy: number;
    monthlyEnergy: number;
    monthlyCost: number;
    percentOfTotal: number;
  }>;
}

const AppliancesList: React.FC<AppliancesListProps> = ({ appliances }) => {
  const [selectedAppliance, setSelectedAppliance] = useState<number | null>(null);

  const toggleApplianceDetails = (id: number) => {
    setSelectedAppliance(selectedAppliance === id ? null : id);
  };

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Appliance</TableHead>
            <TableHead>Daily Avg (kWh)</TableHead>
            <TableHead>Monthly (kWh)</TableHead>
            <TableHead>Monthly Cost (₹)</TableHead>
            <TableHead>% of Total</TableHead>
            <TableHead>Load Curve</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {appliances
            .sort((a, b) => b.monthlyEnergy - a.monthlyEnergy)
            .slice(0, 5)
            .map((appliance) => (
              <React.Fragment key={appliance.id}>
                <TableRow>
                  <TableCell className="font-medium">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-energy-light flex items-center justify-center mr-2">
                        <Plug className="h-4 w-4 text-energy-primary" />
                      </div>
                      {appliance.name}
                    </div>
                  </TableCell>
                  <TableCell>{appliance.dailyEnergy}</TableCell>
                  <TableCell>{appliance.monthlyEnergy}</TableCell>
                  <TableCell>₹{appliance.monthlyCost}</TableCell>
                  <TableCell>{appliance.percentOfTotal}%</TableCell>
                  <TableCell>
                    <Button 
                      variant="outline"
                      size="sm"
                      onClick={() => toggleApplianceDetails(appliance.id)}
                      className="flex items-center space-x-1"
                    >
                      <Clock className="h-4 w-4 mr-1" />
                      <span>24h Pattern</span>
                      {selectedAppliance === appliance.id ? (
                        <ChevronUp className="h-4 w-4 ml-1" />
                      ) : (
                        <ChevronDown className="h-4 w-4 ml-1" />
                      )}
                    </Button>
                  </TableCell>
                </TableRow>
                {selectedAppliance === appliance.id && (
                  <TableRow>
                    <TableCell colSpan={6} className="px-0 py-2">
                      <div className="px-4">
                        <ApplianceLoadCurve appliance={appliance} />
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </React.Fragment>
            ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AppliancesList;
