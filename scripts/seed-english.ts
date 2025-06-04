import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

import * as schema from "../db/schema";

const sql = neon(process.env.DATABASE_URL!);

const db = drizzle(sql, { schema });

const main = async () => {
  try {
    console.log("Minecrafting database");

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
        imageSrc: "/menkrep/en.svg",
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
        unitId: 10,
        order: 1,
        title: "Frasa",
      },
      {
        id: 101,
        unitId: 10,
        order: 2,
        title: "Kalimat",
      },
      {
        id: 102,
        unitId: 10,
        order: 3,
        title: "Kata and Kalimat",
      },
      {
        id: 103,
        unitId: 10,
        order: 4,
        title: "Coming Soon",
      },
    ]);

    // Soal
    await db.insert(schema.challenges).values([
      // Kata dan Frasa
      {
        id: 1000,
        lessonId: 100,
        type: "SELECT", // SELECT or ASSIST
        order: 1,
        question: 'Frasa yang memiliki arti yang sama dengan "Alam Bawah"',
      },
      {
        id: 1001,
        lessonId: 100,
        type: "SELECT",
        order: 2,
        question: 'Frasa yang memiliki arti yang sama dengan "Joki Ayam"',
      },
      {
        id: 1002,
        lessonId: 100,
        type: "SELECT",
        order: 3,
        question:
          'Frasa yang memiliki arti yang sama dengan "Batu Api dan Baja"',
      },
      {
        id: 1003,
        lessonId: 100,
        type: "SELECT",
        order: 4,
        question:
          'Frasa yang memiliki arti yang sama dengan "Lahar Panas dan Ayam"',
      },
      {
        id: 1004,
        lessonId: 100,
        type: "SELECT",
        order: 5,
        question: 'Frasa yang memiliki arti yang sama dengan "Zirah Berlian"',
      },

      // Sentence
      {
        id: 1005, // id tetap lanjut
        lessonId: 101, // lesson baru
        type: "ASSIST",
        order: 1, // Order mengulang jika topik baru
        question:
          'Kalimat yang memiliki arti yang sama dengan "Aku adalah Steve."',
      },
      {
        id: 1006,
        lessonId: 101,
        type: "ASSIST",
        order: 2,
        question:
          'Kalimat yang memiliki arti yang sama dengan ""Ember Air, Lepaskan!"',
      },
      {
        id: 1007,
        lessonId: 101,
        type: "ASSIST",
        order: 3,
        question:
          'Kalimat yang memiliki arti yang sama dengan "Mereka suka menghancurkan roti."',
      },
      {
        id: 1008,
        lessonId: 101,
        type: "ASSIST",
        order: 4,
        question:
          'Kalimat yang memiliki arti yang sama dengan "Masuk dengan panas!"',
      },
      {
        id: 1009,
        lessonId: 101,
        type: "ASSIST",
        order: 5,
        question:
          'Kalimat yang memiliki arti yang sama dengan "Kepala kamu besar."',
      },

      // Words and Sentences
      {
        id: 1010,
        lessonId: 102,
        type: "SELECT",
        order: 1,
        question: 'Frasa yang memiliki arti yang sama dengan "Kubus Slime"',
      },
      {
        id: 1011,
        lessonId: 102,
        type: "ASSIST",
        order: 2,
        question:
          'Kalimat yang memiliki arti yang sama dengan "Ini adalah meja kerja."',
      },
      {
        id: 1012,
        lessonId: 102,
        type: "SELECT",
        order: 3,
        question:
          'Frasa yang memiliki arti yang sama dengan "Baju terbang Elytra"',
      },
      {
        id: 1013,
        lessonId: 102,
        type: "ASSIST",
        order: 4,
        question:
          'Kalimat yang memiliki arti yang sama dengan "Itu semua milik Steve."',
      },
      {
        id: 1014,
        lessonId: 102,
        type: "SELECT",
        order: 5,
        question: 'Frasa yang memiliki arti yang sama dengan "Manusia End"',
      },

      //xdd
      {
        id: 1015,
        lessonId: 102,
        type: "SELECT",
        order: 5,
        question: "Season 2 Coming Soon.",
      },
    ]);

    // Pilihan
    await db.insert(schema.challengeOptions).values([
      // Topik 1 Word
      // Soal 1 = ""
      {
        challengeId: 1000,
        imageSrc: "/menkrep/lava.png",
        correct: false,
        text: "Lava",
        audioSrc: "/menkrep/lava.mp3",
      },
      {
        challengeId: 1000,
        imageSrc: "/menkrep/the_nether.png",
        correct: true,
        text: "The Nether",
        audioSrc: "/menkrep/the_nether.mp3",
      },
      {
        challengeId: 1000,
        imageSrc: "/menkrep/wyoming.png",
        correct: false,
        text: "Wyoming",
        audioSrc: "/menkrep/wyoming.mp3",
      },

      // Soal 2 = ""
      {
        challengeId: 1001,
        imageSrc: "/menkrep/iron_golem.png",
        correct: false,
        text: "Iron Golem",
        audioSrc: "/menkrep/iron_golem.mp3",
      },
      {
        challengeId: 1001,
        imageSrc: "/menkrep/flint_and_steel.png",
        correct: false,
        text: "Flint and Steel",
        audioSrc: "/menkrep/flint_and_steel.mp3",
      },
      {
        challengeId: 1001,
        imageSrc: "/menkrep/chicken_jockey.png",
        correct: true,
        text: "Chicken Jockey",
        audioSrc: "/menkrep/chicken_jockey.mp3",
      },

      // Soal 3 = ""
      {
        challengeId: 1002,
        imageSrc: "/menkrep/flint_and_steel.png",
        correct: true,
        text: "Flint and Steel",
        audioSrc: "/menkrep/flint_and_steel.mp3",
      },
      {
        challengeId: 1002,
        imageSrc: "/menkrep/iron_golem.png",
        correct: false,
        text: "Iron Golem",
        audioSrc: "/menkrep/iron_golem.mp3",
      },
      {
        challengeId: 1002,
        imageSrc: "/menkrep/chicken.png",
        correct: false,
        text: "Chicken",
        audioSrc: "/menkrep/chicken.mp3",
      },

      // Soal 4 = ""
      {
        challengeId: 1003,
        imageSrc: "/menkrep/hot_lava_and_chicken.png",
        correct: true,
        text: "Hot Lava and Chicken",
        audioSrc: "/menkrep/hot_lava_and_chicken.mp3",
      },
      {
        challengeId: 1003,
        imageSrc: "/menkrep/lava.png",
        correct: false,
        text: "Lava",
        audioSrc: "/menkrep/lava.mp3",
      },
      {
        challengeId: 1003,
        imageSrc: "/menkrep/chicken.png",
        correct: false,
        text: "Chicken",
        audioSrc: "/menkrep/chicken.mp3",
      },

      // Soal 5 = ""
      {
        challengeId: 1004,
        imageSrc: "/menkrep/ender_pearl.png",
        correct: false,
        text: "Ender Pearl",
        audioSrc: "/menkrep/ender_pearl.mp3",
      },
      {
        challengeId: 1004,
        imageSrc: "/menkrep/big_ol_red_ones.png",
        correct: false,
        text: "Big ol red ones",
        audioSrc: "/menkrep/big_ol_red_ones.mp3",
      },
      {
        challengeId: 1004,
        imageSrc: "/menkrep/diamond_armor.png",
        correct: true,
        text: "Diamond Armor",
        audioSrc: "/menkrep/diamond_armor.mp3",
      },
    ]);

    await db.insert(schema.challengeOptions).values([
      // Topik 2 Sentence !!ASSIST menggunakan gambar yg sama tapi gambar yang jawabannya benar
      // Soal 1 = ""
      {
        challengeId: 1005,
        imageSrc: "/menkrep/i_am_steve.png",
        correct: false,
        text: "Chicken Jockey.",
        audioSrc: "/menkrep/chicken_jockey.mp3",
      },
      {
        challengeId: 1005,
        imageSrc: "/menkrep/i_am_steve.png",
        correct: false,
        text: "Flint and Steel",
        audioSrc: "/menkrep/flint_and_steel.mp3",
      },
      {
        challengeId: 1005,
        imageSrc: "/menkrep/i_am_steve.png",
        correct: true,
        text: "I... Am Steve.",
        audioSrc: "/menkrep/i_am_steve.mp3",
      },

      // Soal 2 = ""
      {
        challengeId: 1006,
        imageSrc: "/menkrep/water_bucket_release.png",
        correct: true,
        text: "Water Bucket, RELEASE!",
        audioSrc: "/menkrep/water_bucket_release.mp3",
      },
      {
        challengeId: 1006,
        imageSrc: "/menkrep/water_bucket_release.png",
        correct: false,
        text: "They love crushin loaf.",
        audioSrc: "/menkrep/they_love_crushin_loaf.mp3",
      },
      {
        challengeId: 1006,
        imageSrc: "/menkrep/water_bucket_release.png",
        correct: false,
        text: "I love luaus.",
        audioSrc: "/menkrep/i_love_luaus.mp3",
      },

      // Soal 3 = ""
      {
        challengeId: 1007,
        imageSrc: "/menkrep/they_love_crushin_loaf.png",
        correct: false,
        text: "Your head is huge.",
        audioSrc: "/menkrep/head_huge.mp3",
      },
      {
        challengeId: 1007,
        imageSrc: "/menkrep/they_love_crushin_loaf.png",
        correct: false,
        text: "They are the villagers.",
        audioSrc: "/menkrep/they_are_the_villagers.mp3",
      },
      {
        challengeId: 1007,
        imageSrc: "/menkrep/they_love_crushin_loaf.png",
        correct: true,
        text: "They love crushin loaf.",
        audioSrc: "/menkrep/they_love_crushin_loaf.mp3",
      },

      // Soal 4 = ""
      {
        challengeId: 1008,
        imageSrc: "/menkrep/comin_in_hot.png",
        correct: true,
        text: "Comin in HOT!",
        audioSrc: "/menkrep/comin_in_hot.mp3",
      },
      {
        challengeId: 1008,
        imageSrc: "/menkrep/comin_in_hot.png",
        correct: false,
        text: "I'll show you blade.",
        audioSrc: "/menkrep/i_show_u_blade.mp3",
      },
      {
        challengeId: 1008,
        imageSrc: "/menkrep/comin_in_hot.png",
        correct: false,
        text: "An ender pearl.",
        audioSrc: "/menkrep/ender_pearl.mp3",
      },

      // Soal 5 = ""
      {
        challengeId: 1009,
        imageSrc: "/menkrep/head_huge.png",
        correct: false,
        text: "Comin in HOT!",
        audioSrc: "/menkrep/comin_in_hot.mp3",
      },
      {
        challengeId: 1009,
        imageSrc: "/menkrep/head_huge.png",
        correct: false,
        text: "Blade for days.",
        audioSrc: "/menkrep/blade_for_days.mp3",
      },
      {
        challengeId: 1009,
        imageSrc: "/menkrep/head_huge.png",
        correct: true,
        text: "Your head is huge.",
        audioSrc: "/menkrep/head_huge.mp3",
      },
    ]);

    await db.insert(schema.challengeOptions).values([
      // Topik 3 menkrep
      // Soal 1 = ""
      {
        challengeId: 1010,
        imageSrc: "/menkrep/slime_cube.png",
        correct: true,
        text: "Slime Cube",
        audioSrc: "/menkrep/slime_cube.mp3",
      },
      {
        challengeId: 1010,
        imageSrc: "/menkrep/enderman.png",
        correct: false,
        text: "Enderman",
        audioSrc: "/menkrep/enderman.mp3",
      },
      {
        challengeId: 1010,
        imageSrc: "/menkrep/elytra_wingsuit.png",
        correct: false,
        text: "Elytra Wingsuit",
        audioSrc: "/menkrep/elytra_wingsuit.mp3",
      },

      // Soal 2 = ""
      {
        challengeId: 1011,
        imageSrc: "/menkrep/crafting_table.png",
        correct: false,
        text: "I think this is Wyoming.",
        audioSrc: "/menkrep/wyoming.mp3",
      },
      {
        challengeId: 1011,
        imageSrc: "/menkrep/crafting_table.png",
        correct: false,
        text: "Big ol red ones.",
        audioSrc: "/menkrep/big_ol_red_ones.mp3",
      },
      {
        challengeId: 1011,
        imageSrc: "/menkrep/crafting_table.png",
        correct: true,
        text: "This is a crafting table.",
        audioSrc: "/menkrep/crafting_table.mp3",
      },

      // Soal 3 = ""
      {
        challengeId: 1012,
        imageSrc: "/menkrep/elytra_wingsuit.png",
        correct: true,
        text: "Elytra Wingsuit",
        audioSrc: "/menkrep/elytra_wingsuit.mp3",
      },
      {
        challengeId: 1012,
        imageSrc: "/menkrep/boots.png",
        correct: false,
        text: "Boots of swiftness",
        audioSrc: "/menkrep/boots.mp3",
      },
      {
        challengeId: 1012,
        imageSrc: "/menkrep/tnt.png",
        correct: false,
        text: "TNT",
        audioSrc: "/menkrep/tnt.mp3",
      },

      // Soal 4 = ""
      {
        challengeId: 1013,
        imageSrc: "/menkrep/thats_all_steves.png",
        correct: false,
        text: "Diamond armor, full set.",
        audioSrc: "/menkrep/diamond_armor.mp3",
      },
      {
        challengeId: 1013,
        imageSrc: "/menkrep/thats_all_steves.png",
        correct: true,
        text: "That's all Steve's.",
        audioSrc: "/menkrep/thats_all_steves.mp3",
      },
      {
        challengeId: 1013,
        imageSrc: "/menkrep/thats_all_steves.png",
        correct: false,
        text: "I think this is Wyoming.",
        audioSrc: "/menkrep/wyoming.mp3",
      },

      // Soal 5 = ""
      {
        challengeId: 1014,
        imageSrc: "/menkrep/chicken_jockey.png",
        correct: false,
        text: "Chicken Jockey",
        audioSrc: "/menkrep/chicken_jockey.mp3",
      },
      {
        challengeId: 1014,
        imageSrc: "/menkrep/iron_golem.png",
        correct: false,
        text: "Iron Golem",
        audioSrc: "/menkrep/iron_golem.mp3",
      },
      {
        challengeId: 1014,
        imageSrc: "/menkrep/enderman.png",
        correct: true,
        text: "Enderman",
        audioSrc: "/menkrep/enderman.mp3",
      },
    ]);

    await db.insert(schema.challengeOptions).values([
      // season 2
      // ??
      {
        challengeId: 1015,
        imageSrc: "/menkrep/xdd.png",
        correct: false,
        text: "escape to quit",
        audioSrc: "/menkrep/chicken_jockey.mp3",
      },
    ]);

    console.log("Let's Minecraft");
  } catch (error) {
    console.error(error);
    throw new Error("Failed to minecraft the database");
  }
};

main();
