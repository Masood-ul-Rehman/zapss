import { Pool } from '@neondatabase/serverless';

import { drizzle } from "drizzle-orm/neon-serverless";
import * as schema from "./schema";
const postgress = new Pool({ connectionString: `${process.env.DATABASE_URL}` });
export const db = drizzle(postgress, { schema });
