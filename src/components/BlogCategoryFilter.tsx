import React from 'react';
import { blogCategories } from '../data/blogCategories';

interface BlogCategoryFilterProps {
  selectedCategory: string;
  onChange: (category: string) => void;
}

export default function BlogCategoryFilter({ selectedCategory, onChange }: BlogCategoryFilterProps) {
  return (
    <select
      value={selectedCategory}
      onChange={(e) => onChange(e.target.value)}
      className="block w-full rounded-lg border border-gray-300 bg-white py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
    >
      <option value="">All Categories</option>
      {blogCategories.map((category) => (
        <option key={category.id} value={category.id}>
          {category.name}
        </option>
      ))}
    </select>
  );
}