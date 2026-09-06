'use client';

import { useRouter } from 'next/navigation';

export default function LogoutButton() {
    const router = useRouter();

    const handleLogout = async () => {
        await fetch('/api/admin/logout', { method: 'POST' });
        router.push('/dashboard/login');
        router.refresh();
    };

    return (
        <button onClick={handleLogout} className="nav-link text-white opacity-75 hover-opacity-100 bg-transparent border-0 text-start w-100 p-0">
            Log Out
        </button>
    );
}
