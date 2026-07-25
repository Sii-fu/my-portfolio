---
slug: ai-pdf-chatbot
title: AI PDF Chatbot – Local LLM-Powered Document Query System
short: Local AI chatbot for querying PDFs with privacy and offline support.
badge: Internship
category: web-ai
tech:
  - Python
  - PyMuPDF
  - ChromaDB
  - Mistral-7B
  - LM Studio
  - Next.js
  - Tailwind CSS
---

Built a fully local AI chatbot system that can understand and answer questions based on the content of uploaded PDF documents [1]. Designed for privacy, offline accessibility, and educational use cases like course materials and research papers [1].

## How It Works
 
- **PDF Upload & Parsing**: PDFs are uploaded through the frontend, parsed with PyMuPDF, and split into chunks [1].
- **Embedding & Vectorization**: Chunks are embedded and stored in ChromaDB for fast similarity search [1].
- **Query Handling**: User questions are embedded and matched to PDF chunks [1].
- **LLM Response Generation**: Context is sent to a local LLM (Mistral-7B-Instruct) via LM Studio API [1].
- **Optimized Batch Quiz Generation**: Employs a parallel batch processor logic. It generates quizzes in groups of five, loading the first set on the UI instantly while remaining batches generate in the background to ensure a highly responsive user experience.
- **Frontend Display**: Clean Messenger-style UI with optional source snippets for transparency [1].
