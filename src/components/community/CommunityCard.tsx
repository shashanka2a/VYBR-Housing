import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Users, MapPin, GraduationCap } from 'lucide-react';

interface CommunityCardProps {
  community: {
    id: string;
    name: string;
    description: string;
    memberCount: number;
    university: string;
    location: string;
    tags: string[];
    image: string;
    recentMembers: Array<{
      name: string;
      avatar?: string;
      major: string;
    }>;
  };
  onJoin: (id: string) => void;
}

export function CommunityCard({ community, onJoin }: CommunityCardProps) {
  return (
    <Card className="w-full hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold mb-2">{community.name}</h3>
            <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
              {community.description}
            </p>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Users className="h-4 w-4" />
                <span>{community.memberCount} members</span>
              </div>
              
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <GraduationCap className="h-4 w-4" />
                <span>{community.university}</span>
              </div>
              
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>{community.location}</span>
              </div>
            </div>
          </div>
          
          <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-purple-500/20 rounded-xl flex items-center justify-center ml-4">
            <span className="text-2xl font-bold text-primary">
              {community.name.charAt(0)}
            </span>
          </div>
        </div>

        <div className="flex flex-wrap gap-1 mb-4">
          {community.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs rounded-full">
              {tag}
            </Badge>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex -space-x-2">
            {community.recentMembers.slice(0, 3).map((member, index) => (
              <Avatar key={index} className="w-8 h-8 border-2 border-background">
                <AvatarImage src={member.avatar} alt={member.name} />
                <AvatarFallback className="text-xs">
                  {member.name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            ))}
            {community.recentMembers.length > 3 && (
              <div className="w-8 h-8 rounded-full bg-muted border-2 border-background flex items-center justify-center">
                <span className="text-xs text-muted-foreground">
                  +{community.recentMembers.length - 3}
                </span>
              </div>
            )}
          </div>
          
          <Button
            onClick={() => onJoin(community.id)}
            size="sm"
            className="rounded-full"
            variant="outline"
          >
            Join Community
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}