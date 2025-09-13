'use client'

import { useState, useEffect } from 'react';
import Head from 'next/head';
import { Header } from '@/components/layout/Header';
import { BottomNavigation } from '@/components/layout/BottomNavigation';
import { LoginForm } from '@/components/auth/LoginForm';
import { SignupForm } from '@/components/auth/SignupForm';
import { ProfileSetup } from '@/components/profile/ProfileSetup';
import { ProfileView } from '@/components/profile/ProfileView';
import { SearchFilters } from '@/components/search/SearchFilters';
import { SearchResults } from '@/components/search/SearchResults';
import { PropertyDetailView } from '@/components/property/PropertyDetailView';
import { SubleaseView } from '@/components/sublease/SubleaseView';
import { SubleaseDetailView } from '@/components/sublease/SubleaseDetailView';
import { VybrAiChat } from '@/components/ai/VybrAiChat';
import { CommunityCard } from '@/components/community/CommunityCard';
import { LoadingScreen } from '@/components/landing/LoadingScreen';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Home as HomeIcon, Users, FileText, Bot, User } from 'lucide-react';
import { AppState, AuthMode, User as UserType, Property, Sublease, Community } from '@/types';

export default function Home() {
  const [appState, setAppState] = useState<AppState>('landing');
  const [authMode, setAuthMode] = useState<AuthMode>('login');
  const [user, setUser] = useState<UserType | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [activeTab, setActiveTab] = useState('search');
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [selectedSublease, setSelectedSublease] = useState<Sublease | null>(null);
  const [favoriteProperties, setFavoriteProperties] = useState<Property[]>([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  // Mock data
  const mockProperties: Property[] = [
    {
      id: '1',
      title: 'Modern 2BR Near Campus',
      price: 1200,
      location: 'University District',
      distance: 0.8,
      bedrooms: 2,
      bathrooms: 1,
      sqft: 950,
      images: [
        'https://images.unsplash.com/photo-1594873604892-b599f847e859?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcGFydG1lbnQlMjBpbnRlcmlvcnxlbnwxfHx8fDE3NTc3MzIzMTV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        'https://images.unsplash.com/photo-1579632151052-92f741fb9b79?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3p5JTIwYmVkcm9vbSUyMGFwYXJ0bWVudHxlbnwxfHx8fDE3NTc3NDg2ODB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
      ],
      amenities: ['WiFi', 'Parking', 'Laundry', 'AC', 'Furnished', 'Dishwasher'],
      rating: 4.8,
      reviews: 24,
      available: 'Sept 1st',
      leaseStart: 'September 1, 2024',
      leaseDuration: '12 months',
      deposit: 1200,
      utilities: ['Water', 'Trash', 'Internet'],
      description: 'Beautiful modern apartment in the heart of University District. Recently renovated with high-end finishes, stainless steel appliances, and hardwood floors throughout. Perfect for students who want luxury living within walking distance of campus.',
      floorPlan: 'https://images.unsplash.com/photo-1722859177977-f881f1809d32?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcGFydG1lbnQlMjBmbG9vciUyMHBsYW58ZW58MXx8fHwxNzU3NzIyNzIxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      roommates: [
        { 
          name: 'Sarah Chen', 
          age: 22, 
          major: 'Computer Science',
          bio: 'CS major who loves coding and gaming. Looking for a studious roommate who can respect quiet hours during exams.',
          avatar: ''
        }
      ],
      landlord: {
        name: 'John Mitchell',
        phone: '+1-555-0123',
        email: 'john@universityliving.com',
        responseTime: '2 hours',
        avatar: ''
      }
    },
    {
      id: '2',
      title: 'Cozy Studio Downtown',
      price: 800,
      location: 'Downtown',
      distance: 2.1,
      bedrooms: 0,
      bathrooms: 1,
      sqft: 450,
      images: [
        'https://images.unsplash.com/photo-1610879485443-c472257793d1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkaW8lMjBhcGFydG1lbnQlMjBsaXZpbmd8ZW58MXx8fHwxNzU3NjgzMzAwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
      ],
      amenities: ['WiFi', 'Furnished', 'Gym', 'Pet-friendly', 'AC'],
      rating: 4.5,
      reviews: 18,
      available: 'Available now',
      leaseStart: 'Available immediately',
      leaseDuration: '6-12 months',
      deposit: 800,
      utilities: ['Electricity', 'Heat'],
      description: 'Perfect studio for a student who wants independence and urban living. Located in the vibrant downtown area with easy access to public transportation, restaurants, and nightlife.',
      landlord: {
        name: 'Maria Rodriguez',
        phone: '+1-555-0456',
        email: 'maria@downtownstudios.com',
        responseTime: '4 hours',
        avatar: ''
      }
    },
    {
      id: '3',
      title: 'Spacious 3BR House',
      price: 1800,
      location: 'Student Village',
      distance: 1.5,
      bedrooms: 3,
      bathrooms: 2,
      sqft: 1350,
      images: [
        'https://images.unsplash.com/photo-1594873604892-b599f847e859?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcGFydG1lbnQlMjBpbnRlcmlvcnxlbnwxfHx8fDE3NTc3MzIzMTV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
      ],
      amenities: ['WiFi', 'Parking', 'Laundry', 'Backyard', 'Dishwasher', 'AC'],
      rating: 4.9,
      reviews: 31,
      available: 'Aug 15th',
      leaseStart: 'August 15, 2024',
      leaseDuration: '12 months',
      deposit: 1800,
      utilities: ['Water', 'Trash'],
      description: 'Large house perfect for a group of friends. Features a spacious backyard, full kitchen, and plenty of parking. Great for students who want a home-like environment with room to socialize.',
      roommates: [
        { 
          name: 'Mike Johnson', 
          age: 21, 
          major: 'Mechanical Engineering',
          bio: 'Engineering student who loves working on projects and hosting study groups. Very social and organized.',
          avatar: ''
        },
        { 
          name: 'Alex Kim', 
          age: 23, 
          major: 'Business Administration',
          bio: 'Business major focused on entrepreneurship. Looking for ambitious roommates who are goal-oriented.',
          avatar: ''
        }
      ],
      landlord: {
        name: 'David Thompson',
        phone: '+1-555-0789',
        email: 'david@studentvillage.com',
        responseTime: '1 hour',
        avatar: ''
      }
    }
  ];

  // Mock sublease data with detailed info
  const mockSubleases: Sublease[] = [
    {
      id: 'sub1',
      title: 'Summer Sublease - 1BR Downtown',
      price: 650,
      originalPrice: 800,
      location: 'Downtown',
      distance: 1.2,
      bedrooms: 1,
      bathrooms: 1,
      sqft: 650,
      images: [
        'https://images.unsplash.com/photo-1594873604892-b599f847e859?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcGFydG1lbnQlMjBpbnRlcmlvcnxlbnwxfHx8fDE3NTc3MzIzMTV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
      ],
      amenities: ['WiFi', 'AC', 'Furnished', 'Laundry'],
      rating: 4.6,
      reviews: 12,
      available: 'June 1st - Aug 31st',
      duration: '3 months',
      negotiable: true,
      utilities: ['Water', 'Internet'],
      description: 'Perfect summer sublease in the heart of downtown! Fully furnished 1-bedroom with modern amenities. Great for summer internships or classes. Walking distance to restaurants, nightlife, and public transportation.',
      reason: 'Going home for summer break and won\'t be using the apartment. Want to help another student save money while keeping my lease.',
      currentTenant: {
        name: 'Jessica Martinez',
        age: 21,
        major: 'Marketing',
        avatar: '',
        bio: 'Marketing major who loves the city life. Very clean and organized. Looking for someone responsible to take care of my place during summer.',
        phone: '+1-555-0987',
        email: 'jessica.martinez@email.com',
        responseTime: '30 minutes'
      }
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
      sqft: 500,
      images: [
        'https://images.unsplash.com/photo-1579632151052-92f741fb9b79?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3p5JTIwYmVkcm9vbSUyMGFwYXJ0bWVudHxlbnwxfHx8fDE3NTc3NDg2ODB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
      ],
      amenities: ['WiFi', 'Laundry', 'Study Room', 'Parking'],
      rating: 4.8,
      reviews: 8,
      available: 'Jan 15th - May 15th',
      duration: '4 months',
      negotiable: false,
      utilities: ['Heat', 'Internet'],
      description: 'Cozy room in a shared apartment with other students. Great study environment and very close to campus. Perfect for someone who wants to be walking distance from classes.',
      reason: 'Studying abroad in spring semester but want to keep my housing for next year. Looking for a responsible student to sublease.',
      currentTenant: {
        name: 'Ryan Chen',
        age: 20,
        major: 'Computer Science',
        avatar: '',
        bio: 'CS student who keeps things quiet and clean. The apartment has a great study atmosphere and my roommates are very friendly.',
        phone: '+1-555-0654',
        email: 'ryan.chen@email.com',
        responseTime: '1 hour'
      }
    }
  ];

  const mockCommunities: Community[] = [
    {
      id: '1',
      name: 'CS Students @ State',
      description: 'A community for Computer Science students looking for tech-savvy roommates who understand late-night coding sessions.',
      memberCount: 248,
      university: 'State University',
      location: 'University District',
      tags: ['Tech', 'Study Groups', 'Gaming'],
      image: '',
      recentMembers: [
        { name: 'Emma', major: 'CS' },
        { name: 'Josh', major: 'Software Engineering' },
        { name: 'Maya', major: 'Data Science' }
      ]
    },
    {
      id: '2',
      name: 'Graduate Housing Hub',
      description: 'Connecting graduate students who prefer quieter living spaces and academic-focused environments.',
      memberCount: 156,
      university: 'State University',
      location: 'Grad Student Area',
      tags: ['Quiet', 'Academic', 'Professional'],
      image: '',
      recentMembers: [
        { name: 'David', major: 'PhD Physics' },
        { name: 'Lisa', major: 'Masters Psychology' }
      ]
    }
  ];

  const handleLogin = (email: string) => {
    setUser({ name: 'Alex Johnson', email, avatar: '' });
    setAppState('main');
  };

  const handleSignup = (email: string, name: string) => {
    setUser({ name, email, avatar: '' });
    setAppState('profile-setup');
  };

  const handleProfileComplete = (profile: Partial<UserType>) => {
    setUser((prev: UserType | null) => prev ? ({ ...prev, ...profile }) : null);
    setAppState('main');
  };

  const handleSearch = (query: string) => {
    console.log('Search:', query);
  };

  const handlePropertySelect = (id: string) => {
    // Check if it's a regular property
    const property = mockProperties.find(p => p.id === id);
    if (property) {
      setSelectedProperty(property);
      setAppState('property-detail');
      return;
    }
    
    // Check if it's a sublease
    const sublease = mockSubleases.find(s => s.id === id);
    if (sublease) {
      setSelectedSublease(sublease);
      setAppState('sublease-detail');
    }
  };

  const handleBackFromDetail = () => {
    setSelectedProperty(null);
    setSelectedSublease(null);
    setAppState('main');
  };

  const handleContactLandlord = () => {
    // Navigate to messages or open contact modal
    setActiveTab('messages');
    setAppState('main');
  };

  const handleEditProfile = () => {
    setAppState('profile-setup');
  };

  const handleFiltersChange = (filters: any) => {
    console.log('Filters changed:', filters);
  };

  const handleCommunityJoin = (id: string) => {
    console.log('Joined community:', id);
  };

  const handleLogout = () => {
    setUser(null);
    setAppState('landing');
  };

  // Landing page with loading screen
  if (appState === 'landing') {
    return <LoadingScreen onComplete={() => setAppState('auth')} />;
  }

  // Auth page
  if (appState === 'auth') {
    return (
      <>
        <Head>
          <title>VYBR Housing - Sign In</title>
          <meta name="description" content="Sign in to VYBR Housing to find your perfect student housing" />
        </Head>
        <div className="min-h-screen bg-gradient-to-br from-primary/5 via-purple-50 to-pink-50 flex items-center justify-center p-4">
          <div className="w-full max-w-md">
            {authMode === 'login' ? (
              <LoginForm
                onLogin={handleLogin}
                onSwitchToSignup={() => setAuthMode('signup')}
              />
            ) : (
              <SignupForm
                onSignup={handleSignup}
                onSwitchToLogin={() => setAuthMode('login')}
              />
            )}
            <div className="text-center mt-6">
              <Button
                onClick={() => setAppState('landing')}
                variant="ghost"
                className="text-sm text-muted-foreground"
              >
                ← Back to home
              </Button>
            </div>
          </div>
        </div>
      </>
    );
  }

  // Profile setup
  if (appState === 'profile-setup') {
    return (
      <>
        <Head>
          <title>VYBR Housing - Profile Setup</title>
          <meta name="description" content="Complete your profile to get personalized housing recommendations" />
        </Head>
        <div className="min-h-screen bg-gradient-to-br from-primary/5 via-purple-50 to-pink-50 flex items-center justify-center p-4">
          <ProfileSetup onComplete={handleProfileComplete} />
        </div>
      </>
    );
  }

  // Property detail view
  if (appState === 'property-detail' && selectedProperty) {
    return (
      <>
        <Head>
          <title>{selectedProperty.title} - VYBR Housing</title>
          <meta name="description" content={selectedProperty.description} />
        </Head>
        <PropertyDetailView
          property={selectedProperty}
          onBack={handleBackFromDetail}
          onContact={handleContactLandlord}
        />
      </>
    );
  }

  // Sublease detail view
  if (appState === 'sublease-detail' && selectedSublease) {
    return (
      <>
        <Head>
          <title>{selectedSublease.title} - VYBR Housing</title>
          <meta name="description" content={selectedSublease.description} />
        </Head>
        <SubleaseDetailView
          sublease={selectedSublease}
          onBack={handleBackFromDetail}
          onContact={handleContactLandlord}
        />
      </>
    );
  }

  // Main app
  return (
    <>
      <Head>
        <title>VYBR Housing - Find Your Perfect Student Housing</title>
        <meta name="description" content="Discover student housing, find roommates, and connect with your university community through VYBR Housing." />
      </Head>
      <div className="min-h-screen bg-background">
        {/* Desktop Header */}
        {!isMobile && (
          <Header
            user={user}
            onSearch={handleSearch}
            onLogout={handleLogout}
          />
        )}
        
        <main className={`${isMobile ? 'pb-20' : 'container mx-auto px-4 py-6'}`}>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            {/* Desktop Tabs */}
            {!isMobile && (
              <TabsList className="grid w-full grid-cols-4 mb-8">
                <TabsTrigger value="search" className="flex items-center gap-2">
                  <HomeIcon className="h-4 w-4" />
                  Housing
                </TabsTrigger>
                <TabsTrigger value="sublease" className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Sublease
                </TabsTrigger>
                <TabsTrigger value="messages" className="flex items-center gap-2">
                  <Bot className="h-4 w-4" />
                  VYBR AI
                </TabsTrigger>
                <TabsTrigger value="profile" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Profile
                </TabsTrigger>
              </TabsList>
            )}

            <TabsContent value="search">
              <div className={`${isMobile ? 'px-4 py-6' : ''} flex flex-col lg:flex-row gap-6`}>
                {showFilters && (
                  <div className="w-full lg:w-80 flex-shrink-0">
                    <SearchFilters
                      onFiltersChange={handleFiltersChange}
                      isOpen={showFilters}
                      onToggle={() => setShowFilters(!showFilters)}
                    />
                  </div>
                )}
                <div className="flex-1">
                  <SearchResults
                    properties={mockProperties}
                    onPropertySelect={handlePropertySelect}
                    onToggleFilters={() => setShowFilters(!showFilters)}
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="sublease">
              <SubleaseView 
                onPropertySelect={handlePropertySelect}
                mockSubleases={mockSubleases}
              />
            </TabsContent>

            <TabsContent value="messages">
              <div className={`${isMobile ? 'px-4 py-6' : ''}`}>
                <VybrAiChat 
                  onPropertySelect={handlePropertySelect}
                  mockProperties={mockProperties}
                />
              </div>
            </TabsContent>

            <TabsContent value="profile">
              <ProfileView
                user={user}
                favoriteProperties={favoriteProperties}
                onEditProfile={handleEditProfile}
                onPropertySelect={handlePropertySelect}
                onLogout={handleLogout}
              />
            </TabsContent>
          </Tabs>
        </main>

        {/* Mobile Bottom Navigation */}
        {isMobile && (
          <BottomNavigation
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />
        )}
      </div>
    </>
  );
}
