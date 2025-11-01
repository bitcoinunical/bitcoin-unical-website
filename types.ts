
export interface ResearchPaper {
  id: string;
  title: string;
  authors: string[];
  summary: string;
  publicationDate: string;
  category: 'Economics' | 'Mining' | 'Policy' | 'Energy' | 'Technology';
  fileUrl?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  author: string;
  date: string;
  category: string;
  imageUrl?: string;
  excerpt: string;
}

export interface Event {
  id: string;
  title: string;
  date: string;
  venue: string;
  type: 'upcoming' | 'past';
  imageUrl?: string;
  youtubeUrl?: string;
}

export interface Partner {
  id: string;
  name: string;
  logoUrl?: string;
  role: string;
  url: string;
  logoBg?: 'dark';
}

export interface Course {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
}

export interface Book {
  id: string;
  title: string;
  author: string;
  imageUrl?: string;
  description: string;
  link: string;
}