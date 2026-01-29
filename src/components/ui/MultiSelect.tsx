import * as React from "react";
import { Check, ChevronDown, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";

interface MultiSelectProps {
    options: { label: string; value: string }[];
    selected: string[];
    onChange: (selected: string[]) => void;
    placeholder?: string;
    className?: string;
}

export function MultiSelect({
    options,
    selected,
    onChange,
    placeholder = "Select options...",
    className,
}: MultiSelectProps) {
    const [open, setOpen] = React.useState(false);

    const handleUnselect = (value: string) => {
        onChange(selected.filter((s) => s !== value));
    };

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="ghost"
                    role="combobox"
                    aria-expanded={open}
                    className={cn(
                        "w-full justify-between h-auto min-h-12 py-2 px-3 border border-border transition-all hover:bg-transparent hover:text-inherit",
                        className
                    )}
                >
                    <div className="flex flex-wrap gap-1 flex-1 text-left">
                        {selected.length === 0 && (
                            <span className="text-muted-foreground">{placeholder}</span>
                        )}
                        {selected.map((value) => {
                            const option = options.find((o) => o.value === value);
                            return (
                                <Badge
                                    key={value}
                                    variant="secondary"
                                    className="mr-1 mb-1 bg-primary/10 text-primary border-primary/20 hover:bg-primary/20"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleUnselect(value);
                                    }}
                                >
                                    {option?.label}
                                    <X className="ml-1 h-3 w-3 cursor-pointer" />
                                </Badge>
                            );
                        })}
                    </div>
                    <ChevronDown className="h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0" align="start">
                <Command>
                    <CommandInput placeholder="Search..." aria-label="Search options" />
                    <CommandList>
                        <CommandEmpty>No results found.</CommandEmpty>
                        <CommandGroup className="max-h-64 overflow-auto">
                            {options.map((option) => (
                                <CommandItem
                                    key={option.value}
                                    onSelect={() => {
                                        onChange(
                                            selected.includes(option.value)
                                                ? selected.filter((s) => s !== option.value)
                                                : [...selected, option.value]
                                        );
                                    }}
                                >
                                    <div
                                        className={cn(
                                            "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                                            selected.includes(option.value)
                                                ? "bg-primary text-primary-foreground"
                                                : "opacity-50 [&_svg]:invisible"
                                        )}
                                    >
                                        <Check className={cn("h-3 w-3")} />
                                    </div>
                                    <span>{option.label}</span>
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
