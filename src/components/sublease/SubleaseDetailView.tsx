import { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Separator } from '../ui/separator';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { 
  ArrowLeft, 
  Heart, 
  Share, 
  MapPin, 
  Calendar, 
  Users, 
  Star, 
  Wifi, 
  Car, 
  Waves, 
  Dumbbell,
  Phone,
  Mail,
  MessageCircle,
  Clock,
  DollarSign
} from 'lucide-react';

interface SubleaseDetailViewProps {
  sublease: {
    id: string;
    title: string;
    price: number;
    originalPrice: number;
    location: string;
    distance: number;
    bedrooms: number;
    bathrooms: number;
    sqft: number;
    images: string[];
    amenities: string[];
    rating: number;
    reviews: number;
    available: string;
    duration: string;
    negotiable: boolean;
    utilities: string[];
    description: string;
    floorPlan?: string;
    reason: string;
    currentTenant: {
      name: string;
      age: number;
      major: string;
      avatar?: string;
      bio: string;
      phone: string;
      email: string;
      responseTime: string;
    };
  };
  onBack: () => void;
  onContact: () => void;
}

export function SubleaseDetailView({ sublease, onBack, onContact }: SubleaseDetailViewProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorited, setIsFavorited] = useState(false);
  const [activeSection, setActiveSection] = useState('overview');
  const [showContact, setShowContact] = useState(false);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % sublease.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + sublease.images.length) % sublease.images.length);
  };

  const amenityIcons: { [key: string]: any } = {
    'WiFi': Wifi,
    'Parking': Car,
    'Pool': Waves,
    'Gym': Dumbbell,
  };

  const savings = sublease.originalPrice - sublease.price;

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="flex items-center justify-between p-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="rounded-full"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsFavorited(!isFavorited)}
              className="rounded-full"
            >
              <Heart className={`h-4 w-4 ${isFavorited ? 'fill-red-500 text-red-500' : ''}`} />
            </Button>
            <Button variant="ghost" size="sm" className="rounded-full">
              <Share className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 max-w-4xl">
        {/* Image Gallery */}
        <div className="relative mb-6">
          <div className="aspect-video rounded-2xl overflow-hidden">
            <ImageWithFallback
              src={sublease.images[currentImageIndex]}
              alt={sublease.title}
              className="w-full h-full object-cover"
            />
          </div>
          
          {sublease.images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-white transition-colors"
              >
                ←
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-white transition-colors"
              >
                →
              </button>
            </>
          )}

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {sublease.images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                }`}
              />
            ))}
          </div>

          {/* Sublease Badges */}
          <div className="absolute top-4 left-4 flex gap-2">
            <Badge className="bg-green-500 text-white rounded-full">
              Save ${savings}
            </Badge>
            {sublease.negotiable && (
              <Badge variant="secondary" className="rounded-full">
                Negotiable
              </Badge>
            )}
          </div>
        </div>

        {/* Property Header */}
        <div className="mb-6">
          <div className="flex justify-between items-start mb-3">
            <h1 className="text-2xl font-bold">{sublease.title}</h1>
            <div className="text-right">
              <div className="flex items-center gap-2">
                <span className="text-lg text-muted-foreground line-through">${sublease.originalPrice}</span>
                <div className="text-3xl font-bold text-primary">${sublease.price}</div>
              </div>
              <div className="text-sm text-muted-foreground">/month</div>
            </div>
          </div>

          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center gap-1 text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>{sublease.location}</span>
            </div>
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="font-medium">{sublease.rating}</span>
              <span className="text-muted-foreground">({sublease.reviews} reviews)</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
            <span>{sublease.bedrooms} bed • {sublease.bathrooms} bath</span>
            <span>{sublease.sqft} sqft</span>
            <span>{sublease.distance} miles from campus</span>
          </div>

          <div className="flex items-center gap-2 mb-6">
            <Clock className="h-4 w-4 text-primary" />
            <span className="text-sm">Available {sublease.available} • {sublease.duration}</span>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
          {!showContact ? (
            <Button 
              onClick={() => setShowContact(true)}
              size="lg" 
              className="rounded-xl bg-gradient-to-r from-primary to-purple-600"
            >
              <MessageCircle className="h-4 w-4 mr-2" />
              Contact Subletter
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button 
                size="lg" 
                className="rounded-xl flex-1"
                onClick={() => window.open(`tel:${sublease.currentTenant.phone}`)}
              >
                <Phone className="h-4 w-4 mr-2" />
                {sublease.currentTenant.phone}
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="rounded-xl flex-1"
                onClick={() => window.open(`mailto:${sublease.currentTenant.email}`)}
              >
                <Mail className="h-4 w-4 mr-2" />
                Email
              </Button>
            </div>
          )}
          <Button 
            variant="outline" 
            size="lg" 
            className="rounded-xl"
          >
            Schedule Tour
          </Button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto">
          {['overview', 'amenities', 'tenant'].map((section) => (
            <Button
              key={section}
              variant={activeSection === section ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveSection(section)}
              className="rounded-full whitespace-nowrap"
            >
              {section === 'tenant' ? 'Current Tenant' : section.charAt(0).toUpperCase() + section.slice(1)}
            </Button>
          ))}
        </div>

        {/* Content Sections */}
        {activeSection === 'overview' && (
          <div className="space-y-6">
            {/* Description */}
            <Card>
              <CardHeader>
                <CardTitle>About This Sublease</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  {sublease.description}
                </p>
                <div className="p-4 bg-muted/50 rounded-xl">
                  <h4 className="font-medium mb-2">Reason for Subletting</h4>
                  <p className="text-sm text-muted-foreground">{sublease.reason}</p>
                </div>
              </CardContent>
            </Card>

            {/* Sublease Details */}
            <Card>
              <CardHeader>
                <CardTitle>Sublease Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-sm text-muted-foreground">Duration</span>
                    <p className="font-medium">{sublease.duration}</p>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">Available</span>
                    <p className="font-medium">{sublease.available}</p>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">Monthly Savings</span>
                    <p className="font-medium text-green-600">${savings}</p>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">Utilities</span>
                    <p className="font-medium">{sublease.utilities.join(', ')}</p>
                  </div>
                </div>
                {sublease.negotiable && (
                  <div className="p-4 bg-blue-50 rounded-xl">
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-blue-600" />
                      <span className="font-medium text-blue-600">Price Negotiable</span>
                    </div>
                    <p className="text-sm text-blue-600 mt-1">
                      The current tenant is open to discussing the rent price
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {activeSection === 'amenities' && (
          <Card>
            <CardHeader>
              <CardTitle>Amenities & Features</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {sublease.amenities.map((amenity) => {
                  const Icon = amenityIcons[amenity] || Wifi;
                  return (
                    <div key={amenity} className="flex items-center gap-3 p-3 rounded-xl bg-muted/50">
                      <Icon className="h-5 w-5 text-primary" />
                      <span className="font-medium">{amenity}</span>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        )}

        {activeSection === 'tenant' && (
          <Card>
            <CardHeader>
              <CardTitle>Current Tenant</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-start gap-4 mb-6">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={sublease.currentTenant.avatar} alt={sublease.currentTenant.name} />
                  <AvatarFallback>{sublease.currentTenant.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="font-semibold">{sublease.currentTenant.name}</h4>
                    <Badge variant="secondary">{sublease.currentTenant.age} years old</Badge>
                  </div>
                  <p className="text-sm text-primary mb-2">{sublease.currentTenant.major}</p>
                  <p className="text-sm text-muted-foreground mb-4">{sublease.currentTenant.bio}</p>
                  <p className="text-xs text-muted-foreground">
                    Typically responds in {sublease.currentTenant.responseTime}
                  </p>
                </div>
              </div>
              
              {showContact && (
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="rounded-full"
                    onClick={() => window.open(`tel:${sublease.currentTenant.phone}`)}
                  >
                    <Phone className="h-4 w-4 mr-2" />
                    Call
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="rounded-full"
                    onClick={() => window.open(`mailto:${sublease.currentTenant.email}`)}
                  >
                    <Mail className="h-4 w-4 mr-2" />
                    Email
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}