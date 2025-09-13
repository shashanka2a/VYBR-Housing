'use client'

import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';

interface SignupFormProps {
  onSignup: (email: string, name: string) => void;
  onSwitchToLogin: () => void;
}

export function SignupForm({ onSignup, onSwitchToLogin }: SignupFormProps) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSignup(email, name);
  };

  return (
    <Card className="w-full max-w-md bg-white shadow-card rounded-2xl">
      <CardHeader className="text-center p-6">
        <CardTitle className="text-2xl font-bold text-gray-900">
          Join VYBR
        </CardTitle>
        <CardDescription className="text-gray-600">
          Create your account to find your perfect home
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-gray-900 font-medium">Full Name</Label>
            <Input
              id="name"
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="rounded-xl border-gray-300 focus:border-indigo-500"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email" className="text-gray-900 font-medium">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="rounded-xl border-gray-300 focus:border-indigo-500"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="text-gray-900 font-medium">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="rounded-xl border-gray-300 focus:border-indigo-500"
            />
          </div>
          <Button type="submit" className="w-full rounded-full bg-gradient-button text-white font-semibold py-3">
            Create Account
          </Button>
          <div className="text-center">
            <button
              type="button"
              onClick={onSwitchToLogin}
              className="text-sm text-indigo-600 hover:underline"
            >
              Already have an account? Sign in
            </button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}