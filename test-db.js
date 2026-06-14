require('dotenv').config();
const { PrismaClient } = require('./src/modules/post/db/client');

console.log('DATABASE_URL:', process.env.DATABASE_URL ? '(set, length=' + process.env.DATABASE_URL.length + ')' : '(NOT SET)');

const p = new PrismaClient({ log: ['info', 'warn', 'error'] });

console.log('Attempting $connect...');
p.$connect()
  .then(() => {
    console.log('SUCCESS: Connected to database!');
    return p.post.count();
  })
  .then((count) => {
    console.log('Post count:', count);
    return p.$disconnect();
  })
  .catch((e) => {
    console.error('FAIL:', e.message);
    return p.$disconnect().catch(() => {});
  })
  .then(() => process.exit(0));
