
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from '@/components/ui/badge';

const AppHeader = () => {
  const [username, setUsername] = useState('User');
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'Energy Budget Alert',
      message: 'You are approaching your monthly budget limit',
      time: '2 hours ago',
      read: false
    },
    {
      id: 2,
      title: 'Daily Consumption Report',
      message: 'Your daily consumption report is ready',
      time: '5 hours ago',
      read: false
    }
  ]);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_email');
    localStorage.removeItem('username');
    
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account.",
    });
    
    navigate('/login');
  };

  const markAllAsRead = () => {
    setNotifications(prevNotifications => 
      prevNotifications.map(notification => ({ ...notification, read: true }))
    );
    
    toast({
      title: "Notifications marked as read",
      description: "All notifications have been marked as read.",
    });
  };

  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-semibold">Energy Dashboard</h1>
      
      <div className="flex items-center gap-4">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="icon" className="relative">
              <Bell size={18} />
              {notifications.some(n => !n.read) && (
                <span className="absolute -top-1 -right-1 bg-energy-danger text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">
                  {notifications.filter(n => !n.read).length}
                </span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-0" align="end">
            <div className="flex justify-between items-center p-4 border-b">
              <h4 className="font-medium">Notifications</h4>
              <Button variant="ghost" size="sm" onClick={markAllAsRead}>
                Mark all as read
              </Button>
            </div>
            <div className="max-h-80 overflow-auto">
              {notifications.length > 0 ? (
                notifications.map((notification) => (
                  <div 
                    key={notification.id}
                    className={`p-4 border-b last:border-0 ${!notification.read ? 'bg-muted/50' : ''}`}
                  >
                    <div className="flex justify-between items-start">
                      <h5 className="font-medium">{notification.title}</h5>
                      {!notification.read && <Badge variant="outline" className="bg-energy-accent text-white">New</Badge>}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
                    <p className="text-xs text-muted-foreground mt-2">{notification.time}</p>
                  </div>
                ))
              ) : (
                <div className="p-4 text-center text-muted-foreground">
                  No notifications
                </div>
              )}
            </div>
          </PopoverContent>
        </Popover>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="gap-2">
              <span className="hidden md:inline">{username}</span>
              <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                {username.charAt(0).toUpperCase()}
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => navigate('/settings')}>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleLogout} className="text-energy-danger focus:bg-energy-danger/10 focus:text-energy-danger">
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default AppHeader;
