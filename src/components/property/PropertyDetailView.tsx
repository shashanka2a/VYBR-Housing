'use client'

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
  Home,
  Mail,
  MessageCircle
} from 'lucide-react';

interface PropertyDetailViewProps {
  property: {
    id: string;
    title: string;
    price: number;
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
    leaseStart: string;
    leaseDuration: string;
    deposit: number;
    utilities: string[];
    description: string;
    floorPlan?: string;
    roommates?: Array<{
      name: string;
      age: number;
      major: string;
      avatar?: string;
      bio: string;
    }>;
    landlord: {
      name: string;
      phone: string;
      email: string;
      responseTime: string;
      avatar?: string;
    };
  };
  onBack: () => void;
  onContact: () => void;
}

export function PropertyDetailView({ property, onBack, onContact }: PropertyDetailViewProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorited, setIsFavorited] = useState(false);
  const [activeSection, setActiveSection] = useState('overview');
  const [showContact, setShowContact] = useState(false);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % property.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + property.images.length) % property.images.length);
  };

  const amenityIcons: { [key: string]: any } = {
    'WiFi': Wifi,
    'Parking': Car,
    'Pool': Waves,
    'Gym': Dumbbell,
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20 md:pb-0">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b border-gray-200">
        <div className="flex items-center justify-between p-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="rounded-full text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsFavorited(!isFavorited)}
              className="rounded-full text-gray-600 hover:text-gray-900"
            >
              <Heart className={`h-4 w-4 ${isFavorited ? 'fill-red-500 text-red-500' : ''}`} />
            </Button>
            <Button variant="ghost" size="sm" className="rounded-full text-gray-600 hover:text-gray-900">
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
              src={property.images[currentImageIndex]}
              alt={property.title}
              className="w-full h-full object-cover"
            />
          </div>
          
          {property.images.length > 1 && (
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
            {property.images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Property Header */}
        <div className="mb-6">
          <div className="flex justify-between items-start mb-3">
            <h1 className="text-2xl font-bold" style={{ color: '#111827' }}>{property.title}</h1>
            <div className="text-right">
              <div className="text-3xl font-bold text-indigo-600">${property.price}</div>
              <div className="text-sm text-gray-600">/month</div>
            </div>
          </div>

          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center gap-1 text-gray-600">
              <MapPin className="h-4 w-4" />
              <span>{property.location}</span>
            </div>
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="font-medium text-gray-900">{property.rating}</span>
              <span className="text-gray-600">({property.reviews} reviews)</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
            <span>{property.bedrooms} bed • {property.bathrooms} bath</span>
            <span>{property.sqft} sqft</span>
            <span>{property.distance} miles from campus</span>
          </div>

          <div className="flex items-center gap-2 mb-6">
            <Calendar className="h-4 w-4 text-indigo-600" />
            <span className="text-sm text-gray-600">Available {property.available}</span>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
          {!showContact ? (
            <Button 
              onClick={() => setShowContact(true)}
              size="lg" 
              className="rounded-full bg-gradient-button text-white font-semibold"
            >
              <MessageCircle className="h-4 w-4 mr-2" />
              Contact Property
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button 
                size="lg" 
                className="rounded-full flex-1 bg-white border border-gray-300 text-gray-900 hover:bg-gray-50"
                onClick={() => window.open(`tel:${property.landlord.phone}`)}
              >
                <Phone className="h-4 w-4 mr-2" />
                {property.landlord.phone}
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="rounded-full flex-1 border-gray-300 text-gray-900 hover:bg-gray-50"
                onClick={() => window.open(`mailto:${property.landlord.email}`)}
              >
                <Mail className="h-4 w-4 mr-2" />
                Email
              </Button>
            </div>
          )}
          <Button 
            variant="outline" 
            size="lg" 
            className="rounded-full border-gray-300 text-gray-900 hover:bg-gray-50"
          >
            Schedule Tour
          </Button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto">
          {['overview', 'amenities', 'roommates', 'floorplan'].map((section) => (
            <Button
              key={section}
              variant={activeSection === section ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveSection(section)}
              className={`rounded-full whitespace-nowrap ${
                activeSection === section 
                  ? 'bg-gradient-button text-white' 
                  : 'border-gray-300 text-gray-900 hover:bg-gray-50'
              }`}
            >
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </Button>
          ))}
        </div>

        {/* Content Sections */}
        {activeSection === 'overview' && (
          <div className="space-y-6">
            {/* Description */}
            <Card className="bg-white shadow-card rounded-2xl">
              <CardHeader className="p-6">
                <CardTitle className="font-bold" style={{ color: '#111827' }}>About This Property</CardTitle>
              </CardHeader>
              <CardContent className="p-6 pt-0">
                <p className="text-gray-600 leading-relaxed">
                  {property.description}
                </p>
              </CardContent>
            </Card>

            {/* Lease Details */}
            <Card className="bg-white shadow-card rounded-2xl">
              <CardHeader className="p-6">
                <CardTitle className="font-bold" style={{ color: '#111827' }}>Lease Information</CardTitle>
              </CardHeader>
              <CardContent className="p-6 pt-0 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-sm text-gray-600">Lease Start</span>
                    <p className="font-medium text-gray-900">{property.leaseStart}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Duration</span>
                    <p className="font-medium text-gray-900">{property.leaseDuration}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Security Deposit</span>
                    <p className="font-medium text-gray-900">${property.deposit}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Utilities</span>
                    <p className="font-medium text-gray-900">{property.utilities.join(', ')}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Landlord Info */}
            <Card className="bg-white shadow-card rounded-2xl">
              <CardHeader className="p-6">
                <CardTitle className="font-bold" style={{ color: '#111827' }}>Landlord Contact</CardTitle>
              </CardHeader>
              <CardContent className="p-6 pt-0">
                <div className="flex items-center gap-3 mb-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={property.landlord.avatar} alt={property.landlord.name} />
                    <AvatarFallback className="bg-gray-200 text-gray-600">{property.landlord.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-bold text-gray-900">{property.landlord.name}</h4>
                    <p className="text-sm text-gray-600">
                      Typically responds in {property.landlord.responseTime}
                    </p>
                  </div>
                </div>
                {showContact && (
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="rounded-full border-gray-300 text-gray-900 hover:bg-gray-50"
                      onClick={() => window.open(`tel:${property.landlord.phone}`)}
                    >
                      <Phone className="h-4 w-4 mr-2" />
                      Call
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="rounded-full border-gray-300 text-gray-900 hover:bg-gray-50"
                      onClick={() => window.open(`mailto:${property.landlord.email}`)}
                    >
                      <Mail className="h-4 w-4 mr-2" />
                      Email
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {activeSection === 'amenities' && (
          <Card className="bg-white shadow-card rounded-2xl">
            <CardHeader className="p-6">
              <CardTitle className="text-gray-900 font-bold">Amenities & Features</CardTitle>
            </CardHeader>
            <CardContent className="p-6 pt-0">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {property.amenities.map((amenity) => {
                  const Icon = amenityIcons[amenity] || Wifi;
                  return (
                    <div key={amenity} className="flex items-center gap-3 p-3 rounded-xl bg-gray-50">
                      <Icon className="h-5 w-5 text-indigo-600" />
                      <span className="font-medium text-gray-900">{amenity}</span>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        )}

        {activeSection === 'roommates' && (
          <div className="space-y-4">
            {property.roommates ? (
              property.roommates.map((roommate, index) => (
                <Card key={index} className="bg-white shadow-card rounded-2xl">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <Avatar className="h-16 w-16">
                        <AvatarImage src={roommate.avatar} alt={roommate.name} />
                        <AvatarFallback className="bg-gray-200 text-gray-600">{roommate.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-bold text-gray-900">{roommate.name}</h4>
                          <Badge variant="secondary" className="bg-gray-100 text-gray-700">{roommate.age} years old</Badge>
                        </div>
                        <p className="text-sm text-indigo-600 mb-2">{roommate.major}</p>
                        <p className="text-sm text-gray-600">{roommate.bio}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card className="bg-white shadow-card rounded-2xl">
                <CardContent className="p-6 text-center">
                  <Users className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <h3 className="font-bold text-gray-900 mb-2">No Current Roommates</h3>
                  <p className="text-sm text-gray-600">
                    Be the first to move in and help find compatible roommates!
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {activeSection === 'floorplan' && (
          <Card className="bg-white shadow-card rounded-2xl">
            <CardHeader className="p-6">
              <CardTitle className="text-gray-900 font-bold">Floor Plan</CardTitle>
            </CardHeader>
            <CardContent className="p-6 pt-0">
              {property.floorPlan ? (
                <div className="aspect-video rounded-xl overflow-hidden">
                  <ImageWithFallback
                    src={property.floorPlan}
                    alt="Floor plan"
                    className="w-full h-full object-contain bg-gray-50"
                  />
                </div>
              ) : (
                <div className="aspect-video rounded-xl bg-gray-50 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 bg-indigo-100 rounded-xl flex items-center justify-center">
                      <Home className="h-8 w-8 text-indigo-600" />
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2">Floor Plan Coming Soon</h3>
                    <p className="text-sm text-gray-600">
                      Contact the landlord for detailed floor plan information
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}