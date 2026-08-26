import { useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { GALLERY_ITEMS } from "../data/content";

const FILTERS = [
  { key: "all", label: "All" },
  { key: "clinic", label: "Clinic" },
  { key: "doctor", label: "Doctor" },
  { key: "facilities", label: "Facilities" },
];

export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [lightbox, setLightbox] = useState<number | null>(null);

  const filtered =
    activeFilter === "all"
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.category === activeFilter);

  function openLightbox(id: number) {
    setLightbox(id);
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    setLightbox(null);
    document.body.style.overflow = "";
  }

  function navigate(dir: 1 | -1) {
    if (lightbox === null) return;
    const idx = filtered.findIndex((i) => i.id === lightbox);
    const next = (idx + dir + filtered.length) % filtered.length;
    setLightbox(filtered[next].id);
  }

  const activeItem = lightbox !== null ? filtered.find((i) => i.id === lightbox) : null;

  return (
    <>
      {/* Page header */}
      <div className="pt-28 pb-16 px-6 lg:px-10 max-w-7xl mx-auto border-b border-border">
        <p className="eyebrow mb-4">Gallery</p>
        <h1 className="font-serif text-5xl lg:text-7xl text-ink">Gallery</h1>
      </div>

      {/* Filters */}
      <div className="py-8 px-6 lg:px-10 max-w-7xl mx-auto">
        <div className="flex gap-2 flex-wrap">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              onClick={() => setActiveFilter(f.key)}
              className={`px-5 py-2 text-xs tracking-[0.12em] uppercase transition-colors border ${
                activeFilter === f.key
                  ? "bg-primary text-surface border-primary"
                  : "border-border text-ink/60 hover:text-ink hover:border-ink/30"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 pb-24 lg:pb-36">
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-3 space-y-3">
          {filtered.map((item) => (
            <button
              key={item.id}
              onClick={() => openLightbox(item.id)}
              className="block w-full bg-ink/5 overflow-hidden group break-inside-avoid"
              aria-label={`View: ${item.alt}`}
            >
              <img
                src={item.src}
                alt={item.alt}
                loading="lazy"
                className="w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
            </button>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-muted text-sm">No images in this category yet.</p>
          </div>
        )}
      </div>

      {/* Lightbox */}
      {activeItem && (
        <div
          className="fixed inset-0 z-50 bg-ink/95 flex items-center justify-center"
          onClick={closeLightbox}
        >
          {/* Close */}
          <button
            onClick={closeLightbox}
            className="absolute top-5 right-5 text-surface/60 hover:text-surface transition-colors"
            aria-label="Close"
          >
            <X size={24} />
          </button>

          {/* Prev */}
          {filtered.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); navigate(-1); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-surface/60 hover:text-surface transition-colors p-3"
              aria-label="Previous"
            >
              <ChevronLeft size={28} />
            </button>
          )}

          {/* Image */}
          <div
            className="max-w-5xl max-h-[85vh] mx-16 flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={activeItem.src.replace(/w=\d+/, "w=1400")}
              alt={activeItem.alt}
              className="max-w-full max-h-[85vh] object-contain"
            />
          </div>

          {/* Next */}
          {filtered.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); navigate(1); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-surface/60 hover:text-surface transition-colors p-3"
              aria-label="Next"
            >
              <ChevronRight size={28} />
            </button>
          )}

          {/* Caption */}
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 text-surface/40 text-xs tracking-wide">
            {activeItem.alt}
          </div>
        </div>
      )}
    </>
  );
}
