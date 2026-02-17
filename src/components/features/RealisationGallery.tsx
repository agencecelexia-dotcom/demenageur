"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import RealisationCard from "./RealisationCard";
import FilterBar from "./FilterBar";
import { realisations } from "@/data/realisations";
import type { RealisationCategory } from "@/types";

export default function RealisationGallery() {
  const [activeFilter, setActiveFilter] = useState<"all" | RealisationCategory>("all");

  const filtered = activeFilter === "all"
    ? realisations
    : realisations.filter((r) => r.category === activeFilter);

  return (
    <div>
      {/* Filter */}
      <div className="mb-12">
        <FilterBar activeFilter={activeFilter} onFilterChange={setActiveFilter} />
      </div>

      {/* Grid */}
      <motion.div
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((realisation) => (
            <motion.div
              key={realisation.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <RealisationCard realisation={realisation} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filtered.length === 0 && (
        <div className="text-center py-20 text-neutral-500">
          <p>Aucune réalisation dans cette catégorie.</p>
        </div>
      )}
    </div>
  );
}
