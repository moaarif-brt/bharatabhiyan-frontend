import { ReactNode } from "react";

interface AuthCardProps {
  children: ReactNode;
}

const AuthCard = ({ children }: AuthCardProps) => {
  return (
    <div className="min-h-screen gradient-background flex items-center justify-center p-4">
      <div className="auth-card animate-scale-in">
        {children}
      </div>
    </div>
  );
};

export default AuthCard;
