"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui";
import { Logo } from "@/components/layout/Logo";
import { TopContactBar } from "@/components/layout/TopContactBar";
import { circuitMenuItems } from "@/lib/data/navigation";

const navLinks = [
  { href: "/creer-mon-itineraire", label: "Sur mesure" },
  { href: "/blog", label: "Blog" },
  { href: "/a-propos", label: "À propos" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [circuitsOpen, setCircuitsOpen] = useState(false);
  const [hoverMenu, setHoverMenu] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-cream-dark bg-white/95 backdrop-blur-md shadow-sm">
      <TopContactBar />
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Logo />

        <nav className="hidden items-center gap-8 md:flex">
          <div
            className="relative"
            onMouseEnter={() => setHoverMenu(true)}
            onMouseLeave={() => setHoverMenu(false)}
          >
            <Link
              href="/circuits"
              className="inline-flex items-center gap-1 text-sm font-medium text-brand-grey transition-colors hover:text-brand-blue"
            >
              Nos circuits
              <ChevronDown
                size={14}
                className={`transition-transform ${hoverMenu ? "rotate-180" : ""}`}
              />
            </Link>

            {hoverMenu && (
              <div className="absolute left-0 top-full z-50 min-w-[240px] pt-2">
                <div className="overflow-hidden rounded-xl border border-cream-dark bg-white py-2 shadow-lg">
                  {circuitMenuItems.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      className="block px-4 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-brand-blue/5 hover:text-brand-blue"
                    >
                      {item.label}
                    </Link>
                  ))}
                  <div className="mt-1 border-t border-cream-dark px-4 py-2">
                    <Link
                      href="/destinations"
                      className="text-xs font-semibold text-brand-red hover:underline"
                    >
                      Toutes les destinations →
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>

          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-brand-grey hover:text-brand-blue transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Button href="/contact" variant="primary" className="!py-2 !px-5 text-sm">
            Devis gratuit
          </Button>
        </nav>

        <button
          className="md:hidden p-2 text-ink"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <nav className="border-t border-cream-dark bg-white px-4 py-4 md:hidden">
          <button
            type="button"
            className="flex w-full items-center justify-between py-3 text-sm font-medium text-ink"
            onClick={() => setCircuitsOpen(!circuitsOpen)}
            aria-expanded={circuitsOpen}
          >
            Nos circuits
            <ChevronDown
              size={16}
              className={`transition-transform ${circuitsOpen ? "rotate-180" : ""}`}
            />
          </button>
          {circuitsOpen && (
            <div className="mb-2 ml-3 space-y-1 border-l-2 border-cream-dark pl-4">
              {circuitMenuItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="block py-2 text-sm text-muted hover:text-brand-blue"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/destinations"
                className="block py-2 text-sm font-semibold text-brand-red"
                onClick={() => setOpen(false)}
              >
                Toutes les destinations
              </Link>
            </div>
          )}

          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block py-3 text-sm font-medium text-ink"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Button href="/contact" variant="primary" className="mt-2 w-full">
            Devis gratuit
          </Button>
        </nav>
      )}
    </header>
  );
}
