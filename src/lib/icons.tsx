import type { LucideIcon } from "lucide-react";
import {
  Activity,
  Award,
  BookOpen,
  Compass,
  Flame,
  Lock,
  Moon,
  Sun,
  Target,
  Zap,
} from "lucide-react";

const habitIconMap: Record<string, LucideIcon> = {
  sun: Sun,
  target: Target,
  pulse: Activity,
  moon: Moon,
};

export function HabitStreakIcon({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const Icon = habitIconMap[name] ?? Sun;
  return <Icon className={className} strokeWidth={1.75} aria-hidden />;
}

const achievementIconMap: Record<string, LucideIcon> = {
  laser: Zap,
  streak: Flame,
  north: Compass,
  reflective: BookOpen,
};

export function AchievementIcon({
  icon,
  unlocked,
  className,
}: {
  icon: string;
  unlocked: boolean;
  className?: string;
}) {
  if (!unlocked) {
    return <Lock className={className} strokeWidth={1.75} aria-hidden />;
  }
  const Icon = achievementIconMap[icon] ?? Award;
  return <Icon className={className} strokeWidth={1.75} aria-hidden />;
}
