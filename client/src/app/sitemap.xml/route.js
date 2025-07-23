import { NextResponse } from 'next/server';

export async function GET() {
  // 1. Get all dynamic URLs from DB or API
  const res = await fetch('http://localhost:5000/api/v1/travel-blogs');
  const blogs = await res.json();

  // 2. Build XML string
  const baseUrl = 'http://localhost:3000';
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}</loc>
  </url>
  ${blogs.map((blog) => `
  <url>
    <loc>${baseUrl}/tour/${blog.slug}</loc>
    <lastmod>${blog.published_date}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`).join('')}
</urlset>`;

  return new NextResponse(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
