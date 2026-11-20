"use client";

import { useState } from "react";
import Modal from "@/components/Modal";
import { VIDEOS, YOUTUBE_CHANNEL_URL, type Video } from "@/lib/videos";

/** Still frame for a video: YouTube's own thumbnail, or the file's first frame. */
function Thumbnail({ video }: { video: Video }) {
  if (video.source.kind === "youtube") {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={`https://i.ytimg.com/vi/${video.source.id}/maxresdefault.jpg`}
        alt=""
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        loading="lazy"
      />
    );
  }
  return (
    <video
      src={`${video.source.src}#t=0.1`}
      className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
      muted
      playsInline
      preload="metadata"
      aria-hidden="true"
      tabIndex={-1}
    />
  );
}

/** The 16:9 frame with the dimmed still, a play button and the running time. */
function Frame({ video, size }: { video: Video; size: "lg" | "sm" }) {
  const big = size === "lg";
  return (
    <span className="relative block aspect-video overflow-hidden rounded-xl bg-gradient-to-br from-[#0B1220] to-[#162035]">
      <Thumbnail video={video} />
      <span className="absolute inset-0 bg-[#0B1220]/25 transition-colors group-hover:bg-[#0B1220]/15" />
      <span className="absolute inset-0 flex items-center justify-center">
        <span
          className={`rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-2xl transition-transform group-hover:scale-105 ${big ? "w-16 h-16" : "w-11 h-11"}`}
        >
          <span className={`rounded-full bg-white flex items-center justify-center ${big ? "w-10 h-10" : "w-7 h-7"}`}>
            <svg width={big ? 18 : 12} height={big ? 18 : 12} viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M8 6l10 6-10 6V6z" fill="var(--ink)" />
            </svg>
          </span>
        </span>
      </span>
      <span className="absolute bottom-2 right-2 rounded-md bg-[#0B1220]/80 px-1.5 py-0.5 text-[11px] font-semibold tabular-nums text-white">
        {video.duration}
      </span>
    </span>
  );
}

/* ─── VIDEOS ─── */
export default function Videos() {
  const [playing, setPlaying] = useState<Video | null>(null);
  const [featured, ...rest] = VIDEOS;

  return (
    <section id="videos" className="snap-section bg-[#FAFAF8] border-t border-[#E7E2D8]">
      <div className="container-content w-full py-14">
        <div className="max-w-3xl mx-auto text-center mb-10">
          <div className="gold-divider mx-auto" />
          <h2 className="section-title text-[#0F172A] mb-3">Videos</h2>
          <p className="text-base md:text-lg text-[#64748B] leading-relaxed">
            See AuriLearn teaching, from a full class to short course previews.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          {/* Featured */}
          <button
            onClick={() => setPlaying(featured)}
            className="group lg:col-span-7 text-left rounded-2xl bg-white border border-[#E7E2D8] p-3 transition-all hover:border-[var(--gold)] hover:shadow-[0_10px_40px_rgba(15,23,42,0.08)] cursor-pointer"
            aria-label={`Play ${featured.title}`}
          >
            <Frame video={featured} size="lg" />
            <span className="block px-2 pt-3 pb-1">
              <span className="block text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--gold-hover)] mb-1">
                {featured.tag}
              </span>
              <span className="block text-lg md:text-xl font-semibold text-[#0F172A] leading-snug">{featured.title}</span>
              <span className="block text-sm text-[#64748B] leading-relaxed mt-1">{featured.description}</span>
            </span>
          </button>

          {/* The rest: the cards share the featured card's height */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {rest.map((video) => (
              <button
                key={video.id}
                onClick={() => setPlaying(video)}
                className="group lg:flex-1 text-left rounded-2xl bg-white border border-[#E7E2D8] p-3 flex gap-4 items-center transition-all hover:border-[var(--gold)] hover:shadow-[0_10px_40px_rgba(15,23,42,0.08)] cursor-pointer"
                aria-label={`Play ${video.title}`}
              >
                <span className="w-[52%] shrink-0">
                  <Frame video={video} size="sm" />
                </span>
                <span className="min-w-0 pr-1">
                  <span className="block text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--gold-hover)] mb-1">
                    {video.tag}
                  </span>
                  <span className="block font-semibold text-[#0F172A] leading-snug">{video.title}</span>
                  <span className="block text-[13px] text-[#64748B] leading-snug mt-1">{video.description}</span>
                </span>
              </button>
            ))}

            <a
              href={YOUTUBE_CHANNEL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 self-start px-1 pt-1 text-sm font-semibold text-[#0F172A] hover:text-[var(--gold-hover)] transition-colors"
            >
              More on our YouTube channel
              <svg className="text-[var(--gold-hover)] transition-transform group-hover:translate-x-0.5" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <Modal isOpen={playing !== null} onClose={() => setPlaying(null)} title={playing?.title} size="xl">
        {playing && (
          <div className="aspect-video bg-[#0B1220] rounded-xl overflow-hidden border border-[#1E2D45]">
            {playing.source.kind === "youtube" ? (
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${playing.source.id}?autoplay=1&rel=0`}
                title={playing.title}
                className="h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            ) : (
              <video src={playing.source.src} className="h-full w-full object-contain" controls autoPlay playsInline preload="metadata">
                Your browser does not support the video tag.
              </video>
            )}
          </div>
        )}
      </Modal>
    </section>
  );
}
