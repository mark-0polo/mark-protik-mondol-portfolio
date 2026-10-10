import { useEffect, useState } from "react";
import {
  ArrowDown,
  ArrowUpRight,
  Check,
  Copy,
  Download,
  FileText,
  Mail,
  MapPin,
  Menu,
  Moon,
  Phone,
  Send,
  Sun,
  X,
  LoaderCircle,
} from "lucide-react";
import {
  IconGithubSocial,
  IconLinkedinSocial,
} from "./components/portfolio/Navbar";
import {
  CERTIFICATES_DATA,
  EDUCATION_DATA,
  PROJECTS_DATA,
  type ProjectItem,
} from "./data/portfolioData";
import { SKILLS_LIST } from "./components/portfolio/Skills";
import {
  Cursor,
  Dialog,
  Magnetic,
  Reveal,
  ScrollRail,
  SmoothScroll,
  Tilt,
  asset,
} from "./components/craft/Interactions";
import { ProjectArt, ProjectGlyph } from "./components/craft/ProjectArt";

export const PROJECT_META = [
  {
    name: "CMKLightUnet",
    category: "Medical AI",
    group: "Research",
    color: "#f38b45",
    summary:
      "Lighter architectures. Sharper segmentation. Mamba and KAN meet medical vision.",
  },
  {
    name: "Document Intelligence",
    category: "Document AI",
    group: "Research",
    color: "#f2543d",
    summary:
      "From pixels to structure. A pipeline for layout parsing, OCR, and font recognition.",
  },
  {
    name: "Organet",
    category: "Full-stack software",
    group: "Software",
    color: "#8d55ff",
    summary:
      "A little more order. Role-based projects, priorities, and task management.",
  },
  {
    name: "Eid Card Studio",
    category: "Creative tools",
    group: "Software",
    color: "#f0a600",
    summary:
      "Make a greeting your own. Live previews, custom typography, and one-click export.",
  },
  {
    name: "Green Computing",
    category: "Data science",
    group: "Research",
    color: "#10a68a",
    summary:
      "What does a model cost the planet? Exploring energy use across Python and R.",
  },
  {
    name: "Bengali Type Vision",
    category: "Deep learning",
    group: "Research",
    color: "#e33291",
    summary:
      "Teaching machines to read the details. Recognizing 25 Bengali font families.",
  },
  {
    name: "Hardware Vision",
    category: "Object detection",
    group: "Research",
    color: "#79b51c",
    summary:
      "Finding the things that build things. A custom dataset with 24 hardware classes.",
  },
];
const SECTIONS = [
  { id: "home", label: "Home" },
  { id: "projects", label: "Work" },
  { id: "about", label: "About" },
  { id: "expertise", label: "Skills" },
  { id: "education", label: "Education" },
  { id: "certificates", label: "Certificates" },
  { id: "contact", label: "Contact" },
];
const EMAIL = "markprotik12@gmail.com";
const Github = ({ size = 16 }: { size?: number }) => (
  <IconGithubSocial width={size} height={size} />
);
const Linkedin = ({ size = 16 }: { size?: number }) => (
  <IconLinkedinSocial width={size} height={size} />
);
type Preview =
  | { type: "cv" }
  | { type: "project"; index: number }
  | { type: "certificate"; index: number }
  | null;

function SectionLabel({
  number,
  title,
  note,
}: {
  number: string;
  title: string;
  note: string;
}) {
  return (
    <div className="section-label">
      <span>
        {number} / {title}
      </span>
      <span>{note}</span>
    </div>
  );
}
function ProjectCard({
  project,
  index,
  onOpen,
}: {
  project: ProjectItem;
  index: number;
  onOpen: () => void;
}) {
  const meta = PROJECT_META[index];
  return (
    <Reveal
      className="project-cell"
      style={{ "--project-color": meta.color } as React.CSSProperties}
    >
      <button
        className="project-card"
        onClick={onOpen}
        data-cursor="view"
        aria-label={`Explore ${meta.name}`}
      >
        <div className="project-top">
          <span className="project-number">0{index + 1}</span>
          <span>{meta.category}</span>
        </div>
        <div className="project-art">
          <ProjectArt index={index} />
        </div>
        <div className="project-copy">
          <span className="project-icon">
            <ProjectGlyph index={index} />
          </span>
          <h3>{meta.name}</h3>
          <p>{meta.summary}</p>
          <div className="tags">
            <span className="status-tag">{meta.group}</span>
            {project.tech.slice(0, 3).map((tech) => (
              <span key={tech}>{tech}</span>
            ))}
          </div>
          <span className="explore-link">
            Explore project <ArrowUpRight size={15} />
          </span>
        </div>
      </button>
    </Reveal>
  );
}

export default function PortfolioApp() {
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    try {
      return localStorage.getItem("theme") === "light" ? "light" : "dark";
    } catch {
      return "dark";
    }
  });
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("home");
  const [filter, setFilter] = useState("All work");
  const [preview, setPreview] = useState<Preview>(null);
  const [showAllCertificates, setShowAllCertificates] = useState(false);
  const [copyState, setCopyState] = useState("Copy email");
  const [submitState, setSubmitState] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const [submitMessage, setSubmitMessage] = useState("");
  const [zoom, setZoom] = useState(100);
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem("theme", theme);
    } catch {
      /* Storage may be unavailable. */
    }
  }, [theme]);
  useEffect(() => {
    const update = () => {
      const current = [...SECTIONS].reverse().find((section) => {
        const element = document.getElementById(section.id);
        return (
          element &&
          element.getBoundingClientRect().top <= window.innerHeight * 0.32
        );
      });
      setActive(current?.id ?? "home");
    };
    let frame = 0;
    const onScroll = () => {
      if (!frame)
        frame = requestAnimationFrame(() => {
          update();
          frame = 0;
        });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);
  useEffect(() => {
    if (copyState === "Copy email") return;
    const timer = setTimeout(() => setCopyState("Copy email"), 2400);
    return () => clearTimeout(timer);
  }, [copyState]);
  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopyState("Email copied");
    } catch {
      setCopyState("Use email link");
    }
  }
  async function submitContact(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitState === "sending") return;
    const form = event.currentTarget;
    setSubmitState("sending");
    setSubmitMessage("");
    try {
      const response = await fetch("https://formspree.io/f/xlgpyeyo", {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
        signal: AbortSignal.timeout(20000),
      });
      if (!response.ok) {
        const payload = await response.json().catch(() => null);
        throw new Error(
          payload?.errors?.[0]?.message ||
            "Could not send your message. Please try again or email me directly.",
        );
      }
      setSubmitState("success");
      setSubmitMessage("Message sent. Thank you — I’ll get back to you soon.");
      form.reset();
    } catch (error) {
      setSubmitState("error");
      setSubmitMessage(
        error instanceof Error &&
          error.name !== "TimeoutError" &&
          error.name !== "TypeError"
          ? error.message
          : "Connection unavailable. Please try again or email me directly.",
      );
    }
  }
  return (
    <>
      <SmoothScroll />
      <Cursor />
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="site-header">
        <a
          className="monogram"
          href="#home"
          aria-label="Mark Protik Mondol home"
        >
          <svg viewBox="0 0 36 32" aria-hidden="true">
            <path
              d="M2 28 10 4h6l3 13L29 4h5l-8 24h-6l5-15-8 12h-4l-3-12-5 15Z"
              fill="currentColor"
            />
          </svg>
        </a>
        <nav
          className={`main-nav ${menuOpen ? "is-open" : ""}`}
          id="main-navigation"
          aria-label="Main navigation"
        >
          {SECTIONS.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              aria-label={section.label}
              aria-current={active === section.id ? "location" : undefined}
              onClick={() => setMenuOpen(false)}
            >
              <span>{section.label}</span>
            </a>
          ))}
        </nav>
        <div className="header-actions">
          <a
            className="icon-button social-header"
            href="https://github.com/mark-0polo"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub profile"
          >
            <Github size={17} />
          </a>
          <button
            className="icon-button theme-toggle"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
          >
            {theme === "light" ? <Moon size={17} /> : <Sun size={17} />}
          </button>
          <button
            className="header-cv"
            onClick={() => {
              setZoom(100);
              setPreview({ type: "cv" });
            }}
          >
            View CV <ArrowUpRight size={14} />
          </button>
          <button
            className="icon-button menu-toggle"
            aria-expanded={menuOpen}
            aria-controls="main-navigation"
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>
      <div className="left-rail" aria-hidden="true">
        <span>MPM / PORTFOLIO</span>
        <span>EST. IN CURIOSITY</span>
      </div>
      <ScrollRail active={active} sections={SECTIONS} />
      <main className="page-frame" id="main">
        <section id="home" className="hero-section">
          <SectionLabel
            number="01"
            title="Mark Protik Mondol"
            note="Research · Code · Curiosity"
          />
          <div className="hero-body">
            <Reveal className="hero-copy t-stagger">
              <div className="eyebrow t-stagger-line">
                <span className="availability-dot" /> Open to work &
                collaboration
              </div>
              <h1 className="t-stagger-line t-stagger-line--2">
                Mark Protik
                <br />
                <span>Mondol.</span>
              </h1>
              <p className="hero-role t-stagger-line t-stagger-line--3">
                AI researcher.
                <br />
                Computer vision engineer.
              </p>
              <p className="hero-description t-stagger-line t-stagger-line--4">
                Turning complex ideas into intelligent systems. Exploring neural
                architectures, deep learning, and the possibilities hiding in
                pixels.
              </p>
              <div className="hero-buttons t-stagger-line t-stagger-line--5">
                <Magnetic>
                  <a className="button button-solid" href="#projects">
                    Explore my work <ArrowDown size={15} />
                  </a>
                </Magnetic>
                <Magnetic>
                  <a className="button" href="#contact">
                    Let’s talk <ArrowUpRight size={15} />
                  </a>
                </Magnetic>
              </div>
              <div className="hero-socials t-stagger-line t-stagger-line--6">
                <a
                  href="https://github.com/mark-0polo"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Github size={14} /> GitHub <ArrowUpRight size={12} />
                </a>
                <a
                  href="https://www.linkedin.com/in/mark-protik-mondol"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Linkedin size={14} /> LinkedIn <ArrowUpRight size={12} />
                </a>
                <span>
                  <MapPin size={13} /> Bangladesh
                </span>
              </div>
            </Reveal>
            <Reveal className="hero-visual">
              <Tilt className="signature-tilt">
                <div className="signature-panel">
                  <div className="signature-caption">
                    <span>A PERSONAL MARK</span>
                    <span>01 / MPM</span>
                  </div>
                  <div className="signature-stage">
                    <img
                      src={asset("assets/sig2.png")}
                      alt="Mark Protik Mondol’s handwritten signature"
                      className="signature"
                      width="1280"
                      height="853"
                    />
                    <span
                      className="signature-cross signature-cross--top"
                      aria-hidden="true"
                    >
                      +
                    </span>
                    <span
                      className="signature-cross signature-cross--bottom"
                      aria-hidden="true"
                    >
                      +
                    </span>
                  </div>
                  <div className="signature-footer">
                    <span className="signature-name">
                      Mark Protik
                      <br />
                      <strong>Mondol.</strong>
                    </span>
                    <span>
                      Always learning.
                      <br />
                      Always building.
                    </span>
                  </div>
                </div>
              </Tilt>
            </Reveal>
          </div>
        </section>
        <section id="projects">
          <SectionLabel
            number="02"
            title="Selected work"
            note="Pick a project to explore"
          />
          <div className="work-intro">
            <Reveal>
              <h2>
                Ideas made <span className="accent-text">real.</span>
              </h2>
              <p>From experimental architectures to tools you can use.</p>
            </Reveal>
            <div
              className="filter-tabs"
              role="group"
              aria-label="Filter projects"
            >
              {["All work", "Research", "Software"].map((tab) => (
                <button
                  key={tab}
                  className={filter === tab ? "is-active" : ""}
                  aria-pressed={filter === tab}
                  onClick={() => setFilter(tab)}
                >
                  {tab}
                  <span>
                    {tab === "All work"
                      ? "07"
                      : tab === "Research"
                        ? "05"
                        : "02"}
                  </span>
                </button>
              ))}
            </div>
          </div>
          <div className="project-grid">
            {PROJECTS_DATA.map((project, index) =>
              filter === "All work" || PROJECT_META[index].group === filter ? (
                <ProjectCard
                  key={project.title}
                  project={project}
                  index={index}
                  onOpen={() => setPreview({ type: "project", index })}
                />
              ) : null,
            )}
            <Reveal className="next-project">
              <span className="eyebrow">NEXT UP</span>
              <h3>
                Something
                <br />
                <span className="accent-text">we build together.</span>
              </h3>
              <p>
                Have an interesting problem, a research idea, or a role in mind?
              </p>
              <a className="text-link" href="#contact">
                Let’s make it happen <ArrowUpRight size={16} />
              </a>
              <span className="next-cross" aria-hidden="true">
                +
              </span>
            </Reveal>
          </div>
        </section>
        <section id="about">
          <SectionLabel
            number="03"
            title="The approach"
            note="Vision, grounded in research"
          />
          <div className="about-grid">
            <Reveal className="about-heading">
              <span className="eyebrow">BEHIND THE WORK</span>
              <h2>
                Driven by vision.
                <br />
                Grounded in <span className="accent-text">neural design.</span>
              </h2>
              <div className="about-degree">
                <span>BSc / CSE</span>
                <p>United International University</p>
              </div>
            </Reveal>
            <Reveal className="about-copy">
              <p className="lead">
                I’m an AI researcher and computer vision engineer working at the
                intersection of deep learning and intelligent vision systems.
              </p>
              <p>
                My research explores Kolmogorov-Arnold Networks, Mamba state
                space models, Transformers, CNNs, RNNs, encoder-decoder
                structures, and U-Net variants for medical segmentation and
                visual recognition.
              </p>
              <p>
                I also build software around the research: clean interfaces and
                practical tools that make intelligent systems useful.
              </p>
              <a className="text-link" href="#contact">
                Open to roles and research collaborations{" "}
                <ArrowUpRight size={16} />
              </a>
            </Reveal>
          </div>
          <div className="principles-grid">
            {[
              {
                title: "Question the architecture.",
                body: "Explore how a model works, where it struggles, and what a better design could make possible.",
              },
              {
                title: "See the details.",
                body: "From medical images to Bengali typography, the smallest visual signals deserve attention.",
              },
              {
                title: "Build beyond the notebook.",
                body: "Connect the experiment to usable software, thoughtful interfaces, and real-world workflows.",
              },
            ].map((item, i) => (
              <Reveal key={item.title} className="principle">
                <span className="eyebrow">0{i + 1}</span>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </Reveal>
            ))}
          </div>
        </section>
        <section id="expertise">
          <SectionLabel
            number="04"
            title="The toolkit"
            note="Tools of the trade"
          />
          <div className="section-intro">
            <Reveal>
              <h2>
                Curiosity, <span className="accent-text">equipped.</span>
              </h2>
              <p>The languages, frameworks, and tools behind the work.</p>
            </Reveal>
          </div>
          <div className="skills-grid">
            {SKILLS_LIST.map((skill, index) => (
              <Reveal key={skill.label} className="skill-cell">
                <span className="skill-index">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <skill.icon className="skill-icon" aria-hidden="true" />
                <span>{skill.label}</span>
                <span className="skill-plus" aria-hidden="true">
                  +
                </span>
              </Reveal>
            ))}
          </div>
        </section>
        <section id="education">
          <SectionLabel
            number="05"
            title="The foundation"
            note="Learning never stops"
          />
          <div className="education-grid">
            {EDUCATION_DATA.map((item, index) => (
              <Reveal key={item.id} className="education-cell">
                <div className="education-top">
                  <span className="eyebrow">{item.title}</span>
                  <span>
                    {index === 1 ? (
                      <span className="availability-dot" />
                    ) : (
                      item.detail
                    )}
                  </span>
                </div>
                <h3>{item.name}</h3>
                <p>{item.subtitle}</p>
                <span className="education-note">
                  {index === 1 ? item.detail : item.meta}
                </span>
              </Reveal>
            ))}
          </div>
        </section>
        <section id="certificates">
          <SectionLabel
            number="06"
            title="Continuous learning"
            note="12 certificates · credential links"
          />
          <div className="section-intro">
            <Reveal>
              <h2>
                Keep learning.
                <br />
                <span className="accent-text">Keep moving.</span>
              </h2>
              <p>Training across AI, data, cybersecurity, and communication.</p>
            </Reveal>
          </div>
          <div className="certificate-grid">
            {CERTIFICATES_DATA.slice(
              0,
              showAllCertificates ? undefined : 6,
            ).map((certificate, index) => (
              <Reveal key={certificate.id} className="certificate-cell">
                <button
                  onClick={() => setPreview({ type: "certificate", index })}
                  aria-label={`View certificate: ${certificate.title}`}
                  data-cursor="view"
                >
                  <span className="certificate-logo">
                    {certificate.image ? (
                      <img
                        src={asset(certificate.image)}
                        alt=""
                        width="48"
                        height="48"
                        loading="lazy"
                      />
                    ) : (
                      <FileText size={25} />
                    )}
                  </span>
                  <span className="certificate-info">
                    <small>
                      {certificate.issuer} / {certificate.date}
                    </small>
                    <strong>{certificate.title}</strong>
                    <span>{certificate.label}</span>
                  </span>
                  <ArrowUpRight size={18} />
                </button>
              </Reveal>
            ))}
          </div>
          <div className="certificate-more">
            <button
              className="button"
              onClick={() => setShowAllCertificates(!showAllCertificates)}
              aria-expanded={showAllCertificates}
            >
              {showAllCertificates
                ? "Show fewer certificates"
                : "View all 12 certificates"}{" "}
              <span>{showAllCertificates ? "−" : "+"}</span>
            </button>
          </div>
        </section>
        <section id="contact">
          <SectionLabel
            number="07"
            title="Your move"
            note="Good things start with a conversation"
          />
          <div className="contact-grid">
            <Reveal className="contact-copy">
              <span className="eyebrow">
                <span className="availability-dot" /> OPEN TO WHAT’S NEXT
              </span>
              <h2>
                Let’s build
                <br />
                <span className="accent-text">something good.</span>
              </h2>
              <p>
                AI / ML engineering. Software development. Collaborative
                research. I’m open to full-time roles, internships, and
                interesting ideas.
              </p>
              <a className="contact-email" href={`mailto:${EMAIL}`}>
                {EMAIL}
                <ArrowUpRight size={22} />
              </a>
              <div className="contact-links">
                <a href="tel:+8801759897069">
                  <Phone size={14} /> +880 1759897069
                </a>
                <button onClick={copyEmail}>
                  {copyState === "Email copied" ? (
                    <Check size={14} />
                  ) : (
                    <Copy size={14} />
                  )}{" "}
                  {copyState}
                </button>
              </div>
              <div className="contact-socials">
                <a
                  href="https://github.com/mark-0polo"
                  target="_blank"
                  rel="noreferrer"
                >
                  GitHub <ArrowUpRight size={14} />
                </a>
                <a
                  href="https://www.linkedin.com/in/mark-protik-mondol"
                  target="_blank"
                  rel="noreferrer"
                >
                  LinkedIn <ArrowUpRight size={14} />
                </a>
              </div>
              <span className="sr-only" role="status">
                {copyState === "Email copied"
                  ? "Email address copied to clipboard."
                  : ""}
              </span>
            </Reveal>
            <Reveal className="contact-form-wrap">
              <form onSubmit={submitContact} className="contact-form">
                <div className="form-heading">
                  <span className="eyebrow">SEND A NOTE</span>
                  <Mail size={18} />
                </div>
                <div className="form-row">
                  <label>
                    Your name
                    <input
                      name="name"
                      autoComplete="name"
                      required
                      placeholder="How should I call you?"
                      maxLength={120}
                    />
                  </label>
                  <label>
                    Email address
                    <input
                      type="email"
                      name="email"
                      autoComplete="email"
                      required
                      placeholder="you@example.com"
                    />
                  </label>
                </div>
                <label>
                  What’s on your mind?
                  <input
                    name="subject"
                    required
                    placeholder="A role, a collaboration, an idea…"
                    maxLength={200}
                  />
                </label>
                <label>
                  Your message
                  <textarea
                    name="message"
                    required
                    rows={4}
                    placeholder="Tell me a little about it."
                    maxLength={5000}
                  />
                </label>
                <button
                  className="button button-solid send-button"
                  disabled={submitState === "sending"}
                  type="submit"
                >
                  {submitState === "sending"
                    ? "Sending your note…"
                    : "Send message"}
                  {submitState === "sending" ? (
                    <LoaderCircle size={16} className="spinner" />
                  ) : (
                    <Send size={15} />
                  )}
                </button>
                <p
                  className="form-status"
                  role="status"
                  data-state={submitState}
                >
                  {submitMessage ||
                    "Delivered to my inbox. I’ll reply by email."}
                </p>
              </form>
            </Reveal>
          </div>
        </section>
        <footer>
          <a className="footer-brand" href="#home">
            Mark Protik Mondol<span>Research. Build. Repeat.</span>
          </a>
          <div>
            <span>© {new Date().getFullYear()} Mark Protik Mondol</span>
            <a href="#home">
              Back to top <ArrowUpRight size={14} />
            </a>
          </div>
        </footer>
      </main>
      {preview && (
        <Dialog
          title={
            preview.type === "cv"
              ? "Curriculum vitae"
              : preview.type === "project"
                ? PROJECT_META[preview.index].name
                : "Certificate details"
          }
          onDismiss={() => setPreview(null)}
          wide={preview.type === "cv"}
        >
          {preview.type === "cv" ? (
            <>
              <div className="cv-toolbar">
                <span>Mark Protik Mondol</span>
                <div>
                  <button
                    aria-label="Zoom out"
                    onClick={() => setZoom(Math.max(70, zoom - 10))}
                  >
                    −
                  </button>
                  <button aria-label="Reset zoom" onClick={() => setZoom(100)}>
                    {zoom}%
                  </button>
                  <button
                    aria-label="Zoom in"
                    onClick={() => setZoom(Math.min(180, zoom + 10))}
                  >
                    +
                  </button>
                  <a
                    className="button button-solid"
                    href={asset("assets/M-CV.pdf")}
                    download="Mark-Protik-Mondol-CV.pdf"
                  >
                    <Download size={14} /> Download PDF
                  </a>
                </div>
              </div>
              <div className="cv-viewer">
                <img
                  src={asset("assets/cv-page-1.png")}
                  alt="Mark Protik Mondol curriculum vitae"
                  style={{ width: `${zoom}%`, maxWidth: "none" }}
                />
              </div>
            </>
          ) : preview.type === "project" ? (
            <div
              className="project-detail"
              style={
                {
                  "--project-color": PROJECT_META[preview.index].color,
                } as React.CSSProperties
              }
            >
              <ProjectArt index={preview.index} />
              <span className="eyebrow">
                {PROJECT_META[preview.index].category} /{" "}
                {PROJECT_META[preview.index].group}
              </span>
              <h3>{PROJECTS_DATA[preview.index].title}</h3>
              <p>{PROJECTS_DATA[preview.index].body}</p>
              <div className="tags">
                {PROJECTS_DATA[preview.index].tech.map((tech) => (
                  <span key={tech}>{tech}</span>
                ))}
              </div>
              <div className="detail-actions">
                {PROJECTS_DATA[preview.index].githubUrl && (
                  <a
                    className="button button-solid"
                    href={PROJECTS_DATA[preview.index].githubUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Github size={15} /> View source <ArrowUpRight size={14} />
                  </a>
                )}
                <a
                  className="button"
                  href={`mailto:${EMAIL}?subject=${encodeURIComponent(`Let’s talk about ${PROJECT_META[preview.index].name}`)}`}
                >
                  Discuss this project <ArrowUpRight size={14} />
                </a>
              </div>
            </div>
          ) : (
            <div className="certificate-detail">
              <div className="certificate-artwork">
                {CERTIFICATES_DATA[preview.index].image ? (
                  <img
                    src={asset(CERTIFICATES_DATA[preview.index].image!)}
                    alt={`${CERTIFICATES_DATA[preview.index].issuer} credential artwork`}
                    decoding="sync"
                  />
                ) : (
                  <div className="certificate-artwork-fallback">
                    <FileText size={64} strokeWidth={1.2} aria-hidden="true" />
                    <span>{CERTIFICATES_DATA[preview.index].issuer}</span>
                  </div>
                )}
              </div>
              <span className="eyebrow">
                {CERTIFICATES_DATA[preview.index].issuer} /{" "}
                {CERTIFICATES_DATA[preview.index].date}
              </span>
              <h3>{CERTIFICATES_DATA[preview.index].title}</h3>
              <p>{CERTIFICATES_DATA[preview.index].label}</p>
              <a
                className="button button-solid"
                href={CERTIFICATES_DATA[preview.index].verifyUrl}
                target="_blank"
                rel="noreferrer"
              >
                Verify credential <ArrowUpRight size={16} />
              </a>
            </div>
          )}
        </Dialog>
      )}
    </>
  );
}
