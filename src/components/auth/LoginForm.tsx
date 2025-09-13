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
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl bg-gradient-to-r from-primary to-pink-500 bg-clip-text text-transparent">
          Welcome Back
        </CardTitle>
        <CardDescription>
          Sign in to your VYBR account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="rounded-xl"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="rounded-xl"
            />
          </div>
          <Button type="submit" className="w-full rounded-xl bg-gradient-to-r from-primary to-purple-600 hover:from-purple-600 hover:to-primary">
            Sign In
          </Button>
          <div className="text-center">
            <button
              type="button"
              onClick={onSwitchToSignup}
              className="text-sm text-primary hover:underline"
            >
              Don't have an account? Sign up
            </button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}