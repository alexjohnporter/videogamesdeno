// import { PrismaClient } from './generated/client/deno/edge.ts'
import { load } from "jsr:@std/dotenv";

const envVars = await load();

// const prisma = new PrismaClient({
//   datasources: {
//     db: {
//       url: envVars.DATABASE_URL,
//     },
//   },
// });

// export {prisma};

import { Client } from "https://deno.land/x/postgres/mod.ts";

const client = new Client(envVars.DATABASE_URL);

export { client }; 