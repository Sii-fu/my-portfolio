export interface Project {
  slug: string;
  title: string;
  short: string;
  description: string;
  features: string[];
  tech: string[];
  screenshots: string[];
  category: "mobile" | "web-ai" | "iot" | "other";
  badge: "Production" | "Internship" | "Academic";
  links?: {
    github?: string;
    live?: string;
    appStore?: string;
    playStore?: string;
    figma?: string;
  };
}

export const projects: Project[] = [
  {
    slug: "desh-bangla-patente",
    title: "Desh Bangla Patente – Italian Driving License Prep App",
    short: "Production-ready mobile exam simulator published on iOS and Google Play Stores.",
    description: `A fully published, production driving license exam preparation application built for a multicultural audience in Italy. It provides over 7,000 standard exam questions with multi-language flexibility, localized guides, and an extensive admin tool.

Key Features & Operations:
- Official Ministero Quizzes: Users practice with the comprehensive question bank of official quizzes, browsable by driving topics.
- Timed Exam Simulation: Features a timed 20-minute, 30-question mock exam mirroring the actual Patente B testing environment.
- Custom Voice Guides: Features on-demand audio recording playback directly explaining complex driving terms in Bangla.
- Comprehensive Theories: Includes 25 structured driving chapters with sub-chapters, complete with relevant practice quiz modes.
- Admin Panel: Dedicated administrative web dashboard allowing verification of users, editing of quiz banks, streaming video uploads, homework distribution, and live leaderboards.`,
    features: [
      "Published on Apple App Store & Google Play Store",
      "Multilingual switching between Italian, English, and Bangla",
      "Simulation exam module replicating the official state exam format",
      "Bangla-language customized voice-over audio explanations",
      "Next.js administrative dashboard for user and exam moderation",
      "Homework modules with real-time analytics and user leaderboards"
    ],
    tech: ["Flutter", "Dart", "Supabase Auth", "Supabase Storage", "Next.js", "Tailwind CSS"],
    screenshots: [],
    category: "mobile",
    badge: "Production",
    links: {
      playStore: "https://play.google.com/store/apps/details?id=com.deshbanglapatente.patentebquiz", // Replace with your actual live store link
      appStore: "https://apps.apple.com/us/app/desh-bangla-patente/id6764632699"          // Replace with your actual live store link
    }
  },
  {
    slug: "ai-pdf-chatbot",
    title: "AI PDF Chatbot – Local LLM-Powered Document Query System",
    short: "Local AI chatbot for querying PDFs with privacy and offline support.",
    description: `Built a fully local AI chatbot system that can understand and answer questions based on the content of uploaded PDF documents [1]. Designed for privacy, offline accessibility, and educational use cases like course materials and research papers [1].

How It Works:
- PDF Upload & Parsing: PDFs are uploaded through the frontend, parsed with PyMuPDF, and split into chunks [1].
- Embedding & Vectorization: Chunks are embedded and stored in ChromaDB for fast similarity search [1].
- Query Handling: User questions are embedded and matched to PDF chunks [1].
- LLM Response Generation: Context is sent to a local LLM (Mistral-7B-Instruct) via LM Studio API [1].
- Optimized Batch Quiz Generation: Employs a parallel batch processor logic. It generates quizzes in groups of five, loading the first set on the UI instantly while remaining batches generate in the background to ensure a highly responsive user experience.
- Frontend Display: Clean Messenger-style UI with optional source snippets for transparency [1].`,
    features: [
      "Multi-PDF support with context-aware document queries [1]",
      "Fully offline operation with no external API dependencies [1]",
      "Highly optimized parallel batch quiz-generation logic",
      "ChromaDB similarity vector search [1]",
      "Messenger-style responsive web interface"
    ],
    tech: ["Python", "PyMuPDF", "ChromaDB", "Mistral-7B", "LM Studio", "Next.js", "Tailwind CSS"],
    screenshots: [],
    category: "web-ai",
    badge: "Internship"
  },
  {
    slug: "knowble-education",
    title: "Knowble – AI-Powered Education Platform",
    short: "AI-driven EdTech mobile app with automatic quiz generation and conversational learning.",
    description: `Knowble is an AI-powered EdTech mobile application designed to streamline student learning and automate repetitive instructor tasks. 

Core Architecture:
- Course Browsing & Enrollment: Access structured courses divided into chapters and video/PDF lessons, with integrated payment handling.
- Contextual Assistant: Integrates Google Gemini Flash API for an in-lesson chat assistant that answers questions based directly on course content.
- AI-Generated Quizzes: Instructors upload course files, and the system automatically generates quizzes, with editing and review tools.
- Real-Time Messaging: Connects students with instructors through real-time 1-to-1 chats for direct assistance.
- Study Scheduler: Includes a built-in calendar allowing students to set learning deadlines and receive local push notifications.`,
    features: [
      "Gemini API integration for contextual in-lesson learning",
      "Automated AI-generated lesson quizzes for educators",
      "Secure student-instructor direct messaging channel",
      "Built-in calendar scheduler with custom push notifications",
      "Automated PDF certificate generator upon course completion (≥60% score)"
    ],
    tech: ["Flutter", "Node.js", "Supabase", "Supabase Auth", "Supabase Storage", "Google Gemini API", "YouTube API"],
    screenshots: [],
    category: "mobile",
    badge: "Academic"
  },
  {
    slug: "mediaverse-platform",
    title: "MediaVerse – Full-Stack Media Database & Community Platform",
    short: "Social platform for media tracking, reviews, and studio engagement.",
    description: `MediaVerse is a next-gen platform for movie/music lovers and production companies to track content, discuss, and discover new media. Inspired by Netflix, IMDb, and MyAnimeList, it combines user forums, reviews, personalized watchlists, and analytics.

Key Parts:
- Media list management (Watched, Plan to Watch, Favorites)
- Real-time discussions, review system, and forums
- Role-based dashboards (users, studios, merchandisers, admins)
- Analytics & reports for content owners
- Admin panel with moderation tools`,
    features: [
      "Smart search & advanced content filtering",
      "Role-based dynamic dashboards and dashboard routing",
      "Interactive relational forums and detailed user review modules",
      "Studio analytics panel for product engagement tracking",
      "Secure role-based authentication using PostgreSQL schemas"
    ],
    tech: ["React.js", "Tailwind CSS", "Material UI", "Node.js", "Express.js", "PostgreSQL", "Figma"],
    screenshots: [],
    category: "web-ai",
    badge: "Academic",
    links: {
      figma: "https://www.figma.com/design/m6kVxCcjPoWXmE8gpjsKQt/MediaVerse?node-id=0-1&m=dev&t=bnD95QMPUWEmxpIB-1"
    }
  },
  {
    slug: "just-crave-it",
    title: "Just Crave It – Premium Dessert Shop Portfolio",
    short: "Responsive Next.js multi-page client website with optimized SEO and fast performance.",
    description: `A responsive, highly optimized frontend static website developed for an active, premium self-serve frozen yogurt shop based in Australia. 

Key Operations:
- Brand Experience: Features modern responsive menus, custom winter warmer sections, and high-fidelity toppings showcases.
- Client Optimization: Managed overall hosting deployment, implemented localized Google Business SEO adjustments, and audited the site for fast page load performance.
- Mascot Integration: Fully responsive layout featuring smooth UI elements and custom visual branding assets.`,
    features: [
      "Responsive multi-page customer-facing visual design",
      "Custom mascot responsive branding with smooth UI elements",
      "Managed hosting setup and localized Google Search SEO configurations",
      "Optimized load speeds with continuous frontend audits",
      "Deployed on high-performance Vercel edge networks"
    ],
    tech: ["Next.js", "Tailwind CSS", "Vercel", "SEO Optimization", "Figma"],
    screenshots: [],
    category: "web-ai",
    badge: "Production",
    links: {
      live: "https://justcraveitt.vercel.app" // Update as appropriate
    }
  },
  {
    slug: "smart-fire-system",
    title: "Smart Fire Detection & Prevention System",
    short: "IoT network simulation for proactive fire containment and notifications.",
    description: `A simulated smart fire safety network designed in Cisco Packet Tracer. The project models early detection, automatic alerting, and rapid response mechanisms using smart home automation protocols.

System Operation:
- Instant Alerts: Automatically logs data to a live Firebase database and notifies occupants via simulated network email protocols.
- Automated Active Containment: Flame and gas readings instantly trigger physical response models (activating water sprinklers, sounding sirens).
- Emergency Escape Logic: Programmed to automatically unlock emergency exits and notify local rescue switchboards.`,
    features: [
      "Simulated immediate resident alert via SMTP network emails",
      "Automated water sprinkler activation upon sensor threshold breach",
      "Emergency door routing logic for secure exit",
      "Centralized real-time incident logging using Python and Firebase integration",
      "Constructed simulated topologies using RIP and DHCP network protocols"
    ],
    tech: ["Cisco Packet Tracer", "Python", "Firebase", "RIP", "DHCP", "IoT Sensors"],
    screenshots: [],
    category: "iot",
    badge: "Academic"
  },
  {
    slug: "smart-wheelchair",
    title: "Smart Wheelchair – Arduino-Based Mobility System",
    short: "Smart wheelchair supporting manual, autonomous, and hybrid control.",
    description: `An Arduino-powered smart wheelchair prototype engineered to enhance independence for individuals with mobility challenges. 

Supported Modes:
- Manual Bluetooth Mode: Controlled remotely via custom-paired Android/iOS mobile application with live communication and emergency brakes.
- Autonomous Obstacle Avoidance: Scans paths with 4 ultrasonic sensors, running a local rerouting path logic.
- Hybrid Safety Mode: Manual control with active proximity overrides that automatically avoid collisions based on sensor readings.
- Joystick Redundancy: Physical hardware controller fallback for offline/manual operation.`,
    features: [
      "Multi-mode control switching (Manual, Autonomous, Hybrid, Joystick)",
      "Proactive collision prevention using 4 HC-SR04 ultrasonic sensors",
      "Custom Bluetooth remote controls built with HC-05 module",
      "Integrated emergency stop safety brakes override",
      "Physical fallback joystick module integration"
    ],
    tech: ["Arduino Uno", "HC-SR04 Sensors", "HC-05 Bluetooth", "L298N Motor Driver", "C++"],
    screenshots: [],
    category: "iot",
    badge: "Academic"
  },
  {
    slug: "travila-travel-platform",
    title: "Travila – Travel Agency Platform",
    short: "End-to-end travel booking and management web platform.",
    description: `Designed and prototyped the user experience for a scalable, secure travel agency platform that facilitates direct interaction between travelers, agencies, and system admins.

Core Functionalities:
- Dynamic Package Management: Allowed service providers to easily create, modify, and manage travel package listings.
- Role-Based Access: Dedicated structural dashboards for Travelers (booking history), Providers (analytics/sales), and Admins (platform oversight).
- Flow Demonstrations: Formulated highly interactive flows illustrating real-time booking, secure checkout sequences, and itinerary builders.`,
    features: [
      "Highly interactive layout built with professional Figma components",
      "Comprehensive CRUD wireframes mapped for dynamic user data",
      "Role-Based Access Control portal layouts designed from scratch",
      "Demonstrated interactive payment checkout and cancellation safety paths",
      "Fully responsive layouts mapped across desktop and mobile screens"
    ],
    tech: ["Figma", "UI/UX Design", "Wireframing", "Interaction Design"],
    screenshots: [],
    category: "web-ai", // Figma prototype primarily
    badge: "Academic",
    links: {
      figma: "https://www.figma.com" // Update with appropriate link
    }
  },
  {
    slug: "media-merch-platform",
    title: "Media & Merchandising Platform",
    short: "E-commerce meets community for anime/movie fans and merchandisers.",
    description: `A custom-built full-stack platform bridging movie/anime fans, independent merchandisers, and production studios. 

Key Modules:
- User Dashboard: Offers personalized lists, watchlist tracking, and dynamic suggestions.
- E-Commerce Module: Product catalogs, live inventories, order queues, and direct seller pipelines.
- Normalized Schema: Engineered with Oracle SQL from scratch to support normalized datasets, foreign key relationships, and security policies.`,
    features: [
      "Custom e-commerce cart, checkout, and merchandiser interface",
      "Dynamic watchlist filtering and personalized suggestions",
      "Role-Based Access Control using Oracle SQL schemas",
      "Studio dashboard for posting promotional news and updates",
      "Informed by localized retail store user research and surveys"
    ],
    tech: ["Node.js", "Oracle SQL", "React.js", "CSS", "JavaScript", "REST APIs"],
    screenshots: [],
    category: "web-ai",
    badge: "Academic"
  },
  {
    slug: "fire-fighting-robot",
    title: "Arduino-Based Fire-Fighting Robot",
    short: "Autonomous and manual fire detection and suppression robot.",
    description: `A hardware fire-fighting vehicle prototype equipped with sensors and active extinguish modules designed for hazardous area container cooling and fire suppression.

Key Architecture:
- Direct Fire Tracking: Utilizes 3 infrared flame sensors (left, right, center) to map fire origins.
- Active Suppression: Once inside range, activates a servo-rotated gas-based spray system covering sweeps of 50°–130°.
- Safe Navigation: Employs a front-mounted ultrasonic sensor to steer clear of obstacles in high-smoke environments.`,
    features: [
      "Directional tracking using a 3-way infrared flame sensor grid",
      "Autonomous search-and-contain movement algorithms",
      "Servo-swept fire extinguisher active spray integration",
      "Ultrasonic proximity sensor for navigation around terrain",
      "Dual 3.7V battery-powered standalone operation"
    ],
    tech: ["Arduino Uno", "IR Flame Sensors", "Ultrasonic Sensors", "Servo Motors", "C++"],
    screenshots: [],
    category: "iot",
    badge: "Academic"
  },
  {
    slug: "sayhello-language-platform",
    title: "SayHello – Language Learning Desktop Platform",
    short: "JavaFX application connecting language learners with instructors and speakers.",
    description: `A JavaFX desktop application structured around OOP principles to connect language students with native speakers and professional tutors.

Key Modules:
- Dynamic Classroom: Allows educators to create courses, upload lessons, distribute PDFs, and grade progress.
- Real-Time Translation: Integrates the Microsoft Azure Translator API supporting instant translation across six core languages.
- Community Communication: Includes multi-role real-time chats, active social feeds, and smart study pairing profiles.`,
    features: [
      "Interactive GUI built with JavaFX and Scene Builder",
      "Real-time multilingual translation via Azure Translator API",
      "Dynamic student & instructor role-based platform navigation",
      "File-based local persistent storage for user accounts and documents",
      "Built-in peer messaging and social activity feed"
    ],
    tech: ["Java", "JavaFX", "Scene Builder", "Azure Translator API", "OOP"],
    screenshots: [],
    category: "other",
    badge: "Academic"
  },
  {
    slug: "boiapp-ebook-reader",
    title: "BoiApp – Secure EPUB E-Reader Platform",
    short: "Secure mobile ebook reader with Single-Device access authentication.",
    description: `Developed the core framework for an EPUB e-reader application designed for catalog sales and digital book distribution.

Key Features:
- Secure Local Reading: Implemented chapter-wise book download pipelines and secure offline reading modules.
- Single-Device Verification: Integrates secure mobile registration limiting active access to one designated device.
- Administrative Web System: Crafted the admin interface to facilitate bulk order processing, client lists, and book catalog revisions.`,
    features: [
      "EPUB custom formatting and parsing rendering engine",
      "Chapter-based secure file download and offline storage layout",
      "SMS-based secure registration with unique single-device lock protocols",
      "Admin Next.js panel for catalog, client, and order monitoring",
      "Lightweight, customizable mobile reader interface"
    ],
    tech: ["Flutter", "Next.js", "Tailwind CSS", "Supabase", "EPUB Parser"],
    screenshots: [],
    category: "mobile",
    badge: "Production"
  },
  {
    slug: "blender-graphics-projects",
    title: "Blender 3D Graphics & Environment Modeling",
    short: "Collection of three 3D modeled graphic environments designed in Blender.",
    description: `A collection of three comprehensive 3D modeled graphical environments completed for academic Computer Graphics coursework.

Key Areas:
- Asset Modeling: Crafted structural meshes and props from scratch using polygon reduction techniques.
- Shader Nodes: Formulated custom normal mappings, reflective surfaces, and materials.
- Visual FX Lighting: Leveraged Cycles render engines to execute naturalistic direct, ambient, and environment light mapping.`,
    features: [
      "Designed and modeled full custom visual 3D environments",
      "Configured advanced materials using Blender’s procedural shader nodes",
      "Optimized polygon topologies for fluid graphics rendering",
      "Configured multi-light environments and ambient occlusion profiles"
    ],
    tech: ["Blender", "Cycles Engine", "3D Modeling", "Texture Shading"],
    screenshots: [],
    category: "other",
    badge: "Academic"
  }
];