import { Role } from "../generated/enums";
import { auth } from "../../lib/auth";
import { prisma } from "../../lib/prisma";
import bcrypt from "bcrypt";

async function seedAdmin() {
  try {
    const adminData = {
      name: process.env.ADMIN_NAME as string,
      email: process.env.ADMIN_EMAIL as string,
      password: process.env.ADMIN_PASSWORD as string,
      role: Role.ADMIN,
    };

    const existingUser = await prisma.user.findUnique({
      where: {
        email: adminData.email as string,
      },
    });

    if (existingUser) {
      throw new Error("User already exists");
    }

    const signUpAdmin = await auth.api.signUpEmail({
      body: {
        name: adminData.name,
        email: adminData.email,
        password: adminData.password,
        role: adminData.role,
      },
    });
    return signUpAdmin;
  } catch (err) {
    return { error: "Admin creation failed", details: err };
  }
}

seedAdmin();
