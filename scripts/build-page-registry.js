#!/usr/bin/env node

/**
 * Scan site HTML files and generate page registry JSON.
 * Excludes admin/ directory. Outputs to admin/data/page-registry.json.
 *
 * Usage: node scripts/build-page-registry.js
 */

import { readFileSync, writeFileSync, mkdirSync, readdirSync, statSync } from 'fs';
import { resolve, relative, join } from 'path';

const ROOT = process.cwd();
const OUTPUT = resolve(ROOT, 'admin/data/page-registry.json');
const EXCLUDE = ['admin', 'node_modules', '.git', 'functions', 'tests', 'specs', 'dist'];

function scanHtmlFiles(dir, base = ROOT) {
  const results = [];
  const entries = readdirSync(dir);

  for (const entry of entries) {
    const fullPath = join(dir, entry);
    const relPath = relative(base, fullPath);
    const relDir = relative(base, dir);

    if (EXCLUDE.includes(entry) || EXCLUDE.includes(relDir.split('/')[0])) continue;

    const stat = statSync(fullPath);
    if (stat.isDirectory()) {
      results.push(...scanHtmlFiles(fullPath, base));
    } else if (entry.endsWith('.html')) {
      const html = readFileSync(fullPath, 'utf-8');
      const titleMatch = html.match(/<title>([^<]*)<\/title>/i);
      const metaMatch = html.match(/<meta\s+name="description"\s+content="([^"]*)">/i);
      const i18nKeys = (html.match(/data-i18n/g) || []).length;

      // Determine page level
      const depth = relPath.split('/').length;
      let level;
      if (depth === 1) level = 'L1';
      else if (depth === 2) level = 'L2';
      else if (depth === 3) level = 'L3';
      else if (depth === 4) level = 'L4';
      else level = 'L5';

      results.push({
        path: relPath,
        title: titleMatch ? titleMatch[1].trim() : entry,
        description: metaMatch ? metaMatch[1].trim() : '',
        level,
        i18n_keys: i18nKeys,
      });
    }
  }

  return results;
}

// Main
const pages = scanHtmlFiles(ROOT);

mkdirSync(resolve(ROOT, 'admin/data'), { recursive: true });
writeFileSync(OUTPUT, JSON.stringify(pages, null, 2));

console.log(`Page registry: ${pages.length} pages → ${relative(ROOT, OUTPUT)}`);
