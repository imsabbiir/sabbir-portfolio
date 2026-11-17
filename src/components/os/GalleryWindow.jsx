"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { portfolioData } from "@/data/portfolioData";
import {
  Images,
  MapPin,
  Camera,
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  ZoomIn,
  ZoomOut,
  Info,
  User,
  Compass,
  Gamepad2,
  Monitor,
} from "lucide-react";

export default function GalleryWindow() {
  const { gallery = [] } = portfolioData;
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activePhotoIndex, setActivePhotoIndex] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [imageErrors, setImageErrors] = useState({});

  const categories = [
    "All",
    "My Photos",
    "Traveling",
    "Gaming",
    "Workstation",
  ];

  const filteredPhotos =
    selectedCategory === "All"
      ? gallery
      : gallery.filter((p) => p.category === selectedCategory);

  const openLightbox = (idx) => {
    setActivePhotoIndex(idx);
    setZoomLevel(1);
  };

  const closeLightbox = () => {
    setActivePhotoIndex(null);
    setZoomLevel(1);
  };

  const nextPhoto = useCallback(
    (e) => {
      e?.stopPropagation();
      if (activePhotoIndex !== null && filteredPhotos.length > 0) {
        setActivePhotoIndex((prev) => (prev + 1) % filteredPhotos.length);
        setZoomLevel(1);
      }
    },
    [activePhotoIndex, filteredPhotos.length]
  );

  const prevPhoto = useCallback(
    (e) => {
      e?.stopPropagation();
      if (activePhotoIndex !== null && filteredPhotos.length > 0) {
        setActivePhotoIndex(
          (prev) => (prev - 1 + filteredPhotos.length) % filteredPhotos.length
        );
        setZoomLevel(1);
      }
    },
    [activePhotoIndex, filteredPhotos.length]
  );

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (activePhotoIndex === null) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") nextPhoto();
      if (e.key === "ArrowLeft") prevPhoto();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activePhotoIndex, nextPhoto, prevPhoto]);

  const activePhoto =
    activePhotoIndex !== null ? filteredPhotos[activePhotoIndex] : null;

  const handleImageError = (id) => {
    setImageErrors((prev) => ({ ...prev, [id]: true }));
  };

  const getCategoryIcon = (cat) => {
    if (cat === "My Photos") return <User size={12} className="text-purple-400" />;
    if (cat === "Traveling") return <Compass size={12} className="text-blue-400" />;
    if (cat === "Gaming") return <Gamepad2 size={12} className="text-emerald-400" />;
    if (cat === "Workstation") return <Monitor size={12} className="text-amber-400" />;
    return null;
  };

  return (
    <div className="text-slate-800 dark:text-slate-100 font-sans pb-8 select-text">
      {/* Gallery Header Bar */}
      <div className="space-y-3 pb-4 mb-5 border-b border-black/10 dark:border-white/10">
        {/* Title & Description on the Left */}
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-600 dark:text-purple-400 shrink-0 mt-0.5">
            <Images size={20} />
          </div>
          <div>
            <div className="flex items-center flex-wrap gap-2">
              <h2 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">
                Photos & Visual Gallery
              </h2>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 font-semibold border border-purple-500/20">
                {filteredPhotos.length} Items
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">
              Personal portraits, travel snapshots, gaming battlestations & creative workspaces.
            </p>
          </div>
        </div>

        {/* Category Pills on the Left (Responsive flex-wrap, never scrolls outside view) */}
        <div className="flex flex-wrap items-center gap-2 pt-0.5">
          {categories.map((cat) => {
            const count =
              cat === "All"
                ? gallery.length
                : gallery.filter((p) => p.category === cat).length;

            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition cursor-pointer select-none ${
                  selectedCategory === cat
                    ? "bg-purple-600 text-white shadow-xs font-semibold ring-2 ring-purple-500/30"
                    : "bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-slate-600 dark:text-slate-300 border border-black/5 dark:border-white/5"
                }`}
              >
                {getCategoryIcon(cat)}
                <span>{cat}</span>
                <span
                  className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                    selectedCategory === cat
                      ? "bg-white/20 text-white"
                      : "bg-black/10 dark:bg-white/10 text-slate-500 dark:text-slate-400"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Photo Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredPhotos.map((photo, idx) => (
          <div
            key={photo.id}
            onClick={() => openLightbox(idx)}
            className="group relative rounded-2xl overflow-hidden border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 cursor-pointer shadow-xs hover:shadow-xl hover:border-purple-400/50 transition-all duration-300"
          >
            {/* Image Container */}
            <div className="relative aspect-4/3 w-full overflow-hidden bg-slate-900">
              <Image
                src={
                  imageErrors[photo.id]
                    ? "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=85"
                    : photo.image
                }
                alt={photo.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover group-hover:scale-108 transition-transform duration-500"
                onError={() => handleImageError(photo.id)}
              />

              {/* Gradient Overlay on Hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-3.5" />

              {/* Hover Top Badges */}
              <div className="absolute top-2.5 right-2.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-1.5 z-10">
                <span className="w-8 h-8 rounded-full bg-black/60 backdrop-blur-md text-white flex items-center justify-center hover:bg-black/90 transition shadow-md">
                  <Maximize2 size={13} />
                </span>
              </div>

              {/* Category Pill on Card */}
              <div className="absolute top-2.5 left-2.5 z-10">
                <span className="text-[10px] font-medium font-mono px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-md text-purple-300 border border-white/10">
                  {photo.category}
                </span>
              </div>

              {/* Hover Bottom Info */}
              <div className="absolute bottom-2.5 left-2.5 right-2.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white z-10">
                <h3 className="font-bold text-xs sm:text-sm text-white line-clamp-1">
                  {photo.title}
                </h3>
                <div className="flex items-center gap-2 text-[10px] text-slate-300 mt-1">
                  <span className="flex items-center gap-1 truncate">
                    <MapPin size={10} className="text-rose-400 shrink-0" />
                    <span className="truncate">{photo.location}</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Static Card Caption (Always visible below) */}
            <div className="p-3 bg-white/70 dark:bg-slate-900/80 backdrop-blur-xs flex items-center justify-between border-t border-black/5 dark:border-white/5 text-xs">
              <div className="truncate pr-2">
                <p className="font-semibold text-slate-800 dark:text-slate-100 text-xs truncate">
                  {photo.title}
                </p>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate flex items-center gap-1 mt-0.5">
                  <Camera size={10} className="text-purple-400 shrink-0" />
                  <span className="truncate">{photo.camera}</span>
                </p>
              </div>
              <span className="text-[10px] font-mono text-slate-400 shrink-0">
                {photo.date}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* LIGHTBOX MODAL */}
      {activePhoto && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col justify-between p-4 sm:p-6 select-none animate-fadeIn"
          onClick={closeLightbox}
        >
          {/* Lightbox Top Header */}
          <div
            className="flex items-center justify-between text-white z-10 max-w-5xl mx-auto w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3">
              <span className="px-2.5 py-1 rounded-full bg-white/10 text-purple-300 text-xs font-mono">
                {activePhotoIndex + 1} / {filteredPhotos.length}
              </span>
              <div>
                <h3 className="font-bold text-sm text-white line-clamp-1">
                  {activePhoto.title}
                </h3>
                <p className="text-xs text-slate-400 flex items-center gap-2 mt-0.5">
                  <span className="text-purple-300">{activePhoto.category}</span>
                  <span>•</span>
                  <span>{activePhoto.location}</span>
                  <span>•</span>
                  <span>{activePhoto.date}</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setZoomLevel((z) => Math.min(z + 0.3, 2.5))}
                className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition cursor-pointer"
                title="Zoom In"
              >
                <ZoomIn size={16} />
              </button>
              <button
                type="button"
                onClick={() => setZoomLevel((z) => Math.max(z - 0.3, 0.7))}
                className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition cursor-pointer"
                title="Zoom Out"
              >
                <ZoomOut size={16} />
              </button>
              <button
                type="button"
                onClick={closeLightbox}
                className="w-8 h-8 rounded-lg bg-rose-500/80 hover:bg-rose-600 text-white flex items-center justify-center transition cursor-pointer ml-1"
                title="Close Lightbox (Esc)"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Lightbox Center Image View */}
          <div
            className="relative flex-1 w-full max-h-[72vh] my-4 flex items-center justify-center overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Prev Button */}
            <button
              type="button"
              onClick={prevPhoto}
              className="absolute left-2 sm:left-6 z-20 w-11 h-11 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center border border-white/20 backdrop-blur-sm transition cursor-pointer shadow-lg"
              title="Previous Photo (Left Arrow)"
            >
              <ChevronLeft size={22} />
            </button>

            {/* Image */}
            <div
              className="relative w-full h-full max-w-4xl rounded-2xl overflow-hidden shadow-2xl transition-transform duration-200"
              style={{ transform: `scale(${zoomLevel})` }}
            >
              <Image
                src={
                  imageErrors[activePhoto.id]
                    ? "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=85"
                    : activePhoto.image
                }
                alt={activePhoto.title}
                fill
                priority
                className="object-contain"
                sizes="(max-width: 1200px) 100vw, 1200px"
                onError={() => handleImageError(activePhoto.id)}
              />
            </div>

            {/* Next Button */}
            <button
              type="button"
              onClick={nextPhoto}
              className="absolute right-2 sm:right-6 z-20 w-11 h-11 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center border border-white/20 backdrop-blur-sm transition cursor-pointer shadow-lg"
              title="Next Photo (Right Arrow)"
            >
              <ChevronRight size={22} />
            </button>
          </div>

          {/* Lightbox Bottom Details Bar */}
          <div
            className="max-w-3xl mx-auto w-full p-3.5 rounded-xl bg-black/70 backdrop-blur-md border border-white/10 text-white text-xs flex flex-col sm:flex-row items-center justify-between gap-2 z-10"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-2 text-slate-300">
              <Info size={14} className="text-purple-400 shrink-0" />
              <p className="line-clamp-2">{activePhoto.description}</p>
            </div>
            <div className="flex items-center gap-3 shrink-0 text-[11px] text-slate-400 font-mono">
              <span className="flex items-center gap-1">
                <Camera size={12} className="text-purple-400" />
                <span>{activePhoto.camera}</span>
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
