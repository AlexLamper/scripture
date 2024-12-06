import { FaXTwitter } from "react-icons/fa6";
import {
  BiLogoFacebookCircle,
  BiLogoInstagram,
  BiLogoLinkedinSquare,
  BiLogoYoutube,
} from "react-icons/bi";

type ImageProps = {
  url?: string;
  src: string;
  alt?: string;
};

type Links = {
  title: string;
  url: string;
};

type SocialMediaLinks = {
  url: string;
  icon: React.ReactNode;
};

type ColumnLinks = {
  links: Links[];
};

type Address = {
  label: string;
  value: string;
};

type Contact = {
  label: string;
  phone: string;
  email: string;
};

type Props = {
  logo: ImageProps;
  address: Address;
  contact: Contact;
  columnLinks: ColumnLinks[];
  socialMediaLinks: SocialMediaLinks[];
  footerText?: string;
  footerLinks: Links[];
};

export type FooterProps = React.ComponentPropsWithoutRef<"section"> & Partial<Props>;

export const Footer = (props: FooterProps) => {
  const { logo, address, contact, columnLinks, socialMediaLinks, footerText, footerLinks } = {
    ...FooterDefaults,
    ...props,
  } as Props;
  return (
    <footer className="px-[5%] py-12 md:py-18 lg:py-20 border-t">
      <div className="container">
        <div className="grid grid-cols-1 gap-x-[4vw] gap-y-12 pb-12 md:gap-y-16 md:pb-18 lg:grid-cols-[1fr_0.5fr] lg:gap-y-4 lg:pb-20">
          <div>
            <div className="rb-6 mb-6 md:mb-8">
              <a href={logo.url}>
               <h1 className="text-3xl font-bold">Scripture</h1>
              </a>
            </div>
            <div className="rb-6 mb-6 md:mb-8">
              <div>
                <p className="mb-1 text-sm font-semibold">{address.label}</p>
                <p className="mb-5 text-sm md:mb-6">{address.value}</p>
              </div>
              <div>
                <p className="mb-1 text-sm font-semibold">{contact.label}</p>
                <p className="flex flex-col text-sm underline decoration-black underline-offset-1 md:mb-6">
                  <a href={`tel:${contact.phone}`}>{contact.phone}</a>
                  <a href={`mailto:${contact.email}`}>{contact.email}</a>
                </p>
              </div>
            </div>
            <div className="grid grid-flow-col grid-cols-[max-content] items-start justify-start gap-x-3">
              {socialMediaLinks.map((link, index) => (
                <a key={index} href={link.url}>
                  {link.icon}
                </a>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 items-start gap-x-6 gap-y-10 md:grid-cols-2 md:gap-x-8 md:gap-y-4">
            {columnLinks.map((column, index) => (
              <ul key={index}>
                {column.links.map((link, linkIndex) => (
                  <li key={linkIndex} className="py-2 text-sm font-semibold">
                    <a href={link.url}>{link.title}</a>
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
        <div className="h-px w-full border-t" />
        <div className="flex flex-col-reverse items-start justify-between pb-4 pt-6 text-sm md:flex-row md:items-center md:pb-0 md:pt-8">
          <p className="mt-8 md:mt-0">{footerText}</p>
          <ul className="grid grid-flow-row grid-cols-[max-content] justify-center gap-y-4 text-sm md:grid-flow-col md:gap-x-6 md:gap-y-0">
            {footerLinks.map((link, index) => (
              <li key={index} className="underline">
                <a href={link.url}>{link.title}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

export const FooterDefaults: FooterProps = {
  logo: {
    url: "/",
    src: "/logo/logo.svg",
    alt: "BibleMap Explorer Logo",
  },
  address: {
    label: "Address:",
    value: "123 BibleMap St, Jerusalem, 0000",
  },
  contact: {
    label: "Contact:",
    phone: "+123 456 7890",
    email: "support@biblemapexplorer.com",
  },
  columnLinks: [
    {
      links: [
        { title: "Home", url: "/" },
        { title: "About Us", url: "/about" },
        { title: "Leaderboard", url: "/leaderboard" },
        { title: "Notes", url: "/notes" },
        { title: "Settings", url: "/settings" },
      ],
    },
    {
      links: [
        { title: "Chapters", url: "/chapters" },
        { title: "Places", url: "/places" },
        { title: "Characters", url: "/characters" },
        { title: "Events", url: "/events" },
        { title: "Themes", url: "/themes" },
      ],
    },
  ],
  socialMediaLinks: [
    { url: "https://facebook.com/biblemapexplorer", icon: <BiLogoFacebookCircle className="size-6" /> },
    { url: "https://instagram.com/biblemapexplorer", icon: <BiLogoInstagram className="size-6" /> },
    { url: "https://twitter.com/biblemapexplorer", icon: <FaXTwitter className="size-6 p-0.5" /> },
    { url: "https://linkedin.com/company/biblemapexplorer", icon: <BiLogoLinkedinSquare className="size-6" /> },
    { url: "https://youtube.com/biblemapexplorer", icon: <BiLogoYoutube className="size-6" /> },
  ],
  footerText: "© 2024 BibleMap Explorer. All rights reserved.",
  footerLinks: [
    { title: "Privacy Policy", url: "/privacy-policy" },
    { title: "Terms of Service", url: "/terms-of-service" },
    { title: "Cookies Settings", url: "/cookies-settings" },
  ],
};
