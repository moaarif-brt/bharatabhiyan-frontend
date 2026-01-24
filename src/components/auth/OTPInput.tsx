import { useRef, useState, useEffect } from "react";

interface OTPInputProps {
  length?: number;
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

const OTPInput = ({ length = 6, value, onChange, error }: OTPInputProps) => {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [localValues, setLocalValues] = useState<string[]>(
    value.split("").concat(Array(length - value.length).fill(""))
  );

  useEffect(() => {
    const newValues = value.split("").concat(Array(length - value.length).fill(""));
    setLocalValues(newValues);
  }, [value, length]);

  const handleChange = (index: number, inputValue: string) => {
    if (!/^\d*$/.test(inputValue)) return;

    const newValues = [...localValues];
    newValues[index] = inputValue.slice(-1);
    setLocalValues(newValues);
    onChange(newValues.join(""));

    if (inputValue && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !localValues[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, length);
    if (!/^\d+$/.test(pastedData)) return;

    const newValues = pastedData.split("").concat(Array(length - pastedData.length).fill(""));
    setLocalValues(newValues);
    onChange(newValues.join(""));
    inputRefs.current[Math.min(pastedData.length, length - 1)]?.focus();
  };

  return (
    <div className="space-y-2">
      <div className="flex justify-center gap-3">
        {localValues.map((digit, index) => (
          <input
            key={index}
            ref={(el) => (inputRefs.current[index] = el)}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onPaste={handlePaste}
            className={`otp-box ${error ? "border-destructive" : ""} ${
              digit ? "border-primary" : ""
            }`}
          />
        ))}
      </div>
      {error && (
        <p className="text-sm text-destructive text-center">{error}</p>
      )}
    </div>
  );
};

export default OTPInput;
