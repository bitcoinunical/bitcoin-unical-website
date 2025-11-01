// This serverless function securely receives form data from the website
// and creates a new page in the corresponding Notion database.

import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Client } from '@notionhq/client';
import { createNotionPageProperties } from './utils';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ message: 'Method not allowed' });
  }
  
  const NOTION_API_KEY = process.env.NOTION_API_KEY;
  if (!NOTION_API_KEY) {
    return res.status(500).json({ message: 'Server configuration error: API key missing.' });
  }
  
  const notion = new Client({ auth: NOTION_API_KEY });

  try {
    const { formType, data } = req.body;

    const dbIdMap: { [key: string]: string | undefined } = {
      contact: process.env.NOTION_CONTACT_DB_ID,
      partnership: process.env.NOTION_PARTNERSHIP_DB_ID,
      research: process.env.NOTION_RESEARCH_SUBMISSION_DB_ID,
      newsletter: process.env.NOTION_NEWSLETTER_DB_ID,
    };

    const databaseId = dbIdMap[formType];

    if (!databaseId) {
      return res.status(500).json({ message: `Server configuration error: Database ID for form type '${formType}' is missing.` });
    }

    const properties = createNotionPageProperties(formType, data);

    await notion.pages.create({
        parent: { database_id: databaseId },
        properties: properties,
    });

    return res.status(200).json({ message: 'Submission received successfully!' });

  } catch (error: any) {
    console.error('Submission Error:', error.body || error.message);
    return res.status(500).json({ message: 'Failed to submit to Notion.' });
  }
}