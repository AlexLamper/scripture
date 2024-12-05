import TransparentButton from "../buttons/TransparentButton";

type ImageProps = {
  src: string;
  alt?: string;
};

type Props = {
  heading: string;
  description: string;
  image: ImageProps;
};

export type Cta9Props = React.ComponentPropsWithoutRef<"section"> & Partial<Props>;

export const Cta9 = (props: Cta9Props) => {
  const { heading, description, image } = {
    ...Cta9Defaults,
    ...props,
  } as Props;

  return (
    <section id="relume" className="relative px-[5%] py-16 md:py-24 lg:py-28 bg-cover bg-center rounded-xl text-white" style={{ backgroundImage: `url(${image.src})` }}>
      <div className="absolute inset-0 bg-black/50 rounded-xl" /> {/* Dark overlay for contrast */}
      
      <div className="relative container grid w-full grid-cols-1 items-start justify-between gap-6 md:grid-cols-[1fr_max-content] md:gap-x-12 md:gap-y-8 lg:gap-x-20">
        <div className="md:mr-12 lg:mr-0">
          <div className="w-full max-w-lg">
            <h2 className="mb-3 text-4xl font-bold leading-[1.2] text-white md:mb-4 md:text-5xl lg:text-6xl">
              {heading}
            </h2>
            <p className="text-white md:text-md">{description}</p>
          </div>
        </div>
        <div className="flex items-start justify-start gap-4">
            <TransparentButton title="Get Started" url="/sign-up" />
            <TransparentButton title="Learn More" url="/about" />
        </div>
      </div>
    </section>
  );
};

export default Cta9;

export const Cta9Defaults: Cta9Props = {
  heading: "Convinced? Start your journey today!",
  description: "Join BibleMap today and start your journey to a deeper understanding of the Bible.",
  image: {
    src: "/images/bible3.jpg",
    alt: "BibleMap Call to Action Image",
  },
};
