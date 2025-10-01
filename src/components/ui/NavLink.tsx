"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Nav.module.css'; // Adjust the path to your CSS module

export default function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
    const pathname = usePathname();
    const isActive = pathname === href;

    return (
        <Link href={href}
              className={`${isActive? 'bg-red-400 text-gray-900' : 'text-gray-300'} flex items-center px-4 py-4 hover:bg-gray-700 hover:text-white text-lg `}>
            {children}
        </Link>
    );
}