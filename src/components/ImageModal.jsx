import { useState, useEffect, useCallback } from "react";
import "./ImageModal.css";

export default function ImageModal({ item, onClose }) {
    // Collect all media: images + gif + video
    const allMedia = [];
    item.images.forEach((src) => allMedia.push({ type: "image", src }));
    if (item.gif) allMedia.push({ type: "image", src: item.gif });
    if (item.video) allMedia.push({ type: "video", src: item.video });

    const [currentIndex, setCurrentIndex] = useState(0);

    const goNext = useCallback(() => {
        setCurrentIndex((prev) => (prev + 1) % allMedia.length);
    }, [allMedia.length]);

    const goPrev = useCallback(() => {
        setCurrentIndex((prev) => (prev - 1 + allMedia.length) % allMedia.length);
    }, [allMedia.length]);

    // Keyboard navigation
    useEffect(() => {
        const handleKey = (e) => {
            if (e.key === "Escape") onClose();
            if (e.key === "ArrowRight") goNext();
            if (e.key === "ArrowLeft") goPrev();
        };
        document.addEventListener("keydown", handleKey);
        document.body.style.overflow = "hidden";
        return () => {
            document.removeEventListener("keydown", handleKey);
            document.body.style.overflow = "";
        };
    }, [onClose, goNext, goPrev]);

    const current = allMedia[currentIndex];

    // Calcula o texto a exibir com base no dicionário (fallback para a descrição padrão do projeto)
    const currentDesc = (item.imageDescriptions && item.imageDescriptions[current.src]) || item.description;

    return (
        <div className="modal-backdrop" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <span className="modal-counter">
                    {currentIndex + 1} / {allMedia.length}
                </span>

                <div className="modal-media-wrapper">
                    <button className="modal-close" onClick={onClose} aria-label="Fechar">
                        ✕
                    </button>
                    {allMedia.length > 1 && (
                        <>
                            <button className="modal-nav modal-nav--prev" onClick={goPrev} aria-label="Anterior">
                                <span>‹</span>
                            </button>
                            <button className="modal-nav modal-nav--next" onClick={goNext} aria-label="Próximo">
                                <span>›</span>
                            </button>
                        </>
                    )}

                    {current.type === "video" ? (
                        <video
                            className="modal-video"
                            src={current.src}
                            controls
                            autoPlay
                            loop
                            muted
                        />
                    ) : (
                        <div className="modal-image-container">
                            <img
                                className="modal-image-bg"
                                src={current.src}
                                alt=""
                                aria-hidden="true"
                            />
                            <img
                                className="modal-image"
                                src={current.src}
                                alt={`${item.title} — ${currentIndex + 1}`}
                            />
                        </div>
                    )}
                </div>

                <div className="modal-info">
                    <h3>{item.title}</h3>
                    {currentDesc && <p>{currentDesc}</p>}
                </div>

                {allMedia.length > 1 && (
                    <div className="modal-thumbs">
                        {allMedia.map((media, i) => (
                            <img
                                key={i}
                                className={`modal-thumb ${i === currentIndex ? "active" : ""}`}
                                src={media.type === "video" ? item.images[0] : media.src}
                                alt={`Miniatura ${i + 1}`}
                                onClick={() => setCurrentIndex(i)}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
