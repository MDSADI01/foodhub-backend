import { prisma } from "./prisma";
import { Auth, betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
// If your Prisma file is located elsewhere, you can change the path
import { oAuthProxy } from "better-auth/plugins";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql", // or "mysql", "postgresql", ...etc
  }),
  baseURL: process.env.APP_URL,
  trustedOrigins: [process.env.APP_URL || "http://localhost:3000"],
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        required: true,
        input: true,
      },
      isActive: {
        type: "boolean",
        required: false,
        default: true,
        input: false,
      },
      phone: {
        type: "string",
        required: false,
        input: false,
      },
      address: {
        type: "string",
        required: false,
        input: false,
      },
      image: {
        type: "string",
        required: false,
        input: false,
      },
    },
  },
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60, // 5 minutes
    },
  },

  advanced: {
    // cookies: {
    //   session_token: {
    //     name: "session_token",
    //     attributes: {
    //       httpOnly: true,
    //       secure: true,
    //       sameSite: "none",
    //       partitioned: true,
    //     },
    //   },
    // },
    cookiePrefix: "better-auth",
    useSecureCookies: process.env.NODE_ENV === "production",
    crossSubDomainCookies: {
      enabled: false,
    },
    disableCSRFCheck: true, // Allow requests without Origin header (Postman, mobile apps, etc.)
  },
  state: {
    name: "session_token",
    attributes: {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      partitioned: true,
    },
  },
  plugins: [oAuthProxy()],
});
