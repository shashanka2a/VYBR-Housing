'use client'

import { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { PropertyCard } from '../search/PropertyCard';
import { 
  Plus, 
  Calendar, 
  DollarSign, 
  Clock,
  FileText,
  TrendingUp
} from 'lucide-react';



interface SubleaseViewProps {
  onPropertySelect: (id: string) => void;
  mockSubleases?: any[];
}

export function SubleaseView({ onPropertySelect, mockSubleases = [] }: SubleaseViewProps) {
  const [activeTab, setActiveTab] = useState('browse');

  // Default mock sublease data if none provided
  const defaultSubleases = [
    {
      id: 'sub1',
      title: 'Summer Sublease - 1BR Downtown',
      price: 650,
      originalPrice: 800,
      location: 'Downtown',
      distance: 1.2,
      bedrooms: 1,
      bathrooms: 1,
      images: [
        'https://images.unsplash.com/photo-1594873604892-b599f847e859?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcGFydG1lbnQlMjBpbnRlcmlvcnxlbnwxfHx8fDE3NTc3MzIzMTV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
      ],
      amenities: ['WiFi', 'AC', 'Furnished'],
      rating: 4.6,
      reviews: 12,
      available: 'June 1st - Aug 31st',
      duration: '3 months',
      negotiable: true
    },
    {
      id: 'sub2',
      title: 'Spring Semester Room',
      price: 550,
      originalPrice: 600,
      location: 'University District',
      distance: 0.5,
      bedrooms: 1,
      bathrooms: 1,
      images: [
        'https://images.unsplash.com/photo-1579632151052-92f741fb9b79?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3p5JTIwYmVkcm9vbSUyMGFwYXJ0bWVudHxlbnwxfHx8fDE3NTc3NDg2ODB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
      ],
      amenities: ['WiFi', 'Laundry', 'Study Room'],
      rating: 4.8,
      reviews: 8,
      available: 'Jan 15th - May 15th',
      duration: '4 months',
      negotiable: false
    }
  ];

  const subleases = mockSubleases.length > 0 ? mockSubleases : defaultSubleases;

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold mb-2">Sublease Market</h1>
            <p className="text-muted-foreground">
              Find short-term housing or list your place for sublease
            </p>
          </div>
          <Button className="rounded-full bg-gradient-to-r from-primary to-purple-600">
            <Plus className="h-4 w-4 mr-2" />
            List My Place
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <FileText className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Available</p>
                  <p className="text-xl font-bold">24</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <DollarSign className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Avg. Savings</p>
                  <p className="text-xl font-bold">$180</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">This Week</p>
                  <p className="text-xl font-bold">+12</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="browse">Browse</TabsTrigger>
            <TabsTrigger value="my-listings">My Listings</TabsTrigger>
            <TabsTrigger value="requests">Requests</TabsTrigger>
          </TabsList>

          <TabsContent value="browse">
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h3 className="text-lg font-semibold">Available Subleases</h3>
                <div className="flex gap-2">
                  <select className="px-3 py-2 text-sm border border-border rounded-full bg-background">
                    <option value="all">All Durations</option>
                    <option value="summer">Summer</option>
                    <option value="semester">Semester</option>
                    <option value="month">Monthly</option>
                  </select>
                  <select className="px-3 py-2 text-sm border border-border rounded-full bg-background">
                    <option value="price">Sort by: Price</option>
                    <option value="date">Date Available</option>
                    <option value="distance">Distance</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {subleases.map((property) => (
                  <div key={property.id} className="relative">
                    <PropertyCard
                      property={property}
                      viewMode="grid"
                      onSelect={onPropertySelect}
                    />
                    {/* Sublease specific badges */}
                    <div className="absolute top-3 left-3 flex gap-2">
                      <Badge className="bg-green-500 text-white rounded-full">
                        ${property.originalPrice - property.price} off
                      </Badge>
                      {property.negotiable && (
                        <Badge variant="secondary" className="rounded-full">
                          Negotiable
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="my-listings">
            <Card>
              <CardContent className="p-12 text-center">
                <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Active Listings</h3>
                <p className="text-muted-foreground mb-4">
                  List your place for sublease and start earning
                </p>
                <Button className="rounded-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Listing
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="requests">
            <Card>
              <CardContent className="p-12 text-center">
                <Clock className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Pending Requests</h3>
                <p className="text-muted-foreground">
                  Requests for your listings will appear here
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}