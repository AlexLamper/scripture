"use client";

import clsx from "clsx";
import { motion, useScroll, useTransform } from "framer-motion";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import TransparentButton from "../buttons/TransparentButton";

type ImageProps = {
  src: string;
  alt?: string;
};

type Props = {
  heading: string;
  description: string;
  images: ImageProps[];
};

export type Header83Props = React.ComponentPropsWithoutRef<"section"> & Partial<Props>;

export const Header83 = (props: Header83Props) => {
  const { heading, description, images } = {
    ...Header83Defaults,
    ...props,
  } as Props;

  const { scrollYProgress } = useScroll();
  const opacityContent = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const opacityOverlay = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [3.2, 1]);

  return (
    <section id="relume" className="relative h-[300vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.div
          className="flex h-full items-center justify-center"
          style={{ opacity: opacityContent }}
        >
          <div className="px-[5%] py-16 md:py-24 lg:py-28">
            <div className="mx-auto max-w-lg text-center">
              <h1 className="mb-5 text-6xl font-bold text-text-alternative md:mb-6 md:text-9xl lg:text-10xl">
                {heading}
              </h1>
              <p className="text-text-alternative md:text-md">{description}</p>
              <div className="mt-6 flex items-center justify-center gap-x-4 md:mt-8">
                <SignedIn>
                  <TransparentButton title="Explore" url="/map/" />
                </SignedIn>
                <SignedOut>
                  <TransparentButton title="Sign Up" url="/sign-up" />
                  <TransparentButton title="See More" url="/" />
                </SignedOut>
              </div>
            </div>
          </div>
        </motion.div>
        <div className="absolute inset-0 -z-10">
          <motion.div
            className="absolute inset-0 z-10 bg-black/50"
            style={{ opacity: opacityOverlay }}
          />
          <motion.div
            style={{ scale }}
            className="grid size-full auto-cols-fr grid-cols-1 gap-x-4 gap-y-4 md:grid-cols-3"
          >
            {images.map((image, index) => (
              <div
                key={index}
                className={clsx(
                  "relative",
                  [0, 2, 3, 5, 6, 8].indexOf(index) !== -1 && "hidden md:block",
                )}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="absolute inset-0 size-full object-cover"
                />
                
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Header83;

export const Header83Defaults: Header83Props = {
  heading: "Learn More About BibleMap",
  description:
    "BibleMap is a platform that allows you to explore the Bible in a new way. Dive into the stories and events of the Bible with our interactive maps and timelines.",
  images: [
    {
      src: "/images/features/feature1.jpg",
      alt: "Relume placeholder image 1",
    },
    {
      src: "/images/features/feature2.jpg",
      alt: "Relume placeholder image 2",
    },
    {
      src: "/images/features/feature3.jpg",
      alt: "Relume placeholder image 3",
    },
    {
      src: "/images/features/feature1.jpg",
      alt: "Relume placeholder image 4",
    },
    {
      src: "/images/features/feature2.jpg",
      alt: "Relume placeholder image 5",
    },
    {
      src: "/images/features/feature3.jpg",
      alt: "Relume placeholder image 6",
    },
    {
      src: "/images/features/feature1.jpg",
      alt: "Relume placeholder image 7",
    },
    {
      src: "/images/features/feature2.jpg",
      alt: "Relume placeholder image 8",
    },
    {
      src: "/images/features/feature3.jpg",
      alt: "Relume placeholder image 9",
    },
  ],
};
