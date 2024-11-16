import React from 'react';
import { Search } from 'lucide-react';

interface BlogSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export default function BlogSearch({ value, onChange }: BlogSearchProps) {
  return (
    <div className="relative flex-1 max-w-xl">
      <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
        <Search className="h-5 w-5 text-gray-400" />
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search articles..."
        className="block w-full rounded-lg border border-gray-300 bg-white pl-10 pr-3 py-2 placeholder-gray-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
      />
    </div>
  );
}