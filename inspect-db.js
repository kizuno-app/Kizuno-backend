const { PrismaClient: OrgPrisma } = require('./src/modules/organization/client');
const { PrismaClient: UserPrisma } = require('./src/modules/user/client');

async function main() {
  const orgPrisma = new OrgPrisma();
  const userPrisma = new UserPrisma();

  console.log("--- PENDING APPLICATIONS ---");
  const apps = await orgPrisma.organizationApplication.findMany({
    where: { status: 'PENDING' }
  });
  console.log(apps.map(a => ({ id: a.id, name: a.name, orgAccountUsername: a.orgAccountUsername, orgAccountName: a.orgAccountName })));

  console.log("\n--- PROFILES ---");
  const profiles = await userPrisma.profile.findMany({
    select: { userId: true, username: true, firstName: true, lastName: true }
  });
  console.log(profiles);

  await orgPrisma.$disconnect();
  await userPrisma.$disconnect();
}

main().catch(console.error);
