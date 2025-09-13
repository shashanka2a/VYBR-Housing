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
            <h1 className="text-2xl font-bold">{property.title}</h1>
            <div className="text-right">
              <div className="text-3xl font-bold text-primary">${property.price}</div>
              <div className="text-sm text-muted-foreground">/month</div>
            </div>
          </div>

          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center gap-1 text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>{property.location}</span>
            </div>
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="font-medium">{property.rating}</span>
              <span className="text-muted-foreground">({property.reviews} reviews)</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
            <span>{property.bedrooms} bed • {property.bathrooms} bath</span>
            <span>{property.sqft} sqft</span>
            <span>{property.distance} miles from campus</span>
          </div>

          <div className="flex items-center gap-2 mb-6">
            <Calendar className="h-4 w-4 text-primary" />
            <span className="text-sm">Available {property.available}</span>
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
              Contact Property
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button 
                size="lg" 
                className="rounded-xl flex-1"
                onClick={() => window.open(`tel:${property.landlord.phone}`)}
              >
                <Phone className="h-4 w-4 mr-2" />
                {property.landlord.phone}
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="rounded-xl flex-1"
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
            className="rounded-xl"
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
              className="rounded-full whitespace-nowrap"
            >
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </Button>
          ))}
        </div>

        {/* Content Sections */}
        {activeSection === 'overview' && (
          <div className="space-y-6">
            {/* Description */}
            <Card>
              <CardHeader>
                <CardTitle>About This Property</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {property.description}
                </p>
              </CardContent>
            </Card>

            {/* Lease Details */}
            <Card>
              <CardHeader>
                <CardTitle>Lease Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-sm text-muted-foreground">Lease Start</span>
                    <p className="font-medium">{property.leaseStart}</p>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">Duration</span>
                    <p className="font-medium">{property.leaseDuration}</p>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">Security Deposit</span>
                    <p className="font-medium">${property.deposit}</p>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">Utilities</span>
                    <p className="font-medium">{property.utilities.join(', ')}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Landlord Info */}
            <Card>
              <CardHeader>
                <CardTitle>Landlord Contact</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3 mb-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={property.landlord.avatar} alt={property.landlord.name} />
                    <AvatarFallback>{property.landlord.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-medium">{property.landlord.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      Typically responds in {property.landlord.responseTime}
                    </p>
                  </div>
                </div>
                {showContact && (
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="rounded-full"
                      onClick={() => window.open(`tel:${property.landlord.phone}`)}
                    >
                      <Phone className="h-4 w-4 mr-2" />
                      Call
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="rounded-full"
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
          <Card>
            <CardHeader>
              <CardTitle>Amenities & Features</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {property.amenities.map((amenity) => {
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

        {activeSection === 'roommates' && (
          <div className="space-y-4">
            {property.roommates ? (
              property.roommates.map((roommate, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <Avatar className="h-16 w-16">
                        <AvatarImage src={roommate.avatar} alt={roommate.name} />
                        <AvatarFallback>{roommate.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-semibold">{roommate.name}</h4>
                          <Badge variant="secondary">{roommate.age} years old</Badge>
                        </div>
                        <p className="text-sm text-primary mb-2">{roommate.major}</p>
                        <p className="text-sm text-muted-foreground">{roommate.bio}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card>
                <CardContent className="p-6 text-center">
                  <Users className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="font-medium mb-2">No Current Roommates</h3>
                  <p className="text-sm text-muted-foreground">
                    Be the first to move in and help find compatible roommates!
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {activeSection === 'floorplan' && (
          <Card>
            <CardHeader>
              <CardTitle>Floor Plan</CardTitle>
            </CardHeader>
            <CardContent>
              {property.floorPlan ? (
                <div className="aspect-video rounded-xl overflow-hidden">
                  <ImageWithFallback
                    src={property.floorPlan}
                    alt="Floor plan"
                    className="w-full h-full object-contain bg-muted"
                  />
                </div>
              ) : (
                <div className="aspect-video rounded-xl bg-muted flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-xl flex items-center justify-center">
                      <Home className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="font-medium mb-2">Floor Plan Coming Soon</h3>
                    <p className="text-sm text-muted-foreground">
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