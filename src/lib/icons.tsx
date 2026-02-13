import React from 'react';
import {
  Moon,
  Sun,
  Heart,
  Users,
  Activity,
  Bed,
  Wind,
  Brain,
  Stethoscope,
  AlertCircle,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Printer,
  RotateCcw,
  Zap,
} from 'lucide-react';

export const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  // Секції анкети
  moon: Moon,
  sun: Sun,
  heart: Heart,
  users: Users,
  wind: Wind,
  
  // Додаткові іконки
  activity: Activity,
  bed: Bed,
  brain: Brain,
  stethoscope: Stethoscope,
  alert: AlertCircle,
  
  // Іконки статусу
  'check-circle': CheckCircle,
  'alert-triangle': AlertTriangle,
  'x-circle': XCircle,
  
  // Іконки дій
  printer: Printer,
  rotate: RotateCcw,
  zap: Zap,
};

export const getIcon = (iconName: string, className?: string) => {
  const IconComponent = iconMap[iconName] || Activity;
  return <IconComponent className={className || 'w-6 h-6'} />;
};

export default getIcon;