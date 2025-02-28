'use client';
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Copy } from 'lucide-react';
import { useCloneScenario } from '@/services/scenarios.service';

interface CloneScenarioButtonProps {
  scenarioId: string;
  scenarioName: string;
}

const CloneScenarioButton: React.FC<CloneScenarioButtonProps> = ({
  scenarioId,
  scenarioName,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [newName, setNewName] = useState(`${scenarioName} (copy)`);
  const cloneScenario = useCloneScenario();

  const handleClone = () => {
    cloneScenario.mutate(
      { scenarioId, name: newName },
      {
        onSuccess: () => setIsOpen(false),
      }
    );
  };

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(true)}
        title="Duplicate scenario"
      >
        <Copy className="h-4 w-4" />
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Clone Scenario</DialogTitle>
            <DialogDescription>
              Create a copy of <strong>{scenarioName}</strong> with a new name
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <Input
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="New scenario name"
              autoFocus
            />
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleClone}
              disabled={!newName.trim() || cloneScenario.isPending}
            >
              {cloneScenario.isPending ? 'Cloning...' : 'Clone Scenario'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CloneScenarioButton;
