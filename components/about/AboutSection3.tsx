import { Button } from "@relume_io/relume-ui";
import type { ButtonProps } from "@relume_io/relume-ui";
import { RxChevronRight } from "react-icons/rx";

type ImageProps = {
  src: string;
  alt?: string;
};

type SectionProps = {
  icon: ImageProps;
  heading: string;
  description: string;
  buttons: ButtonProps[];
};

type Props = {
  sections: SectionProps[];
};

export type Layout233Props = React.ComponentPropsWithoutRef<"section"> & Partial<Props>;

export const Layout233 = (props: Layout233Props) => {
  const { sections } = { ...Layout233Defaults, ...props } as Props;
  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="grid grid-cols-1 items-start gap-y-12 md:grid-cols-3 md:gap-x-8 md:gap-y-16 lg:gap-x-12">
          {sections.map((section, index) => (
            <div key={index}>
              <div className="rb-5 mb-5 md:mb-6">
                <img src={section.icon.src} className="size-12" alt={section.icon.alt} />
              </div>
              <h3 className="mb-5 text-2xl font-bold md:mb-6 md:text-3xl md:leading-[1.3] lg:text-4xl">
                {section.heading}
              </h3>
              <p>{section.description}</p>
              <div className="mt-6 flex flex-wrap items-center gap-4 md:mt-8">
                {section.buttons.map((button, index) => (
                  <Button key={index} {...button}>
                    {button.title}
                  </Button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Layout233;

export const Layout233Defaults: Layout233Props = {
  sections: [
    {
      icon: {
        src: "https://d22po4pjz3o32e.cloudfront.net/relume-icon.svg",
        alt: "Quiz Icon",
      },
      heading: "Interactive Quizzes",
      description:
        "Challenge yourself with quizzes that explore different biblical topics and themes. Each quiz is designed to deepen your knowledge while making learning fun and engaging.",
      buttons: [
        { title: "Start a Quiz", variant: "secondary" },
        {
          title: "Learn More",
          variant: "link",
          size: "link",
          iconRight: <RxChevronRight />,
        },
      ],
    },
    {
      icon: {
        src: "https://d22po4pjz3o32e.cloudfront.net/relume-icon.svg",
        alt: "Community Icon",
      },
      heading: "Connect with the Community",
      description:
        "Join a vibrant community of learners who share insights, ask questions, and grow together in their understanding of the Bible.",
      buttons: [
        { title: "Join the Community", variant: "secondary" },
        {
          title: "Learn More",
          variant: "link",
          size: "link",
          iconRight: <RxChevronRight />,
        },
      ],
    },
    {
      icon: {
        src: "https://d22po4pjz3o32e.cloudfront.net/relume-icon.svg",
        alt: "Leaderboard Icon",
      },
      heading: "Compete and Grow",
      description:
        "Engage in friendly competition with features like leaderboards and challenges. Earn points, track your progress, and unlock achievements as you learn.",
      buttons: [
        { title: "View Leaderboard", variant: "secondary" },
        {
          title: "Learn More",
          variant: "link",
          size: "link",
          iconRight: <RxChevronRight />,
        },
      ],
    },
  ],
};
