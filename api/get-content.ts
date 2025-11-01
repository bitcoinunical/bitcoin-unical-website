// This is a universal serverless function that acts as our backend.
// It securely fetches data from various Notion databases and sends it to the frontend.

import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Client } from '@notionhq/client';
import * as NotionUtils from './utils';

const getDbIdAndParser = (type: string | undefined | string[]) => {
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

    if (typeof type !== 'string' || !dbIdMap[type] || !parserMap[type]) {
        return { databaseId: null, parser: null };
    }
    return { databaseId: dbIdMap[type], parser: parserMap[type] };
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { type, page } = req.query;

  const NOTION_API_KEY = process.env.NOTION_API_KEY;
  const { databaseId, parser } = getDbIdAndParser(type);

  if (!NOTION_API_KEY || !databaseId || !parser) {
    return res.status(500).json({ message: 'Server configuration error or invalid type.' });
  }

  const notion = new Client({ auth: NOTION_API_KEY });

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
              equals: page as string,
          },
      };
  }

  // Sort by date if it's a blog or research query
  const sorts = (type === 'blog' || type === 'research' || type === 'events') ? [{
      property: 'Date',
      direction: 'descending' as const,
  }] : undefined;

  try {
    const response = await notion.databases.query({
        database_id: databaseId,
        filter: filter,
        sorts: sorts,
    });

    const parsedData = parser(response);

    // If it's site content, we expect a single object, not an array
    const finalData = (type === 'siteContent' && Array.isArray(parsedData)) ? parsedData[0] || null : parsedData;

    res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate');
    return res.status(200).json(finalData);

  } catch (error: any) {
    console.error('Notion API Error:', error.body || error.message);
    return res.status(500).json({ message: 'Failed to fetch from Notion.' });
  }
}