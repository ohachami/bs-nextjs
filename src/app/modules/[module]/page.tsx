'use client';
import ModuleComponent from '@/components/common/ModuleComponent';
import { useExercisesCount } from '@/services/exercises.service';
import { MousePointerClick, SlidersHorizontal } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { modules } from '@/utils/constants';

const Module = () => {
  const countQuery = useExercisesCount();
  return (
    <div className=" h-full flex flex-col gap-4 p-8 pt-6">
      <div className="flex flex-col gap-2.5 mt-5 mb-11">
        <h1 className="font-geist font-semibold text-2xl text-card-foreground">
          Tactical planning (business steering)
        </h1>
        <p className="font-geist font-normal text-sm text-muted-foreground">
          Description Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Nam imperdiet quam fringilla libero rutrum lobortis...
        </p>
      </div>

      <div className="grow grid grid-cols-2 gap-4 h-fit">
        <div className="col-span-1">
          <ModuleComponent
            icon={MousePointerClick}
            variant="primary"
            title="Gestion des exercices"
            description="Description Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam imperdiet quam fringilla libero rutrum lobortis..."
            to={`/modules/${modules.tacticalPlanning}/exercises`}
          >
            <div className="flex gap-3">
              {countQuery.isSuccess && (
                <Badge className="rounded-full">
                  {countQuery.data} Exercices publiques
                </Badge>
              )}
              <Badge className="rounded-full bg-accent text-accent-foreground hover:bg-accent hover:text-accent-foreground">
                0 Exercices locaux
              </Badge>
            </div>
          </ModuleComponent>
        </div>
        <div className="col-span-1">
          <ModuleComponent
            icon={SlidersHorizontal}
            variant="secondary"
            title="Simulation Ad Hoc"
            description="Description Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam imperdiet quam fringilla libero rutrum lobortis..."
          >
            <div>
              <Badge className="rounded-full bg-accent text-accent-foreground hover:bg-accent hover:text-accent-foreground">
                5 Simulations
              </Badge>
            </div>
          </ModuleComponent>
        </div>
      </div>

      <div className="flex justify-between font-geist font-normal text-xs text-blue-dark">
        <p>© {new Date().getFullYear()} SteerLinX</p>
        <p>À propos de nous</p>
      </div>
    </div>
  );
};

export default Module;
