"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import Matter from "matter-js";
import { motion } from "framer-motion";

gsap.registerPlugin(ScrollToPlugin);

// const skillss = [
//   "JavaScript",
//   "React",
//   "Next.js",
//   "Node.js",
//   "TailwindCSS",
//   "TypeScript",
//   "Python",
//   "C++",
//   "JavaScript",
//   "React",
//   "Next.js",
//   "Node.js",
//   "TailwindCSS",
//   "TypeScript",
//   "Python",
//   "C++",
// ];

// export function SkillsPhysics() {
//   const sceneRef = useRef<HTMLDivElement>(null);
//   const [positions, setPositions] = useState<
//     { x: number; y: number; angle: number }[]
//   >([]);
//   const engineRef = useRef<Matter.Engine | null>(null);
//   const bodiesRef = useRef<Matter.Body[]>([]);
//   const animationFrameRef = useRef<number | null>(null);

//   useEffect(() => {
//     const {
//       Engine,
//       Render,
//       World,
//       Bodies,
//       Runner,
//       Composite,
//       Mouse,
//       MouseConstraint,
//     } = Matter;


//     const engine = Engine.create();
//     const world = engine.world;
//     engineRef.current = engine;

//     const bounds = { width: 800, height: 500 };

//     // Add walls
//     const walls = [
//       Bodies.rectangle(bounds.width / 2, 0, bounds.width, 20, { isStatic: true }),
//       Bodies.rectangle(bounds.width / 2, bounds.height, bounds.width, 20, { isStatic: true }),
//       Bodies.rectangle(0, bounds.height / 2, 20, bounds.height, { isStatic: true }),
//       Bodies.rectangle(bounds.width, bounds.height / 2, 20, bounds.height, { isStatic: true }),
//     ];
//     World.add(world, walls);

//     // Create skill boxes
//     const skillBodies = skills.map(() =>
//       Bodies.rectangle(
//         100 + Math.random() * 600,
//         100 + Math.random() * 300,
//         120,
//         50,
//         {
//           restitution: 0.9,
//           friction: 1,
//           frictionAir: 0.02,
//         }
//       )
//     );

//     bodiesRef.current = skillBodies;
//     World.add(world, skillBodies);

//     // Mouse dragging support
//     if (sceneRef.current) {
//       const mouse = Mouse.create(sceneRef.current);
//       const mouseConstraint = MouseConstraint.create(engine, {
//         mouse,
//         constraint: {
//           stiffness: 0.2,
//           render: { visible: false },
//         },
//       });
//       World.add(world, mouseConstraint);
//     }

//     const runner = Runner.create();
//     Runner.run(runner, engine);

//     const update = () => {
//       const newPositions = skillBodies.map((body) => ({
//         x: body.position.x,
//         y: body.position.y,
//         angle: body.angle,
//       }));
//       setPositions(newPositions);
//       animationFrameRef.current = requestAnimationFrame(update);
//     };

//     update();

//     return () => {
//       // Clean up
//       if (animationFrameRef.current)
//         cancelAnimationFrame(animationFrameRef.current);
//       Runner.stop(runner);
//       Composite.clear(engine.world, false);
//       Engine.clear(engine);
//     };
//   }, []);

//   return (
//     <div className="w-full flex justify-center py-20">
//       <div
//         ref={sceneRef}
//         className="relative w-[800px] h-[500px] bg-primary/20 border border-accent rounded-xl overflow-hidden select-none"
//         style={{ touchAction: "none" }}
//       >
//         {positions.map((pos, i) => (
//           <motion.div
//             key={i}
//             className="absolute w-[120px] h-[50px] flex items-center justify-center text-dark rounded-4xl shadow-xl text-xl text-center pointer-events-none"
//             style={{
//               backgroundColor: "var(--color-1)",
//               left: pos.x - 60,
//               top: pos.y - 25,
//               rotate: `${pos.angle}rad`,
//               userSelect: "none",
//             }}
//           >
//             {skillss[i]}
//           </motion.div>
//         ))}
//       </div>
//     </div>
//   );
// }


// components/SkillsGrid.tsx
import { FaHtml5, FaCss3Alt, FaJs, FaReact, FaNodeJs, FaGit, FaLinux, FaJava, FaGithub } from 'react-icons/fa';
import { SiTailwindcss, SiNextdotjs, SiTypescript, SiFramer, SiExpress, SiMongodb, SiMysql, SiPostgresql, SiPrisma, SiZod, SiShadcnui, SiPnpm, SiPostman, SiVercel } from 'react-icons/si';

import ScrollTrigger from 'gsap/ScrollTrigger';


gsap.registerPlugin(ScrollTrigger);

const projects = [
  { 
    title: "Project One", 
    side: "left", 
    image: "/projects/project2.png" 
  },
  { 
    title: "MediaVerse", 
    side: "right", 
    image: "/projects/project1.png" 
  },
  { 
    title: "AskMe", 
    side: "left", 
    image: "/projects/project3.png" 
  },
  { 
    title: "Travila", 
    side: "right", 
    image: "/projects/project5.png" 
  },
  { 
    title: "SayHello", 
    side: "left", 
    image: "/projects/project4.png" 
  },
];

export function ProjectScroller() {
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isMobile = window.innerWidth <= 768;

    // Smaller card movement and spacing for 150vh
    const leftX = isMobile ? [-800, -700, -400, -600, -500] : [-400, -350, -200, -300, -250];
    const rightX = isMobile ? [800, 700, 400, 600, 500] : [400, 350, 200, 300, 250];
    const leftRot = isMobile ? [-20, -18, -15, -10, -12] : [-10, -8, -7, -6, -8];
    const rightRot = isMobile ? [20, 18, 15, 10, 12] : [10, 8, 7, 6, 8];
    // Distribute y positions evenly in 150vh (e.g., 150vh / 5 = 30vh per card)
    const yVals = isMobile
      ? [0, 0, 0, 0, 0]
      : [0, 0, 0, 0, 0];

    gsap.utils.toArray<HTMLDivElement>('.row').forEach((row, i) => {
      const leftCard = row.querySelector('.card-left');
      const rightCard = row.querySelector('.card-right');

      // Add some randomness to movement for diversity
      const randomOffsetX = gsap.utils.random(-60, 60);
      const randomOffsetY = gsap.utils.random(-60, 60);
      const randomRot = gsap.utils.random(-5, 5);

      if (leftCard) {
        ScrollTrigger.create({
          trigger: mainRef.current,
          start: 'top 80%',
          end: '150% bottom',
          scrub: true,
          onUpdate: (self) => {
        const progress = self.progress;
        gsap.set(leftCard, {
          x: progress * ((leftX[i] ?? leftX[leftX.length - 1]) + randomOffsetX),
          y: progress * ((yVals[i] ?? yVals[yVals.length - 1]) + randomOffsetY),
          rotation: progress * ((leftRot[i] ?? leftRot[leftRot.length - 1]) + randomRot),
        });
          },
        });
      }

      if (rightCard) {
        ScrollTrigger.create({
          trigger: mainRef.current,
          start: 'top 80%',
          end: '150% bottom',
          scrub: true,
          onUpdate: (self) => {
        const progress = self.progress;
        gsap.set(rightCard, {
          x: progress * ((rightX[i] ?? rightX[rightX.length - 1]) + randomOffsetX),
          y: progress * ((yVals[i] ?? yVals[yVals.length - 1]) + randomOffsetY),
          rotation: progress * ((rightRot[i] ?? rightRot[rightRot.length - 1]) + randomRot),
        });
          },
        });
      }
    });
  }, []);

  // Card height: 180px, width: 340px, gap: 32px, fits 5 cards in 150vh
  return (
    <section
      ref={mainRef}
      className="main  w-full max-h-[110vh] bg-black py-10 overflow-hidden text-white flex flex-col items-center justify-center relative"
    >
      <h2 className="text-9xl absolute  font-bold mb-12 text-center text-[var(--color-0)] z-30 drop-shadow-[0_0_100px_var(--color-0)]">Projects</h2>
      <div className="w-full flex flex-col items-center gap-0">
        {projects.map((project, i) => (
          <div
            key={i}
            className={`row relative pl-60 pr-60 pt-0 pb-0 w-full flex ${
          project.side === 'left' ? 'justify-start' : 'justify-end'
              } items-center`}
            style={{
              height: "180px",
              marginBottom: i !== projects.length - 1 ? "30px" : "0",
            }}
          >
            <div
              className={`card ${
          project.side === 'left' ? 'card-left' : 'card-right'
              } w-[700px] h-[400px] rounded-xl bg-zinc-800 shadow-2xl flex items-center justify-center text-6xl font-bold transition-transform duration-0 border-5 border-[var(--color-3)] drop-shadow-[0_40px_80px_var(--color-4)] relative overflow-hidden`}
              style={{
          backgroundImage: `url(${project.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
              }}
            >
              <div className="absolute inset-0 bg-black/50 pointer-events-none rounded-xl" />
              <span className="relative z-10">{project.title}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}




const skills = [
  { label: "HTML", icon: <FaHtml5 className="text-orange-600" /> },
  { label: "CSS", icon: <FaCss3Alt className="text-blue-600" /> },
  { label: "JavaScript", icon: <FaJs className="text-yellow-400" /> },
  { label: "TypeScript", icon: <SiTypescript className="text-blue-500" /> },
  { label: "ReactJS", icon: <FaReact className="text-cyan-400" /> },
  { label: "NextJS", icon: <SiNextdotjs /> },
  { label: "Tailwind CSS", icon: <SiTailwindcss className="text-sky-400" /> },
  { label: "Framer Motion", icon: <SiFramer className="text-pink-400" /> },
  { label: "Shadcn", icon: <SiShadcnui /> },
  { label: "NodeJS", icon: <FaNodeJs className="text-green-500" /> },
  { label: "ExpressJS", icon: <SiExpress /> },
  { label: "MongoDB", icon: <SiMongodb className="text-green-700" /> },
  { label: "MySQL", icon: <SiMysql className="text-blue-700" /> },
  { label: "PostgreSQL", icon: <SiPostgresql className="text-blue-500" /> },
  { label: "Prisma", icon: <SiPrisma /> },
  { label: "Zod", icon: <SiZod /> },
  { label: "Git", icon: <FaGit className="text-orange-600" /> },
  { label: "GitHub", icon: <FaGithub /> },
  { label: "Vercel", icon: <SiVercel /> },
  { label: "Postman", icon: <SiPostman className="text-orange-400" /> },
  { label: "Java", icon: <FaJava className="text-red-600" /> },
  { label: "Linux", icon: <FaLinux /> },
  { label: "pnpm", icon: <SiPnpm className="text-yellow-500" /> },
];

export function SkillsGrid() {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    cardRefs.current.forEach((card, i) => {
      if (!card) return;
      // Remove any previous listeners to avoid stacking
      
      card.onmouseenter = () => {
        gsap.to(card, {
          scale: 1.1,
          rotate: gsap.utils.random(-4, 4),
          boxShadow: '0px 0px 24px var(--color-0)',
          background: 'var(--color-5)',
          color: 'linear-gradient(90deg, var(--color-blue-600) 60%, var(--color-purple-700) 100%)',
          duration: 0.1,
          ease: 'expo.inOut',
        });
      };
      card.onmouseleave = () => {
        gsap.to(card, {
          scale: 1,
          rotate: gsap.utils.random(-4, 4),
          boxShadow: '0 2px 10px var(--color-1)',
          background: 'var(--color-5)',
          color: 'var(--color-1)',
          duration: 0.1,
          ease: 'expo.inOut',
        });
      };
    });
  }, []);

  return (
    <div className="w-full px-4 py-16 text-light flex flex-col items-center" style={{ paddingTop: "30vh", paddingBottom: "30vh" }}>
      <h2 className="text-6xl text-[var(--color-0)] font-bold mb-4 drop-shadow-[0_4px_80px_var(--color-0)]">My Tech Stack</h2>
      <p className="text-2xl text-light  mb-8 font-milker">I constantly try to improve</p>
      <div className="flex flex-wrap justify-center gap-4 max-w-5xl">
        {skills.map(({ label, icon }, i) => (
            <div
              key={i}
              ref={el => { cardRefs.current[i] = el as HTMLDivElement | null; }}
              className="
              flex 
              items-center 
              gap-2 
              px-5 
              py-2 
              bg-[var(--color-5)] 
              text-[var(--color-1)] 
              rounded-full 
              shadow-lg 
              font-semibold 
              border 
              border-[var(--color-4)]
              justify-center
              group
              cursor-pointer
              transition-all
              duration-300
              "
            >
              <div className="text-2xl flex items-center justify-center">{icon}</div>
              <span
              className="
                text-base 
                font-milker
                transition-all
                duration-300
              "
              >
              {label}
              </span>
            </div>
        ))}
      </div>
    </div>
  );
}



const greetings = [
  "ٱلسَّلَامُ عَلَيْكُمْ", "Hello", "Bonjour", "Hola", "Ciao", "Привет",
  "こんにちは", "안녕하세요","Hi", "你好", "Merhaba", "Здраво",
  "שלום", "नमस्ते",
];

function InfiniteScrollAnimation() {
  return (
    <div className="  relative w-full overflow-hidden py-4">
      <div className="flex infinite-scroll whitespace-nowrap w-max">
        {/* Entire content repeated twice inside one scrolling div */}
        {[...greetings, ...greetings].map((greeting, index) => (
          <div key={index} className="text-base lg:text-3xl md:text-2xl sm:text-2xl font-bold font-milker px-5">
            {greeting}
          </div>
        ))}
      </div>
    </div>
  );
}

export function Navbar({ category, onScrollTo }: { category: string, onScrollTo?: (category: string) => void }) {
  // const router = useRouter(); // REMOVE THIS LINE
  // Responsive: use max-w-xs and min-w-[120px] for card width, and make sure flex-wrap is enabled in the parent
  return (
    <div
      className="
      w-full
      max-w-xs
      min-w-[120px]
      sm:w-[350px] md:w-[300px] lg:w-[350px]
      bg-primary
      border-[6px]
      border-[var(--color-4)]
      shadow-[12px_12px_0_var(--color-0)]
      transition-all
      duration-500
      ease-in-out
      hover:-translate-x-[5px]
      hover:-translate-y-[5px]
      hover:shadow-[0_0_40px_var(--color-0),17px_17px_0_var(--color-0)]
      hover:scale-105
      group
      relative
      flex
      flex-col
      items-start
      justify-start
      p-4 sm:p-6
      rounded-lg
      overflow-hidden
      cursor-pointer
      hover:bg-secondary
      transform-gpu
      flex-1 md:flex-none
      "
      onClick={() => {
        if (onScrollTo) onScrollTo(category);
      }}
      tabIndex={0}
      role="button"
      onKeyDown={e => {
        if ((e.key === "Enter" || e.key === " ") && onScrollTo) {
          onScrollTo(category);
        }
      }}
      aria-label={`Go to ${category} section`}
    >
      <span
        className="
        block
        text-2xl sm:text-3xl md:text-[32px]
        font-black
        uppercase
        text-darkest
        mb-2 sm:mb-4
        relative
        overflow-visible
        after:content-['']
        after:absolute
        after:bottom-0
        after:left-0
        after:w-0
        after:h-[3px]
        after:bg-gradient-to-r after:from-accent after:to-darkest
        hover:after:w-[90%]
        after:transition-all
        after:duration-500
        after:ease-in-out
      "
      >
        {category}
      </span>
      <p
        className="
        text-sm sm:text-base md:text-[16px]
        leading-snug
        text-dark
        mb-3 sm:mb-5
        opacity-0
        max-h-0
        translate-y-4
        group-hover:opacity-100
        group-hover:max-h-40
        group-hover:translate-y-0
        transition-all
        duration-500
        ease-in-out
        overflow-hidden
      "
      >
        {category === "About"
          ? "Unlock the secrets of my mysterious existence. Spoiler: I run on coffee and bad puns."
          : category === "Projects"
          ? "See what happens when caffeine meets code. Expect magic, mayhem, and maybe a bug or two."
          : category === "Journey"
          ? "Follow my epic quest through the tech jungle. There will be memes, milestones, and misadventures."
          : category === "Contact me"
          ? "Slide into my inbox—no spam, just good vibes and maybe a dad joke."
          : "Subscribe for updates, chaos, and the occasional existential meme."}
      </p>
      
    </div>
  );
}

// export function NavbarSmol({ category, onScrollTo }: { category: string, onScrollTo?: (category: string) => void }) {
//   const navbarRef = useRef<HTMLDivElement>(null);
//   const onTop = useRef<HTMLDivElement>(null!);

//   useEffect(() => {
//     const handleScroll = () => {
//       const scrollY = window.scrollY;
//       if (navbarRef.current) {
//         if (scrollY > 100) {
//           gsap.to(navbarRef.current, {
//             position: "fixed",
//             top: 20,
//             right: 20,
//             x: 0,
//             y: 0,
//             width: "60px",
//             height: "60px",
//             zIndex: 999,
//             ease: "power2.out",
//             duration: 0.7,
//           });
//         } else {
//           gsap.to(navbarRef.current, {
//             position: "static",
//             width: "50px",
//             height: "50px",
//             ease: "power2.inOut",
//             duration: 0.5,
//           });
//         }
//       }
//     };
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   const handleClick = () => {
//     if (onScrollTo) {
//       onScrollTo(category);
//     }
//   };

//   return (
//     <div ref={navbarRef}>
//       <div
//         className="
//           w-[50px]
//           h-[50px]
//           bg-primary
//           border-[6px]
//           border-[var(--color-4)]
//           shadow-[12px_12px_0_var(--color-0)]
//           transition-all
//           duration-500
//           ease-in-out
//           hover:-translate-x-[5px]
//           hover:-translate-y-[5px]
//           hover:shadow-[0_0_40px_var(--color-0),17px_17px_0_var(--color-0)]
//           hover:scale-105
//           group
//           flex
//           items-center
//           justify-center
//           p-2
//           rounded-lg
//           overflow-hidden
//           cursor-pointer
//           hover:bg-secondary
//           transform-gpu
//         "
//         onClick={handleClick}
//       >
//         <span
//           className="
//             block
//             text-lg
//             font-black
//             uppercase
//             text-darkest
//             relative
//             overflow-visible
//             after:content-['']
//             after:absolute
//             after:bottom-0
//             after:left-0
//             after:w-0
//             after:h-[3px]
//             after:bg-gradient-to-r after:from-accent after:to-darkest
//             hover:after:w-[90%]
//             after:transition-all
//             after:duration-500
//             after:ease-in-out
//           "
//         >
//           {category}
//         </span>
//       </div>
//     </div>
//   );
// }

export function AboutPart({ onDownClick, skillsGridRef }: { onDownClick?: () => void, skillsGridRef?: React.RefObject<HTMLDivElement> }) {
  const desc = useRef<HTMLDivElement>(null!);
  const greetingRef = useRef<HTMLSpanElement>(null);
  const [greetingIndex, setGreetingIndex] = useState(0);

  useEffect(() => {
    let isMounted = true;
    let timeout: NodeJS.Timeout;
    function animateGreeting() {
    if (!greetingRef.current) return;

    const tl = gsap.timeline({ defaults: { duration: 0.5, ease: "power3.inOut" } });

    // Step 1: Fade out current greeting
    tl.fromTo(greetingRef.current,
      {
        scale: 1,
        opacity: 1,
        filter: "blur(0px)",
        y: 0,
      },
      {
        scale: 0.5,
        opacity: 0,
        filter: "blur(12px)",
        y: 0,
        duration: 0.6,
        ease: "power4.in",
        pointerEvents: "none",
      });
    tl.add(() => {
      if (isMounted) {
        setGreetingIndex((prev) => (prev + 1) % greetings.length);
      }
    });
    // Step 2: Fade in the new greeting
    tl.fromTo(
      greetingRef.current,
      {
        scale: .5,
        opacity: 0,
        filter: "blur(10px)",
        y: 0,
      },
      {
        scale: 1,
        opacity: 1,
        filter: "blur(0px)",
        y: 0,
        duration: 0.6,
        ease: "power4.out",
        pointerEvents: "auto",
      }
    );

    timeout = setTimeout(animateGreeting, 2000);
  }

    animateGreeting();
    return () => {
      isMounted = false;
      clearTimeout(timeout);
    };
  }, []);

  return (
    <div className="w-full justify-start items-start flex flex-col px-4 md:px-8 lg:px-16 xl:px-32 relative group/about">
      <h2 className="text-4xl font-bold mt-20">About Me</h2>
      <div className="w-full min-h-[90vh] flex flex-row-reverse items-center pb-0">
        <div 
          className="w-full max-w-4xl mx-auto flex flex-col gap-6 p-6 sm:p-10 bg-primary/70 backdrop-blur-md rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.2)] border border-dark"
        >
          <div className="relative">
            <h3 className="text-4xl sm:text-5xl font-extrabold text-[var(--color-0)] drop-shadow-glow tracking-tight">
              Who am I?
            </h3>
          </div>
          <div className="flex items-center text-4xl">
            <span
              ref={greetingRef}
              className="inline-block origin-left transition-transform"
            >
              {greetings[greetingIndex]}{", "}
            </span>
          </div>
          <p className="text-2xl sm:text-3xl text-light leading-snug font-semibold">
            I’m <span className="text-[var(--color-0)] font-bold">Sifat Bin Asad</span> — a software engineer with a caffeine dependency and a passion for building cool, functional, occasionally chaotic things on the web.
          </p>
          <p className="text-lg sm:text-xl text-light/90 leading-relaxed tracking-wide ">
            I’m currently pursuing my Bachelor's in Computer Science & Engineering at MIST, where I spend half my time learning algorithms — and the other half debugging why my side projects won’t compile at 2AM. I'm passionate about turning random ideas into real-world projects, especially when it involves slick UIs, smooth UX, or wrangling LLMs that hallucinate less than I do during finals week.
          </p>
          <p className="text-lg sm:text-xl text-light/90 leading-relaxed tracking-wide">
            I’m based in Dhaka, Bangladesh, where I spend my days coding, designing, and trying to convince my friends that debugging is a form of meditation. When I’m not glued to my laptop, you can find me exploring the latest tech trends, binge-watching sci-fi series, or attempting to cook (with varying degrees of success).
          </p>


        </div>

        <div className="w-full ">
          <img
            src="/profile.png"
            alt="Sifat Bin Asad"
            className="w-100 h-100 object-cover shadow-lg mx-auto rounded-xl"
          />
        </div>
      </div>
      
    </div>
  );
}

export default function Home() {
  const aboutRef = useRef<HTMLDivElement>(null!);
  const projectsRef = useRef<HTMLDivElement>(null!);
  const journeyRef = useRef<HTMLDivElement>(null!);
  const contactRef = useRef<HTMLDivElement>(null!);
  const skillsGridRef = useRef<HTMLDivElement>(null);

  const handleScrollTo = (category: string) => {
    let ref: React.RefObject<HTMLDivElement> | null = null;
    if (category === "About") ref = aboutRef;
    else if (category === "Projects") ref = projectsRef;
    else if (category === "Journey") ref = journeyRef;
    else if (category === "Contact") ref = contactRef;
    if (ref && ref.current) {
      gsap.to(window, {
        scrollTo: { y: ref.current, offsetY: 40 },
        duration: 1,
        ease: "power2.inOut"
      });
    }
  };

  

  return (  
    <main className="flex min-h-screen flex-col items-start  overflow-x-hidden overflow-y-auto">
      <div className="flex flex-row md:flex-col justify-center place-items-center md:items-start w-full pb-55 gap-0">
        <div className="flex flex-col items-start justify-start pt-10 md:pt-20 lg:pt-30 xl:pt-40 w-full">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-evenly w-full">
            <h1 className="text-6xl md:text-9xl font-bold font-brillant mr-8">
            <p className="text-lg md:text-2xl font-bold font-milker xl: pb-2 md:pb-5">I'm</p>
              Sifat Bin Asad
            </h1>
            <ul className="flex flex-col justify-start md:pl-12 lg:pl-20 xl:pl-32 list-disc list-inside">
              <li className="text-base md:text-lg font-bold font-milker pl-0 md:pl-8">Software Engineer</li>
              <li className="text-base md:text-lg font-bold font-kugile pl-0 md:pl-8">UI/UX Designer</li>
              <li className="text-base md:text-lg font-bold font-milker pl-0 md:pl-8">Web Developer</li>
            </ul>
          </div>
        </div>

        <div className="relative overflow-hidden w-full py-2 md:py-0">
          <div className="absolute left-0 top-0 h-full w-16 md:w-100 bg-gradient-to-r from-[var(--color-6)] z-10" />
          <div className="absolute right-0 top-0 h-full w-16 md:w-100 bg-gradient-to-l from-[var(--color-6)] z-10" />
          <InfiniteScrollAnimation />
        </div>

        <div className="flex flex-col md:flex-row justify-evenly place-items-center md:items-start w-full pt-40 gap-0 ">
          <Navbar category="About" onScrollTo={handleScrollTo} />
          <Navbar category="Projects" onScrollTo={handleScrollTo} />
          <Navbar category="Journey" onScrollTo={handleScrollTo} />
          <Navbar category="Contact" onScrollTo={handleScrollTo} />
        </div>
      </div>
    {/* 
      <NavbarSmol category="About" onScrollTo={handleScrollTo} />
      <NavbarSmol category="Projects" onScrollTo={handleScrollTo} />
      <NavbarSmol category="Journey" onScrollTo={handleScrollTo} />
      <NavbarSmol category="Contact" onScrollTo={handleScrollTo} /> */}


      <div ref={aboutRef} className="w-full min-h-[10vh] flex flex-col items-center justify-center border-2 border-dashed border-[var(--color-0)]">
        <AboutPart skillsGridRef={skillsGridRef as React.RefObject<HTMLDivElement>} />
        <div ref={skillsGridRef}>
          <SkillsGrid />
        </div>
        {/* <SkillsPhysics /> */}
      </div>
      <div ref={projectsRef} className="w-full min-h-[100vh] flex items-center justify-center border-2 border-dashed border-[var(--color-0)]">
        {/* <h2 className="text-3xl font-bold text-primary">Projects Section</h2> */}
        <ProjectScroller />
      </div>
      <div ref={journeyRef} className="w-full min-h-[100vh] flex items-center justify-center border-2 border-dashed border-[var(--color-0)]">
        <h2 className="text-3xl font-bold text-primary">Journey Section</h2>
      </div>
      <div ref={contactRef} className="w-full min-h-[100vh] flex items-center justify-center border-2 border-dashed border-[var(--color-0)]">
        <h2 className="text-3xl font-bold text-primary">Contact Section</h2>
      </div>
      <footer className="w-full text-center py-4 mt-10 bg-darkest text-primary">
        <p className="text-sm">
          © {new Date().getFullYear()} Sifat Bin Asad. All rights reserved.
        </p>
      </footer>
    </main>

  );
}

