'use client'

import { useState, useEffect, useRef } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Badge } from '../ui/badge';
import { Textarea } from '../ui/textarea';
import { Bot, Send, Home, DollarSign, MapPin, Users, Calendar } from 'lucide-react';

interface Message {
  id: string;
  type: 'ai' | 'user';
  content: string;
  timestamp: Date;
  suggestions?: string[];
  propertyRecommendations?: any[];
}

interface VybrAiChatProps {
  onPropertySelect?: (id: string) => void;
  mockProperties?: any[];
}

export function VybrAiChat({ onPropertySelect, mockProperties = [] }: VybrAiChatProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [userPreferences, setUserPreferences] = useState<any>({});
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Initialize with welcome message
    const welcomeMessage: Message = {
      id: '1',
      type: 'ai',
      content: "Hi! I'm VYBR AI, your personal housing assistant! 🏠 I'm here to help you find the perfect student accommodation based on your preferences and needs. Let's start by getting to know you better!",
      timestamp: new Date(),
      suggestions: [
        "Help me find housing",
        "What's my budget range?",
        "I need roommates",
        "Show me options near campus"
      ]
    };
    setMessages([welcomeMessage]);
  }, []);

  const aiResponses = {
    budget: {
      content: "Great! Budget is super important for students. What's your monthly rent budget? 💰",
      suggestions: ["Under $600", "$600-800", "$800-1200", "$1200+", "I'm flexible"]
    },
    roommates: {
      content: "Perfect! Living with roommates can be both fun and cost-effective. Are you looking for roommates or do you already have some in mind? 👥",
      suggestions: ["I need to find roommates", "I have roommates already", "I prefer living alone", "Either works for me"]
    },
    location: {
      content: "Location is key for student life! How important is being close to campus vs other factors like nightlife, quietness, or public transport? 📍",
      suggestions: ["Walking distance to campus", "Near public transport", "Quiet neighborhood", "Close to nightlife", "Mix of everything"]
    },
    housing_type: {
      content: "What type of housing are you most interested in? Each has its own benefits! 🏘️",
      suggestions: ["Apartment", "Student dorms", "Shared house", "Studio", "I'm open to all"]
    },
    amenities: {
      content: "What amenities are must-haves for you? Don't worry, we can find something that fits your needs! ✨",
      suggestions: ["WiFi & utilities included", "Furnished", "Gym/fitness center", "Parking", "Laundry facilities", "Pet-friendly"]
    },
    recommendations: {
      content: "Perfect! Based on our conversation, I've found some great options that match your preferences. Here are my top recommendations:",
      suggestions: ["Tell me more", "Show different options", "Help me contact landlords", "Save these properties"]
    }
  };

  const generateAiResponse = (userMessage: string): Message => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Update user preferences based on their response
    const newPreferences = { ...userPreferences };
    
    if (lowerMessage.includes('budget') || lowerMessage.includes('$') || lowerMessage.includes('rent')) {
      if (lowerMessage.includes('600')) {
        newPreferences.budget = lowerMessage.includes('under') ? 'under-600' : '600-800';
      } else if (lowerMessage.includes('800')) {
        newPreferences.budget = '800-1200';
      } else if (lowerMessage.includes('1200')) {
        newPreferences.budget = '1200+';
      }
      setUserPreferences(newPreferences);
      return {
        id: Date.now().toString(),
        type: 'ai',
        content: aiResponses.roommates.content,
        timestamp: new Date(),
        suggestions: aiResponses.roommates.suggestions
      };
    }
    
    if (lowerMessage.includes('roommate') || lowerMessage.includes('living')) {
      if (lowerMessage.includes('need to find') || lowerMessage.includes('looking for')) {
        newPreferences.needRoommates = true;
      } else if (lowerMessage.includes('alone') || lowerMessage.includes('prefer')) {
        newPreferences.needRoommates = false;
      }
      setUserPreferences(newPreferences);
      return {
        id: Date.now().toString(),
        type: 'ai',
        content: aiResponses.location.content,
        timestamp: new Date(),
        suggestions: aiResponses.location.suggestions
      };
    }
    
    if (lowerMessage.includes('campus') || lowerMessage.includes('location') || lowerMessage.includes('transport')) {
      if (lowerMessage.includes('walking') || lowerMessage.includes('close')) {
        newPreferences.proximityToCampus = 'walking';
      } else if (lowerMessage.includes('transport')) {
        newPreferences.proximityToCampus = 'transport';
      } else if (lowerMessage.includes('quiet')) {
        newPreferences.environment = 'quiet';
      }
      setUserPreferences(newPreferences);
      return {
        id: Date.now().toString(),
        type: 'ai',
        content: aiResponses.housing_type.content,
        timestamp: new Date(),
        suggestions: aiResponses.housing_type.suggestions
      };
    }
    
    if (lowerMessage.includes('apartment') || lowerMessage.includes('dorm') || lowerMessage.includes('house') || lowerMessage.includes('studio')) {
      if (lowerMessage.includes('apartment')) newPreferences.housingType = 'apartment';
      else if (lowerMessage.includes('dorm')) newPreferences.housingType = 'dorm';
      else if (lowerMessage.includes('house')) newPreferences.housingType = 'house';
      else if (lowerMessage.includes('studio')) newPreferences.housingType = 'studio';
      
      setUserPreferences(newPreferences);
      return {
        id: Date.now().toString(),
        type: 'ai',
        content: aiResponses.amenities.content,
        timestamp: new Date(),
        suggestions: aiResponses.amenities.suggestions
      };
    }
    
    if (lowerMessage.includes('wifi') || lowerMessage.includes('furnished') || lowerMessage.includes('gym') || lowerMessage.includes('parking')) {
      const amenities = [];
      if (lowerMessage.includes('wifi')) amenities.push('WiFi');
      if (lowerMessage.includes('furnished')) amenities.push('Furnished');
      if (lowerMessage.includes('gym')) amenities.push('Gym');
      if (lowerMessage.includes('parking')) amenities.push('Parking');
      
      newPreferences.amenities = amenities;
      setUserPreferences(newPreferences);
      
      // Generate property recommendations based on preferences
      const recommendations = mockProperties.slice(0, 2).map(prop => ({
        ...prop,
        matchScore: Math.floor(Math.random() * 20) + 80, // 80-100% match
        matchReasons: generateMatchReasons(newPreferences, prop)
      }));
      
      return {
        id: Date.now().toString(),
        type: 'ai',
        content: aiResponses.recommendations.content,
        timestamp: new Date(),
        suggestions: aiResponses.recommendations.suggestions,
        propertyRecommendations: recommendations
      };
    }
    
    // Default responses for common queries
    if (lowerMessage.includes('help') || lowerMessage.includes('start') || lowerMessage.includes('find')) {
      return {
        id: Date.now().toString(),
        type: 'ai',
        content: aiResponses.budget.content,
        timestamp: new Date(),
        suggestions: aiResponses.budget.suggestions
      };
    }
    
    // Fallback response
    return {
      id: Date.now().toString(),
      type: 'ai',
      content: "I understand! Let me help you find the perfect housing. Can you tell me more about what you're looking for? 🤔",
      timestamp: new Date(),
      suggestions: ["My budget range", "Location preferences", "Housing type", "Amenities I need"]
    };
  };

  const generateMatchReasons = (preferences: any, property: any): string[] => {
    const reasons = [];
    
    if (preferences.budget && property.price <= 1000) {
      reasons.push("Within your budget range");
    }
    
    if (preferences.proximityToCampus === 'walking' && property.distance < 1) {
      reasons.push("Walking distance to campus");
    }
    
    if (preferences.needRoommates && property.roommates?.length > 0) {
      reasons.push("Has potential roommates");
    }
    
    if (preferences.amenities?.some((amenity: string) => property.amenities.includes(amenity))) {
      reasons.push("Includes your preferred amenities");
    }
    
    if (property.rating >= 4.5) {
      reasons.push("Highly rated by students");
    }
    
    return reasons.length > 0 ? reasons : ["Great match for students"];
  };

  const handleSendMessage = async () => {
    if (!currentMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: currentMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setCurrentMessage('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse = generateAiResponse(currentMessage);
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 2000);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setCurrentMessage(suggestion);
    handleSendMessage();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] max-h-[800px]">
      {/* Chat Header */}
      <div className="flex items-center gap-3 p-4 border-b bg-gradient-to-r from-primary/5 to-purple-50 rounded-t-xl">
        <Avatar className="h-10 w-10">
          <AvatarFallback className="bg-gradient-to-r from-primary to-purple-600 text-white">
            <Bot className="h-5 w-5" />
          </AvatarFallback>
        </Avatar>
        <div>
          <h3 className="font-semibold">VYBR AI Assistant</h3>
          <p className="text-sm text-muted-foreground">Your personal housing advisor</p>
        </div>
        <Badge className="ml-auto bg-green-100 text-green-700">Online</Badge>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] ${message.type === 'user' ? 'order-1' : ''}`}>
              {message.type === 'ai' && (
                <div className="flex items-center gap-2 mb-2">
                  <Avatar className="h-6 w-6">
                    <AvatarFallback className="bg-gradient-to-r from-primary to-purple-600 text-white text-xs">
                      <Bot className="h-3 w-3" />
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium">VYBR AI</span>
                </div>
              )}
              
              <div className={`p-3 rounded-2xl ${
                message.type === 'user' 
                  ? 'bg-gradient-to-r from-primary to-purple-600 text-white ml-auto' 
                  : 'bg-muted'
              }`}>
                <p className="text-sm leading-relaxed">{message.content}</p>
              </div>

              {/* Property Recommendations */}
              {message.propertyRecommendations && (
                <div className="mt-4 space-y-3">
                  {message.propertyRecommendations.map((property) => (
                    <Card key={property.id} className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => onPropertySelect?.(property.id)}>
                      <CardContent className="p-4">
                        <div className="flex gap-3">
                          <img 
                            src={property.images[0]} 
                            alt={property.title}
                            className="w-16 h-16 rounded-lg object-cover"
                          />
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <h4 className="font-medium text-sm">{property.title}</h4>
                              <Badge className="bg-green-100 text-green-700 text-xs">
                                {property.matchScore}% match
                              </Badge>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                              <DollarSign className="h-3 w-3" />
                              <span>${property.price}/month</span>
                              <MapPin className="h-3 w-3" />
                              <span>{property.distance}mi from campus</span>
                            </div>
                            <div className="flex flex-wrap gap-1">
                              {property.matchReasons.slice(0, 2).map((reason: string, index: number) => (
                                <Badge key={index} variant="secondary" className="text-xs">
                                  {reason}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}

              {/* Quick Suggestions */}
              {message.suggestions && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {message.suggestions.map((suggestion, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="text-xs rounded-full"
                    >
                      {suggestion}
                    </Button>
                  ))}
                </div>
              )}
              
              <div className="text-xs text-muted-foreground mt-2">
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="flex items-center gap-2">
              <Avatar className="h-6 w-6">
                <AvatarFallback className="bg-gradient-to-r from-primary to-purple-600 text-white text-xs">
                  <Bot className="h-3 w-3" />
                </AvatarFallback>
              </Avatar>
              <div className="bg-muted p-3 rounded-2xl">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="p-4 border-t bg-background">
        <div className="flex gap-2">
          <Textarea
            value={currentMessage}
            onChange={(e) => setCurrentMessage(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Ask me about housing preferences, budget, location..."
            className="flex-1 min-h-[44px] max-h-[120px] resize-none rounded-xl"
            rows={1}
          />
          <Button
            onClick={handleSendMessage}
            disabled={!currentMessage.trim() || isTyping}
            size="sm"
            className="rounded-xl px-4 bg-gradient-to-r from-primary to-purple-600"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}