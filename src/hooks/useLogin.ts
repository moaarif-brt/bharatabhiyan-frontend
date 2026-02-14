import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";

export const useLogin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);

  const loginByEmail = async ({
    email,
    password,
    redirectTo = "/",
  }: {
    email: string;
    password: string;
    redirectTo?: string;
  }) => {
    try {
      setLoading(true);

      // 📧 Email login - authenticate directly
      const user = await login(email, password);

      toast({
        title: "Login Successful",
        description: "Welcome back!",
      });

      setLoading(false);

      if (user?.is_captain) {
        navigate("/captain/dashboard");
      } else if (user?.is_provider_register && !user?.is_provider) {
        navigate("/service-provider-registration");
      } else if (user?.is_provider) {
        navigate("/provider/dashboard");
      } else {
        navigate(redirectTo);
      }

    } catch (error: any) {
      toast({
        title: "Login Failed",
        description:
          error?.response?.data?.message ||
          "Invalid email or password. Please try again.",
        variant: "destructive",
      });
      setLoading(false);
    }
  };

  const loginByPhone = () => {
    // 📞 Phone login - redirect to OTP verification
    navigate("/verify-otp");
  };

  return {
    loginByEmail,
    loginByPhone,
    loading,
  };
};
