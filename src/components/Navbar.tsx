"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/about",    label: "About" },
  { href: "/events",   label: "Events" },
  { href: "/software", label: "Software" },
  { href: "/clients",  label: "Clients" },
  { href: "/contact",  label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMenuOpen(false), [pathname]);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${scrolled ? "bg-acm-black/85 backdrop-blur-md border-b border-acm-border" : "bg-transparent border-b border-transparent"}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between h-16">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <span className="relative w-5 h-5 flex-shrink-0">
            <span className="absolute inset-0 bg-acm-blue-b rotate-45 block transition-transform group-hover:rotate-[60deg] duration-300" />
            <span className="absolute inset-[5px] bg-acm-black rotate-0 block" />
          </span>
          <span className="font-display font-bold text-sm tracking-widest uppercase text-acm-text">
            ACM <span className="text-acm-muted font-normal">@ Northeastern</span>
          </span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className={`font-mono text-xs tracking-widest uppercase transition-colors duration-200 relative group ${pathname === link.href ? "text-acm-blue-b" : "text-acm-muted hover:text-acm-text"}`}>
                {link.label}
                <span className={`absolute -bottom-1 left-0 h-px bg-acm-blue-b transition-all duration-300 ${pathname === link.href ? "w-full" : "w-0 group-hover:w-full"}`} />
              </Link>
            </li>
          ))}
          <li>
            <Link href="/join"
              className="font-mono text-xs tracking-widest uppercase border border-acm-blue-mid text-acm-blue-sky px-4 py-2 rounded-sm hover:bg-acm-blue-mid hover:text-white transition-all duration-200">
              Join Us
            </Link>
          </li>
        </ul>

        {/* Mobile hamburger */}
        <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden flex flex-col gap-1.5 p-2" aria-label="Toggle menu">
          <span className={`block w-5 h-px bg-acm-text transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-5 h-px bg-acm-text transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block w-5 h-px bg-acm-text transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden border-t border-acm-border bg-acm-black/95 backdrop-blur-md transition-all duration-300 overflow-hidden ${menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
        <ul className="flex flex-col px-6 py-4 gap-4">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className={`font-mono text-xs tracking-widest uppercase block py-2 ${pathname === link.href ? "text-acm-blue-b" : "text-acm-muted hover:text-acm-text"}`}>
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <Link href="/join"
              className="font-mono text-xs tracking-widest uppercase text-acm-blue-sky">
              Join Us →
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
