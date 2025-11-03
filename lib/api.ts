
import type { ResearchPaper, BlogPost, Partner, Event, Course, Book } from '../types';

// This file simulates a backend by providing realistic placeholder data.
// This ensures the website is fully functional and visually complete without
// relying on an external API that was causing errors.

const MOCK_PARTNERS: Partner[] = [
  { id: '1', name: 'Calabar Bitcoin Club', logoUrl: 'https://via.placeholder.com/150x50/FFFFFF/0B1A2E?text=Calabar+Bitcoin', role: 'Community Partner', url: 'https://bitcoinconfederation.org/hub/calabar-bitcoin-club/' },
  { id: '2', name: 'Bitnob', logoUrl: 'https://via.placeholder.com/150x50/FFFFFF/0B1A2E?text=Bitnob', role: 'Ecosystem Partner', url: 'https://bitnob.com' },
  { id: '3', name: 'Botmecash', logoUrl: 'https://via.placeholder.com/150x50/FFFFFF/0B1A2E?text=Botmecash', role: 'Ecosystem Partner', url: 'https://botmecash.com/' },
  { id: '4', name: 'African Bitcoiners', logoUrl: 'https://via.placeholder.com/150x50/FFFFFF/0B1A2E?text=African+Bitcoiners', role: 'Community Partner', url: 'https://bitcoiners.africa/' },
  { id: '5', name: 'Nigerian Bitcoin Conference', logoUrl: 'https://via.placeholder.com/150x50/FFFFFF/0B1A2E?text=Naija+Bitcoin', role: 'Event Partner', url: 'https://naijabitcoin.org/' },
];

const MOCK_RESEARCH: ResearchPaper[] = [
  { id: '1', title: 'The Economics of Bitcoin Mining', authors: ['Sarah Johnson', 'Michael Chen'], summary: 'An in-depth analysis of the economic incentives and energy consumption of Bitcoin mining operations in emerging markets.', publicationDate: '2024-08-15', category: 'Economics', fileUrl: '#' },
  { id: '2', title: 'Layer 2 Scaling Solutions: A Comparative Study', authors: ['David Kim'], summary: 'Comparing the Lightning Network, Rollups, and Sidechains for enhancing Bitcoin\'s scalability and user experience.', publicationDate: '2024-07-22', category: 'Technology', fileUrl: '#' },
  { id: '3', title: 'Regulatory Frameworks for Digital Assets in Africa', authors: ['Amina Okoro'], summary: 'A comprehensive overview of the current and proposed regulatory landscapes for Bitcoin across key African nations.', publicationDate: '2024-06-05', category: 'Policy' },
  { id: '4', title: 'Renewable Energy Integration in Bitcoin Mining', authors: ['Tomisin Adebayo'], summary: 'Exploring the potential for Bitcoin mining to stabilize energy grids and accelerate the adoption of renewable energy sources.', publicationDate: '2024-09-01', category: 'Energy' },
];

const MOCK_BLOG: BlogPost[] = [
    { id: '1', title: 'Our First Campus Meetup: A Resounding Success!', author: 'John Doe', date: '2024-05-20', category: 'Community', excerpt: 'Last week, we held our inaugural Bitcoin Unical meetup, and the turnout was incredible! Students from all departments came to learn about the basics of Bitcoin...', imageUrl: 'https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=2832&auto=format&fit=crop' },
    { id: '2', title: 'Understanding Ordinals and Inscriptions on Bitcoin', author: 'Jane Smith', date: '2024-04-12', category: 'Technical', excerpt: 'The Bitcoin world has been buzzing with the emergence of Ordinals. In this post, we break down what they are, how they work, and what they mean for the future...', imageUrl: 'https://images.unsplash.com/photo-1642104792224-38b7d4435941?q=80&w=2832&auto=format&fit=crop' },
    { id: '3', title: 'Why African Students Should Care About Bitcoin', author: 'Buchi Emmanuel', date: '2024-03-25', category: 'Adoption', excerpt: 'In a continent with unique economic challenges and incredible potential, Bitcoin offers more than just an investment. It\'s a tool for financial sovereignty...', imageUrl: 'https://images.unsplash.com/photo-1518458028785-8fbcd101ebb9?q=80&w=2940&auto=format&fit=crop' },
];

const MOCK_EVENTS: Event[] = [
    { id: '1', title: 'Bitcoin Basics Bootcamp', date: 'October 12, 2024', venue: 'ETF Hall, University of Calabar', type: 'upcoming', imageUrl: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2832&auto=format&fit=crop' },
    { id: '2', title: 'Introduction to the Lightning Network', date: 'August 28, 2024', venue: 'Online Webinar', type: 'upcoming', imageUrl: 'https://images.unsplash.com/photo-1640562543389-4e5883883a45?q=80&w=2832&auto=format&fit=crop' },
    { id: '3', title: 'Inaugural Campus Meetup', date: 'May 15, 2024', venue: 'CES Auditorium', type: 'past', imageUrl: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=2940&auto=format&fit=crop', youtubeUrl: 'https://www.youtube.com' },
];

const MOCK_COURSES: Course[] = [
    {id: '1', title: 'Bitcoin for Beginners', description: 'Understand the fundamentals of Bitcoin, from wallets to transactions.', level: 'Beginner', imageUrl: 'https://images.unsplash.com/photo-1621417010379-2b0b14c33c2e?q=80&w=2832&auto=format&fit=crop' },
    {id: '2', title: 'Mastering the Lightning Network', description: 'Learn how to use Bitcoin\'s Layer 2 for fast, cheap payments.', level: 'Intermediate', imageUrl: 'https://images.unsplash.com/photo-1640562543389-4e5883883a45?q=80&w=2832&auto=format&fit=crop' },
    {id: '3', title: 'Advanced Bitcoin Security', description: 'Explore multi-sig, hardware wallets, and best practices for securing your coins.', level: 'Advanced', imageUrl: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=2940&auto=format&fit=crop' },
];

const NOTION_BOOK_LINK = 'https://www.notion.so/29d68fd0ae76802192c4ec72b1d025ad?v=29d68fd0ae768055a2a1000c69f0cc68&source=copy_link';

const MOCK_BOOKS: Book[] = [
    {id: '1', title: 'The Bitcoin Standard', author: 'Saifedean Ammous', description: '', link: NOTION_BOOK_LINK, imageUrl: 'https://m.media-amazon.com/images/I/81dG5b3O3tL._SL1500_.jpg'},
    {id: '2', title: 'Mastering Bitcoin', author: 'Andreas M. Antonopoulos', description: '', link: NOTION_BOOK_LINK, imageUrl: 'https://m.media-amazon.com/images/I/81V223n3sJL._SL1500_.jpg'},
    {id: '3', title: 'The Bullish Case for Bitcoin', author: 'Vijay Boyapati', description: '', link: NOTION_BOOK_LINK, imageUrl: 'https://m.media-amazon.com/images/I/71-6k5252bL._SL1500_.jpg'},
    {id: '4', title: 'Inventing Bitcoin', author: 'Yan Pritzker', description: '', link: NOTION_BOOK_LINK, imageUrl: 'https://m.media-amazon.com/images/I/61tT0953BUL._SL1500_.jpg'},
    {id: '5', title: 'Layered Money', author: 'Nik Bhatia', description: '', link: NOTION_BOOK_LINK, imageUrl: 'https://m.media-amazon.com/images/I/71+6+Y7g0gL._SL1500_.jpg'},
    {id: '6', title: 'The Little Bitcoin Book', author: 'Tymon S. & various', description: '', link: NOTION_BOOK_LINK, imageUrl: 'https://m.media-amazon.com/images/I/81a4M2AYI5L._SL1500_.jpg'},
    {id: '7', title: '21 Lessons', author: 'Gigi', description: '', link: NOTION_BOOK_LINK, imageUrl: 'https://m.media-amazon.com/images/I/71Bw2q4+l1L._SL1500_.jpg'},
    {id: '8', title: 'The Fiat Standard', author: 'Saifedean Ammous', description: '', link: NOTION_BOOK_LINK, imageUrl: 'https://m.media-amazon.com/images/I/81B9t16yVFL._SL1500_.jpg'},
    {id: '9', title: 'Broken Money', author: 'Lyn Alden', description: '', link: NOTION_BOOK_LINK, imageUrl: 'https://m.media-amazon.com/images/I/71g3nZe2+uL._SL1500_.jpg'},
    {id: '10', title: 'Check Your Financial Privilege', author: 'Alex Gladstein', description: '', link: NOTION_BOOK_LINK, imageUrl: 'https://m.media-amazon.com/images/I/71oO13a7cbL._SL1500_.jpg'},
    {id: '11', title: 'The Internet of Money', author: 'Andreas M. Antonopoulos', description: '', link: NOTION_BOOK_LINK, imageUrl: 'https://m.media-amazon.com/images/I/71Gpbi8g62L._SL1500_.jpg'},
    {id: '12', title: 'Why Buy Bitcoin', author: 'Andy Edstrom', description: '', link: NOTION_BOOK_LINK, imageUrl: 'https://m.media-amazon.com/images/I/61s0pU7iF5L._SL1500_.jpg'},
];


const MOCK_SITE_CONTENT: { [key: string]: any } = {
    project: {
        mainImage: 'https://images.unsplash.com/photo-1605792657660-596af9009e82?q=80&w=2940&auto=format&fit=crop'
    }
}


const apiDelay = (ms: number) => new Promise(res => setTimeout(res, ms));

// --- MOCKED API Fetching Functions ---

export const fetchResearchPapers = async (): Promise<ResearchPaper[]> => {
  await apiDelay(500);
  return MOCK_RESEARCH;
};

export const fetchBlogPosts = async (): Promise<BlogPost[]> => {
  await apiDelay(500);
  return MOCK_BLOG;
};

export const fetchPartners = async (): Promise<Partner[]> => {
  await apiDelay(300);
  return MOCK_PARTNERS;
};

export const fetchEvents = async (): Promise<Event[]> => {
  await apiDelay(500);
  return MOCK_EVENTS;
};

export const fetchCourses = async (): Promise<Course[]> => {
    await apiDelay(400);
    return MOCK_COURSES;
};

export const fetchBooks = async (): Promise<Book[]> => {
    await apiDelay(400);
    return MOCK_BOOKS;
};

export const fetchSiteContent = async (pageName: 'project'): Promise<any> => {
    await apiDelay(600);
    return MOCK_SITE_CONTENT[pageName];
};

/**
 * Simulates submitting form data. Always returns a success message.
 * @param formType A string identifying the form (e.g., 'contact', 'newsletter').
 * @param data The form data object.
 * @returns An object with success status and a message.
 */
export const submitFormData = async (formType: string, data: any): Promise<{ success: boolean; message: string }> => {
  console.log(`Simulating submission for '${formType}' form with data:`, data);
  await apiDelay(800);
  
  if (formType === 'research') {
      return { success: true, message: 'Thank you for your submission!' };
  }
  
  // For other forms that don't have a dedicated success UI
  if (data.email?.toString().includes('fail')) {
    return { success: false, message: 'This is a simulated error.' };
  }
  
  return { success: true, message: 'Your message has been sent successfully!' };
};