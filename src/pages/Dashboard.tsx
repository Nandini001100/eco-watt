
import AppLayout from '@/components/layout/AppLayout';
import AppHeader from '@/components/layout/AppHeader';
import EnergyOverview from '@/components/dashboard/EnergyOverview';
import ConsumptionChart from '@/components/dashboard/ConsumptionChart';
import SummaryTable from '@/components/dashboard/SummaryTable';
import AlertsPanel from '@/components/dashboard/AlertsPanel';

const Dashboard = () => {
  return (
    <AppLayout>
      <AppHeader />
      
      <div className="space-y-6">
        <EnergyOverview />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <ConsumptionChart />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <SummaryTable />
          <AlertsPanel />
        </div>
      </div>
    </AppLayout>
  );
};

export default Dashboard;
