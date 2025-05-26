import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const projects = [
  { title: "Project One", side: "left", image: "/projects/project2.png" },
  { title: "MediaVerse", side: "right", image: "/projects/project1.png" },
  { title: "AskMe", side: "left", image: "/projects/project3.png" },
  { title: "Travila", side: "right", image: "/projects/project5.png" },
  { title: "SayHello", side: "left", image: "/projects/project4.png" },
];

export function ProjectScroller() {
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isMobile = window.innerWidth <= 768;
    const leftX = isMobile ? [-800, -700, -400, -600, -500] : [-400, -350, -200, -300, -250];
    const rightX = isMobile ? [800, 700, 400, 600, 500] : [400, 350, 200, 300, 250];
    const leftRot = isMobile ? [-20, -18, -15, -10, -12] : [-10, -8, -7, -6, -8];
    const rightRot = isMobile ? [20, 18, 15, 10, 12] : [10, 8, 7, 6, 8];
    const yVals = isMobile ? [0, 0, 0, 0, 0] : [0, 0, 0, 0, 0];
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
  }, []);

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
            className={`row relative pl-60 pr-60 pt-0 pb-0 w-full flex ${project.side === "left" ? "justify-start" : "justify-end"} items-center`}
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
