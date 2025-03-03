'use client';

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
  isDisabled?: boolean;
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
  isDisabled,
}: StepProps) {
  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (isDisabled) {
      event.preventDefault();
    }
  };

  return (
    <Link
      href={redirectUrl}
      onClick={handleClick}
      className={clsx(isDisabled && 'cursor-not-allowed')}
    >
      <div
        className={clsx(
          'flex justify-between items-center rounded-lg relative bg-white gap-1 lg:gap-3',
          {
            'shadow-xl z-10 scale-[1.1] absolute py-3 px-6': isActive,
            'arrow-bg-first': isActive && isFirst,
            'arrow-bg': isActive && !isFirst && !isLast,
            'arrow-bg-end': isActive && isLast,
            'pl-3': isFirst,
            'pr-3': isLast,
          }
        )}
      >
        {/* Number Circle */}
        {
          <div
            className={clsx(
              `border-2 border-gray-400 p-3 rounded-full w-10 h-10 flex items-center justify-center`,
              {
                'border-white': isActive,
                'border-[#57D762] bg-[#6fef7930]': status === STEP_STATUS.DONE,
              }
            )}
          >
            <p
              className={clsx('font-semibold text-black text-xs', {
                'text-white': isActive,
                'text-gray-400': isDisabled,
              })}
            >
              {status === STEP_STATUS.DONE ? (
                <Check color="#57D762" />
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
          className={clsx(
            'text-[11px] min-[1280px]:text-xs max-w-[105px] min-[1280px]:max-w-fit font-medium uppercase text-black text-pretty',
            {
              'text-white': isActive,
              'text-gray-400': isDisabled,
            }
          )}
        >
          {label}
        </p>
      </div>
    </Link>
  );
}

export default Step;
