"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export interface NavbarProps {
  /** Brand or personal name (defaults to "Armand") */
  brandName?: string;
  /** Contact email */
  briefEmail?: string;
  /** GitHub profile or portfolio link */
  githubUrl?: string;
  /** Calendly or booking link */
  calendlyUrl?: string;
  /** Whether the navbar is fixed at the top */
  fixed?: boolean;
}

export default function Navbar({
  brandName = "Armand",
  briefEmail = "armandbenjamin30@gmail.com",
  githubUrl = "https://github.com",
  calendlyUrl = "https://calendly.com",
  fixed = true,
}: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [lang, setLang] = useState<"esp" | "eng">("esp");
  const [showBriefModal, setShowBriefModal] = useState(false);
  const [showSoonToast, setShowSoonToast] = useState(false);

  // Close menu on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        setShowBriefModal(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Lock body scroll when overlay is open
  useEffect(() => {
    if (menuOpen || showBriefModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen, showBriefModal]);

  const toggleLanguage = () => {
    setLang((prev) => (prev === "esp" ? "eng" : "esp"));
    setShowSoonToast(true);
    setTimeout(() => setShowSoonToast(false), 3200);
  };

  return (
    <div className="font-sans">
      {/* Main Topbar */}
      <header
        className={`w-full z-40 transition-all duration-300 ${
          fixed ? "fixed top-0 left-0" : "relative"
        } px-4 sm:px-6 md:px-8 py-4 md:py-6 pointer-events-none`}
      >
        <div className="max-w-[1800px] mx-auto flex items-center justify-between relative h-[38px]">
          {/* Left: Logo from /public/logo.svg + Portfolio Name */}
          <Link
            href="/"
            aria-label={`${brandName} — Portfolio`}
            className="group flex items-center gap-2.5 pointer-events-auto select-none"
          >
            {/* Logo Image from public folder (no shadow) */}
            <div className="relative h-[34px] w-[30px] flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3">
              <Image
                src="/logo.svg"
                alt={`${brandName} Logo`}
                width={34}
                height={38}
                priority
                unoptimized
                className="h-[34px] w-auto max-w-[34px] object-contain"
              />
            </div>

            {/* Wordmark using the exact font and tracking as the page heading */}
            <div className="flex flex-col">
              <span className="text-[20px] md:text-[22px] font-semibold tracking-tight text-black dark:text-zinc-50 leading-none">
                {brandName}
              </span>
              <span className="text-[10px] font-medium tracking-tight uppercase text-zinc-500 leading-tight">
                Portfolio
              </span>
            </div>
          </Link>

          {/* Center: "MENU : :" Pill Button (no shadow) */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 pointer-events-auto">
            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-expanded={menuOpen}
              aria-controls="main-menu-drawer"
              className="h-[38px] px-[16px] bg-[#FBFBFB] hover:bg-white text-black dark:text-zinc-900 rounded-full inline-flex items-center justify-center gap-[6px] transition-all duration-200 cursor-pointer active:scale-95"
            >
              <span className="text-[13px] md:text-[14px] font-semibold tracking-tight uppercase leading-none">
                {menuOpen ? "Close" : "Menu"}
              </span>

              {/* 2x2 Dots grid (::) */}
              <div className="flex items-center gap-[2.5px] h-[11.5px] w-[11px] justify-center">
                <svg
                  viewBox="0 0 4.3 11.5"
                  className="h-[11px] w-[4.3px] fill-current"
                >
                  <circle cx="2.15" cy="2.15" r="2.15" />
                  <circle cx="2.15" cy="9.35" r="2.15" />
                </svg>
                <svg
                  viewBox="0 0 4.3 11.5"
                  className="h-[11px] w-[4.3px] fill-current"
                >
                  <circle cx="2.15" cy="2.15" r="2.15" />
                  <circle cx="2.15" cy="9.35" r="2.15" />
                </svg>
              </div>
            </button>
          </div>

          {/* Right: Language switch + "SHARE A BRIEF" (no shadows) */}
          <nav
            aria-label="Language and contact"
            className="flex items-center gap-1 sm:gap-1.5 pointer-events-auto ml-auto"
          >
            {/* Language Pill (ESP / ENG) */}
            <button
              type="button"
              onClick={toggleLanguage}
              className="h-[38px] px-3.5 bg-[#FBFBFB] hover:bg-white text-black dark:text-zinc-900 rounded-full inline-flex items-center justify-center text-[13px] md:text-[14px] font-semibold tracking-tight uppercase transition-all duration-200 cursor-pointer active:scale-95"
              aria-label="Switch language"
            >
              {lang}
            </button>

            {/* "SHARE A BRIEF" Acid Lime Pill -> Hover Hot Pink (no shadow) */}
            <button
              type="button"
              onClick={() => setShowBriefModal(true)}
              className="h-[38px] px-5 bg-[#D5FF69] hover:bg-[#FF5490] text-black rounded-full inline-flex items-center justify-center text-[13px] md:text-[14px] font-semibold tracking-tight uppercase transition-colors duration-200 cursor-pointer active:scale-95"
            >
              Share a brief
            </button>
          </nav>
        </div>
      </header>

      {/* Language Notification Toast */}
      {showSoonToast && (
        <div className="fixed top-20 right-6 z-50 bg-black text-white text-xs md:text-sm font-medium tracking-tight px-4 py-2.5 rounded-full border border-white/10 animate-fade-in flex items-center gap-2">
          <span>
            {lang === "esp"
              ? "🇪🇸 Versión en español disponible pronto."
              : "🇬🇧 Switched to English."}
          </span>
        </div>
      )}

      {/* Fullscreen Overlay Drawer Menu */}
      <div
        id="main-menu-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Portfolio navigation menu"
        className={`fixed inset-0 z-50 transition-opacity duration-300 ${
          menuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div
          onClick={() => setMenuOpen(false)}
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        />

        {/* Sliding Menu Panel */}
        <div
          className={`absolute top-0 right-0 w-full sm:w-[480px] md:w-[560px] h-full bg-[#DADADA] text-black flex flex-col justify-between p-6 sm:p-10 transition-transform duration-500 ease-out ${
            menuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Header inside drawer */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Image
                src="/logo.svg"
                alt={brandName}
                width={28}
                height={32}
                unoptimized
                className="h-[28px] w-auto object-contain"
              />
              <span className="text-xl font-semibold tracking-tight text-black">
                {brandName}
              </span>
            </div>
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              className="h-[38px] px-4 bg-[#FBFBFB] hover:bg-white text-black rounded-full inline-flex items-center gap-2 text-xs font-semibold tracking-tight uppercase transition-all cursor-pointer active:scale-95"
            >
              <span>Close</span>
              <div className="flex items-center gap-0.5">
                <div className="w-1.5 h-1.5 rounded-full bg-black" />
                <div className="w-1.5 h-1.5 rounded-full bg-black" />
              </div>
            </button>
          </div>

          {/* Primary Portfolio Navigation Links */}
          <nav className="flex flex-col gap-3 sm:gap-4 my-auto py-8">
            {[
              { label: "Hero section", href: "#hero" },
              { label: "Project section", href: "#projects" },
              { label: "Who am i", href: "#about" },
              { label: "Stack & Skills", href: "#skills" },
            ].map((item, index) => (
              <a
                key={index}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-black hover:text-[#FF5490] transition-colors leading-tight group flex items-center justify-between"
              >
                <span>{item.label}</span>
                <span className="text-lg opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:translate-x-1">
                  ↗
                </span>
              </a>
            ))}

            {/* Book a Call Accent Link (no shadow) */}
            <a
              href={calendlyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center justify-between px-6 py-4 bg-[#D5FF69] hover:bg-[#FF5490] text-black rounded-full text-lg sm:text-xl font-semibold tracking-tight uppercase transition-colors"
            >
              <span>Book a call</span>
              <span>↗</span>
            </a>
          </nav>

          {/* Menu Drawer Footer */}
          <div className="border-t border-black/15 pt-6 flex flex-col gap-4 text-xs sm:text-sm font-medium tracking-tight">
            <div className="flex items-center justify-between">
              <span className="text-zinc-600">Contact</span>
              <a
                href={`mailto:${briefEmail}`}
                className="hover:underline text-black font-semibold"
              >
                {briefEmail}
              </a>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-zinc-600">Socials</span>
              <div className="flex gap-4">
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline font-semibold"
                >
                  GitHub
                </a>
                <a
                  href={calendlyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline font-semibold"
                >
                  Calendly
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Share a Brief Inquiry Modal */}
      {showBriefModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
        >
          {/* Backdrop */}
          <div
            onClick={() => setShowBriefModal(false)}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Content Card */}
          <div className="relative bg-[#FBFBFB] w-full max-w-lg rounded-3xl p-6 sm:p-8 border border-black/5 z-10 animate-scale-up">
            <div className="flex items-center justify-between mb-6">
              <div>
                <span className="text-xs font-semibold uppercase tracking-tight text-[#FF5490] block mb-1">
                  Let's collaborate
                </span>
                <h2 className="text-2xl sm:text-3xl font-semibold text-black tracking-tight">
                  Share a Brief
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setShowBriefModal(false)}
                className="w-9 h-9 rounded-full bg-zinc-200 hover:bg-zinc-300 flex items-center justify-center text-sm font-semibold text-black transition-colors"
                aria-label="Close dialog"
              >
                ✕
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                window.location.href = `mailto:${briefEmail}?subject=Project%20Brief%20for%20Armand`;
                setShowBriefModal(false);
              }}
              className="flex flex-col gap-4 text-sm font-medium tracking-tight"
            >
              <div>
                <label className="block text-xs font-semibold uppercase tracking-tight text-zinc-600 mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sarah"
                  className="w-full px-4 py-3 rounded-2xl bg-zinc-100 border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-tight text-zinc-600 mb-1">
                  Your Email
                </label>
                <input
                  type="email"
                  required
                  placeholder="sarah@company.com"
                  className="w-full px-4 py-3 rounded-2xl bg-zinc-100 border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-tight text-zinc-600 mb-1">
                  Project Details
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Tell me about your project goals, scope, and timeline..."
                  className="w-full px-4 py-3 rounded-2xl bg-zinc-100 border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>

              <div className="flex items-center gap-3 mt-3">
                <button
                  type="submit"
                  className="flex-1 py-3.5 bg-[#D5FF69] hover:bg-[#FF5490] text-black rounded-full font-semibold text-sm uppercase tracking-tight transition-colors cursor-pointer"
                >
                  Send Brief
                </button>
                <a
                  href={`mailto:${briefEmail}?subject=Direct%20Inquiry%20for%20Armand`}
                  className="py-3.5 px-5 bg-zinc-200 hover:bg-zinc-300 text-black rounded-full font-semibold text-xs uppercase tracking-tight transition-colors"
                >
                  Email directly
                </a>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
