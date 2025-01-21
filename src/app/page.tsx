'use client';

import ModuleComponent from '@/components/shared/ModuleComponent';
import { modules } from '@/utils/constants';
import { ChartLine, ClipboardList, GitCompareArrows } from 'lucide-react';
import React from 'react';

const HomePage = () => {
  return (
    <div className=" h-full flex flex-col gap-4 p-8 pt-6">
      <div className="flex flex-col gap-2.5 mt-5 mb-11">
        <h1 className="font-geist font-semibold text-2xl text-card-foreground">
          Bienvenue au SteerLinX
        </h1>
        <p className="font-geist font-normal text-sm text-muted-foreground">
          Description Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Nam imperdiet quam fringilla libero rutrum lobortis...
        </p>
      </div>

      <div className="grow grid grid-cols-3 gap-4 h-fit">
        <div className="col-span-1">
          <ModuleComponent
            icon={ChartLine}
            variant="primary"
            title="Market steering"
            description="Description Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam imperdiet quam fringilla libero rutrum lobortis..."
          />
        </div>
        <div className="col-span-1">
          <ModuleComponent
            icon={ClipboardList}
            variant="secondary"
            title="Tactical planning (business steering)"
            description="Description Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam imperdiet quam fringilla libero rutrum lobortis..."
            to={`/modules/${modules.tacticalPlanning}`}
          />
        </div>
        <div className="col-span-1">
          <ModuleComponent
            icon={GitCompareArrows}
            variant="tertiary"
            title="Mid-term supply chain"
            description="Description Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam imperdiet quam fringilla libero rutrum lobortis..."
          />
        </div>
      </div>

      <div className="flex justify-between font-geist font-normal text-xs text-blue-dark">
        <p>© {new Date().getFullYear()} SteerLinX</p>
        <p>À propos de nous</p>
      </div>
    </div>
  );
};

export default HomePage;
