import { prisma } from "../lib/prisma";

const updateProfile = async (userId: string, payload: any) => {
  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: {
      phone: payload.phone,
      address: payload.address,
      image: payload.image,
    },
    select: {
      phone: true,
      address: true,
      image: true,
    },
  });

  return updatedUser;
};

export const profileService = {
  updateProfile,
};
