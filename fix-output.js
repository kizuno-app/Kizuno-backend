const fs = require('fs');
const path = require('path');

const modules = ['auth', 'user', 'post', 'feed', 'connection', 'chat', 'notification', 'discover'];

modules.forEach(mod => {
  // 1. Update schema.prisma
  const schemaPath = path.join(__dirname, 'src', 'modules', mod, 'db', 'schema', 'schema.prisma');
  if (fs.existsSync(schemaPath)) {
    let content = fs.readFileSync(schemaPath, 'utf8');
    content = content.replace(/output\s*=\s*"\.\.\/client"/g, 'output   = "../generated-client"');
    fs.writeFileSync(schemaPath, content);
  }

  // 2. Update service.ts
  const servicePath = path.join(__dirname, 'src', 'modules', mod, 'services', `${mod}.service.ts`);
  if (fs.existsSync(servicePath)) {
    let content = fs.readFileSync(servicePath, 'utf8');
    content = content.replace(/from '\.\.\/db\/client'/g, "from '../db/generated-client'");
    fs.writeFileSync(servicePath, content);
  }
});
console.log('Fixed output paths and imports');
