"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
// import { useToast } from "@/components/ui/use-toast";
import { toast } from "react-hot-toast";

import { auth, ProfileData } from "@/lib/auth";
import { Briefcase, MapPin, Code, FileText, Globe } from "lucide-react";

export default function OnboardingPage() {
  const router = useRouter();
  // const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [profileData, setProfileData] = useState<ProfileData>({
    title: "",
    bio: "",
    skills: [],
    experience: "",
    location: "",
    portfolio: "",
  });
  const [skillInput, setSkillInput] = useState("");

  useEffect(() => {
    const user = auth.getCurrentUser();
    if (!user) {
      // router.push("/login");
    } else if (user.onboardingCompleted) {
      // router.push("/dashboard");
    }
  }, [router]);

  const addSkill = () => {
    if (skillInput.trim() && !profileData.skills.includes(skillInput.trim())) {
      setProfileData({
        ...profileData,
        skills: [...profileData.skills, skillInput.trim()],
      });
      setSkillInput("");
    }
  };

  const removeSkill = (skill: string) => {
    setProfileData({
      ...profileData,
      skills: profileData.skills.filter((s) => s !== skill),
    });
  };

  const nextStep = () => {
    if (step === 1 && !profileData.title) {
      toast.success("Please enter your professional title");
      return;
    }
    if (step === 2 && !profileData.bio) {
      toast.success("Please tell us about yourself");
      return;
    }
    setStep(step + 1);
  };

  const prevStep = () => setStep(step - 1);

  const handleSubmit = async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 500));

    const user = auth.getCurrentUser();
    if (user) {
      const result = auth.updateOnboarding(user.id, profileData);
      if (result.success) {
        toast.success("Onboarding complete!");
        router.push("/dashboard");
      }
    }
    setIsLoading(false);
  };

  const progress = (step / 4) * 100;

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Complete Your Profile
          </CardTitle>
          <CardDescription className="text-center">
            Tell us about yourself to create your perfect resume
          </CardDescription>
          <Progress value={progress} className="mt-4" />
          <div className="flex justify-between text-xs text-gray-500 mt-2">
            <span className={step >= 1 ? "text-purple-600 font-semibold" : ""}>
              Basic Info
            </span>
            <span className={step >= 2 ? "text-purple-600 font-semibold" : ""}>
              Bio
            </span>
            <span className={step >= 3 ? "text-purple-600 font-semibold" : ""}>
              Skills
            </span>
            <span className={step >= 4 ? "text-purple-600 font-semibold" : ""}>
              Details
            </span>
          </div>
        </CardHeader>
        <CardContent>
          {step === 1 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Professional Title *</Label>
                <div className="relative">
                  <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="e.g., Senior Frontend Developer"
                    className="pl-10"
                    value={profileData.title}
                    onChange={(e) =>
                      setProfileData({ ...profileData, title: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Years of Experience *</Label>
                <Input
                  placeholder="e.g., 5+ years"
                  value={profileData.experience}
                  onChange={(e) =>
                    setProfileData({
                      ...profileData,
                      experience: e.target.value,
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Location</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="City, State"
                    className="pl-10"
                    value={profileData.location}
                    onChange={(e) =>
                      setProfileData({
                        ...profileData,
                        location: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Professional Bio *</Label>
                <Textarea
                  placeholder="Tell us about your professional background, achievements, and career goals..."
                  rows={6}
                  value={profileData.bio}
                  onChange={(e) =>
                    setProfileData({ ...profileData, bio: e.target.value })
                  }
                />
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Skills *</Label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Code className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Add a skill (e.g., React)"
                      className="pl-10"
                      value={skillInput}
                      onChange={(e) => setSkillInput(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && addSkill()}
                    />
                  </div>
                  <Button type="button" onClick={addSkill}>
                    Add
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-3">
                  {profileData.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm flex items-center gap-2"
                    >
                      {skill}
                      <button
                        type="button"
                        onClick={() => removeSkill(skill)}
                        className="hover:text-purple-900"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Portfolio/Website (Optional)</Label>
                <div className="relative">
                  <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="https://yourportfolio.com"
                    className="pl-10"
                    value={profileData.portfolio}
                    onChange={(e) =>
                      setProfileData({
                        ...profileData,
                        portfolio: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <FileText className="h-5 w-5 text-purple-600 mb-2" />
                <p className="text-sm text-gray-600">
                  This information will help us create a personalized resume for
                  you. You can always edit it later.
                </p>
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          {step > 1 && (
            <Button variant="outline" onClick={prevStep}>
              Back
            </Button>
          )}
          {step < 4 ? (
            <Button className={step === 1 ? "w-full" : ""} onClick={nextStep}>
              Continue
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? "Saving..." : "Complete Setup"}
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
