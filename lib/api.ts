
import type { ResearchPaper, BlogPost, Partner, Event, Course, Book } from '../types';

// This file is the bridge between the frontend components and the backend API.
// It makes live requests to our serverless functions which are connected to Notion.

const fetchContent = async (type: string, page?: string) => {
  try {
    const query = new URLSearchParams({ type });
    if (page) {
      query.set('page', page);
    }
    const response = await fetch(`/api/get-content?${query.toString()}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Failed to fetch ${type}:`, error);
    throw error;
  }
};

export const fetchResearchPapers = (): Promise<ResearchPaper[]> => fetchContent('research');
export const fetchBlogPosts = (): Promise<BlogPost[]> => fetchContent('blog');
export const fetchPartners = (): Promise<Partner[]> => fetchContent('partners');
export const fetchEvents = (): Promise<Event[]> => fetchContent('events');
export const fetchCourses = (): Promise<Course[]> => fetchContent('courses');
export const fetchBooks = (): Promise<Book[]> => fetchContent('books');
export const fetchSiteContent = (pageName: 'about' | 'project'): Promise<any> => fetchContent('siteContent', pageName);


export const submitFormData = async (formType: string, data: any): Promise<{ success: boolean; message: string }> => {
  try {
    const response = await fetch('/api/submit-form', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ formType, data }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Submission failed.');
    }

    const result = await response.json();
    return { success: true, message: result.message || 'Submission successful! Thank you.' };

  } catch (error: any) {
    console.error(`Failed to submit ${formType} form:`, error);
    return { success: false, message: error.message || 'An unexpected error occurred.' };
  }
};
