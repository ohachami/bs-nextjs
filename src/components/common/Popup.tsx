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
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#001B02] bg-opacity-70"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-lg p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col items-center gap-4">
          <div className="flex justify-center">{icon}</div>
          <h2 className="font-bold">{title}</h2>
          <div className="mt-4 text-gray-500">
            <p>{description}</p>
          </div>
          <div className="mt-4">{actions}</div>
        </div>
      </div>
    </div>
  );
};

export default Popup;
