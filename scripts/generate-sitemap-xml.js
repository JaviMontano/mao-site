#!/usr/bin/env node

/**
 * generate-sitemap-xml.js — T066
 *
 * Generates sitemap.xml with 12 canonical URLs (all pages except 404),
 * hreflang alternates (es/en) per URL, lastmod from git or current date,
 * changefreq and priority per page.
 *
 * Usage:
 *   node scripts/generate-sitemap-xml.js
 *
 * Output:
 *   sitemap.xml in repo root
 *
 * Traceability: [TS-052]
 * @license Copyleft
 * @copyright MetodologIA
 */

import { execSync } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const DOMAIN = 'https://metodologia.info';

const inventory = JSON.parse(
  readFileSync(resolve(ROOT, 'data/site-inventory.json'), 'utf8')
);
const PAGES = inventory.canonicalPages.filter((page) => page.includeInSitemap);

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Get the last git commit date for a file path, or fall back to today.
 * @param {string} filePath - relative path from repo root
 * @returns {string} ISO date (YYYY-MM-DD)
 */
function getLastmod(filePath) {
  try {
    const date = execSync(
      `git log -1 --format="%aI" -- "${filePath}"`,
      { cwd: ROOT, encoding: 'utf-8', stdio: ['pipe', 'pipe', 'pipe'] }
    ).trim();

    if (date) {
      return date.slice(0, 10); // YYYY-MM-DD
    }
  } catch {
    // git not available or file not tracked
  }
  return new Date().toISOString().slice(0, 10);
}

/**
 * Resolve the HTML file path for a page slug.
 * @param {object} page
 * @returns {string} relative file path from repo root
 */
function resolveFilePath(page) {
  return page.file;
}

/**
 * Generate a <url> block with hreflang alternates.
 * @param {object} page
 * @returns {string} XML fragment
 */
function generateUrlBlock(page) {
  const loc = `${DOMAIN}${page.path}`;
  const esHref = loc;
  const enHref = `${loc}?lang=en`;
  const lastmod = getLastmod(resolveFilePath(page));

  return `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority.toFixed(1)}</priority>
    <xhtml:link rel="alternate" hreflang="es" href="${esHref}"/>
    <xhtml:link rel="alternate" hreflang="en" href="${enHref}"/>
  </url>`;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

function main() {
  const urlBlocks = PAGES.map(generateUrlBlock).join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urlBlocks}
</urlset>
`;

  const outputPath = resolve(ROOT, 'sitemap.xml');
  writeFileSync(outputPath, xml, 'utf-8');

  console.log(`sitemap.xml generated with ${PAGES.length} URLs → ${outputPath}`);
}

main();
