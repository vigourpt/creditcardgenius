import React from 'react';
import { BlogPost } from '../types/blog';
import BlogCard from './BlogCard';
import AdminBlogControls from './AdminBlogControls';
import { useAuth } from '../contexts/AuthContext';

interface BlogGridProps {
  posts: BlogPost[];
  onPostUpdate?: () => void;
}

export default function BlogGrid({ posts, onPostUpdate }: BlogGridProps) {
  const { isAdmin } = useAuth();

  if (posts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No articles found matching your criteria.</p>
        {isAdmin && (
          <div className="mt-6">
            <AdminBlogControls onNew={onPostUpdate} />
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {isAdmin && (
        <div className="mb-8">
          <AdminBlogControls onNew={onPostUpdate} />
        </div>
      )}
      
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <BlogCard 
            key={post.id} 
            post={post} 
            onUpdate={onPostUpdate}
          />
        ))}
      </div>
    </div>
  );
}