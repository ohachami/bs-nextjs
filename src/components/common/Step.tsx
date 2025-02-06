import { STEP_STATUS } from '@/utils/constants';
import clsx from 'clsx';
import { Check } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

export interface StepProps {
  label: string;
  iconKey: React.ComponentType<{ color?: string }>;
  status: string;
  code: string;
  redirectUrl: string;
  stepNumber?: number;
  isActive?: boolean;
  isFirst?: boolean;
  isLast?: boolean;
}

function Step({
  label,
  iconKey: Icon,
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
            'arrow-bg-first pr-0 pl-8 shadow-lg z-10 scale-[1.1] absolute',
          isActive &&
            !isFirst &&
            !isLast &&
            'arrow-bg pl-10 pr-0 shadow-xl z-10 scale-[1.1] absolute',
          isActive &&
            isLast &&
            'arrow-bg-end pr-0 pl-10 shadow-xl z-10 scale-[1.1] absolute'
        )}
      >
        {/* Number Circle */}
        {
          <div
            className={`border-2 ${isActive ? 'border-white': status === STEP_STATUS.DONE? 'border-[#57D762] bg-[#6fef7930]': 'border-gray-400'} p-3 rounded-full w-14 h-14 flex items-center justify-center`}
          >
            <p
              className={`font-semibold ${isActive ? 'text-white' : 'text-gray-400'}`}
            >
              {status === STEP_STATUS.DONE ? (
                <Check color='#57D762' />
              ) : status === STEP_STATUS.INACTIVE ? (
                stepNumber
              ) : (
                <Icon />
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
