import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { useAuth } from '../contexts/AuthContext';
import { doc, updateDoc, addDoc, collection } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { BlogPost } from '../types/blog';
import { Save, X } from 'lucide-react';

interface BlogEditorProps {
  post?: BlogPost;
  onSave?: () => void;
  onCancel?: () => void;
}

export default function BlogEditor({ post, onSave, onCancel }: BlogEditorProps) {
  const { isAdmin } = useAuth();
  const [title, setTitle] = useState(post?.title || '');
  const [content, setContent] = useState(post?.content || '');
  const [excerpt, setExcerpt] = useState(post?.excerpt || '');
  const [previewMode, setPreviewMode] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isAdmin) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">You must be an admin to edit blog posts.</p>
      </div>
    );
  }

  const handleSave = async () => {
    if (!title || !content) {
      setError('Title and content are required');
      return;
    }

    setSaving(true);
    setError(null);

    try {
      if (post) {
        // Update existing post
        await updateDoc(doc(db, 'blog_posts', post.id), {
          title,
          content,
          excerpt,
          updatedAt: new Date().toISOString()
        });
      } else {
        // Create new post
        const slug = title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, '');

        await addDoc(collection(db, 'blog_posts'), {
          title,
          content,
          excerpt,
          slug,
          date: new Date().toISOString(),
          author: {
            name: 'Admin',
            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&h=150&q=80'
          },
          readTime: '5 min read',
          tags: [],
          categoryId: 'uncategorized'
        });
      }

      if (onSave) onSave();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save post');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">
          {post ? 'Edit Post' : 'Create New Post'}
        </h2>
        <div className="flex space-x-4">
          <button
            onClick={() => setPreviewMode(!previewMode)}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            {previewMode ? 'Edit' : 'Preview'}
          </button>
          <button
            onClick={onCancel}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700"
          >
            <X className="h-4 w-4 mr-2" />
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50"
          >
            <Save className="h-4 w-4 mr-2" />
            {saving ? 'Saving...' : 'Save'}
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      {previewMode ? (
        <div className="prose prose-lg max-w-none">
          <h1>{title}</h1>
          <p className="text-gray-500 italic">{excerpt}</p>
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>
      ) : (
        <div className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700">
              Excerpt
            </label>
            <textarea
              id="excerpt"
              rows={3}
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-700">
              Content (Markdown)
            </label>
            <textarea
              id="content"
              rows={20}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm font-mono"
            />
          </div>
        </div>
      )}
    </div>
  );
}