
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Mock password reset request
    setTimeout(() => {
      setIsSubmitted(true);
      toast({
        title: "Recovery email sent",
        description: "If your email exists in our system, you'll receive a password reset link shortly.",
      });
      setIsLoading(false);
    }, 1000);
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl text-center">Password Recovery</CardTitle>
        <CardDescription className="text-center">
          Enter your email to reset your password
        </CardDescription>
      </CardHeader>
      {!isSubmitted ? (
        <form onSubmit={handleSubmit}>
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
          </CardContent>
          <CardFooter className="flex-col space-y-4">
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Sending Recovery Email..." : "Send Recovery Email"}
            </Button>
            <Button 
              variant="outline" 
              className="w-full" 
              onClick={() => navigate('/login')}
            >
              Back to Login
            </Button>
          </CardFooter>
        </form>
      ) : (
        <CardContent className="space-y-6">
          <div className="text-center p-4">
            <div className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 p-3 rounded-lg mb-4">
              Recovery email sent successfully!
            </div>
            <p className="mb-4">
              We've sent an email to <strong>{email}</strong> with instructions to reset your password.
            </p>
            <p className="text-sm text-muted-foreground">
              Please check your inbox and spam folder. The link will expire in 1 hour.
            </p>
          </div>
          <Button 
            variant="outline"
            className="w-full" 
            onClick={() => navigate('/login')}
          >
            Back to Login
          </Button>
        </CardContent>
      )}
    </Card>
  );
};

export default ForgotPasswordForm;
