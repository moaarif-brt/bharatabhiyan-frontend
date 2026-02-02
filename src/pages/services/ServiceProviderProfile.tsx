import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  ArrowLeft,
  Phone,
  MapPin,
  Clock,
  Star,
  CheckCircle,
  Heart,
  Share2,
  ThumbsUp,
  ChevronRight,
  User,
  Wrench,
  Camera,
  DollarSign,
  Calendar,
  Trophy,
  Package,
  Smile,
  Droplets,
  AlertCircle,
  MessageCircle,
  FileText,
  Users,
  Award
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { fetchProviderProfileByUserId } from "@/api/provider";
import { resolveMediaUrl } from "@/utils/mediaUrl";
import { Skeleton } from "@/components/ui/skeleton";

const ServiceProviderProfile = () => {
  const { serviceType, providerId } = useParams();
  const [activeTab, setActiveTab] = useState("about");
  const [reviewFilter, setReviewFilter] = useState("all");

  // Fetch provider details
  const { data: response, isLoading, isError } = useQuery({
    queryKey: ["provider-profile", providerId],
    queryFn: () => fetchProviderProfileByUserId(providerId!),
    enabled: !!providerId,
  });

  const apiData = response?.data?.data;

  // Map API data to component structure
  const provider = {
    id: apiData?.id || providerId || "1",
    name: apiData?.user_name || "Service Provider",
    initials: apiData?.business_name?.[0]?.toUpperCase() || "SP",
    businessName: apiData?.business_name || "Business Name",
    location: apiData?.business_address
      ? `${apiData.business_address}, ${apiData.city_name || ''}, ${apiData.state_name || ''} - ${apiData.pincode || ''}`
      : "Location Available Upon Request",
    experience: apiData?.experience ? `${apiData.experience.replace(/_/g, " ").replace("TO", "-")} Years` : "Experience N/A",
    jobsCompleted: "500+ Jobs Completed", // Placeholder
    rating: 4.8, // Placeholder
    reviewCount: 127, // Placeholder
    isVerified: apiData?.verification_status === "VERIFIED",
    isKycVerified: true, // Placeholder
    isFeatured: true, // Placeholder
    isCaptainVerified: false, // Placeholder
    phone: apiData?.whatsapp_number || apiData?.user_phone || "N/A",
    startingPrice: 299, // Placeholder
    availableToday: true,
    responseTime: "Usually within 30 mins",
    satisfactionRate: "98%",
    about: apiData?.service_description || "No description available for this service provider.",
    services: [
      {
        name: apiData?.service_type_name || apiData?.category_name || "General Service",
        price: 299,
        icon: "🔧"
      }
    ],
    pricing: [
      { service: "Visit Charge", description: "Basic inspection and diagnosis", price: "₹299", note: "per visit" },
      { service: "Hourly Rate", description: "Standard labor charge", price: "₹499", note: "per hour" },
    ],
    serviceAreas: apiData?.service_areas_list?.length
      ? apiData.service_areas_list.map((area: any) => area.name)
      : (apiData?.city_name ? [apiData.city_name] : ["Local Area"]),
    verifications: [
      "Identity Verified",
      "Address Verified",
      "Business Location Verified"
    ],
    reviews: [
      // Keep mock reviews for UI demonstration
      {
        id: 1,
        name: "Priya Sharma",
        initials: "PS",
        location: "Sector 5, Bhiwadi",
        rating: 5,
        date: "2 days ago",
        comment: "Excellent service! Very professional.",
        service: "General Service",
        helpfulCount: 12
      },
      {
        id: 2,
        name: "Amit Kumar",
        initials: "AK",
        location: "Sector 12, Bhiwadi",
        rating: 5,
        date: "1 week ago",
        comment: "Completed work within time. Good job.",
        service: "Repair",
        helpfulCount: 8
      }
    ],
    ratingBreakdown: {
      5: 108,
      4: 13,
      3: 4,
      2: 1,
      1: 1
    },
    similarProviders: [
      // Mock similar providers
      { id: "2", name: "Anil Kumar", initials: "AK", service: "Plumber", rating: 4.7, price: 249 },
      { id: "3", name: "Suresh Yadav", initials: "SY", service: "Plumber", rating: 4.8, price: 199 }
    ]
  };

  const formatServiceType = (type: string) => {
    return type.charAt(0).toUpperCase() + type.slice(1);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8 space-y-8">
          <Skeleton className="h-12 w-full max-w-sm rounded" />
          <Skeleton className="h-64 w-full rounded-xl" />
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex flex-col items-center">
              <Skeleton className="h-32 w-32 rounded-lg" />
            </div>
            <div className="space-y-4 flex-1">
              <Skeleton className="h-10 w-1/2" />
              <Skeleton className="h-4 w-1/3" />
              <div className="flex gap-4 mt-4">
                <Skeleton className="h-10 w-32" />
                <Skeleton className="h-10 w-32" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-xl font-bold text-red-500">Error loading profile</h2>
            <p className="text-muted-foreground">Please try again later.</p>
            <Button variant="outline" className="mt-4" onClick={() => window.location.reload()}>Retry</Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="bg-muted/30 border-b">
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center justify-between">
              <nav className="flex items-center gap-2 text-sm">
                <Link to="/" className="text-muted-foreground hover:text-primary">Home</Link>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
                <Link to="/services" className="text-muted-foreground hover:text-primary">Services</Link>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
                <Link to={`/services/home/${serviceType}`} className="text-muted-foreground hover:text-primary">
                  {formatServiceType(serviceType || "Plumber")}
                </Link>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
                <span className="text-foreground font-medium">{provider.name}</span>
              </nav>
              <Link
                to={`/services/home/${serviceType}`}
                className="text-primary hover:underline flex items-center gap-1 text-sm"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Search Results
              </Link>
            </div>
          </div>
        </div>

        {/* Profile Header */}
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Content */}
            <div className="flex-1">
              {/* Provider Info Card */}
              <div className="bg-card rounded-lg border p-6 mb-6">
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Avatar */}
                  <div className="flex flex-col items-center">
                    <div className="w-32 h-32 bg-slate-700 rounded-lg flex items-center justify-center text-white text-4xl font-semibold mb-2">
                      {provider.initials}
                    </div>
                    {provider.isVerified && (
                      <Badge className="bg-green-500 text-white">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Verified
                      </Badge>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {provider.isKycVerified && (
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          <CheckCircle className="h-3 w-3 mr-1" /> KYC VERIFIED
                        </Badge>
                      )}
                      {provider.isFeatured && (
                        <Badge className="bg-orange-500 text-white">
                          <Star className="h-3 w-3 mr-1" /> FEATURED
                        </Badge>
                      )}
                      {provider.isCaptainVerified && (
                        <Badge className="bg-red-500 text-white">
                          <Award className="h-3 w-3 mr-1" /> CAPTAIN VERIFIED
                        </Badge>
                      )}
                    </div>

                    <h1 className="text-2xl font-bold text-foreground mb-1">{provider.name}</h1>
                    <p className="text-muted-foreground mb-3">{provider.businessName}</p>

                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-4 w-4 text-red-500" />
                        {provider.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <CheckCircle className="h-4 w-4 text-green-500" /> {provider.experience}
                      </span>
                      <span className="flex items-center gap-1">
                        <Award className="h-4 w-4 text-yellow-500" /> {provider.jobsCompleted}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="flex items-center text-yellow-500">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className="h-5 w-5"
                            fill={i < Math.floor(provider.rating) ? "currentColor" : "none"}
                          />
                        ))}
                      </div>
                      <span className="text-2xl font-bold">{provider.rating}</span>
                      <span className="text-muted-foreground text-sm">
                        Based on {provider.reviewCount} reviews
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tabs */}
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="w-full justify-start border-b rounded-none bg-transparent h-auto p-0 mb-6">
                  {["About", "Services", "Gallery", "Pricing", "Availability", `Reviews (${provider.reviewCount})`].map((tab) => (
                    <TabsTrigger
                      key={tab}
                      value={tab.toLowerCase().split(" ")[0]}
                      className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 py-3"
                    >
                      {tab}
                    </TabsTrigger>
                  ))}
                </TabsList>

                {/* About Tab */}
                <TabsContent value="about" className="space-y-6">
                  <div className="bg-card rounded-lg border p-6">
                    <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <User className="h-5 w-5 text-primary" /> About
                    </h2>
                    <div className="text-muted-foreground whitespace-pre-line mb-6">
                      {provider.about}
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4">
                      <div className="bg-muted/30 rounded-lg p-4 text-center border">
                        <Trophy className="h-8 w-8 mx-auto mb-1 text-yellow-600" />
                        <div className="text-2xl font-bold text-primary">10+</div>
                        <div className="text-sm text-muted-foreground">Years Experience</div>
                      </div>
                      <div className="bg-muted/30 rounded-lg p-4 text-center border">
                        <Package className="h-8 w-8 mx-auto mb-1 text-blue-600" />
                        <div className="text-2xl font-bold text-primary">500+</div>
                        <div className="text-sm text-muted-foreground">Jobs Completed</div>
                      </div>
                      <div className="bg-muted/30 rounded-lg p-4 text-center border">
                        <Smile className="h-8 w-8 mx-auto mb-1 text-green-600" />
                        <div className="text-2xl font-bold text-primary">{provider.satisfactionRate}</div>
                        <div className="text-sm text-muted-foreground">Satisfaction Rate</div>
                      </div>
                    </div>
                  </div>

                  {/* Services Offered */}
                  <div className="bg-card rounded-lg border p-6">
                    <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <Wrench className="h-5 w-5 text-primary" /> Services Offered
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {provider.services.map((service, index) => (
                        <div key={index} className="flex items-center gap-3 p-3 border rounded-lg bg-muted/20">
                          <span className="text-2xl">{service.icon}</span>
                          <div>
                            <div className="font-medium">{service.name}</div>
                            <div className="text-sm text-muted-foreground">
                              Starting from <span className="text-primary font-medium">₹{service.price}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Work Gallery Preview */}
                  <div className="bg-card rounded-lg border p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-lg font-semibold flex items-center gap-2">
                        <Camera className="h-5 w-5 text-primary" /> Work Gallery
                      </h2>
                      <Button variant="link" className="text-primary" onClick={() => setActiveTab("gallery")}>
                        View All Photos →
                      </Button>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {[1, 2, 3, 4].map((item) => (
                        <div key={item} className="aspect-square bg-muted rounded-lg flex items-center justify-center">
                          <Wrench className="h-8 w-8 text-muted-foreground" />
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                {/* Services Tab */}
                <TabsContent value="services" className="space-y-6">
                  <div className="bg-card rounded-lg border p-6">
                    <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <Wrench className="h-5 w-5 text-primary" /> Services Offered
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {provider.services.map((service, index) => (
                        <div key={index} className="flex items-center gap-3 p-4 border rounded-lg hover:bg-muted/20 transition-colors">
                          <span className="text-3xl">{service.icon}</span>
                          <div className="flex-1">
                            <div className="font-medium">{service.name}</div>
                            <div className="text-sm text-muted-foreground">
                              Starting from <span className="text-primary font-semibold">₹{service.price}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                {/* Gallery Tab */}
                <TabsContent value="gallery" className="space-y-6">
                  <div className="bg-card rounded-lg border p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-lg font-semibold flex items-center gap-2">
                        <Camera className="h-5 w-5 text-primary" /> Work Gallery
                      </h2>
                      <span className="text-muted-foreground text-sm">16 Photos</span>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {[...Array(8)].map((_, index) => {
                        const icons = [<Wrench key="wrench" className="h-8 w-8 text-muted-foreground" />, <Droplets key="droplet" className="h-8 w-8 text-muted-foreground" />, <Droplets key="droplets" className="h-8 w-8 text-muted-foreground" />, <AlertCircle key="alert" className="h-8 w-8 text-muted-foreground" />];
                        return (
                          <div key={index} className="aspect-square bg-muted rounded-lg flex items-center justify-center relative group cursor-pointer hover:opacity-90 transition-opacity">
                            {icons[index % 4]}
                            {index === 7 && (
                              <div className="absolute inset-0 bg-black/60 rounded-lg flex items-center justify-center text-white font-semibold">
                                +12 more
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </TabsContent>

                {/* Pricing Tab */}
                <TabsContent value="pricing" className="space-y-6">
                  <div className="bg-card rounded-lg border p-6">
                    <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <DollarSign className="h-5 w-5 text-primary" /> Pricing
                    </h2>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-3 px-4 font-semibold text-muted-foreground">SERVICE</th>
                            <th className="text-left py-3 px-4 font-semibold text-muted-foreground">PRICE</th>
                          </tr>
                        </thead>
                        <tbody>
                          {provider.pricing.map((item, index) => (
                            <tr key={index} className="border-b last:border-0">
                              <td className="py-4 px-4">
                                <div className="font-medium">{item.service}</div>
                                <div className="text-sm text-muted-foreground">{item.description}</div>
                              </td>
                              <td className="py-4 px-4">
                                <div className="font-semibold text-primary">{item.price}</div>
                                <div className="text-sm text-muted-foreground">{item.note}</div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </TabsContent>

                {/* Availability Tab */}
                <TabsContent value="availability" className="space-y-6">
                  <div className="bg-card rounded-lg border p-6">
                    <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-primary" /> Availability
                    </h2>
                    <div className="grid gap-4">
                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <span className="font-medium">Monday - Saturday</span>
                        <span className="text-muted-foreground">9:00 AM - 7:00 PM</span>
                      </div>
                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <span className="font-medium">Sunday</span>
                        <span className="text-muted-foreground">10:00 AM - 4:00 PM</span>
                      </div>
                      <div className="flex items-center justify-between p-4 border rounded-lg bg-green-50">
                        <span className="font-medium text-green-700">Emergency Services</span>
                        <span className="text-green-600">Available 24/7 (+50% charges)</span>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                {/* Reviews Tab */}
                <TabsContent value="reviews" className="space-y-6">
                  <div className="bg-card rounded-lg border p-6">
                    <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
                      <Star className="h-5 w-5 text-yellow-500" /> Reviews & Ratings
                    </h2>

                    {/* Rating Summary */}
                    <div className="flex flex-col md:flex-row gap-8 mb-8">
                      <div className="flex flex-col items-center justify-center p-6 bg-primary/5 rounded-lg min-w-[150px]">
                        <div className="text-4xl font-bold text-primary">{provider.rating}</div>
                        <div className="flex text-yellow-500 my-2">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="h-4 w-4" fill="currentColor" />
                          ))}
                        </div>
                        <div className="text-sm text-muted-foreground">{provider.reviewCount} reviews</div>
                      </div>

                      <div className="flex-1 space-y-2">
                        {[5, 4, 3, 2, 1].map((stars) => (
                          <div key={stars} className="flex items-center gap-3">
                            <div className="flex items-center text-sm w-8">
                              {[...Array(stars)].map((_, i) => (
                                <Star key={i} className="h-3 w-3 text-yellow-500" fill="currentColor" />
                              ))}
                            </div>
                            <Progress
                              value={(provider.ratingBreakdown[stars as keyof typeof provider.ratingBreakdown] / provider.reviewCount) * 100}
                              className="h-3 flex-1"
                            />
                            <span className="text-sm text-muted-foreground w-8">
                              {provider.ratingBreakdown[stars as keyof typeof provider.ratingBreakdown]}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Review Filters */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {["All Reviews", "5 Star (108)", "4 Star (13)", "With Photos"].map((filter) => (
                        <Button
                          key={filter}
                          variant={reviewFilter === filter.toLowerCase().split(" ")[0] ? "default" : "outline"}
                          size="sm"
                          onClick={() => setReviewFilter(filter.toLowerCase().split(" ")[0])}
                        >
                          {filter}
                        </Button>
                      ))}
                    </div>

                    {/* Reviews List */}
                    <div className="space-y-6">
                      {provider.reviews.map((review) => (
                        <div key={review.id} className="border-b pb-6 last:border-0">
                          <div className="flex items-start gap-4">
                            <div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center font-medium text-slate-600">
                              {review.initials}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-1">
                                <div>
                                  <span className="font-medium">{review.name}</span>
                                  <span className="text-muted-foreground text-sm ml-2">{review.location}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <div className="flex text-yellow-500">
                                    {[...Array(review.rating)].map((_, i) => (
                                      <Star key={i} className="h-3 w-3" fill="currentColor" />
                                    ))}
                                  </div>
                                  <span className="text-sm text-muted-foreground">{review.date}</span>
                                </div>
                              </div>
                              <p className="text-muted-foreground mb-3">{review.comment}</p>
                              <div className="flex items-center gap-4">
                                <Badge variant="outline" className="text-xs flex items-center gap-1">
                                  <Wrench className="h-3 w-3" /> {review.service}
                                </Badge>
                                <Button variant="ghost" size="sm" className="text-muted-foreground">
                                  <ThumbsUp className="h-4 w-4 mr-1" />
                                  Helpful ({review.helpfulCount})
                                </Button>
                                <Button variant="ghost" size="sm" className="text-muted-foreground">
                                  Reply
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="text-center mt-6">
                      <Button variant="outline">Load More Reviews</Button>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            {/* Right Sidebar */}
            <div className="lg:w-80 space-y-4">
              {/* Pricing Card */}
              <div className="bg-slate-800 text-white rounded-lg p-6 top-4">
                <div className="text-sm text-slate-300 mb-1">Starting from</div>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-3xl font-bold">₹{provider.startingPrice}</span>
                  <span className="text-slate-300">/ visit</span>
                </div>
                <div className="flex items-center gap-2 text-sm mb-6">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  Available Today
                </div>

                <div className="space-y-3">
                  <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white">
                    <Phone className="h-4 w-4 mr-2" />
                    Call Now
                  </Button>
                  <Button className="w-full bg-green-500 hover:bg-green-600 text-white">
                    <MessageCircle className="h-4 w-4 mr-2" /> WhatsApp
                  </Button>
                  <Button variant="outline" className="w-full bg-white text-slate-800 hover:bg-slate-100">
                    <FileText className="h-4 w-4 mr-2" /> Request Quote
                  </Button>
                </div>
              </div>

              {/* Contact Info */}
              <div className="bg-card rounded-lg border p-4 space-y-4">
                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <div className="text-sm text-muted-foreground">Phone</div>
                    <div className="font-medium">{provider.phone}</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <div className="text-sm text-muted-foreground">Location</div>
                    <div className="font-medium">Sector 5 Market, Bhiwadi</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <div className="text-sm text-muted-foreground">Response Time</div>
                    <div className="font-medium">{provider.responseTime}</div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1">
                  <Heart className="h-4 w-4 mr-1" />
                  Save
                </Button>
                <Button variant="outline" className="flex-1">
                  <Share2 className="h-4 w-4 mr-1" />
                  Share
                </Button>
              </div>

              {/* Verified Provider */}
              <div className="bg-card rounded-lg border p-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <div className="font-semibold">Verified Provider</div>
                    <div className="text-sm text-muted-foreground">Captain KYC Completed</div>
                  </div>
                </div>
                <div className="space-y-2">
                  {provider.verifications.map((item, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Service Areas */}
              <div className="bg-card rounded-lg border p-4">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-red-500" />
                  Service Areas
                </h3>
                <div className="flex flex-wrap gap-2">
                  {provider.serviceAreas.map((area, index) => (
                    <Badge key={index} variant="secondary">{area}</Badge>
                  ))}
                </div>
              </div>

              {/* Similar Providers */}
              <div className="bg-card rounded-lg border p-4">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Users className="h-4 w-4 text-primary" /> Similar Providers
                </h3>
                <div className="space-y-4">
                  {provider.similarProviders.map((sp) => (
                    <Link
                      key={sp.id}
                      to={`/services/home/${serviceType}/provider/${sp.id}`}
                      className="flex items-center gap-3 hover:bg-muted/50 p-2 rounded-lg transition-colors"
                    >
                      <div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center font-medium text-slate-600">
                        {sp.initials}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-sm">{sp.name}</div>
                        <div className="text-xs text-muted-foreground flex items-center gap-1">
                          <Wrench className="h-3 w-3" /> {sp.service}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-yellow-500 flex items-center gap-0.5 justify-end">
                          <Star className="h-3 w-3" fill="currentColor" /> {sp.rating}
                        </div>
                        <div className="text-xs text-primary font-medium">₹{sp.price}/visit</div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ServiceProviderProfile;
