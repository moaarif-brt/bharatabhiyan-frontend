import { Search, MapPin, Wrench } from "lucide-react";
import { MultiSelect } from "@/components/ui/MultiSelect";
import { Button } from "@/components/ui/button";

interface SearchFilterBarProps {
    categories: any[];
    areas: any[];
    selectedCategories: string[];
    selectedAreas: string[];
    onCategoryChange: (vals: string[]) => void;
    onAreaChange: (vals: string[]) => void;
    onSearch: () => void;
}

const SearchFilterBar = ({
    categories,
    areas,
    selectedCategories,
    selectedAreas,
    onCategoryChange,
    onAreaChange,
    onSearch,
}: SearchFilterBarProps) => {
    return (
        <div className="bg-white border-b sticky shadow-sm">
            <div className="max-w-7xl mx-auto px-4 py-4">
                <div className="flex flex-col lg:flex-row gap-4 items-end">
                    {/* Categories */}
                    <div className="flex-1 w-full lg:w-auto">
                        <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 block flex items-center gap-2">
                            <Wrench className="w-3 h-3" /> Service Categories
                        </label>
                        <MultiSelect
                            options={categories.map((c) => ({ label: c.name, value: String(c.id) }))}
                            selected={selectedCategories}
                            onChange={onCategoryChange}
                            placeholder="All Categories"
                            className="bg-gray-50 border-gray-200"
                        />
                    </div>

                    {/* Areas */}
                    <div className="flex-1 w-full lg:w-auto">
                        <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 block flex items-center gap-2">
                            <MapPin className="w-3 h-3" /> Service Areas
                        </label>
                        <MultiSelect
                            options={areas.map((l) => ({ label: l.name, value: String(l.id) }))}
                            selected={selectedAreas}
                            onChange={onAreaChange}
                            placeholder="All Areas"
                            className="bg-gray-50 border-gray-200"
                        />
                    </div>

                    {/* Search Button */}
                    <Button
                        className="bg-primary hover:bg-primary/90 text-white px-8 h-12 rounded-lg font-bold w-full lg:w-auto"
                        onClick={onSearch}
                    >
                        <Search className="w-4 h-4 mr-2" />
                        Update Results
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default SearchFilterBar;
