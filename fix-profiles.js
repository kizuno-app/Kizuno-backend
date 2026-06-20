const { PrismaClient: AuthPrisma } = require('./src/modules/auth/db/client');
const { PrismaClient: UserPrisma } = require('./src/modules/user/db/client');

const authPrisma = new AuthPrisma();
const userPrisma = new UserPrisma();

async function fix() {
  const users = await authPrisma.authUser.findMany();
  for (const user of users) {
    const profile = await userPrisma.profile.findUnique({ where: { userId: user.id } });
    if (!profile) {
      console.log(`Fixing profile for user ${user.id} (${user.email})`);
      await userPrisma.profile.create({
        data: {
          userId: user.id,
          firstName: "Fixed",
          lastName: "User",
        }
      });
    }
  }
  console.log("Done fixing");
}
fix();
