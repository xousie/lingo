import { auth } from "@clerk/nextjs/server";

const adminIds = ["user_2vaAMOdGJB4t0vw7X2UnJ5Mp6qQ"];

export const getIsAdmin = async () => {
  const { userId } = await auth();

  if (!userId) {
    return false;
  }

  return adminIds.indexOf(userId) !== -1;
};
