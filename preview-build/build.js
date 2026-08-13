// Builds preview-build/preview.html by inlining style.css and game.js into index.html.
// Used only for local preview; the real site keeps external files.
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const css = fs.readFileSync(path.join(root, 'style.css'), 'utf8');
const js = fs.readFileSync(path.join(root, 'game.js'), 'utf8');

// NOTE: use split/join, NOT String.replace — game.js contains `$'` sequences
// which String.replace would interpret as "text after the match" in the replacement.
const out = html
  .split('<link rel="stylesheet" href="style.css">').join('<style>' + css + '</style>')
  .split('<script src="game.js"></script>').join('<script>' + js + '</script>');

fs.mkdirSync(__dirname, { recursive: true });
fs.writeFileSync(path.join(__dirname, 'preview.html'), out);
console.log('Built preview-build/preview.html (' + out.length + ' bytes)');
