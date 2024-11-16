import { useState, useEffect } from 'react';
import { collection, query, getDocs, where, orderBy, limit } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { BlogPost, BlogCategory } from '../types/blog';

export function useFirebaseBlog(categoryId: string | null = null, searchQuery: string = '', postLimit: number = 10) {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPosts() {
      try {
        setLoading(true);
        let postsQuery = query(
          collection(db, 'blog_posts'),
          orderBy('date', 'desc'),
          limit(postLimit)
        );

        if (categoryId) {
          postsQuery = query(
            collection(db, 'blog_posts'),
            where('categoryId', '==', categoryId),
            orderBy('date', 'desc'),
            limit(postLimit)
          );
        }

        const querySnapshot = await getDocs(postsQuery);
        const fetchedPosts = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as BlogPost[];

        // Apply client-side search filtering if search query exists
        const filteredPosts = searchQuery
          ? fetchedPosts.filter(post =>
              post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
              post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
            )
          : fetchedPosts;

        setPosts(filteredPosts);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred while fetching posts');
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, [categoryId, searchQuery, postLimit]);

  return { posts, loading, error };
}

export function useFirebaseCategories() {
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCategories() {
      try {
        setLoading(true);
        const querySnapshot = await getDocs(collection(db, 'blog_categories'));
        const fetchedCategories = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as BlogCategory[];
        setCategories(fetchedCategories);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred while fetching categories');
      } finally {
        setLoading(false);
      }
    }

    fetchCategories();
  }, []);

  return { categories, loading, error };
}