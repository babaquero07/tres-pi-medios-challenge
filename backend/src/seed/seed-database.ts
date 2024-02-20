import prisma from "../lib/prisma";

import { initialData } from "./seed";

async function main() {
  // Delete all data
  await prisma.products.deleteMany({});

  // Create products

  await prisma.products.createMany({
    data: initialData.products,
  });

  console.log("Data seeded");
}

(() => {
  if (process.env.NODE_ENV === "production") return;

  main();
})();
