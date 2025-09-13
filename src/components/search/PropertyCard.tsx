import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { MapPin, Users, Heart, Star } from 'lucide-react';
import { useState } from 'react';

interface PropertyCardProps {
  property: {
    id: string;
    title: string;
    price: number;
    location: string;
    distance: number;
    bedrooms: number;
    bathrooms: number;
    images: string[];
    amenities: string[];
    rating: number;
    reviews: number;
    available: string;
    roommates?: Array<{
      name: string;
      age: number;
      major: string;
    }>;
  };
  viewMode?: 'grid' | 'list';
  onSelect: (id: string) => void;
}

export function PropertyCard({ property, viewMode = 'grid', onSelect }: PropertyCardProps) {
  const [isFavorited, setIsFavorited] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % property.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + property.images.length) % property.images.length);
  };

  if (viewMode === 'list') {
    return (
      <Card className="w-full bg-white shadow-card hover:shadow-card-hover transition-shadow cursor-pointer rounded-2xl" onClick={() => onSelect(property.id)}>
        <CardContent className="p-0">
          <div className="flex">
            <div className="relative w-64 h-48 flex-shrink-0">
              <ImageWithFallback
                src={property.images[currentImageIndex]}
                alt={property.title}
                className="w-full h-full object-cover rounded-l-lg"
              />
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsFavorited(!isFavorited);
                }}
                className="absolute top-3 right-3 p-2 rounded-full bg-white/80 hover:bg-white transition-colors"
              >
                <Heart className={`h-4 w-4 ${isFavorited ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
              </button>
              {property.images.length > 1 && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      prevImage();
                    }}
                    className="absolute left-2 top-1/2 -translate-y-1/2 p-1 rounded-full bg-white/80 hover:bg-white transition-colors"
                  >
                    ←
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      nextImage();
                    }}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-full bg-white/80 hover:bg-white transition-colors"
                  >
                    →
                  </button>
                </>
              )}
            </div>
            <div className="flex-1 p-6">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-bold text-gray-900">{property.title}</h3>
                <div className="text-right">
                  <div className="text-2xl font-bold text-indigo-600">${property.price}</div>
                  <div className="text-sm text-gray-600">/month</div>
                </div>
              </div>
              
              <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                <MapPin className="h-4 w-4" />
                <span>{property.location}</span>
                <span>•</span>
                <span>{property.distance} miles from campus</span>
              </div>

              <div className="flex items-center gap-4 mb-3">
                <span className="text-sm text-gray-600">{property.bedrooms} bed • {property.bathrooms} bath</span>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium text-gray-900">{property.rating}</span>
                  <span className="text-sm text-gray-600">({property.reviews} reviews)</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-1 mb-4">
                {property.amenities.slice(0, 4).map((amenity) => (
                  <Badge key={amenity} variant="secondary" className="text-xs rounded-full">
                    {amenity}
                  </Badge>
                ))}
                {property.amenities.length > 4 && (
                  <Badge variant="secondary" className="text-xs rounded-full">
                    +{property.amenities.length - 4} more
                  </Badge>
                )}
              </div>

              {property.roommates && (
                <div className="flex items-center gap-2 mb-4">
                  <Users className="h-4 w-4 text-indigo-600" />
                  <span className="text-sm text-gray-600">Current roommates:</span>
                  <div className="flex gap-2">
                    {property.roommates.map((roommate, index) => (
                      <Badge key={index} variant="outline" className="text-xs rounded-full">
                        {roommate.name}, {roommate.age}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              <div className="text-sm text-gray-600">
                Available {property.available}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full bg-white shadow-card hover:shadow-card-hover transition-shadow cursor-pointer rounded-2xl" onClick={() => onSelect(property.id)}>
      <CardContent className="p-0">
        <div className="relative">
          <ImageWithFallback
            src={property.images[currentImageIndex]}
            alt={property.title}
            className="w-full h-48 object-cover rounded-t-lg"
          />
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsFavorited(!isFavorited);
            }}
            className="absolute top-3 right-3 p-2 rounded-full bg-white/80 hover:bg-white transition-colors"
          >
            <Heart className={`h-4 w-4 ${isFavorited ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
          </button>
          {property.images.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  prevImage();
                }}
                className="absolute left-2 top-1/2 -translate-y-1/2 p-1 rounded-full bg-white/80 hover:bg-white transition-colors"
              >
                ←
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  nextImage();
                }}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-full bg-white/80 hover:bg-white transition-colors"
              >
                →
              </button>
            </>
          )}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1">
            {property.images.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full ${
                  index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>
        
        <div className="p-5">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-bold text-gray-900 truncate">{property.title}</h3>
            <div className="text-right">
              <div className="text-xl font-bold text-indigo-600">${property.price}</div>
              <div className="text-xs text-gray-600">/month</div>
            </div>
          </div>
          
          <div className="flex items-center gap-1 text-sm text-gray-600 mb-2">
            <MapPin className="h-4 w-4" />
            <span className="truncate">{property.location}</span>
          </div>

          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-gray-600">{property.bedrooms} bed • {property.bathrooms} bath</span>
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium text-gray-900">{property.rating}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-1 mb-3">
            {property.amenities.slice(0, 3).map((amenity) => (
              <Badge key={amenity} variant="secondary" className="text-xs rounded-full">
                {amenity}
              </Badge>
            ))}
            {property.amenities.length > 3 && (
              <Badge variant="secondary" className="text-xs rounded-full">
                +{property.amenities.length - 3}
              </Badge>
            )}
          </div>

          {property.roommates && (
            <div className="flex items-center gap-1 mb-3">
              <Users className="h-4 w-4 text-indigo-600" />
              <span className="text-xs text-gray-600">
                {property.roommates.length} roommate{property.roommates.length > 1 ? 's' : ''}
              </span>
            </div>
          )}

          <div className="text-xs text-gray-600">
            Available {property.available}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}