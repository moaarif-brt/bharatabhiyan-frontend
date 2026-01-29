import { Link, useNavigate } from "react-router-dom";
import {
  Phone,
  MessageCircle,
  MapPin,
  Clock,
  Wrench,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { resolveMediaUrl } from "@/utils/mediaUrl";

const GridView = ({ providers = [], serviceType }: any) => {
  const navigate = useNavigate();

  const mapProvider = (p: any) => ({
    id: p.id,
    name: p.user_name || "Service Provider",
    company: p.business_name,
    phone: p.user_phone,
    whatsapp: p.whatsapp,
    services: [p.service_type_name || p.category_name],
    location: `${p.business_address}, ${p.city_name}, ${p.state_name} - ${p.pincode}`,
    experience: p.experience?.replaceAll("_", " ") || "N/A",
    isVerified: p.verification_status === "VERIFIED",
    avatar: resolveMediaUrl(p.profile_photo_url),
    initials: p.business_name?.[0]?.toUpperCase() || "P",
  });

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {providers.map((p: any) => {
        const provider = mapProvider(p);

        return (
          <div
            key={provider.id}
            className="bg-white rounded-xl border hover:shadow-lg transition-shadow overflow-hidden"
          >
            {/* TOP */}
            <div
              className="p-4 text-center cursor-pointer"
              onClick={() =>
                navigate(
                  `/services/home/${serviceType}/provider/${provider.id}`
                )
              }
            >
              {provider.isVerified && (
                <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-600 text-white text-xs rounded mb-2">
                  <CheckCircle className="w-3 h-3" /> VERIFIED
                </span>
              )}

              {provider.avatar ? (
                <img
                  src={provider.avatar}
                  alt={provider.company}
                  className="w-20 h-20 mx-auto rounded-full object-cover mb-3"
                />
              ) : (
                <div className="w-20 h-20 mx-auto rounded-full bg-amber-100 flex items-center justify-center text-xl font-bold text-amber-700 mb-3">
                  {provider.initials}
                </div>
              )}

              <h3 className="font-bold text-lg">{provider.name}</h3>
              <p className="text-sm text-muted-foreground">
                {provider.company}
              </p>
            </div>

            {/* SERVICE INFO */}
            <div className="px-4 pb-3 text-center">
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary rounded-full text-xs">
                <Wrench className="w-3 h-3" />
                {provider.services[0]}
              </span>

              <div className="flex justify-center gap-4 mt-3 text-xs text-muted-foreground">
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

            {/* ACTIONS */}
            <div className="border-t p-4 flex items-center justify-between gap-2">
              {provider.phone && (
                <Button
                  size="sm"
                  variant="outline"
                  className="text-orange-500 border-orange-500 hover:bg-orange-50"
                  onClick={() =>
                    window.open(`tel:${provider.phone}`)
                  }
                >
                  <Phone className="w-4 h-4 mr-1" /> Call
                </Button>
              )}

              {provider.whatsapp && (
                <Button
                  size="sm"
                  className="bg-green-500 hover:bg-green-600 text-white"
                  onClick={() =>
                    window.open(
                      `https://wa.me/${provider.whatsapp.replace("+", "")}`,
                      "_blank"
                    )
                  }
                >
                  <MessageCircle className="w-4 h-4" />
                </Button>
              )}

              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  navigate(
                    `/services/home/${serviceType}/provider/${provider.id}`
                  )
                }
              >
                Profile
              </Button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default GridView;
