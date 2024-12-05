import React from 'react';
import clsx from 'clsx';
import Link from 'next/link';

interface BorderButtonProps {
  title: string;
  width?: string;
  height?: string;
  fontSize?: string;
  url?: string;
  padding?: string;
  onClick?: () => void;
}

const BorderButton: React.FC<BorderButtonProps> = ({
  title,
  width = 'w-full max-w-[12rem] min-w-[4rem]',
  height = 'lg:h-[2.8rem] h-[1.7rem] p-4',
  fontSize = 'lg:text-[1.2rem] text-[0.8rem]',
  padding = 'p-6',
  url,
  onClick,
}) => {
  const buttonContent = (
    <div
      className={clsx(
        "bg-white/30 backdrop-blur-md text-black transition-colors duration-300 hover:bg-gray-300/30 text-center cursor-pointer shadow-md shadow-[#85858550] rounded-[0.5rem] flex items-center justify-center font-normal dark:bg-white/20 dark:border-none dark:hover:bg-white/30 border border-black border-opacity-30 hover:border-opacity-15",
        width,
        height,
        padding
      )}
      onClick={onClick}
    >
      <h2
        className={clsx(
          fontSize,
          "mx-auto font-roto font-medium"
        )}
        style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
      >
        {title}
      </h2>
    </div>
  );

  return url ? (
    <Link href={url} passHref>
      <div className="block w-full">
        {buttonContent}
      </div>
    </Link>
  ) : (
    buttonContent
  );
};

export default BorderButton;
