import BrownButton from "../buttons/BrownButton";

type ImageProps = {
  src: string;
  alt?: string;
};

type Props = {
  description: string;
  image: ImageProps;
};

export type GuestHeroProps = React.ComponentPropsWithoutRef<"section"> & Partial<Props>;

export const GuestHero = (props: GuestHeroProps) => {
  const { description, image } = {
    ...GuestHeroDefaults,
    ...props,
  } as Props;
  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="flex flex-col items-center">
          <div className="rb-12 mb-12 text-center md:mb-18 lg:mb-20">
            <div className="w-full max-w-lg">
              <h1 className="mb-5 text-6xl font-bold md:mb-6 md:text-9xl lg:text-10xl">
                BibleMap, the number <span className="text-[#855940]">#1</span> Bible Learning Platform
              </h1>
              <p className="md:text-md">{description}</p>
              <div className="mt-6 flex items-center justify-center gap-x-4 md:mt-8">
                <BrownButton title="Start Now" url="/sign-up" />
              </div>
            </div>
          </div>
          <div>
            <img src={image.src} className="size-full object-cover rounded-xl" alt={image.alt} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default GuestHero;

export const GuestHeroDefaults: GuestHeroProps = {
  description:
    "BibleMap is the best Bible learning application for reading and studying the Bible. It is a great way to read, share, and learn more about the Bible. Start now by signing up for free.",
  image: {
    src: "/images/bible2.jpg",
    alt: "BibleApp Header Hero Image",
  },
};
