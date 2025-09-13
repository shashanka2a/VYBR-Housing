'use client'

import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Textarea } from '../ui/textarea';
import { Badge } from '../ui/badge';
import { X } from 'lucide-react';

interface ProfileSetupProps {
  onComplete: (profile: any) => void;
}

export function ProfileSetup({ onComplete }: ProfileSetupProps) {
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [university, setUniversity] = useState('');
  const [major, setMajor] = useState('');
  const [bio, setBio] = useState('');
  const [interests, setInterests] = useState<string[]>([]);
  const [newInterest, setNewInterest] = useState('');

  const addInterest = () => {
    if (newInterest.trim() && !interests.includes(newInterest.trim())) {
      setInterests([...interests, newInterest.trim()]);
      setNewInterest('');
    }
  };

  const removeInterest = (interest: string) => {
    setInterests(interests.filter(i => i !== interest));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onComplete({
      age,
      gender,
      university,
      major,
      bio,
      interests
    });
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl bg-gradient-to-r from-primary to-pink-500 bg-clip-text text-transparent">
          Set Up Your Profile
        </CardTitle>
        <CardDescription>
          Tell us about yourself to find compatible roommates
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                type="number"
                placeholder="Your age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                required
                className="rounded-xl"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="gender">Gender</Label>
              <Select value={gender} onValueChange={setGender}>
                <SelectTrigger className="rounded-xl">
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="non-binary">Non-binary</SelectItem>
                  <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="university">University</Label>
            <Input
              id="university"
              type="text"
              placeholder="Your university"
              value={university}
              onChange={(e) => setUniversity(e.target.value)}
              required
              className="rounded-xl"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="major">Major</Label>
            <Input
              id="major"
              type="text"
              placeholder="Your major/field of study"
              value={major}
              onChange={(e) => setMajor(e.target.value)}
              required
              className="rounded-xl"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              placeholder="Tell us about yourself, your lifestyle, and what you're looking for in a roommate..."
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={4}
              className="rounded-xl"
            />
          </div>

          <div className="space-y-2">
            <Label>Interests & Hobbies</Label>
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="Add an interest"
                value={newInterest}
                onChange={(e) => setNewInterest(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addInterest())}
                className="rounded-xl"
              />
              <Button type="button" onClick={addInterest} variant="outline" className="rounded-xl">
                Add
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {interests.map((interest) => (
                <Badge key={interest} variant="secondary" className="rounded-full">
                  {interest}
                  <button
                    type="button"
                    onClick={() => removeInterest(interest)}
                    className="ml-2 hover:text-destructive"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </div>

          <Button type="submit" className="w-full rounded-xl bg-gradient-to-r from-primary to-purple-600 hover:from-purple-600 hover:to-primary">
            Complete Profile
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}