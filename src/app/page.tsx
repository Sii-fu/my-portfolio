"use client";

import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ProjectScroller } from '../../my-portfolio/src/components/ProjectScroller';
import { SkillsGrid } from '../../my-portfolio/src/components/SkillsGrid';
import { Navbar } from '../../my-portfolio/src/components/Navbar';
import { AboutPart, InfiniteScrollAnimation } from '../../my-portfolio/src/components/AboutPart';
import { useRef } from "react";

gsap.registerPlugin(ScrollToPlugin);

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
    <main className="flex min-h-screen flex-col items-start  overflow-x-hidden overflow-y-auto">
      <div className="min-h-[100vh] flex flex-row md:flex-col justify-center place-items-center md:items-start w-full pb-55 gap-0">
        <div className="flex flex-col items-start justify-start pt-0 md:pt-5 lg:pt-15 xl:pt-20 w-full">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-evenly w-full">
            <h1 className="text-6xl md:text-9xl font-bold font-brillant mr-8">
            <p className="text-lg md:text-2xl font-bold font-milker xl: pb-2 md:pb-5">I&apos;m</p>
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

        <div
          className="flex flex-col md:flex-row justify-evenly place-items-center md:items-end w-full gap-0"
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: "10vh", // Adjust this value as needed for spacing from bottom
          }}
        >
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

