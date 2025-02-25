'use client';
import React from 'react';
import ScenarioCard from '../common/ScenarioCard';
import { Button } from '../ui/button';
import { PlusIcon, Split } from 'lucide-react';

const scenarios = [
  {
    creator: 'John Doe',
    creationDate: new Date(),
    name: 'Scenario 1',
    type: 0,
    published: false,
    topList: [
      { key: 'Total Revenue', value: '45,241 K$' },
      { key: 'Total Cost', value: '500 K$' },
    ],
    bottomList: [
      { key: 'p1', value: 100 },
      { key: 'p2', value: 90 },
      { key: 'p3', value: 12 },
      { key: 'p4', value: 0 },
      { key: 'p5', value: 12 },
      { key: 'p6', value: 45 },
    ],
    likes: 10,
    dislikes: 2,
    comments: 5,
    liked: true,
    disliked: false,
  },
  {
    creator: 'Jane Doe',
    creationDate: new Date(),
    name: 'Scenario 2',
    type: 2,
    published: true,
    topList: [
      { key: 'Total Revenue', value: '45,241 K$' },
      { key: 'Total Cost', value: '500 K$' },
    ],
    bottomList: [
      { key: 'p1', value: 100 },
      { key: 'p2', value: 90 },
      { key: 'p3', value: 12 },
      { key: 'p4', value: 0 },
      { key: 'p5', value: 12 },
      { key: 'p6', value: 45 },
    ],
    likes: 10,
    dislikes: 2,
    comments: 5,
    liked: true,
    disliked: false,
  },
  {
    creator: 'John Doe',
    creationDate: new Date(),
    name: 'Scenario 3',
    type: 0,
    published: true,
    topList: [
      { key: 'Total Revenue', value: '45,241 K$' },
      { key: 'Total Cost', value: '500 K$' },
    ],
    bottomList: [
      { key: 'p1', value: 100 },
      { key: 'p2', value: 90 },
      { key: 'p3', value: 12 },
      { key: 'p4', value: 0 },
      { key: 'p5', value: 12 },
      { key: 'p6', value: 45 },
    ],
    likes: 10,
    dislikes: 2,
    comments: 5,
    liked: false,
    disliked: true,
  },
];

const Scenarisation: React.FC = () => {
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
