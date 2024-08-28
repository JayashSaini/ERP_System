import React, { useEffect } from "react";
import { IconArrowNarrowLeft, IconArrowNarrowRight } from "@tabler/icons-react";
import { cn } from "../../../lib/utils";
import { motion } from "framer-motion";
import Card from "./Card";
import { Link } from "react-router-dom";
import { ProjectInterface } from "../../../interfaces";
import { FaLongArrowAltRight } from "react-icons/fa";

interface CarouselProps {
  label: string;
  Projects: ProjectInterface[];
}

const CardSection: React.FC<CarouselProps> = ({ label, Projects }) => {
  const carouselRef = React.useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = React.useState(false);
  const [canScrollRight, setCanScrollRight] = React.useState(true);

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = 0;
      checkScrollability();
    }
  }, [Projects]);

  const checkScrollability = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth);
    }
  };

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -270, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 270, behavior: "smooth" });
    }
  };

  return (
    <div className="relative w-full py-8">
      <div className="w-full flex justify-between items-center mb-2 px-3">
        <h2 className="dark:text-neutral-200 text-neutral-700 custom-font md:text-2xl text-xl font-semibold">
          {label}
        </h2>
        <Link
          to="/dashboard/project-management/list?show=all"
          className="md:text-base text-sm   flex gap-1 items-center justify-start duration-200 ease-in-out group"
        >
          View All
          <FaLongArrowAltRight className=" transform transition-transform duration-200 ease-in-out group-hover:translate-x-1" />
        </Link>
      </div>

      <div
        className="flex w-full overflow-x-scroll overscroll-x-auto pt-2 md:pb- pb-5 scroll-smooth [scrollbar-width:none] "
        ref={carouselRef}
        onScroll={checkScrollability}
      >
        <div
          className={cn(
            "absolute right-0  z-[1000] h-auto  w-[5%] overflow-hidden bg-gradient-to-l"
          )}
        ></div>

        <div
          className={cn(
            "flex flex-row justify-start gap-4 pl-4",
            "max-w-7xl          " // remove max-w-4xl if you want the carousel to span the full width of its container
          )}
        >
          {Projects.map((item, index) => (
            <motion.div
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
                transition: {
                  duration: 0.5,
                  delay: 0.2 * index,
                  ease: "easeOut",
                  once: true,
                },
              }}
              key={"card" + index}
              className="last:pr-[5%] md:last:pr-[33%]  rounded-3xl"
            >
              <Card data={item} />
            </motion.div>
          ))}
        </div>
      </div>
      <div className="flex justify-end gap-2 sm:mr-10 mr-5">
        <button
          className="relative z-40 h-10 w-10 rounded-full dark:bg-neutral-100 bg-neutral-300 flex items-center justify-center disabled:opacity-50"
          onClick={scrollLeft}
          disabled={!canScrollLeft}
        >
          <IconArrowNarrowLeft className="h-6 w-6 dark:text-neutral-500 text-neutral-600" />
        </button>
        <button
          className="relative z-40 h-10 w-10 rounded-full dark:bg-neutral-100 bg-neutral-300 flex items-center justify-center disabled:opacity-50"
          onClick={scrollRight}
          disabled={!canScrollRight}
        >
          <IconArrowNarrowRight className="h-6 w-6 dark:text-neutral-500 text-neutral-600" />
        </button>
      </div>
    </div>
  );
};

export default CardSection;
