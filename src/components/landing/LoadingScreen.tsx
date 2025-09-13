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
      color: "from-purple-600 to-pink-500"
    },
    {
      icon: Users,
      title: "Roommate Compatibility",
      description: "Connect with like-minded students based on lifestyle and study habits",
      color: "from-green-500 to-green-400"
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
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-8 px-4 overflow-hidden relative">
      <div className="relative z-10 w-full max-w-2xl text-center">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="w-20 h-20 bg-gradient-primary rounded-3xl flex items-center justify-center shadow-lg transform hover:scale-105 transition-transform">
            <span className="text-white font-bold text-3xl">V</span>
          </div>
        </div>

        {/* Main Title */}
        <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: '#111827' }}>
          VYBR
        </h1>
        
        <p className="text-lg text-gray-600 mb-8">
          Your AI-powered student housing companion
        </p>

        {/* Feature Steps */}
        <div className="space-y-5 mb-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isActive = index === currentStep;
            const isCompleted = index < currentStep;
            
            return (
              <div
                key={index}
                className={`flex items-center gap-4 p-5 rounded-2xl transition-all duration-500 ${
                  isActive 
                    ? 'bg-white shadow-card-hover scale-105 border border-indigo-200' 
                    : isCompleted
                    ? 'bg-white shadow-card'
                    : 'bg-white shadow-card'
                }`}
              >
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-500 ${
                  isActive || isCompleted
                    ? `bg-gradient-to-r ${step.color} shadow-md`
                    : 'bg-gray-200'
                }`}>
                  {isCompleted ? (
                    <CheckCircle className="h-8 w-8 text-white" />
                  ) : (
                    <Icon className={`h-8 w-8 ${isActive ? 'text-white' : 'text-gray-500'}`} />
                  )}
                </div>
                
                <div className="flex-1 text-left">
                  <h3 className="font-bold text-lg mb-1 transition-colors" style={{ color: '#111827' }}>
                    {step.title}
                  </h3>
                  <p className="text-sm transition-colors" style={{ color: '#4B5563' }}>
                    {step.description}
                  </p>
                </div>
                
                {isActive && (
                  <div className="flex items-center gap-2 text-indigo-600">
                    <div className="w-2 h-2 bg-indigo-600 rounded-full animate-ping"></div>
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
            <span className="text-sm text-gray-600">Initializing your housing experience</span>
            <span className="text-sm font-medium text-primary">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-3 bg-white/50" />
        </div>

        {/* CTA */}
        {showCTA && (
          <div className="animate-in fade-in-0 slide-in-from-bottom-4 duration-700">
            <div className="p-6 bg-white rounded-2xl shadow-card border border-gray-200 mb-6">
              <h2 className="text-xl font-bold mb-2" style={{ color: '#111827' }}>Ready to find your perfect student home?</h2>
              <p className="mb-6" style={{ color: '#4B5563' }}>
                Join thousands of students who've found their ideal housing with VYBR AI
              </p>
              
              <Button
                onClick={onComplete}
                size="lg"
                className="w-full rounded-full text-lg py-4 bg-gradient-button hover:opacity-90 shadow-lg hover:shadow-xl transition-all duration-300 text-white font-semibold"
              >
                Start Your Housing Journey
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
            
            <div className="flex justify-center gap-8 text-sm text-gray-600">
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