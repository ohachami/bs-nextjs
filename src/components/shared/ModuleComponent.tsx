import { ChartLine } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { MoveRight } from 'lucide-react'

type Props = {
    title: string;
    description: string;
}

const ModuleComponent: React.FC<Props> = ({title, description}) => (
    <div className="p-4 bg-white rounded-lg shadow-sm mt-[76.2px] h-[332px] flex flex-col">
        <div className="h-[152.4px] w-[151px] border-[1.5px] rounded-[20px] border-primary-light bg-[#E2FDE4] p-5 -mt-24">
            <ChartLine className='w-full h-full text-primary' strokeWidth={1} />
        </div>

        <div className='grow flex flex-col justify-between gap-6 p-6'>
            <h1 className='font-geist font-semibold text-[28px] text-card-foreground font-family: Geist; tracking-[-0.6px]'>{title}</h1>

            <p className='font-geist font-normal text-xs leading-4 text-muted-foreground'>
                {description}
            </p>
            
            <Button variant="ghost" className='hover:bg-transparent w-fit p-0'>
                <MoveRight className='!w-9 !h-9 text-[#57D762]' strokeWidth={1} />
            </Button>
        </div>
    </div>
)

export default ModuleComponent