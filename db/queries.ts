import { cache } from "react";
import { auth } from "@clerk/nextjs/server";

import db from "./drizzle";
import { desc, eq } from "drizzle-orm";
import {
  challengeProgress,
  challenges,
  courses,
  lessons,
  units,
  userProgress,
  userSubscription,
} from "./schema";

export const getUserProgress = cache(async () => {
  const { userId } = await auth();

  if (!userId) {
    return null;
  }

  const data = await db.query.userProgress.findFirst({
    where: eq(userProgress.userId, userId),
    with: {
      activeCourse: true,
    },
  });

  return data;
});

export const getUnits = cache(async () => {
  const { userId } = await auth();
  const userProgress = await getUserProgress();

  if (!userId || !userProgress?.activeCourseId) {
    return [];
  }

  const data = await db.query.units.findMany({
    orderBy: (units, { asc }) => [asc(units.order)],
    where: eq(units.courseId, userProgress.activeCourseId),
    with: {
      lessons: {
        orderBy: (lessons, { asc }) => [asc(lessons.order)],
        with: {
          challenges: {
            orderBy: (challenges, { asc }) => [asc(challenges.order)],
            with: {
              challengeProgress: {
                where: eq(challengeProgress.userId, userId),
              },
            },
          },
        },
      },
    },
  });

  const normalizedData = data.map((unit) => {
    const lessonWithCompletedStatus = unit.lessons.map((lesson) => {
      if (lesson.challenges.length === 0) {
        return { ...lesson, completed: false };
      }
      const allCompletedChallenges = lesson.challenges.every((challenge) => {
        return (
          challenge.challengeProgress &&
          challenge.challengeProgress.length > 0 &&
          challenge.challengeProgress.every((progress) => progress.completed)
        );
      });
      return { ...lesson, completed: allCompletedChallenges };
    });
    return { ...unit, lessons: lessonWithCompletedStatus };
  });
  return normalizedData;
});

export const getCourses = cache(async () => {
  const data = await db.query.courses.findMany();

  return data;
});

export const getCourseById = cache(async (coursesId: number) => {
  const data = await db.query.courses.findFirst({
    where: eq(courses.id, coursesId),
    with: {
      units: {
        orderBy: (units, { asc }) => [asc(units.order)],
        with: {
          lessons: {
            orderBy: (lessons, { asc }) => [asc(lessons.order)],
          },
        },
      },
    },
  });

  return data;
});

export const getCourseProgress = cache(async () => {
  const { userId } = await auth();
  const userProgress = await getUserProgress();

  if (!userId || !userProgress?.activeCourseId) {
    return null;
  }

  const unitsInActiveCourse = await db.query.units.findMany({
    orderBy: (units, { asc }) => [asc(units.order)],
    with: {
      lessons: {
        orderBy: (lessons, { asc }) => [asc(lessons.order)],
        with: {
          unit: true,
          challenges: {
            with: {
              challengeProgress: {
                where: eq(challengeProgress.userId, userId),
              },
            },
          },
        },
      },
    },
  });

  const firstUncompletedLesson = unitsInActiveCourse
    .flatMap((unit) => unit.lessons)
    .find((lesson) => {
      return lesson.challenges.some((challenge) => {
        return (
          // broke? check out 3rd if clause
          !challenge.challengeProgress ||
          challenge.challengeProgress.length === 0 ||
          challenge.challengeProgress.some(
            (progress) => progress.completed === false
          )
        );
      });
    });

  return {
    activeLesson: firstUncompletedLesson,
    activeLessonId: firstUncompletedLesson?.id,
  };
});

export const getLesson = cache(async (id?: number) => {
  const { userId } = await auth();

  if (!userId) {
    return null;
  }

  const courseProgress = await getCourseProgress();
  const lessonId = id || courseProgress?.activeLessonId;

  if (!lessonId) {
    return null;
  }

  const data = await db.query.lessons.findFirst({
    where: eq(lessons.id, lessonId),
    with: {
      challenges: {
        orderBy: (challenges, { asc }) => [asc(challenges.order)],
        with: {
          challengeOptions: true,
          challengeProgress: {
            where: eq(challengeProgress.userId, userId),
          },
        },
      },
    },
  });

  if (!data || !data.challenges) {
    return null;
  }

  const normalizedChallenges = data.challenges.map((challenge) => {
    const completed =
      // broke? check out 3rd if clause
      challenge.challengeProgress &&
      challenge.challengeProgress.length > 0 &&
      challenge.challengeProgress.every((progress) => progress.completed);
    return { ...challenge, completed };
  });
  return { ...data, challenges: normalizedChallenges };
});

export const getLessonPercentage = cache(async () => {
  const courseProgress = await getCourseProgress();

  if (!courseProgress?.activeLessonId) {
    return 0;
  }

  const lesson = await getLesson(courseProgress.activeLessonId);

  if (!lesson) {
    return 0;
  }

  const completedChallenges = lesson.challenges.filter(
    (challenge) => challenge.completed
  );

  const percetage = Math.round(
    (completedChallenges.length / lesson.challenges.length) * 100
  );

  return percetage;
});

const DAY_IN_MS = 84_000_000;
export const getUserSubscription = cache(async () => {
  const { userId } = await auth();

  if (!userId) {
    return null;
  }

  const data = await db.query.userSubscription.findFirst({
    where: eq(userSubscription.userId, userId),
  });

  if (!data) {
    return null;
  }

  const isActive =
    data.stripePriceId &&
    data.stripeCurrentPeriodEnd?.getTime()! + DAY_IN_MS > Date.now();

  return {
    ...data,
    isActive: !!isActive,
  };
});

export const getTopTenUsers = async () => { // Or wherever this function is located
  // Step 1: Select the necessary raw data from the database
  // Drizzle will fetch these columns
  const rawData = await db
    .select({
      userId: userProgress.userId,
      userName: userProgress.userName,
      userImageSrc: userProgress.userImageSrc,
      points: userProgress.points,
      // Include the raw fields from userSubscription needed for the calculation
      stripePriceId: userSubscription.stripePriceId,
      stripeCurrentPeriodEnd: userSubscription.stripeCurrentPeriodEnd,
    })
    .from(userProgress)
    .leftJoin( // Use leftJoin as a user might not have a subscription
      userSubscription,
      eq(userProgress.userId, userSubscription.userId)
    )
    .orderBy(desc(userProgress.points))
    .limit(10);

  // Step 2 & 3: Process the raw data in JavaScript to add the 'isPro' boolean
  const processedData = rawData.map(row => {
    // Calculate isPro using the fetched data and JavaScript logic
    // Note: row.stripeCurrentPeriodEnd could be null due to the leftJoin
    const isPro = !!(
      row.stripePriceId &&
      row.stripeCurrentPeriodEnd && // Add null check for date object itself
      row.stripeCurrentPeriodEnd.getTime() + DAY_IN_MS > Date.now()
    );

    // Return a new object with the desired shape, including the calculated isPro boolean
    return {
      userId: row.userId,
      userName: row.userName,
      userImageSrc: row.userImageSrc,
      points: row.points,
      isPro: isPro, // This is now a standard JavaScript boolean
    };
  });

  // Return the processed data
  return processedData; // Or NextResponse.json(processedData) if in a route handler
};