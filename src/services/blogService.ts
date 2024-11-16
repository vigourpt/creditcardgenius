import { collection, query, where, orderBy, limit, getDocs, doc, getDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { BlogPost, BlogCategory } from '../types/blog';

export async function getBlogPosts(options: {
  categoryId?: string;
  tag?: string;
  featured?: boolean;
  limit?: number;
  search?: string;
}) {
  try {
    let q = collection(db, 'blog_posts');
    const constraints = [];

    if (options.categoryId) {
      constraints.push(where('categoryId', '==', options.categoryId));
    }

    if (options.tag) {
      constraints.push(where('tags', 'array-contains', options.tag));
    }

    if (options.featured) {
      constraints.push(where('featured', '==', true));
    }

    constraints.push(orderBy('date', 'desc'));

    if (options.limit) {
      constraints.push(limit(options.limit));
    }

    q = query(q, ...constraints);
    const snapshot = await getDocs(q);
    
    let posts = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as BlogPost[];

    // Apply search filter if provided (client-side)
    if (options.search) {
      const searchLower = options.search.toLowerCase();
      posts = posts.filter(post => 
        post.title.toLowerCase().includes(searchLower) ||
        post.excerpt.toLowerCase().includes(searchLower) ||
        post.content.toLowerCase().includes(searchLower)
      );
    }

    return posts;
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    throw error;
  }
}

export async function getBlogPost(slug: string) {
  try {
    const q = query(
      collection(db, 'blog_posts'),
      where('slug', '==', slug),
      limit(1)
    );
    
    const snapshot = await getDocs(q);
    if (snapshot.empty) {
      return null;
    }

    const post = {
      id: snapshot.docs[0].id,
      ...snapshot.docs[0].data()
    } as BlogPost;

    // Fetch related articles if they exist
    if (post.relatedArticles && post.relatedArticles.length > 0) {
      const relatedPosts = await Promise.all(
        post.relatedArticles.map(id => getDoc(doc(db, 'blog_posts', id)))
      );
      
      post.relatedArticles = relatedPosts
        .filter(doc => doc.exists())
        .map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as any;
    }

    return post;
  } catch (error) {
    console.error('Error fetching blog post:', error);
    throw error;
  }
}

export async function getBlogCategories() {
  try {
    const snapshot = await getDocs(collection(db, 'blog_categories'));
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as BlogCategory[];
  } catch (error) {
    console.error('Error fetching blog categories:', error);
    throw error;
  }
}