import { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { PropertyCard } from '../search/PropertyCard';
import { 
  User, 
  Edit3, 
  Heart, 
  Calendar, 
  GraduationCap, 
  MapPin,
  Settings,
  LogOut
} from 'lucide-react';
import { User as UserType, Property } from '@/types';

interface ProfileViewProps {
  user: UserType | null;
  favoriteProperties?: Property[];
  onEditProfile: () => void;
  onPropertySelect: (id: string) => void;
  onLogout: () => void;
}

export function ProfileView({ 
  user, 
  favoriteProperties = [], 
  onEditProfile, 
  onPropertySelect,
  onLogout 
}: ProfileViewProps) {
  const [activeTab, setActiveTab] = useState('overview');

  if (!user) {
    return (
      <div className="min-h-screen bg-background pb-20 md:pb-0">
        <div className="container mx-auto px-4 py-6 max-w-4xl">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Please log in to view your profile</h1>
            <Button onClick={onLogout}>Go to Login</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        {/* Profile Header */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-start gap-6">
              <Avatar className="h-24 w-24 mx-auto md:mx-0">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="text-2xl">
                  {user.name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-2xl font-bold mb-2">{user.name}</h1>
                <p className="text-muted-foreground mb-4">{user.email}</p>
                
                {user.university && (
                  <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                    <GraduationCap className="h-4 w-4 text-primary" />
                    <span className="text-sm">{user.major} at {user.university}</span>
                  </div>
                )}
                
                {user.age && (
                  <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
                    <Calendar className="h-4 w-4 text-primary" />
                    <span className="text-sm">{user.age} years old • {user.gender}</span>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row gap-2 justify-center md:justify-start">
                  <Button 
                    onClick={onEditProfile}
                    variant="outline" 
                    size="sm" 
                    className="rounded-full"
                  >
                    <Edit3 className="h-4 w-4 mr-2" />
                    Edit Profile
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="rounded-full"
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    Settings
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Profile Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="favorites">Favorites</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="space-y-6">
              {/* Bio */}
              {user.bio && (
                <Card>
                  <CardHeader>
                    <CardTitle>About Me</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">{user.bio}</p>
                  </CardContent>
                </Card>
              )}

              {/* Interests */}
              {user.interests && user.interests.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Interests & Hobbies</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {user.interests.map((interest) => (
                        <Badge key={interest} variant="secondary" className="rounded-full">
                          {interest}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Account Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Account</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button 
                    variant="outline" 
                    className="w-full justify-start rounded-xl"
                  >
                    <Settings className="h-4 w-4 mr-3" />
                    Account Settings
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start rounded-xl"
                  >
                    <User className="h-4 w-4 mr-3" />
                    Privacy Settings
                  </Button>
                  <Button 
                    onClick={onLogout}
                    variant="outline" 
                    className="w-full justify-start rounded-xl text-destructive hover:text-destructive"
                  >
                    <LogOut className="h-4 w-4 mr-3" />
                    Sign Out
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="favorites">
            <div className="space-y-6">
              {favoriteProperties.length > 0 ? (
                <>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Saved Properties</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {favoriteProperties.length} properties saved
                    </p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {favoriteProperties.map((property) => (
                      <PropertyCard
                        key={property.id}
                        property={property}
                        viewMode="grid"
                        onSelect={onPropertySelect}
                      />
                    ))}
                  </div>
                </>
              ) : (
                <Card>
                  <CardContent className="p-12 text-center">
                    <Heart className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No Favorites Yet</h3>
                    <p className="text-muted-foreground mb-4">
                      Start exploring properties and save your favorites here
                    </p>
                    <Button 
                      onClick={() => setActiveTab('search')}
                      className="rounded-full"
                    >
                      Browse Properties
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="activity">
            <Card>
              <CardContent className="p-12 text-center">
                <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">Activity History</h3>
                <p className="text-muted-foreground">
                  Your recent activity and interactions will appear here
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}