import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface PopupProps {
  icon: JSX.Element;
  title: string;
  description: string;
  actions: JSX.Element;
  onClose: () => void;
}

const Popup: React.FC<PopupProps> = ({
  icon,
  title,
  description,
  actions,
  onClose,
}) => {
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="flex flex-col items-center">
          <div className="mb-2">{icon}</div>
          <DialogTitle className="text-center">{title}</DialogTitle>
        </DialogHeader>
        <DialogDescription className="text-center">
          {description}
        </DialogDescription>
        <DialogFooter className="flex justify-center sm:justify-center">
          {actions}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Popup;
