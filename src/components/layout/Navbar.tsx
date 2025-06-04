
"use client";

import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Button } from "@/components/ui/button";
import { APP_NAME, NAV_LINKS, LOGO_PATH } from "@/lib/data";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Call once on mount to set initial state
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  const linkVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.3,
      },
    }),
  };

  const mobileMenuVariants = {
    closed: { opacity: 0, y: "-100%" },
    open: { opacity: 1, y: "0%" },
  };

  return (
    <motion.nav
      initial={false}
      animate={{
        backgroundColor: isScrolled ? "hsl(var(--card) / 0.8)" : "hsl(var(--background) / 0.5)",
        backdropFilter: isScrolled ? "blur(8px)" : "none",
        boxShadow: isScrolled ? "0 2px 10px hsl(var(--foreground) / 0.1)" : "none",
      }}
      transition={{ duration: 0.3 }}
      className="fixed top-0 left-0 right-0 z-50 w-full"
    >
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
        <Link href="#home" className="flex items-center space-x-2 text-2xl font-bold font-headline text-primary">
          <Image
            src={LOGO_PATH}
            alt={`${APP_NAME} Logo`}
            width={48} 
            height={48} 
            className="h-12 w-12 rounded-md" 
            data-ai-hint="website logo"
            priority
          />
          <span>{APP_NAME}</span>
        </Link>

        <div className="hidden items-center space-x-2 md:flex">
          {NAV_LINKS.map((link, index) => (
            <motion.div
              key={link.name}
              custom={index}
              initial="hidden"
              animate="visible"
              variants={linkVariants}
              whileHover={{ scale: 1.05, color: "hsl(var(--primary))" }}
              whileTap={{ scale: 0.95 }}
            >
              <Button variant="link" asChild>
                <Link href={link.href} className="text-foreground hover:text-primary transition-colors duration-300 ease-in-out px-3 py-2 text-sm">
                  {link.name}
                </Link>
              </Button>
            </motion.div>
          ))}
          <ThemeToggle />
        </div>

        <div className="md:hidden">
          <Button variant="ghost" size="icon" onClick={toggleMenu} aria-label="Toggle menu">
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={mobileMenuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="absolute top-20 left-0 right-0 bg-card shadow-lg md:hidden"
          >
            <div className="flex flex-col items-center space-y-4 p-6">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-lg text-foreground hover:text-primary transition-colors duration-300 ease-in-out"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <ThemeToggle />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
