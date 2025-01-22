import ExerciceCard from '@/components/common/ExerciceCard';
import { Button } from '@/components/ui/button';
import { PlusIcon } from 'lucide-react';

const ModuleExercices = () => (
  <div className="flex flex-col p-8 pt-6 gap-4">
    <div className="flex justify-between items-center">
      <h1 className="text-2xl text-card-foreground font-semibold font-geist tracking-tight">
        Liste des exercices
      </h1>

      <Button>
        <PlusIcon /> Démarrer un exercice
      </Button>
    </div>

    <div>filters</div>

    <div>
      <ExerciceCard
        creator="Hamza AZAMI"
        creationDate={new Date()}
        name="Exercice MBR Fev 2025"
      />
    </div>

    <div>actifs précédents</div>
  </div>
);

export default ModuleExercices;
