import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import {
  registerWithEmail,
  createRegistrationPayment,
} from "@/services/auth.service";

export const useRegister = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const registerByEmail = async ({
    name,
    email,
    password,
    is_captain,
    is_provider,
    redirectTo = "/dashboard",
  }: {
    name: string;
    email: string;
    password: string;
    is_captain?: boolean;
    is_provider?: boolean;
    redirectTo?: string;
  }) => {
    try {
      setLoading(true);

      // Register user
      const registerRes = await registerWithEmail({
        name,
        email,
        password,
        is_captain,
        is_provider,
      });

      // Store user data
      if (registerRes.user_id) {
        sessionStorage.setItem("user_id", registerRes.user_id);
      }
      if (registerRes.email) {
        sessionStorage.setItem("user_email", registerRes.email);
      }

      // Store Captain specific data
      if (is_captain && registerRes.user?.captain_code) {
        sessionStorage.setItem("captain_code", registerRes.user.captain_code);
        sessionStorage.setItem("is_captain", "true");
      }

      toast({
        title: "Registration Successful",
        description: is_captain
          ? "Account created! Please complete verification."
          : "Your account has been created successfully!",
        variant: "default",
      });

      setLoading(false);

      if (is_captain) {
        navigate("/captain/verification");
      } else if (is_provider) {
        navigate("/service-provider-registration");
      } else {
        navigate(redirectTo);
      }

    } catch (error: any) {
      setLoading(false);

      // Handle field-specific errors
      const errorData = error?.response?.data;

      if (errorData?.errors) {
        // Extract error messages from the errors object
        const errorMessages = Object.entries(errorData.errors)
          .map(([field, messages]: [string, any]) => {
            const fieldMessages = Array.isArray(messages) ? messages.join(", ") : messages;
            return `${field}: ${fieldMessages}`;
          })
          .join("\n");

        toast({
          title: "Registration Failed",
          description: errorMessages,
          variant: "destructive",
        });
      } else {
        // Fallback to generic error message
        toast({
          title: "Registration Failed",
          description:
            errorData?.message ||
            "Something went wrong. Please try again.",
          variant: "destructive",
        });
      }
    }
  };

  const registerByPhone = () => {
    navigate("/verify-otp");
  };

  return {
    registerByEmail,
    registerByPhone,
    loading,
  };
};
