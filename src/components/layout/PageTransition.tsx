"use client";

import React, { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const prevPathRef = useRef<string>(pathname);
  const [isNavigating, setIsNavigating] = useState(false);

  useEffect(() => {
    if (prevPathRef.current !== pathname) {
      prevPathRef.current = pathname;
      setIsNavigating(true);
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      const timer = setTimeout(() => setIsNavigating(false), 380);
      return () => clearTimeout(timer);
    }
  }, [pathname]);

  return (
    <>
      {/* Sleek Floating Route Progress Line */}
      {isNavigating && (
        <div className="fixed top-0 left-0 right-0 h-[2.5px] z-[9999] pointer-events-none overflow-hidden bg-transparent">
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "0%" }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="w-full h-full bg-gradient-to-r from-primary via-accent to-primary shadow-sm"
          />
        </div>
      )}

      {/* Fluid Floating Page Transition */}
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={pathname}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{
            duration: 0.28,
            ease: [0.22, 1, 0.36, 1], // Smooth cubic-bezier for floating feel
          }}
          className="w-full flex-1 min-h-[calc(100vh-72px)]"
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </>
  );
}
