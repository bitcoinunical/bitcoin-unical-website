// This file contains helper functions to abstract away the complexity of the Notion API,
// specifically for parsing data from the official @notionhq/client library.

import {
  PageObjectResponse,
  PartialPageObjectResponse,
  QueryDatabaseResponse,
} from '@notionhq/client/build/src/api-endpoints';

type NotionPage = PageObjectResponse | PartialPageObjectResponse;

// A helper to safely extract property data from a Notion page object
const getProperty = (page: NotionPage, name: string) => {
    if ('properties' in page) {
        return page.properties[name];
    }
    return null;
};

// --- Type-safe helpers for specific Notion property types ---

const getTitle = (prop: any): string => prop?.title?.[0]?.plain_text ?? '';
const getText = (prop: any): string => prop?.rich_text?.[0]?.plain_text ?? '';
const getSelect = (prop: any): string => prop?.select?.name ?? '';
const getDate = (prop: any): string => prop?.date?.start ?? '';
const getURL = (prop: any): string => prop?.url ?? '';
const getMultiSelect = (prop: any): string[] => prop?.multi_select?.map((item: any) => item.name) ?? [];
const getFileUrl = (prop: any): string | undefined => {
    const file = prop?.files?.[0];
    if (!file) return undefined;
    return file.type === 'file' ? file.file.url : file.external.url;
};
const getFilesUrls = (prop: any): string[] => {
    const files = prop?.files ?? [];
    return files.map((file: any) => (file.type === 'file' ? file.file.url : file.external.url));
};

// --- Parsers for each Notion Database Type ---

const safelyParse = <T>(page: NotionPage, parser: (page: NotionPage) => T): T | null => {
    try {
        return parser(page);
    } catch (e) {
        console.error(`Failed to parse Notion page ${page.id}:`, e);
        return null;
    }
}

export const parseNotionBlogPosts = (notionData: QueryDatabaseResponse) => {
  return notionData.results
    .map((page: NotionPage) => safelyParse(page, p => ({
        id: p.id,
        title: getTitle(getProperty(p, 'Title')),
        author: getText(getProperty(p, 'Author')),
        date: getDate(getProperty(p, 'Date')),
        category: getSelect(getProperty(p, 'Category')),
        imageUrl: getFileUrl(getProperty(p, 'Image')),
        excerpt: getText(getProperty(p, 'Excerpt')),
    })))
    .filter(Boolean);
};

export const parseNotionResearchPapers = (notionData: QueryDatabaseResponse) => {
  return notionData.results
    .map((page: NotionPage) => safelyParse(page, p => ({
        id: p.id,
        title: getTitle(getProperty(p, 'Title')),
        authors: getMultiSelect(getProperty(p, 'Authors')),
        summary: getText(getProperty(p, 'Summary')),
        publicationDate: getDate(getProperty(p, 'Date')),
        category: getSelect(getProperty(p, 'Category')),
        fileUrl: getFileUrl(getProperty(p, 'File')),
    })))
    .filter(Boolean);
};

export const parseNotionPartners = (notionData: QueryDatabaseResponse) => {
  return notionData.results
    .map((page: NotionPage) => safelyParse(page, p => ({
        id: p.id,
        name: getTitle(getProperty(p, 'Name')),
        logoUrl: getFileUrl(getProperty(p, 'Logo')),
        role: getText(getProperty(p, 'Role')),
        url: getURL(getProperty(p, 'Website URL')),
        logoBg: getText(getProperty(p, 'Style')) === 'dark' ? 'dark' : undefined,
    })))
    .filter(Boolean);
};

export const parseNotionEvents = (notionData: QueryDatabaseResponse) => {
  return notionData.results
    .map((page: NotionPage) => safelyParse(page, p => ({
        id: p.id,
        title: getTitle(getProperty(p, 'Title')),
        date: getDate(getProperty(p, 'Date')),
        venue: getText(getProperty(p, 'Venue')),
        type: (getSelect(getProperty(p, 'Type'))?.toLowerCase() === 'upcoming' ? 'upcoming' : 'past') as 'upcoming' | 'past',
        imageUrl: getFileUrl(getProperty(p, 'Image')),
        youtubeUrl: getURL(getProperty(p, 'YouTube URL')),
    })))
    .filter(Boolean);
};

export const parseNotionCourses = (notionData: QueryDatabaseResponse) => {
  return notionData.results
    .map((page: NotionPage) => safelyParse(page, p => ({
        id: p.id,
        title: getTitle(getProperty(p, 'Title')),
        description: getText(getProperty(p, 'Description')),
        imageUrl: getFileUrl(getProperty(p, 'Image')),
        level: getSelect(getProperty(p, 'Level')),
    })))
    .filter(Boolean);
};

export const parseNotionBooks = (notionData: QueryDatabaseResponse) => {
  return notionData.results
    .map((page: NotionPage) => safelyParse(page, p => ({
        id: p.id,
        title: getTitle(getProperty(p, 'Title')),
        author: getText(getProperty(p, 'Author')),
        imageUrl: getFileUrl(getProperty(p, 'Image')),
        description: getText(getProperty(p, 'Description')),
        link: getURL(getProperty(p, 'Purchase Link')),
    })))
    .filter(Boolean);
};

export const parseNotionSiteContent = (notionData: QueryDatabaseResponse) => {
  return notionData.results
    .map((page: NotionPage) => safelyParse(page, p => ({
        id: p.id,
        pageName: getTitle(getProperty(p, 'Page Name')),
        mainImage: getFileUrl(getProperty(p, 'Main Image')),
        imageGallery: getFilesUrls(getProperty(p, 'Image Gallery')),
    })))
    .filter(Boolean);
};


// Creates the correct 'properties' object for a new Notion page based on form type and data
export const createNotionPageProperties = (formType: string, data: any) => {
    const properties: any = {};

    // A robust mapping from form field names to Notion property names and types.
    const fieldToNotionMap: { [key: string]: { name: string, type: 'title' | 'rich_text' | 'email' } } = {
        // common fields
        name: { name: 'Name', type: 'title' },
        email: { name: 'Email', type: 'email' },
        message: { name: 'Message', type: 'rich_text' },
        // partnership form
        companyName: { name: 'Company Name', type: 'title' },
        contactEmail: { name: 'Email', type: 'email' },
        // research form
        title: { name: 'Title', type: 'title' },
        fileName: { name: 'File Name', type: 'rich_text' },
        // contact form
        interest: { name: 'Interest', type: 'rich_text' },
        // newsletter form
        newsletterEmail: { name: 'Email', type: 'title' },
    };
    
    // Determine the title property based on the form type
    const titleField = {
      contact: 'name',
      partnership: 'companyName',
      research: 'title',
      newsletter: 'email',
    }[formType] || 'name';


    for (const key in data) {
        const mapping = fieldToNotionMap[key];
        const value = data[key];

        if (!mapping || typeof value !== 'string' || value.trim() === '') continue;
        
        // Use the mapping's designated type, but force the title field to be 'title' type
        const propertyType = key === titleField ? 'title' : mapping.type;
        
        switch(propertyType) {
            case 'title':
                properties[mapping.name] = { title: [{ text: { content: value } }] };
                break;
            case 'email':
                properties[mapping.name] = { email: value };
                break;
            case 'rich_text':
                properties[mapping.name] = { rich_text: [{ text: { content: value } }] };
                break;
        }
    }

    return properties;
};
