'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { DatePickerWithRange } from './DatePickerWithRange';
import { ModeToggle } from './ModeToggle';

export const links = [
    { href: '/', label: 'Latest Data' },
];

const minuteOptions = [3, 5, 10, 30]; // Add more predefined intervals if needed

export const Navbar = () => {
    const pathname = usePathname();
    const router = useRouter();
    const [customMinutes, setCustomMinutes] = useState('');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleMinuteChange = (minutes: number | string) => {
        router.push(`/minute/${minutes}`);
        setIsDropdownOpen(false); // Close the dropdown after selection
    };

    const toggleDropdown = () => {
        setIsDropdownOpen((prev) => !prev);
    };

    return (
        <div className="navbar bg-base-100 px-10 py-6 flex justify-between items-center">
            <ModeToggle />
            <div className="flex gap-x-4 items-center">
                <DatePickerWithRange />

                {links.map((link) => (
                    <Link
                        key={link.href}
                        href={link.href}
                        className={`px-4 py-2 rounded-md ${pathname === link.href ? 'bg-blue-500 text-white dark:bg-white/10' : 'hover:bg-blue-500 hover:text-white dark:hover:bg-white/10'}`}
                    >
                        {link.label}
                    </Link>
                ))}

                <div className="relative">
                    <button onClick={toggleDropdown} className="px-4 py-2 rounded-md bg-gray-200 dark:bg-gray-700">
                        Select Minutes Ago
                    </button>

                    {isDropdownOpen && (
                        <div className="absolute bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md shadow-lg mt-2 z-10">
                            {minuteOptions.map((option) => (
                                <button
                                    key={option}
                                    onClick={() => handleMinuteChange(option)}
                                    className="block w-full px-4 py-2 text-left hover:bg-blue-500 hover:text-white"
                                >
                                    {option} Minutes Ago
                                </button>
                            ))}
                            <div className="p-2">
                                <input
                                    type="number"
                                    placeholder="Custom minutes"
                                    value={customMinutes}
                                    onChange={(e) => setCustomMinutes(e.target.value)}
                                    onKeyPress={(e) => {
                                        if (e.key === 'Enter' && customMinutes) {
                                            handleMinuteChange(customMinutes);
                                        }
                                    }}
                                    className="w-full px-2 py-1 border rounded-md"
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
