const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

function walk(dir){
  let files = [];
  for(const entry of fs.readdirSync(dir, { withFileTypes: true })){
    const res = path.resolve(dir, entry.name);
    if(entry.isDirectory()) files = files.concat(walk(res));
    else files.push(res);
  }
  return files;
}

const base = path.resolve(__dirname, '..', 'src');
if(!fs.existsSync(base)){
  console.error('No src folder at', base);
  process.exit(1);
}

const files = walk(base).filter(f => !f.includes('node_modules'));
const map = new Map();
for(const f of files){
  const content = fs.readFileSync(f);
  const hash = crypto.createHash('sha256').update(content).digest('hex');
  if(!map.has(hash)) map.set(hash, []);
  map.get(hash).push(f.replace(process.cwd()+path.sep, ''));
}

let found = false;
for(const [h, arr] of map.entries()){
  if(arr.length > 1){
    found = true;
    console.log('--- duplicate group ---');
    arr.forEach(x => console.log(x));
  }
}
if(!found) console.log('No duplicates found');
