
// This file contains helper functions to abstract away the complexity of the Notion API.

// A helper to safely get text content from a Notion property
const getText = (property: any) => property?.rich_text?.[0]?.plain_text ?? '';
const getTitle = (property: any) => property?.title?.[0]?.plain_text ?? '';
const getSelect = (property: any) => property?.select?.name ?? '';
const getDate = (property: any) => property?.date?.start ?? '';
const getURL = (property: any) => property?.url ?? '';
const getMultiSelect = (property: any) => property?.multi_select?.map((item: any) => item.name) ?? [];

// Helper for Files & Media properties
const getFileUrl = (property: any): string | undefined => {
    const file = property?.files?.[0];
    if (!file) return undefined;
    return file.type === 'file' ? file.file.url : file.external.url;
};

const getFilesUrls = (property: any): string[] => {
    const files = property?.files ?? [];
    return files.map((file: any) => file.type === 'file' ? file.file.url : file.external.url);
};

// --- Parsers for each Notion Database Type ---

const parsePage = (page: any) => ({ id: page.id, properties: page.properties });

export const parseNotionBlogPosts = (notionData: any) => {
  return notionData.results.map((page: any) => {
    const { id, properties } = parsePage(page);
    return {
      id,
      title: getTitle(properties.Title),
      author: getText(properties.Author),
      date: getDate(properties.Date),
      category: getSelect(properties.Category),
      imageUrl: getFileUrl(properties.Image),
      excerpt: getText(properties.Excerpt),
    };
  });
};

export const parseNotionResearchPapers = (notionData: any) => {
  return notionData.results.map((page: any) => {
    const { id, properties } = parsePage(page);
    return {
      id,
      title: getTitle(properties.Title),
      authors: getMultiSelect(properties.Authors),
      summary: getText(properties.Summary),
      publicationDate: getDate(properties.Date),
      category: getSelect(properties.Category),
    };
  });
};

export const parseNotionPartners = (notionData: any) => {
  return notionData.results.map((page: any) => {
    const { id, properties } = parsePage(page);
    return {
      id,
      name: getTitle(properties.Name),
      logoUrl: getFileUrl(properties.Logo),
      role: getText(properties.Role),
      url: getURL(properties['Website URL']),
      // You could add a 'Style' property in Notion for this
      logoBg: getText(properties.Style) === 'dark' ? 'dark' : undefined,
    };
  });
};

export const parseNotionEvents = (notionData: any) => {
  return notionData.results.map((page: any) => {
    const { id, properties } = parsePage(page);
    return {
      id,
      title: getTitle(properties.Title),
      date: getDate(properties.Date),
      venue: getText(properties.Venue),
      type: getSelect(properties.Type)?.toLowerCase() === 'upcoming' ? 'upcoming' : 'past',
      imageUrl: getFileUrl(properties.Image),
      youtubeUrl: getURL(properties['YouTube URL']),
    };
  });
};

export const parseNotionCourses = (notionData: any) => {
  return notionData.results.map((page: any) => {
    const { id, properties } = parsePage(page);
    return {
      id,
      title: getTitle(properties.Title),
      description: getText(properties.Description),
      imageUrl: getFileUrl(properties.Image),
      level: getSelect(properties.Level),
    };
  });
};

export const parseNotionBooks = (notionData: any) => {
  return notionData.results.map((page: any) => {
    const { id, properties } = parsePage(page);
    return {
      id,
      title: getTitle(properties.Title),
      author: getText(properties.Author),
      imageUrl: getFileUrl(properties.Image),
      description: getText(properties.Description),
      link: getURL(properties['Purchase Link']),
    };
  });
};

export const parseNotionSiteContent = (notionData: any) => {
  return notionData.results.map((page: any) => {
    const { id, properties } = parsePage(page);
    return {
      id,
      pageName: getTitle(properties['Page Name']),
      mainImage: getFileUrl(properties['Main Image']),
      imageGallery: getFilesUrls(properties['Image Gallery']),
    };
  });
};


// Creates the correct 'properties' object for a new Notion page based on form type and data
export const createNotionPageProperties = (formType: string, data: any) => {
    const properties: any = {};
    
    // Notion's 'title' property is special. We need to identify it.
    let titleKey = 'Title'; // Default title property name
    let titleContent = 'New Submission';
    
    if (data.name) { titleKey = 'Name'; titleContent = data.name; }
    if (data.companyName) { titleKey = 'Company Name'; titleContent = data.companyName; }
    if (data.title) { titleKey = 'Title'; titleContent = data.title; }
    if (data.email && formType === 'newsletter') { titleKey = 'Email'; titleContent = data.email; }

    properties[titleKey] = { title: [{ text: { content: titleContent } }] };

    // Map other form fields to appropriate Notion property types
    for (const key in data) {
        // Skip the field we already used as the title property
        if (key === Object.keys(properties)[0].toLowerCase().replace(' ', '')) continue;
        
        const value = data[key];
        if (typeof value !== 'string' || value.trim() === '') continue;

        // Simple mapping: email to email type, others to rich_text
        if (key.toLowerCase().includes('email')) {
            properties['Email'] = { email: value };
        } else {
             // Capitalize key for Notion property name convention
            const propertyName = key.charAt(0).toUpperCase() + key.slice(1);
            properties[propertyName] = { rich_text: [{ text: { content: value } }] };
        }
    }

    return properties;
};
