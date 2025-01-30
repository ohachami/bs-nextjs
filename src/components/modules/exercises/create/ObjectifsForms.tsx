import { Button } from "@/components/ui/button";
import { FileText, PlusIcon, Trash2 } from "lucide-react";

function ObjectifsForm() {
  return (
    <div className="space-y-4">
      <Button variant={"outline"} className="w-full h-12">
        <PlusIcon/> Télécharger le fichier canva
      </Button>

      <div className="flex justify-between items-center py-1 px-4 bg-gray-50 border border-[#E2E8F0] rounded-lg">
        <div className="flex justify-start items-center gap-3">
          <FileText size={20} />
          <p className="font-medium">Fileexample.xlsx</p>
        </div>
        <div className="cursor-pointer hover:bg-red-100 p-2 rounded-lg">
          <Trash2 size={20} color="#db5a67" />
        </div>
      </div>
    </div>
  );
}

export default ObjectifsForm;