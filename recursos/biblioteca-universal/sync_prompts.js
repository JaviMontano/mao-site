const fs = require('fs');
const path = require('path');

const jsonPath = path.join(__dirname, 'prompts_universales_v4.json');
const jsPath = path.join(__dirname, 'prompts_universales.js');

try {
    const rawData = fs.readFileSync(jsonPath, 'utf8');
    const promptsJson = JSON.parse(rawData);

    const promptsArray = Object.entries(promptsJson).map(([id, content]) => {
        const parts = id.split('_');
        let category = 'general';
        let label_title = id;
        let type = 'spec';

        // Single character = letter command or digit pipeline
        if (id.length === 1) {
            if (/[0-9]/.test(id)) {
                category = 'pipeline';
                type = 'digit';
                label_title = `${id} — ${content.split('\n')[0]}`;
            } else {
                category = 'comando';
                type = 'letter';
                label_title = id.toUpperCase();
            }
        }
        // Multi-char without underscore = single-word accelerator
        else if (!id.includes('_')) {
            category = 'acelerador';
            type = 'word';
            label_title = id.charAt(0).toUpperCase() + id.slice(1);
        }
        // Standard category_verb_noun format
        else if (parts.length > 1) {
            category = parts[0];
            label_title = parts.slice(1).map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
            type = 'spec';
        }

        // Count Params — matches {{PARAM}}
        const paramMatches = content.match(/\{\{[A-Z_]+\}\}/g);
        const paramCount = paramMatches ? new Set(paramMatches).size : 0;

        return {
            id,
            label_title,
            category,
            type,
            content,
            paramCount,
            keywords: []
        };
    });

    const jsContent = `window.promptsUniversales = ${JSON.stringify(promptsArray, null, 2)};`;

    fs.writeFileSync(jsPath, jsContent);

    // Stats
    const types = {};
    const cats = {};
    promptsArray.forEach(p => {
        types[p.type] = (types[p.type] || 0) + 1;
        cats[p.category] = (cats[p.category] || 0) + 1;
    });

    console.log(`Synced ${promptsArray.length} prompts to ${jsPath}`);
    console.log(`Types: ${JSON.stringify(types)}`);
    console.log(`Categories (${Object.keys(cats).length}): ${Object.entries(cats).sort((a,b) => b[1]-a[1]).map(([k,v]) => `${k}:${v}`).join(', ')}`);

} catch (error) {
    console.error('Error syncing prompts:', error);
    process.exit(1);
}
