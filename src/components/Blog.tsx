import React, { useState, useMemo } from 'react';
import { blogPosts } from '../data/blogPosts';
import { blogCategories } from '../data/blogCategories';
import BlogGrid from './BlogGrid';
import { Search } from 'lucide-react';
import BlogLayout from './BlogLayout';

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter posts based on search query and selected category
  const filteredPosts = useMemo(() => {
    let filtered = [...blogPosts];

    // Apply category filter
    if (selectedCategory) {
      filtered = filtered.filter(post => post.categoryId === selectedCategory);
    }

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query) ||
        post.content.toLowerCase().includes(query) ||
        post.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    // Sort by date, most recent first
    return filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [selectedCategory, searchQuery]);

  return (
    <BlogLayout>
      <div className="mb-8 flex justify-between items-center">
        {/* Search Input */}
        <div className="flex-1 max-w-xl">
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search articles..."
              className="block w-full rounded-lg border border-gray-300 bg-white pl-10 pr-3 py-2 placeholder-gray-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* Category Selector */}
        <div className="ml-4">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="block w-full rounded-lg border border-gray-300 bg-white py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          >
            <option value="">All Categories</option>
            {blogCategories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Display filtered posts or no results message */}
      {filteredPosts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">No articles found matching your criteria.</p>
        </div>
      ) : (
        <BlogGrid posts={filteredPosts} />
      )}
    </BlogLayout>
  );
}