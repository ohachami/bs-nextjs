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
          'flex justify-center items-center relative bg-white gap-1 lg:gap-3',
          {
            'shadow scale-[1.15] z-10 h-[66px]': isActive, // Scale up when active
            'shadow-none': !isActive, // Default shadow
            'arrow-bg-first': isActive && isFirst,
            'arrow-bg': isActive && !isFirst && !isLast,
            'arrow-bg-end': isActive && isLast,
            'pl-3 rounded-l-lg': isFirst,
            'pr-3 rounded-r-lg': isLast,
          }
        )}
      >
        {/* Number Circle */}
        {
          <div
            className={clsx(
              `border-2 border-gray-400 p-3 rounded-full min-w-10 w-10 h-10 flex items-center justify-center`,
              {
                'border-white': isActive,
                'border-[#57D762] bg-[#6fef7930]': status === STEP_STATUS.DONE,
              }
            )}
          >
            <p
              className={clsx('font-semibold text-black text-xs', {
                'text-white text-sm': isActive,
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
            'text-xs font-medium uppercase text-black text-balance max-w-[120px]',
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
