import { Clock } from 'lucide-react';
import React from 'react';

export default function WaitingStep({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="w-full h-[450px] rounded-md bg-white p-5">
      <div className="w-full h-full  rounded-md bg-customGray flex justify-center items-center flex-col">
        <Clock size={100} color="#0F172A" strokeWidth={1} />

        <h1
          color="#1C2024"
          className="text-2xl  text-card-foreground font-semibold font-geist tracking-tight mt-4"
        >
          {title}
        </h1>

        <p
          color="#60646C"
          className="text-xl  text-card-foreground   font-geist tracking-tight mt-4 inline-block"
        >
          {subtitle ? (
            subtitle
          ) : (
            <>
              Merci de patienter le temps qu'elles finalisent leur version, ou
              passez à{' '}
              <span className="text-blue-500 underline">l’étape suivante</span>
            </>
          )}
        </p>
      </div>
    </div>
  );
}
