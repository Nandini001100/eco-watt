
import ForgotPasswordForm from '@/components/auth/ForgotPasswordForm';

const ForgotPassword = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-background to-muted p-4">
      <div className="w-full max-w-md mb-8 text-center">
        <div className="flex justify-center mb-4">
          <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary-foreground">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path>
            </svg>
          </div>
        </div>
        <h1 className="text-3xl font-bold">Reset Your Password</h1>
        <p className="mt-2 text-muted-foreground">We'll help you get back into your account</p>
      </div>
      
      <ForgotPasswordForm />
    </div>
  );
};

export default ForgotPassword;
