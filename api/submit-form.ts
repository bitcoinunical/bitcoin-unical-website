// This serverless function securely receives form data from the website
// and creates a new page in the corresponding Notion database.

import { createNotionPageProperties } from './utils';

export default async function handler(req: Request) {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ message: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  
  const NOTION_API_KEY = process.env.NOTION_API_KEY;
  if (!NOTION_API_KEY) {
    return new Response(JSON.stringify({ message: 'Server configuration error: API key missing.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const { formType, data } = await req.json();

    const dbIdMap: { [key: string]: string | undefined } = {
      contact: process.env.NOTION_CONTACT_DB_ID,
      partnership: process.env.NOTION_PARTNERSHIP_DB_ID,
      research: process.env.NOTION_RESEARCH_SUBMISSION_DB_ID,
      newsletter: process.env.NOTION_NEWSLETTER_DB_ID,
    };

    const databaseId = dbIdMap[formType];

    if (!databaseId) {
      return new Response(JSON.stringify({ message: `Server configuration error: Database ID for form type '${formType}' is missing.` }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const properties = createNotionPageProperties(formType, data);

    const response = await fetch('https://api.notion.com/v1/pages', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${NOTION_API_KEY}`,
        'Notion-Version': '2022-06-28',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        parent: { database_id: databaseId },
        properties: properties,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('Notion API Error:', error);
      throw new Error('Failed to submit to Notion.');
    }

    return new Response(JSON.stringify({ message: 'Submission received successfully!' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error: any) {
    console.error('Submission Error:', error);
    return new Response(JSON.stringify({ message: error.message || 'An internal server error occurred.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
