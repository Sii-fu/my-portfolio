// components/ProjectSlider.tsx
import Image from 'next/image';

// 1. Declare the dedicated props for the slider
interface ProjectSliderProps {
    folder: string;
    images: string | string[];
    aspect?: 'portrait' | 'landscape';
}

// 2. Assign the 'ProjectSliderProps' type to your component parameters
export default function ProjectSlider({ folder, images, aspect = 'portrait' }: ProjectSliderProps) {
    // Self-healing array parser:
    const imageList = Array.isArray(images)
        ? images
        : typeof images === 'string'
            ? images
                .replace(/[\[\]\{\}\'\"]/g, '')
                .split(',')
                .map((img) => img.trim())
                .filter(Boolean)
            : [];

    const isPortrait = aspect === 'portrait';

    return (
        <div className="not-prose my-8 w-full">
            <div
                className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-6 [&::-webkit-scrollbar]:hidden"
                style={{
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none',
                }}
            >
                {imageList.map((img, index) => (
                    <div
                        key={index}
                        className={`shrink-0 snap-center flex flex-col items-center ${isPortrait
                            ? "w-[260px] sm:w-[290px] md:w-[320px]"
                            : "w-full md:w-[70%]"
                            }`}
                    >
                        {/* Image Container */}
                        <div
                            className={`relative w-full overflow-hidden ${isPortrait
                                ? "aspect-[720/1445] rounded-[2.5rem] border-[4px] border-neutral-800 shadow-2xl bg-neutral-950"
                                : "aspect-[16/9] rounded-xl border border-neutral-800 shadow-lg bg-neutral-900/50"
                                }`}
                        >
                            <Image
                                src={`${folder}/${img}`}
                                alt={`Showcase frame ${index + 1}`}
                                fill
                                sizes={isPortrait ? "(max-width: 768px) 290px, 320px" : "(max-width: 768px) 100vw, 70vw"}
                                className="object-cover"
                                priority={index === 0}
                            />
                        </div>

                        {/* Label */}
                        <p className="text-xs text-neutral-400 mt-3 text-center select-none font-mono">
                            Screenshot {index + 1} of {imageList.length}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}