import clsx from 'clsx';
import { Check } from 'lucide-react';
import Link from 'next/link';
import React from 'react';


export const StepStatus = {
  DONE: 'DONE',
  IN_PROGRESS: 'IN_PROGRESS',
  INACTIVE: 'INACTIVE'
} as const;

interface StepProps {
  label: string;
  iconKey: React.ReactNode;
  status: string;
  redirectUrl: string;
  stepNumber: number;
  isActive: boolean;
  isFirst: boolean;
  isLast: boolean;
}

function Step({
  label,
  iconKey,
  status,
  redirectUrl,
  stepNumber,
  isActive,
  isFirst,
  isLast,
}: StepProps) {
  return (
    <Link href={redirectUrl}>
      <div
        className={clsx(
          'flex justify-between gap-4 px-10 items-center py-2 rounded-lg cursor-pointer relative bg-white',
          isActive &&
            isFirst &&
            'arrow-bg-first pr-0 pl-8 shadow-lg z-10 scale-[1.20] absolute',
          isActive &&
            !isFirst &&
            !isLast &&
            'arrow-bg pl-10 pr-0 shadow-xl z-10 scale-[1.20] absolute',
          isActive &&
            isLast &&
            'arrow-bg-end pr-0 pl-10 shadow-xl z-10 scale-[1.20] absolute'
        )}
      >
        {/* Number Circle */}
        {
          <div
            className={`border-2 ${isActive ? 'border-white': status === "DONE"? 'border-[#57D762] bg-[#6fef7930]': 'border-gray-400'} p-3 rounded-full w-14 h-14 flex items-center justify-center`}
          >
            <p
              className={`font-semibold ${isActive ? 'text-white' : 'text-gray-400'}`}
            >
              {status === 'DONE' ? (
                <Check color='#57D762' />
              ) : status === 'INACTIVE' ? (
                stepNumber
              ) : (
                iconKey
              )}
            </p>
          </div>
        }

        {/* Text */}
        <p
          className={`text-sm w-[150px] font-medium ${isActive ? 'text-white' : 'text-gray-400'} uppercase`}
        >
          {label}
        </p>
      </div>
    </Link>
  );
}

export default Step;
