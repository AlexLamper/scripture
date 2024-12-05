type Props = {
    description: string;
  };
  
  export type Header64Props = React.ComponentPropsWithoutRef<"section"> & Partial<Props>;
  
  export const Header64 = (props: Header64Props) => {
    const { description } = {
      ...Header64Defaults,
      ...props,
    } as Props;
  
    return (
      <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
        <div className="container max-w-lg text-center">
          <h1 className="mb-5 text-6xl font-bold md:mb-6 md:text-9xl lg:text-10xl">Leaderboard</h1>
          <p className="md:text-md">{description}</p>
        </div>
      </section>
    );
  };
  
  export default Header64;
  
  export const Header64Defaults: Header64Props = {
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.",
  };
  