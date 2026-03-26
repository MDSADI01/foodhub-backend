
    import { createRequire } from 'module';
    const require = createRequire(import.meta.url);
    
    

// lib/prisma.ts
import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";

// src/generated/client.ts
import * as path from "path";
import { fileURLToPath } from "url";

// src/generated/internal/class.ts
import * as runtime from "@prisma/client/runtime/client";
var config = {
  "previewFeatures": [],
  "clientVersion": "7.3.0",
  "engineVersion": "9d6ad21cbbceab97458517b147a6a09ff43aa735",
  "activeProvider": "postgresql",
  "inlineSchema": 'generator client {\n  provider = "prisma-client"\n  output   = "../src/generated"\n}\n\ndatasource db {\n  provider = "postgresql"\n}\n\nmodel User {\n  id            String   @id @default(uuid())\n  name          String\n  email         String   @unique\n  password      String?\n  role          Role     @default(CUSTOMER)\n  isActive      Boolean  @default(true)\n  createdAt     DateTime @default(now())\n  updatedAt     DateTime @updatedAt\n  emailVerified Boolean  @default(true)\n  phone         String?  @unique\n  address       String?\n  image         String?\n\n  orders           Order[]\n  reviews          Review[]\n  accounts         Account[]\n  sessions         Session[]\n  providerProfiles ProviderProfile[]\n\n  @@index([role])\n  @@map("user")\n}\n\nmodel ProviderProfile {\n  id             String   @id @default(uuid())\n  userId         String   @unique\n  restaurantName String\n  image          String?\n  address        String?\n  phone          String?  @unique\n  description    String?\n  createdAt      DateTime @default(now())\n  updatedAt      DateTime @updatedAt\n  user           User     @relation(fields: [userId], references: [id], onDelete: Cascade)\n  meals          Meal[]\n\n  @@index([restaurantName])\n}\n\nmodel Category {\n  id          String  @id @default(uuid())\n  name        String  @unique\n  description String?\n  meals       Meal[]\n}\n\nmodel Meal {\n  id          String          @id @default(uuid())\n  providerId  String\n  categoryId  String\n  name        String\n  description String?\n  price       Float\n  imageUrl    String?\n  isAvailable Boolean         @default(true)\n  createdAt   DateTime        @default(now())\n  updatedAt   DateTime        @updatedAt\n  category    Category        @relation(fields: [categoryId], references: [id])\n  provider    ProviderProfile @relation(fields: [providerId], references: [id], onDelete: Cascade)\n  orderItems  OrderItem[]\n  reviews     Review[]\n\n  @@index([categoryId])\n  @@index([providerId])\n  @@index([isAvailable])\n}\n\nmodel Order {\n  id              String      @id @default(uuid())\n  customerId      String\n  totalPrice      Float\n  status          OrderStatus @default(PLACED)\n  deliveryAddress String\n  createdAt       DateTime    @default(now())\n  customer        User        @relation(fields: [customerId], references: [id])\n  orderItems      OrderItem[]\n\n  @@index([customerId])\n  @@index([status])\n}\n\nmodel OrderItem {\n  id       String      @id @default(uuid())\n  orderId  String\n  mealId   String\n  quantity Int         @default(1)\n  status   OrderStatus @default(PLACED)\n  price    Float\n  meal     Meal        @relation(fields: [mealId], references: [id], onDelete: Cascade)\n  order    Order       @relation(fields: [orderId], references: [id], onDelete: Cascade)\n\n  @@index([orderId])\n  @@index([mealId])\n}\n\nmodel Review {\n  id         String   @id @default(uuid())\n  mealId     String\n  customerId String\n  rating     Int\n  comment    String?\n  createdAt  DateTime @default(now())\n  customer   User     @relation(fields: [customerId], references: [id], onDelete: Cascade)\n  meal       Meal     @relation(fields: [mealId], references: [id])\n\n  @@index([customerId])\n  @@index([mealId])\n}\n\nmodel Session {\n  id        String   @id\n  expiresAt DateTime\n  token     String   @unique\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n  ipAddress String?\n  userAgent String?\n  userId    String\n  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)\n\n  @@index([userId])\n  @@map("session")\n}\n\nmodel Account {\n  id                    String    @id\n  accountId             String\n  providerId            String\n  userId                String\n  accessToken           String?\n  refreshToken          String?\n  idToken               String?\n  accessTokenExpiresAt  DateTime?\n  refreshTokenExpiresAt DateTime?\n  scope                 String?\n  password              String?\n  createdAt             DateTime  @default(now())\n  updatedAt             DateTime  @updatedAt\n  user                  User      @relation(fields: [userId], references: [id], onDelete: Cascade)\n\n  @@index([userId])\n  @@map("account")\n}\n\nmodel Verification {\n  id         String   @id\n  identifier String\n  value      String\n  expiresAt  DateTime\n  createdAt  DateTime @default(now())\n  updatedAt  DateTime @updatedAt\n\n  @@index([identifier])\n  @@map("verification")\n}\n\nenum Role {\n  ADMIN\n  CUSTOMER\n  PROVIDER\n}\n\nenum OrderStatus {\n  PLACED\n  PREPARING\n  READY\n  DELIVERED\n  CANCELLED\n}\n',
  "runtimeDataModel": {
    "models": {},
    "enums": {},
    "types": {}
  }
};
config.runtimeDataModel = JSON.parse('{"models":{"User":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"email","kind":"scalar","type":"String"},{"name":"password","kind":"scalar","type":"String"},{"name":"role","kind":"enum","type":"Role"},{"name":"isActive","kind":"scalar","type":"Boolean"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"emailVerified","kind":"scalar","type":"Boolean"},{"name":"phone","kind":"scalar","type":"String"},{"name":"address","kind":"scalar","type":"String"},{"name":"image","kind":"scalar","type":"String"},{"name":"orders","kind":"object","type":"Order","relationName":"OrderToUser"},{"name":"reviews","kind":"object","type":"Review","relationName":"ReviewToUser"},{"name":"accounts","kind":"object","type":"Account","relationName":"AccountToUser"},{"name":"sessions","kind":"object","type":"Session","relationName":"SessionToUser"},{"name":"providerProfiles","kind":"object","type":"ProviderProfile","relationName":"ProviderProfileToUser"}],"dbName":"user"},"ProviderProfile":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"restaurantName","kind":"scalar","type":"String"},{"name":"image","kind":"scalar","type":"String"},{"name":"address","kind":"scalar","type":"String"},{"name":"phone","kind":"scalar","type":"String"},{"name":"description","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"user","kind":"object","type":"User","relationName":"ProviderProfileToUser"},{"name":"meals","kind":"object","type":"Meal","relationName":"MealToProviderProfile"}],"dbName":null},"Category":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"description","kind":"scalar","type":"String"},{"name":"meals","kind":"object","type":"Meal","relationName":"CategoryToMeal"}],"dbName":null},"Meal":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"providerId","kind":"scalar","type":"String"},{"name":"categoryId","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"description","kind":"scalar","type":"String"},{"name":"price","kind":"scalar","type":"Float"},{"name":"imageUrl","kind":"scalar","type":"String"},{"name":"isAvailable","kind":"scalar","type":"Boolean"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"category","kind":"object","type":"Category","relationName":"CategoryToMeal"},{"name":"provider","kind":"object","type":"ProviderProfile","relationName":"MealToProviderProfile"},{"name":"orderItems","kind":"object","type":"OrderItem","relationName":"MealToOrderItem"},{"name":"reviews","kind":"object","type":"Review","relationName":"MealToReview"}],"dbName":null},"Order":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"customerId","kind":"scalar","type":"String"},{"name":"totalPrice","kind":"scalar","type":"Float"},{"name":"status","kind":"enum","type":"OrderStatus"},{"name":"deliveryAddress","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"customer","kind":"object","type":"User","relationName":"OrderToUser"},{"name":"orderItems","kind":"object","type":"OrderItem","relationName":"OrderToOrderItem"}],"dbName":null},"OrderItem":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"orderId","kind":"scalar","type":"String"},{"name":"mealId","kind":"scalar","type":"String"},{"name":"quantity","kind":"scalar","type":"Int"},{"name":"status","kind":"enum","type":"OrderStatus"},{"name":"price","kind":"scalar","type":"Float"},{"name":"meal","kind":"object","type":"Meal","relationName":"MealToOrderItem"},{"name":"order","kind":"object","type":"Order","relationName":"OrderToOrderItem"}],"dbName":null},"Review":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"mealId","kind":"scalar","type":"String"},{"name":"customerId","kind":"scalar","type":"String"},{"name":"rating","kind":"scalar","type":"Int"},{"name":"comment","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"customer","kind":"object","type":"User","relationName":"ReviewToUser"},{"name":"meal","kind":"object","type":"Meal","relationName":"MealToReview"}],"dbName":null},"Session":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"expiresAt","kind":"scalar","type":"DateTime"},{"name":"token","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"ipAddress","kind":"scalar","type":"String"},{"name":"userAgent","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"SessionToUser"}],"dbName":"session"},"Account":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"accountId","kind":"scalar","type":"String"},{"name":"providerId","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"accessToken","kind":"scalar","type":"String"},{"name":"refreshToken","kind":"scalar","type":"String"},{"name":"idToken","kind":"scalar","type":"String"},{"name":"accessTokenExpiresAt","kind":"scalar","type":"DateTime"},{"name":"refreshTokenExpiresAt","kind":"scalar","type":"DateTime"},{"name":"scope","kind":"scalar","type":"String"},{"name":"password","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"user","kind":"object","type":"User","relationName":"AccountToUser"}],"dbName":"account"},"Verification":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"identifier","kind":"scalar","type":"String"},{"name":"value","kind":"scalar","type":"String"},{"name":"expiresAt","kind":"scalar","type":"DateTime"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"verification"}},"enums":{},"types":{}}');
async function decodeBase64AsWasm(wasmBase64) {
  const { Buffer } = await import("buffer");
  const wasmArray = Buffer.from(wasmBase64, "base64");
  return new WebAssembly.Module(wasmArray);
}
config.compilerWasm = {
  getRuntime: async () => await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.mjs"),
  getQueryCompilerWasmModule: async () => {
    const { wasm } = await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.wasm-base64.mjs");
    return await decodeBase64AsWasm(wasm);
  },
  importName: "./query_compiler_fast_bg.js"
};
function getPrismaClientClass() {
  return runtime.getPrismaClient(config);
}

// src/generated/internal/prismaNamespace.ts
import * as runtime2 from "@prisma/client/runtime/client";
var getExtensionContext = runtime2.Extensions.getExtensionContext;
var NullTypes2 = {
  DbNull: runtime2.NullTypes.DbNull,
  JsonNull: runtime2.NullTypes.JsonNull,
  AnyNull: runtime2.NullTypes.AnyNull
};
var TransactionIsolationLevel = runtime2.makeStrictEnum({
  ReadUncommitted: "ReadUncommitted",
  ReadCommitted: "ReadCommitted",
  RepeatableRead: "RepeatableRead",
  Serializable: "Serializable"
});
var defineExtension = runtime2.Extensions.defineExtension;

// src/generated/enums.ts
var Role = {
  ADMIN: "ADMIN",
  CUSTOMER: "CUSTOMER",
  PROVIDER: "PROVIDER"
};
var OrderStatus = {
  PLACED: "PLACED",
  PREPARING: "PREPARING",
  READY: "READY",
  DELIVERED: "DELIVERED",
  CANCELLED: "CANCELLED"
};

// src/generated/client.ts
globalThis["__dirname"] = path.dirname(fileURLToPath(import.meta.url));
var PrismaClient = getPrismaClientClass();

// lib/prisma.ts
var connectionString = `${process.env.DATABASE_URL}`;
var adapter = new PrismaPg({ connectionString });
var prisma = new PrismaClient({ adapter });

// lib/auth.ts
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
var auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql"
    // or "mysql", "postgresql", ...etc
  }),
  baseURL: process.env.APP_URL,
  trustedOrigins: [process.env.APP_URL || "http://localhost:3000"],
  emailAndPassword: {
    enabled: true,
    autoSignIn: false
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        required: true,
        input: true
      },
      isActive: {
        type: "boolean",
        required: false,
        default: true,
        input: false
      },
      phone: {
        type: "string",
        required: false,
        input: false
      },
      address: {
        type: "string",
        required: false,
        input: false
      },
      image: {
        type: "string",
        required: false,
        input: false
      }
    }
  },
  advanced: {
    cookies: {
      session_token: {
        name: "session_token",
        attributes: {
          httpOnly: true,
          secure: true,
          sameSite: "none",
          partitioned: true
        }
      }
    }
  },
  state: {
    name: "session_token",
    attributes: {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      partitioned: true
    }
  }
});

// src/app/app.ts
import express2 from "express";
import { toNodeHandler } from "better-auth/node";
import cors from "cors";

// src/middleware/authorization.ts
var authorization = (...roles) => {
  return async (req, res, next) => {
    const session = await auth.api.getSession({
      headers: req.headers
    });
    if (!session) {
      return res.status(401).json({
        success: false,
        message: "You are not authorized"
      });
    }
    req.user = {
      id: session.user.id,
      email: session.user.email,
      name: session.user.name,
      role: session.user.role
    };
    if (roles.length && !roles.includes(req.user.role)) {
      return res.status(401).json({
        success: false,
        message: "Forbidden!You are not authorized to access this page"
      });
    }
    next();
  };
};

// src/provider/provider.route.ts
import { Router } from "express";

// src/provider/provider.service.ts
var createProviderProfile = async (userId, payload) => {
  const existingProfile = await prisma.providerProfile.findUnique({
    where: { userId }
  });
  if (existingProfile) {
    throw new Error("Provider profile already exists");
  }
  const user = await prisma.user.findUnique({
    where: { id: userId }
  });
  if (!user || user.role !== "PROVIDER") {
    throw new Error("Only provider users can create profile");
  }
  const result = await prisma.providerProfile.create({
    data: {
      userId,
      image: payload?.image,
      restaurantName: payload.restaurantName,
      description: payload?.description,
      address: payload?.address,
      phone: payload?.phone
    }
  });
  return result;
};
var getProviderProfile = async (userId) => {
  const providerProfile = await prisma.providerProfile.findUnique({
    where: { userId },
    include: {
      meals: {
        select: {
          name: true,
          category: {
            select: {
              name: true
            }
          }
        },
        orderBy: {
          createdAt: "desc"
        }
      }
    }
  });
  if (!providerProfile) {
    throw new Error("Provider profile not found");
  }
  return providerProfile;
};
var createMeal = async (userId, payload) => {
  const providerProfile = await prisma.providerProfile.findUnique({
    where: {
      userId
    }
  });
  if (!providerProfile) {
    throw new Error("Provider profile not found");
  }
  const category = await prisma.category.findUnique({
    where: {
      name: payload.category
    },
    select: {
      id: true
    }
  });
  if (!category) {
    throw new Error("Category not found");
  }
  const result = await prisma.meal.create({
    data: {
      name: payload.name,
      description: payload.description,
      price: Number(payload.price),
      imageUrl: payload.imageUrl,
      categoryId: category.id,
      providerId: providerProfile.id
    }
  });
  return result;
};
var getMealsByProvider = async (providerId) => {
  const providerProfile = await prisma.providerProfile.findUnique({
    where: { userId: providerId }
  });
  if (!providerProfile) {
    throw new Error("Provider profile not found");
  }
  const meals = await prisma.meal.findMany({
    where: { providerId: providerProfile.id },
    include: {
      category: {
        select: { name: true }
      }
    },
    orderBy: {
      createdAt: "desc"
    }
  });
  return meals;
};
var updateMeal = async (userId, mealId, payload) => {
  const providerProfile = await prisma.providerProfile.findUnique({
    where: { userId }
  });
  if (!providerProfile) {
    throw new Error("Provider profile not found");
  }
  const existingMeal = await prisma.meal.findUnique({
    where: { id: mealId }
  });
  if (!existingMeal) {
    throw new Error("Meal not found");
  }
  if (existingMeal.providerId !== providerProfile.id) {
    throw new Error("Unauthorized! You are not allowed to update this meal");
  }
  const updatedMeal = await prisma.meal.update({
    where: { id: mealId },
    data: {
      name: payload.name ?? existingMeal.name,
      description: payload.description ?? existingMeal.description,
      price: payload.price ? Number(payload.price) : existingMeal.price,
      imageUrl: payload.imageUrl ?? existingMeal.imageUrl,
      isAvailable: payload.isAvailable !== void 0 ? payload.isAvailable : existingMeal.isAvailable
    }
  });
  return updatedMeal;
};
var deleteMeal = async (userId, mealId) => {
  const providerProfile = await prisma.providerProfile.findUnique({
    where: { userId }
  });
  if (!providerProfile) {
    throw new Error("Provider profile not found");
  }
  const meal = await prisma.meal.findUnique({
    where: { id: mealId }
  });
  if (!meal) {
    throw new Error("Meal not found");
  }
  if (meal.providerId !== providerProfile.id) {
    throw new Error("Unauthorized action");
  }
  const result = await prisma.meal.delete({
    where: { id: mealId }
  });
  return result;
};
var getProviderOrders = async (userId) => {
  const providerProfile = await prisma.providerProfile.findUnique({
    where: { userId }
  });
  if (!providerProfile) {
    throw new Error("Provider profile not found");
  }
  return prisma.order.findMany({
    where: {
      orderItems: {
        some: {
          meal: {
            providerId: providerProfile.id
          }
        }
      }
    },
    include: {
      customer: {
        select: { name: true }
      },
      orderItems: {
        where: {
          meal: {
            providerId: providerProfile.id
          }
        },
        include: {
          meal: {
            select: { name: true, price: true }
          }
        }
      }
    },
    orderBy: { createdAt: "desc" }
  });
};
var updateMainOrderStatus = async (orderId) => {
  const items = await prisma.orderItem.findMany({
    where: { orderId }
  });
  const allDelivered = items.every((i) => i.status === "DELIVERED");
  const anyPreparing = items.some((i) => i.status === "PREPARING");
  const anyCancelled = items.some((i) => i.status === "CANCELLED");
  let status = "PLACED";
  if (allDelivered) status = "DELIVERED";
  else if (anyPreparing) status = "PREPARING";
  else if (anyCancelled) status = "CANCELLED";
  await prisma.order.update({
    where: { id: orderId },
    data: { status }
  });
};
var updateOrderItemStatus = async (userId, orderItemId, status) => {
  const providerProfile = await prisma.providerProfile.findUnique({
    where: { userId }
  });
  if (!providerProfile) {
    throw new Error("Provider profile not found");
  }
  const orderItem = await prisma.orderItem.findUnique({
    where: { id: orderItemId },
    include: { meal: true }
  });
  if (!orderItem) {
    throw new Error("Order item not found");
  }
  if (orderItem.meal.providerId !== providerProfile.id) {
    throw new Error("Unauthorized");
  }
  const updated = await prisma.orderItem.update({
    where: { id: orderItemId },
    data: { status }
  });
  await updateMainOrderStatus(orderItem.orderId);
  return updated;
};
var providerService = {
  createMeal,
  createProviderProfile,
  updateMeal,
  deleteMeal,
  getProviderProfile,
  getMealsByProvider,
  getProviderOrders,
  updateOrderItemStatus
};

// src/provider/provider.controller.ts
var createProviderProfile2 = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "Unauthorized"
      });
    }
    const result = await providerService.createProviderProfile(userId, req.body);
    res.status(201).json({
      success: true,
      message: "Provider Profile created successfully",
      data: result
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message
    });
  }
};
var getProviderProfile2 = async (req, res) => {
  try {
    const userId = req.user?.id;
    const result = await providerService.getProviderProfile(userId);
    res.status(200).json({
      success: true,
      message: "Provider dashboard data retrieved successfully",
      data: result
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};
var createMeal2 = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "Unauthorized"
      });
    }
    const result = await providerService.createMeal(userId, req.body);
    res.status(201).json({
      success: true,
      message: "Meal created successfully",
      data: result
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message
    });
  }
};
var getMealsByProvider2 = async (req, res) => {
  try {
    const providerId = req.user?.id;
    const meals = await providerService.getMealsByProvider(providerId);
    return res.status(200).json({ success: true, data: meals });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message || "Failed to fetch meals" });
  }
};
var updateMeal2 = async (req, res) => {
  try {
    const userId = req.user?.id;
    const mealId = req.params.id;
    const payload = req.body;
    const result = await providerService.updateMeal(
      userId,
      mealId,
      payload
    );
    res.status(200).json({
      success: true,
      message: "Meal updated successfully",
      data: result
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};
var deleteMeal2 = async (req, res) => {
  try {
    const userId = req.user?.id;
    const mealId = req.params.id;
    const result = await providerService.deleteMeal(userId, mealId);
    res.status(200).json({
      success: true,
      message: "Meal deleted successfully"
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};
var getProviderOrders2 = async (req, res) => {
  try {
    const userId = req.user?.id;
    const result = await providerService.getProviderOrders(userId);
    res.status(200).json({
      success: true,
      message: "Orders retrieved successfully",
      data: result
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};
var updateOrderItemStatus2 = async (req, res) => {
  try {
    const userId = req.user?.id;
    const orderItemId = req.params.id;
    const { status } = req.body;
    const result = await providerService.updateOrderItemStatus(
      userId,
      orderItemId,
      status
    );
    res.status(200).json({
      success: true,
      message: "Order item status updated",
      data: result
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};
var providerController = {
  createMeal: createMeal2,
  createProviderProfile: createProviderProfile2,
  updateMeal: updateMeal2,
  deleteMeal: deleteMeal2,
  getProviderProfile: getProviderProfile2,
  getMealsByProvider: getMealsByProvider2,
  getProviderOrders: getProviderOrders2,
  updateOrderItemStatus: updateOrderItemStatus2
};

// src/provider/provider.route.ts
var router = Router();
router.post(
  "/meals",
  authorization(Role.PROVIDER),
  providerController.createMeal
);
router.get(
  "/profile",
  authorization(Role.PROVIDER),
  providerController.getProviderProfile
);
router.get(
  "/meals",
  authorization(Role.PROVIDER),
  providerController.getMealsByProvider
);
router.post(
  "/profile",
  authorization(Role.PROVIDER),
  providerController.createProviderProfile
);
router.put(
  "/meals/:id",
  authorization(Role.PROVIDER),
  providerController.updateMeal
);
router.delete(
  "/meals/:id",
  authorization(Role.PROVIDER),
  providerController.deleteMeal
);
router.get(
  "/orders",
  authorization(Role.PROVIDER),
  providerController.getProviderOrders
);
router.patch(
  "/orders/:id",
  authorization(Role.PROVIDER),
  providerController.updateOrderItemStatus
);
var providerRoutes = router;

// src/meal/meal.route.ts
import { Router as Router2 } from "express";

// src/meal/meal.service.ts
var getAllMeals = async () => {
  const result = await prisma.meal.findMany();
  return result;
};
var getMealsById = async (mealId) => {
  if (!mealId) {
    throw new Error("Meal ID is required");
  }
  const result = await prisma.meal.findFirst({
    where: {
      id: mealId
    },
    include: {
      provider: {
        select: {
          restaurantName: true
        }
      }
    }
  });
  return result;
};
var mealService = {
  getAllMeals,
  getMealsById
};

// src/meal/meal.controller.ts
var getAllMeals2 = async (req, res) => {
  try {
    const result = await mealService.getAllMeals();
    res.status(200).json({
      success: true,
      data: result
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};
var getMealsById2 = async (req, res) => {
  try {
    const mealId = req.params.id;
    const result = await mealService.getMealsById(mealId);
    res.status(200).json({
      success: true,
      data: result
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};
var mealController = {
  getAllMeals: getAllMeals2,
  getMealsById: getMealsById2
};

// src/meal/meal.route.ts
var router2 = Router2();
router2.get("/", mealController.getAllMeals);
router2.get("/:id", mealController.getMealsById);
var mealRoutes = router2;

// src/order/order.route.ts
import { Router as Router3 } from "express";

// src/order/order.service.ts
var createOrder = async (customerId, payload) => {
  const { items, deliveryAddress } = payload;
  if (!deliveryAddress) {
    throw new Error("Delivery address is required");
  }
  if (!items || items.length === 0) {
    throw new Error("Order must contain at least one meal");
  }
  const mealIds = items.map((item) => item.mealId);
  const meals = await prisma.meal.findMany({
    where: {
      id: { in: mealIds },
      isAvailable: true
    }
  });
  if (meals.length !== mealIds.length) {
    throw new Error("One or more meals are unavailable");
  }
  let totalPrice = 0;
  const orderItemsData = items.map((item) => {
    const meal = meals.find((m) => m.id === item.mealId);
    if (!meal) {
      throw new Error("Meal not found");
    }
    const itemTotal = meal.price * item.quantity;
    totalPrice += itemTotal;
    return {
      mealId: meal.id,
      quantity: item.quantity,
      price: meal.price
    };
  });
  const order = await prisma.order.create({
    data: {
      customerId,
      totalPrice,
      deliveryAddress,
      status: OrderStatus.PLACED,
      orderItems: {
        create: orderItemsData
      }
    },
    include: {
      orderItems: {
        include: {
          meal: true
        }
      }
    }
  });
  return order;
};
var getCustomerOrders = async (customerId) => {
  return prisma.order.findMany({
    where: { customerId },
    include: {
      orderItems: {
        include: {
          meal: true
        }
      }
    },
    orderBy: { createdAt: "desc" }
  });
};
var getOrderById = async (customerId, orderId) => {
  const order = await prisma.order.findFirst({
    where: {
      id: orderId,
      customerId
    },
    include: {
      orderItems: {
        include: {
          meal: true
        }
      }
    }
  });
  if (!order) {
    throw new Error("Order not found");
  }
  return order;
};
var getAllOrders = async () => {
  const result = prisma.order.findMany({
    include: {
      orderItems: {
        include: {
          meal: true
        }
      },
      customer: {
        select: {
          name: true
        }
      }
    },
    orderBy: {
      createdAt: "desc"
    }
  });
  return result;
};
var orderService = {
  createOrder,
  getCustomerOrders,
  getOrderById,
  getAllOrders
};

// src/order/order.controller.ts
var createOrder2 = async (req, res) => {
  try {
    const customerId = req.user?.id;
    const result = await orderService.createOrder(
      customerId,
      req.body
    );
    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      data: result
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};
var getCustomerOrders2 = async (req, res) => {
  try {
    const customerId = req.user?.id;
    const result = await orderService.getCustomerOrders(customerId);
    res.status(200).json({
      success: true,
      data: result
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};
var getOrderById2 = async (req, res) => {
  try {
    const customerId = req.user?.id;
    const id = req.params.id;
    const result = await orderService.getOrderById(customerId, id);
    res.status(200).json({
      success: true,
      data: result
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message
    });
  }
};
var getAllOrders2 = async (req, res) => {
  try {
    const result = await orderService.getAllOrders();
    res.status(200).json({
      success: true,
      data: result
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};
var orderController = {
  createOrder: createOrder2,
  getCustomerOrders: getCustomerOrders2,
  getOrderById: getOrderById2,
  getAllOrders: getAllOrders2
};

// src/order/order.route.ts
var router3 = Router3();
router3.post("/", authorization(Role.CUSTOMER), orderController.createOrder);
router3.get(
  "/",
  authorization(Role.CUSTOMER),
  orderController.getCustomerOrders
);
router3.get("/all", authorization(Role.ADMIN), orderController.getAllOrders);
router3.get("/:id", authorization(Role.CUSTOMER), orderController.getOrderById);
var orderRoutes = router3;

// src/getProviders/getProv.route.ts
import { Router as Router4 } from "express";

// src/getProviders/getProv.service.ts
var getAllProviders = async () => {
  const result = await prisma.providerProfile.findMany();
  return result;
};
var getProviderWithMenu = async (providerId) => {
  if (!providerId) {
    throw new Error("Provider ID is required");
  }
  const result = await prisma.providerProfile.findFirst({
    where: {
      id: providerId
    }
  });
  return result;
};
var getProviderService = {
  getAllProviders,
  getProviderWithMenu
};

// src/getProviders/getProv.controller.ts
var getAllProviders2 = async (req, res) => {
  try {
    const result = await getProviderService.getAllProviders();
    res.status(200).json({
      success: true,
      data: result
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};
var getProvidersWithMenu = async (req, res) => {
  try {
    const providerId = req.params.id;
    const result = await getProviderService.getProviderWithMenu(providerId);
    res.status(200).json({
      success: true,
      data: result
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};
var getProviderController = {
  getAllProviders: getAllProviders2,
  getProvidersWithMenu
};

// src/getProviders/getProv.route.ts
var router4 = Router4();
router4.get("/", getProviderController.getAllProviders);
router4.get("/:id", getProviderController.getProvidersWithMenu);
var getProviderRoutes = router4;

// src/categories/categories.route.ts
import { Router as Router5 } from "express";

// src/categories/categories.service.ts
var createCategory = async (payload) => {
  const result = await prisma.category.create({
    data: {
      name: payload.name,
      description: payload.description
    }
  });
  return result;
};
var getAllCategories = async () => {
  const result = await prisma.category.findMany();
  return result;
};
var deleteCategory = async (categoryId) => {
  const category = await prisma.category.findUnique({
    where: {
      id: categoryId
    }
  });
  if (!category) {
    throw new Error("Category not found");
  }
  const result = await prisma.category.delete({
    where: { id: categoryId }
  });
  return result;
};
var categoryService = {
  createCategory,
  getAllCategories,
  deleteCategory
};

// src/categories/categories.controller.ts
var createCategory2 = async (req, res) => {
  try {
    const result = await categoryService.createCategory(req.body);
    res.status(201).json({
      message: "Category created successfully",
      details: result
    });
  } catch (err) {
    res.status(400).json({ error: "Category creation failed", details: err });
  }
};
var getAllCategory = async (req, res) => {
  try {
    const result = await categoryService.getAllCategories();
    res.json({
      message: "Category retrieved successfully",
      data: result
    });
  } catch (err) {
    res.status(400).json({ error: "Delete failed", details: err });
  }
};
var deleteCategory2 = async (req, res) => {
  const categoryId = req.params.id;
  try {
    const result = await categoryService.deleteCategory(categoryId);
    res.json({ message: "Category deleted successfully" });
  } catch (err) {
    res.status(400).json({ error: "Delete failed", details: err });
  }
};
var categoryController = {
  createCategory: createCategory2,
  deleteCategory: deleteCategory2,
  getAllCategory
};

// src/categories/categories.route.ts
var router5 = Router5();
router5.post("/", authorization(Role.ADMIN), categoryController.createCategory);
router5.get(
  "/",
  authorization(Role.ADMIN, Role.PROVIDER),
  categoryController.getAllCategory
);
router5.delete(
  "/:id",
  authorization(Role.ADMIN),
  categoryController.deleteCategory
);
var categoryRoutes = router5;

// src/admin/admin.route.ts
import { Router as Router6 } from "express";

// src/admin/admin.service.ts
var getAllUsers = async () => {
  const result = await prisma.user.findMany({
    where: {
      role: {
        not: "ADMIN"
      }
    }
  });
  return result;
};
var updateUserStatus = async (userId, isActive) => {
  if (!userId) {
    throw new Error("User ID is required");
  }
  const result = await prisma.user.update({
    where: {
      id: userId
    },
    data: {
      isActive
    }
  });
  return result;
};
var adminService = {
  getAllUsers,
  updateUserStatus
};

// src/admin/admin.controller.ts
var getAllUsers2 = async (req, res) => {
  try {
    const users = await adminService.getAllUsers();
    res.status(200).json({ success: true, data: users });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};
var updateUserStatus2 = async (req, res) => {
  try {
    const userId = req.params?.id;
    const { isActive } = req.body;
    if (typeof isActive !== "boolean") {
      return res.status(400).json({ success: false, message: "isActive must be boolean" });
    }
    const user = await adminService.updateUserStatus(userId, isActive);
    res.status(200).json({ success: true, data: user });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};
var adminController = {
  getAllUsers: getAllUsers2,
  updateUserStatus: updateUserStatus2
};

// src/admin/admin.route.ts
var router6 = Router6();
router6.get("/users", authorization(Role.ADMIN), adminController.getAllUsers);
router6.patch("/users/:id", authorization(Role.ADMIN), adminController.updateUserStatus);
var adminRoutes = router6;

// src/review/review.route.ts
import { Router as Router7 } from "express";

// src/review/review.service.ts
var createReview = async (customerId, payload) => {
  const { mealId, rating, comment } = payload;
  if (rating < 1 || rating > 5) {
    throw new Error("Rating must be between 1 and 5");
  }
  const meal = await prisma.meal.findUnique({
    where: {
      id: mealId
    }
  });
  if (!meal) {
    throw new Error("Meal not found");
  }
  const result = await prisma.review.create({
    data: {
      rating,
      comment,
      customerId,
      mealId
    }
  });
  return result;
};
var getAllReviews = async () => {
  const result = await prisma.review.findMany({
    include: {
      customer: {
        select: {
          name: true
        }
      },
      meal: {
        select: {
          name: true
        }
      }
    }
  });
  return result;
};
var getMyReviews = async (customerId) => {
  const result = await prisma.user.findUnique({
    where: {
      id: customerId
    },
    select: {
      reviews: {
        include: {
          meal: {
            select: {
              name: true
            }
          }
        },
        orderBy: {
          createdAt: "desc"
        }
      }
    }
  });
  return result?.reviews;
};
var deleteReview = async (customerId, reviewId, role) => {
  const review = await prisma.review.findUnique({
    where: {
      id: reviewId
    }
  });
  if (!review) {
    throw new Error("Review not found");
  }
  if (role !== Role.ADMIN && review.customerId !== customerId) {
    throw new Error("You are not allowed to delete this review");
  }
  const result = await prisma.review.delete({
    where: {
      id: reviewId
    }
  });
  return result;
};
var getReviewsByMealId = async (mealId) => {
  const meal = await prisma.meal.findUnique({
    where: { id: mealId }
  });
  if (!meal) {
    throw new Error("Meal not found");
  }
  const reviews = await prisma.review.findMany({
    where: { mealId },
    include: {
      customer: {
        select: { name: true }
      }
    },
    orderBy: {
      createdAt: "desc"
    }
  });
  return reviews;
};
var reviewService = {
  createReview,
  getAllReviews,
  getMyReviews,
  deleteReview,
  getReviewsByMealId
};

// src/review/review.controller.ts
var createReview2 = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "Unauthorized"
      });
    }
    const result = await reviewService.createReview(userId, req.body);
    res.status(201).json({
      success: true,
      message: "Review created successfully",
      data: result
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message
    });
  }
};
var getAllReviews2 = async (req, res) => {
  try {
    const result = await reviewService.getAllReviews();
    res.status(200).json({
      success: true,
      data: result
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};
var getMyReviews2 = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "Unauthorized"
      });
    }
    const result = await reviewService.getMyReviews(userId);
    res.status(200).json({
      success: true,
      data: result
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};
var deleteReview2 = async (req, res) => {
  try {
    const userId = req.user?.id;
    const role = req.user?.role;
    const reviewId = req.params.id;
    const result = await reviewService.deleteReview(userId, reviewId, role);
    res.status(200).json({
      success: true,
      message: "Review deleted successfully"
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};
var getReviewsByMealId2 = async (req, res) => {
  try {
    const mealId = req.params.id;
    if (!mealId) {
      return res.status(400).json({
        success: false,
        message: "mealId is required"
      });
    }
    const reviews = await reviewService.getReviewsByMealId(mealId);
    res.status(200).json({
      success: true,
      data: reviews
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Something went wrong"
    });
  }
};
var reviewController = {
  createReview: createReview2,
  getAllReviews: getAllReviews2,
  getMyReviews: getMyReviews2,
  deleteReview: deleteReview2,
  getReviewsByMealId: getReviewsByMealId2
};

// src/review/review.route.ts
var router7 = Router7();
router7.post("/", authorization(Role.CUSTOMER), reviewController.createReview);
router7.get("/", reviewController.getAllReviews);
router7.get("/own", authorization(Role.CUSTOMER), reviewController.getMyReviews);
router7.get("/meals/:id", authorization(), reviewController.getReviewsByMealId);
router7.delete(
  "/:id",
  authorization(Role.CUSTOMER, Role.ADMIN),
  reviewController.deleteReview
);
var reviewRouter = router7;

// src/manageProfile/profile.route.ts
import express from "express";

// src/manageProfile/profile.service.ts
var updateProfile = async (userId, payload) => {
  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: {
      phone: payload.phone,
      address: payload.address,
      image: payload.image
    },
    select: {
      phone: true,
      address: true,
      image: true
    }
  });
  return updatedUser;
};
var profileService = {
  updateProfile
};

// src/manageProfile/profile.controller.ts
var updateProfile2 = async (req, res) => {
  try {
    const userId = req.user?.id;
    const data = req.body;
    const { phone, address, image } = req.body;
    const updatedUser = await profileService.updateProfile(userId, data);
    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: updatedUser
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Something went wrong"
    });
  }
};
var profileController = {
  updateProfile: updateProfile2
};

// src/manageProfile/profile.route.ts
var router8 = express.Router();
router8.patch(
  "/",
  authorization(Role.CUSTOMER, Role.PROVIDER),
  profileController.updateProfile
);
var profileRoute = router8;

// src/app/app.ts
var app = express2();
app.use(
  cors({
    origin: process.env.APP_URL || "http://localhost:3000",
    credentials: true
  })
);
app.use(express2.json());
app.get("/", (req, res) => {
  res.send("Hello FoodyVerse");
});
app.all("/api/auth/*splat", toNodeHandler(auth));
app.use("/api/provider", providerRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/meals", mealRoutes);
app.use("/api/providers", getProviderRoutes);
app.use("/api/reviews", reviewRouter);
app.use("/api/profile", profileRoute);
var app_default = app;

// src/server/server.ts
var PORT = process.env.PORT || 8e3;
async function main() {
  try {
    await prisma.$connect();
    console.log("Connected to database Successfully");
    app_default.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("An error occurred", err);
    await prisma.$disconnect();
    process.exit(1);
  }
}
main();
//# sourceMappingURL=server.js.map