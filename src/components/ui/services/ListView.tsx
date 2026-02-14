import { Link, useNavigate } from "react-router-dom";
import {
  Phone,
  MessageCircle,
  Heart,
  Share2,
  Clock,
  CheckCircle,
  Wrench,
  MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { resolveMediaUrl } from "@/utils/mediaUrl";
import { useToast } from "@/hooks/use-toast";

const ListView = ({ providers = [], serviceType }: any) => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const mapProvider = (p: any) => ({
    id: p.id,
    name: p.user_name || "Service Provider",
    company: p.business_name,
    phone: p.user_phone,
    whatsapp: p.whatsapp,
    services: [p.service_type_name || p.category_name],
    location: `${p.business_address}, ${p.city_name}, ${p.state_name} - ${p.pincode}`,
    experience: p.experience?.replaceAll("_", " ") || "N/A",
    description: p.service_description,
    isVerified: p.verification_status === "VERIFIED",
    avatar: resolveMediaUrl(p.profile_photo_url),
    initials: p.business_name?.[0]?.toUpperCase() || "P",
  });

  return (
    <div className="space-y-4">
      {providers.map((p: any) => {
        const provider = mapProvider(p);

        return (
          <div
            key={provider.id}
            className="bg-white rounded-xl border hover:shadow-lg transition-shadow overflow-hidden"
          >
            <div className="flex flex-col lg:flex-row">
              {/* LEFT */}
              <div className="lg:w-48 p-4 flex flex-col items-center bg-gray-50">
                {provider.isVerified && (
                  <span className="mb-2 px-2 py-1 bg-green-600 text-white text-xs rounded flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" /> VERIFIED
                  </span>
                )}

                {provider.avatar ? (
                  <img
                    src={provider.avatar}
                    alt={provider.company}
                    className="w-24 h-24 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-2xl font-bold">
                    {provider.initials}
                  </div>
                )}
              </div>

              {/* MIDDLE */}
              <div
                className="flex-1 p-4 lg:p-6 cursor-pointer"
                onClick={() =>
                  navigate(
                    `/services/home/${serviceType}/provider/${provider.id}`
                  )
                }
              >
                <h3 className="text-xl font-bold">{provider.name}</h3>
                <p className="text-muted-foreground text-sm mb-2">
                  {provider.company}
                </p>

                <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm mb-3">
                  <Wrench className="w-3 h-3" />
                  {provider.services.join(" • ")}
                </span>

                <div className="grid grid-cols-2 gap-3 text-sm mb-4">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="w-4 h-4 text-red-500" />
                    {provider.location}
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    {provider.experience}
                  </div>
                </div>

                <p className="text-sm text-muted-foreground line-clamp-2">
                  {provider.description}
                </p>
              </div>

              {/* RIGHT */}
              <div className="lg:w-56 p-4 lg:p-6 flex flex-col gap-3 border-t lg:border-t-0 lg:border-l bg-gray-50">
                {/* CALL */}
                {provider.phone && (
                  <Button
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white"
                    onClick={() =>
                      window.open(`tel:${provider.phone}`)
                    }
                  >
                    <Phone className="w-4 h-4 mr-2" /> Call Now
                  </Button>
                )}

                {/* WHATSAPP */}
                {provider.whatsapp && (
                  <Button
                    className="w-full bg-green-500 hover:bg-green-600 text-white"
                    onClick={() =>
                      window.open(
                        `https://wa.me/${provider.whatsapp.replace("+", "")}`,
                        "_blank"
                      )
                    }
                  >
                    <MessageCircle className="w-4 h-4 mr-2" /> WhatsApp
                  </Button>
                )}

                {/* PROFILE */}
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() =>
                    navigate(
                      `/services/home/${serviceType}/provider/${provider.id}`
                    )
                  }
                >
                  View Profile
                </Button>

                {/* HEART / SHARE */}
                <div className="flex gap-2 justify-center">
                  {/* <Button
                      variant="outline"
                      size="icon"
                      onClick={() => { }}
                    >
                      <Heart className="w-4 h-4" />
                    </Button> */}

                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => {
                      const url = `${window.location.origin}/services/home/${serviceType}/provider/${provider.id}`;
                      navigator.clipboard.writeText(url);
                      toast({
                        title: "Link Copied!",
                        description: "Provider profile URL has been copied to your clipboard.",
                      });
                    }}
                  >
                    <Share2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ListView;
