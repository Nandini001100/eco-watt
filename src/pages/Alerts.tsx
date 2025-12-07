
import AppLayout from '@/components/layout/AppLayout';
import AppHeader from '@/components/layout/AppHeader';
import AlertsList from '@/components/alerts/AlertsList';
import AlertsHeader from '@/components/alerts/AlertsHeader';
import AlertsSettings from '@/components/alerts/AlertsSettings';
import { useState } from 'react';

const Alerts = () => {
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  return (
    <AppLayout>
      <AppHeader />
      
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Alerts & Notifications</h1>
          <p className="text-muted-foreground mt-2">Stay updated with your energy consumption alerts</p>
        </div>
        
        <AlertsHeader filter={filter} setFilter={setFilter} />
        <AlertsList filter={filter} />
        <AlertsSettings />
      </div>
    </AppLayout>
  );
};

export default Alerts;
