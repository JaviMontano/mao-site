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

const CANONICAL_PAGES = [
  'index.html',
  'diagnostico/index.html',
  'empresas/index.html',
  'personas/index.html',
  'programas/index.html',
  'recursos/index.html',
  'metodo/index.html',
  'casos/index.html',
  'nosotros/index.html',
  'insights/index.html',
  'contacto/index.html',
  'legal/index.html',
  '404.html',
];

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
      if (!canonicalSet.has(name)) {
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
          if (!canonicalSet.has(rel)) {
            unexpected.push(rel);
          }
        }
      }
    }
  }
}

scanForHtml();

if (unexpected.length > 0) {
  console.log(`\n  ❌ Unexpected HTML pages found (${unexpected.length}):`);
  for (const u of unexpected) {
    console.log(`     • ${u}`);
  }
  console.log('\n  These pages are outside the 13 canonical set.');
  console.log('  Remove them or add them to CANONICAL_PAGES in scripts/count-pages.js.\n');
  process.exit(1);
}

// --- Summary ---

if (missing.length > 0) {
  console.log(`\n  ℹ️  ${missing.length} canonical page(s) not yet created — OK during development.\n`);
} else {
  console.log(`\n  ✅ All 13 canonical pages present. No unexpected pages.\n`);
}

process.exit(0);
