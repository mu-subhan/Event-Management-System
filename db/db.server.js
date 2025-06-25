const { PrismaClient } = require("@prisma/client");
const prisma = global.prisma || new PrismaClient();
const path = require("path");

// 🛠 Set Prisma engine binary path if running from a .exe built with pkg
if (process.pkg) {
  console.log("if condiotin run !");
  process.env.PRISMA_QUERY_ENGINE_BINARY = path.join(
    __dirname,
    "../node_modules/.prisma/client/query-engine-windows.exe"
  );
}

if (process.env.NODE_ENV !== "production") {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
}

module.exports = prisma;
