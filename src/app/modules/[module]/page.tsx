'use client';
import ModuleComponent from '@/components/common/ModuleComponent';
import { useExercisesCountByStatus } from '@/services/exercises.service';
import { MousePointerClick, SlidersHorizontal } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { EXERCISE_STATUS, modules } from '@/utils/constants';

const Module = () => {
  const exercicesEncours =
    useExercisesCountByStatus(EXERCISE_STATUS.IN_PROGRESS);
  const exercicesCloture =
    useExercisesCountByStatus(EXERCISE_STATUS.CLOSED);
  return (
    <div className=" h-full flex flex-col gap-4 p-8 pt-6">
      <div className="flex flex-col gap-2.5 mt-5 mb-11">
        <h1 className="font-geist font-semibold text-2xl text-card-foreground">
          Tactical planning (business steering)
        </h1>
        <p className="font-geist font-normal text-sm text-muted-foreground">
          Encapsulant le processus de Business Steering, permettant à chaque BU de réaliser un run local pour optimiser sa valeur, et ainsi contribuer au run global visant à maximiser la valeur pour le Groupe.
        </p>
      </div>

      <div className="grow grid grid-cols-2 gap-4 h-fit">
        <div className="col-span-1">
          <ModuleComponent
            icon={MousePointerClick}
            variant="primary"
            title="Gestion des exercices"
            description="Gestion des exercices BS du groupe"
            to={`/modules/${modules.tacticalPlanning}/exercises`}
          >
            <div className="flex gap-3">
              {exercicesEncours.isSuccess && (
                <Badge className="rounded-full">
                  {exercicesEncours.data} Exercices en cours
                </Badge>
              )}
              {exercicesCloture.isSuccess && (
                <Badge className="rounded-full bg-accent text-accent-foreground hover:bg-accent hover:text-accent-foreground">
                  {exercicesCloture.data} Exercices clôturés
                </Badge>
              )}
            </div>
          </ModuleComponent>
        </div>
        <div className="col-span-1">
          <ModuleComponent
            icon={SlidersHorizontal}
            variant="secondary"
            title="Simulation Ad Hoc"
            description="Espace dédié à chaque BU pour effectuer des simulations en fonction de ses besoins."
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
