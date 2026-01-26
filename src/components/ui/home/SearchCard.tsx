import { Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const SearchCard = () => {
  return (
    <div className="bg-card rounded-xl p-6 shadow-xl border">
      <div className="flex items-center gap-2 mb-6">
        <Search className="w-5 h-5" />
        <h3 className="text-lg font-semibold">What service do you need?</h3>
      </div>

      <div className="space-y-4">
        <SelectBlock label="Category" items={["Home", "Health", "Education"]} />
        <SelectBlock label="Service Type" items={["Plumber", "Electrician"]} />
        <SelectBlock label="Location" items={["Sector 1-10", "Ashiana"]} />

        <Button className="w-full py-6">
          <Search className="mr-2 w-5 h-5" /> Search Providers
        </Button>
      </div>
    </div>
  );
};

const SelectBlock = ({
  label,
  items,
}: {
  label: string;
  items: string[];
}) => (
  <div>
    <label className="text-sm text-muted-foreground mb-2 block">{label}</label>
    <Select>
      <SelectTrigger className="h-12">
        <SelectValue placeholder={`Select ${label}`} />
      </SelectTrigger>
      <SelectContent>
        {items.map((item) => (
          <SelectItem key={item} value={item}>
            {item}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  </div>
);

export default SearchCard;
