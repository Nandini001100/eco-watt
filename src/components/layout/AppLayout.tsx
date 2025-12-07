
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SidebarProvider } from '@/components/ui/sidebar';
import AppSidebar from './AppSidebar';
import { useToast } from '@/components/ui/use-toast';

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem('auth_token');
    
    if (!token) {
      toast({
        variant: "destructive",
        title: "Access denied",
        description: "Please login to access this page.",
      });
      navigate('/login');
      return;
    }
    
    setIsAuthenticated(true);
  }, [navigate, toast]);

  if (!isAuthenticated) {
    return null; // Don't render anything while checking auth
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <main className="flex-1 p-4 md:p-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
};

export default AppLayout;
