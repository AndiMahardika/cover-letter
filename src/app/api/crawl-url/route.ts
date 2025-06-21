import FirecrawlApp, { ScrapeResponse } from '@mendable/firecrawl-js';
import { z } from 'zod';

const app = new FirecrawlApp({ apiKey: process.env.FIRECRAWL_API_KEY });

// Schema validasi data hasil scrape
const schema = z.object({
  jobTitle: z.string(),
  companyName: z.string(),
  location: z.string(),
  salary: z.string().optional(),
  requirements: z.string().optional(),
  skills: z.array(z.string()).optional(),
  jobDetail: z.string().optional(),
  jobType: z.string().optional(),
  datePosted: z.string().optional(),
});

// Mapping domain dan prompt untuk masing-masing job source
const jobSources = {
  glints: {
    domain: "glints.com",
    prompt: `Extract only the main job listing(s) from this webpage. Do not include job recommendations, ads, or sponsored job content. For each job listing, extract the following fields:

- Job Title
- Company Name
- Location
- Salary (if available)
- Requirements or Qualifications
- Skills (if available, from class Skillssc__TagContainer)
- Job Detail or Full Description (include the full text without summarizing. Preserve formatting, structure, and paragraph breaks if possible)
- Job Type (Full-time, Part-time, Remote, etc.)
- Date Posted

Only include actual job postings that are part of the main job content of the page, not sidebar or footer suggestions. Return the data in clean JSON format.`,
  },
  linkedin: {
    domain: "linkedin.com",
    prompt: `Extract the main job details from a LinkedIn job post including:

- Job Title
- Company Name
- Location
- Salary (if shown)
- Requirements / Qualifications
- Skills (if available)
- Job Description
- Job Type
- Date Posted

Exclude recommendations, promoted jobs, or unrelated content.`,
  },
  jobstreet: {
    domain: "jobstreet.co.id",
    prompt: `Extract core job information from this JobStreet post:

- Job Title
- Company Name
- Location
- Salary (if available)
- Requirements
- Skills
- Full Description
- Job Type
- Date Posted

Ignore sidebar recommendations or footer links.`,
  },
} satisfies Record<string, { domain: string; prompt: string }>

export async function POST(request: Request) {
  const { url, jobSource } = await request.json()

  const normalizedSource = jobSource?.toLowerCase() as keyof typeof jobSources | undefined;
  const config = normalizedSource ? jobSources[normalizedSource] : undefined;

  if (!config) {
    return new Response(JSON.stringify({ error: "Unsupported job source." }), { status: 400 })
  }

  // Validasi apakah URL sesuai dengan domain yang diharapkan
  try {
    const parsedUrl = new URL(url)
    if (!parsedUrl.hostname.includes(config.domain)) {
      return new Response(
        JSON.stringify({ error: `The URL must be from ${config.domain} for the selected job source.` }),
        { status: 400 }
      )
    }
  } catch (error) {
    // console.error("Invalid URL format:", error)
    return new Response(JSON.stringify({ error: "Invalid URL format." }), { status: 400 })
  }

  // Lakukan scraping
  const scrapeResult = await app.scrapeUrl(url, {
    formats: ['json'],
    jsonOptions: {
      prompt: config.prompt,
      schema: schema,
    },
  })

  if (!scrapeResult.success) {
    // return new Response(
    //   JSON.stringify({ error: `Failed to scrape: ${scrapeResult.error}` }),
    //   { status: 500 }
    // )
    return new Response(
      JSON.stringify({ error: `Failed to analyze the URL. Please try again later.` }),
      { status: 500 }
    )
  }

  return new Response(JSON.stringify(scrapeResult.json), {
    headers: { 'Content-Type': 'application/json' },
  })
}
