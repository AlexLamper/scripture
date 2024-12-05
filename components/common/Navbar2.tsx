"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useMediaQuery } from "@relume_io/relume-ui";
import type { ButtonProps } from "@relume_io/relume-ui";
import { AnimatePresence, motion } from "framer-motion";
import { RxChevronDown } from "react-icons/rx";
// import { ClerkLoaded, ClerkLoading, SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import GrayButton from "../buttons/BrownButton";
import { ThemeProvider } from "next-themes";
import { ThemeSwitcher } from "../theme-switcher";
import { ModeToggle } from "../buttons/ModeToggleButton";

type ImageProps = {
  url?: string;
  src: string;
  alt?: string;
};

type SubMenuLink = {
  icon: ImageProps;
  title: string;
  description: string;
  url: string;
};

type NavLink = {
  title: string;
  url: string;
  subMenuLinks?: SubMenuLink[];
};

type Props = {
  logo: ImageProps;
  navLinks: NavLink[];
  buttons: ButtonProps[];
};

export type Navbar2Props = React.ComponentPropsWithoutRef<"section"> & Partial<Props>;

export const Navbar2 = (props: Navbar2Props) => {
  const { logo, navLinks } = {
    ...Navbar2Defaults,
    ...props,
  } as Props;

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 991px)");

  return (
    <nav className="flex w-full items-center border-b border-border-primary bg-background-primary lg:px-[5%] min-h-[10vh]">
      <div className="mx-auto size-full items-center justify-between lg:flex">
        <div className="grid min-h-16 grid-cols-2 items-center justify-between px-[5%] md:max-h-[10vh] lg:min-h-full lg:px-0">
          <div className="hover:cursor-pointer" onClick={() => window.location.href = "/"}>
            <Image src={logo.src} alt={logo.alt || "Logo"} width={150} height={75} />
          </div>
          <button
            className="-mr-2 flex size-12 flex-col items-center justify-center justify-self-end lg:hidden"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
          >
            <motion.span
              className="my-[3px] h-0.5 w-6 bg-black"
              animate={mobileMenuOpen ? ["open", "rotatePhase"] : "closed"}
              variants={topLineVariants}
            />
            <motion.span
              className="my-[3px] h-0.5 w-6 bg-black"
              animate={mobileMenuOpen ? "open" : "closed"}
              variants={middleLineVariants}
            />
            <motion.span
              className="my-[3px] h-0.5 w-6 bg-black"
              animate={mobileMenuOpen ? ["open", "rotatePhase"] : "closed"}
              variants={bottomLineVariants}
            />
          </button>
        </div>
        <motion.div
          variants={{
            open: {
              height: "var(--height-open, 100dvh)",
            },
            close: {
              height: "var(--height-closed, 0)",
            },
          }}
          initial="close"
          exit="close"
          animate={mobileMenuOpen ? "open" : "close"}
          transition={{ duration: 0.3 }}
          className="overflow-hidden px-[5%] lg:flex lg:items-center lg:px-0 lg:[--height-closed:auto] lg:[--height-open:auto]"
        >
          {navLinks.map((navLink, index) => (
            <div key={index} className="first:pt-4 lg:first:pt-0">
              {navLink.subMenuLinks && navLink.subMenuLinks.length > 0 ? (
                <SubMenu
                  subMenuLinks={navLink.subMenuLinks}
                  title={navLink.title}
                  isMobile={isMobile}
                />
              ) : (
                <a
                  href={navLink.url}
                  className="block py-3 text-left text-md lg:px-4 lg:py-2 lg:text-base"
                >
                  {navLink.title}
                </a>
              )}
            </div>
          ))}
          <div className="mt-6 flex flex-col items-center gap-4 lg:ml-4 lg:mt-0 lg:flex-row">
            <ModeToggle />
            {/* Auth Section for Larger Screens */}
            <div className="hidden md:flex items-center space-x-4">
              {/* <ClerkLoading>
                <div className="h-5 w-5 text-gray-400 animate-spin" />
              </ClerkLoading>
              <ClerkLoaded>
                <SignedIn>
                  <UserButton />
                </SignedIn>
                <SignedOut>
                  <SignInButton mode="modal">
                    <GrayButton title="Login" height="h-[2.8rem] p-4" fontSize="text-[1rem]" />
                  </SignInButton>
                  <SignUpButton mode="modal">
                    <GrayButton title="Sign Up" height="h-[2.8rem] p-4" fontSize="text-[1rem]" />
                  </SignUpButton>
                </SignedOut>
              </ClerkLoaded> */}
            </div>
          </div>
        </motion.div>
      </div>
    </nav>
  );
};

const SubMenu = ({
  title,
  subMenuLinks,
  isMobile,
}: {
  title: string;
  subMenuLinks: SubMenuLink[];
  isMobile: boolean;
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  return (
    <nav
      onMouseEnter={() => !isMobile && setIsDropdownOpen(true)}
      onMouseLeave={() => !isMobile && setIsDropdownOpen(false)}
    >
      <button
        className="flex w-full items-center justify-between gap-2 py-3 text-left text-md lg:flex-none lg:justify-start lg:px-4 lg:py-2 lg:text-base"
        onClick={() => setIsDropdownOpen((prev) => !prev)}
      >
        <span>{title}</span>
        <AnimatePresence>
          <motion.div
            animate={isDropdownOpen ? "rotated" : "initial"}
            variants={{
              rotated: { rotate: 180 },
              initial: { rotate: 0 },
            }}
            transition={{ duration: 0.3 }}
          >
            <RxChevronDown />
          </motion.div>
        </AnimatePresence>
      </button>
      {isDropdownOpen && (
        <AnimatePresence>
          <motion.nav
            animate={isDropdownOpen ? "open" : "close"}
            initial="close"
            exit="close"
            variants={{
              open: {
                visibility: "visible",
                opacity: "var(--opacity-open, 100%)",
                y: 0,
              },
              close: {
                visibility: "hidden",
                opacity: "var(--opacity-close, 0)",
                y: "var(--y-close, 0%)",
              },
            }}
            transition={{ duration: 0.3 }}
            className="z-50 bg-gray-100 lg:absolute lg:w-80 lg:border lg:border-border-primary lg:p-6 lg:[--y-close:25%] rounded-md"
          >
            <div className="grid grid-cols-1 grid-rows-[max-content] gap-y-2 py-3 md:py-3 lg:gap-y-4 lg:py-0">
              {subMenuLinks.map((subMenuLink, index) => (
                <a
                  key={index}
                  href={subMenuLink.url}
                  className="grid auto-cols-fr grid-cols-[max-content_1fr] items-start gap-x-3 py-2 lg:py-1"
                >
                  <div>
                    <Image
                      className="size-6"
                      src={subMenuLink.icon.src}
                      alt={subMenuLink.icon.alt || ""}
                      width={24}
                      height={24}
                    />
                  </div>
                  <div className="flex flex-col items-start justify-center">
                    <p className="text-md font-semibold lg:text-base">{subMenuLink.title}</p>
                    <p className="hidden text-sm md:block">{subMenuLink.description}</p>
                  </div>
                </a>
              ))}
            </div>
          </motion.nav>
        </AnimatePresence>
      )}
    </nav>
  );
};

export default Navbar2;

export const Navbar2Defaults: Navbar2Props = {
  logo: {
    url: "/",
    src: "/logo/logo.svg",
    alt: "BibleMap Logo",
  },
  navLinks: [
    { title: "Home", url: "/" },
    { title: "About", url: "/about" },
    {
        title: "Categories",
        url: "#",
        subMenuLinks: [
          {
            icon: {
              src: "https://d22po4pjz3o32e.cloudfront.net/relume-icon.svg",
              alt: "Chapters Icon",
            },
            title: "Chapters",
            description: "Explore different Bible chapters",
            url: "/chapters",
          },
          {
            icon: {
              src: "https://d22po4pjz3o32e.cloudfront.net/relume-icon.svg",
              alt: "Places Icon",
            },
            title: "Places",
            description: "Learn about significant biblical locations",
            url: "/places",
          },
          {
            icon: {
              src: "https://d22po4pjz3o32e.cloudfront.net/relume-icon.svg",
              alt: "Characters Icon",
            },
            title: "Characters",
            description: "Discover important figures in the Bible",
            url: "/characters",
          },
          {
            icon: {
              src: "https://d22po4pjz3o32e.cloudfront.net/relume-icon.svg",
              alt: "Events Icon",
            },
            title: "Events",
            description: "Uncover key events in biblical history",
            url: "/events",
          },
          {
            icon: {
              src: "https://d22po4pjz3o32e.cloudfront.net/relume-icon.svg",
              alt: "Themes Icon",
            },
            title: "Themes",
            description: "Explore recurring themes in the Bible",
            url: "/themes",
          },
        ],
      },
    { title: "Notes", url: "/notes" },
    { title: "Leaderboard", url: "/leaderboard" },
  ],  
  buttons: [
    {
      title: "Button",
      variant: "secondary",
      size: "sm",
    },
    {
      title: "Button",
      size: "sm",
    },
  ],
};

const topLineVariants = {
  open: {
    translateY: 8,
    transition: { delay: 0.1 },
  },
  rotatePhase: {
    rotate: -45,
    transition: { delay: 0.2 },
  },
  closed: {
    translateY: 0,
    rotate: 0,
    transition: { duration: 0.2 },
  },
};

const middleLineVariants = {
  open: {
    width: 0,
    transition: { duration: 0.1 },
  },
  closed: {
    width: "1.5rem",
    transition: { delay: 0.3, duration: 0.2 },
  },
};

const bottomLineVariants = {
  open: {
    translateY: -8,
    transition: { delay: 0.1 },
  },
  rotatePhase: {
    rotate: 45,
    transition: { delay: 0.2 },
  },
  closed: {
    translateY: 0,
    rotate: 0,
    transition: { duration: 0.2 },
  },
};
