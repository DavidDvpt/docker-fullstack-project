import { PrismaClient } from "@prisma/client";

const dbClient = new PrismaClient();

export default dbClient;
export type DbClientType = typeof PrismaClient;
