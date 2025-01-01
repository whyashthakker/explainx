// components/TeamMember.tsx
import { Card, CardContent } from "@repo/ui/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@repo/ui/components/ui/avatar";

type TeamMemberProps = {
  name: string;
  role: string;
  imageUrl?: string;
  gender: 'male' | 'female';
};

export function TeamMember({ name, role, imageUrl, gender }: TeamMemberProps) {
  // Generate a DiceBear URL with appropriate options
  const avatarUrl = imageUrl || 
    `https://api.dicebear.com/7.x/adventurer/svg?seed=${encodeURIComponent(name)}` +
    `&hair=${gender === 'female' ? 'long' : 'short'}` +
    `&skinColor=variant0${Math.floor(Math.random() * 3) + 1}` +
    `&backgroundColor=gray`;

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex flex-col items-center space-y-4">
          <Avatar className="h-24 w-24">
            <AvatarImage 
              src={avatarUrl}
              alt={name}
            />
            <AvatarFallback>{name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
          <div className="text-center space-y-1">
            <h3 className="font-cal text-lg font-medium">{name}</h3>
            <p className="text-sm text-muted-foreground">{role}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}