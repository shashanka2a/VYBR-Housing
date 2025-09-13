'use client'

import { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';
import { Home, Search, Users, Sparkles, CheckCircle, ArrowRight } from 'lucide-react';

interface LoadingScreenProps {
  onComplete: () => void;
}

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [showCTA, setShowCTA] = useState(false);

  const steps = [
    {
      icon: Search,
      title: "Smart Housing Discovery",
      description: "AI-powered search finds perfect student accommodations near your campus",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Sparkles,
      title: "Intelligent Matching",
      description: "VYBR AI learns your preferences to recommend ideal housing options",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Users,
      title: "Roommate Compatibility",
      description: "Connect with like-minded students based on lifestyle and study habits",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Home,
      title: "Verified Properties",
      description: "Every listing is verified for safety, quality, and student-friendly policies",
      color: "from-orange-500 to-red-500"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + 2;
        
        // Update step based on progress
        const stepIndex = Math.floor(newProgress / 25);
        if (stepIndex !== currentStep && stepIndex < steps.length) {
          setCurrentStep(stepIndex);
        }
        
        // Show CTA when loading is complete
        if (newProgress >= 100) {
          clearInterval(timer);
          setTimeout(() => setShowCTA(true), 500);
          return 100;
        }
        
        return newProgress;
      });
    }, 50);

    return () => clearInterval(timer);
  }, [currentStep, steps.length]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-purple-50 to-pink-50 flex items-center justify-center p-4 overflow-hidden relative">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-pink-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10 w-full max-w-2xl text-center">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-r from-primary to-purple-600 rounded-3xl flex items-center justify-center shadow-lg transform hover:scale-105 transition-transform">
            <span className="text-white font-bold text-3xl">V</span>
          </div>
        </div>

        {/* Main Title */}
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            VYBR
          </span>
        </h1>
        
        <p className="text-lg text-muted-foreground mb-12">
          Your AI-powered student housing companion
        </p>

        {/* Feature Steps */}
        <div className="space-y-8 mb-12">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isActive = index === currentStep;
            const isCompleted = index < currentStep;
            
            return (
              <div
                key={index}
                className={`flex items-center gap-4 p-6 rounded-2xl transition-all duration-500 ${
                  isActive 
                    ? 'bg-white/80 shadow-xl scale-105 border border-primary/20' 
                    : isCompleted
                    ? 'bg-white/60 shadow-md'
                    : 'bg-white/30'
                }`}
              >
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-500 ${
                  isActive || isCompleted
                    ? `bg-gradient-to-r ${step.color} shadow-lg`
                    : 'bg-muted'
                }`}>
                  {isCompleted ? (
                    <CheckCircle className="h-8 w-8 text-white" />
                  ) : (
                    <Icon className={`h-8 w-8 ${isActive ? 'text-white' : 'text-muted-foreground'}`} />
                  )}
                </div>
                
                <div className="flex-1 text-left">
                  <h3 className={`font-semibold text-lg mb-1 transition-colors ${
                    isActive ? 'text-foreground' : 'text-muted-foreground'
                  }`}>
                    {step.title}
                  </h3>
                  <p className={`text-sm transition-colors ${
                    isActive ? 'text-muted-foreground' : 'text-muted-foreground/70'
                  }`}>
                    {step.description}
                  </p>
                </div>
                
                {isActive && (
                  <div className="flex items-center gap-2 text-primary">
                    <div className="w-2 h-2 bg-primary rounded-full animate-ping"></div>
                    <span className="text-sm font-medium">Loading...</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-muted-foreground">Initializing your housing experience</span>
            <span className="text-sm font-medium text-primary">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-3 bg-white/50" />
        </div>

        {/* CTA */}
        {showCTA && (
          <div className="animate-in fade-in-0 slide-in-from-bottom-4 duration-700">
            <div className="p-6 bg-white/80 rounded-2xl shadow-xl border border-primary/20 mb-6">
              <h2 className="text-xl font-semibold mb-2">Ready to find your perfect student home?</h2>
              <p className="text-muted-foreground mb-4">
                Join thousands of students who've found their ideal housing with VYBR AI
              </p>
              
              <Button
                onClick={onComplete}
                size="lg"
                className="w-full rounded-xl text-lg py-6 bg-gradient-to-r from-primary to-purple-600 hover:from-purple-600 hover:to-primary shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Start Your Housing Journey
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
            
            <div className="flex justify-center gap-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>1000+ Verified Properties</span>
              </div>
              <div className="flex items-center gap-1">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>AI-Powered Matching</span>
              </div>
              <div className="flex items-center gap-1">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Student Community</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}