'use client'
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { BiMoon, BiSun } from 'react-icons/bi';

export const ThemeSwitcher = () => {
    const [mounted, setmounted] = useState(false)
    const { theme, setTheme } = useTheme();

    if (!mounted) { return null }

    return (
        <div className="flex items-center justify-center mx-4">
            {
                theme === "light" ? (
                    <BiMoon
                        clasName="cursor-pointer"
                        fill="black"
                        size={25}
                        onClick={() => setTheme("dark")}
                    />
                ) : (
                    <BiSun
                        size={25}
                        clasName="cursor-pointer"
                        onClick={() => setTheme("light")}
                    />

                )
            }
        </div>
    )
}