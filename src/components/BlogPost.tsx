import React from 'react';
import { Clock, Tag, ChevronRight } from 'lucide-react';
import { BlogPost as BlogPostType } from '../types/blog';

interface BlogPostProps {
  post: BlogPostType;
}

export default function BlogPost({ post }: BlogPostProps) {
  return (
    <article className="max-w-4xl mx-auto">
      <div className="mb-8">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-96 object-cover rounded-lg shadow-lg"
        />
      </div>

      <header className="mb-8">
        <div className="flex items-center space-x-2 text-sm text-gray-500 mb-4">
          <Clock className="h-4 w-4" />
          <time dateTime={post.date}>
            {new Date(post.date).toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric'
            })}
          </time>
          <span>•</span>
          <span>{post.readTime}</span>
        </div>

        <h1 className="text-4xl font-bold text-gray-900 mb-4">{post.title}</h1>
        
        <div className="flex items-center space-x-4">
          {post.author.avatar && (
            <img
              src={post.author.avatar}
              alt={post.author.name}
              className="h-12 w-12 rounded-full"
            />
          )}
          <div>
            <p className="font-medium text-gray-900">{post.author.name}</p>
            {post.author.bio && (
              <p className="text-sm text-gray-500">{post.author.bio}</p>
            )}
          </div>
        </div>
      </header>

      <div 
        className="prose prose-lg max-w-none mb-12"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      <footer>
        <div className="flex flex-wrap gap-2 mb-8">
          {post.tags.map(tag => (
            <span
              key={tag}
              className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800"
            >
              <Tag className="h-4 w-4 mr-1" />
              {tag}
            </span>
          ))}
        </div>

        {post.relatedArticles && post.relatedArticles.length > 0 && (
          <div className="border-t pt-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Articles</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {post.relatedArticles.map((related: BlogPostType) => (
                <a
                  key={related.id}
                  href={`/blog/${related.slug}`}
                  className="flex items-center space-x-4 p-4 rounded-lg border hover:bg-gray-50 transition-colors"
                >
                  <img
                    src={related.image}
                    alt={related.title}
                    className="h-20 w-20 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{related.title}</h3>
                    <p className="text-sm text-gray-500 mt-1">{related.readTime}</p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                </a>
              ))}
            </div>
          </div>
        )}
      </footer>
    </article>
  );
}