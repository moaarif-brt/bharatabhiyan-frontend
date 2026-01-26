import {
  MapPin,
  Search,
  Star,
  Briefcase,
  CheckCircle,
  Wrench,
  Tag,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

const FiltersSidebar = ({
  config = {serviceTypes: []},
  locations = [],
  appliedFilters,
  removeFilter,
  clearAllFilters,
  selectedServiceTypes,
  setSelectedServiceTypes,
  selectedLocations,
  setSelectedLocations,
  selectedRating,
  setSelectedRating,
  selectedExperience,
  setSelectedExperience,
  priceRange,
  setPriceRange,
  filters,
  setFilters,
}: any) => {
  return (
    <aside className="w-full lg:w-80 shrink-0">
      <div className="bg-white rounded-xl border p-4 space-y-6 sticky top-4">

        {/* Applied Filters */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-foreground flex items-center gap-2">
              <Tag className="w-4 h-4 text-orange-500" />
              Applied Filters
            </h3>
            <button
              onClick={clearAllFilters}
              className="text-primary text-sm hover:underline"
            >
              Clear All
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {appliedFilters.map((filter: string) => (
              <span
                key={filter}
                className="inline-flex items-center gap-1 px-3 py-1.5 bg-gray-100 rounded-full text-sm"
              >
                {filter}
                <button onClick={() => removeFilter(filter)}>
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Service Type */}
        <div>
          <h3 className="font-semibold text-foreground flex items-center gap-2 mb-3">
            <Wrench className="w-4 h-4 text-muted-foreground" />
            Service Type
          </h3>
          <div className="space-y-2">
            {config.serviceTypes.map((service: any) => (
              <div key={service.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Checkbox
                    id={service.name}
                    checked={selectedServiceTypes.includes(service.name)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setSelectedServiceTypes([...selectedServiceTypes, service.name]);
                      } else {
                        setSelectedServiceTypes(
                          selectedServiceTypes.filter((s: string) => s !== service.name)
                        );
                      }
                    }}
                  />
                  <Label htmlFor={service.name} className="text-sm cursor-pointer">
                    {service.name}
                  </Label>
                </div>
                <span className="text-xs text-muted-foreground">{service.count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Location */}
        <div>
          <h3 className="font-semibold text-foreground flex items-center gap-2 mb-3">
            <MapPin className="w-4 h-4 text-red-500" />
            Location
          </h3>
          <div className="relative mb-3">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search area..." className="pl-9" />
          </div>
          <div className="space-y-2">
            {locations.map((location: any) => (
              <div key={location.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Checkbox
                    id={location.name}
                    checked={selectedLocations.includes(location.name)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setSelectedLocations([...selectedLocations, location.name]);
                      } else {
                        setSelectedLocations(
                          selectedLocations.filter((l: string) => l !== location.name)
                        );
                      }
                    }}
                  />
                  <Label htmlFor={location.name} className="text-sm cursor-pointer">
                    {location.name}
                  </Label>
                </div>
                <span className="text-xs text-muted-foreground">{location.count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Rating */}
        <div>
          <h3 className="font-semibold text-foreground flex items-center gap-2 mb-3">
            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
            Rating
          </h3>
          <RadioGroup value={selectedRating} onValueChange={setSelectedRating}>
            <div className="space-y-2">
              {[
                { value: "4.5", label: "4.5 & above", stars: 5 },
                { value: "4.0", label: "4.0 & above", stars: 4 },
                { value: "3.0", label: "3.0 & above", stars: 3 },
                { value: "all", label: "All ratings", stars: 0 },
              ].map((rating) => (
                <div key={rating.value} className="flex items-center gap-2">
                  <RadioGroupItem value={rating.value} id={`rating-${rating.value}`} />
                  <Label
                    htmlFor={`rating-${rating.value}`}
                    className="text-sm cursor-pointer flex items-center gap-1"
                  >
                    {rating.stars > 0 && (
                      <span className="flex">
                        {[...Array(rating.stars)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-3 h-3 text-yellow-500 fill-yellow-500"
                          />
                        ))}
                      </span>
                    )}
                    {rating.label}
                  </Label>
                </div>
              ))}
            </div>
          </RadioGroup>
        </div>

        {/* Experience */}
        <div>
          <h3 className="font-semibold text-foreground flex items-center gap-2 mb-3">
            <Briefcase className="w-4 h-4 text-purple-500" />
            Experience
          </h3>
          <div className="flex flex-wrap gap-2">
            {["Any", "1-3 yrs", "3-5 yrs", "5-10 yrs", "10+ yrs"].map((exp) => (
              <button
                key={exp}
                onClick={() => setSelectedExperience(exp)}
                className={`px-3 py-1.5 rounded-full text-sm border transition-colors ${
                  selectedExperience === exp
                    ? "bg-primary text-white border-primary"
                    : "bg-white text-foreground border-gray-200 hover:border-primary"
                }`}
              >
                {exp}
              </button>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div>
          <h3 className="font-semibold text-foreground flex items-center gap-2 mb-3">
            <span className="text-green-600 font-bold">₹</span>
            Price Range
          </h3>
          <Slider
            value={priceRange}
            onValueChange={setPriceRange}
            max={1000}
            step={50}
            className="mb-3"
          />
          <div className="flex items-center gap-2 text-sm">
            <div className="flex-1 px-3 py-2 border rounded-lg text-center">
              ₹{priceRange[0]}
            </div>
            <span className="text-muted-foreground">to</span>
            <div className="flex-1 px-3 py-2 border rounded-lg text-center">
              ₹{priceRange[1]}
            </div>
          </div>
        </div>

        {/* Additional */}
        <div>
          <h3 className="font-semibold text-foreground flex items-center gap-2 mb-3">
            <CheckCircle className="w-4 h-4 text-blue-500" />
            Additional
          </h3>
          <div className="space-y-2">
            {[
              { key: "verifiedOnly", label: "Verified Only" },
              { key: "availableNow", label: "Available Now" },
              { key: "emergencyServices", label: "Emergency Services" },
              { key: "weekendAvailable", label: "Weekend Available" },
            ].map((option) => (
              <div key={option.key} className="flex items-center gap-2">
                <Checkbox
                  id={option.key}
                  checked={filters[option.key]}
                  onCheckedChange={(checked) =>
                    setFilters({ ...filters, [option.key]: checked })
                  }
                />
                <Label htmlFor={option.key} className="text-sm cursor-pointer">
                  {option.label}
                </Label>
              </div>
            ))}
          </div>
        </div>

      </div>
    </aside>
  );
};

export default FiltersSidebar;
