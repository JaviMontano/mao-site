#!/usr/bin/env node
/**
 * count-pages.js — Pre-commit hook script
 * Enforces exactly 13 canonical pages for metodologia.info
 *
 * Exit 0: all good (or missing pages during development — warns only)
 * Exit 1: unexpected extra HTML pages found outside canonical set
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const inventory = JSON.parse(
  fs.readFileSync(path.join(ROOT, 'data/site-inventory.json'), 'utf8')
);
const CANONICAL_PAGES = inventory.canonicalPages.map((page) => page.file);
const LEGACY_REDIRECT_PAGES = inventory.legacyRedirectPages.map((page) => page.file);
const ARCHIVED_HTML_PAGES = inventory.archivedHtmlPages.map((page) => page.file);
const KNOWN_NON_CANONICAL = new Set([
  ...LEGACY_REDIRECT_PAGES,
  ...ARCHIVED_HTML_PAGES
]);

const EXCLUDED_DIRS = new Set([
  'admin',
  'tests',
  'node_modules',
  '.tessl',
  'specs',
  'dist',
]);

// --- Check canonical pages ---

const present = [];
const missing = [];

for (const page of CANONICAL_PAGES) {
  const full = path.join(ROOT, page);
  if (fs.existsSync(full)) {
    present.push(page);
  } else {
    missing.push(page);
  }
}

console.log(`\n📄 Canonical page check (${present.length}/${CANONICAL_PAGES.length})`);

if (present.length > 0) {
  console.log(`  ✅ Present: ${present.length}`);
  for (const p of present) {
    console.log(`     • ${p}`);
  }
}

if (missing.length > 0) {
  console.log(`  ⚠️  Missing (${missing.length}):`);
  for (const m of missing) {
    console.log(`     • ${m}`);
  }
}

// --- Check for unexpected HTML pages ---

const canonicalSet = new Set(CANONICAL_PAGES);
const unexpected = [];
const legacyRedirects = [];
const archived = [];

/**
 * Scan for .html files at the repo root and one level deep (dir/index.html).
 * Skips excluded directories.
 */
function scanForHtml() {
  const entries = fs.readdirSync(ROOT, { withFileTypes: true });

  for (const entry of entries) {
    const name = entry.name;

    // Skip hidden dirs/files (except specific ones) and excluded dirs
    if (name.startsWith('.') || EXCLUDED_DIRS.has(name)) {
      continue;
    }

    if (entry.isFile() && name.endsWith('.html')) {
      // Top-level HTML file
      if (canonicalSet.has(name)) {
        continue;
      }
      if (KNOWN_NON_CANONICAL.has(name)) {
        if (LEGACY_REDIRECT_PAGES.includes(name)) legacyRedirects.push(name);
        else archived.push(name);
      } else {
        unexpected.push(name);
      }
    } else if (entry.isDirectory()) {
      // Check for index.html inside subdirectory
      const subPath = path.join(ROOT, name);
      let subEntries;
      try {
        subEntries = fs.readdirSync(subPath, { withFileTypes: true });
      } catch {
        continue;
      }
      for (const sub of subEntries) {
        if (sub.isFile() && sub.name.endsWith('.html')) {
          const rel = `${name}/${sub.name}`;
          if (canonicalSet.has(rel)) {
            continue;
          }
          if (KNOWN_NON_CANONICAL.has(rel)) {
            if (LEGACY_REDIRECT_PAGES.includes(rel)) legacyRedirects.push(rel);
            else archived.push(rel);
          } else {
            unexpected.push(rel);
          }
        }
      }
    }
  }
}

scanForHtml();

if (legacyRedirects.length > 0) {
  console.log(`\n  ↪ Legacy redirect HTML tracked explicitly (${legacyRedirects.length}):`);
  for (const page of legacyRedirects) {
    console.log(`     • ${page}`);
  }
}

if (archived.length > 0) {
  console.log(`\n  🗃 Archived or non-public HTML tracked explicitly (${archived.length}):`);
  for (const page of archived) {
    console.log(`     • ${page}`);
  }
}

if (unexpected.length > 0) {
  console.log(`\n  ❌ Unexpected HTML pages found (${unexpected.length}):`);
  for (const u of unexpected) {
    console.log(`     • ${u}`);
  }
  console.log('\n  These pages are outside the canonical, legacy-redirect, and archived inventories.');
  console.log('  Reclassify them in data/site-inventory.json or remove them.\n');
  process.exit(1);
}

// --- Summary ---

if (missing.length > 0) {
  console.log(`\n  ℹ️  ${missing.length} canonical page(s) not yet created — OK during development.\n`);
} else {
  console.log(`\n  ✅ All 13 canonical pages present. No unexpected pages.\n`);
}

process.exit(0);
