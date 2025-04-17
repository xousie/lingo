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
    await db.delete(schema.units);
    await db.delete(schema.lessons);
    await db.delete(schema.challenges);
    await db.delete(schema.challengeOptions);
    await db.delete(schema.challengeProgress);

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

    await db.insert(schema.units).values([
      {
        id: 1,
        courseId: 1,
        title: "Unit 1",
        description: "Learn the basic of spanish",
        order: 1,
      },
    ]);

    await db.insert(schema.lessons).values([
      {
        id: 1,
        unitId: 1, // unit/chapter 1 learn basic spanish
        title: "Nouns",
        order: 1,
      },
      {
        id: 2,
        unitId: 1, // unit/chapter 1 learn basic spanish
        title: "Verbs",
        order: 2,
      },
      {
        id: 3,
        unitId: 1, // unit/chapter 1 learn basic spanish
        title: "Verbs",
        order: 3,
      },
      {
        id: 4,
        unitId: 1, // unit/chapter 1 learn basic spanish
        title: "Verbs",
        order: 4,
      },
      {
        id: 5,
        unitId: 1, // unit/chapter 1 learn basic spanish
        title: "Verbs",
        order: 5,
      },
    ]);

    await db.insert(schema.challenges).values([
      {
        id: 1,
        lessonId: 1, // Nouns
        type: "SELECT",
        question: 'Which one of these is the "the man"?',
        order: 1,
      },
    ]);

    await db.insert(schema.challengeOptions).values([
      {
        id: 1,
        challengeId: 1, // Nouns
        correct: true,
        text: "el ombre",
        imageSrc: "/man.svg",
        audioSrc: "/es_man.mp3",
      },
      {
        id: 2,
        challengeId: 1, // Nouns
        correct: false,
        text: "la mujer",
        imageSrc: "/woman.svg",
        audioSrc: "/es_woman.mp3",
      },
      {
        id: 3,
        challengeId: 1, // Nouns
        correct: false,
        text: "el robot",
        imageSrc: "/robot.svg",
        audioSrc: "/es_robot.mp3",
      },
    ]);

    console.log("Seeding finished");
  } catch (error) {
    console.error(error);
    throw new Error("Failed to seed the database");
  }
};

main();
