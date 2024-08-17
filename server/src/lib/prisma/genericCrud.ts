import { Prisma, PrismaClient } from "@prisma/client";
import dbClient from "./dbClient";

const prisma = new PrismaClient();

/**
 * Create a new record in the specified model.
 * @param model - The model name.
 * @param data - The data to create the record with.
 * @returns The created record.
 */
const createEntity = async <T extends { id: number }>(
  model: keyof PrismaClient,
  data: Prisma.Prisma__Pick<T, Exclude<keyof T, "id">>
): Promise<T> => {
  return (dbClient[model] as any).create({ data }) as Promise<T>;
};

/**
 * Read a record by its ID from the specified model.
 * @param model - The model name.
 * @param id - The ID of the record to read.
 * @returns The record if found, otherwise null.
 */
const fetchEntityById = async <T extends { id: number }>(
  model: keyof PrismaClient,
  id: number
): Promise<T | null> => {
  return (prisma[model] as any).findUnique({
    where: { id },
  }) as Promise<T | null>;
};

/**
 * Update a record by its ID in the specified model.
 * @param model - The model name.
 * @param id - The ID of the record to update.
 * @param data - The data to update the record with.
 * @returns The updated record.
 */
const updateEntity = async <T extends { id: number }>(
  model: keyof PrismaClient,
  id: number,
  data: Partial<T>
): Promise<T> => {
  return (prisma[model] as any).update({ where: { id }, data }) as Promise<T>;
};

/**
 * Delete a record by its ID from the specified model.
 * @param model - The model name.
 * @param id - The ID of the record to delete.
 * @returns The deleted record.
 */
const deleteEntity = async <T extends { id: number }>(
  model: keyof PrismaClient,
  id: number
): Promise<T> => {
  return (prisma[model] as any).delete({ where: { id } }) as Promise<T>;
};

/**
 * List all records from the specified model.
 * @param model - The model name.
 * @returns An array of records.
 */
const fetchEntitylist = async <T>(model: keyof PrismaClient): Promise<T[]> => {
  return (prisma[model] as any).findMany() as Promise<T[]>;
};

export {
  createEntity,
  deleteEntity,
  fetchEntityById,
  fetchEntitylist,
  updateEntity,
};
