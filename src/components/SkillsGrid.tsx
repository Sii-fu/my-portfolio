import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { FaHtml5, FaCss3Alt, FaJs, FaReact, FaNodeJs, FaGit, FaLinux, FaJava, FaGithub, FaSass, FaBootstrap, FaDocker, FaFigma, FaPython, FaMicrosoft, FaVuejs } from 'react-icons/fa';
import { SiTailwindcss, SiNextdotjs, SiTypescript, SiFramer, SiExpress, SiMongodb, SiMysql, SiPostgresql, SiPrisma, SiZod, SiShadcnui, SiPnpm, SiPostman, SiVercel, SiRedux, SiTrpc, SiNestjs, SiLangchain, SiOpencv, SiHuggingface, SiGoogle, SiFirebase, SiSupabase, SiJest, SiCypress, SiGitlab, SiNetlify, SiFlutter, SiDart, SiC, SiSvelte } from 'react-icons/si';

const skills = [
  // 🧠 Core Web
  { label: "HTML", icon: <FaHtml5 className="text-orange-600" /> },
  { label: "CSS", icon: <FaCss3Alt className="text-blue-600" /> },
  { label: "JavaScript", icon: <FaJs className="text-yellow-400" /> },
  { label: "TypeScript", icon: <SiTypescript className="text-blue-500" /> },

  // ⚛️ Frontend Frameworks
  { label: "ReactJS", icon: <FaReact className="text-cyan-400" /> },
  { label: "NextJS", icon: <SiNextdotjs /> },
  // { label: "VueJS", icon: <FaVuejs className="text-green-500" /> },
  // { label: "Svelte", icon: <SiSvelte className="text-orange-500" /> },

  // 🎨 Styling & Animations
  { label: "Tailwind CSS", icon: <SiTailwindcss className="text-sky-400" /> },
  // { label: "Sass", icon: <FaSass className="text-pink-500" /> },
  { label: "Framer Motion", icon: <SiFramer className="text-pink-400" /> },
  // { label: "Shadcn", icon: <SiShadcnui /> },
  // { label: "Bootstrap", icon: <FaBootstrap className="text-purple-600" /> },

  // ⚙️ State Management
  // { label: "Redux", icon: <SiRedux className="text-purple-500" /> },

  // 💾 Backend
  { label: "NodeJS", icon: <FaNodeJs className="text-green-500" /> },
  { label: "ExpressJS", icon: <SiExpress /> },
  // { label: "tRPC", icon: <SiTrpc /> },
  // { label: "NestJS", icon: <SiNestjs className="text-red-500" /> },
  // { label: "Prisma", icon: <SiPrisma /> },
  // { label: "Zod", icon: <SiZod /> },

  // 🧠 LLM & AI
  { label: "LangChain", icon: <SiLangchain /> },
  { label: "Python", icon: <FaPython className="text-yellow-400" /> },
  { label: "OpenCV", icon: <SiOpencv className="text-blue-400" /> },
  { label: "Hugging Face", icon: <SiHuggingface className="text-yellow-400" /> },
  { label: "Gemini", icon: <SiGoogle className="text-blue-500" /> },

  // 🛢️ Databases
  { label: "MongoDB", icon: <SiMongodb className="text-green-700" /> },
  { label: "MySQL", icon: <SiMysql className="text-blue-700" /> },
  { label: "PostgreSQL", icon: <SiPostgresql className="text-blue-500" /> },
  { label: "Firebase", icon: <SiFirebase className="text-yellow-400" /> },
  { label: "Supabase", icon: <SiSupabase className="text-green-500" /> },

  // 🧪 Testing
  // { label: "Jest", icon: <SiJest className="text-pink-600" /> },
  // { label: "Cypress", icon: <SiCypress className="text-green-600" /> },
  // { label: "Playwright", icon: <FaMicrosoft className="text-blue-600" /> },

  // 🚀 DevOps / Infra
  { label: "Git", icon: <FaGit className="text-orange-600" /> },
  { label: "GitHub", icon: <FaGithub /> },
  // { label: "GitLab", icon: <SiGitlab className="text-orange-400" /> },
  { label: "Vercel", icon: <SiVercel /> },
  { label: "Netlify", icon: <SiNetlify className="text-green-500" /> },
  { label: "Docker", icon: <FaDocker className="text-blue-500" /> },
  { label: "Postman", icon: <SiPostman className="text-orange-400" /> },
  { label: "Linux", icon: <FaLinux /> },
  // { label: "pnpm", icon: <SiPnpm className="text-yellow-500" /> },

  // 📱 Mobile
  { label: "Flutter", icon: <SiFlutter className="text-sky-400" /> },
  { label: "Dart", icon: <SiDart className="text-blue-600" /> },
  // { label: "React Native", icon: <FaReact className="text-cyan-400" /> },

  // 🧠 Others
  { label: "Java", icon: <FaJava className="text-red-600" /> },
  { label: "C/C++", icon: <SiC className="text-blue-600" /> },
  { label: "Figma", icon: <FaFigma className="text-purple-400" /> },
];

export function SkillsGrid() {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    cardRefs.current.forEach((card) => {
      if (!card) return;
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
    <div
        className="w-screen px-4 py-16 text-light flex flex-col items-center relative"
        style={{ paddingTop: "10vh", paddingBottom: "10vh" }}
    >
        <div
            className="absolute inset-0 z-0 pointer-events-none"
            style={{
                backdropFilter: "blur(132px)",
                WebkitBackdropFilter: "blur(132px)",
            }}
        />
        <h2 className="text-6xl text-[var(--color-0)] font-bold mb-4 drop-shadow-[0_4px_80px_var(--color-0)] z-10 relative">
            My Tech Stack
        </h2>
        <p className="text-2xl text-light mb-8 font-milker z-10 relative">
            I constantly try to improve
        </p>
        <div className="flex flex-wrap justify-center gap-4 max-w-5xl z-10 relative">
            {skills.map(({ label, icon }, i) => (
                <div
                    key={i}
                    ref={el => { cardRefs.current[i] = el as HTMLDivElement | null; }}
                    className="flex items-center gap-2 px-5 py-2 bg-[var(--color-5)] text-[var(--color-1)] rounded-full shadow-lg font-semibold border border-[var(--color-4)] justify-center group cursor-pointer transition-all duration-300"
                >
                    <div className="text-2xl flex items-center justify-center">{icon}</div>
                    <span className="text-base font-milker transition-all duration-300">{label}</span>
                </div>
            ))}
        </div>
    </div>
);
}
