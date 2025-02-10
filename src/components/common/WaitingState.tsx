import { Clock } from "lucide-react";

interface Props {
    nextStep: () => {},
}

export function WaitingState({ nextStep }: Props) {
    return (
        <div className="bg-background border rounded-md p-6">
            <div className="bg-[#F3F6F999] flex flex-col justify-center items-center p-16 gap-2">
                <Clock size={56} className="text-border" strokeWidth={1}/>
                <h3 className="font-semibold">
                    Les BUs industrielles sont en train de terminer leur version
                </h3>
                <div className="text-muted-foreground">
                    Merci de patienter le temps qu'elles finalisent leur version, ou passez à
                    <button
                        className="text-[#007BFF] underline ml-1"
                        onClick={nextStep}
                    >
                        l’étape suivante
                    </button>
                </div>
            </div>
        </div>
    )
}
