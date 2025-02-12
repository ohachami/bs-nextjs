'use client';

import { ChevronDown, ChevronUp, MoveRight } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../ui/button';

/**
 * SelectedVersions Component Props
 */
interface SelectedVersionsProps {
  selectedVersions: string[];
  totalLength: number;
  submitAction: () => void;
}

/**
 * Displaying the list of selected versions from the "VersionTable" component
 *  If: the selectedVersion === dataSource.length
 *  Then => We activate the "Consolider et Visualiser" Button!
 */
function SelectedVersions({
  selectedVersions,
  totalLength,
  submitAction,
}: SelectedVersionsProps) {
  // up and down arrow state tracking
  const [toggle, setToggle] = useState<boolean>(false);
  // switch toggle
  const onToggle = () => {
    setToggle((p) => !p);
  };

  return (
    <div className="flex justify-between items-end">
      <div className="flex flex-col items-center gap-2">
        <p
          className="flex gap-2 items-center cursor-pointer text-sm font-medium"
          onClick={onToggle}
        >
          {!toggle ? <ChevronDown size={20} /> : <ChevronUp size={20} />}{' '}
          {selectedVersions.length} sur {totalLength} fichier(s) sélectionné(s).
        </p>
        {toggle && (
          <ul>
            {selectedVersions.map((versionName: string, key: number) => (
              <li
                className="text-gray-500 font-light text-xs animate-fadeInDown"
                key={key}
              >
                - {versionName}
              </li>
            ))}
          </ul>
        )}
      </div>
      <Button
        onClick={submitAction}
        className="bg-[#007BFF] hover:bg-[#007bffd6]"
        disabled={selectedVersions.length !== totalLength}
      >
        Consolider et visualize <MoveRight />
      </Button>
    </div>
  );
}

export default SelectedVersions;
