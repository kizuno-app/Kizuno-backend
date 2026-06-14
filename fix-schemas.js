const fs = require('fs');
const path = require('path');

const modules = ['auth', 'user', 'post', 'feed', 'connection', 'chat', 'notification', 'discover'];

modules.forEach(mod => {
  const schemaPath = path.join(__dirname, 'src', 'modules', mod, 'db', 'schema', 'schema.prisma');
  if (!fs.existsSync(schemaPath)) return;

  let content = fs.readFileSync(schemaPath, 'utf8');

  // Add previewFeatures if not exists
  if (!content.includes('previewFeatures')) {
    content = content.replace('provider = "prisma-client-js"', 'provider = "prisma-client-js"\n  previewFeatures = ["multiSchema"]');
  }

  // Add schemas array to datasource if not exists
  if (!content.includes('schemas  =')) {
    content = content.replace('url      = env("DATABASE_URL")', `url      = env("DATABASE_URL")\n  schemas  = ["${mod}"]`);
  }

  // Add @@schema to models
  const modelRegex = /model\s+(\w+)\s+{([^}]+)}/g;
  content = content.replace(modelRegex, (match, modelName, modelBody) => {
    if (!modelBody.includes('@@schema')) {
      return `model ${modelName} {${modelBody}\n  @@schema("${mod}")\n}`;
    }
    return match;
  });

  fs.writeFileSync(schemaPath, content);
  console.log(`Updated schema for ${mod}`);
});
