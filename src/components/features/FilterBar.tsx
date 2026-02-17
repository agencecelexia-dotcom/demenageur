"use client";

import { cn } from "@/lib/utils";
import type { RealisationCategory } from "@/types";

interface FilterOption {
  value: "all" | RealisationCategory;
  label: string;
}

const filterOptions: FilterOption[] = [
  { value: "all", label: "Tous" },
  { value: "local", label: "Local Paris/IDF" },
  { value: "longue-distance", label: "Longue Distance" },
  { value: "international", label: "International" },
  { value: "entreprise", label: "Entreprise" },
  { value: "stockage", label: "Garde-Meuble" },
];

interface FilterBarProps {
  activeFilter: "all" | RealisationCategory;
  onFilterChange: (filter: "all" | RealisationCategory) => void;
}

export default function FilterBar({ activeFilter, onFilterChange }: FilterBarProps) {
  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {filterOptions.map((option) => (
        <button
          key={option.value}
          onClick={() => onFilterChange(option.value)}
          className={cn(
            "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
            activeFilter === option.value
              ? "bg-primary-800 text-white shadow-md"
              : "bg-white text-neutral-600 border border-neutral-200 hover:border-primary-300 hover:text-primary-800"
          )}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
