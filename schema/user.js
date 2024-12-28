// pages/api/db.js
import { NextApiRequest, NextApiResponse } from 'next';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

const connectionString = 'postgres://postgres:postgres@localhost:5432/drizzle';
const pool = postgres(connectionString, { max: 1 });
export const db = drizzle(pool);

export const users = db.pgTable('user', {
  id: db.text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  name: db.text('name'),
  email: db.text('email').unique(),
  emailVerified: db.timestamp('emailVerified', { mode: 'date' }),
  image: db.text('image'),
});

export const accounts = db.pgTable('account', {
  userId: db.text('userId').notNull().references(() => users.id, { onDelete: 'cascade' }),
  type: db.text('type').$type().notNull(),
  provider: db.text('provider').notNull(),
  providerAccountId: db.text('providerAccountId').notNull(),
  refresh_token: db.text('refresh_token'),
  access_token: db.text('access_token'),
  expires_at: db.integer('expires_at'),
  token_type: db.text('token_type'),
  scope: db.text('scope'),
  id_token: db.text('id_token'),
  session_state: db.text('session_state'),
});

// Define other tables (sessions, verificationTokens, authenticators) similarly...

// Example API handler
export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const usersList = await users.all();
      res.status(200).json(usersList);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch users' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
