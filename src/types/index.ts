// User types
export interface User {
  name: string;
  email: string;
  avatar?: string;
  age?: number;
  gender?: string;
  university?: string;
  major?: string;
  year?: string;
  bio?: string;
  interests?: string[];
  preferences?: UserPreferences;
}

export interface UserPreferences {
  budget: {
    min: number;
    max: number;
  };
  location: string[];
  amenities: string[];
  roommates: {
    count: number;
    gender: 'any' | 'same' | 'mixed';
    lifestyle: string[];
  };
}

// Property types
export interface Property {
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
  roommates?: Roommate[];
  landlord: Landlord;
}

export interface Sublease extends Omit<Property, 'leaseStart' | 'leaseDuration' | 'deposit' | 'landlord'> {
  originalPrice: number;
  duration: string;
  negotiable: boolean;
  reason: string;
  currentTenant: CurrentTenant;
  deposit?: number;
  landlord?: Landlord;
}

export interface Roommate {
  name: string;
  age: number;
  major: string;
  bio: string;
  avatar?: string;
}

export interface Landlord {
  name: string;
  phone: string;
  email: string;
  responseTime: string;
  avatar?: string;
}

export interface CurrentTenant extends Roommate {
  phone: string;
  email: string;
  responseTime: string;
}

// Community types
export interface Community {
  id: string;
  name: string;
  description: string;
  memberCount: number;
  university: string;
  location: string;
  tags: string[];
  image?: string;
  recentMembers: {
    name: string;
    major: string;
  }[];
}

// App state types
export type AppState = 'landing' | 'auth' | 'profile-setup' | 'main' | 'property-detail' | 'sublease-detail';
export type AuthMode = 'login' | 'signup';

// Component prop types
export interface LoadingScreenProps {
  onComplete: () => void;
}

export interface LoginFormProps {
  onLogin: (email: string) => void;
  onSwitchToSignup: () => void;
}

export interface SignupFormProps {
  onSignup: (email: string, name: string) => void;
  onSwitchToLogin: () => void;
}

export interface ProfileSetupProps {
  onComplete: (profile: Partial<User>) => void;
}

export interface PropertyDetailViewProps {
  property: Property;
  onBack: () => void;
  onContact: () => void;
}

export interface SubleaseDetailViewProps {
  sublease: Sublease;
  onBack: () => void;
  onContact: () => void;
}

export interface SearchResultsProps {
  properties: Property[];
  onPropertySelect: (id: string) => void;
  onToggleFilters: () => void;
}

export interface SearchFiltersProps {
  onFiltersChange: (filters: any) => void;
  isOpen: boolean;
  onToggle: () => void;
}

export interface HeaderProps {
  user?: User | null;
  onSearch: (query: string) => void;
  onLogout: () => void;
}

export interface BottomNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export interface ProfileViewProps {
  user: User | null;
  favoriteProperties: Property[];
  onEditProfile: () => void;
  onPropertySelect: (id: string) => void;
  onLogout: () => void;
}

export interface VybrAiChatProps {
  onPropertySelect: (id: string) => void;
  mockProperties: Property[];
}

export interface SubleaseViewProps {
  onPropertySelect: (id: string) => void;
  mockSubleases: Sublease[];
}

export interface CommunityCardProps {
  community: Community;
  onJoin: (id: string) => void;
}
