import { IconArrowBigLeftFilled, IconArrowBigRightFilled } from "@tabler/icons-react";
import { useCallback, useEffect, useState } from "react";

type CourselProps = {
  slides: React.ReactNode[];
};
export const Coursel = ({ slides }: CourselProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);


  const nextSlide = useCallback(() => {
    setCurrentSlide((current) => (current + 1) % slides.length);
  }, [slides.length]);


  const previousSlide = useCallback(() => {
    setCurrentSlide((current) =>
      current === 0 ? slides.length - 1 : current - 1
    );
  }, [slides.length]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        previousSlide();
      } else if (event.key === "ArrowRight") {
        nextSlide();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [nextSlide, previousSlide]);


  useEffect(() => {
    if (slides.length <= 1 || isPaused) return;

    const timer = window.setInterval(nextSlide, 8000);

    return () => window.clearInterval(timer);
  }, [slides.length, isPaused, currentSlide, nextSlide]);

  if (slides.length === 0) return null;
  



  return (
    <div
      className="relative mx-auto grid max-w-7xl overflow-hidden rounded-3xl"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      <div className="group">

        {slides.map((slide, index) => (

          <div
            key={index}
            className={`col-start-1 row-start-1 transition-opacity duration-700 ease-in-out ${index === currentSlide
              ? "z-10 opacity-100"
              : "pointer-events-none absolute inset-0 opacity-0"
              }`}
            aria-hidden={index !== currentSlide}
          >
            {slide}
          </div>

        ))}
        {isPaused ? (
        <div className="">
          <button
          aria-label="Previous slide"
          onClick={previousSlide}
          className="absolute left-2 top-1/2 z-20 -translate-y-1/2 cursor-pointer"
        >
          <IconArrowBigLeftFilled size={24} />
        </button>

        <button
          aria-label="Next slide"
          onClick={nextSlide}
          className="absolute right-2 top-1/2 z-20 -translate-y-1/2 cursor-pointer"
        >
          <IconArrowBigRightFilled size={24} />
        </button>
        </div>
        ) : null }
        


        <div className="absolute bottom-2 left-1/2 z-20 flex -translate-x-1/2 gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 w-2 rounded-full cursor-pointer transition-colors duration-300 ${index === currentSlide ? "bg-purple-primary" : "bg-purple-light"
                }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>

  );
}
