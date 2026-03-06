import { useState, useEffect, useMemo, useRef, useCallback } from "react";
import "./Gallery.css";

// Helper to prefix asset paths with Vite's base URL (for GitHub Pages)
const BASE = import.meta.env.BASE_URL;
const assetUrl = (path) => {
    if (!path) return path;
    // Avoid double-prefixing
    if (path.startsWith(BASE)) return path;
    // Only prefix absolute paths
    if (path.startsWith('/')) return `${BASE}${path.slice(1)}`;
    return path;
};

export default function Gallery({ onOpenModal }) {
    const [portfolioData, setPortfolioData] = useState([]);
    const [tags, setTags] = useState(["All"]);

    const [activeTag, setActiveTag] = useState("All");
    const [isLoading, setIsLoading] = useState(true);
    const [visibleCount, setVisibleCount] = useState(4); // Quantity to load initially
    const [isAutoLoadEnabled, setIsAutoLoadEnabled] = useState(true); // Control flow
    useEffect(() => {
        const fetchPortfolio = async () => {
            try {
                const response = await fetch(`${import.meta.env.BASE_URL}portfolio.json?t=${new Date().getTime()}`);
                if (!response.ok) throw new Error("Failed to fetch");

                const data = await response.json();
                setPortfolioData(data.items || []);
                setTags(data.tags || ["All"]);
            } catch (err) {
                console.error("Error loading portfolio:", err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchPortfolio();
    }, []);

    // 2. Filter data
    const filtered = useMemo(() => {
        if (activeTag === "All") return portfolioData;
        return portfolioData.filter((item) => item.tag === activeTag);
    }, [activeTag, portfolioData]);

    // 3. Pagination logic
    const visibleItems = useMemo(() => {
        return filtered.slice(0, visibleCount);
    }, [filtered, visibleCount]);

    const observerTarget = useRef(null);
    const isAutoLoadRef = useRef(isAutoLoadEnabled);
    const loadingRef = useRef(false);

    // Keep ref in sync with state
    useEffect(() => {
        isAutoLoadRef.current = isAutoLoadEnabled;
    }, [isAutoLoadEnabled]);

    // Scroll-based lazy loading (more predictable than IntersectionObserver)
    useEffect(() => {
        let timeoutId = null;

        const handleScroll = () => {
            if (timeoutId) return; // Debounce

            timeoutId = setTimeout(() => {
                timeoutId = null;
                if (!isAutoLoadRef.current || loadingRef.current) return;
                if (!observerTarget.current) return;

                const rect = observerTarget.current.getBoundingClientRect();
                // Load more when target is within 300px of viewport bottom
                if (rect.top < window.innerHeight + 300) {
                    loadingRef.current = true;
                    setVisibleCount(prev => prev + 4);
                    // Prevent rapid fire, wait for DOM to settle
                    setTimeout(() => { loadingRef.current = false; }, 500);
                }
            }, 100);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        // Initial check in case content is already in view
        handleScroll();

        return () => {
            window.removeEventListener('scroll', handleScroll);
            if (timeoutId) clearTimeout(timeoutId);
        };
    }, []);

    const handleLoadMore = () => {
        setVisibleCount(prev => prev + 4);
        setIsAutoLoadEnabled(true);
    };

    // Disable auto-load if user explicitly requests to go to sections below gallery
    useEffect(() => {
        const sectionHashes = ['#contact', '#about'];

        const handleHashChange = () => {
            if (sectionHashes.includes(window.location.hash)) {
                setIsAutoLoadEnabled(false);
            }
        };

        // Listen for standard hash changes
        window.addEventListener('hashchange', handleHashChange);

        // Setup a click listener specifically for anchor links
        // to disable infinite scroll before jumping down
        const handleAnchorClick = (e) => {
            const anchor = e.target.closest('a');
            if (anchor && sectionHashes.includes(anchor.getAttribute('href'))) {
                setIsAutoLoadEnabled(false);
            }
        };

        document.addEventListener('click', handleAnchorClick);

        return () => {
            window.removeEventListener('hashchange', handleHashChange);
            document.removeEventListener('click', handleAnchorClick);
        };
    }, []);

    const handleTagChange = (tag) => {
        setActiveTag(tag);
        setVisibleCount(4); // Reset pagination on filter
        setIsAutoLoadEnabled(true); // Re-enable auto load when switching tags
    };

    if (isLoading) {
        return (
            <section className="gallery" id="gallery">
                <div className="container gallery__loading">
                    <span className="gallery__spinner"></span>
                    <p>Loading projects...</p>
                </div>
            </section>
        );
    }

    return (
        <section className="gallery" id="gallery">
            <div className="container gallery__header">
                <h2 className="section-title">Projects</h2>
                <p className="section-subtitle">
                    A selection of my best 3D modeling projects, renders, and environments.
                </p>

                <div className="gallery__filters">
                    {tags.map((tag) => (
                        <button
                            key={tag}
                            className={`gallery__filter-btn ${activeTag === tag ? "active" : ""}`}
                            onClick={() => handleTagChange(tag)}
                        >
                            {tag}
                        </button>
                    ))}
                </div>
            </div>

            {/* Alternating Layout Grid */}
            <div className="gallery__dynamic-grid">
                {visibleItems.map((item, index) => {
                    // Even indexes: Image Left, Text Right. Odd: Text Left, Image Right
                    const isReversed = index % 2 !== 0;

                    // Compute the cover media to display
                    let coverUrl = (item.images && item.images[0]) || item.gif || item.video;
                    if (item.coverImage) {
                        const allMedia = [...(item.images || []), item.gif, item.video].filter(Boolean);
                        const exactCover = allMedia.find(m => m.includes(item.coverImage));
                        if (exactCover) coverUrl = exactCover;
                    }

                    const isVideoCover = coverUrl && (coverUrl.endsWith('.mp4') || coverUrl.endsWith('.webm'));

                    return (
                        <div
                            key={item.id}
                            className={`gallery__block ${isReversed ? 'gallery__block--reversed' : ''}`}
                            style={{ animationDelay: `${(index % 4) * 100}ms` }}
                        >
                            {/* Image Pane */}
                            <div
                                className="gallery__block-image-wrapper"
                                onClick={() => onOpenModal(item)}
                            >
                                {isVideoCover ? (
                                    <>
                                        <video className="gallery__block-image-bg" src={assetUrl(coverUrl)} aria-hidden="true" muted loop playsInline autoPlay />
                                        <video className="gallery__block-image" src={assetUrl(coverUrl)} muted loop playsInline autoPlay />
                                    </>
                                ) : (
                                    <>
                                        <img className="gallery__block-image-bg" src={assetUrl(coverUrl)} alt="" aria-hidden="true" />
                                        <img className="gallery__block-image" src={assetUrl(coverUrl)} alt={item.title} loading="lazy" />
                                    </>
                                )}
                                {item.images && item.images.length > 1 && (
                                    <span className="gallery__block-count">+{item.images.length - 1} photos</span>
                                )}
                                <div className="gallery__block-image-overlay">
                                    <span className="gallery__block-view-btn">View Details</span>
                                </div>
                            </div>

                            {/* Content Pane */}
                            <div className="gallery__block-content">
                                <span className="gallery__block-tag">{item.tag}</span>
                                <h3 className="gallery__block-title">{item.title}</h3>
                                {item.description && (
                                    <p className="gallery__block-desc">{item.description}</p>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Infinite Scroll Trigger / Load More Button */}
            {visibleCount < filtered.length && (
                <div ref={observerTarget} className="gallery__load-more-wrapper">
                    {isAutoLoadEnabled ? (
                        <>
                            <span className="gallery__spinner"></span>
                            <p className="gallery__load-more-count" style={{ marginTop: '1rem' }}>Loading more projects...</p>
                        </>
                    ) : (
                        <>
                            <button className="gallery__load-more-btn" onClick={handleLoadMore}>
                                Load More
                            </button>
                            <p className="gallery__load-more-count" style={{ marginTop: '0.5rem' }}>Showing {visibleItems.length} of {filtered.length}</p>
                        </>
                    )}
                </div>
            )}

            {filtered.length === 0 && (
                <div className="container gallery__empty">
                    <p>No projects found in this category.</p>
                </div>
            )}
        </section>
    );
}
