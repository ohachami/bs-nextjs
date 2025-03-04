'use client';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { AvatarImage } from '@radix-ui/react-avatar';
import clsx from 'clsx';
import { ChartLine, ClipboardList, GitCompareArrows } from 'lucide-react';
import Image from 'next/image';
import { useParams, usePathname } from 'next/navigation';
import React from 'react';
import svgLogo from '../../public/Logo.svg';
import './globals.css';
import { modules } from '@/utils/constants';
import { useUser } from '@/services/users.service';

const ModuleInfo: React.FC<{
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title: string;
  actif: boolean;
}> = ({ icon: Icon, title, actif }) => (
  <div
    className={clsx({
      'flex items-center gap-2 text-sm font-geis': true,
      'text-muted-foreground': !actif,
      'text-foreground': actif,
    })}
  >
    <Icon className="size-4" />
    <p>{title}</p>
  </div>
);

const NavBar = () => {
  const pathname = usePathname();
  const params = useParams();

  const userQuery = useUser();

  return (
    <div className="sticky top-0 z-50 h-16 bg-white py-3 px-4 flex justify-between items-center border-b border-[#E2E8F0]">
      <Image src={svgLogo} alt="logo" />

      <div className="grow ml-[50px]">
        {pathname.startsWith('/modules') && (
          <div className="flex gap-6">
            <ModuleInfo
              icon={ChartLine}
              title="Market Steering"
              actif={params.module === modules.marketSteering}
            />
            <ModuleInfo
              icon={ClipboardList}
              title="Tactical planning"
              actif={params.module === modules.tacticalPlanning}
            />
            <ModuleInfo
              icon={GitCompareArrows}
              title="Mid-term supply chain"
              actif={params.module === modules.midTermSupplyChain}
            />
          </div>
        )}
      </div>

      <div className="flex items-center gap-4">
        <p className="font-montserrat font-medium text-muted-foreground text-sm">
          Welcome {userQuery.isSuccess && `${userQuery.data.firstName}`}
        </p>
        <Avatar className="w-10 h-10">
          <AvatarImage src="https://picsum.photos/200" />
          <AvatarFallback>AV</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
};

export default NavBar;
