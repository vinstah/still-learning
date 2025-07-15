# Achievements Academy: Achievement & Point System Overview

## How the Achievement System Works

### 1. Achievement Logic
- Achievements are defined in `src/data/achievements.ts` as an array of objects.
- Each achievement has an `earned` property, which is determined by simple conditions, usually based on:
  - `completedLessons` (number of lessons/quests completed)
  - `totalAchievements` (number of boss battles or special events completed)
- **Example Conditions:**
  - **First Quest Complete:** `earned: completedLessons >= 1`
  - **Quest Master:** `earned: completedLessons >= 5`
  - **Boss Challenger:** `earned: totalAchievements >= 1`
- Many achievements use similar thresholds (e.g., 1, 3, 5, 10, 20, etc.), so if a user crosses a threshold (like completing their 10th lesson), they may unlock several achievements at once (e.g., for 1, 3, 5, and 10 lessons).

### 2. Leveling System
- Levels are based on the number of quests completed:
  - **Level 1 (Novice):** 0-4 quests
  - **Level 2 (Apprentice):** 5-9 quests
  - **Level 3 (Skilled Student):** 10-14 quests
  - **Level 4 (Expert Learner):** 15-19 quests
  - **Level 5 (Master Scholar):** 20+ quests
- Level is shown in the user profile and unlocks special titles.

### 3. Progress Tracking
- Progress is tracked in the `user_progress` table (Supabase), which records completed lessons.
- Exam results are tracked in the `exam_scores` table.
- The dashboard and profile use these records to calculate which achievements are earned.

### 4. Why Many Achievements Unlock at Once
- Because many achievements are based on the same metric (`completedLessons`), hitting a new milestone (like 10 lessons) can trigger multiple achievements whose thresholds are below or equal to that number.
- There is no "point" system per se—achievements are binary (earned or not) based on these thresholds.

---

## Example: Multiple Achievements at Once

Suppose you complete your 10th lesson:
- You unlock:
  - **First Quest Complete** (>=1)
  - **Quest Master** (>=5)
  - **Dedicated Scholar** (>=10)
  - **Note Taker** (>=5)
  - **Review Master** (>=10)
  - ...and any other achievement with a threshold of 10 or less.

---

## Documentation Reference
- **Achievements logic:** `src/data/achievements.ts`
- **Leveling system:** `src/components/UserMenu.tsx` and `src/components/HelpGuide.tsx`
- **Progress tracking:** `src/hooks/useProgress.ts` and Supabase migrations

---

## Recommendations for Improvement
- **Space out achievement thresholds** (e.g., 1, 5, 15, 30, 50, etc.) to reduce simultaneous unlocks.
- **Add more unique conditions** (not just lesson count) for achievements.
- **Implement a point system:**
  - Each action gives points.
  - Achievements are based on total points, not just counts.
- **Consider progressive achievements:**
  - Bronze, Silver, Gold tiers for the same achievement type.

---

*This document summarizes the current logic and offers suggestions for a more engaging achievement system.* 