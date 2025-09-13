import { useState } from 'react';
import { PropertyCard } from './PropertyCard';
import { Button } from '../ui/button';
import { Grid, List, SlidersHorizontal } from 'lucide-react';

interface SearchResultsProps {
  properties: Array<{
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
  }>;
  onPropertySelect: (id: string) => void;
  onToggleFilters: () => void;
}

export function SearchResults({ properties, onPropertySelect, onToggleFilters }: SearchResultsProps) {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('relevance');

  const sortedProperties = [...properties].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'distance':
        return a.distance - b.distance;
      case 'rating':
        return b.rating - a.rating;
      default:
        return 0;
    }
  });

  return (
    <div className="space-y-4">
      {/* Header with controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-semibold">{properties.length} properties found</h2>
          <p className="text-sm text-muted-foreground">
            Showing available housing near your campus
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            onClick={onToggleFilters}
            variant="outline"
            size="sm"
            className="rounded-full"
          >
            <SlidersHorizontal className="h-4 w-4 mr-2" />
            Filters
          </Button>
          
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 text-sm border border-border rounded-full bg-background"
          >
            <option value="relevance">Sort by: Relevance</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="distance">Distance</option>
            <option value="rating">Rating</option>
          </select>
          
          <div className="flex border border-border rounded-full p-1">
            <Button
              onClick={() => setViewMode('grid')}
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              className="rounded-full px-3"
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              onClick={() => setViewMode('list')}
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              className="rounded-full px-3"
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Results */}
      {sortedProperties.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No properties match your criteria</p>
          <Button onClick={onToggleFilters} variant="outline" className="mt-4 rounded-full">
            Adjust Filters
          </Button>
        </div>
      ) : (
        <div className={
          viewMode === 'grid' 
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
            : 'space-y-4'
        }>
          {sortedProperties.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              viewMode={viewMode}
              onSelect={onPropertySelect}
            />
          ))}
        </div>
      )}
    </div>
  );
}