'use client';
import React from 'react';
import ScenarioCard from '../common/ScenarioCard';
import { Button } from '../ui/button';
import { PlusIcon, Split } from 'lucide-react';
import { useScenarios } from '@/services/scenarios.service';

const Scenarisation: React.FC = () => {
  const { isPending, data: scenarios } = useScenarios();

  if (isPending) return <p>Loading...</p>;
  if (!scenarios) return <p>Error...</p>;

  return (
    <div>
      <div className="flex items-center justify-between">
        <p className="font-semibold text-lg p-4 pl-0"> Liste des scénarios</p>
        <div className="flex gap-4 p-4">
          <Button variant="outline">
            <Split size={16} />
            Comparer
          </Button>
          <Button variant="default">
            <PlusIcon size={16} />
            Ajouter un scénario
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-4">
        {scenarios.map((item, index) => (
          <ScenarioCard key={index} scenario={item} />
        ))}
      </div>
    </div>
  );
};

export default Scenarisation;
