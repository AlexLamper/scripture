import { Button } from "@relume_io/relume-ui";
import type { ButtonProps } from "@relume_io/relume-ui";
import { RxChevronRight } from "react-icons/rx";

type ImageProps = {
  src: string;
  alt?: string;
};

type CardBaseProps = {
  tagline: string;
  image: ImageProps;
  heading: string;
  description: string;
};

type CardsSmallProps = CardBaseProps & {
  button: ButtonProps;
};

type CardBigProps = CardBaseProps & {
  buttons: ButtonProps[];
};

type Props = {
  tagline: string;
  heading: string;
  description: string;
  cardsSmall: CardsSmallProps[];
  cardBig: CardBigProps;
};

export type Layout366Props = React.ComponentPropsWithoutRef<"section"> & Partial<Props>;

export const Layout366 = (props: Layout366Props) => {
  const { tagline, heading, description, cardsSmall, cardBig } = {
    ...Layout366Defaults,
    ...props,
  } as Props;
  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="mb-12 md:mb-18 lg:mb-20">
          <div className="mx-auto max-w-lg text-center">
            <p className="mb-3 font-semibold md:mb-4">{tagline}</p>
            <h2 className="rb-5 mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
              {heading}
            </h2>
            <p className="md:text-md">{description}</p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 md:gap-8">
          <div className="grid grid-cols-1 gap-6 md:gap-8 lg:grid-cols-2">
            <div className="order-first flex flex-col items-stretch border border-border-primary lg:order-none lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-3">
              <div>
                <img
                  src={cardBig.image.src}
                  alt={cardBig.image.alt}
                  className="w-full object-cover"
                />
              </div>
              <div className="block flex-1 flex-col items-stretch justify-center p-6 md:flex md:p-8 lg:p-12">
                <div>
                  <p className="mb-2 font-semibold">{cardBig.tagline}</p>
                  <h3 className="mb-5 text-4xl font-bold leading-[1.2] md:mb-6 md:text-5xl lg:text-6xl">
                    {cardBig.heading}
                  </h3>
                  <p>{cardBig.description}</p>
                </div>
                <div className="mt-6 flex items-center gap-4 md:mt-8">
                  {cardBig.buttons.map((button, index) => (
                    <Button key={index} {...button}>
                      {button.title}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
            {cardsSmall.map((card, index) => (
              <div
                key={index}
                className="order-last flex flex-col border border-border-primary md:grid md:grid-cols-2 lg:order-none"
              >
                <div className="flex w-full items-center justify-center">
                  <img src={card.image.src} alt={card.image.alt} className="w-full object-cover" />
                </div>
                <div className="block flex-col justify-center p-6 md:flex">
                  <div>
                    <p className="mb-2 font-semibold">{card.tagline}</p>
                    <h3 className="mb-2 text-xl font-bold md:text-2xl">{card.heading}</h3>
                    <p>{card.description}</p>
                  </div>
                  <div className="mt-5 flex items-center gap-4 md:mt-6">
                    <Button {...card.button}>{card.button.title}</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Layout366;

export const Layout366Defaults: Layout366Props = {
  tagline: "Explore BibleMap",
  heading: "Discover Features That Make Learning Engaging",
  description:
    "BibleMap is designed to help you deepen your understanding of the Bible through interactive learning tools, quizzes, and community-driven insights.",
  cardsSmall: [
    {
      tagline: "Interactive Quizzes",
      image: {
        src: "/images/features/feature3.jpg",
        alt: "Interactive Quizzes Feature",
      },
      heading: "Learn through Quizzes",
      description:
        "Test your knowledge with fun and engaging quizzes covering various biblical topics and themes. Each quiz is designed to challenge and educate you.",
      button: {
        title: "Take a Quiz",
        variant: "link",
        size: "link",
        iconRight: <RxChevronRight />,
      },
    },
    {
      tagline: "Community Connections",
      image: {
        src: "/images/features/feature1.jpg",
        alt: "Community Connections Feature",
      },
      heading: "Join the Community",
      description:
        "Connect with other learners, share insights, and grow together in understanding the Bible through our vibrant community features.",
      button: {
        title: "Join Now",
        variant: "link",
        size: "link",
        iconRight: <RxChevronRight />,
      },
    },
  ],
  cardBig: {
    tagline: "Competitive Learning",
    image: {
      src: "/images/features/feature2.jpg",
      alt: "Competitive Learning and Challenges Feature",
    },
    heading: "Challenge Yourself and Others",
    description:
      "Compete with friends or other users with BibleMap's challenges. Track your progress, climb the leaderboard, and learn in an exciting, competitive environment.",
    buttons: [
      { title: "Start Competing", variant: "secondary" },
      {
        title: "Learn More",
        variant: "link",
        size: "link",
        iconRight: <RxChevronRight />,
      },
    ],
  },
};
