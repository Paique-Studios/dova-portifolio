import { useState, useEffect } from "react";
import "./Header.css";

const NAV_LINKS = [
    { label: "Início", href: "#hero" },
    { label: "Trabalhos", href: "#gallery" },
    { label: "Sobre", href: "#about" },
    { label: "Contato", href: "#contact" },
];

export default function Header() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 40);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleLinkClick = () => setMenuOpen(false);

    return (
        <header className={`header ${scrolled ? "scrolled" : ""}`}>
            <div className="header__inner">
                <a href="#hero" className="header__logo">
                    <span>Dova</span> 3D
                </a>

                <nav className={`header__nav ${menuOpen ? "open" : ""}`}>
                    {NAV_LINKS.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            className="header__link"
                            onClick={handleLinkClick}
                        >
                            {link.label}
                        </a>
                    ))}
                </nav>

                <button
                    className={`header__mobile-toggle ${menuOpen ? "open" : ""}`}
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Abrir menu"
                >
                    <span />
                    <span />
                    <span />
                </button>
            </div>
        </header>
    );
}
