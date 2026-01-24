import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Header from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ChevronRight,
  List,
  LayoutGrid,
  MapPin,
  Search,
  X,
  Star,
  Phone,
  MessageCircle,
  Heart,
  Share2,
  Clock,
  Briefcase,
  CheckCircle,
  Wrench,
  Zap,
  Paintbrush,
  Hammer,
  Wind,
  Droplets,
  Tag,
  SearchX,
} from "lucide-react";

const serviceConfig: Record<string, { title: string; icon: any; serviceTypes: { name: string; count: number }[] }> = {
  plumbing: {
    title: "Plumbing",
    icon: Wrench,
    serviceTypes: [
      { name: "General Plumbing", count: 32 },
      { name: "Pipeline Work", count: 18 },
      { name: "Bathroom Fitting", count: 24 },
      { name: "Water Tank", count: 15 },
      { name: "Leak Repair", count: 28 },
    ],
  },
  electrical: {
    title: "Electrical",
    icon: Zap,
    serviceTypes: [
      { name: "Wiring", count: 45 },
      { name: "Switch & Socket", count: 32 },
      { name: "Fan Installation", count: 28 },
      { name: "MCB & Panel", count: 15 },
      { name: "Appliance Repair", count: 22 },
    ],
  },
  painting: {
    title: "Painting",
    icon: Paintbrush,
    serviceTypes: [
      { name: "Interior Painting", count: 38 },
      { name: "Exterior Painting", count: 25 },
      { name: "Wall Textures", count: 18 },
      { name: "Waterproofing", count: 20 },
      { name: "Wood Polishing", count: 12 },
    ],
  },
  carpentry: {
    title: "Carpentry",
    icon: Hammer,
    serviceTypes: [
      { name: "Furniture Repair", count: 30 },
      { name: "Door/Window Fitting", count: 22 },
      { name: "Custom Woodwork", count: 18 },
      { name: "Modular Kitchen", count: 15 },
      { name: "Wardrobe", count: 25 },
    ],
  },
  "ac-repair": {
    title: "AC Repair",
    icon: Wind,
    serviceTypes: [
      { name: "AC Installation", count: 28 },
      { name: "AC Servicing", count: 42 },
      { name: "Gas Refilling", count: 35 },
      { name: "AC Repair", count: 30 },
      { name: "AC Uninstall", count: 18 },
    ],
  },
  cleaning: {
    title: "Cleaning",
    icon: Droplets,
    serviceTypes: [
      { name: "Deep Cleaning", count: 40 },
      { name: "Sofa Cleaning", count: 28 },
      { name: "Kitchen Cleaning", count: 32 },
      { name: "Bathroom Cleaning", count: 25 },
      { name: "Pest Control", count: 20 },
    ],
  },
};

const mockProviders = [
  {
    id: 1,
    initials: "RS",
    name: "Ramesh Sharma",
    company: "Sharma Plumbing Services",
    rating: 4.9,
    reviews: 127,
    services: ["General Plumbing", "Pipeline", "Leak Repair"],
    location: "Sector 1-20, Bhiwadi",
    experience: "10+ years",
    jobsCompleted: "500+",
    availability: "Available today",
    description: "Experienced plumber with expertise in residential and commercial plumbing. Specializing in pipe fitting, leak repairs, bathroom installations, and water tank maintenance.",
    price: 299,
    isVerified: true,
    isFeatured: true,
    isNew: false,
  },
  {
    id: 2,
    initials: "AK",
    name: "Anil Kumar",
    company: "Kumar Plumbing Works",
    rating: 4.7,
    reviews: 89,
    services: ["Bathroom Fitting", "Water Tank", "Pipeline"],
    location: "Sector 11-25, Ashiana",
    experience: "8+ years",
    jobsCompleted: "320+",
    availability: "Available tomorrow",
    description: "Professional plumber specializing in bathroom fittings and renovations. Quality work with reasonable pricing. Emergency services available on weekends.",
    price: 249,
    isVerified: true,
    isFeatured: false,
    isNew: false,
  },
  {
    id: 3,
    initials: "SY",
    name: "Suresh Yadav",
    company: "Yadav Plumbing Solutions",
    rating: 4.8,
    reviews: 45,
    services: ["General Plumbing", "Emergency Repairs"],
    location: "All Bhiwadi Areas",
    experience: "5+ years",
    jobsCompleted: "180+",
    availability: "24/7 Emergency",
    description: "Quick and reliable plumbing services. Available for emergency calls 24/7. Specializing in leak detection and fast repairs at affordable rates.",
    price: 199,
    isVerified: true,
    isFeatured: false,
    isNew: true,
  },
  {
    id: 4,
    initials: "MK",
    name: "Manoj Kumar",
    company: "Kumar & Sons Plumbers",
    rating: 4.6,
    reviews: 112,
    services: ["Commercial Plumbing", "Industrial"],
    location: "RIICO, Industrial Area",
    experience: "15+ years",
    jobsCompleted: "800+",
    availability: "Commercial specialist",
    description: "Expert in commercial and industrial plumbing with 15+ years experience. Team of 5 skilled plumbers. Handles large projects and corporate contracts.",
    price: 499,
    isVerified: true,
    isFeatured: false,
    isNew: false,
  },
];

const locations = [
  { name: "Sector 1-10", count: 15 },
  { name: "Sector 11-20", count: 12 },
  { name: "Sector 21-30", count: 8 },
  { name: "Ashiana Town", count: 9 },
  { name: "RIICO Area", count: 4 },
];

const ServiceProviderListing = () => {
  const { serviceType } = useParams<{ serviceType: string }>();
  const [viewMode, setViewMode] = useState<"list" | "grid" | "map">("list");
  const [sortBy, setSortBy] = useState("relevance");
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedServiceTypes, setSelectedServiceTypes] = useState<string[]>(["General Plumbing"]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>(["Sector 1-10", "Sector 11-20"]);
  const [selectedRating, setSelectedRating] = useState("4.5");
  const [selectedExperience, setSelectedExperience] = useState("1-3");
  const [filters, setFilters] = useState({
    verifiedOnly: true,
    availableNow: false,
    emergencyServices: false,
    weekendAvailable: false,
  });
  const [appliedFilters, setAppliedFilters] = useState(["Plumber", "Bhiwadi", "4+ Rating"]);
  const [showNoResults, setShowNoResults] = useState(false);

  const config = serviceConfig[serviceType || "plumbing"] || serviceConfig.plumbing;
  const ServiceIcon = config.icon;

  const removeFilter = (filter: string) => {
    setAppliedFilters(appliedFilters.filter((f) => f !== filter));
  };

  const clearAllFilters = () => {
    setAppliedFilters([]);
    setSelectedServiceTypes([]);
    setSelectedLocations([]);
    setSelectedRating("all");
    setSelectedExperience("any");
    setPriceRange([0, 1000]);
    setFilters({
      verifiedOnly: false,
      availableNow: false,
      emergencyServices: false,
      weekendAvailable: false,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <nav className="flex items-center gap-2 text-sm">
            <Link to="/" className="text-muted-foreground hover:text-primary">Home</Link>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
            <Link to="/services/home" className="text-muted-foreground hover:text-primary">Services</Link>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
            <Link to="/services/home" className="text-muted-foreground hover:text-primary">Home Repairs</Link>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
            <span className="text-foreground font-medium">{config.title} in Bhiwadi</span>
          </nav>
        </div>
      </div>

      {/* Title & View Options */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                {config.title}s in <span className="text-primary">Bhiwadi</span>
              </h1>
              <p className="text-muted-foreground text-sm">Showing 48 verified service providers</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center border rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode("list")}
                  className={`px-3 py-2 flex items-center gap-1.5 text-sm ${viewMode === "list" ? "bg-primary text-white" : "bg-white text-foreground hover:bg-gray-50"}`}
                >
                  <List className="w-4 h-4" />
                  List
                </button>
                <button
                  onClick={() => setViewMode("grid")}
                  className={`px-3 py-2 flex items-center gap-1.5 text-sm border-l ${viewMode === "grid" ? "bg-primary text-white" : "bg-white text-foreground hover:bg-gray-50"}`}
                >
                  <LayoutGrid className="w-4 h-4" />
                  Grid
                </button>
                <button
                  onClick={() => setViewMode("map")}
                  className={`px-3 py-2 flex items-center gap-1.5 text-sm border-l ${viewMode === "map" ? "bg-primary text-white" : "bg-white text-foreground hover:bg-gray-50"}`}
                >
                  <MapPin className="w-4 h-4" />
                  Map
                </button>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Sort by:</span>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[160px]">
                    <SelectValue placeholder="Relevance" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="relevance">Relevance</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                    <SelectItem value="reviews">Most Reviews</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filters Sidebar */}
          <aside className="w-full lg:w-80 shrink-0">
            <div className="bg-white rounded-xl border p-4 space-y-6 sticky top-4">
              {/* Applied Filters */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-foreground flex items-center gap-2">
                    <Tag className="w-4 h-4 text-orange-500" />
                    Applied Filters
                  </h3>
                  <button onClick={clearAllFilters} className="text-primary text-sm hover:underline">
                    Clear All
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {appliedFilters.map((filter) => (
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
                  {config.serviceTypes.map((service) => (
                    <div key={service.name} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Checkbox
                          id={service.name}
                          checked={selectedServiceTypes.includes(service.name)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedServiceTypes([...selectedServiceTypes, service.name]);
                            } else {
                              setSelectedServiceTypes(selectedServiceTypes.filter((s) => s !== service.name));
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
                  {locations.map((location) => (
                    <div key={location.name} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Checkbox
                          id={location.name}
                          checked={selectedLocations.includes(location.name)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedLocations([...selectedLocations, location.name]);
                            } else {
                              setSelectedLocations(selectedLocations.filter((l) => l !== location.name));
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
                        <Label htmlFor={`rating-${rating.value}`} className="text-sm cursor-pointer flex items-center gap-1">
                          {rating.stars > 0 && (
                            <span className="flex">
                              {[...Array(rating.stars)].map((_, i) => (
                                <Star key={i} className="w-3 h-3 text-yellow-500 fill-yellow-500" />
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
                        checked={filters[option.key as keyof typeof filters]}
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

          {/* Results */}
          <main className="flex-1">
            {showNoResults ? (
              /* No Results State */
              <div className="bg-white rounded-xl border p-12 text-center">
                <SearchX className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-foreground mb-2">No Providers Found</h2>
                <p className="text-muted-foreground mb-6">
                  We couldn't find any providers matching your search criteria.
                </p>
                <div className="bg-gray-50 rounded-lg p-6 text-left max-w-md mx-auto mb-6">
                  <h3 className="font-semibold mb-3">Try the following:</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Remove some filters to broaden your search</li>
                    <li>• Check for spelling errors in your search</li>
                    <li>• Try a different service category</li>
                    <li>• Expand your location to nearby areas</li>
                  </ul>
                </div>
                <Button onClick={clearAllFilters} className="bg-primary hover:bg-primary/90">
                  Clear All Filters
                </Button>
              </div>
            ) : viewMode === "list" ? (
              /* List View */
              <div className="space-y-4">
                {mockProviders.map((provider) => (
                  <div key={provider.id} className="bg-white rounded-xl border overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="flex flex-col lg:flex-row">
                      {/* Left - Avatar & Badges */}
                      <div className="lg:w-48 p-4 flex flex-col items-center justify-start gap-2 bg-gray-50 lg:bg-white">
                        <div className="flex flex-wrap justify-center gap-1 mb-2">
                          {provider.isVerified && (
                            <span className="px-2 py-1 bg-green-500 text-white text-xs font-medium rounded flex items-center gap-1">
                              <CheckCircle className="w-3 h-3" /> VERIFIED
                            </span>
                          )}
                          {provider.isFeatured && (
                            <span className="px-2 py-1 bg-orange-500 text-white text-xs font-medium rounded">
                              ★ FEATURED
                            </span>
                          )}
                          {provider.isNew && (
                            <span className="px-2 py-1 bg-primary text-white text-xs font-medium rounded">
                              NEW
                            </span>
                          )}
                        </div>
                        <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-2xl font-bold text-gray-600">
                          {provider.initials}
                        </div>
                      </div>

                      {/* Middle - Details */}
                      <div className="flex-1 p-4 lg:p-6">
                        <h3 className="text-xl font-bold text-foreground">{provider.name}</h3>
                        <p className="text-muted-foreground text-sm mb-2">{provider.company}</p>
                        
                        <div className="flex items-center gap-3 mb-3">
                          <span className="inline-flex items-center gap-1 px-2 py-1 bg-yellow-100 text-yellow-700 rounded text-sm font-medium">
                            <Star className="w-3 h-3 fill-current" /> {provider.rating}
                          </span>
                          <span className="text-sm text-muted-foreground">{provider.reviews} reviews</span>
                        </div>

                        <div className="flex flex-wrap gap-2 mb-4">
                          <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                            <Wrench className="w-3 h-3" />
                            {provider.services.join(" • ")}
                          </span>
                        </div>

                        <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <MapPin className="w-4 h-4 text-red-500" />
                            {provider.location}
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Clock className="w-4 h-4" />
                            {provider.experience} experience
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Briefcase className="w-4 h-4 text-amber-600" />
                            {provider.jobsCompleted} jobs completed
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            {provider.availability}
                          </div>
                        </div>

                        <p className="text-sm text-muted-foreground line-clamp-2">{provider.description}</p>
                      </div>

                      {/* Right - Price & Actions */}
                      <div className="lg:w-48 p-4 lg:p-6 flex flex-col items-center justify-center gap-3 border-t lg:border-t-0 lg:border-l bg-gray-50 lg:bg-white">
                        <div className="text-center">
                          <p className="text-xs text-muted-foreground">Starting from</p>
                          <p className="text-2xl font-bold text-foreground">₹{provider.price}<span className="text-sm font-normal text-muted-foreground">/ visit</span></p>
                        </div>
                        <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white">
                          <Phone className="w-4 h-4 mr-2" /> Call Now
                        </Button>
                        <Button className="w-full bg-green-500 hover:bg-green-600 text-white">
                          <MessageCircle className="w-4 h-4 mr-2" /> WhatsApp
                        </Button>
                        <Link to={`/services/home/${serviceType}/provider/${provider.id}`} className="w-full">
                          <Button variant="outline" className="w-full">
                            View Profile
                          </Button>
                        </Link>
                        <div className="flex gap-2">
                          <Button variant="outline" size="icon" className="w-10 h-10">
                            <Heart className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="icon" className="w-10 h-10">
                            <Share2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : viewMode === "grid" ? (
              /* Grid View */
              <div className="grid md:grid-cols-2 gap-4">
                {mockProviders.map((provider) => (
                  <Link 
                    key={provider.id} 
                    to={`/services/home/${serviceType}/provider/${provider.id}`}
                    className="bg-white rounded-xl border overflow-hidden hover:shadow-lg transition-shadow block"
                  >
                    <div className="relative p-4 pb-0">
                      <div className="flex flex-wrap gap-1 mb-3">
                        {provider.isVerified && (
                          <span className="px-2 py-1 bg-green-500 text-white text-xs font-medium rounded flex items-center gap-1">
                            <CheckCircle className="w-3 h-3" /> VERIFIED
                          </span>
                        )}
                        {provider.isFeatured && (
                          <span className="px-2 py-1 bg-orange-500 text-white text-xs font-medium rounded">
                            ★ FEATURED
                          </span>
                        )}
                        {provider.isNew && (
                          <span className="px-2 py-1 bg-primary text-white text-xs font-medium rounded">
                            NEW
                          </span>
                        )}
                      </div>
                      <div className="w-20 h-20 mx-auto rounded-full bg-amber-100 flex items-center justify-center text-xl font-bold text-amber-700 mb-3">
                        {provider.initials}
                      </div>
                    </div>
                    <div className="p-4 pt-0 text-center">
                      <h3 className="font-bold text-lg text-foreground">{provider.name}</h3>
                      <div className="flex items-center justify-center gap-2 my-2">
                        <span className="inline-flex items-center gap-1 px-2 py-1 bg-yellow-100 text-yellow-700 rounded text-sm font-medium">
                          <Star className="w-3 h-3 fill-current" /> {provider.rating}
                        </span>
                        <span className="text-sm text-muted-foreground">{provider.reviews} reviews</span>
                      </div>
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary rounded-full text-xs mb-3">
                        <Wrench className="w-3 h-3" />
                        {provider.services[0]}
                      </span>
                      <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground mb-4">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-red-500" />
                          {provider.location.split(",")[0]}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {provider.experience}
                        </span>
                      </div>
                    </div>
                    <div className="border-t p-4 flex items-center justify-between gap-2">
                      <div>
                        <p className="text-xs text-muted-foreground">From</p>
                        <p className="text-xl font-bold">₹{provider.price}</p>
                      </div>
                      <Button size="sm" variant="outline" className="text-orange-500 border-orange-500 hover:bg-orange-50">
                        <Phone className="w-4 h-4 mr-1" /> Call
                      </Button>
                      <Button size="sm" className="bg-green-500 hover:bg-green-600">
                        <MessageCircle className="w-4 h-4" />
                      </Button>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              /* Map View */
              <div className="bg-white rounded-xl border overflow-hidden">
                <div className="flex flex-col lg:flex-row h-[600px]">
                  <div className="flex-1 bg-gray-200 relative flex items-center justify-center">
                    <div className="text-center">
                      <p className="text-lg font-medium text-muted-foreground mb-2">Interactive Map View</p>
                      <p className="text-sm text-muted-foreground">Map integration coming soon</p>
                    </div>
                    {/* Map markers would go here */}
                    <div className="absolute top-1/3 left-1/4 px-2 py-1 bg-primary text-white text-xs font-bold rounded-full">₹299</div>
                    <div className="absolute top-1/2 left-1/2 px-2 py-1 bg-primary text-white text-xs font-bold rounded-full">₹249</div>
                    <div className="absolute top-2/3 right-1/3 px-2 py-1 bg-primary text-white text-xs font-bold rounded-full">₹199</div>
                    <div className="absolute bottom-1/4 left-1/3 px-2 py-1 bg-primary text-white text-xs font-bold rounded-full">₹499</div>
                  </div>
                  <div className="lg:w-80 border-t lg:border-t-0 lg:border-l overflow-y-auto">
                    <div className="p-4 border-b">
                      <h3 className="font-semibold">{mockProviders.length} Providers Found</h3>
                    </div>
                    <div className="divide-y">
                      {mockProviders.map((provider) => (
                        <div key={provider.id} className="p-4 hover:bg-gray-50 cursor-pointer">
                          <div className="flex items-start gap-3">
                            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-sm font-bold text-gray-600 shrink-0">
                              {provider.initials}
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="font-semibold text-sm">{provider.name}</h4>
                              <p className="text-xs text-muted-foreground flex items-center gap-1">
                                <Wrench className="w-3 h-3" /> {provider.services[0]}
                              </p>
                              <div className="flex items-center gap-2 mt-1 text-xs">
                                <span className="flex items-center gap-0.5 text-yellow-600">
                                  <Star className="w-3 h-3 fill-current" /> {provider.rating}
                                </span>
                                <span className="text-red-500 flex items-center gap-0.5">
                                  <MapPin className="w-3 h-3" /> 2.5 km away
                                </span>
                                <span className="font-semibold">₹{provider.price}/visit</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Pagination */}
            {!showNoResults && (
              <div className="flex items-center justify-center gap-2 mt-6">
                <Button variant="outline" disabled>
                  ← Previous
                </Button>
                <Button className="bg-primary text-white">1</Button>
                <Button variant="outline">2</Button>
                <Button variant="outline">3</Button>
                <span className="px-2">...</span>
                <Button variant="outline">8</Button>
                <Button variant="outline">
                  Next →
                </Button>
              </div>
            )}
          </main>

          
        </div>
      </div>
    </div>
  );
};

export default ServiceProviderListing;
