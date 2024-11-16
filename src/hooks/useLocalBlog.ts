import { useState, useEffect, useMemo } from 'react';
import { BlogPost, BlogCategory } from '../types/blog';
import { blogPosts } from '../data/blogPosts';
import { blogCategories } from '../data/blogCategories';

export function useLocalBlog(categoryId: string | null = null, searchQuery: string = '', postLimit: number = 10) {
  const [loading, setLoading] = useState(true);

  const filteredPosts = useMemo(() => {
    let filtered = [...blogPosts];

    if (categoryId) {
      filtered = filtered.filter(post => post.categoryId === categoryId);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query) ||
        post.content.toLowerCase().includes(query)
      );
    }

    return filtered.slice(0, postLimit);
  }, [categoryId, searchQuery, postLimit]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return { posts: filteredPosts, loading };
}

export function useLocalCategories() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return { categories: blogCategories, loading };
}