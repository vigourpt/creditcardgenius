import { collection, doc, setDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { blogCategories } from '../data/blogCategories';
import { blogPosts } from '../data/blogPosts';

async function populateFirebase() {
  try {
    // Add categories
    console.log('Adding categories...');
    for (const category of blogCategories) {
      await setDoc(doc(collection(db, 'blog_categories'), category.id), category);
    }

    // Add blog posts
    console.log('Adding blog posts...');
    for (const post of blogPosts) {
      await setDoc(doc(collection(db, 'blog_posts'), post.id), {
        ...post,
        date: new Date(post.date).toISOString()
      });
    }

    console.log('Firebase population completed successfully!');
  } catch (error) {
    console.error('Error populating Firebase:', error);
    throw error;
  }
}

// Execute the population
populateFirebase()
  .then(() => {
    console.log('Data population completed');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Failed to populate data:', error);
    process.exit(1);
  });