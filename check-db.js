const { PrismaClient } = require('./src/modules/user/db/client');
const prisma = new PrismaClient();
async function main() {
  const profiles = await prisma.profile.findMany();
  console.log("Profiles in DB:", JSON.stringify(profiles.map(p => ({
    userId: p.userId,
    username: p.username,
    firstName: p.firstName,
    lastName: p.lastName,
    avatar: p.avatar,
    isOrgAccount: p.isOrgAccount
  })), null, 2));
}
main().catch(console.error).finally(() => prisma.$disconnect());
