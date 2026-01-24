import { forwardRef } from "react";

interface PhoneInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  helperText?: string;
}

const PhoneInput = forwardRef<HTMLInputElement, PhoneInputProps>(
  ({ error, helperText, ...props }, ref) => {
    return (
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">
          Phone Number <span className="text-destructive">*</span>
        </label>
        {helperText && (
          <p className="text-xs text-muted-foreground">{helperText}</p>
        )}
        <div
          className={`flex items-center h-12 rounded-lg border-2 bg-background transition-all duration-200 focus-within:border-primary ${
            error
              ? "border-red-500 bg-red-50 dark:bg-red-950/20 focus-within:border-red-500"
              : "border-input"
          }`}
        >
          <span className="px-4 text-muted-foreground font-medium border-r border-input">
            +91
          </span>
          <input
            ref={ref}
            type="tel"
            className="flex-1 h-full px-4 bg-transparent text-base outline-none placeholder:text-muted-foreground"
            placeholder="Enter mobile number"
            maxLength={10}
            {...props}
          />
        </div>
        {error && (
          <p className="text-xs text-red-600 dark:text-red-400 flex items-center gap-1">
            <span className="font-semibold">✕</span> {error}
          </p>
        )}
      </div>
    );
  }
);

PhoneInput.displayName = "PhoneInput";

export default PhoneInput;
