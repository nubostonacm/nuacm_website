"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Header() {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="bg-black text-white p-4 fixed top-0 left-0 w-full z-10 shadow-md border-b border-celestial-blue">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo + name (clickable to home) */}
        <Link href="/" className="flex items-center space-x-2">
          <img src="/circle.svg" alt="ACM Logo" className="h-8 w-8" />
          <h1 className="text-xl font-bold">ACM @ Northeastern</h1>
        </Link>

        {/* Nav */}
        <nav className="space-x-4 relative">
          {/* These go to sections on the home page, from anywhere */}
          <Link href="/#home" className="hover:text-tiffany-blue">Home</Link>
          <Link href="/#about" className="hover:text-tiffany-blue">About</Link>

          <div className="inline-block relative">
            <button
              onClick={() => setDropdownOpen((o) => !o)}
              className="hover:text-tiffany-blue focus:outline-none"
              aria-haspopup="menu"
              aria-expanded={isDropdownOpen}
            >
              Events ⌄
            </button>

            {isDropdownOpen && (
              <div className="absolute left-1/2 -translate-x-1/2 mt-2 w-48 bg-black border border-celestial-blue shadow-lg rounded-md">
                {/* Section on home page */}
                <Link
                  href="/#events"
                  className="block px-2 py-2 hover:bg-gray-800"
                  onClick={() => setDropdownOpen(false)}
                >
                  Upcoming Events
                </Link>

                {/* Real page route */}
                <Link
                  href="/past_events"
                  className={`block px-2 py-2 hover:bg-gray-800 ${pathname === "/past-events" ? "text-tiffany-blue" : ""}`}
                  onClick={() => setDropdownOpen(false)}
                >
                  Past Events
                </Link>
              </div>
            )}
          </div>

          <a
            href="https://discord.gg/BU6yggFGFE"
            className="hover:text-tiffany-blue"
            target="_blank"
            rel="noopener noreferrer"
          >
            Join Us
          </a>
        </nav>
      </div>
    </header>
  );
}
