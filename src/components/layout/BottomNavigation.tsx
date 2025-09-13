import { Button } from '../ui/button';
import { Home, Users, FileText, Bot, User } from 'lucide-react';

interface BottomNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function BottomNavigation({ activeTab, onTabChange }: BottomNavigationProps) {
  const tabs = [
    { id: 'search', label: 'Housing', icon: Home },
    { id: 'sublease', label: 'Sublease', icon: FileText },
    { id: 'messages', label: 'VYBR AI', icon: Bot },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-t border-border z-50 md:hidden">
      <div className="flex items-center justify-around py-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <Button
              key={tab.id}
              variant="ghost"
              size="sm"
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center gap-1 h-auto py-2 px-3 rounded-xl ${
                isActive 
                  ? 'text-primary bg-primary/10' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon className="h-5 w-5" />
              <span className="text-xs">{tab.label}</span>
            </Button>
          );
        })}
      </div>
    </div>
  );
}