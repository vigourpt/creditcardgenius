import React from 'react';
import { LucideIcon } from 'lucide-react';

interface CalculatorCardProps {
  icon: LucideIcon;
  title: string;
  active: boolean;
  onClick: () => void;
}

export default function CalculatorCard({ icon: Icon, title, active, onClick }: CalculatorCardProps) {
  return (
    <button
      onClick={onClick}
      className={`${
        active
          ? 'bg-gradient-to-r from-indigo-600 via-purple-600 to-yellow-500 text-white shadow-lg'
          : 'bg-white/80 backdrop-blur-sm text-gray-900 hover:bg-white/90'
      } p-6 rounded-lg shadow-sm border border-transparent transition-all duration-200 flex flex-col items-center space-y-3 w-full hover:shadow-md`}
    >
      <Icon className={`h-8 w-8 ${active ? 'text-white' : 'text-indigo-600'}`} />
      <span className="font-medium text-sm text-center">{title}</span>
    </button>
  );
}