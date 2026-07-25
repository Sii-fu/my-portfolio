---
slug: desh-bangla-patente
title: Desh Bangla Patente - Italian Driving License Prep App
short: Production-ready mobile exam simulator published on iOS and Google Play Stores.
badge: Production
category: mobile
tech:
  - Flutter
  - Dart
  - Supabase Auth
  - Supabase Storage
  - PostgreSQL
links:
  playStore: https://play.google.com/store/apps/details?id=com.deshbanglapatente.patentebquiz
  appStore: https://apps.apple.com/us/app/desh-bangla-patente/id6764632699
---

Every year, thousands of Bangladeshi residents in Italy sit the Patente B theory exam and fail — not because they don't understand traffic rules, but because they're being tested in a language they're still learning, on vocabulary that's technical even for native speakers. Desh Bangla Patente was built to close that specific gap, and it's now live on both major app stores.

## The Exam Itself Is the Hard Part

The Patente B theory test pulls 30 true/false questions at random from an official bank of nearly 8,000. A candidate gets 20 minutes and can afford at most 3 wrong answers — score below 27 and you fail, no partial credit, no appeal.

> Every official prep resource for this exam — the question bank, the explanations, the terminology — exists only in Italian. A perfectly competent future driver can fail repeatedly simply because "incrocio" or "precedenza" hasn't clicked yet.

The app's answer to that is structural, not cosmetic: all ~8,000 questions and their accompanying theory are reorganized into 25 chapters, each fully navigable in Italian, Bangla, or English, with translation available as a toggle rather than a separate "translated version" of the app.

## What It Looks Like

<!-- ![Desh Bangla Patente Preview](/projects/deshbangla.jpeg) -->

<project-slider folder="/projects/deshbangla" images="deshbangla.jpeg" aspect="lanscapes"></project-slider>

### App UI:

<project-slider folder="/projects/deshbangla" images="1.png, 2.png, 3.png, 4.png, 5.png, 6.png, 7.png" aspect="portrait"></project-slider>


### [Google Play Store](https://play.google.com/store/apps/details?id=com.deshbanglapatente.patentebquiz)
### [Apple App Store](https://apps.apple.com/us/app/desh-bangla-patente/id6764632699)

---

## One Codebase, Two Roles

There's a temptation, when an app needs an admin function, to spin up a web dashboard next to the mobile client. That adds a second deployment target, a second auth flow, and a second set of bugs. Here, both the student-facing app and the administrative tooling are the same Flutter build — what differs is a single permission flag checked at the database layer.

| | Student / General User | Administrator |
|---|---|---|
| **Gets in by** | Registering, then waiting for manual approval | Holding an `is_admin` flag, enforced via Supabase RLS |
| **Primarily does** | Studies, practices, sits mock exams, tracks progress against a leaderboard | Moderates accounts, edits quiz/theory content, builds homework sets |
| **Touches** | Read access to chapters, quizzes, own attempt history | Write access to quizzes, chapters, media, and other users' approval status |

### What students actually do
| Feature | What it does | Worth noting |
|---|---|---|
| Admin-gated access | New accounts sit in a pending state until approved | Prevents anonymous/unverified use of paid content |
| Quick Practice | Configurable session: question count, timer on/off, immediate vs. end-of-session feedback, chapter filter | Built as one flexible query rather than several hardcoded modes |
| Review Errors | Every wrong answer is stored against the user, not just the score | Turns the app into a spaced-repetition tool over time |
| Exam Simulation | 30 questions, 20-minute hard timer, no translation, no pause | Deliberately *less* forgiving than practice mode — it has to match the real test |
| Quick Test | One tap, fully randomized, pulled from the whole bank | The "am I actually ready" button |
| Theory Book & Audio | Written lessons, TTS narration, plus Bangla audio recorded by real instructors for the hard concepts | The instructor audio is the feature that most directly serves the language-barrier problem |
| Bilingual Dictionary | Look up an Italian term, get definition, pronunciation, and every quiz that uses it | Connects vocabulary gaps directly back to relevant practice |
| Tutorials & Live Classes | Recorded lectures plus live-stream links | |
| Profile & Theme | Personal data, haptics, sound effects, true dark mode | |

### What admins actually do
- **Moderate accounts** — approve or revoke access in real time, the same toggle that gates the entire student experience.
- **Edit content** — rewrite quiz text, attach diagram images, record new audio explanations, restructure the 25 chapters.
- **Run the classroom side** — assemble homework sets across chapters, assign them to specific students, and generate live leaderboards from the results.

## Why There's No Backend

Flutter's official Supabase SDK talks to Postgres, Auth, and Storage directly from the client. Given that, building a custom Node/Express layer in between would have meant writing and maintaining an API whose only job was to forward requests Supabase already accepts natively — extra latency and extra surface area for no real benefit. The trade-off is that authorization logic has to live in the database instead of in application code, which is exactly what Row Level Security is for:

```sql
-- A mock exam attempt, with pass/fail computed by Postgres rather than trusted from the client
CREATE TABLE mock_attempts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    score INT CHECK (score >= 0 AND score <= 30),
    is_passed BOOLEAN GENERATED ALWAYS AS (score >= 27) STORED,
    attempted_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Students see only their own attempts; admins see everyone's
CREATE POLICY "Scoped attempt visibility"
ON mock_attempts FOR SELECT
USING (
    auth.uid() = user_id
    OR (SELECT is_admin FROM profiles WHERE id = auth.uid()) = true
);
```

`is_passed` is a generated column rather than a value the app calculates and sends — a student's device can't report a passing score it didn't actually earn, because the database is the one deciding.

Storage follows the same pattern: instructor audio and quiz diagrams sit in access-controlled Supabase Storage buckets. The client requests a signed URL and caches the result locally, so a student on a weak cellular connection in Italy isn't re-fetching the same recording every time they reopen a lesson.

## Where It Stands

- [x] Live on both the Apple App Store and Google Play Store
- [x] Question bank scaled to ~8,000 quizzes across 25 chapters
- [x] No backend service to maintain — auth, data, and storage all run through Supabase directly
- [x] Bangla instructor audio shipped as a first-class study format, not an afterthought

What's next is less about adding features and more about using the data already being collected: every wrong answer is logged, but nothing yet acts on the pattern.

- [ ] Weak-point analysis that turns a student's error history into a suggested study order
- [ ] Full chapter downloads for offline practice in low-connectivity areas