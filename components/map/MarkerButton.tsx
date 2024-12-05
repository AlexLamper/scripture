import React from "react";
import { FaStar, FaTrophy } from "react-icons/fa";
import { MdDoubleArrow } from "react-icons/md";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface MarkerButtonProps {
  name: string;
  completed: boolean;
  onClick: () => void;
  isFirstMarker?: boolean;
  isLastMarker?: boolean;
  maxWidth?: string;
  maxHeight?: string;
  className?: string;
  onCompletion?: () => void;
}

const MarkerButton = ({
  name,
  completed,
  onClick,
  isFirstMarker = false,
  isLastMarker = false,
  maxWidth = "90px",
  maxHeight = "80px",
  className = "",
}: MarkerButtonProps) => {
  const renderIcon = () => {
    if (completed) {
      return <FaTrophy size={30} color="white" className="mx-auto mt-6 flex justify-center items-center" />;
    } else if (isFirstMarker) {
      return <MdDoubleArrow size={30} color="white" className="mx-auto mt-6 flex justify-center items-center" />;
    } else if (isLastMarker) {
      return <FaTrophy size={30} color="white" className="mx-auto mt-6 flex justify-center items-center" />;
    } else {
      return <FaStar size={30} color="white" className="mx-auto mt-6 flex justify-center items-center" />;
    }
  };

  return (
    <TooltipProvider delayDuration={50}>
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            role="button"
            tabIndex={0}
            className={`pushable ${className} ${completed ? "completed" : "cursor-pointer"}`}
            onClick={onClick}
            style={{ maxWidth, maxHeight }}
          >
            <span className="shadow"></span>
            <span className="edge"></span>
            <span className={`front ${completed ? "front-completed" : ""}`}>
              {renderIcon()}
            </span>
          </div>
        </TooltipTrigger>
        <TooltipContent
          className={`${
            completed ? "bg-[#81C784]" : "bg-[#855940]"
          } bg-opacity-70 text-white p-2 rounded-md shadow-lg text-sm transition duration-150 ease-in-out relative font-medium tracking-wide mb-1`}
        >
          <span className="font-bold tracking-wide">{name}</span>
          <br />
          <span>{completed ? "Completed" : "Unlocked"}</span>
          <br />
          <span>{completed ? "" : <span className="italic">Click to get started</span>}</span>
        </TooltipContent>
      </Tooltip>

      <style jsx>{`
        .pushable {
          position: relative;
          border: none;
          background: transparent;
          padding: 0;
          cursor: pointer;
          outline-offset: 4px;
          transition: filter 250ms;
          border-radius: 50px;
          width: 90px;
          height: 80px;
          display: flex;
          justify-content: center;
          align-items: center;
          text-align: center;
        }

        .shadow, .edge, .front {
          width: 90px;
          height: 80px;
          border-radius: 50px;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .shadow {
          position: absolute;
          top: 0;
          left: 0;
          background: rgba(133, 89, 64, 0.3);
          will-change: transform;
          transition: transform 600ms cubic-bezier(0.3, 0.7, 0.4, 1);
        }

        .edge {
          position: absolute;
          top: 0;
          left: 0;
          background: linear-gradient(to left, #7A553C, #A67B5B);
        }

        .pushable.completed .shadow {
          background: rgba(129, 199, 132, 0.3);
        }

        .pushable.completed .edge {
          background: linear-gradient(to left, #66BB6A, #81C784);
        }

        .pushable.completed .front {
          background: #81C784;
        }


        .front {
          display: block;
          position: relative;
          font-size: 1rem;
          color: white;
          background: #A67B5B;
          will-change: transform;
          transform: translateY(-4px);
          transition: transform 600ms cubic-bezier(0.3, 0.7, 0.4, 1);
          padding: 0 12px;
          white-space: normal;
          overflow: hidden;
          text-overflow: ellipsis;
          word-wrap: break-word;
        }

        .front-completed {
          background: #4CAF50;
        }

        .pushable:hover {
          filter: brightness(110%);
        }

        .pushable:hover .front {
          transform: translateY(-6px);
          transition: transform 250ms cubic-bezier(0.3, 0.7, 0.4, 1.5);
        }

        .pushable:active .front {
          transform: translateY(-2px);
          transition: transform 34ms;
        }

        .pushable:hover .shadow {
          transform: translateY(4px);
          transition: transform 250ms cubic-bezier(0.3, 0.7, 0.4, 1.5);
        }

        .pushable:active .shadow {
          transform: translateY(1px);
          transition: transform 34ms;
        }

        .pushable:focus:not(:focus-visible) {
          outline: none;
        }
      `}</style>
    </TooltipProvider>
  );
};

export default MarkerButton;
