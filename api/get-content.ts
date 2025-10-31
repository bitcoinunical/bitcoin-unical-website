
// This is a universal serverless function that acts as our backend.
// It securely fetches data from various Notion databases and sends it to the frontend.

import * as NotionUtils from './utils';

const getDbIdAndParser = (type: string | null) => {
    const dbIdMap: { [key: string]: string | undefined } = {
        blog: process.env.NOTION_BLOG_DB_ID,
        research: process.env.NOTION_RESEARCH_DB_ID,
        partners: process.env.NOTION_PARTNERS_DB_ID,
        events: process.env.NOTION_EVENTS_DB_ID,
        courses: process.env.NOTION_COURSES_DB_ID,
        books: process.env.NOTION_BOOKS_DB_ID,
        siteContent: process.env.NOTION_SITE_CONTENT_DB_ID,
    };
    
    const parserMap: { [key: string]: (data: any) => any } = {
        blog: NotionUtils.parseNotionBlogPosts,
        research: NotionUtils.parseNotionResearchPapers,
        partners: NotionUtils.parseNotionPartners,
        events: NotionUtils.parseNotionEvents,
        courses: NotionUtils.parseNotionCourses,
        books: NotionUtils.parseNotionBooks,
        siteContent: NotionUtils.parseNotionSiteContent,
    };

    if (!type || !dbIdMap[type] || !parserMap[type]) {
        return { databaseId: null, parser: null };
    }
    return { databaseId: dbIdMap[type], parser: parserMap[type] };
};

export default async function handler(req: Request) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get('type');
  const page = searchParams.get('page'); // For siteContent

  const NOTION_API_KEY = process.env.NOTION_API_KEY;
  const { databaseId, parser } = getDbIdAndParser(type);

  if (!NOTION_API_KEY || !databaseId || !parser) {
    return new Response(JSON.stringify({ message: 'Server configuration error or invalid type.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Construct the filter for the Notion query
  let filter: any = {
      property: 'Status',
      select: {
          equals: 'Published',
      },
  };
  
  // Special filter for siteContent to find the specific page's content
  if (type === 'siteContent' && page) {
      filter = {
          property: 'Page Name',
          title: {
              equals: page,
          },
      };
  }

  // Sort by date if it's a blog or research query
  const sorts = (type === 'blog' || type === 'research' || type === 'events') ? [{
      property: 'Date',
      direction: 'descending',
  }] : undefined;

  try {
    const response = await fetch(`https://api.notion.com/v1/databases/${databaseId}/query`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${NOTION_API_KEY}`,
        'Notion-Version': '2022-06-28',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ filter, sorts }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('Notion API Error:', error);
      throw new Error('Failed to fetch from Notion.');
    }

    const notionData = await response.json();
    const parsedData = parser(notionData);

    // If it's site content, we expect a single object, not an array
    const finalData = (type === 'siteContent' && Array.isArray(parsedData)) ? parsedData[0] || null : parsedData;

    return new Response(JSON.stringify(finalData), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error: any) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
