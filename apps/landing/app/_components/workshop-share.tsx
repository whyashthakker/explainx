"use client";

import { useState } from "react";
import { Button } from "@repo/ui/components/ui/button";
import { Card, CardContent } from "@repo/ui/components/ui/card";
import { Share2, MessageCircle, Twitter, Linkedin, Mail, Copy, Check, X } from "lucide-react";
import { toast } from "sonner";

interface WorkshopShareProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function WorkshopShare({ isOpen, onClose }: WorkshopShareProps) {
  const [isCopied, setIsCopied] = useState(false);
  
  const workshopUrl = typeof window !== 'undefined' ? window.location.href : 'https://www.explainx.ai/workshops/ai/prompt-engineering';
  const workshopTitle = "Free Prompt Engineering Workshop with Yash Thakker";
  const workshopDescription = "Join a 1-hour intensive workshop on AI prompting essentials. Learn proven techniques to 10x your productivity with AI. June 24, 2025 | FREE Registration";

  const handleBackgroundClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(workshopUrl);
      setIsCopied(true);
      toast.success("Link copied to clipboard!");
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      toast.error("Failed to copy link");
    }
  };

  const shareOptions = [
    {
      name: "WhatsApp",
      icon: MessageCircle,
      color: "bg-green-600 hover:bg-green-700",
      action: () => {
        const message = `🚀 ${workshopTitle}\n\n${workshopDescription}\n\nRegister free: ${workshopUrl}`;
        window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
      }
    },
    {
      name: "Twitter",
      icon: Twitter,
      color: "bg-blue-500 hover:bg-blue-600",
      action: () => {
        const tweetText = `🚀 ${workshopTitle}\n\n${workshopDescription}\n\n#AI #PromptEngineering #FreeWorkshop`;
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}&url=${encodeURIComponent(workshopUrl)}`, '_blank');
      }
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      color: "bg-blue-700 hover:bg-blue-800",
      action: () => {
        const linkedInText = `${workshopTitle} - ${workshopDescription}`;
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(workshopUrl)}&title=${encodeURIComponent(linkedInText)}`, '_blank');
      }
    },
    {
      name: "Email",
      icon: Mail,
      color: "bg-gray-600 hover:bg-gray-700",
      action: () => {
        const subject = encodeURIComponent(workshopTitle);
        const body = encodeURIComponent(`Hi!\n\nI thought you might be interested in this free workshop:\n\n${workshopTitle}\n\n${workshopDescription}\n\nRegister here: ${workshopUrl}\n\nBest regards!`);
        window.open(`mailto:?subject=${subject}&body=${body}`);
      }
    }
  ];

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={handleBackgroundClick}
    >
      <Card className="w-full max-w-md bg-gray-900 border-gray-700">
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
              <Share2 className="w-5 h-5 text-purple-400" />
              <h3 className="text-lg font-semibold text-white">Share Workshop</h3>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-gray-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          <div className="space-y-3 mb-6">
            {shareOptions.map((option) => (
              <Button
                key={option.name}
                onClick={option.action}
                className={`w-full justify-start gap-3 ${option.color} text-white`}
                size="lg"
              >
                <option.icon className="w-5 h-5" />
                Share on {option.name}
              </Button>
            ))}
          </div>

          <div className="border-t border-gray-700 pt-4">
            <p className="text-sm text-gray-400 mb-3">Or copy link:</p>
            <div className="flex gap-2">
              <input
                type="text"
                value={workshopUrl}
                readOnly
                className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded text-sm text-gray-300"
              />
              <Button
                onClick={handleCopyLink}
                size="sm"
                className="bg-purple-600 hover:bg-purple-700"
              >
                {isCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 