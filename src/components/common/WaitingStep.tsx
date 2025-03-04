import { Clock } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

export default function WaitingStep({
  title,
  subtitle,
  nextStep,
}: {
  title: string;
  subtitle?: string;
  nextStep: string;
}) {
  return (
    <div className="w-full h-[450px] rounded-md bg-white p-5">
      <div className="w-full h-full  rounded-md bg-customGray flex justify-center items-center flex-col gap-[11px]">
        <Clock size={56} color="#0F172A" strokeWidth={1} />

        <h1
          color="#1C2024"
          className="text-base  text-card-foreground font-semibold font-geist tracking-tight"
        >
          {title}
        </h1>

        <p
          color="#60646C"
          className="text-sm  text-card-foreground   font-geist tracking-tight inline-block"
        >
          {subtitle ? (
            subtitle
          ) : (
            <>
              {`Merci de patienter le temps qu'elles finalisent leur version, ou passez à`}
              <Link href={nextStep}>
                <span className="text-blue-500 underline ml-1">
                  {'l’étape suivante'}
                </span>
              </Link>
            </>
          )}
        </p>
      </div>
    </div>
  );
}
