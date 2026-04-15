"use client";

import { auth } from "@/lib/auth";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  User,
  Mail,
  Briefcase,
  MapPin,
  Code,
  Globe,
  FileText,
  Calendar,
  Award,
  Edit,
  Save,
  X,
  Plus,
  Trash2,
  Upload,
} from "lucide-react";

interface ProfileData {
  title: string;
  bio: string;
  skills: string[];
  experience: string;
  location: string;
  portfolio?: string;
  phone?: string;
  linkedin?: string;
  github?: string;
  education?: {
    degree: string;
    institution: string;
    year: string;
  }[];
  certifications?: {
    name: string;
    issuer: string;
    year: string;
  }[];
}

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [profileData, setProfileData] = useState<ProfileData>({
    title: "",
    bio: "",
    skills: [],
    experience: "",
    location: "",
    portfolio: "",
    phone: "",
    linkedin: "",
    github: "",
    education: [],
    certifications: [],
  });
  const [newSkill, setNewSkill] = useState("");
  const [newEducation, setNewEducation] = useState({
    degree: "",
    institution: "",
    year: "",
  });
  const [newCertification, setNewCertification] = useState({
    name: "",
    issuer: "",
    year: "",
  });
  const [showEducationForm, setShowEducationForm] = useState(false);
  const [showCertificationForm, setShowCertificationForm] = useState(false);

  useEffect(() => {
    const currentUser = auth.getCurrentUser();
    if (!currentUser) {
      router.push("/login");
    } else if (!currentUser.onboardingCompleted) {
      router.push("/onboarding");
    } else {
      setUser(currentUser);
      // Load profile data from user object
      if (currentUser.profile) {
        setProfileData({
          title: currentUser.profile.title || "",
          bio: currentUser.profile.bio || "",
          skills: currentUser.profile.skills || [],
          experience: currentUser.profile.experience || "",
          location: currentUser.profile.location || "",
          portfolio: currentUser.profile.portfolio || "",
          phone: currentUser.profile.phone || "",
          linkedin: currentUser.profile.linkedin || "",
          github: currentUser.profile.github || "",
          education: currentUser.profile.education || [],
          certifications: currentUser.profile.certifications || [],
        });
      }
    }
  }, [router]);

  const addSkill = () => {
    if (newSkill.trim() && !profileData.skills.includes(newSkill.trim())) {
      setProfileData({
        ...profileData,
        skills: [...profileData.skills, newSkill.trim()],
      });
      setNewSkill("");
    }
  };

  const removeSkill = (skill: string) => {
    setProfileData({
      ...profileData,
      skills: profileData.skills.filter((s) => s !== skill),
    });
  };

  const addEducation = () => {
    if (newEducation.degree && newEducation.institution) {
      setProfileData({
        ...profileData,
        education: [...(profileData.education || []), { ...newEducation }],
      });
      setNewEducation({ degree: "", institution: "", year: "" });
      setShowEducationForm(false);
    }
  };

  const removeEducation = (index: number) => {
    const updated = [...(profileData.education || [])];
    updated.splice(index, 1);
    setProfileData({ ...profileData, education: updated });
  };

  const addCertification = () => {
    if (newCertification.name && newCertification.issuer) {
      setProfileData({
        ...profileData,
        certifications: [...(profileData.certifications || []), { ...newCertification }],
      });
      setNewCertification({ name: "", issuer: "", year: "" });
      setShowCertificationForm(false);
    }
  };

  const removeCertification = (index: number) => {
    const updated = [...(profileData.certifications || [])];
    updated.splice(index, 1);
    setProfileData({ ...profileData, certifications: updated });
  };

  const handleSave = async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Update user profile
    const updatedUser = {
      ...user,
      profile: profileData,
    };

    // In a real app, you'd save to your backend
    // For demo, we'll update localStorage
    const users = JSON.parse(localStorage.getItem("resume_builder_users") || "[]");
    const userIndex = users.findIndex((u: any) => u.id === user.id);
    if (userIndex !== -1) {
      users[userIndex].profile = profileData;
      localStorage.setItem("resume_builder_users", JSON.stringify(users));
      localStorage.setItem("resume_builder_current_user", JSON.stringify(updatedUser));
    }

    setUser(updatedUser);
    setIsEditing(false);
    setIsLoading(false);
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              My Profile
            </h1>
            <p className="text-gray-500 text-sm">
              Manage your professional information
            </p>
          </div>
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:shadow-lg transition-all"
            >
              <Edit className="h-4 w-4" />
              Edit Profile
            </button>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={() => setIsEditing(false)}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-all"
              >
                <X className="h-4 w-4" />
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={isLoading}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:shadow-lg transition-all disabled:opacity-50"
              >
                <Save className="h-4 w-4" />
                {isLoading ? "Saving..." : "Save Changes"}
              </button>
            </div>
          )}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Personal Info */}
          <div className="lg:col-span-1 space-y-6">
            {/* Profile Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 h-24"></div>
              <div className="px-6 pb-6 relative">
                <div className="flex justify-center -mt-12 mb-4">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-3xl font-bold shadow-lg border-4 border-white">
                    {user.name
                      .split(" ")
                      .map((n: string) => n[0])
                      .join("")
                      .toUpperCase()
                      .slice(0, 2)}
                  </div>
                </div>
                <div className="text-center">
                  <h2 className="text-xl font-bold text-gray-900">{user.name}</h2>
                  {isEditing ? (
                    <input
                      type="text"
                      value={profileData.title}
                      onChange={(e) =>
                        setProfileData({ ...profileData, title: e.target.value })
                      }
                      placeholder="Professional Title"
                      className="mt-1 w-full text-center text-sm border border-gray-300 rounded-lg px-3 py-1 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  ) : (
                    <p className="text-gray-600 text-sm mt-1">
                      {profileData.title || "Add your title"}
                    </p>
                  )}
                  <p className="text-gray-400 text-xs mt-2 flex items-center justify-center gap-1">
                    <Mail className="h-3 w-3" />
                    {user.email}
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <User className="h-4 w-4" />
                Contact Information
              </h3>
              <div className="space-y-3">
                <div>
                  <label className="text-xs text-gray-500 block mb-1">Location</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={profileData.location}
                      onChange={(e) =>
                        setProfileData({ ...profileData, location: e.target.value })
                      }
                      placeholder="City, State"
                      className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <p className="text-sm text-gray-700 flex items-center gap-2">
                      <MapPin className="h-3 w-3 text-gray-400" />
                      {profileData.location || "Not specified"}
                    </p>
                  )}
                </div>
                <div>
                  <label className="text-xs text-gray-500 block mb-1">Phone</label>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={profileData.phone}
                      onChange={(e) =>
                        setProfileData({ ...profileData, phone: e.target.value })
                      }
                      placeholder="+1 234 567 890"
                      className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <p className="text-sm text-gray-700">
                      {profileData.phone || "Not specified"}
                    </p>
                  )}
                </div>
                <div>
                  <label className="text-xs text-gray-500 block mb-1">LinkedIn</label>
                  {isEditing ? (
                    <input
                      type="url"
                      value={profileData.linkedin}
                      onChange={(e) =>
                        setProfileData({ ...profileData, linkedin: e.target.value })
                      }
                      placeholder="https://linkedin.com/in/username"
                      className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <p className="text-sm text-gray-700">
                      {profileData.linkedin ? (
                        <a
                          href={profileData.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          {profileData.linkedin}
                        </a>
                      ) : (
                        "Not specified"
                      )}
                    </p>
                  )}
                </div>
                <div>
                  <label className="text-xs text-gray-500 block mb-1">GitHub</label>
                  {isEditing ? (
                    <input
                      type="url"
                      value={profileData.github}
                      onChange={(e) =>
                        setProfileData({ ...profileData, github: e.target.value })
                      }
                      placeholder="https://github.com/username"
                      className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <p className="text-sm text-gray-700">
                      {profileData.github ? (
                        <a
                          href={profileData.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          {profileData.github}
                        </a>
                      ) : (
                        "Not specified"
                      )}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Award className="h-4 w-4" />
                Professional Stats
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <p className="text-2xl font-bold text-blue-600">
                    {profileData.experience || "0"}
                  </p>
                  <p className="text-xs text-gray-600">Years Experience</p>
                </div>
                <div className="text-center p-3 bg-purple-50 rounded-lg">
                  <p className="text-2xl font-bold text-purple-600">
                    {profileData.skills?.length || 0}
                  </p>
                  <p className="text-xs text-gray-600">Skills</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Detailed Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Bio */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Professional Bio
              </h3>
              {isEditing ? (
                <textarea
                  value={profileData.bio}
                  onChange={(e) =>
                    setProfileData({ ...profileData, bio: e.target.value })
                  }
                  rows={4}
                  placeholder="Tell us about your professional background..."
                  className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p className="text-gray-700 text-sm leading-relaxed">
                  {profileData.bio || "No bio added yet."}
                </p>
              )}
            </div>

            {/* Skills */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Code className="h-4 w-4" />
                Skills
              </h3>
              <div className="flex flex-wrap gap-2 mb-3">
                {profileData.skills?.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm flex items-center gap-2"
                  >
                    {skill}
                    {isEditing && (
                      <button
                        onClick={() => removeSkill(skill)}
                        className="hover:text-purple-900"
                      >
                        <Trash2 className="h-3 w-3" />
                      </button>
                    )}
                  </span>
                ))}
              </div>
              {isEditing && (
                <div className="flex gap-2 mt-3">
                  <input
                    type="text"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && addSkill()}
                    placeholder="Add a skill (e.g., React, Python)"
                    className="flex-1 text-sm border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    onClick={addSkill}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>

            {/* Experience */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Briefcase className="h-4 w-4" />
                Work Experience
              </h3>
              {isEditing ? (
                <input
                  type="text"
                  value={profileData.experience}
                  onChange={(e) =>
                    setProfileData({ ...profileData, experience: e.target.value })
                  }
                  placeholder="e.g., 5+ years"
                  className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p className="text-gray-700">
                  {profileData.experience || "Not specified"}
                </p>
              )}
            </div>

            {/* Education */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Education
              </h3>
              <div className="space-y-3">
                {(profileData.education || []).map((edu, idx) => (
                  <div key={idx} className="flex justify-between items-start p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">{edu.degree}</p>
                      <p className="text-sm text-gray-600">{edu.institution}</p>
                      <p className="text-xs text-gray-400">{edu.year}</p>
                    </div>
                    {isEditing && (
                      <button
                        onClick={() => removeEducation(idx)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
              {isEditing && (
                <>
                  {showEducationForm ? (
                    <div className="mt-3 p-3 border border-gray-200 rounded-lg space-y-2">
                      <input
                        type="text"
                        value={newEducation.degree}
                        onChange={(e) =>
                          setNewEducation({ ...newEducation, degree: e.target.value })
                        }
                        placeholder="Degree (e.g., B.Sc. Computer Science)"
                        className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2"
                      />
                      <input
                        type="text"
                        value={newEducation.institution}
                        onChange={(e) =>
                          setNewEducation({
                            ...newEducation,
                            institution: e.target.value,
                          })
                        }
                        placeholder="Institution"
                        className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2"
                      />
                      <input
                        type="text"
                        value={newEducation.year}
                        onChange={(e) =>
                          setNewEducation({ ...newEducation, year: e.target.value })
                        }
                        placeholder="Year (e.g., 2020)"
                        className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2"
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={addEducation}
                          className="px-3 py-1 bg-blue-600 text-white rounded-lg text-sm"
                        >
                          Add
                        </button>
                        <button
                          onClick={() => setShowEducationForm(false)}
                          className="px-3 py-1 border border-gray-300 rounded-lg text-sm"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => setShowEducationForm(true)}
                      className="mt-3 flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700"
                    >
                      <Plus className="h-4 w-4" />
                      Add Education
                    </button>
                  )}
                </>
              )}
            </div>

            {/* Certifications */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Award className="h-4 w-4" />
                Certifications
              </h3>
              <div className="space-y-3">
                {(profileData.certifications || []).map((cert, idx) => (
                  <div key={idx} className="flex justify-between items-start p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">{cert.name}</p>
                      <p className="text-sm text-gray-600">{cert.issuer}</p>
                      <p className="text-xs text-gray-400">{cert.year}</p>
                    </div>
                    {isEditing && (
                      <button
                        onClick={() => removeCertification(idx)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
              {isEditing && (
                <>
                  {showCertificationForm ? (
                    <div className="mt-3 p-3 border border-gray-200 rounded-lg space-y-2">
                      <input
                        type="text"
                        value={newCertification.name}
                        onChange={(e) =>
                          setNewCertification({
                            ...newCertification,
                            name: e.target.value,
                          })
                        }
                        placeholder="Certification Name"
                        className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2"
                      />
                      <input
                        type="text"
                        value={newCertification.issuer}
                        onChange={(e) =>
                          setNewCertification({
                            ...newCertification,
                            issuer: e.target.value,
                          })
                        }
                        placeholder="Issuing Organization"
                        className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2"
                      />
                      <input
                        type="text"
                        value={newCertification.year}
                        onChange={(e) =>
                          setNewCertification({
                            ...newCertification,
                            year: e.target.value,
                          })
                        }
                        placeholder="Year"
                        className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2"
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={addCertification}
                          className="px-3 py-1 bg-blue-600 text-white rounded-lg text-sm"
                        >
                          Add
                        </button>
                        <button
                          onClick={() => setShowCertificationForm(false)}
                          className="px-3 py-1 border border-gray-300 rounded-lg text-sm"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => setShowCertificationForm(true)}
                      className="mt-3 flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700"
                    >
                      <Plus className="h-4 w-4" />
                      Add Certification
                    </button>
                  )}
                </>
              )}
            </div>

            {/* Portfolio */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Globe className="h-4 w-4" />
                Portfolio / Website
              </h3>
              {isEditing ? (
                <input
                  type="url"
                  value={profileData.portfolio}
                  onChange={(e) =>
                    setProfileData({ ...profileData, portfolio: e.target.value })
                  }
                  placeholder="https://yourportfolio.com"
                  className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p className="text-gray-700">
                  {profileData.portfolio ? (
                    <a
                      href={profileData.portfolio}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      {profileData.portfolio}
                    </a>
                  ) : (
                    "Not specified"
                  )}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}