import { pgTable, integer, text } from 'drizzle-orm/pg-core';

export const Users = pgTable('users', {
  id: integer('id').primaryKey(), // Custom ID (not SERIAL)
  codeforcesHandle: text('codeforcesHandle'),
  leetcodeHandle: text('leetcodeHandle'),
});