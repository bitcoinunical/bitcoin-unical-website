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

export const parseNotionBlogPosts = (notionData: QueryDatabaseResponse) => {
  return notionData.results.map((page: NotionPage) => ({
    id: page.id,
    title: getTitle(getProperty(page, 'Title')),
    author: getText(getProperty(page, 'Author')),
    date: getDate(getProperty(page, 'Date')),
    category: getSelect(getProperty(page, 'Category')),
    imageUrl: getFileUrl(getProperty(page, 'Image')),
    excerpt: getText(getProperty(page, 'Excerpt')),
  }));
};

export const parseNotionResearchPapers = (notionData: QueryDatabaseResponse) => {
  return notionData.results.map((page: NotionPage) => ({
    id: page.id,
    title: getTitle(getProperty(page, 'Title')),
    authors: getMultiSelect(getProperty(page, 'Authors')),
    summary: getText(getProperty(page, 'Summary')),
    publicationDate: getDate(getProperty(page, 'Date')),
    category: getSelect(getProperty(page, 'Category')),
  }));
};

export const parseNotionPartners = (notionData: QueryDatabaseResponse) => {
  return notionData.results.map((page: NotionPage) => ({
    id: page.id,
    name: getTitle(getProperty(page, 'Name')),
    logoUrl: getFileUrl(getProperty(page, 'Logo')),
    role: getText(getProperty(page, 'Role')),
    url: getURL(getProperty(page, 'Website URL')),
    logoBg: getText(getProperty(page, 'Style')) === 'dark' ? 'dark' : undefined,
  }));
};

export const parseNotionEvents = (notionData: QueryDatabaseResponse) => {
  return notionData.results.map((page: NotionPage) => ({
    id: page.id,
    title: getTitle(getProperty(page, 'Title')),
    date: getDate(getProperty(page, 'Date')),
    venue: getText(getProperty(page, 'Venue')),
    type: (getSelect(getProperty(page, 'Type'))?.toLowerCase() === 'upcoming' ? 'upcoming' : 'past') as 'upcoming' | 'past',
    imageUrl: getFileUrl(getProperty(page, 'Image')),
    youtubeUrl: getURL(getProperty(page, 'YouTube URL')),
  }));
};

export const parseNotionCourses = (notionData: QueryDatabaseResponse) => {
  return notionData.results.map((page: NotionPage) => ({
    id: page.id,
    title: getTitle(getProperty(page, 'Title')),
    description: getText(getProperty(page, 'Description')),
    imageUrl: getFileUrl(getProperty(page, 'Image')),
    level: getSelect(getProperty(page, 'Level')),
  }));
};

export const parseNotionBooks = (notionData: QueryDatabaseResponse) => {
  return notionData.results.map((page: NotionPage) => ({
    id: page.id,
    title: getTitle(getProperty(page, 'Title')),
    author: getText(getProperty(page, 'Author')),
    imageUrl: getFileUrl(getProperty(page, 'Image')),
    description: getText(getProperty(page, 'Description')),
    link: getURL(getProperty(page, 'Purchase Link')),
  }));
};

export const parseNotionSiteContent = (notionData: QueryDatabaseResponse) => {
  return notionData.results.map((page: NotionPage) => ({
    id: page.id,
    pageName: getTitle(getProperty(page, 'Page Name')),
    mainImage: getFileUrl(getProperty(page, 'Main Image')),
    imageGallery: getFilesUrls(getProperty(page, 'Image Gallery')),
  }));
};


// Creates the correct 'properties' object for a new Notion page based on form type and data
export const createNotionPageProperties = (formType: string, data: any) => {
    const properties: any = {};
    
    // Determine the 'Title' property and its content based on form type
    let titleKey = 'Title'; 
    let titleContent = data.title || data.name || data.companyName || data.email || 'New Submission';

    if (formType === 'contact') { titleKey = 'Name'; }
    if (formType === 'partnership') { titleKey = 'Company Name'; }
    if (formType === 'newsletter') { titleKey = 'Email'; }
    
    properties[titleKey] = { title: [{ text: { content: titleContent } }] };

    // Map other form fields to appropriate Notion property types
    for (const key in data) {
        // Skip the field already used as the title
        if (key.toLowerCase() === titleKey.toLowerCase().replace(/\s/g, '')) continue;
        
        const value = data[key];
        if (typeof value !== 'string' || value.trim() === '') continue;

        const propertyName = Object.keys(data).find(k => k.toLowerCase() === key.toLowerCase()) || key;
        const capitalizedPropName = propertyName.charAt(0).toUpperCase() + propertyName.slice(1);


        if (key.toLowerCase().includes('email')) {
            properties['Email'] = { email: value };
        } else {
            properties[capitalizedPropName] = { rich_text: [{ text: { content: value } }] };
        }
    }

    return properties;
};