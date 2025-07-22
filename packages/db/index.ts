import { PrismaClient, $Enums } from "./generated/prisma/client";
export const db = new PrismaClient();

export { $Enums };
