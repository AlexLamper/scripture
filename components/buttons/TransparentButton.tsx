import React from 'react';
import clsx from 'clsx';
import Link from 'next/link';

interface TransparentButtonProps {
  title: string;
  width?: string;
  height?: string;
  fontSize?: string;
  url?: string;
  padding?: string;
  onClick?: () => void;
}

const TransparentButton: React.FC<TransparentButtonProps> = ({
  title,
  width = 'w-full max-w-[12rem] min-w-[8rem]',
  height = 'h-[2.8rem] p-4',
  fontSize = 'text-[1.2rem]',
  padding = 'p-6',
  url,
  onClick,
}) => {
  const buttonContent = (
    <div
      className={clsx(
        "bg-white/30 backdrop-blur-md text-white transition-colors duration-300 hover:bg-white/40 text-center cursor-pointer shadow-md shadow-[#85858550] rounded-[0.5rem] flex items-center justify-center border border-white/20 dark:bg-white/20 dark:border-none dark:hover:bg-white/30",
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

export default TransparentButton;
