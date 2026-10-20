"use client";

import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface MobileBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

export function MobileBottomSheet({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
}: MobileBottomSheetProps) {
  const sheetRef = useRef<HTMLDivElement>(null);

  // Lock background scroll when open & handle Escape key
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") onClose();
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = "";
        window.removeEventListener("keydown", handleKeyDown);
      };
    } else {
      document.body.style.overflow = "";
    }
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center">
          {/* Dimmed Blurred Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-xs"
            aria-hidden="true"
          />

          {/* iOS-Inspired Bottom Sheet Container */}
          <motion.div
            ref={sheetRef}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{
              type: "spring",
              damping: 28,
              stiffness: 280,
            }}
            className="relative w-full max-w-lg bg-card border-t border-border rounded-t-[28px] shadow-2xl overflow-hidden flex flex-col max-h-[85vh] z-10"
            role="dialog"
            aria-modal="true"
            aria-labelledby="sheet-title"
          >
            {/* Grabber Handle Pill */}
            <div className="pt-3 pb-1 flex justify-center">
              <div className="w-10 h-1.5 rounded-full bg-muted-foreground/30" />
            </div>

            {/* Sheet Header */}
            <div className="px-5 py-3 border-b border-border/60 flex items-center justify-between gap-3">
              <div>
                <h3
                  id="sheet-title"
                  className="text-base font-bold text-heading leading-tight"
                >
                  {title}
                </h3>
                {subtitle && (
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {subtitle}
                  </p>
                )}
              </div>

              <button
                onClick={onClose}
                className="p-2 rounded-full bg-muted/60 text-muted-foreground hover:text-heading touch-target flex items-center justify-center transition-colors"
                aria-label="Close bottom sheet"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Scrollable Sheet Content */}
            <div className="flex-1 overflow-y-auto p-5 safe-bottom space-y-4">
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
