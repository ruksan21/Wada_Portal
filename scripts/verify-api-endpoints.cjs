const fs = require('fs');
const path = require('path');
const apiFile = path.resolve(__dirname, '..', 'Frontend', 'src', 'config', 'api.js');
const backendRoot = path.resolve(__dirname, '..', 'Backend', 'api');

if(!fs.existsSync(apiFile)){
  console.error('api.js not found at', apiFile);
  process.exit(1);
}

const content = fs.readFileSync(apiFile,'utf8');
const regex = /`\$\{BASE_URL\}\/([\w\-/]+\.php)`/g;
let m;
const missing = [];
const found = new Set();
while((m = regex.exec(content)) !== null){
  const rel = m[1];
  const filePath = path.join(backendRoot, rel.replace(/\//g, path.sep));
  if(!fs.existsSync(filePath)) missing.push({rel, filePath});
  else found.add(rel);
}

// Also check uploads and auth/uploads
if(!fs.existsSync(path.join(backendRoot,'uploads'))) {
  missing.push({rel:'uploads (folder)', filePath: path.join(backendRoot,'uploads')});
}
if(!fs.existsSync(path.join(backendRoot,'auth','uploads'))) {
  missing.push({rel:'auth/uploads (folder)', filePath: path.join(backendRoot,'auth','uploads')});
}

if(missing.length===0){
  console.log('All referenced endpoint files exist. Count:', found.size);
} else {
  console.log('Missing endpoint files:');
  missing.forEach(x=>console.log('-', x.rel, '=>', x.filePath));
}
