import React, { useEffect, useRef, useState } from 'react'
import { trailersStyles, trailersCSS } from '../assets/dummyStyles'

import { Calendar, ChevronLeft, ChevronRight, Clapperboard, Clock, Play, X } from 'lucide-react'

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000';

const PLACEHOLDER_THUMB =
  "https://via.placeholder.com/800x450?text=No+Thumbnail";

const getUploadUrl = (input) => {
  if (!input) return null;

  // Case 1: already a full URL
  if (typeof input === "string") {
    if (input.startsWith("http://") || input.startsWith("https://"))
      return input;
    // filename only (like "abc.jpg")
    return `${API_BASE}/uploads/${input}`;
  }

  // Case 2: input is an object (multer-like)
  if (typeof input === "object") {
    const possible =
      input.url ||
      input.path ||
      input.filename ||
      input.file ||
      input.image ||
      "";

    if (possible) return getUploadUrl(possible);
  }

  return null;
};
//For duration
const formatDuration = (dur) => {
  if (!dur) return "";
  if (typeof dur === "string") return dur;
  if (typeof dur === "number") return `${dur}m`;
  // object with hours/minutes
  const h = dur.hours ?? 0;
  const m = dur.minutes ?? 0;
  if (h && m) return `${h}h ${m}m`;
  if (h) return `${h}h`;
  if (m) return `${m}m`;
  return "";
};

const mapMovieToTrailerItem = (movie) => {
  // movie.latestTrailer may hold nested data
  const lt = movie.latestTrailer || {};
  const title = lt.title || movie.movieName || movie.title || "Untitled";
  const thumbnail =
    getUploadUrl(lt.thumbnail) ||
    getUploadUrl(movie.poster) ||
    PLACEHOLDER_THUMB;
  const videoUrl =
    lt.videoId || lt.videoUrl || movie.trailerUrl || movie.videoUrl || "";
  const duration = lt.duration
    ? formatDuration(lt.duration)
    : movie.duration
    ? formatDuration(movie.duration)
    : "";
  const year = lt.year || movie.year || "";
  const genre =
    lt.genres && lt.genres.length
      ? lt.genres.join(", ")
      : movie.categories && movie.categories.length
      ? movie.categories.join(", ")
      : "";
  const description = lt.description || movie.story || "";

  // Build credits object expected by UI: { Director: { name, image }, Producer: {...}, Singer: {...} }
  const credits = {};
  const firstDirector = (lt.directors || movie.directors || []).find(Boolean);
  const firstProducer = (lt.producers || movie.producers || []).find(Boolean);
  const firstSinger = (lt.singers || movie.singers || []).find(Boolean);

  if (firstDirector) {
    credits["Director"] = {
      name: firstDirector.name || "Unknown",
      image:
        getUploadUrl(firstDirector.file) ||
        getUploadUrl(firstDirector.image) ||
        getUploadUrl(firstDirector.photo) ||
        PLACEHOLDER_THUMB,
    };
  }
  if (firstProducer) {
    credits["Producer"] = {
      name: firstProducer.name || "Unknown",
      image:
        getUploadUrl(firstProducer.file) ||
        getUploadUrl(firstProducer.image) ||
        getUploadUrl(firstProducer.photo) ||
        PLACEHOLDER_THUMB,
    };
  }
  if (firstSinger) {
    credits["Singer"] = {
      name: firstSinger.name || "Unknown",
      image:
        getUploadUrl(firstSinger.file) ||
        getUploadUrl(firstSinger.image) ||
        getUploadUrl(firstSinger.photo) ||
        PLACEHOLDER_THUMB,
    };
  }

  return {
    id: movie._id || movie.id,
    title,
    thumbnail,
    videoUrl,
    duration,
    year,
    genre,
    description,
    credits,
  };
};
const Trailers = () => {
    const [featuredTrailer, setFeaturedTrailer] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [trailers,setTrailers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
    const ac = new AbortController();
    setLoading(true);
    setError(null);

  async function load() {
    try {
      const url = `${API_BASE}/api/movies?type=latestTrailers&limit=50`;
      const res = await fetch(url, { signal: ac.signal });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const json = await res.json();
      const items = Array.isArray(json.items) ? json.items : [];

      const mapped = items.map(mapMovieToTrailerItem);
      console.log(mapped);
      setTrailers(mapped);
      setFeaturedTrailer(mapped[0] || null);
      setLoading(false);
      } catch (err) {
        if (err.name === "AbortError") return;
        console.error("Failed to load trailers:", err);
        setError("Failed to load from server");
        setLoading(false);
      }
  }

  load();

  return () => {
    ac.abort();
  };
}, []);

  const videoRef = useRef(null);
  const carouselRef = useRef(null);
  
//   const selectTrailer = (trailer) => {
//     setFeaturedTrailer(trailer);
//   };

    useEffect(() => {
    // no-op kept for parity
    const handleScroll = () => {};
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -280, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 280, behavior: "smooth" });
    }
  };
// this function is used to select a trailer and reset the video playback state. It also attempts to center the selected trailer in the carousel for better visibility.
  const selectTrailer = (trailer) => {
    setFeaturedTrailer(trailer);
    setIsPlaying(false);
    try {
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
      }
    } catch (e) {
      // ignore
    }

    // center selected item in carousel
    try {
      if (carouselRef.current) {
        const el = carouselRef.current.querySelector(`[data-id='${trailer.id}']`);
        if (el) {
          const rect = el.getBoundingClientRect();
          const parentRect = carouselRef.current.getBoundingClientRect();
          const offset = rect.left - parentRect.left - parentRect.width / 2 + rect.width / 2;
          carouselRef.current.scrollBy({ left: offset, behavior: "smooth" });
        }
      }
    } catch (e) {
      // ignore
    }
  };

  const togglePlay = () => {
    setIsPlaying((s) => !s);
  };

  // helper to build embed URL for common providers (YouTube / youtu.be / Vimeo)
  const getEmbedBaseUrl = (videoUrl) => {
    if (!videoUrl) return "";
    try {
      const url = new URL(videoUrl);
      const host = url.hostname.replace("www.", "").toLowerCase();

      // YouTube standard watch URL: youtube.com/watch?v=ID
      if (host.includes("youtube.com")) {
        const vid = url.searchParams.get("v");
        if (vid) return `https://www.youtube.com/embed/${vid}`;
        // If already embed path, return that
        if (url.pathname.includes("/embed/")) return `https://www.youtube.com${url.pathname}`;
      }

      // short youtu.be links
      if (host === "youtu.be") {
        const vid = url.pathname.replace("/", "");
        if (vid) return `https://www.youtube.com/embed/${vid}`;
      }

      // Vimeo
      if (host.includes("vimeo.com")) {
        // path like /12345678 or /channels/.../12345678
        const parts = url.pathname.split("/").filter(Boolean);
        const id = parts.pop();
        if (id) return `https://player.vimeo.com/video/${id}`;
      }

      // fallback: return original (could already be an embed URL)
      return videoUrl;
    } catch (e) {
      // if URL constructor fails, return as-is
      return videoUrl || "";
    }
  };

  // build final iframe src with autoplay/mute parameters
  const buildIframeSrc = (videoUrl) => {
    const base = getEmbedBaseUrl(videoUrl);
    if (!base) return "";
    const sep = base.includes("?") ? "&" : "?";
    // add autoplay / mute / rel
    return `${base}${sep}autoplay=1&mute=${isMuted ? 1 : 0}&rel=0`;
  };

  //helps in playing video
  if (loading) {
  return (
    <div className={trailersStyles.container}>
      <div className="py-12 text-center text-gray-300">
        Loading Trailers...
      </div>
    </div>
  );
}

if (error) {
  return (
    <div className={trailersStyles.container}>
      <div className="py-12 text-center text-red-400">{error}</div>
    </div>
  );
}

const dataToRender = trailers || [];
  return (
    <div className={trailersStyles.container}>
        <main className={trailersStyles.main}>
            <div className={trailersStyles.layout}>
                {/* left side */}
                <div className={trailersStyles.leftSide}>
                    <div className={trailersStyles.leftCard}>
                        <h2 className={trailersStyles.leftTitle}>
                            <Clapperboard className={trailersStyles.titleIcon} />
                            Latest Trailers
                        </h2>
                        <div className={trailersStyles.carouselControls} >
                            <div className={trailersStyles.controlButton} >
                                <button className={trailersStyles.controlButton} onClick={scrollLeft}>
                                    <ChevronLeft size={18} />
                                </button>
                                <button className={trailersStyles.controlButton} onClick={scrollRight}>
                                    <ChevronRight size={18} />
                                </button>
                            </div>
                            <span className={trailersStyles.trailerCount}>
                                {dataToRender.length} Trailers
                            </span>
                        </div>
                        <div ref={carouselRef} className={trailersStyles.trailerCarousel} style={{scrollBarwidth: "none", msOverflowStyle: "none"}}>
                            {dataToRender.map((trailer) => (
                    <div
                    key={trailer.id}
                    data-id={trailer.id}
                    className={`${trailersStyles.carouselItem.base} ${
                      featuredTrailer?.id === trailer.id ? trailersStyles.carouselItem.active : trailersStyles.carouselItem.inactive
                    }`}
                    style={{ width: "220px", height: "124px", minWidth: "220px" }}
                    onClick={() => selectTrailer(trailer)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") selectTrailer(trailer);
                    }}
                    aria-pressed={featuredTrailer?.id === trailer.id}
                  >
                    <img src={trailer.thumbnail || PLACEHOLDER_THUMB} alt={trailer.title} className={trailersStyles.carouselImage} loading="lazy" />
                    <div className={trailersStyles.carouselOverlay}>
                      <h3 className={trailersStyles.carouselTitle}>{trailer.title}</h3>
                      <p className={trailersStyles.carouselGenre}>{trailer.genre}</p>
                    </div>
                  </div>
                            ))}
                        </div>
                        <div className={trailersStyles.trendingSection}>
                            <h3 className={trailersStyles.trendingTitle}>Trending Trailers</h3>
                            {dataToRender.slice(0, 3).map((trailer) => (
                                <div key={trailer.id} className={trailersStyles.trendingItem}>
                                    <img src={trailer.thumbnail || PLACEHOLDER_THUMB} alt={trailer.title} className={trailersStyles.trendingImage} loading="lazy" />
                                    <div className={trailersStyles.trendingInfo}>
                                        <h4 className={trailersStyles.trendingTitle}>{trailer.title}</h4>
                                        <p className={trailersStyles.trendingGenre}>{trailer.genre}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* right side (empty for now) */}
                <div className={trailersStyles.rightSide} >
                    {featuredTrailer ? (
                      <div className={trailersStyles.rightCard}>
                          <div className={trailersStyles.videoContainer}>
                                  {isPlaying ? (
                                      <div className={trailersStyles.videoWrapper}>
                                          <iframe
                        className={trailersStyles.videoIframe}
                        src={buildIframeSrc(featuredTrailer.videoUrl)}
                        title={featuredTrailer.title}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        ref={videoRef}
                      />
                      <div className={trailersStyles.closeButton}>
                          <button title="Close Video" onClick={() => setIsPlaying(false)} className={trailersStyles.closeButtonInner}>
                              <X size={20} />
                          </button>
                      </div>
                          
                                          </div>
                                  ) : (
                                      <div className={trailersStyles.thumbnailContainer}>
                                          <img src={featuredTrailer.thumbnail} alt={featuredTrailer.title} className={trailersStyles.thumbnailImage} 
                                          loading="eager" />
                                          <div className={trailersStyles.playButtonContainer}>
                                              <button title="Play Video" onClick={togglePlay} className={trailersStyles.playButton}>
                                                  <Play size={24} />
                                               </button>
                                              </div>
                                      </div>
                                  )}
                              </div>
                              <div className={trailersStyles.trailerInfo}>
                                  <div className={trailersStyles.infoHeader}>
                                      <h2 className={trailersStyles.trailerTitle}>{featuredTrailer.title}</h2>
                                      <div className={trailersStyles.trailerMeta}>
                                          <span className={trailersStyles.metaItem}>
                                              <Clock className={trailersStyles.metaIcon} />
                                              {featuredTrailer.duration}
  
                                          </span>
                                           <span className={trailersStyles.metaItem}>
                                              <Calendar className={trailersStyles.metaIcon} />
                                              {featuredTrailer.year}
  
                                          </span>
  
                                      </div>
  
                                  </div>
                                  <div className={trailersStyles.genreContainer}>
                                      <span className={trailersStyles.genreText}>{featuredTrailer.genre}</span>
                                  </div>
                                  <p className={trailersStyles.description}>{featuredTrailer.description}</p>
                                  <div className={trailersStyles.credits}>
                                      <h3 className={trailersStyles.creditsTitle}>Credits</h3>
                                      <div className={trailersStyles.creditsGrid}>
                                          {featuredTrailer.credits &&
                        Object.entries(featuredTrailer.credits).map(([role, person]) => (
                          <div key={role} className={trailersStyles.creditItem}>
                            <div className={trailersStyles.creditImage}>
                              <img src={person.image} alt={person.name} className={trailersStyles.creditImageSrc} loading="lazy" />
                            </div>
                            <div className={trailersStyles.creditName}>{person.name}</div>
                            <div className={trailersStyles.creditRole}>{role}</div>
                          </div>
                        ))}
                                          </div>
                                  </div>
                              </div>
                          </div>
                    ) : (
                      <div className="py-12 text-center text-gray-500">No trailer selected</div>
                    )}
                </div>

                </div>

              
        </main>
        <style>{trailersCSS}</style>
    </div>
  )
}

export default Trailers
