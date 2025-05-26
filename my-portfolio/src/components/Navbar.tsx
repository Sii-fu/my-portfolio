import { useRef, useEffect } from "react";
import { gsap } from "gsap";

export function Navbar({ category, onScrollTo }: { category: string, onScrollTo?: (category: string) => void }) {
  return (
    <div
      className="w-full max-w-xs min-w-[120px] sm:w-[350px] md:w-[300px] lg:w-[350px] bg-primary border-[6px] border-[var(--color-4)] shadow-[12px_12px_0_var(--color-0)] transition-all duration-500 ease-in-out hover:-translate-x-[5px] hover:-translate-y-[5px] hover:shadow-[0_0_40px_var(--color-0),17px_17px_0_var(--color-0)] hover:scale-105 group relative flex flex-col items-start justify-start p-4 sm:p-6 rounded-lg overflow-hidden cursor-pointer hover:bg-secondary transform-gpu flex-1 md:flex-none"
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
      <span className="block text-2xl sm:text-3xl md:text-[32px] font-black uppercase text-darkest mb-2 sm:mb-4 relative overflow-visible after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[3px] after:bg-gradient-to-r after:from-accent after:to-darkest hover:after:w-[90%] after:transition-all after:duration-500 after:ease-in-out">
        {category}
      </span>
      <p className="text-sm sm:text-base md:text-[16px] leading-snug text-dark mb-3 sm:mb-5 opacity-0 max-h-0 translate-y-4 group-hover:opacity-100 group-hover:max-h-40 group-hover:translate-y-0 transition-all duration-500 ease-in-out overflow-hidden">
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
