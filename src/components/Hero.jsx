import "./Hero.css";

export default function Hero() {
    return (
        <section className="hero" id="hero">
            <div className="hero__bg-glow hero__bg-glow--purple" />
            <div className="hero__bg-glow hero__bg-glow--cyan" />

            <div className="hero__content">
                <div className="hero__badge">
                    <span className="hero__badge-dot" />
                    Disponível para freelance
                </div>

                <h1 className="hero__title">
                    Criando mundos em{" "}
                    <span className="hero__title-gradient">3D</span>
                </h1>

                <p className="hero__subtitle">
                    Modelagem 3D, cenários, personagens e objetos com atenção a cada
                    detalhe. Transformo ideias em renders que impressionam.
                </p>

                <div className="hero__cta-group">
                    <a href="#gallery" className="hero__cta hero__cta--primary">
                        Ver Trabalhos ↓
                    </a>
                    <a href="#contact" className="hero__cta hero__cta--secondary">
                        Entrar em Contato
                    </a>
                </div>
            </div>

            <div className="hero__scroll-indicator">
                <span>scroll</span>
                <div className="hero__scroll-arrow" />
            </div>
        </section>
    );
}
