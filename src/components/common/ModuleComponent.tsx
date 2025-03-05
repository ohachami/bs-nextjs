import clsx from 'clsx';
import { MoveRight } from 'lucide-react';
import { ReactNode } from 'react';
import Link from 'next/link';

type Props = {
  title: string;
  description: string;
  variant: 'primary' | 'secondary' | 'tertiary';
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  to?: string;
  children?: ReactNode;
};

const ModuleComponent: React.FC<Props> = ({
  variant,
  icon: Icon,
  title,
  to,
  description,
  children,
}) => {
    const Content = () => (
        <div className="my-[80px] p-4 bg-white rounded-lg shadow-sm flex flex-col h-full max-h-[387px]">
            <div
                className={clsx(
                    '-mt-[90px] h-[150px] w-[150px] border-[1.5px] rounded-[20px] p-5',
                    {
                        'bg-primary-light border-primary/40': variant === 'primary',
                        'bg-secondary-light border-secondary/40': variant === 'secondary',
                        'bg-tertiary-light border-tertiary/40': variant === 'tertiary',
                    }
                )}
            >
                <Icon
                    className={clsx({
                        'w-full h-full': true,
                        'text-primary': variant === 'primary',
                        'text-secondary': variant === 'secondary',
                        'text-tertiary': variant === 'tertiary',
                    })}
                    strokeWidth={1}
                />
            </div>

            <div className="grow flex flex-col justify-between gap-6 p-6">
                <h1 className="font-geist font-semibold text-[28px] text-card-foreground leading-7 tracking-[-0.6px]">
                    {title}
                </h1>

                <p className="font-geist font-normal text-xs leading-4 text-muted-foreground">
                    {description}
                </p>

                {children && children}

                <div className="w-9 h-9">
                    {to && (
                        <MoveRight
                            strokeWidth={1}
                            size={36}
                            className={clsx({
                                'text-primary': variant === 'primary',
                                'text-secondary': variant === 'secondary',
                                'text-tertiary': variant === 'tertiary',
                            })}
                        />
                    )}
                </div>
            </div>
        </div>
    )

    return to ? <Link href={to}><Content/></Link> : <Content/>;
};

export default ModuleComponent;
