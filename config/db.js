import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

const sql = neon("postgresql://neondb_owner:prqJ5RIG4Lna@ep-long-heart-a5dgkfoa.us-east-2.aws.neon.tech/neondb?sslmode=require");
export const db = drizzle({ client: sql });

