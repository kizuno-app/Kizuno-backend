const { PrismaClient } = require('./src/modules/user/db/client');
const prisma = new PrismaClient();

async function test() {
  try {
    const profiles = await prisma.profile.findMany({ take: 1 });
    if (profiles.length === 0) {
      console.log("No profiles found.");
      return;
    }
    const userId = profiles[0].userId;
    console.log("Testing update for userId:", userId);
    
    const profile = await prisma.profile.update({
      where: { userId },
      data: { username: "test_username_" + Date.now(), onboardingCompleted: true }
    });
    console.log("Success:", profile);
  } catch (error) {
    console.error("Error:", error);
  }
}
test();
