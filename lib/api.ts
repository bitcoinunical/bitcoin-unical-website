import type { ResearchPaper, BlogPost, Partner, Event, Course, Book } from '../types';

// --- MOCK DATA ---
// This data is used as a placeholder to make the site functional without a live backend.
// It allows for development and demonstration even when the Vercel serverless functions are not yet configured.

const mockPartners: Partner[] = [
  { id: '1', name: 'Chaincode Labs', logoUrl: 'https://i.imgur.com/vBw2GzL.png', role: 'Ecosystem Partner', url: '#', logoBg: 'dark' },
  { id: '2', name: 'Brink', logoUrl: 'https://i.imgur.com/sS4f4d5.png', role: 'Grant Provider', url: '#' },
  { id: '3', name: 'Spiral', logoUrl: 'https://i.imgur.com/iIM52fU.png', role: 'Development Grant', url: '#', logoBg: 'dark' },
  { id: '4', name: 'Human Rights Foundation', logoUrl: 'https://i.imgur.com/G3fB8QG.png', role: 'Bitcoin Development Fund', url: '#', logoBg: 'dark' },
  { id: '5', name: 'OpenSats', logoUrl: 'https://i.imgur.com/kAUvsQ8.png', role: 'FOSS Supporter', url: '#' },
  { id: '6', name: 'Blockstream', logoUrl: 'https://i.imgur.com/s6z4d8d.png', role: 'Infrastructure Partner', url: '#', logoBg: 'dark'},
];

const mockResearch: ResearchPaper[] = [
  { id: '1', title: 'The Economics of Bitcoin Mining', authors: ['Dr. Adam Smith'], summary: 'An in-depth analysis of the economic incentives and game theory behind Bitcoin\'s proof-of-work algorithm.', publicationDate: '2025-08-15', category: 'Economics' },
  { id: '2', title: 'Layer 2 Scaling Solutions: A Comparative Study', authors: ['Jane Doe', 'John Crypto'], summary: 'Comparing the Lightning Network, Rollups, and other Layer 2 technologies for scaling Bitcoin.', publicationDate: '2025-07-22', category: 'Technology' },
  { id: '3', title: 'Regulatory Landscape for Digital Assets in Africa', authors: ['Ngozi Okonjo'], summary: 'A comprehensive overview of the current and future regulatory policies affecting Bitcoin adoption across the continent.', publicationDate: '2025-06-30', category: 'Policy' },
];

const mockBlogPosts: BlogPost[] = [
    { id: '1', title: 'Understanding Bitcoin Halving and Its Impact', author: 'Community Member', date: '2025-09-01', category: 'Education', excerpt: 'Every four years, the Bitcoin block reward is cut in half. We explore what this means for miners, investors, and the network.', imageUrl: 'https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=2832&auto=format&fit=crop' },
    { id: '2', title: 'Our First Campus Meetup: A Resounding Success!', author: 'Event Coordinator', date: '2025-08-20', category: 'Community', excerpt: 'A recap of our inaugural campus event, featuring guest speakers, workshops, and a growing community of Bitcoin enthusiasts.', imageUrl: 'https://images.unsplash.com/photo-1517486808906-6538cb3b8656?q=80&w=2940&auto=format&fit=crop' },
    { id: '3', title: 'The Antminer Project: Our Journey into Proof-of-Work', author: 'Project Lead', date: '2025-07-10', category: 'Projects', excerpt: 'An update on our flagship project, detailing our progress in setting up a student-run Bitcoin mining operation.', imageUrl: 'https://images.unsplash.com/photo-1621602112459-a5e89f8c8a14?q=80&w=2864&auto=format&fit=crop' },
];

const mockEvents: Event[] = [
    { id: '1', title: 'Bitcoin for Beginners Workshop', date: 'October 25, 2025', venue: 'Online / Zoom', type: 'upcoming', imageUrl: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=2940&auto=format&fit=crop' },
    { id: '2', title: 'Advanced Lightning Network Bootcamp', date: 'November 15, 2025', venue: 'Tech Hub, UNICAL', type: 'upcoming', imageUrl: 'https://images.unsplash.com/photo-1556761175-b413da4b256f?q=80&w=2874&auto=format&fit=crop' },
    { id: '3', title: 'Inaugural Campus Meetup', date: 'May 10, 2025', venue: 'Main Auditorium, UNICAL', type: 'past', imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2940&auto=format&fit=crop', youtubeUrl: 'https://www.youtube.com' },
];

const mockCourses: Course[] = [
    { id: '1', title: 'Bitcoin 101: The Basics', description: 'Learn the fundamentals of Bitcoin, from wallets to transactions.', level: 'Beginner', imageUrl: 'https://images.unsplash.com/photo-1526378722484-bd91ca387e72?q=80&w=2868&auto=format&fit=crop' },
    { id: '2', title: 'Mastering the Lightning Network', description: 'An in-depth course on Bitcoin\'s Layer 2 scaling solution.', level: 'Intermediate', imageUrl: 'https://images.unsplash.com/photo-1642104790135-0151b659c479?q=80&w=2832&auto=format&fit=crop' },
    { id: '3', title: 'Advanced Cryptography & Security', description: 'Explore the cryptographic principles that secure the Bitcoin network.', level: 'Advanced', imageUrl: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?q=80&w=2940&auto=format&fit=crop' },
];

const mockBooks: Book[] = [
    { id: '1', title: 'The Bitcoin Standard', author: 'Saifedean Ammous', imageUrl: 'https://i.imgur.com/7gK2QyY.jpg', description: '', link: '#' },
    { id: '2', title: 'Mastering Bitcoin', author: 'Andreas M. Antonopoulos', imageUrl: 'https://i.imgur.com/6X3oPQv.jpg', description: '', link: '#' },
    { id: '3', title: 'Layered Money', author: 'Nik Bhatia', imageUrl: 'https://i.imgur.com/c6sB3a2.jpg', description: '', link: '#' },
    { id: '4', title: 'The Sovereign Individual', author: 'James Dale Davidson', imageUrl: 'https://i.imgur.com/sC5qV4f.jpg', description: '', link: '#' },
];

const mockSiteContent: Record<string, any> = {
  about: {
    imageGallery: [
      'https://images.unsplash.com/photo-1560439538-5f1f4a135a1a?w=800',
      'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800',
      'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800',
      'https://images.unsplash.com/photo-1579226935182-8c439132a2f8?w=800',
      'https://images.unsplash.com/photo-1562624324-3694332b7193?w=800',
      'https://images.unsplash.com/photo-1543269865-cbf427effbad?w=800',
    ]
  },
  project: {
    mainImage: 'https://images.unsplash.com/photo-1622327583833-a3c03b306e0e?w=800'
  }
};


// A helper to simulate network delay
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// --- Mock API Fetching Functions ---

export const fetchResearchPapers = async (): Promise<ResearchPaper[]> => {
  console.log("MOCK: Fetching research papers...");
  await sleep(500);
  return mockResearch;
};

export const fetchBlogPosts = async (): Promise<BlogPost[]> => {
  console.log("MOCK: Fetching blog posts...");
  await sleep(500);
  return mockBlogPosts;
};

export const fetchPartners = async (): Promise<Partner[]> => {
  console.log("MOCK: Fetching partners...");
  await sleep(500);
  return mockPartners;
};

export const fetchEvents = async (): Promise<Event[]> => {
  console.log("MOCK: Fetching events...");
  await sleep(500);
  return mockEvents;
};

export const fetchCourses = async (): Promise<Course[]> => {
  console.log("MOCK: Fetching courses...");
  await sleep(500);
  return mockCourses;
};

export const fetchBooks = async (): Promise<Book[]> => {
  console.log("MOCK: Fetching books...");
  await sleep(500);
  return mockBooks;
};

export const fetchSiteContent = async (pageName: 'about' | 'project'): Promise<any> => {
  console.log(`MOCK: Fetching site content for ${pageName}...`);
  await sleep(500);
  return mockSiteContent[pageName] || null;
};

export const submitFormData = async (formType: string, data: any): Promise<{ success: boolean; message: string }> => {
  console.log(`MOCK: Submitting form for ${formType} with data:`, data);
  await sleep(1000);
  
  // Simulate different success messages
  const messages: { [key: string]: string } = {
    contact: "Thank you for your message! We'll get back to you soon.",
    partnership: "Thank you for your inquiry! Our team will review it and be in touch.",
    research: "Your research has been submitted for review. Thank you!",
    newsletter: "Success! You've been subscribed to our newsletter."
  };
  
  return { success: true, message: messages[formType] || 'Submission successful!' };
};
