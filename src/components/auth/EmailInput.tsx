import { forwardRef } from "react";

interface EmailInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

const EmailInput = forwardRef<HTMLInputElement, EmailInputProps>(
  ({ error, ...props }, ref) => {
    return (
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">
          Email Address <span className="text-destructive">*</span>
        </label>
        <input
          ref={ref}
          type="email"
          className={`input-field border-2 transition-all ${
            error
              ? "border-red-500 bg-red-50 dark:bg-red-950/20 focus:border-red-500"
              : "border-border"
          }`}
          placeholder="Enter your email address"
          {...props}
        />
        {error && (
          <p className="text-xs text-red-600 dark:text-red-400 flex items-center gap-1">
            <span className="font-semibold">✕</span> {error}
          </p>
        )}
      </div>
    );
  }
);

EmailInput.displayName = "EmailInput";

export default EmailInput;
