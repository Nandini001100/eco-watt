
import { useState, useEffect } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import AppHeader from '@/components/layout/AppHeader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getApplianceData } from '@/utils/mockData';
import { useToast } from '@/components/ui/use-toast';
import AppliancesList from '@/components/appliances/AppliancesList';
import ApplianceComparisonChart from '@/components/appliances/ApplianceComparisonChart';
import EnergyCalculationGuide from '@/components/appliances/EnergyCalculationGuide';
import AddApplianceDialog from '@/components/appliances/AddApplianceDialog';

const Appliances = () => {
  const [appliances, setAppliances] = useState<any[]>([]);
  const [newAppliance, setNewAppliance] = useState({
    name: '',
    wattage: '',
    hours: ''
  });
  const [chartData, setChartData] = useState<any[]>([]);
  const { toast } = useToast();
  
  useEffect(() => {
    // Get appliance data
    const applianceData = getApplianceData();
    setAppliances(applianceData);
    
    // Prepare data for chart
    const chartData = applianceData
      .slice(0, 5) // Top 5 appliances
      .map(appliance => ({
        name: appliance.name,
        energy: appliance.monthlyEnergy,
        cost: appliance.monthlyCost
      }));
    
    setChartData(chartData);
  }, []);
  
  const handleAddAppliance = (newApplianceData: {
    name: string;
    wattage: string;
    hours: string;
  }) => {
    // Simple validation
    if (!newApplianceData.name || !newApplianceData.wattage || !newApplianceData.hours) {
      toast({
        variant: "destructive",
        title: "Invalid input",
        description: "Please fill all fields to add an appliance.",
      });
      return;
    }
    
    const wattage = parseFloat(newApplianceData.wattage);
    const hours = parseFloat(newApplianceData.hours);
    
    if (isNaN(wattage) || isNaN(hours) || wattage <= 0 || hours <= 0) {
      toast({
        variant: "destructive",
        title: "Invalid values",
        description: "Wattage and hours must be positive numbers.",
      });
      return;
    }
    
    // Calculate energy and cost
    const dailyEnergy = (wattage * hours) / 1000; // Convert to kWh
    const monthlyEnergy = dailyEnergy * 30;
    const monthlyCost = monthlyEnergy * 5;
    
    // Calculate percentage based on total of existing appliances
    const totalEnergy = appliances.reduce((sum, app) => sum + app.monthlyEnergy, 0);
    const percentOfTotal = (monthlyEnergy / (totalEnergy + monthlyEnergy)) * 100;
    
    const newApplianceItem = {
      id: appliances.length + 1,
      name: newApplianceData.name,
      wattage: wattage,
      dailyUsageHours: hours,
      dailyEnergy: parseFloat(dailyEnergy.toFixed(2)),
      monthlyEnergy: parseFloat(monthlyEnergy.toFixed(2)),
      monthlyCost: parseFloat(monthlyCost.toFixed(2)),
      percentOfTotal: parseFloat(percentOfTotal.toFixed(1))
    };
    
    // Update appliances
    setAppliances(prev => [...prev, newApplianceItem]);
    
    // Update chart data if it's in the top 5
    const newTopAppliances = [...appliances, newApplianceItem]
      .sort((a, b) => b.monthlyEnergy - a.monthlyEnergy)
      .slice(0, 5);
      
    const newChartData = newTopAppliances.map(appliance => ({
      name: appliance.name,
      energy: appliance.monthlyEnergy,
      cost: appliance.monthlyCost
    }));
    
    setChartData(newChartData);
    
    // Reset form
    setNewAppliance({ name: '', wattage: '', hours: '' });
    
    toast({
      title: "Appliance added",
      description: `${newApplianceData.name} has been added to your appliances.`,
    });
  };

  return (
    <AppLayout>
      <AppHeader />
      
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold">Appliance Energy Consumption</h2>
          
          <AddApplianceDialog 
            onAddAppliance={handleAddAppliance}
            newAppliance={newAppliance}
            setNewAppliance={setNewAppliance}
          />
        </div>
        
        <Card className="energy-card">
          <CardHeader>
            <CardTitle>Top Appliances</CardTitle>
            <CardDescription>Your highest energy-consuming appliances</CardDescription>
          </CardHeader>
          <CardContent>
            <AppliancesList appliances={appliances} />
          </CardContent>
        </Card>
        
        <ApplianceComparisonChart chartData={chartData} />
        
        <EnergyCalculationGuide />
      </div>
    </AppLayout>
  );
};

export default Appliances;
