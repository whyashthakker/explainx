import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@repo/ui/components/ui/dialog";
import { Input } from "@repo/ui/components/ui/input";
import { Textarea } from "@repo/ui/components/ui/textarea"; // @/components/ui/textarea
import { Button } from "@repo/ui/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/ui/components/ui/select";
import { Label } from "@repo/ui/components/ui/label";
import { Loader2 } from "lucide-react";

interface Influencer {
  name: string;
  bio?: string | null;
  category: string;
  avatar?: string | null;
}

interface EditProfileModalProps {
  open: boolean;
  onClose: () => void;
  influencer?: Influencer | null;
  onSave: (data: FormData) => Promise<void>;
}

interface FormData {
  name: string;
  bio: string;
  category: string;
  avatar: string;
}

interface FormErrors {
  name?: string;
  category?: string;
}

const defaultFormData: FormData = {
  name: "",
  bio: "",
  category: "",
  avatar: "",
};

const EditProfileModal: React.FC<EditProfileModalProps> = ({
  open,
  onClose,
  influencer,
  onSave,
}) => {
  const [formData, setFormData] = useState<FormData>(() => ({
    name: influencer?.name ?? defaultFormData.name,
    bio: influencer?.bio ?? defaultFormData.bio,
    category: influencer?.category ?? defaultFormData.category,
    avatar: influencer?.avatar ?? defaultFormData.avatar,
  }));

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.category) {
      newErrors.category = "Category is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm() || isSubmitting) {
      return;
    }

    setIsSubmitting(true);

    try {
      await onSave(formData);
      onClose();
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCategoryChange = (value: string) => {
    handleInputChange({
      target: {
        name: "category",
        value,
      },
    } as React.ChangeEvent<HTMLInputElement>);
  };

  return (
    <Dialog open={open} onOpenChange={isSubmitting ? undefined : onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription>Update your profile information</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name" className={errors.name ? "text-red-500" : ""}>
              Name
            </Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Your name"
              className={errors.name ? "border-red-500" : ""}
              disabled={isSubmitting}
            />
            {errors.name && (
              <span className="text-sm text-red-500">{errors.name}</span>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              name="bio"
              value={formData.bio}
              onChange={handleInputChange}
              placeholder="Tell us about yourself"
              className="h-32"
              disabled={isSubmitting}
            />
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="category"
              className={errors.category ? "text-red-500" : ""}
            >
              Category
            </Label>
            <Select
              value={formData.category}
              onValueChange={handleCategoryChange}
              disabled={isSubmitting}
            >
              <SelectTrigger
                id="category"
                className={errors.category ? "border-red-500" : ""}
              >
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="LIFESTYLE">Lifestyle</SelectItem>
                <SelectItem value="TECH">Tech</SelectItem>
                <SelectItem value="FASHION">Fashion</SelectItem>
                <SelectItem value="BEAUTY">Beauty</SelectItem>
                <SelectItem value="GAMING">Gaming</SelectItem>
                <SelectItem value="FITNESS">Fitness</SelectItem>
              </SelectContent>
            </Select>
            {errors.category && (
              <span className="text-sm text-red-500">{errors.category}</span>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="avatar">Avatar URL</Label>
            <Input
              id="avatar"
              name="avatar"
              value={formData.avatar}
              onChange={handleInputChange}
              placeholder="URL to your profile picture"
              disabled={isSubmitting}
            />
          </div>

          <DialogFooter className="gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfileModal;
