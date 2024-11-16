import React from 'react';
import { Clock } from 'lucide-react';
import { BlogPost } from '../types/blog';
import { Link } from 'react-router-dom';
import { blogCategories } from '../data/blogCategories';

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  const category = blogCategories.find(cat => cat.id === post.categoryId);

  return (
    <article className="flex flex-col overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 bg-white">
      <Link to={`/blog/${post.slug}`} className="flex-shrink-0">
        <img
          className="h-48 w-full object-cover"
          src={post.image}
          alt={post.title}
        />
      </Link>
      <div className="flex flex-1 flex-col justify-between p-6">
        <div className="flex-1">
          <p className="text-sm font-medium text-indigo-600">
            {category?.name}
          </p>
          <Link to={`/blog/${post.slug}`} className="block mt-2">
            <h3 className="text-xl font-semibold text-gray-900 hover:text-indigo-600 line-clamp-2">
              {post.title}
            </h3>
            <p className="mt-3 text-base text-gray-500 line-clamp-3">
              {post.excerpt}
            </p>
          </Link>
        </div>
        <div className="mt-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <img
                className="h-10 w-10 rounded-full"
                src={post.author.avatar}
                alt={post.author.name}
              />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">
                {post.author.name}
              </p>
              <div className="flex space-x-1 text-sm text-gray-500">
                <time dateTime={post.date}>
                  {new Date(post.date).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </time>
                <span aria-hidden="true">&middot;</span>
                <span>{post.readTime}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gray-50 px-6 py-4">
        <Link
          to={`/blog/${post.slug}`}
          className="flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-500"
        >
          Read full article
          <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </article>
  );
}