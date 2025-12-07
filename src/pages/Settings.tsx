
import { useState } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import AppHeader from '@/components/layout/AppHeader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from '@/components/ui/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download, Plug } from 'lucide-react';

const Settings = () => {
  const [monthlyBudget, setMonthlyBudget] = useState(3000);
  const [notifications, setNotifications] = useState({
    dailyReport: true,
    budgetAlerts: true,
    savingsAchievements: true,
  });
  const [deviceId, setDeviceId] = useState('');
  const [deviceKey, setDeviceKey] = useState('');
  const [isConnecting, setIsConnecting] = useState(false);
  const { toast } = useToast();

  const handleSaveGeneral = () => {
    // In a real app, this would be saved to the server
    toast({
      title: "Settings saved",
      description: "Your general settings have been updated successfully.",
    });
  };
  
  const handleSaveNotifications = () => {
    // In a real app, this would be saved to the server
    toast({
      title: "Notification settings saved",
      description: "Your notification preferences have been updated.",
    });
  };
  
  const handleConnect = () => {
    if (!deviceId || !deviceKey) {
      toast({
        variant: "destructive",
        title: "Missing device information",
        description: "Please enter both Device ID and API Key.",
      });
      return;
    }
    
    setIsConnecting(true);
    
    // Simulate connection attempt
    setTimeout(() => {
      toast({
        title: "Device connected",
        description: `Successfully connected to Bolt device (${deviceId}).`,
      });
      setIsConnecting(false);
    }, 2000);
  };
  
  const handleExportData = (format: 'csv' | 'excel') => {
    // In a real app, this would generate and download the file
    toast({
      title: "Data export initiated",
      description: `Your energy data is being exported as ${format.toUpperCase()}.`,
    });
  };

  return (
    <AppLayout>
      <AppHeader />
      
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold">Settings</h2>
        
        <Tabs defaultValue="general">
          <TabsList>
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="devices">Devices</TabsTrigger>
            <TabsTrigger value="data">Data Management</TabsTrigger>
          </TabsList>
          
          <TabsContent value="general" className="space-y-6 mt-6">
            <Card className="energy-card">
              <CardHeader>
                <CardTitle>Energy Budget</CardTitle>
                <CardDescription>Set your monthly energy budget target</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid gap-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="budget" className="text-right">
                        Monthly Budget (₹)
                      </Label>
                      <div className="col-span-3">
                        <Input
                          id="budget"
                          type="number"
                          value={monthlyBudget}
                          onChange={(e) => setMonthlyBudget(parseInt(e.target.value) || 0)}
                          min={1000}
                          step={500}
                        />
                        <p className="text-sm text-muted-foreground mt-1">
                          Your monthly budget will be used to calculate savings targets.
                        </p>
                      </div>
                    </div>
                  </div>
                  <Button onClick={handleSaveGeneral}>Save Changes</Button>
                </div>
              </CardContent>
            </Card>
            
            <Card className="energy-card">
              <CardHeader>
                <CardTitle>Display Settings</CardTitle>
                <CardDescription>Customize how your energy data is displayed</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Switch id="currency" defaultChecked />
                    <Label htmlFor="currency">Display costs in Indian Rupees (₹)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="units" defaultChecked />
                    <Label htmlFor="units">Use Metric Units (kWh)</Label>
                  </div>
                  <Button onClick={handleSaveGeneral}>Save Changes</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="notifications" className="space-y-6 mt-6">
            <Card className="energy-card">
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>Manage your energy alerts and notifications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="daily-report">Daily Consumption Report</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive a daily summary of your energy usage
                      </p>
                    </div>
                    <Switch
                      id="daily-report"
                      checked={notifications.dailyReport}
                      onCheckedChange={(checked) =>
                        setNotifications((prev) => ({ ...prev, dailyReport: checked }))
                      }
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="budget-alerts">Budget Alerts</Label>
                      <p className="text-sm text-muted-foreground">
                        Get notified when you're approaching your monthly budget
                      </p>
                    </div>
                    <Switch
                      id="budget-alerts"
                      checked={notifications.budgetAlerts}
                      onCheckedChange={(checked) =>
                        setNotifications((prev) => ({ ...prev, budgetAlerts: checked }))
                      }
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="savings-achievements">Savings Achievements</Label>
                      <p className="text-sm text-muted-foreground">
                        Notifications when you earn badges or rewards
                      </p>
                    </div>
                    <Switch
                      id="savings-achievements"
                      checked={notifications.savingsAchievements}
                      onCheckedChange={(checked) =>
                        setNotifications((prev) => ({ ...prev, savingsAchievements: checked }))
                      }
                    />
                  </div>
                  
                  <Button onClick={handleSaveNotifications}>Save Preferences</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="devices" className="space-y-6 mt-6">
            <Card className="energy-card">
              <CardHeader>
                <CardTitle>Connect Bolt IoT Device</CardTitle>
                <CardDescription>Link your Bolt IoT device for real-time monitoring</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid gap-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="device-id" className="text-right">
                        Device ID
                      </Label>
                      <Input
                        id="device-id"
                        placeholder="Enter your Bolt device ID"
                        className="col-span-3"
                        value={deviceId}
                        onChange={(e) => setDeviceId(e.target.value)}
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="api-key" className="text-right">
                        API Key
                      </Label>
                      <Input
                        id="api-key"
                        type="password"
                        placeholder="Enter your Bolt API key"
                        className="col-span-3"
                        value={deviceKey}
                        onChange={(e) => setDeviceKey(e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <Button 
                    onClick={handleConnect} 
                    disabled={isConnecting}
                  >
                    <Plug className="mr-2 h-4 w-4" />
                    {isConnecting ? "Connecting..." : "Connect Device"}
                  </Button>
                  
                  <div className="bg-muted/30 p-4 rounded-md">
                    <h3 className="font-medium">Why connect a Bolt IoT device?</h3>
                    <p className="text-sm text-muted-foreground mt-2">
                      Connecting a Bolt IoT device enables real-time monitoring of individual 
                      appliances, providing more accurate data for energy optimization. The device 
                      can be attached to your electrical panel or individual appliances.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="data" className="space-y-6 mt-6">
            <Card className="energy-card">
              <CardHeader>
                <CardTitle>Export Energy Data</CardTitle>
                <CardDescription>Download your energy consumption data for analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    Download your energy consumption data in CSV or Excel format for further analysis
                    or record-keeping.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button variant="outline" onClick={() => handleExportData('csv')}>
                      <Download className="mr-2 h-4 w-4" />
                      Export as CSV
                    </Button>
                    <Button variant="outline" onClick={() => handleExportData('excel')}>
                      <Download className="mr-2 h-4 w-4" />
                      Export as Excel
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="energy-card">
              <CardHeader>
                <CardTitle>Data Privacy</CardTitle>
                <CardDescription>Manage your energy data privacy settings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Switch id="anonymous" defaultChecked />
                    <div>
                      <Label htmlFor="anonymous">Anonymous Usage Data</Label>
                      <p className="text-sm text-muted-foreground">
                        Allow anonymous usage data to be used for improving energy-saving recommendations
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch id="sharing" />
                    <div>
                      <Label htmlFor="sharing">Data Sharing</Label>
                      <p className="text-sm text-muted-foreground">
                        Share your energy data with your utility provider for better rate plans
                      </p>
                    </div>
                  </div>
                  
                  <Button onClick={handleSaveGeneral}>Save Preferences</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default Settings;
