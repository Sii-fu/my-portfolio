---
slug: knowble
title: Knowble - AI-Powered Smart Learning Companion
short: A cross-platform Flutter EdTech mobile application integrating real-time database syncing, custom-validated quiz engines, and AI-driven tutoring pipelines.
badge: Active Development
category: mobile-ai
tech:
  - Flutter
  - Dart
  - Supabase
  - PostgreSQL
  - Google Gemini API
  - Provider
links:
  github: https://github.com/Sii-fu/knowble
---

## THE CORE PROBLEM

> Traditional digital learning systems often act as passive digital repositories, lacking personalized pathways, instantaneous grading pipelines, and dynamic communication channels. This design limitation increases administrative workloads for instructors who must manually track outcomes and configure assessments, while leaving students without real-time tutoring support when navigating complex course materials. Knowble addresses these points of friction by unifying cross-platform client architectures, relational real-time storage syncs, and specialized natural language processing interfaces into a single integrated application.

---

## SCREENSHOT SHOWCASE

### 1. User Side UIs

<project-slider folder="/projects/knowble" images="1.png,2.png,3.png,4.png,5.png,6.png,7.png,8.png,9.png,10.png,11.png,12.png,13.png,14.png,15.png,16.png,17.png,18.png,19.png,20.png,21.png" aspect="portrait"></project-slider>


### 2. Instructor Side UIs

<project-slider folder="/projects/knowble" images="22.png,23.png,24.png,25.png,26.png,27.png,28.png,29.png,30.png,41.png,31.png,32.png,33.png" aspect="portrait"></project-slider>


### 3. Admin Side UIs

<project-slider folder="/projects/knowble" images="34.png,35.png,36.png,37.png,38.png,39.png,40.png,41.png" aspect="portrait"></project-slider>

---

## SYSTEM ARCHITECTURE & LAYER COMPARISON

The platform splits execution duties across decentralized client runtimes and secure cloud engines to ensure cross-platform consistency and reliable database mutations.

| Technical Component | Student Module | Instructor Module | Relational Backend & API Layer (Supabase / Gemini) |
| :--- | :--- | :--- | :--- |
| **Course & Content** | Dynamic rendering of module pathways, asset streams (PDF/MP4), and enrollment trackers. | Creator dash supporting course, module, and section registration with file upload access. | Supabase Storage buckets configured with granular policies; PostgreSQL metadata tables. |
| **Interactive Quizzes** | Clean, reactive MCQ card interfaces with radio button selections and local validation checks. | Step-by-step form editor supporting 2-4 options per question with target indicator binding. | Transactional writing across relational `assessments`, `questions`, and `options` schemas. |
| **Communication Engine** | Real-time chat threads alongside a 24/7 AI tutor dialogue panel. | Direct channel access, student metrics dashboards, and broadcast messaging systems. | Gemini API inference pipeline and Supabase dynamic real-time subscription clients. |
| **State & Notifications** | Local scheduler reminders, achievement badges, and offline profile structures. | Course engagement monitors and student completion status analytics. | `notifications` and `reminders` table hooks routing updates through native device mechanisms. |

---

## SYSTEM WALKTHROUGH & WORKFLOW

The technical execution of the manual assessment and state management pipeline runs through a multi-tiered loop:

1. **State Initialization & Validation**: When an instructor builds an assessment, the Flutter view instantiates a local Provider model. This tracks the configuration of dynamic input fields, asserting that each question contains 2 to 4 completed string options and exactly one designated correct choice index.
2. **Atomic Schema Write**: Once client validation is satisfied, the payload is transmitted to the Supabase client. The database processes this transactionally across three relational layers: generating an `assessments` record, nesting secondary keys for the corresponding `questions`, and creating relative child mappings in the `options` table.
3. **Real-time Event Broadcasting**: Supabase broadcasts these changes dynamically via WebSockets. Active student clients subscribed to the `enrollments` table parameters receive the structural change event and re-render their local dashboards.
4. **Interactive Response Capture**: When a student responds to an assessment card, the view coordinates changes through localized radio button controllers. Selecting a submit event evaluates user selections against correct flag models loaded in memory, displays instant feedback UI overlays, and writes responses to the remote database.
5. **Generative Tutoring Loop**: When querying the AI component, client requests are routed through a secure backend proxy to the Google Gemini API. Contextual text payloads are formatted, executed, and compiled back into chat feeds without blocking the primary UI thread.

---

## TECHNICAL IMPLEMENTATION

### 1. Manual Quiz State Controller (Flutter/Dart)
The class below handles interactive component updates, validation checks, and memory disposals within the manual assessment setup:

```dart
// lib/providers/quiz_creation_provider.dart
import 'package:flutter/material.dart';

class QuizQuestion {
  String questionText;
  List<String> options;
  int correctOptionIndex;

  QuizQuestion({
    required this.questionText,
    required this.options,
    required this.correctOptionIndex,
  });

  bool isValid() {
    if (questionText.trim().isEmpty) return false;
    if (options.length < 2 || options.length > 4) return false;
    if (options.any((opt) => opt.trim().isEmpty)) return false;
    if (correctOptionIndex < 0 || correctOptionIndex >= options.length) return false;
    return true;
  }
}

class QuizCreationProvider with ChangeNotifier {
  final List<QuizQuestion> _questions = [];
  String _quizTitle = '';

  List<QuizQuestion> get questions => List.unmodifiable(_questions);
  String get quizTitle => _quizTitle;

  void setQuizTitle(String title) {
    _quizTitle = title;
    notifyListeners();
  }

  void addQuestion(QuizQuestion question) {
    if (question.isValid()) {
      _questions.add(question);
      notifyListeners();
    }
  }

  void removeQuestion(int index) {
    if (index >= 0 && index < _questions.length) {
      _questions.removeAt(index);
      notifyListeners();
    }
  }

  bool validateQuizPayload() {
    if (_quizTitle.trim().isEmpty) return false;
    if (_questions.isEmpty) return false;
    return _questions.every((q) => q.isValid());
  }

  void clear() {
    _questions.clear();
    _quizTitle = '';
    notifyListeners();
  }
}
```

### 2. Database Schema (PostgreSQL/Supabase)
This relational schema maps assessment metadata, questions, and choice configurations with cascading delete constraints:

```sql
-- Relational framework for manual assessments
CREATE TABLE assessments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    section_id UUID REFERENCES sections(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

CREATE TABLE questions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    assessment_id UUID REFERENCES assessments(id) ON DELETE CASCADE,
    question_text TEXT NOT NULL,
    order_index INT NOT NULL
);

CREATE TABLE options (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    question_id UUID REFERENCES questions(id) ON DELETE CASCADE,
    option_text TEXT NOT NULL,
    is_correct BOOLEAN DEFAULT FALSE NOT NULL
);
```

---

## KEY OUTCOMES & FUTURE SCOPE

- [x] Created cross-platform client software utilizing Flutter and Dart architectures.
- [x] Implemented structured state operations based on the Provider pattern and strict local evaluation forms.
- [x] Configured Supabase backend structures with strict relational constraints linking courses, users, and conversations.
- [x] Integrated Gemini API endpoints to assist with automated messaging and conversational tutoring flows.
- [ ] Incorporate automated background sync mechanics to queue and upload offline-completed offline tasks.
- [ ] Build offline storage caches for raw PDF and media modules to enable offline coursework completion.