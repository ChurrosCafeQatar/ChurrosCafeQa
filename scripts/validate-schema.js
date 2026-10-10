const fs = require('fs');

function validateSchema(filePath) {
  try {
    const html = fs.readFileSync(filePath, 'utf8');
    const regex = /<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g;
    let match;
    let count = 0;
    while ((match = regex.exec(html)) !== null) {
      let content = match[1];
      if (content.includes('dangerouslySetInnerHTML')) continue; // In case it matched raw JSX instead of generated HTML somehow.
      
      // Sometimes next.js escapes < as \u003c, but JSON.parse handles unicode escapes fine.
      try {
        const parsed = JSON.parse(content);
        console.log(`[VALID] ${filePath} - Type: ${parsed['@type'] || (parsed['@graph'] ? 'Graph' : 'Unknown')}`);
        count++;
      } catch(e) {
        console.error(`[ERROR] Invalid JSON in ${filePath}:`, e.message);
      }
    }
    if (count === 0) {
      console.log(`[WARNING] No JSON-LD found in ${filePath}`);
    }
  } catch(err) {
    console.error(`[ERROR] Could not read ${filePath}`, err.message);
  }
}

validateSchema('out/index.html');
validateSchema('out/locations/lusail/index.html');
validateSchema('out/menu/index.html');
