/* eslint-disable @typescript-eslint/no-explicit-any */
import { db } from '../../../lib/db/db';
import { Users } from '../../../lib/db/schema';

// GET /api/users
export async function GET() {
  try {
    // Query all users
    const allUsers = await db.select().from(Users);

    // Return the result as JSON
    return new Response(JSON.stringify(allUsers), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

// POST /api/users
export async function POST({ request }) {
  try {
    const { id, codeforcesHandle, leetcodeHandle } = await request.json();

    // Insert a new user
    const newUser = await db
      .insert(Users)
      .values({ id, codeforcesHandle, leetcodeHandle })
      .returning();

    // Return the newly created user
    return new Response(JSON.stringify(newUser), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}