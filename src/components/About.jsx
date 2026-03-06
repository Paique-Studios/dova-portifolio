import "./About.css";

const SKILLS = [
    "Project Management (PMO)",
    "Negotiation & Sales",
    "Workflow Optimization",
    "Blender & 3D Modeling",
    "Creative Direction",
    "Minecraft Architecture",
    "Roblox Studio",
    "Environment Design",
    "Product Owner",
    "Collaborative Leadership",
];

export default function About() {
    return (
        <section className="about" id="about">
            <div className="about__glow" />
            <div className="container about__inner">
                <div className="about__text">
                    <h2 className="section-title">Sobre Mim</h2>
                    <p>
                        Sou um profissional com uma base híbrida em <strong>Project Management (PMO)</strong>,
                        direção criativa e desenvolvimento técnico de jogos, com grande foco no ecossistema
                        Minecraft e Roblox.
                    </p>
                    <p>
                        Minha carreira começou como builder, evoluiu para modelagem 3D e produção audiovisual,
                        e se expandiu para a gestão estratégica de projetos e negociação comercial. Ajudo a
                        estruturar processos, liderar equipes criativas, otimizar workflows com ferramentas
                        customizadas e transformar boas ideias em produtos estruturados.
                    </p>

                    <div className="about__skills">
                        {SKILLS.map((skill) => (
                            <span key={skill} className="about__skill-badge">
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="about__stats">
                    <div className="about__stat">
                        <div className="about__stat-number">PMO</div>
                        <div className="about__stat-label">Project Management</div>
                    </div>
                    <div className="about__stat">
                        <div className="about__stat-number">3D</div>
                        <div className="about__stat-label">Modelagem & Direção</div>
                    </div>
                    <div className="about__stat">
                        <div className="about__stat-number">PO</div>
                        <div className="about__stat-label">Product Owner</div>
                    </div>
                    <div className="about__stat">
                        <div className="about__stat-number">B2B</div>
                        <div className="about__stat-label">Negociação & Vendas</div>
                    </div>
                </div>
            </div>
        </section>
    );
}
