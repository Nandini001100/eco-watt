
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem('auth_token');
    
    if (token) {
      // If authenticated, redirect to dashboard
      navigate('/dashboard');
    } else {
      // If not authenticated, redirect to login
      navigate('/login');
    }
  }, [navigate]);
  
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-semibold mb-2">Loading EcoSmart Insight Hub</h2>
        <p className="text-muted-foreground">Please wait...</p>
      </div>
    </div>
  );
};

export default Index;
