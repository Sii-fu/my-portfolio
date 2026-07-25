---
slug: boiapp
title: BoiApp - Bilingual Digital Library & Reading Ecosystem
short: Cross-platform digital library & reading ecosystem featuring offline EPUB parsing, LaTeX solvers, and a PostgreSQL-level recommendation affinity engine.
badge: Production
category: mobile
tech:
  - Flutter
  - Next.js
  - TypeScript
  - Express.js
  - Supabase
  - PostgreSQL
  - Prisma
  - Riverpod
  - Stripe
links:
  live: https://boiapp.com
  github: https://github.com/lonnewolf120/BoiApp
---

## THE CORE PROBLEM

> Bengali-reading communities, students, and educators frequently lack optimized local platforms that blend digital literature reading with structured academic content (CBSE, state boards, etc.). Existing mobile e-readers fail to handle complex formatting like LaTeX formulas or native equations, while lacking localized, low-friction monetization channels (such as bKash, Nagad, or AdMob rewarded credits). This ecosystem solves these issues by unifying a Flutter mobile application, a Next.js admin portal, a Bun-powered API server, and a PostgreSQL affinity engine that dynamically scores user preferences to personalize recommendations, deliver content within 5 seconds, and support offline-first reading.

---

## SCREENSHOT SHOWCASE



Below is the conceptual architecture dashboard for the BoiApp ecosystem:

![BoiApp System Dashboard](/projects/boiapp_admin.png)




--- 

## SYSTEM ARCHITECTURE & LAYER COMPARISON

To handle thousands of concurrent readers and deliver books/chapters efficiently, the codebase is modularly divided into four distinct components:

| Architecture Layer | Core Technologies | Primary Optimization Objective | Key Metric / Performance Target |
| :--- | :--- | :--- | :--- |
| **Mobile Client** | Flutter, Dart, Riverpod, Hive, Vocsy EPUB | Render offline content layouts, display LaTeX equations, visualize reading stats, check network status | 60fps render loops, zero-delay offline boot |
| **Admin Panel** | Next.js, Shadcn UI, Zustand, Recharts | Upload/split EPUB assets, manage users/orders, compile force-updates & flags, monitor queue | < 5s admin-to-mobile content sync latency |
| **Backend API** | Bun, Express.js, Prisma ORM, JWT | Fast routing, secure authentication, file streaming, token refresh orchestration | API response latency < 200ms (95th pct) |
| **Database Schema** | PostgreSQL (Supabase), RLS, PL/pgSQL | Enforce row-level security, track credit ledgers, run triggers for dynamic user tag affinities | RLS security coverage on 100% of user data |

---

## SYSTEM WALKTHROUGH & WORKFLOW

The data synchronization and reading flows operate continuously between the web admin panel, the backend API, and the mobile client:

1. **Preference Onboarding**: Upon signing up on mobile, a user is run through a 3-step onboarding flow selecting boards, classes (1–12), academic subjects, and general interests.
2. **Dynamic Affinity Scoring**: Every time a user views, reads, or purchases a book, a PostgreSQL database trigger computes dynamic weight scores (+1 for views, +5 for reads, +10 for purchases) across book tags, constantly updating the user's recommendations feed.
3. **EPUB Processing & Storage**: Admins drag-and-drop EPUB books onto the Next.js panel. The Express API parses, splits, and compiles the files into structure tables (metadata, TOC, spine, and assets) before pushing them to Supabase Storage.
4. **Credit Monetization**: Readers can either recharge credits using Stripe, bKash, or Nagad, or watch AdMob rewarded video ads to earn 10 credits per view. Credits are spent to unlock books/chapters.
5. **Academic LaTeX Rendering**: For academic boards, chapters featuring equations, proofs, and solutions utilize a custom rendering system to display equations cleanly on mobile screens using mathematical vector styling.

---

## TECHNICAL IMPLEMENTATION

### 1. Database-Level Recommendation Engine (PostgreSQL Trigger)
The following PL/pgSQL script runs automatically inside the Supabase database instance to compute user affinity scores whenever a book transaction completes:

```sql
CREATE OR REPLACE FUNCTION update_affinity_on_purchase()
RETURNS TRIGGER AS $$
DECLARE
    v_book_tags TEXT[];
    v_tag TEXT;
    v_user_id UUID;
BEGIN
    -- Get user_id and tags from the purchased book
    SELECT tags INTO v_book_tags FROM books WHERE id = NEW.book_id;
    v_user_id := NEW.user_id;

    -- Loop through tags and boost score by 10
    IF v_book_tags IS NOT NULL THEN
        FOREACH v_tag IN ARRAY v_book_tags
        LOOP
            INSERT INTO user_affinity_scores (user_id, tag_or_keyword, score, last_interaction_at)
            VALUES (v_user_id, v_tag, 10, NOW())
            ON CONFLICT (user_id, tag_or_keyword) 
            DO UPDATE SET 
                score = user_affinity_scores.score + 10,
                last_interaction_at = NOW();
        END LOOP;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger: When added to library (purchased/downloaded)
CREATE TRIGGER trigger_update_affinity_purchase
AFTER INSERT ON user_library
FOR EACH ROW
EXECUTE FUNCTION update_affinity_on_purchase();
2. Multi-Language i18n Delegate (Flutter/Dart)
To handle dynamic language switching between English and Bangla at runtime without restarting the application, the app uses a custom translation delegate:
code
Dart
import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

class AppLocalizations {
  final Locale locale;
  late Map<String, dynamic> _localizedStrings;

  AppLocalizations(this.locale);

  static AppLocalizations of(BuildContext context) {
    return Localizations.of<AppLocalizations>(context, AppLocalizations)!;
  }

  static const LocalizationsDelegate<AppLocalizations> delegate =
      _AppLocalizationsDelegate();

  static const List<Locale> supportedLocales = [
    Locale('en', ''),
    Locale('bn', ''),
  ];

  Future<bool> load() async {
    try {
      String jsonString = await rootBundle
          .loadString('assets/i18n/${locale.languageCode}.json');
      _localizedStrings = json.decode(jsonString);
      return true;
    } catch (e) {
      debugPrint('Error loading translations for ${locale.languageCode}: $e');
      if (locale.languageCode != 'en') {
        String jsonString = await rootBundle.loadString('assets/i18n/en.json');
        _localizedStrings = json.decode(jsonString);
      }
      return false;
    }
  }

  String translate(String key, {Map<String, String>? params}) {
    String? translation = _getNestedValue(key);
    if (translation == null) return key;

    if (params != null) {
      params.forEach((paramKey, paramValue) {
        translation = translation!.replaceAll('{$paramKey}', paramValue);
      });
    }
    return translation!;
  }

  String? _getNestedValue(String key) {
    List<String> keys = key.split('.');
    dynamic value = _localizedStrings;

    for (String k in keys) {
      if (value is Map && value.containsKey(k)) {
        value = value[k];
      } else {
        return null;
      }
    }
    return value is String ? value : null;
  }
}

```
### KEY OUTCOMES & FUTURE SCOPE

- [x] Designed and deployed a bilingual local application supporting over 360+ localization parameters in English and Bengali.
- [x] Implemented a database-level recommendation engine based on user activity weights and tag scores.
- [x] Handled e-book storage and e-book metadata parsing by decoupling EPUB structures into PostgreSQL chapters.
- [ ] Integrated AdMob native ads, Stripe payments, and local Bangladeshi mobile banking APIs (bKash/Nagad).
- [ ] Implement global search indexing utilizing PostgreSQL full-text search indexing (tsvector).
- [ ] Integrate a responsive dark theme preset for late-night reading modes.

---