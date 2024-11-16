import React from 'react';
import { Clock, ChevronRight } from 'lucide-react';
import { BlogPost } from '../types/blog';

interface BlogListProps {
  posts: BlogPost[];
}

export default function BlogList({ posts }: BlogListProps) {
  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <article
          key={post.id}
          className="flex flex-col overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <div className="flex-shrink-0">
            <img
              className="h-48 w-full object-cover"
              src={post.image}
              alt={post.title}
            />
          </div>
          <div className="flex flex-1 flex-col justify-between bg-white p-6">
            <div className="flex-1">
              <p className="text-sm font-medium text-indigo-600">
                {post.categoryId.split('-').map(word => 
                  word.charAt(0).toUpperCase() + word.slice(1)
                ).join(' ')}
              </p>
              <div className="mt-2">
                <h3 className="text-xl font-semibold text-gray-900 line-clamp-2">
                  {post.title}
                </h3>
                <p className="mt-3 text-base text-gray-500 line-clamp-3">
                  {post.excerpt}
                </p>
              </div>
            </div>
            <div className="mt-6 flex items-center">
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
          <div className="bg-gray-50 px-6 py-4">
            <button
              onClick={() => window.location.href = `/blog/${post.slug}`}
              className="flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-500"
            >
              Read full article
              <ChevronRight className="ml-2 h-4 w-4" />
            </button>
          </div>
        </article>
      ))}
    </div>
  );
}