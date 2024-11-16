export interface BlogCategory {
  id: string;
  name: string;
  description: string;
  slug: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  categoryId: string;
  excerpt: string;
  content: string;
  author: {
    name: string;
    avatar?: string;
    bio?: string;
  };
  date: string;
  readTime: string;
  image: string;
  tags: string[];
  metadata: {
    title: string;
    description: string;
    keywords: string;
  };
  relatedArticles?: string[];
  featured?: boolean;
}