import { prisma } from "../lib/prisma";

const getAllProviders = async () => {
  const result = await prisma.providerProfile.findMany();

  return result;
};

const getProviderWithMenu = async (providerId: string) => {
  if (!providerId) {
    throw new Error("Provider ID is required");
  }

  const result = await prisma.providerProfile.findFirst({
    where: {
      id: providerId,
    },
  });

  return result;
};

export const getProviderService = {
  getAllProviders,
  getProviderWithMenu,
};
