const { PrismaClient: AuthPrisma } = require('./src/modules/auth/db/client');
const { PrismaClient: UserPrisma } = require('./src/modules/user/db/client');

const authPrisma = new AuthPrisma();
const userPrisma = new UserPrisma();

async function check() {
  const users = await authPrisma.authUser.findMany();
  for (const user of users) {
    const profile = await userPrisma.profile.findUnique({ where: { userId: user.id } });
    if (!profile) {
      console.log(`User ${user.id} (${user.email}) has no profile!`);
    }
  }
  console.log("Done");
}
check();
