import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

import * as schema from "../db/schema";

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
    await db.delete(schema.userSubscription);

    // penomeran id jika kursus dengan id 1 maka unit=10, lesson=100, challanges=1000
    // Judul Kursus
    await db.insert(schema.courses).values([
      {
        id: 1,
        title: "Bahasa Inggris",
        imageSrc: "/english/en.svg",
      },
    ]);

    // Unit atau Bab Kursus
    await db.insert(schema.units).values([
      {
        id: 10,
        courseId: 1, // English
        title: "Bab 1",
        description:
          'Belajar Bahasa Inggris dengan Steve, Edisi Spesial "Lava Chicken"',
        order: 1,
      },
    ]);

    // Topik dari Bab Kursus
    await db.insert(schema.lessons).values([
      // ada 3 topik untuk bab 1 (yang bentuknya bulet dibawah bab)
      {
        id: 100,
        unitId: 1,
        order: 1,
        title: "Kata",
      },
      {
        id: 101,
        unitId: 1,
        order: 2,
        title: "Kalimat",
      },
      {
        id: 102,
        unitId: 1,
        order: 3,
        title: "Kata and Kalimat",
      },
    ]);

    // Soal
    await db.insert(schema.challenges).values([
      // Kata
      {
        id: 1000,
        lessonId: 1,
        type: "SELECT", // SELECT or ASSIST
        order: 1,
        question: 'Kata yang memiliki arti yang sama dengan "Lahar"',
      },
      {
        id: 1001,
        lessonId: 1,
        type: "SELECT",
        order: 2,
        question: 'Kata yang memiliki arti yang sama dengan "Lepaskan!"',
      },
      {
        id: 1002,
        lessonId: 1,
        type: "SELECT",
        order: 3,
        question: 'Kata yang memiliki arti yang sama dengan "Ayam"',
      },
      {
        id: 1003,
        lessonId: 1,
        type: "SELECT",
        order: 4,
        question: 'Kata yang memiliki arti yang sama dengan ""',
      },
      {
        id: 1004,
        lessonId: 1,
        type: "SELECT",
        order: 5,
        question: 'Kata yang memiliki arti yang sama dengan "Lahar"',
      },

      // Sentence
      {
        id: 1005, // id tetap lanjut
        lessonId: 2, // lesson baru
        type: "ASSIST",
        order: 1, // Order mengulang jika topik baru
        question: "",
      },
      {
        id: 1006,
        lessonId: 2,
        type: "ASSIST",
        order: 2,
        question: "",
      },
      {
        id: 1007,
        lessonId: 2,
        type: "ASSIST",
        order: 3,
        question: "",
      },
      {
        id: 1008,
        lessonId: 2,
        type: "ASSIST",
        order: 4,
        question: "",
      },
      {
        id: 1009,
        lessonId: 2,
        type: "ASSIST",
        order: 5,
        question: "",
      },

      // Words and Sentences
      {
        id: 1010,
        lessonId: 3,
        type: "SELECT",
        order: 1,
        question: "",
      },
      {
        id: 10011,
        lessonId: 3,
        type: "ASSIST",
        order: 2,
        question: "",
      },
      {
        id: 1012,
        lessonId: 3,
        type: "SELECT",
        order: 3,
        question: "",
      },
      {
        id: 1013,
        lessonId: 3,
        type: "ASSIST",
        order: 4,
        question: "",
      },
      {
        id: 1014,
        lessonId: 3,
        type: "SELECT",
        order: 5,
        question: "",
      },
    ]);

    // Pilihan
    await db.insert(schema.challengeOptions).values([
      // Topik 1 Word
      // Soal 1 = ""
      {
        challengeId: 1000,
        imageSrc: "/.svg",
        correct: true,
        text: "",
        audioSrc: "/.mp3",
      },
      {
        challengeId: 1000,
        imageSrc: "/.svg",
        correct: false,
        text: "",
        audioSrc: "/.mp3",
      },
      {
        challengeId: 1000,
        imageSrc: "/.svg",
        correct: false,
        text: "",
        audioSrc: "/.mp3",
      },

      // Soal 2 = ""
      {
        challengeId: 1001,
        imageSrc: "/.svg",
        correct: true,
        text: "",
        audioSrc: "/.mp3",
      },
      {
        challengeId: 1001,
        imageSrc: "/.svg",
        correct: false,
        text: "",
        audioSrc: "/.mp3",
      },
      {
        challengeId: 1001,
        imageSrc: "/.svg",
        correct: false,
        text: "",
        audioSrc: "/.mp3",
      },

      // Soal 3 = ""
      {
        challengeId: 1002,
        imageSrc: "/.svg",
        correct: true,
        text: "",
        audioSrc: "/.mp3",
      },
      {
        challengeId: 1002,
        imageSrc: "/.svg",
        correct: false,
        text: "",
        audioSrc: "/.mp3",
      },
      {
        challengeId: 1002,
        imageSrc: "/.svg",
        correct: false,
        text: "",
        audioSrc: "/.mp3",
      },

      // Soal 4 = ""
      {
        challengeId: 1003,
        imageSrc: "/.svg",
        correct: true,
        text: "",
        audioSrc: "/.mp3",
      },
      {
        challengeId: 1003,
        imageSrc: "/.svg",
        correct: false,
        text: "",
        audioSrc: "/.mp3",
      },
      {
        challengeId: 1003,
        imageSrc: "/.svg",
        correct: false,
        text: "",
        audioSrc: "/.mp3",
      },

      // Soal 5 = ""
      {
        challengeId: 1004,
        imageSrc: "/.svg",
        correct: true,
        text: "",
        audioSrc: "/.mp3",
      },
      {
        challengeId: 1004,
        imageSrc: "/.svg",
        correct: false,
        text: "",
        audioSrc: "/.mp3",
      },
      {
        challengeId: 1004,
        imageSrc: "/.svg",
        correct: false,
        text: "",
        audioSrc: "/.mp3",
      },
    ]);

    await db.insert(schema.challengeOptions).values([
      // Topik 2 Sentence !!ASSIST menggunakan gambar yg sama tapi gambar yang jawabannya benar
      // Soal 1 = ""
      {
        challengeId: 1000,
        imageSrc: "/.svg",
        correct: true,
        text: "",
        audioSrc: "/.mp3",
      },
      {
        challengeId: 1000,
        imageSrc: "/.svg",
        correct: false,
        text: "",
        audioSrc: "/.mp3",
      },
      {
        challengeId: 1000,
        imageSrc: "/.svg",
        correct: false,
        text: "",
        audioSrc: "/.mp3",
      },

      // Soal 2 = ""
      {
        challengeId: 1001,
        imageSrc: "/.svg",
        correct: true,
        text: "",
        audioSrc: "/.mp3",
      },
      {
        challengeId: 1001,
        imageSrc: "/.svg",
        correct: false,
        text: "",
        audioSrc: "/.mp3",
      },
      {
        challengeId: 1001,
        imageSrc: "/.svg",
        correct: false,
        text: "",
        audioSrc: "/.mp3",
      },

      // Soal 3 = ""
      {
        challengeId: 1002,
        imageSrc: "/.svg",
        correct: true,
        text: "",
        audioSrc: "/.mp3",
      },
      {
        challengeId: 1002,
        imageSrc: "/.svg",
        correct: false,
        text: "",
        audioSrc: "/.mp3",
      },
      {
        challengeId: 1002,
        imageSrc: "/.svg",
        correct: false,
        text: "",
        audioSrc: "/.mp3",
      },

      // Soal 4 = ""
      {
        challengeId: 1003,
        imageSrc: "/.svg",
        correct: true,
        text: "",
        audioSrc: "/.mp3",
      },
      {
        challengeId: 1003,
        imageSrc: "/.svg",
        correct: false,
        text: "",
        audioSrc: "/.mp3",
      },
      {
        challengeId: 1003,
        imageSrc: "/.svg",
        correct: false,
        text: "",
        audioSrc: "/.mp3",
      },

      // Soal 5 = ""
      {
        challengeId: 1004,
        imageSrc: "/.svg",
        correct: true,
        text: "",
        audioSrc: "/.mp3",
      },
      {
        challengeId: 1004,
        imageSrc: "/.svg",
        correct: false,
        text: "",
        audioSrc: "/.mp3",
      },
      {
        challengeId: 1004,
        imageSrc: "/.svg",
        correct: false,
        text: "",
        audioSrc: "/.mp3",
      },
    ]);

    await db.insert(schema.challengeOptions).values([
      // Topik 3 Sentence
      // Soal 1 = ""
      {
        challengeId: 1000,
        imageSrc: "/.svg",
        correct: true,
        text: "",
        audioSrc: "/.mp3",
      },
      {
        challengeId: 1000,
        imageSrc: "/.svg",
        correct: false,
        text: "",
        audioSrc: "/.mp3",
      },
      {
        challengeId: 1000,
        imageSrc: "/.svg",
        correct: false,
        text: "",
        audioSrc: "/.mp3",
      },

      // Soal 2 = ""
      {
        challengeId: 1001,
        imageSrc: "/.svg",
        correct: true,
        text: "",
        audioSrc: "/.mp3",
      },
      {
        challengeId: 1001,
        imageSrc: "/.svg",
        correct: false,
        text: "",
        audioSrc: "/.mp3",
      },
      {
        challengeId: 1001,
        imageSrc: "/.svg",
        correct: false,
        text: "",
        audioSrc: "/.mp3",
      },

      // Soal 3 = ""
      {
        challengeId: 1002,
        imageSrc: "/.svg",
        correct: true,
        text: "",
        audioSrc: "/.mp3",
      },
      {
        challengeId: 1002,
        imageSrc: "/.svg",
        correct: false,
        text: "",
        audioSrc: "/.mp3",
      },
      {
        challengeId: 1002,
        imageSrc: "/.svg",
        correct: false,
        text: "",
        audioSrc: "/.mp3",
      },

      // Soal 4 = ""
      {
        challengeId: 1003,
        imageSrc: "/.svg",
        correct: true,
        text: "",
        audioSrc: "/.mp3",
      },
      {
        challengeId: 1003,
        imageSrc: "/.svg",
        correct: false,
        text: "",
        audioSrc: "/.mp3",
      },
      {
        challengeId: 1003,
        imageSrc: "/.svg",
        correct: false,
        text: "",
        audioSrc: "/.mp3",
      },

      // Soal 5 = ""
      {
        challengeId: 1004,
        imageSrc: "/.svg",
        correct: true,
        text: "",
        audioSrc: "/.mp3",
      },
      {
        challengeId: 1004,
        imageSrc: "/.svg",
        correct: false,
        text: "",
        audioSrc: "/.mp3",
      },
      {
        challengeId: 1004,
        imageSrc: "/.svg",
        correct: false,
        text: "",
        audioSrc: "/.mp3",
      },
    ]);

    console.log("Seeding finished");
  } catch (error) {
    console.error(error);
    throw new Error("Failed to seed the database");
  }
};

main();
