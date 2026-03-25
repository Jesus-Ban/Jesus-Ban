import { useState, useEffect, useRef } from "react";

const data = {
  name: "Jesus Ban",
  title: "Senior Backend Engineer",
  location: "Huelva, Andalusia, Spain",
  email: "banulsortizj@gmail.com",
  github: "https://github.com/jesus-ban",
  summary:
    "7+ years building scalable backend systems & AI-driven products. Launched 10+ products generating $200K+ in revenue. Specialist in AI integrations, API design, and system architecture.",
  skills: {
    "Languages": ["Python", "Golang", "JavaScript", "TypeScript", "Node.js", "R"],
    "AI / ML": ["TensorFlow", "PyTorch", "Scikit-learn", "BERT", "GPT", "LLMs", "XGBoost", "Keras"],
    "Frameworks": ["FastAPI", "Django", "Flask", "Express.js", "Streamlit"],
    "DevOps & Cloud": ["Docker", "Kubernetes", "AWS", "GCP", "CI/CD", "Apache Airflow"],
    "Databases": ["PostgreSQL", "MongoDB", "Redis", "MySQL", "Neo4j", "Pinecone", "ChromaDB"],
    "Frontend": ["React", "Tailwind CSS"],
  },
  experience: [
    {
      role: "Lead Engineer",
      company: "helpforce.ai",
      period: "07/2025 – 01/2026",
      location: "Huelva, Spain",
      points: [
        "Led development of Cupilot — an AI-powered Meeting Assistant Bot.",
      ],
    },
    {
      role: "Senior Software Engineer",
      company: "Supercog.ai",
      period: "09/2024 – 05/2025",
      location: "Miami, USA",
      points: [
        "Optimized TTS model BARK with TensorRT & ONNX, reducing bot response time to 1.5s.",
        "Architected CI/CD pipelines on AWS EC2 + Kubernetes for streamlined deployments.",
        "Designed 6-component project system: Engine Manager, Agent Dispatcher, Agent Tools & DB.",
        "Integrated 10+ tools including GitHub, Snowflake, Discord, Jira, LinkedIn & Notion APIs.",
        "Implemented RAG solution via Ragie.ai ensuring 100% engine compatibility.",
        "Built real-time data pipeline using Apache Airflow, Airbyte & Kafka across 5+ platforms.",
      ],
    },
    {
      role: "Full Stack Engineer",
      company: "Bdeo",
      period: "10/2019 – 01/2023",
      location: "Kazakhstan",
      points: [
        "Built AI-powered Remote Teaching System with facial recognition and 5 teaching support functions.",
        "Led Voice Bot development using Eleven Labs, DeepGram, and VGG16 neural networks.",
        "Developed Bitcoin Price Prediction model using RNN, LSTM & Transformer (T5) models.",
        "Architected multi-language voice backend for Speaksynk, supporting 10+ languages.",
        "Scaled Fluent.AI voice model — drove 25% increase in user retention across 500+ users.",
        "Delivered end-to-end product lifecycle management for talkhealth.ai.",
      ],
    },
  ],
  projects: [
    {
      name: "Cupilot",
      company: "helpforce.ai",
      tag: "AI Sales Assistant",
      year: "2025–2026",
      url: "https://helpforce.ai",
      color: "#3b82f6",
      description:
        "Real-time AI Meeting Assistant built for live sales performance. Cupilot listens to calls, delivers instant coaching nudges, and automates CRM updates — all powered by multi-agent AI on Microsoft Azure infrastructure.",
      highlights: [
        "Multi-agent AI architecture for real-time sales nudges",
        "Automated CRM data entry and deal tracking",
        "Built on Microsoft Azure with compliance-grade data masking",
        "Reduced rep ramp time and boosted win rates",
      ],
      stack: ["Python", "Azure", "LLMs", "Multi-Agent AI", "CRM APIs"],
    },
    {
      name: "Supercog Agent Platform",
      company: "Supercog.ai",
      tag: "AI Agent Platform",
      year: "2024–2025",
      url: "https://supercog.ai",
      color: "#8b5cf6",
      description:
        "Enterprise-grade 'connected agent' platform that plugs LLM-powered agents directly into company systems — Jira, Salesforce, Snowflake, GitHub, Notion and more — enabling fully autonomous workflows without human hand-holding.",
      highlights: [
        "Designed 6-component agent architecture: Engine Manager, Agent Dispatcher, Agent Tools & DB",
        "Integrated 10+ live system connectors for autonomous workflow execution",
        "Optimized BARK TTS with TensorRT & ONNX — bot response down to 1.5s",
        "Deployed real-time RAG pipeline via Airflow, Airbyte & Kafka across 5+ platforms",
      ],
      stack: ["Python", "FastAPI", "TensorRT", "Kafka", "Airflow", "RAG", "AWS", "Kubernetes"],
    },
  ],
  education: {
    degree: "Bachelor of Computer Science",
    school: "Nazarbayev University",
    period: "04/2014 – 03/2019",
    location: "Astana, Kazakhstan",
  },
  stats: [
    { label: "Years Experience", value: "7+" },
    { label: "Products Launched", value: "10+" },
    { label: "Revenue Generated", value: "$200K+" },
    { label: "Languages Mastered", value: "6+" },
  ],
};

const NAV_LINKS = ["About", "Skills", "Experience", "Projects", "Education", "Contact"];

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function Section({ id, children, className = "" }) {
  const [ref, visible] = useInView();
  return (
    <section
      id={id}
      ref={ref}
      className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${className}`}
    >
      {children}
    </section>
  );
}

function Tag({ children }) {
  return (
    <span style={{
      background: "rgba(234,179,8,0.08)",
      border: "1px solid rgba(234,179,8,0.25)",
      color: "#eab308",
      fontSize: "0.72rem",
      fontFamily: "'JetBrains Mono', monospace",
      padding: "3px 10px",
      borderRadius: "3px",
      letterSpacing: "0.04em",
      display: "inline-block",
    }}>
      {children}
    </span>
  );
}

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("about");
  const [menuOpen, setMenuOpen] = useState(false);
  const [hoveredJob, setHoveredJob] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      const sections = NAV_LINKS.map(n => n.toLowerCase());
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <div style={{
      background: "#080c14",
      color: "#c8d6e5",
      fontFamily: "'DM Sans', sans-serif",
      minHeight: "100vh",
      overflowX: "hidden",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Syne:wght@700;800&family=JetBrains+Mono:wght@400;500&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::selection { background: rgba(234,179,8,0.3); }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #080c14; }
        ::-webkit-scrollbar-thumb { background: #eab308; border-radius: 2px; }

        .grid-bg {
          background-image:
            linear-gradient(rgba(234,179,8,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(234,179,8,0.03) 1px, transparent 1px);
          background-size: 48px 48px;
        }

        .glow-text {
          text-shadow: 0 0 40px rgba(234,179,8,0.4);
        }

        .card-hover {
          transition: border-color 0.3s, box-shadow 0.3s, transform 0.3s;
        }
        .card-hover:hover {
          border-color: rgba(234,179,8,0.5) !important;
          box-shadow: 0 0 30px rgba(234,179,8,0.1);
          transform: translateY(-2px);
        }

        .skill-pill {
          transition: background 0.2s, color 0.2s, border-color 0.2s;
        }
        .skill-pill:hover {
          background: rgba(234,179,8,0.15) !important;
          color: #fde047 !important;
          border-color: #eab308 !important;
        }

        .nav-link {
          transition: color 0.2s;
          cursor: pointer;
          background: none;
          border: none;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.78rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          padding: 4px 0;
        }
        .nav-link:hover { color: #eab308; }

        .cta-btn {
          transition: all 0.25s;
          cursor: pointer;
        }
        .cta-btn:hover {
          background: #eab308 !important;
          color: #080c14 !important;
          box-shadow: 0 0 24px rgba(234,179,8,0.4);
        }

        .timeline-dot::before {
          content: '';
          position: absolute;
          left: -29px;
          top: 6px;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: #eab308;
          box-shadow: 0 0 10px rgba(234,179,8,0.6);
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        .float { animation: float 4s ease-in-out infinite; }

        @keyframes pulse-ring {
          0% { box-shadow: 0 0 0 0 rgba(234,179,8,0.4); }
          70% { box-shadow: 0 0 0 12px rgba(234,179,8,0); }
          100% { box-shadow: 0 0 0 0 rgba(234,179,8,0); }
        }
        .pulse { animation: pulse-ring 2.5s infinite; }

        @media (max-width: 768px) {
          .hide-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
        }
        @media (min-width: 769px) {
          .show-mobile { display: none !important; }
        }
      `}</style>

      {/* NAV */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        borderBottom: "1px solid rgba(234,179,8,0.1)",
        backdropFilter: "blur(20px)",
        background: "rgba(8,12,20,0.85)",
        padding: "0 24px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        height: "60px",
      }}>
        <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "1.1rem", color: "#eab308", letterSpacing: "-0.02em" }}>
          JB<span style={{ color: "#c8d6e5", opacity: 0.4 }}>.dev</span>
        </div>

        {/* Desktop nav */}
        <div className="hide-mobile" style={{ display: "flex", gap: "32px" }}>
          {NAV_LINKS.map(n => (
            <button
              key={n}
              className="nav-link"
              onClick={() => scrollTo(n.toLowerCase())}
              style={{ color: activeSection === n.toLowerCase() ? "#eab308" : "#7a8fa6" }}
            >
              {n}
            </button>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          className="show-mobile"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{ background: "none", border: "none", cursor: "pointer", flexDirection: "column", gap: "5px", padding: "4px" }}
        >
          {[0,1,2].map(i => (
            <div key={i} style={{
              width: "22px", height: "2px",
              background: menuOpen ? (i===1 ? "transparent" : "#eab308") : "#c8d6e5",
              transition: "all 0.3s",
              transform: menuOpen ? (i===0 ? "rotate(45deg) translate(5px,5px)" : i===2 ? "rotate(-45deg) translate(5px,-5px)" : "") : "",
            }} />
          ))}
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{
          position: "fixed", top: "60px", left: 0, right: 0, zIndex: 99,
          background: "#0d1420",
          borderBottom: "1px solid rgba(234,179,8,0.15)",
          padding: "16px 24px 20px",
          display: "flex", flexDirection: "column", gap: "16px",
        }}>
          {NAV_LINKS.map(n => (
            <button
              key={n}
              className="nav-link"
              onClick={() => scrollTo(n.toLowerCase())}
              style={{ color: "#c8d6e5", textAlign: "left" }}
            >
              {n}
            </button>
          ))}
        </div>
      )}

      {/* HERO */}
      <div id="about" className="grid-bg" style={{
        minHeight: "100vh",
        display: "flex", flexDirection: "column", justifyContent: "center",
        padding: "100px 24px 60px",
        position: "relative", overflow: "hidden",
      }}>
        {/* Ambient glow */}
        <div style={{
          position: "absolute", top: "20%", right: "-10%",
          width: "500px", height: "500px",
          background: "radial-gradient(circle, rgba(234,179,8,0.06) 0%, transparent 70%)",
          borderRadius: "50%", pointerEvents: "none",
        }} />

        <div style={{ maxWidth: "900px", margin: "0 auto", width: "100%" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
            <div style={{ width: "32px", height: "1px", background: "#eab308" }} />
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.72rem", color: "#eab308", letterSpacing: "0.12em", textTransform: "uppercase" }}>
              Available for opportunities
            </span>
            <div className="pulse" style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#22c55e" }} />
          </div>

          <h1 style={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 800,
            fontSize: "clamp(2.8rem, 8vw, 5.5rem)",
            lineHeight: 1.0,
            letterSpacing: "-0.03em",
            color: "#fff",
            marginBottom: "8px",
          }}>
            Jesus
          </h1>
          <h1 className="glow-text" style={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 800,
            fontSize: "clamp(2.8rem, 8vw, 5.5rem)",
            lineHeight: 1.0,
            letterSpacing: "-0.03em",
            color: "#eab308",
            marginBottom: "24px",
          }}>
            Ban.
          </h1>

          <p style={{ fontSize: "1.1rem", color: "#7a8fa6", maxWidth: "520px", lineHeight: 1.7, marginBottom: "32px" }}>
            {data.summary}
          </p>

          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <button
              className="cta-btn"
              onClick={() => scrollTo("experience")}
              style={{
                background: "#eab308", color: "#080c14",
                border: "none", padding: "12px 28px",
                fontFamily: "'JetBrains Mono', monospace",
                fontWeight: 500, fontSize: "0.82rem",
                letterSpacing: "0.06em", borderRadius: "4px",
              }}
            >
              View Work
            </button>
            <button
              className="cta-btn"
              onClick={() => scrollTo("contact")}
              style={{
                background: "transparent", color: "#c8d6e5",
                border: "1px solid rgba(200,214,229,0.2)",
                padding: "12px 28px",
                fontFamily: "'JetBrains Mono', monospace",
                fontWeight: 500, fontSize: "0.82rem",
                letterSpacing: "0.06em", borderRadius: "4px",
              }}
            >
              Get In Touch
            </button>
          </div>

          {/* Stats */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
            gap: "1px",
            marginTop: "64px",
            border: "1px solid rgba(234,179,8,0.12)",
            borderRadius: "8px",
            overflow: "hidden",
            maxWidth: "600px",
          }}>
            {data.stats.map((s, i) => (
              <div key={i} style={{
                padding: "20px 16px",
                background: "rgba(234,179,8,0.03)",
                borderRight: i < data.stats.length - 1 ? "1px solid rgba(234,179,8,0.1)" : "none",
                textAlign: "center",
              }}>
                <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "1.6rem", color: "#eab308" }}>
                  {s.value}
                </div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.65rem", color: "#4a5c6e", letterSpacing: "0.08em", textTransform: "uppercase", marginTop: "4px" }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SKILLS */}
      <Section id="skills" style={{ padding: "80px 24px" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "48px" }}>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.72rem", color: "#eab308", letterSpacing: "0.1em" }}>02.</span>
            <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "clamp(1.6rem, 4vw, 2.2rem)", color: "#fff", letterSpacing: "-0.02em" }}>
              Skills & Stack
            </h2>
            <div style={{ flex: 1, height: "1px", background: "rgba(234,179,8,0.15)" }} />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "16px" }}>
            {Object.entries(data.skills).map(([cat, skills]) => (
              <div key={cat} className="card-hover" style={{
                border: "1px solid rgba(234,179,8,0.1)",
                borderRadius: "8px",
                padding: "20px",
                background: "rgba(234,179,8,0.02)",
              }}>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.68rem", color: "#eab308", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "12px" }}>
                  {cat}
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                  {skills.map(s => (
                    <span key={s} className="skill-pill" style={{
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      color: "#9ab0c4",
                      fontSize: "0.75rem",
                      padding: "4px 10px",
                      borderRadius: "3px",
                      fontFamily: "'JetBrains Mono', monospace",
                    }}>
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* EXPERIENCE */}
      <Section id="experience" style={{ padding: "80px 24px", background: "rgba(234,179,8,0.015)" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "48px" }}>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.72rem", color: "#eab308", letterSpacing: "0.1em" }}>03.</span>
            <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "clamp(1.6rem, 4vw, 2.2rem)", color: "#fff", letterSpacing: "-0.02em" }}>
              Experience
            </h2>
            <div style={{ flex: 1, height: "1px", background: "rgba(234,179,8,0.15)" }} />
          </div>

          <div style={{ borderLeft: "1px solid rgba(234,179,8,0.2)", paddingLeft: "32px", display: "flex", flexDirection: "column", gap: "40px" }}>
            {data.experience.map((job, i) => (
              <div
                key={i}
                className="timeline-dot"
                style={{
                  position: "relative",
                  border: "1px solid",
                  borderColor: hoveredJob === i ? "rgba(234,179,8,0.4)" : "rgba(234,179,8,0.1)",
                  borderRadius: "8px",
                  padding: "24px",
                  background: hoveredJob === i ? "rgba(234,179,8,0.04)" : "rgba(234,179,8,0.01)",
                  transition: "all 0.3s",
                  cursor: "default",
                }}
                onMouseEnter={() => setHoveredJob(i)}
                onMouseLeave={() => setHoveredJob(null)}
              >
                <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "8px", marginBottom: "8px" }}>
                  <div>
                    <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "1.1rem", color: "#fff" }}>{job.role}</span>
                    <span style={{ color: "#eab308", margin: "0 8px" }}>@</span>
                    <span style={{ color: "#eab308", fontWeight: 600 }}>{job.company}</span>
                  </div>
                  <Tag>{job.period}</Tag>
                </div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.68rem", color: "#4a5c6e", marginBottom: "16px", letterSpacing: "0.06em" }}>
                  📍 {job.location}
                </div>
                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "8px" }}>
                  {job.points.map((p, j) => (
                    <li key={j} style={{ display: "flex", gap: "10px", fontSize: "0.88rem", color: "#8a9db0", lineHeight: 1.6 }}>
                      <span style={{ color: "#eab308", flexShrink: 0, marginTop: "2px" }}>▸</span>
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* PROJECTS */}
      <Section id="projects" style={{ padding: "80px 24px" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "48px" }}>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.72rem", color: "#eab308", letterSpacing: "0.1em" }}>04.</span>
            <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "clamp(1.6rem, 4vw, 2.2rem)", color: "#fff", letterSpacing: "-0.02em" }}>
              Remarkable Projects
            </h2>
            <div style={{ flex: 1, height: "1px", background: "rgba(234,179,8,0.15)" }} />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            {data.projects.map((proj, i) => (
              <div key={i} className="card-hover" style={{
                border: "1px solid rgba(234,179,8,0.1)",
                borderRadius: "12px",
                overflow: "hidden",
                background: "rgba(234,179,8,0.01)",
              }}>
                {/* Top bar */}
                <div style={{
                  height: "3px",
                  background: `linear-gradient(90deg, ${proj.color}, transparent)`,
                }} />
                <div style={{ padding: "28px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "12px", marginBottom: "16px", alignItems: "flex-start" }}>
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
                        <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "1.3rem", color: "#fff" }}>
                          {proj.name}
                        </h3>
                        <span style={{
                          background: `${proj.color}18`,
                          border: `1px solid ${proj.color}40`,
                          color: proj.color,
                          fontSize: "0.65rem",
                          fontFamily: "'JetBrains Mono', monospace",
                          padding: "2px 8px",
                          borderRadius: "3px",
                          letterSpacing: "0.06em",
                          textTransform: "uppercase",
                        }}>{proj.tag}</span>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <span style={{ color: "#eab308", fontSize: "0.85rem", fontWeight: 600 }}>{proj.company}</span>
                        <span style={{ color: "#2a3a4a" }}>·</span>
                        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.68rem", color: "#4a5c6e" }}>{proj.year}</span>
                      </div>
                    </div>
                    <a href={proj.url} target="_blank" rel="noopener noreferrer" style={{
                      border: "1px solid rgba(234,179,8,0.2)",
                      color: "#eab308",
                      background: "transparent",
                      padding: "7px 16px",
                      borderRadius: "4px",
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: "0.72rem",
                      letterSpacing: "0.06em",
                      textDecoration: "none",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                      transition: "all 0.2s",
                      flexShrink: 0,
                    }}>
                      Visit ↗
                    </a>
                  </div>

                  <p style={{ color: "#7a8fa6", fontSize: "0.9rem", lineHeight: 1.7, marginBottom: "20px" }}>
                    {proj.description}
                  </p>

                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "8px", marginBottom: "20px" }}>
                    {proj.highlights.map((h, j) => (
                      <div key={j} style={{ display: "flex", gap: "8px", fontSize: "0.82rem", color: "#8a9db0", lineHeight: 1.5 }}>
                        <span style={{ color: proj.color, flexShrink: 0, marginTop: "1px" }}>◆</span>
                        {h}
                      </div>
                    ))}
                  </div>

                  <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                    {proj.stack.map(s => (
                      <span key={s} style={{
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(255,255,255,0.08)",
                        color: "#9ab0c4",
                        fontSize: "0.72rem",
                        padding: "3px 10px",
                        borderRadius: "3px",
                        fontFamily: "'JetBrains Mono', monospace",
                      }}>{s}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>


      <Section id="education" style={{ padding: "80px 24px" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "48px" }}>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.72rem", color: "#eab308", letterSpacing: "0.1em" }}>05.</span>
            <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "clamp(1.6rem, 4vw, 2.2rem)", color: "#fff", letterSpacing: "-0.02em" }}>
              Education
            </h2>
            <div style={{ flex: 1, height: "1px", background: "rgba(234,179,8,0.15)" }} />
          </div>

          <div className="card-hover" style={{
            border: "1px solid rgba(234,179,8,0.15)",
            borderRadius: "8px",
            padding: "32px",
            background: "rgba(234,179,8,0.02)",
            display: "flex",
            alignItems: "flex-start",
            gap: "24px",
            flexWrap: "wrap",
          }}>
            <div className="float" style={{
              width: "56px", height: "56px", borderRadius: "8px",
              background: "rgba(234,179,8,0.1)",
              border: "1px solid rgba(234,179,8,0.3)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "1.6rem", flexShrink: 0,
            }}>
              🎓
            </div>
            <div style={{ flex: 1 }}>
              <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "1.2rem", color: "#fff", marginBottom: "6px" }}>
                {data.education.degree}
              </h3>
              <div style={{ color: "#eab308", fontWeight: 600, marginBottom: "8px" }}>{data.education.school}</div>
              <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
                <Tag>{data.education.period}</Tag>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.68rem", color: "#4a5c6e", letterSpacing: "0.06em", alignSelf: "center" }}>
                  📍 {data.education.location}
                </span>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* CONTACT */}
      <Section id="contact" style={{ padding: "80px 24px 100px", background: "rgba(234,179,8,0.015)" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "48px" }}>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.72rem", color: "#eab308", letterSpacing: "0.1em" }}>06.</span>
            <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "clamp(1.6rem, 4vw, 2.2rem)", color: "#fff", letterSpacing: "-0.02em" }}>
              Contact
            </h2>
            <div style={{ flex: 1, height: "1px", background: "rgba(234,179,8,0.15)" }} />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "12px" }}>
            {[
              { icon: "✉️", label: "Email", value: data.email, href: `mailto:${data.email}` },
              { icon: "📍", label: "Location", value: data.location, href: null },
              { icon: "🐙", label: "GitHub", value: "github.com/jesus-ban", href: data.github },
            ].map((item, i) => (
              <a
                key={i}
                href={item.href || undefined}
                target={item.href && !item.href.startsWith("mailto") && !item.href.startsWith("tel") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="card-hover"
                style={{
                  border: "1px solid rgba(234,179,8,0.1)",
                  borderRadius: "8px",
                  padding: "20px",
                  background: "rgba(234,179,8,0.02)",
                  display: "flex", alignItems: "flex-start", gap: "12px",
                  textDecoration: "none",
                  cursor: item.href ? "pointer" : "default",
                }}
              >
                <span style={{ fontSize: "1.2rem" }}>{item.icon}</span>
                <div>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.65rem", color: "#4a5c6e", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "4px" }}>{item.label}</div>
                  <div style={{ color: "#9ab0c4", fontSize: "0.85rem" }}>{item.value}</div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </Section>

      {/* Footer */}
      <div style={{
        textAlign: "center", padding: "24px",
        borderTop: "1px solid rgba(234,179,8,0.08)",
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: "0.68rem",
        color: "#2a3a4a",
        letterSpacing: "0.08em",
      }}>
        JESUS BAN · HUELVA, SPAIN · {new Date().getFullYear()}
      </div>
    </div>
  );
}
