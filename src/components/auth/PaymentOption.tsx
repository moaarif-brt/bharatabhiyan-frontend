interface PaymentOptionProps {
  icon: string;
  label: string;
  description: string;
  selected: boolean;
  onSelect: () => void;
}

const PaymentOption = ({
  icon,
  label,
  description,
  selected,
  onSelect,
}: PaymentOptionProps) => {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`payment-option w-full text-left ${selected ? "selected" : ""}`}
    >
      <div className="w-5 h-5 rounded-full border-2 border-current flex items-center justify-center flex-shrink-0">
        {selected && (
          <div className="w-2.5 h-2.5 rounded-full bg-primary" />
        )}
      </div>
      <span className="text-2xl">{icon}</span>
      <div className="flex-1">
        <p className="font-medium text-foreground">{label}</p>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </button>
  );
};

export default PaymentOption;
