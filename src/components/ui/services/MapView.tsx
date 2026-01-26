import { Star, MapPin, Wrench } from "lucide-react";

const MapView = ({ providers = [], serviceType }: any) => {
  const mapProvider = (p: any) => ({
    id: p.id,
    initials: p.business_name?.[0]?.toUpperCase() || "P",
    name: p.user_name,
    company: p.business_name,
    rating: 4.8,
    reviews: 120,
    services: [p.service_type_name],
    location: p.service_areas_list
      ? p.service_areas_list.map((a: any) => a.name).join(", ")
      : "N/A",
    experience: p.experience,
    jobsCompleted: "100+",
    availability: "Available",
    description: p.service_description,
    price: 299,
    isVerified: p.verification_status === "VERIFIED",
    isFeatured: false,
    isNew: false,
  });
  const mockProviders = providers.map((p: any) => mapProvider(p));
  return (
    <div className="bg-white rounded-xl border overflow-hidden">
      <div className="flex flex-col lg:flex-row h-[600px]">
        <div className="flex-1 bg-gray-200 relative flex items-center justify-center">
          <div className="text-center">
            <p className="text-lg font-medium text-muted-foreground mb-2">
              Interactive Map View
            </p>
            <p className="text-sm text-muted-foreground">
              Map integration coming soon
            </p>
          </div>

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
            {mockProviders.map((provider: any) => (
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
                      <span className="font-semibold">
                        ₹{provider.price}/visit
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};

export default MapView;
