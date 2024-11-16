import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Edit, Plus, Trash2 } from 'lucide-react';
import { BlogPost } from '../types/blog';
import { doc, deleteDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import BlogEditor from './BlogEditor';

interface AdminBlogControlsProps {
  post?: BlogPost;
  onEdit?: () => void;
  onNew?: () => void;
  onDelete?: () => void;
}

export default function AdminBlogControls({ post, onEdit, onNew, onDelete }: AdminBlogControlsProps) {
  const { isAdmin } = useAuth();
  const [showEditor, setShowEditor] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  if (!isAdmin) {
    return null;
  }

  const handleDelete = async () => {
    if (!post || !window.confirm('Are you sure you want to delete this post?')) {
      return;
    }

    setIsDeleting(true);
    try {
      await deleteDoc(doc(db, 'blog_posts', post.id));
      if (onDelete) onDelete();
    } catch (error) {
      console.error('Error deleting post:', error);
      alert('Failed to delete post');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleEditorSave = () => {
    setShowEditor(false);
    if (onEdit) onEdit();
  };

  if (showEditor) {
    return (
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
        <div className="relative top-20 mx-auto p-8 max-w-4xl bg-white rounded-lg shadow-xl">
          <BlogEditor
            post={post}
            onSave={handleEditorSave}
            onCancel={() => setShowEditor(false)}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="flex space-x-4">
      {!post && (
        <button
          onClick={() => setShowEditor(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          New Post
        </button>
      )}

      {post && (
        <>
          <button
            onClick={() => setShowEditor(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
          >
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </button>

          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 disabled:opacity-50"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            {isDeleting ? 'Deleting...' : 'Delete'}
          </button>
        </>
      )}
    </div>
  );
}