'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { logout } from '@/services/auth.service';
import { LayoutDashboard, LogOutIcon, Users } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const routes = [
  {
    label: 'Dashboard',
    icon: LayoutDashboard,
    href: '/dashboard',
  },
  {
    label: 'Students',
    icon: Users,
    href: '/dashboard/students',
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="space-y-4 py-4 flex flex-col h-full bg-background border-r">
      <div className="px-3 py-2 flex-1 flex flex-col justify-between">
        <div className="flex flex-col gap-1">
          {routes.map((route) => (
            <Link key={route.href} href={route.href}>
              <Button
                variant={pathname === route.href ? 'secondary' : 'ghost'}
                className={cn('w-full justify-start')}
              >
                <route.icon className="h-5 w-5 mr-3" />
                {route.label}
              </Button>
            </Link>
          ))}
        </div>
        <Button
          variant="ghost"
          className="w-full justify-start"
          onClick={() => logout()}
        >
          <LogOutIcon />
          Log out
        </Button>
      </div>
    </div>
  );
}
