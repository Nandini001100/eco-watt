
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  // For demo purposes, we'll use a mock login
  const mockUsers = [
    { email: 'demo@example.com', password: 'password123' }
  ];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Mock authentication logic
    setTimeout(() => {
      const user = mockUsers.find(
        (user) => user.email === email && user.password === password
      );

      if (user) {
        // Store token in localStorage (in a real app, you'd use JWT)
        localStorage.setItem('auth_token', 'mock_jwt_token');
        localStorage.setItem('user_email', email);
        
        toast({
          title: "Login successful!",
          description: "Welcome back to your energy dashboard.",
        });
        
        navigate('/dashboard');
      } else {
        toast({
          variant: "destructive",
          title: "Login failed",
          description: "Invalid email or password. Please try again.",
        });
      }
      
      setIsLoading(false);
    }, 1000);
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl text-center">Login</CardTitle>
        <CardDescription className="text-center">
          Sign in to your energy monitoring account
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleLogin}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <Button
                variant="link"
                className="p-0 h-auto text-xs"
                onClick={() => navigate('/forgot-password')}
                type="button"
              >
                Forgot password?
              </Button>
            </div>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </CardContent>
        <CardFooter className="flex-col space-y-4">
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Logging in..." : "Login"}
          </Button>
          <div className="text-sm text-center">
            Don't have an account?{" "}
            <Button variant="link" className="p-0 h-auto" onClick={() => navigate('/signup')}>
              Sign up
            </Button>
          </div>
        </CardFooter>
      </form>
    </Card>
  );
};

export default LoginForm;
