// animate-infinite-scroll
"use client";
import { useRouter } from "next/navigation";
import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";

import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { Flip } from "gsap/Flip";
gsap.registerPlugin(ScrollToPlugin);
gsap.registerPlugin(Flip);


const greetings = [
  "ٱلسَّلَامُ عَلَيْكُمْ", "Hello", "Bonjour", "Hola", "Ciao", "Привет",
  "こんにちは", "안녕하세요", "你好", "Merhaba", "Здраво",
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

export function NewsletterCard({ category, onScrollTo }: { category: string, onScrollTo?: (category: string) => void }) {
  const router = useRouter();
  return (
    <div
      className="
      w-[90vw] sm:w-[350px] md:w-[300px] lg:w-[350px]
      bg-primary
      border-[6px]
      border-darkest
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


export function AboutPart() {
  return (
    <div></div>
  );
}



export default function Home() {
  const aboutRef = useRef<HTMLDivElement>(null!);
  const projectsRef = useRef<HTMLDivElement>(null!);
  const journeyRef = useRef<HTMLDivElement>(null!);
  const contactRef = useRef<HTMLDivElement>(null!);

  const [isFloating, setIsFloating] = useState(false);
  const navbarRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    const handleScroll = () => {
      // Get the vertical scroll position
      const scrollY = window.scrollY;
      // If scrolled past the initial position of the navbar, make it floating
      if (navbarRef.current) {
        const navbarTop = navbarRef.current.offsetTop;
        if (scrollY > navbarTop + 40) {
          setIsFloating(true);
        } else {
          setIsFloating(false);
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (navbarRef.current) {
      if (isFloating) {
        gsap.to(navbarRef.current, {
          position: "fixed",
          top: 0,
          left: "50%",
          x: "-50%",
          zIndex: 50,
          boxShadow: "0 8px 32px 0 var(--color-3)",
          background: "var(--color-1)",
          borderRadius: "1.5rem",
          width: "min(95vw, 1400px)",
          padding: "0.5rem 1.5rem",
          duration: 0.5,
          ease: "power2.out"
        });
      } else {
        gsap.to(navbarRef.current, {
          position: "static",
          top: 0,
          left: 0,
          x: 0,
          zIndex: 1,
          boxShadow: "none",
          background: "",
          borderRadius: "0",
          width: "100%",
          padding: "0",
          duration: 0.5,
          ease: "power2.in"
        });
      }
    }
  }, [isFloating]);

  return (  
    <main className="flex min-h-screen flex-col items-start m-4 md:m-15 overflow-x-hidden overflow-y-auto">
      <div ref={aboutRef} className="flex flex-col items-start justify-start pt-10 md:pt-20 lg:pt-30 xl:pt-40 w-full">
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
        <div className="absolute left-0 top-0 h-full w-16 md:w-100 bg-gradient-to-r from-[var(--color-6)] to-transparent z-10" />
        <div className="absolute right-0 top-0 h-full w-16 md:w-100 bg-gradient-to-l from-[var(--color-6)] to-transparent z-10" />
        <InfiniteScrollAnimation />
      </div>
      {/* Floating Navbar/NewsletterCards */}
      <div
        ref={navbarRef}
        className="flex flex-col md:flex-row justify-center items-stretch md:items-start w-full pt-30 gap-15"
        style={{
          transition: "box-shadow 0.5s, background 0.5s, border-radius 0.5s, width 0.5s, padding 0.5s"
        }}
      >
        <NewsletterCard category="About" onScrollTo={handleScrollTo} />
        <NewsletterCard category="Projects" onScrollTo={handleScrollTo} />
        <NewsletterCard category="Journey" onScrollTo={handleScrollTo} />
        <NewsletterCard category="Contact" onScrollTo={handleScrollTo} />
      </div>
      <div ref={aboutRef} className="w-full min-h-[100vh] flex items-center justify-center">
        <h2 className="text-3xl font-bold text-primary">About Section</h2>
        <AboutPart />
      </div>
      <div ref={projectsRef} className="w-full min-h-[100vh] flex items-center justify-center">
        <h2 className="text-3xl font-bold text-primary">Projects Section</h2>
      </div>
      <div ref={journeyRef} className="w-full min-h-[100vh] flex items-center justify-center">
        <h2 className="text-3xl font-bold text-primary">Journey Section</h2>
      </div>
      <div ref={contactRef} className="w-full min-h-[100vh] flex items-center justify-center">
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

