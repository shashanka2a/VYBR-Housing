'use client'

import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';

interface LoginFormProps {
  onLogin: (email: string) => void;
  onSwitchToSignup: () => void;
}

export function LoginForm({ onLogin, onSwitchToSignup }: LoginFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(email);
  };

  return (
    <Card className="w-full max-w-md bg-white shadow-card rounded-2xl">
      <CardHeader className="text-center p-6">
        <CardTitle className="text-2xl font-bold text-gray-900">
          Welcome Back
        </CardTitle>
        <CardDescription className="text-gray-600">
          Sign in to your VYBR account
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
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
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="rounded-xl border-gray-300 focus:border-indigo-500"
            />
          </div>
          <Button type="submit" className="w-full rounded-full bg-gradient-button text-white font-semibold py-3">
            Sign In
          </Button>
          <div className="text-center">
            <button
              type="button"
              onClick={onSwitchToSignup}
              className="text-sm text-indigo-600 hover:underline"
            >
              Don't have an account? Sign up
            </button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}