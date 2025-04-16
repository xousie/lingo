import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

import * as schema from "../db/schema";
import { title } from "process";

const sql = neon(process.env.DATABASE_URL!);

const db = drizzle(sql, { schema });

const main = async () => {
  try {
    console.log("Seeding database");

    await db.delete(schema.courses);
    await db.delete(schema.userProgress);

    await db.insert(schema.courses).values([
      {
        id: 1,
        title: "Spanish",
        imageSrc: "/ES.svg",
      },
      {
        id: 2,
        title: "Mandarin",
        imageSrc: "/CN.svg",
      },
      {
        id: 3,
        title: "Japanese",
        imageSrc: "/JP.svg",
      },
      {
        id: 4,
        title: "English",
        imageSrc: "/US.svg",
      },
      {
        id: 5,
        title: "Bahasa",
        imageSrc: "/ID.svg",
      },
    ]);

    console.log("Seeding finished");
  } catch (error) {
    console.error(error);
    throw new Error("Failed to seed the database");
  }
};

main();
