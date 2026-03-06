import "./Footer.css";

export default function Footer() {
    return (
        <footer className="footer" id="contact">
            <div className="container footer__inner">
                <div className="footer__contact">
                    <h2>
                        Vamos criar algo{" "}
                        <span className="section-title" style={{ display: "inline" }}>
                            incrível
                        </span>
                        ?
                    </h2>
                    <p>
                        Estou disponível para projetos freelance, colaborações e comissões
                        de animação ou modelagem 3D.
                    </p>
                    <a
                        href="mailto:lucasbpoletto@hotmail.com"
                        className="footer__contact-cta"
                    >
                        ✉ Enviar Email
                    </a>
                </div>

                <div className="footer__socials">
                    {/*
                    <a
                        href="#"
                        className="footer__social-link"
                        aria-label="ArtStation"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        🎨
                    </a>
                    <a
                        href="#"
                        className="footer__social-link"
                        aria-label="Twitter"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        𝕏
                    </a>
                    <a
                        href="#"
                        className="footer__social-link"
                        aria-label="LinkedIn"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        in
                    </a>
                    */}

                    <a
                        href="https://discord.com/users/272473154301984768"
                        className="footer__social-link"
                        aria-label="Discord"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <img
                            src="/Discord-Symbol-Blurple.svg"
                            alt="Discord Logo"
                            style={{ width: "22px", height: "22px" }}
                        />
                    </a>
                </div>

                <div className="footer__divider" />

                <p className="footer__bottom">
                    © {new Date().getFullYear()} Dova 3D — Todos os direitos reservados.
                </p>
            </div>
        </footer>
    );
}
