import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Tag, User } from 'lucide-react';
import { BlogPost } from '../types/blog';
import { blogCategories } from '../data/blogCategories';
import { useAuth } from '../contexts/AuthContext';
import AdminBlogControls from './AdminBlogControls';

interface BlogCardProps {
  post: BlogPost;
  onUpdate?: () => void;
}

export default function BlogCard({ post, onUpdate }: BlogCardProps) {
  const { isAdmin } = useAuth();
  const category = blogCategories.find(cat => cat.id === post.categoryId);

  return (
    <article className="flex flex-col bg-white rounded-lg shadow-lg overflow-hidden transition-shadow duration-300 hover:shadow-xl">
      {/* Image Section */}
      <Link to={`/blog/${post.slug}`} className="block relative overflow-hidden group">
        <img
          src={post.image}
          alt={post.title}
          className="h-48 w-full object-cover transform transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black bg-opacity-10 group-hover:bg-opacity-20 transition-opacity duration-300" />
      </Link>

      {/* Content Section */}
      <div className="flex-1 p-6">
        {/* Category */}
        <div className="flex items-center justify-between mb-2">
          <Link 
            to={`/blog?category=${category?.id}`}
            className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
          >
            {category?.name || 'Uncategorized'}
          </Link>
          {isAdmin && <AdminBlogControls post={post} onEdit={onUpdate} />}
        </div>

        {/* Title and Excerpt */}
        <Link to={`/blog/${post.slug}`} className="block group">
          <h3 className="text-xl font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors duration-200 line-clamp-2 mb-2">
            {post.title}
          </h3>
          <p className="text-gray-500 line-clamp-3 mb-4">
            {post.excerpt}
          </p>
        </Link>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.slice(0, 3).map(tag => (
            <Link
              key={tag}
              to={`/blog?tag=${encodeURIComponent(tag)}`}
              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 hover:bg-indigo-200"
            >
              <Tag className="h-3 w-3 mr-1" />
              {tag}
            </Link>
          ))}
        </div>

        {/* Author and Date */}
        <div className="flex items-center justify-between mt-auto pt-4 border-t">
          <div className="flex items-center">
            {post.author.avatar ? (
              <img
                src={post.author.avatar}
                alt={post.author.name}
                className="h-8 w-8 rounded-full"
              />
            ) : (
              <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center">
                <User className="h-4 w-4 text-indigo-600" />
              </div>
            )}
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">{post.author.name}</p>
            </div>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <Clock className="h-4 w-4 mr-1" />
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
              })}
            </time>
          </div>
        </div>
      </div>

      {/* Read More Link */}
      <div className="px-6 py-4 bg-gray-50">
        <Link
          to={`/blog/${post.slug}`}
          className="inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-500"
        >
          Read full article
          <span className="ml-2">→</span>
        </Link>
      </div>
    </article>
  );
}