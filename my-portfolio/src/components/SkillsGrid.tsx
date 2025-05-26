import { useRef, useEffect } from "react";
import { gsap } from "gsap";

const skills = [
  { label: "HTML", icon: <span className="text-orange-600">HTML</span> },
  { label: "CSS", icon: <span className="text-blue-600">CSS</span> },
  { label: "JavaScript", icon: <span className="text-yellow-400">JS</span> },
  { label: "TypeScript", icon: <span className="text-blue-500">TS</span> },
  { label: "ReactJS", icon: <span className="text-cyan-400">React</span> },
  { label: "NextJS", icon: <span>Next</span> },
  { label: "Tailwind CSS", icon: <span className="text-sky-400">Tailwind</span> },
  { label: "Framer Motion", icon: <span className="text-pink-400">Framer</span> },
  { label: "Shadcn", icon: <span>Shadcn</span> },
  { label: "NodeJS", icon: <span className="text-green-500">Node</span> },
  { label: "ExpressJS", icon: <span>Express</span> },
  { label: "MongoDB", icon: <span className="text-green-700">Mongo</span> },
  { label: "MySQL", icon: <span className="text-blue-700">MySQL</span> },
  { label: "PostgreSQL", icon: <span className="text-blue-500">Postgres</span> },
  { label: "Prisma", icon: <span>Prisma</span> },
  { label: "Zod", icon: <span>Zod</span> },
  { label: "Git", icon: <span className="text-orange-600">Git</span> },
  { label: "GitHub", icon: <span>GitHub</span> },
  { label: "Vercel", icon: <span>Vercel</span> },
  { label: "Postman", icon: <span className="text-orange-400">Postman</span> },
  { label: "Java", icon: <span className="text-red-600">Java</span> },
  { label: "Linux", icon: <span>Linux</span> },
  { label: "pnpm", icon: <span className="text-yellow-500">pnpm</span> },
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
    <div className="w-full px-4 py-16 text-light flex flex-col items-center" style={{ paddingTop: "30vh", paddingBottom: "30vh" }}>
      <h2 className="text-6xl text-[var(--color-0)] font-bold mb-4 drop-shadow-[0_4px_80px_var(--color-0)]">My Tech Stack</h2>
      <p className="text-2xl text-light  mb-8 font-milker">I constantly try to improve</p>
      <div className="flex flex-wrap justify-center gap-4 max-w-5xl">
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
