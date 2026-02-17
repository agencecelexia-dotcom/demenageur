"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface FadeUpProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  once?: boolean;
}

export function FadeUp({
  children,
  delay = 0,
  className,
  once = true,
}: FadeUpProps) {
  return (
    <motion.div
      className={cn(className)}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      viewport={{ once, margin: "-60px" }}
    >
      {children}
    </motion.div>
  );
}

export default FadeUp;
