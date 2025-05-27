import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { color } from "framer-motion";
gsap.registerPlugin(ScrollTrigger);

export function ProjectScroller() {
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isMobile = window.innerWidth <= 768;
    const leftX = isMobile ? [-800, -700, -400, -600, -500] : [-400, -350, -200, -300, -250];
    const rightX = isMobile ? [800, 700, 400, 600, 500] : [400, 350, 200, 300, 250];
    const leftRot = isMobile ? [-20, -18, -15, -10, -12] : [-10, -8, -7, -6, -8];
    const rightRot = isMobile ? [20, 18, 15, 10, 12] : [10, 8, 7, 6, 8];
    const yVals = isMobile ? [0, 0, 0, 0, 0] : [0, 0, 0, 0, 0];

    // Animate only when ProjectScroller is visible
    const observer = new window.IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          gsap.utils.toArray<HTMLDivElement>(".row").forEach((row, i) => {
            const leftCard = row.querySelector(".card-left");
            const rightCard = row.querySelector(".card-right");
            const randomOffsetX = gsap.utils.random(-60, 60);
            const randomOffsetY = gsap.utils.random(-60, 60);
            const randomRot = gsap.utils.random(-5, 5);
            if (leftCard) {
              ScrollTrigger.create({
                trigger: mainRef.current,
                start: "top 80%",
                end: "150% bottom",
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
                start: "top 80%",
                end: "150% bottom",
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
          observer.disconnect(); // Only trigger once
        }
      });
    }, { threshold: 0.1 });
    if (mainRef.current) {
      observer.observe(mainRef.current);
    }
    return () => observer.disconnect();
  }, []);

  const projects = [
    { title: "Project One", side: "left", image: "/projects/project2.png" },
    { title: "MediaVerse", side: "right", image: "/projects/project1.png" },
    { title: "AskMe", side: "left", image: "/projects/project3.png" },
    { title: "Travila", side: "right", image: "/projects/project5.png" },
    { title: "SayHello", side: "left", image: "/projects/project4.png" },
  ];

  // Add GSAP 3D magnet effect to the Projects button (type-safe)
  useEffect(() => {
    const btn = document.querySelector('.project-magnet-btn');
    if (!btn) return;
    const handleMouseMove = (e: Event) => {
      const mouseEvent = e as MouseEvent;
      const rect = (btn as HTMLElement).getBoundingClientRect();
      const x = mouseEvent.clientX - (rect.left + rect.width / 2);
      const y = mouseEvent.clientY - (rect.top + rect.height / 2);
      const tiltVal = 20;
      const rotateX = (y / rect.height) * tiltVal;
      const rotateY = (x / rect.width) * -tiltVal;
      const strength = 0.3;
      gsap.to(btn, {
        x: x * strength,
        y: y * strength,
        rotationX: rotateX,
        rotationY: rotateY,
        transformPerspective: 500,
        transformOrigin: "center center",
        duration: 0.3,
        ease: "power2.out"
      });
    };
    const handleMouseLeave = () => {
      gsap.to(btn, {
        x: 0,
        y: 0,
        rotationX: 0,
        rotationY: 0,
        duration: 0.3,
        ease: 'power2.out'
      });
    };
    btn.addEventListener('mousemove', handleMouseMove as EventListener);
    btn.addEventListener('mouseleave', handleMouseLeave as EventListener);
    return () => {
      btn.removeEventListener('mousemove', handleMouseMove as EventListener);
      btn.removeEventListener('mouseleave', handleMouseLeave as EventListener);
    };
  }, []);

  return (
    <section
      ref={mainRef}
      className="main  w-full max-h-[110vh] bg-black py-10 overflow-visible text-white flex flex-col items-center justify-center relative"
    >
    <h2
      className="text-9xl 
      absolute 
      font-bold 
      mb-12 
      text-center 
      text-[var(--color-0)] 
      z-30 
      drop-shadow-[0_4px_100px_var(--color-0)]
      
      cursor-pointer
      project-magnet-btn
      "
      style={{ paddingTop: "10vh", paddingBottom: "10vh" }}
      onClick={() => window.location.href = "/projects"}
    >

      Projects
    </h2>
    <div className="absolute top-10 right-16 z-40 group flex items-center">
    </div>
      <div className="w-full flex flex-col items-center gap-0">
        {projects.map((project, i) => (
          <div
            key={i}
            className={`z-0 row relative pl-60 pr-60 pt-0 pb-0 w-full flex ${project.side === "left" ? "justify-start" : "justify-end"} items-center`}
            style={{ height: "180px", marginBottom: i !== projects.length - 1 ? "30px" : "0" }}
          >
            <div
              className={`card ${project.side === "left" ? "card-left" : "card-right"} w-[700px] h-[400px] rounded-xl bg-zinc-800 shadow-2xl flex items-center justify-center text-4xl font-bold transition-transform duration-0 border-5 border-[var(--color-3)] drop-shadow-[0_40px_80px_var(--color-4)] relative overflow-hidden`}
              style={{ backgroundImage: `url(${project.image})`, backgroundSize: "cover", backgroundPosition: "center" }}
            >
              <div className="absolute inset-0 bg-black/50 pointer-events-none" />
              <span className="relative z-10">{project.title}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
