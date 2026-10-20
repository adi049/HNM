import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Logo } from "./Logo";
import { useUI } from "../context/UIContext";
import { cn } from "../utils/cn";

const NAV = [
  { to: "/destinations", label: "Destinations" },
  { to: "/hotels", label: "Hotels" },
  { to: "/experiences", label: "Experiences" },
  { to: "/offers", label: "Offers" },
  { to: "/contact", label: "Contact" },
];

export function Header() {
  const { openBooking } = useUI();
  const location = useLocation();
  const transparentStart = location.pathname === "/" || location.pathname === "/destinations";
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const solid = scrolled || !transparentStart || menuOpen;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-[70] transition-all duration-500",
        solid
          ? "bg-pearl/95 shadow-[0_1px_0_rgba(28,26,23,0.08)] backdrop-blur"
          : "bg-gradient-to-b from-charcoal/60 to-transparent"
      )}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 md:px-8">
        <Link to="/" aria-label="Hotel ND Manor — home" className="focus-visible:outline-2 focus-visible:outline-gold">
          <Logo tone={solid ? "dark" : "light"} compact />
        </Link>

        {/* Desktop nav */}
        <nav aria-label="Primary" className="hidden items-center gap-8 lg:flex">
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  "text-[0.72rem] font-medium uppercase tracking-[0.24em] transition-colors duration-300",
                  solid
                    ? isActive
                      ? "text-gold-dark"
                      : "text-charcoal hover:text-gold-dark"
                    : isActive
                      ? "text-gold"
                      : "text-ivory/90 hover:text-gold"
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
          <button
            type="button"
            onClick={openBooking}
            className={cn(
              "border px-6 py-2.5 text-[0.72rem] font-medium uppercase tracking-[0.24em] transition-all duration-300 focus-visible:outline-2 focus-visible:outline-gold",
              solid
                ? "border-charcoal bg-charcoal text-ivory hover:bg-gold hover:border-gold hover:text-charcoal"
                : "border-ivory/70 text-ivory hover:bg-ivory hover:text-charcoal"
            )}
          >
            Book a Stay
          </button>
        </nav>

        {/* Mobile controls */}
        <div className="flex items-center gap-3 lg:hidden">
          <button
            type="button"
            onClick={openBooking}
            className={cn(
              "min-h-11 border px-4 text-[0.66rem] font-medium uppercase tracking-[0.2em] transition-colors",
              solid
                ? "border-charcoal bg-charcoal text-ivory"
                : "border-ivory/70 text-ivory"
            )}
          >
            Book
          </button>
          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
            className={cn(
              "flex h-11 w-11 flex-col items-center justify-center gap-[5px] focus-visible:outline-2 focus-visible:outline-gold",
              solid ? "text-charcoal" : "text-ivory"
            )}
          >
            <span
              className={cn(
                "h-px w-6 bg-current transition-transform duration-300",
                menuOpen && "translate-y-[3px] rotate-45"
              )}
            />
            <span
              className={cn(
                "h-px w-6 bg-current transition-opacity duration-300",
                menuOpen && "opacity-0"
              )}
            />
            <span
              className={cn(
                "h-px w-6 bg-current transition-transform duration-300",
                menuOpen && "-translate-y-[7px] -rotate-45"
              )}
            />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          "overflow-hidden bg-pearl transition-[max-height] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] lg:hidden",
          menuOpen ? "max-h-96 border-t border-charcoal/10" : "max-h-0"
        )}
      >
        <nav aria-label="Mobile" className="flex flex-col px-6 py-4">
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  "border-b border-charcoal/8 py-3.5 text-sm uppercase tracking-[0.22em]",
                  isActive ? "text-gold-dark" : "text-charcoal"
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
          <button
            type="button"
            onClick={() => {
              setMenuOpen(false);
              openBooking();
            }}
            className="mt-4 mb-2 border border-charcoal bg-charcoal px-6 py-3 text-xs font-medium uppercase tracking-[0.26em] text-ivory"
          >
            Book a Stay
          </button>
        </nav>
      </div>
    </header>
  );
}
