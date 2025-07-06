export const projects = [
  {
    slug: "ai-pdf-chatbot",
    title: "AI PDF Chatbot – Local LLM-Powered Document Query System",
    short: "Local AI chatbot for querying PDFs with privacy and offline support.",
    description: `Built a fully local AI chatbot system that can understand and answer questions based on the content of uploaded PDF documents. Designed for privacy, offline accessibility, and educational use cases like course materials and research papers.

How It Works:
- PDF Upload & Parsing: PDFs are uploaded through the frontend, parsed with PyMuPDF, and split into chunks.
- Embedding & Vectorization: Chunks are embedded and stored in ChromaDB for fast similarity search.
- Query Handling: User questions are embedded and matched to PDF chunks.
- LLM Response Generation: Context is sent to a local LLM (Mistral-7B-Instruct) via LM Studio API.
- Frontend Display: Clean Messenger-style UI, with optional source snippets.`,
    features: [
      "Multi-PDF support",
      "Context-aware QA from documents",
      "Fully offline (no OpenAI/Anthropic APIs)",
      "Chunking logic optimized for semantic meaning",
      "Real-time LLM responses from your own machine"
    ],
    tech: ["Python", "PyMuPDF", "ChromaDB", "Mistral-7B", "LM Studio", "Next.js", "Tailwind CSS"],
    screenshots: []
  },
  {
    slug: "mediaverse-platform",
    title: "MediaVerse – Full-Stack Media Database & Community Platform",
    short: "Social platform for media lovers and production companies.",
    description: `MediaVerse is a next-gen platform for media lovers and production companies to track content, discuss, and discover new media. Inspired by Netflix, IMDb, and MyAnimeList, it combines user forums, reviews, personalized watchlists, and analytics.

Key Parts:
- Media list management (Watched, Plan to Watch, Favorites)
- Real-time discussions, review system, and forums
- Role-based dashboards (users, studios, merchandisers, admins)
- Analytics & reports for content owners
- Admin panel with moderation tools`,
    features: [
      "Smart search & filtering",
      "Role-based dashboards and access",
      "Interactive forums & reviews",
      "Company analytics dashboard",
      "Watchlists and recommendations"
    ],
    tech: ["React.js", "Tailwind CSS", "Material UI", "Node.js", "Express.js", "PostgreSQL", "Figma"],
    screenshots: []
  },
  {
    slug: "smart-fire-system",
    title: "Smart Fire Detection & Prevention System (IoT + Networking Simulation)",
    short: "IoT system for early fire detection, alerts, and automatic response.",
    description: `A smart fire safety system using IoT sensors and network simulation in Cisco Packet Tracer. Models proactive fire detection and prevention with automated alerts and responses.

System Highlights:
- Instant alerts via network/email
- Automated sprinkler activation
- Emergency exit unlocking
- Real-time incident logging with Firebase`,
    features: [
      "Emergency communication via network/email",
      "Automated sprinkler & exit systems",
      "RIP/DHCP protocols for IoT communications",
      "Real-time Firebase logging",
      "Scalable to smart-city deployments"
    ],
    tech: ["Cisco Packet Tracer", "Python", "Firebase", "RIP", "DHCP", "IoT Sensors"],
    screenshots: []
  },
  {
    slug: "smart-wheelchair",
    title: "Smart Wheelchair – Arduino-Based Multi-Mode Mobility System",
    short: "Smart wheelchair with manual, auto, hybrid, and joystick control.",
    description: `Arduino-powered wheelchair supporting multiple mobility modes including autonomous navigation, Bluetooth control, and hybrid obstacle avoidance.

Modes:
- Manual Mode: Bluetooth mobile app with emergency stop
- Autonomous Mode: Ultrasonic-based obstacle detection and rerouting
- Hybrid Mode: Manual control plus automatic obstacle avoidance
- Joystick Mode: Physical backup control for reliability`,
    features: [
      "Multi-mode (manual, autonomous, hybrid, joystick)",
      "Ultrasonic sensor obstacle detection",
      "Emergency stop functionality",
      "Sensor-driven rerouting algorithms",
      "Bluetooth mobile control"
    ],
    tech: ["Arduino Uno", "HC-SR04 Ultrasonic Sensors", "HC-05 Bluetooth Module", "L298N Motor Driver", "C++"],
    screenshots: ["/projects/wheel.jpg", "/projects/wheel1.jpg", "/projects/wheel2.jpg"]
  },
  {
    slug: "travila-travel-platform",
    title: "Travila – Travel Agency Platform",
    short: "End-to-end travel booking and management web platform.",
    description: `Built the UI/UX of a scalable travel platform connecting travelers with service providers, featuring secure payments and real-time booking.

Core Features:
- Role-Based Access: Travelers, Providers, Admins
- Package Management: CRUD itineraries and pricing
- Booking & Cancellation: Real-time updates
- Secure Payments: Stripe, PayPal, Bkash integration
- Reviews & Ratings: Traveler feedback system
- Admin Dashboard: Analytics and platform monitoring`,
    features: [
      "Role-based JWT authentication",
      "Real-time booking & cancellation",
      "Secure payments integration",
      "Review and rating system",
      "Admin analytics dashboard"
    ],
    tech: ["React.js", "Tailwind CSS", "Node.js", "Express.js", "PostgreSQL", "Stripe", "JWT"],
    screenshots: []
  },
  {
    slug: "media-merch-platform",
    title: "Media & Merchandising Platform – Full-Stack Web App",
    short: "E-commerce meets community for anime/movie fans and merchandisers.",
    description: `A full-featured web platform bridging fans, merchandisers, and studios with discovery, community, and sales features.

Highlights:
- Personalized media lists & recommendations
- Community forums & news feeds
- Merchandise listings and order management
- Role-based dashboards (Admin, User, Seller, Studio)
- Normalized Oracle SQL database for scalability`,
    features: [
      "Personalized recommendations",
      "Community discussion forums",
      "E-commerce merchandise management",
      "Role-based access control",
      "Robust relational DB schema"
    ],
    tech: ["Node.js", "Oracle SQL", "React.js", "CSS", "JavaScript"],
    screenshots: []
  },
  {
    slug: "fire-fighting-robot",
    title: "Arduino-based Fire-Fighting Robot",
    short: "Autonomous & manual robot for fire suppression in hazards.",
    description: `Designed a robot with IR flame sensors and ultrasonic avoidance to detect and extinguish fires autonomously, with manual override for safety.

Key Features:
- Three-directional IR flame detection
- Ultrasonic sensor obstacle avoidance
- Autonomous gas-based spray system
- Manual remote-control override`,
    features: [
      "IR flame sensor detection",
      "Ultrasonic obstacle avoidance",
      "Autonomous fire suppression",
      "Manual override control",
      "Servo-controlled spray mechanism"
    ],
    tech: ["Arduino Uno", "IR Sensors", "Ultrasonic Sensors", "Servo Motors", "C / C++"],
    screenshots: []
  },
  {
    slug: "sayhello-language-platform",
    title: "SayHello – Language Learning Platform (Java Desktop App)",
    short: "JavaFX app connecting learners with instructors for real-time chat and courses.",
    description: `SayHello is a JavaFX-based platform for immersive language learning with real-time chat, content sharing, and API-driven translation.

Features:
- User & Instructor roles with secure login
- Real-time messaging and community feed
- Content sharing (PDF, video, quizzes)
- Azure Translator API for multi-language support`,
    features: [
      "JavaFX GUI with Scene Builder",
      "Role-based access control",
      "Real-time chat and social feed",
      "Azure Translator API integration",
      "Multi-format content sharing"
    ],
    tech: ["Java", "JavaFX", "Azure Translator API", "OOP", "File-Based Storage"],
    screenshots: []
  }
];
