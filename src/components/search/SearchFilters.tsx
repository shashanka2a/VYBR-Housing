'use client'

import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card, CardContent } from '../ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Slider } from '../ui/slider';
import { Checkbox } from '../ui/checkbox';
import { Badge } from '../ui/badge';
import { X, Filter } from 'lucide-react';

interface SearchFiltersProps {
  onFiltersChange: (filters: any) => void;
  isOpen: boolean;
  onToggle: () => void;
}

export function SearchFilters({ onFiltersChange, isOpen, onToggle }: SearchFiltersProps) {
  const [priceRange, setPriceRange] = useState([500, 2000]);
  const [distance, setDistance] = useState([5]);
  const [propertyType, setPropertyType] = useState('');
  const [bedrooms, setBedrooms] = useState('');
  const [amenities, setAmenities] = useState<string[]>([]);
  const [roommatePrefs, setRoommatePrefs] = useState<string[]>([]);

  const amenityOptions = [
    'WiFi', 'Parking', 'Laundry', 'Gym', 'Pool', 'Pet-friendly', 
    'AC', 'Furnished', 'Dishwasher', 'Balcony'
  ];

  const roommateOptions = [
    'Non-smoker', 'Pet-friendly', 'LGBTQ+ friendly', 'International students',
    'Graduate students', 'Working professionals', 'Party-friendly', 'Quiet lifestyle'
  ];

  const toggleAmenity = (amenity: string) => {
    setAmenities(prev => 
      prev.includes(amenity) 
        ? prev.filter(a => a !== amenity)
        : [...prev, amenity]
    );
  };

  const toggleRoommatePreference = (pref: string) => {
    setRoommatePrefs(prev => 
      prev.includes(pref) 
        ? prev.filter(p => p !== pref)
        : [...prev, pref]
    );
  };

  const applyFilters = () => {
    onFiltersChange({
      priceRange,
      distance: distance[0],
      propertyType,
      bedrooms,
      amenities,
      roommatePrefs
    });
  };

  const clearFilters = () => {
    setPriceRange([500, 2000]);
    setDistance([5]);
    setPropertyType('');
    setBedrooms('');
    setAmenities([]);
    setRoommatePrefs([]);
    onFiltersChange({});
  };

  if (!isOpen) {
    return (
      <Button 
        onClick={onToggle} 
        variant="outline" 
        className="rounded-full"
      >
        <Filter className="h-4 w-4 mr-2" />
        Filters
      </Button>
    );
  }

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold">Filters</h3>
          <Button 
            onClick={onToggle} 
            variant="ghost" 
            size="sm"
            className="rounded-full"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="space-y-6">
          {/* Price Range */}
          <div className="space-y-3">
            <Label>Price Range</Label>
            <div className="px-2">
              <Slider
                value={priceRange}
                onValueChange={setPriceRange}
                max={3000}
                min={200}
                step={50}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-muted-foreground mt-1">
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}</span>
              </div>
            </div>
          </div>

          {/* Distance */}
          <div className="space-y-3">
            <Label>Distance from Campus (miles)</Label>
            <div className="px-2">
              <Slider
                value={distance}
                onValueChange={setDistance}
                max={20}
                min={1}
                step={1}
                className="w-full"
              />
              <div className="text-sm text-muted-foreground mt-1">
                Within {distance[0]} miles
              </div>
            </div>
          </div>

          {/* Property Type */}
          <div className="space-y-2">
            <Label>Property Type</Label>
            <Select value={propertyType} onValueChange={setPropertyType}>
              <SelectTrigger className="rounded-xl">
                <SelectValue placeholder="Any property type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="apartment">Apartment</SelectItem>
                <SelectItem value="house">House</SelectItem>
                <SelectItem value="studio">Studio</SelectItem>
                <SelectItem value="shared-room">Shared Room</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Bedrooms */}
          <div className="space-y-2">
            <Label>Bedrooms</Label>
            <Select value={bedrooms} onValueChange={setBedrooms}>
              <SelectTrigger className="rounded-xl">
                <SelectValue placeholder="Any bedrooms" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="studio">Studio</SelectItem>
                <SelectItem value="1">1 Bedroom</SelectItem>
                <SelectItem value="2">2 Bedrooms</SelectItem>
                <SelectItem value="3">3 Bedrooms</SelectItem>
                <SelectItem value="4+">4+ Bedrooms</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Amenities */}
          <div className="space-y-3">
            <Label>Amenities</Label>
            <div className="grid grid-cols-2 gap-2">
              {amenityOptions.map((amenity) => (
                <div key={amenity} className="flex items-center space-x-2">
                  <Checkbox
                    id={amenity}
                    checked={amenities.includes(amenity)}
                    onCheckedChange={() => toggleAmenity(amenity)}
                  />
                  <Label htmlFor={amenity} className="text-sm">{amenity}</Label>
                </div>
              ))}
            </div>
          </div>

          {/* Roommate Preferences */}
          <div className="space-y-3">
            <Label>Roommate Preferences</Label>
            <div className="space-y-2">
              {roommateOptions.map((pref) => (
                <div key={pref} className="flex items-center space-x-2">
                  <Checkbox
                    id={pref}
                    checked={roommatePrefs.includes(pref)}
                    onCheckedChange={() => toggleRoommatePreference(pref)}
                  />
                  <Label htmlFor={pref} className="text-sm">{pref}</Label>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-2 pt-4">
            <Button onClick={applyFilters} className="flex-1 rounded-xl">
              Apply Filters
            </Button>
            <Button onClick={clearFilters} variant="outline" className="flex-1 rounded-xl">
              Clear All
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}