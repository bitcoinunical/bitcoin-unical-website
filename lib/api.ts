import type { ResearchPaper, BlogPost, Partner, Event, Course, Book } from '../types';

// --- LIVE API Fetching Functions ---
// This file now makes live calls to the serverless functions located in the /api/ directory.
// These functions are executed by Vercel's infrastructure.

/**
 * A generic helper function to fetch data from our Vercel API endpoints.
 * @param endpoint The API endpoint to call (e.g., '/api/get-content?type=research').
 * @returns The JSON response from the API.
 */
async function fetchFromApi(endpoint: string) {
  try {
    const response = await fetch(endpoint);
    if (!response.ok) {
      // Try to get a more detailed error message from the response body
      const errorBody = await response.text();
      console.error(`HTTP error! status: ${response.status}, body: ${errorBody}`);
      throw new Error(`Failed to fetch ${endpoint.split('?')[0]}: ${errorBody || 'Server returned an error'}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching from ${endpoint}:`, error);
    // Re-throw the error so the calling component can handle it
    throw error;
  }
}

export const fetchResearchPapers = async (): Promise<ResearchPaper[]> => {
  return fetchFromApi('/api/get-content?type=research');
};

export const fetchBlogPosts = async (): Promise<BlogPost[]> => {
  return fetchFromApi('/api/get-content?type=blog');
};

export const fetchPartners = async (): Promise<Partner[]> => {
  return fetchFromApi('/api/get-content?type=partners');
};

export const fetchEvents = async (): Promise<Event[]> => {
  return fetchFromApi('/api/get-content?type=events');
};

export const fetchCourses = async (): Promise<Course[]> => {
  return fetchFromApi('/api/get-content?type=courses');
};

export const fetchBooks = async (): Promise<Book[]> => {
  return fetchFromApi('/api/get-content?type=books');
};

export const fetchSiteContent = async (pageName: 'about' | 'project'): Promise<any> => {
  return fetchFromApi(`/api/get-content?type=siteContent&page=${pageName}`);
};

/**
 * Submits form data to the backend serverless function.
 * @param formType A string identifying the form (e.g., 'contact', 'newsletter').
 * @param data The form data object.
 * @returns An object with success status and a message.
 */
export const submitFormData = async (formType: string, data: any): Promise<{ success: boolean; message: string }> => {
  try {
    const response = await fetch('/api/submit-form', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ formType, data }),
    });

    const result = await response.json();

    if (!response.ok) {
      // If the server returns an error, use its message
      throw new Error(result.message || 'An unknown error occurred during submission.');
    }
    
    // Add a success field to the response for consistent handling in the UI
    return { success: true, message: result.message };
  } catch (error: any) {
    console.error(`Form submission error for ${formType}:`, error);
    // Return a failed response that the UI can display
    return { success: false, message: error.message };
  }
};
