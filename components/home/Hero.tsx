import { useUser } from "@clerk/nextjs";

type Props = {
  description: string;
};

export type Header64Props = React.ComponentPropsWithoutRef<"section"> & Partial<Props>;

export const Header64 = (props: Header64Props) => {
  const { description } = {
    ...Header64Defaults,
    ...props,
  } as Props;
  const { user, isLoaded } = useUser();

  return (
    <section id="relume" className="px-[5%] py-6 md:py-6 lg:py-8 w-full max-h-full overflow-hidden">
      <div className="container max-w-lg text-center">
        <h1 className="mb-3 text-4xl font-bold md:mb-4 md:text-7xl lg:text-8xl">
          {isLoaded ? (
            <>
              Welcome, {user ? user.firstName : "Guest"}!
            </>
          ) : (
            "Loading..."
          )}
        </h1>
        <p className="md:text-sm lg:text-md lg:max-w-[80%] max-w-[90%] mx-auto italic">{description}</p>
      </div>
    </section>
  );
};

export default Header64;

export const Header64Defaults: Header64Props = {
  description: "Start discovering everything about the bible, today!",
};
