
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Settings } from 'lucide-react';

const AlertsSettings = () => {
  const [settings, setSettings] = useState({
    budgetThreshold: true,
    highConsumption: true,
    dailySavings: true,
    weeklyForecast: true
  });

  const handleSettingChange = (setting: keyof typeof settings) => {
    setSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Settings className="h-5 w-5" />
          <CardTitle>Alert Settings</CardTitle>
        </div>
        <CardDescription>
          Customize which alerts you want to receive
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="budget-alerts" className="text-base font-medium">
              Budget threshold alerts
            </Label>
            <p className="text-sm text-muted-foreground">
              Get notified when approaching your monthly budget limit
            </p>
          </div>
          <Switch
            id="budget-alerts"
            checked={settings.budgetThreshold}
            onCheckedChange={() => handleSettingChange('budgetThreshold')}
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="consumption-alerts" className="text-base font-medium">
              High consumption alerts
            </Label>
            <p className="text-sm text-muted-foreground">
              Get notified when appliances consume unusually high energy
            </p>
          </div>
          <Switch
            id="consumption-alerts"
            checked={settings.highConsumption}
            onCheckedChange={() => handleSettingChange('highConsumption')}
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="savings-alerts" className="text-base font-medium">
              Daily savings notifications
            </Label>
            <p className="text-sm text-muted-foreground">
              Get notified about your daily energy savings achievements
            </p>
          </div>
          <Switch
            id="savings-alerts"
            checked={settings.dailySavings}
            onCheckedChange={() => handleSettingChange('dailySavings')}
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="forecast-alerts" className="text-base font-medium">
              Weekly forecast updates
            </Label>
            <p className="text-sm text-muted-foreground">
              Get weekly updates about your projected energy consumption
            </p>
          </div>
          <Switch
            id="forecast-alerts"
            checked={settings.weeklyForecast}
            onCheckedChange={() => handleSettingChange('weeklyForecast')}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default AlertsSettings;
