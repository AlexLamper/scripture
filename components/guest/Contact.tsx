import { BiEnvelope, BiMap, BiMessageDetail, BiPhone } from "react-icons/bi";

type LinkProps = {
  label: string;
  url: string;
};

type ContactProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
  link: LinkProps;
};

type Props = {
  tagline: string;
  heading: string;
  description: string;
  contacts: ContactProps[];
};

export type Contact24Props = React.ComponentPropsWithoutRef<"section"> & Partial<Props>;

export const Contact24 = (props: Contact24Props) => {
  const { tagline, heading, description, contacts } = {
    ...Contact24Defaults,
    ...props,
  } as Props;
  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="rb-12 mb-12 max-w-lg md:mb-18 lg:mb-20">
          <p className="mb-3 font-semibold md:mb-4">{tagline}</p>
          <h2 className="rb-5 mb-5 text-3xl font-bold md:mb-6 md:text-5xl lg:text-6xl">
            {heading}
          </h2>
          <p className="md:text-md">{description}</p>
        </div>
        <div className="grid grid-cols-1 items-start justify-start gap-x-8 gap-y-12 md:grid-cols-2 md:gap-y-16 lg:grid-cols-4">
          {contacts.map((contact, index) => (
            <div key={index}>
              <div className="rb-5 mb-5 md:mb-6">{contact.icon}</div>
              <h3 className="mb-3 text-xl font-bold md:mb-4 md:text-2xl md:leading-[1.3] lg:text-3xl">
                {contact.title}
              </h3>
              <p className="mb-5 md:mb-6">{contact.description}</p>
              <a className="underline" href={contact.link.url}>
                {contact.link.label}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Contact24;   

export const Contact24Defaults: Contact24Props = {
  tagline: "Stay Connected",
  heading: "Contact Us",
  description:
    "Have questions or feedback? Please feel free to reach out to us using the following methods.",
  contacts: [
    {
      icon: <BiEnvelope className="size-12" />,
      title: "Email",
      description:
        "Send us an email, and our team will get back to you as soon as possible.",
      link: {
        label: "support@biblemap.com",
        url: "mailto:support@biblemap.com",
      },
    },
    {
      icon: <BiMessageDetail className="size-12" />,
      title: "Live Chat",
      description:
        "Chat with us live for assistance or questions about BibleMap.",
      link: {
        label: "Start Live Chat",
        url: "#",
      },
    },
    {
      icon: <BiPhone className="size-12" />,
      title: "Phone",
      description:
        "Speak with a member of our team for personalized assistance.",
      link: {
        label: "+1 (800) 123-4567",
        url: "tel:+18001234567",
      },
    },
    {
      icon: <BiMap className="size-12" />,
      title: "Office",
      description:
        "Visit our headquarters or send us mail at the address below.",
      link: {
        label: "456 Faith St, Nashville, TN 37203, USA",
        url: "https://goo.gl/maps/example",
      },
    },
  ],
};
