"use client";

import { useState } from "react";
import { X, ZoomIn, Upload } from "lucide-react";
import Image from "next/image";

interface PhotoItem {
  path: string;
  filename: string;
  usage: string;
}

interface PhotoGroup {
  label: string;
  photos: PhotoItem[];
}

const PHOTO_GROUPS: PhotoGroup[] = [
  {
    label: "Hero & Bannières",
    photos: [
      {
        path: "/images/hero-main.jpeg",
        filename: "hero-main.jpeg",
        usage: "Utilisée sur : Accueil (hero), bannière principale",
      },
      {
        path: "/images/hero-about.png",
        filename: "hero-about.png",
        usage: "Bannière page À propos",
      },
      {
        path: "/images/cta-bg.png",
        filename: "cta-bg.png",
        usage: "Fond des sections CTA (appel à l'action)",
      },
    ],
  },
  {
    label: "Équipe",
    photos: [
      {
        path: "/images/about-team.png",
        filename: "about-team.png",
        usage: "Photo équipe — page À propos",
      },
      {
        path: "/images/team/laurent-mercier.png",
        filename: "team/laurent-mercier.png",
        usage: "Portrait membre équipe",
      },
      {
        path: "/images/team/sophie-blanchard.png",
        filename: "team/sophie-blanchard.png",
        usage: "Portrait membre équipe",
      },
      {
        path: "/images/team/karim-ait-ahmed.png",
        filename: "team/karim-ait-ahmed.png",
        usage: "Portrait membre équipe",
      },
      {
        path: "/images/team/emilie-fontaine.png",
        filename: "team/emilie-fontaine.png",
        usage: "Portrait membre équipe",
      },
    ],
  },
  {
    label: "Services",
    photos: [
      {
        path: "/images/services/demenagement-residentiel.png",
        filename: "services/demenagement-residentiel.png",
        usage: "Image service — Déménagement résidentiel",
      },
      {
        path: "/images/services/demenagement-entreprise.png",
        filename: "services/demenagement-entreprise.png",
        usage: "Image service — Déménagement entreprise",
      },
      {
        path: "/images/services/demenagement-longue-distance.jpeg",
        filename: "services/demenagement-longue-distance.jpeg",
        usage: "Image service — Longue distance",
      },
      {
        path: "/images/services/demenagement-international.jpeg",
        filename: "services/demenagement-international.jpeg",
        usage: "Image service — International",
      },
      {
        path: "/images/services/emballage-manutention.png",
        filename: "services/emballage-manutention.png",
        usage: "Image service — Emballage & manutention",
      },
      {
        path: "/images/services/garde-meuble-stockage.png",
        filename: "services/garde-meuble-stockage.png",
        usage: "Image service — Garde-meubles & stockage",
      },
    ],
  },
  {
    label: "Réalisations",
    photos: [
      {
        path: "/images/realisations/appartement-haussmannien.png",
        filename: "realisations/appartement-haussmannien.png",
        usage: "Photo réalisation — Appartement haussmannien",
      },
      {
        path: "/images/realisations/cabinet-architectes.png",
        filename: "realisations/cabinet-architectes.png",
        usage: "Photo réalisation — Cabinet d'architectes",
      },
      {
        path: "/images/realisations/demenagement-canada.png",
        filename: "realisations/demenagement-canada.png",
        usage: "Photo réalisation — Déménagement international",
      },
      {
        path: "/images/realisations/techflow-startup.png",
        filename: "realisations/techflow-startup.png",
        usage: "Photo réalisation — Startup / événementiel",
      },
      {
        path: "/images/realisations/famille-rousseau.png",
        filename: "realisations/famille-rousseau.png",
        usage: "Photo réalisation — Famille / distribution",
      },
      {
        path: "/images/realisations/collection-bernard.png",
        filename: "realisations/collection-bernard.png",
        usage: "Photo réalisation — Transport exceptionnel",
      },
    ],
  },
  {
    label: "Blog",
    photos: [
      {
        path: "/images/blog/checklist-demenagement.png",
        filename: "blog/checklist-demenagement.png",
        usage: "Image featured — Article checklist",
      },
      {
        path: "/images/blog/demenagement-entreprise.jpeg",
        filename: "blog/demenagement-entreprise.jpeg",
        usage: "Image featured — Article entreprise",
      },
      {
        path: "/images/blog/demenagement-international.png",
        filename: "blog/demenagement-international.png",
        usage: "Image featured — Article international",
      },
      {
        path: "/images/blog/demenagement-paris.png",
        filename: "blog/demenagement-paris.png",
        usage: "Image featured — Article ville",
      },
      {
        path: "/images/blog/emballage-fragiles.png",
        filename: "blog/emballage-fragiles.png",
        usage: "Image featured — Article emballage",
      },
      {
        path: "/images/blog/garde-meuble.png",
        filename: "blog/garde-meuble.png",
        usage: "Image featured — Article garde-meubles",
      },
    ],
  },
  {
    label: "Autres",
    photos: [
      {
        path: "/images/og-image.png",
        filename: "og-image.png",
        usage: "Image Open Graph — partage réseaux sociaux",
      },
    ],
  },
];

export default function PhotosTab() {
  const [preview, setPreview] = useState<PhotoItem | null>(null);

  function handleReplace(photo: PhotoItem) {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = () => {
      // In a real implementation, this would upload the file
      alert(`Upload pour remplacer ${photo.filename} — fonctionnalité serveur requise.`);
    };
    input.click();
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-heading text-3xl font-bold text-neutral-900">Bibliothèque photos</h1>
        <p className="mt-1 text-neutral-500">Toutes les photos utilisées sur le site</p>
      </div>

      {/* Groups */}
      {PHOTO_GROUPS.map((group) => (
        <div key={group.label} className="rounded-xl border border-neutral-200 bg-white shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-neutral-100">
            <h2 className="font-heading text-base font-semibold text-neutral-900">{group.label}</h2>
            <p className="text-xs text-neutral-500 mt-0.5">{group.photos.length} photo{group.photos.length > 1 ? "s" : ""}</p>
          </div>
          <div className="p-4 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {group.photos.map((photo) => (
              <div
                key={photo.path}
                className="group relative rounded-lg border border-neutral-200 bg-neutral-50 overflow-hidden"
              >
                {/* Image */}
                <div
                  className="relative aspect-video bg-neutral-100 cursor-pointer"
                  onClick={() => setPreview(photo)}
                >
                  <Image
                    src={photo.path}
                    alt={photo.filename}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).style.display = "none";
                    }}
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/30 transition-colors">
                    <ZoomIn size={20} className="text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
                {/* Info + Replace */}
                <div className="p-2.5">
                  <p className="text-xs font-mono text-neutral-600 truncate">{photo.filename}</p>
                  <p className="mt-0.5 text-xs text-neutral-400 line-clamp-2">{photo.usage}</p>
                  <button
                    onClick={() => handleReplace(photo)}
                    className="mt-2 flex w-full items-center justify-center gap-1.5 rounded-md border border-neutral-200 px-2 py-1.5 text-xs font-medium text-neutral-600 hover:bg-neutral-100 transition-colors"
                  >
                    <Upload size={12} />
                    Remplacer
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Preview Modal */}
      {preview && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80"
          onClick={() => setPreview(null)}
        >
          <div
            className="relative max-w-4xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setPreview(null)}
              className="absolute -top-10 right-0 flex items-center gap-1.5 text-sm text-white/70 hover:text-white"
            >
              <X size={16} />
              Fermer
            </button>
            <div className="relative rounded-xl overflow-hidden bg-neutral-900">
              <div className="relative aspect-video w-full">
                <Image
                  src={preview.path}
                  alt={preview.filename}
                  fill
                  sizes="(max-width: 896px) 100vw, 896px"
                  className="object-contain"
                />
              </div>
            </div>
            <div className="mt-3 rounded-lg bg-white/10 px-4 py-3 backdrop-blur-sm">
              <p className="text-sm font-mono text-white/90">{preview.path}</p>
              <p className="mt-0.5 text-xs text-white/60">{preview.usage}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
