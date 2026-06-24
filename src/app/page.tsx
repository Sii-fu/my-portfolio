"use client";

import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { motion, useMotionValue, useSpring, useTransform, type MotionValue } from "framer-motion";
import { ProjectScroller } from "../components/ProjectScroller";
import { SkillsGrid } from "../components/SkillsGrid";
import { AboutPart, InfiniteScrollAnimation } from "../components/AboutPart";
import ContactSection from "../components/ContactSection";
import { useEffect, useMemo, useRef, useState, type RefObject } from "react";
import Particles from "../components/particle";
// import Journeysection from "../components/Journeysection";

gsap.registerPlugin(ScrollToPlugin);

type DockItemProps = {
  label: string;
  isActive: boolean;
  activeScale: number;
  isDockHovering: boolean;
  onClick: () => void;
  mouseY: MotionValue<number>;
};

function DockItem({ label, isActive, activeScale, isDockHovering, onClick, mouseY }: DockItemProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const centerY = useRef(0);
  const BASE_SCALE = 1.08;
  const activeTarget = useMotionValue(isActive ? activeScale : BASE_SCALE);
  const hoverTarget = useMotionValue(isDockHovering ? 1 : 0);

  useEffect(() => {
    const updateCenter = () => {
      const rect = ref.current?.getBoundingClientRect();
      if (rect) {
        centerY.current = rect.top + rect.height / 2;
      }
    };

    updateCenter();
    window.addEventListener("resize", updateCenter);
    return () => window.removeEventListener("resize", updateCenter);
  }, []);

  useEffect(() => {
    activeTarget.set(isActive ? activeScale : BASE_SCALE);
  }, [activeScale, activeTarget, isActive]);

  useEffect(() => {
    hoverTarget.set(isDockHovering ? 1 : 0);
  }, [hoverTarget, isDockHovering]);

  const distance = useTransform(mouseY, (value) => Math.abs(value - centerY.current));
  const hoverScale = useSpring(
    useTransform(distance, (value) => {
      const maxDistance = 160;
      const clamped = Math.min(value, maxDistance);
      const t = 1 - clamped / maxDistance;
      return 1 + t * 1;
    }),
    { stiffness: 150, damping: 13, mass: 1 }
  );
  const activeSpring = useSpring(activeTarget, { stiffness: 120, damping: 12, mass: 1 });
  const hoverAmount = useSpring(hoverTarget, { stiffness: 120, damping: 12, mass: 1 });
  const scale = useTransform(
    [activeSpring, hoverScale, hoverAmount],
    ([activeValue, hoverValue, amount]) => activeValue + (hoverValue - activeValue) * amount
  );

  return (
    <motion.button
      ref={ref}
      type="button"
      onClick={onClick}
      aria-current={isActive ? "page" : undefined}
      className={`group flex items-center rounded-full border border-white/40 bg-white/5 px-3 py-2 text-left backdrop-blur-md transition-colors ${isActive ? "text-white" : "text-white/50 hover:text-white"
        }`}
      style={{ scale, originX: 0, originY: 0.5 }}
    >
      <span
        className={`mr-2 h-2 w-2 rounded-full transition-colors ${isActive ? "bg-white" : "bg-white/50 group-hover:bg-white"
          }`}
      />
      <span
        className={`max-w-100 overflow-hidden whitespace-nowrap text-xs font-semibold tracking-wide transition-all duration-500 ${isActive
            ? "max-w-[500px] opacity-100 text-white"
            : "opacity-50 group-hover:max-w-[140px] group-hover:opacity-100"
          }`}
      >
        {label}
      </span>
    </motion.button>
  );
}

export default function Home() {
  const aboutRef = useRef<HTMLDivElement>(null!);
  const projectsRef = useRef<HTMLDivElement>(null!);
  const journeyRef = useRef<HTMLDivElement>(null!);
  const contactRef = useRef<HTMLDivElement>(null!);
  const skillsGridRef = useRef<HTMLDivElement>(null!);
  const blogsRef = useRef<HTMLDivElement>(null!);
  const heroRef = useRef<HTMLElement>(null!);
  const [activeSection, setActiveSection] = useState("About");
  const mouseY = useMotionValue(Number.POSITIVE_INFINITY);
  const [isHeroMode, setIsHeroMode] = useState(true);
  const [isDockHovering, setIsDockHovering] = useState(false);

  const sections = useMemo(
    () => [
      { label: "About", ref: aboutRef },
      { label: "Projects", ref: projectsRef },
      { label: "Blogs", ref: blogsRef },
      { label: "Contact", ref: contactRef }
    ],
    []
  );

  useEffect(() => {
    const updateActive = () => {
      const probe = window.innerHeight * 0.35;
      let closest = sections[0]?.label ?? "About";
      let minDistance = Number.POSITIVE_INFINITY;

      for (const section of sections) {
        const rect = section.ref.current?.getBoundingClientRect();
        if (!rect) continue;
        const distance = Math.abs(rect.top - probe);
        if (distance < minDistance) {
          minDistance = distance;
          closest = section.label;
        }
      }

      const heroRect = heroRef.current?.getBoundingClientRect();
      const nextHeroMode = heroRect ? heroRect.bottom > window.innerHeight * 0.6 : false;

      setActiveSection((prev) => (prev === closest ? prev : closest));
      setIsHeroMode((prev) => (prev === nextHeroMode ? prev : nextHeroMode));
    };

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        updateActive();
        ticking = false;
      });
    };

    updateActive();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", updateActive);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", updateActive);
    };
  }, [sections]);

  const handleScrollTo = (category: string) => {
    let ref: RefObject<HTMLDivElement> | null = null;
    if (category === "About") ref = aboutRef;
    else if (category === "Projects") ref = projectsRef;
    else if (category === "Journey") ref = journeyRef;
    else if (category === "Contact") ref = contactRef;
    else if (category === "Blogs") ref = blogsRef;

    if (ref?.current) {
      const offset = window.innerHeight * 0.01; // 10vh
      const y = ref.current.getBoundingClientRect().top + window.scrollY + offset;

      gsap.to(window, {
        scrollTo: y,
        duration: 1,
        ease: "power2.inOut"
      });
    }
  };

  return (
    <main className="relative flex min-h-screen flex-col items-center overflow-x-hidden overflow-y-auto">
      <section ref={heroRef} className="relative flex min-h-screen w-full items-center justify-center">
        <Particles className="absolute inset-0 -z-10 animate-fade-in" quantity={200} />
        <nav
          className="fixed left-6 top-1/2 z-50 flex -translate-y-1/2 flex-col gap-10 rounded-2xl border border-white/0 bg-white/0 p-3"
          onMouseEnter={() => setIsDockHovering(true)}
          onMouseMove={(event) => mouseY.set(event.clientY)}
          onMouseLeave={() => {
            setIsDockHovering(false);
            mouseY.set(Number.POSITIVE_INFINITY);
          }}
          aria-label="Primary"
        >
          {sections.map((section) => (
            <DockItem
              key={section.label}
              label={section.label}
              isActive={isHeroMode || activeSection === section.label}
              activeScale={isHeroMode ? 1.4 : 1.4}
              isDockHovering={isDockHovering}
              onClick={() => {
                setActiveSection(section.label);
                handleScrollTo(section.label);
              }}
              mouseY={mouseY}
            />
          ))}
        </nav>

        <div className="z-10 flex w-full max-w-5xl flex-col items-center px-6 text-center">
          <h1 className="text-5xl font-bold font-brillant text-primary md:text-8xl">
            Sifat Bin Asad
          </h1>
          <p className="mt-4 text-sm font-semibold text-primary/80 font-milker md:text-lg">
            Software Engineer • Web Developer • UI/UX Designer
          </p>
          <div className="relative mt-6 w-full overflow-hidden py-2">
            <div className="absolute left-0 top-0 h-full w-16 md:w-100 bg-gradient-to-r from-[var(--color-6)] z-10" />
            <div className="absolute right-0 top-0 h-full w-16 md:w-100 bg-gradient-to-l from-[var(--color-6)] z-10" />
            <InfiniteScrollAnimation />
          </div>
        </div>
      </section>
      {/* 
      <NavbarSmol category="About" onScrollTo={handleScrollTo} />
      <NavbarSmol category="Projects" onScrollTo={handleScrollTo} />
      <NavbarSmol category="Journey" onScrollTo={handleScrollTo} />
      <NavbarSmol category="Contact" onScrollTo={handleScrollTo} /> */}


      <div ref={aboutRef} className=" z-30 w-full min-h-[100vh] flex flex-col items-center justify-center">

        <AboutPart />
        <div ref={skillsGridRef}>
          <SkillsGrid />
        </div>
        {/* <SkillsPhysics /> */}
      </div>
      <div ref={projectsRef} className="w-full min-h-[100vh] flex items-center justify-center ">
        <ProjectScroller />
      </div>
      {/* <div ref={journeyRef} className="w-full min-h-[1000vh] flex items-start justify-center border-2 border-dashed border-[var(--color-0)]"> */}
      {/* <h2 className="text-3xl font-bold text-primary">Journey Section</h2> */}
      {/*  <Journeysection / */}
      {/* </div> */}
      <div ref={blogsRef} className="w-full min-h-[70vh] flex items-center justify-center">
        <h2 className="text-3xl font-bold text-primary">Blogs Section(coming soon)</h2>

      </div>
      <div ref={contactRef} className="w-full min-h-[100vh] flex items-center justify-center ">
        {/* <h2 className="text-3xl font-bold text-primary">Contact Section</h2> */}
        <ContactSection />

      </div>
      <footer className="w-full text-center py-4 mt-10 bg-darkest text-primary">
        <p className="text-sm">
          © {new Date().getFullYear()} Sifat Bin Asad. All rights reserved.
        </p>
      </footer>
    </main>

  );
}
