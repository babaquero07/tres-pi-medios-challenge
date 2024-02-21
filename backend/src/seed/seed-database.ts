import prisma from "../lib/prisma";

import { initialData } from "./seed";

async function main() {
  // Delete all data
  await prisma.sales.deleteMany({});
  await prisma.users.deleteMany({});
  await prisma.roles.deleteMany({});
  await prisma.products.deleteMany({});

  // Create products
  await prisma.products.createMany({
    data: initialData.products,
  });

  // Create role
  await prisma.roles.createMany({
    data: initialData.roles,
  });

  // Create user
  await prisma.users.createMany({
    data: initialData.users,
  });

  console.log("Data seeded");
}

(() => {
  if (process.env.NODE_ENV === "production") return;

  main();
})();
