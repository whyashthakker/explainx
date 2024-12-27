"use client";
import React, { useState, useEffect } from "react";
import {
  AlertCircle,
  CheckCircle2,
  Youtube,
  Instagram,
  Linkedin,
  Rocket,
} from "lucide-react";
import { Alert, AlertDescription } from "@repo/ui/components/ui/alert";

const InfluencerOnboarding = () => {
  const [step, setStep] = useState(1);
  const [progress, setProgress] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    bio: "",
    category: "",
    followers: 0,
    platforms: [],
  });

  const [connectedAccounts, setConnectedAccounts] = useState({
    youtube: false,
    instagram: false,
    linkedin: false,
  });

  const totalSteps = 4;

  useEffect(() => {
    let completedSteps = 0;
    if (formData.name && formData.bio && formData.category) {
      completedSteps += 1;
    }
    if (connectedAccounts.youtube) completedSteps += 1;
    if (connectedAccounts.instagram) completedSteps += 1;
    if (connectedAccounts.linkedin) completedSteps += 1;

    const newProgress = Math.floor((completedSteps / totalSteps) * 100);
    setProgress(newProgress);
  }, [formData, connectedAccounts]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const connectSocialAccount = (platform: string) => {
    setConnectedAccounts((prev) => ({
      ...prev,
      [platform]: true,
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="text-center space-y-4 py-8">
          <div className="flex items-center justify-center space-x-2 mb-6">
            <Rocket className="h-8 w-8 text-[#2563eb]" />
            <h1 className="text-3xl font-bold text-[#2563eb]">infloq</h1>
          </div>
          <h2 className="text-2xl font-bold text-gray-900">
            Welcome to Your Creator Journey
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Complete your profile and connect your social accounts to unlock
            your full potential. Join thousands of creators already amplifying
            their reach with infloq.
          </p>
        </div>

        {/* Progress Bar */}
        <div className="relative pt-1">
          <div className="flex items-center justify-between mb-2">
            <div>
              <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-[#2563eb] bg-blue-100">
                Progress
              </span>
            </div>
            <div className="text-right">
              <span className="text-xs font-semibold inline-block text-[#2563eb]">
                {progress}%
              </span>
            </div>
          </div>
          <div className="overflow-hidden h-2 mb-4 text-xs flex rounded-full bg-blue-100">
            <div
              className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-[#2563eb] transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Info Alert */}
        <Alert className="border-[#2563eb] bg-blue-50">
          <AlertCircle className="h-4 w-4 text-[#2563eb]" />
          <AlertDescription className="text-[#2563eb]">
            Brands are 3x more likely to collaborate with creators who have
            verified social accounts
          </AlertDescription>
        </Alert>

        {/* Basic Information Form */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
          <h2 className="text-xl font-semibold mb-6 text-gray-900">
            Tell Us About Yourself
          </h2>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Creator Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#2563eb] focus:border-transparent transition duration-200"
                placeholder="How should brands know you?"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Bio
              </label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#2563eb] focus:border-transparent transition duration-200"
                placeholder="Share your story and what makes your content unique..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Content Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#2563eb] focus:border-transparent transition duration-200"
              >
                <option value="">Select your primary content category</option>
                <option value="Tech">Tech</option>
                <option value="Fashion">Fashion</option>
                <option value="Beauty">Beauty</option>
                <option value="Lifestyle">Lifestyle</option>
                <option value="Gaming">Gaming</option>
                <option value="Education">Education</option>
              </select>
            </div>
          </div>
        </div>

        {/* Social Connections */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
          <h2 className="text-xl font-semibold mb-6 text-gray-900">
            Amplify Your Reach
          </h2>
          <div className="space-y-4">
            {/* YouTube */}
            <div className="flex items-center justify-between p-6 border border-gray-100 rounded-xl hover:border-[#2563eb] transition-colors duration-200">
              <div className="flex items-center space-x-4">
                <div className="bg-red-50 p-3 rounded-lg">
                  <Youtube className="h-6 w-6 text-red-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">YouTube</h3>
                  <p className="text-sm text-gray-500">
                    Share your video content
                  </p>
                </div>
              </div>
              {connectedAccounts.youtube ? (
                <div className="flex items-center text-green-600">
                  <CheckCircle2 className="h-5 w-5 mr-2" />
                  <span className="text-sm font-medium">Connected</span>
                </div>
              ) : (
                <button
                  onClick={() => connectSocialAccount("youtube")}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-200"
                >
                  Connect
                </button>
              )}
            </div>

            {/* Instagram */}
            <div className="flex items-center justify-between p-6 border border-gray-100 rounded-xl hover:border-[#2563eb] transition-colors duration-200">
              <div className="flex items-center space-x-4">
                <div className="bg-pink-50 p-3 rounded-lg">
                  <Instagram className="h-6 w-6 text-pink-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Instagram</h3>
                  <p className="text-sm text-gray-500">
                    Connect your Instagram presence
                  </p>
                </div>
              </div>
              {connectedAccounts.instagram ? (
                <div className="flex items-center text-green-600">
                  <CheckCircle2 className="h-5 w-5 mr-2" />
                  <span className="text-sm font-medium">Connected</span>
                </div>
              ) : (
                <button
                  onClick={() => connectSocialAccount("instagram")}
                  className="px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-lg hover:from-pink-600 hover:to-purple-600 transition duration-200"
                >
                  Connect
                </button>
              )}
            </div>

            {/* LinkedIn */}
            <div className="flex items-center justify-between p-6 border border-gray-100 rounded-xl hover:border-[#2563eb] transition-colors duration-200">
              <div className="flex items-center space-x-4">
                <div className="bg-blue-50 p-3 rounded-lg">
                  <Linkedin className="h-6 w-6 text-[#2563eb]" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">LinkedIn</h3>
                  <p className="text-sm text-gray-500">
                    Expand your professional network
                  </p>
                </div>
              </div>
              {connectedAccounts.linkedin ? (
                <div className="flex items-center text-green-600">
                  <CheckCircle2 className="h-5 w-5 mr-2" />
                  <span className="text-sm font-medium">Connected</span>
                </div>
              ) : (
                <button
                  onClick={() => connectSocialAccount("linkedin")}
                  className="px-4 py-2 bg-[#2563eb] text-white rounded-lg hover:bg-blue-700 transition duration-200"
                >
                  Connect
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button
          className={`w-full py-4 rounded-xl text-white font-medium transition duration-200 ${
            progress === 100
              ? "bg-[#2563eb] hover:bg-blue-700"
              : "bg-gray-300 cursor-not-allowed"
          }`}
          disabled={progress !== 100}
        >
          {progress === 100
            ? "Launch Your Creator Profile"
            : "Complete All Steps to Continue"}
        </button>

        {/* Footer Text */}
        <p className="text-center text-sm text-gray-500 pt-4">
          Join thousands of creators already growing their audience and brand
          partnerships with infloq
        </p>
      </div>
    </div>
  );
};

export default InfluencerOnboarding;
