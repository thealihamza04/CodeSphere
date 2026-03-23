const fs = require('fs');
const data = JSON.parse(fs.readFileSync('d:/Desktop/CodeSphere/src/Data/DesignStyles.json', 'utf8'));

const tags = {};
const personalities = {};
const intensities = {};

data.forEach(c => {
  c.styles.forEach(s => {
    (s.tags || []).forEach(t => tags[t] = (tags[t] || 0) + 1);
    (s.best_for?.brand_personality || []).forEach(p => personalities[p] = (personalities[p] || 0) + 1);
    const intent = s.intensity?.split(',')[0].trim();
    if (intent) intensities[intent] = (intensities[intent] || 0) + 1;
  });
});

console.log('Top Tags:', Object.entries(tags).sort((a,b)=>b[1]-a[1]).slice(0, 15));
console.log('Top Personalities:', Object.entries(personalities).sort((a,b)=>b[1]-a[1]).slice(0, 15));
console.log('Top Intensities:', Object.entries(intensities).sort((a,b)=>b[1]-a[1]).slice(0, 15));
