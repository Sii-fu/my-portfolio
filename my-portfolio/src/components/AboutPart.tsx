import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import Image from "next/image";

const greetings = [
  "ٱلسَّلَامُ عَلَيْكُمْ", "Hello", "Bonjour", "Hola", "Ciao", "Привет",
  "こんにちは", "안녕하세요","Hi", "你好", "Merhaba", "Здраво",
  "שלום", "नमस्ते",
];

function InfiniteScrollAnimation() {
  return (
    <div className="relative w-full overflow-hidden py-4">
      <div className="flex infinite-scroll whitespace-nowrap w-max">
        {[...greetings, ...greetings].map((greeting, index) => (
          <div key={index} className="text-base lg:text-3xl md:text-2xl sm:text-2xl font-bold font-milker px-5">
            {greeting}
          </div>
        ))}
      </div>
    </div>
  );
}

export function AboutPart() {
  const greetingRef = useRef<HTMLSpanElement>(null);
  const [greetingIndex, setGreetingIndex] = useState(0);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    let isMounted = true;
    let timeout: NodeJS.Timeout;
    function animateGreeting() {
      if (!greetingRef.current) return;
      const tl = gsap.timeline({ defaults: { duration: 0.5, ease: "power3.inOut" } });
      tl.fromTo(greetingRef.current,
        { scale: 1, opacity: 1, filter: "blur(0px)", y: 0 },
        { scale: 0.5, opacity: 0, filter: "blur(12px)", y: 0, duration: 0.6, ease: "power4.in", pointerEvents: "none" });
      tl.add(() => {
        if (isMounted) {
          setGreetingIndex((prev) => (prev + 1) % greetings.length);
        }
      });
      tl.fromTo(
        greetingRef.current,
        { scale: .5, opacity: 0, filter: "blur(10px)", y: 0 },
        { scale: 1, opacity: 1, filter: "blur(0px)", y: 0, duration: 0.6, ease: "power4.out", pointerEvents: "auto" }
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
      <div className="w-full min-h-[15vh] flex flex-row-reverse items-start pt-15 pb-15">
        <div className="w-full max-w-4xl mx-auto flex flex-col gap-6 p-6 sm:p-10 bg-primary/70 backdrop-blur-md rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.2)] border border-dark relative transition-all duration-500">
          <div className="relative">
            <h3 className="text-4xl sm:text-5xl font-extrabold text-[var(--color-0)] drop-shadow-glow tracking-tight">Who am I?</h3>
          </div>
          <div className="flex items-center text-4xl">
            <span ref={greetingRef} className="inline-block origin-left transition-transform">
              {greetings[greetingIndex]},{" "}
            </span>
          </div>
          <p className="text-2xl sm:text-3xl text-light leading-snug font-semibold">
            I&apos;m <span className="text-[var(--color-0)] font-bold">Sifat Bin Asad</span> — a software engineer with a caffeine dependency and a passion for building cool, functional, occasionally chaotic things on the web.
          </p>
          <div
            className={`overflow-hidden transition-all duration-500 ${
              expanded ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
            }`}
          >
                <p className="text-lg  sm:text-xl text-light/90 leading-relaxed tracking-wide">
                I&apos;m currently pursuing my Bachelor&apos;s in Computer Science &amp; Engineering at MIST, where I spend half my time learning algorithms — and the other half debugging why my side projects won&apos;t compile at 2AM. I&apos;m passionate about turning random ideas into real-world projects, especially when it involves slick UIs, smooth UX, or wrangling LLMs that hallucinate less than I do during finals week.
                </p>
                <p className="text-lg pt-10 sm:text-xl text-light/90 leading-relaxed tracking-wide">
                I&apos;m based in Dhaka, Bangladesh, where I spend my days coding, designing, and trying to convince my friends that debugging is a form of meditation. When I&apos;m not glued to my laptop, you can find me exploring the latest tech trends, binge-watching sci-fi series, or attempting to cook (with varying degrees of success).
                </p>
            </div>
            <button
            className="absolute bottom-4 right-4 z-10 bg-dark/70 hover:bg-dark text-light rounded-full p-2 tracking-normal cursor-pointer"
            aria-label="Toggle details"
            onClick={() => setExpanded((prev) => !prev)}
            type="button"
            >
            {expanded ? (
              // Up arrow when expanded
              <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M6 15l6-6 6 6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            ) : (
              // Down arrow when collapsed
              <svg width="28" height="28" fill="none" stroke="var(--color-0)" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" className="animate-bounce"/>
              </svg>
            )}
            </button>
        </div>
        <div className="w-full ">
          <Image
            src="/profile.png"
            alt="Sifat Bin Asad"
            width={400}
            height={400}
            className="w-100 h-100 object-cover shadow-lg mx-auto rounded-xl"
            priority
          />
        </div>
      </div>
    </div>
  );
}

export { InfiniteScrollAnimation };
