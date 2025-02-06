import { Computer } from "lucide-react";
import { useRouter } from "next/navigation";


export function EmptyData() {
    const router = useRouter();
    return (
        <div className="bg-background border rounded-md p-6">
            <div className="bg-[#F3F6F999] flex flex-col justify-center items-center p-16 gap-2">
                <Computer size={56} className="text-border" strokeWidth={1}/>
                <h3 className="font-semibold">Aucune version de données pour le moment!</h3>
                <div className="text-muted-foreground">
                    Veuillez patienter pendant que nous obtenons une version d'ODT ou cliquez pour
                    <button
                        className="text-[#007BFF] underline ml-1"
                        onClick={() => router.refresh()}
                    >Actualiser</button>
                </div>
            </div>
        </div>
    )
}
