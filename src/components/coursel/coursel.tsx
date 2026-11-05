import { IconArrowBigLeftFilled, IconArrowBigRightFilled } from "@tabler/icons-react";
import { useEffect, useState } from "react";
 
type CourselProps = {
  slides: React.ReactNode[];
};
export const Coursel = ({ slides }: CourselProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = () => {
    setCurrentSlide((current) => (current + 1) % slides.length);
  };

  const previousSlide = () => {
    setCurrentSlide((current) =>
      current === 0 ? slides.length - 1 : current - 1
    );
  };

  useEffect(() => {
    if (slides.length <= 1 || isPaused) return;

    const timer = window.setInterval(nextSlide, 3000);

    return () => window.clearInterval(timer);
  }, [slides.length, isPaused, currentSlide]);

  if (slides.length === 0) return null;

  return (
    <div
      className="relative mx-auto grid max-w-7xl overflow-hidden rounded-3xl"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`col-start-1 row-start-1 transition-opacity duration-700 ease-in-out ${
            index === currentSlide
              ? "z-10 opacity-100"
              : "pointer-events-none absolute inset-0 opacity-0"
          }`}
          aria-hidden={index !== currentSlide}
        >
          {slide}
        </div>
      ))}

      <button
        aria-label="Previous slide"
        onClick={previousSlide}
        className="absolute left-2 top-1/2 z-20 -translate-y-1/2"
      >
        <IconArrowBigLeftFilled size={24} />
      </button>

      <button
        aria-label="Next slide"
        onClick={nextSlide}
        className="absolute right-2 top-1/2 z-20 -translate-y-1/2"
      >
        <IconArrowBigRightFilled size={24} />
      </button>
    </div>
  );
};