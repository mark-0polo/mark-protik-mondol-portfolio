import { useEffect, useCallback, useState } from 'react';
import './PortfolioApp.css';

/* ─── Utility: scramble-text animation ──────────────────────── */
const CHARSET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
function randomChar() { return CHARSET[Math.floor(Math.random() * CHARSET.length)]; }

function scrambleText(target, revealCount) {
  let output = '';
  for (let i = 0; i < target.length; i++) {
    const ch = target[i];
    if (ch === ' ' || ch === '&') output += ch;
    else if (i < revealCount) output += ch;
    else output += randomChar();
  }
  return output;
}

function animatePart(el, finalText, duration, delay = 0, reduceMotion) {
  return new Promise((resolve) => {
    if (reduceMotion) {
      el.textContent = finalText;
      el.style.cssText = 'transform:translate3d(0,0,0);filter:blur(0);opacity:1;';
      el.classList.remove('is-decoding');
      return resolve();
    }
    let startTime = null;
    const frame = (time) => {
      if (!startTime) startTime = time;
      const elapsed = time - startTime;
      if (elapsed < delay) { requestAnimationFrame(frame); return; }
      const activeTime = elapsed - delay;
      const progress = Math.min(activeTime / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const revealCount = Math.floor(finalText.length * eased);
      el.classList.add('is-decoding');
      el.textContent = scrambleText(finalText, revealCount);
      el.style.transform = `translate3d(0,${(1 - eased) * 3}px,0)`;
      el.style.filter = `blur(${Math.max(0, (1 - eased) * 0.35)}px)`;
      el.style.opacity = `${0.88 + eased * 0.12}`;
      if (progress < 1) { requestAnimationFrame(frame); return; }
      el.textContent = finalText;
      el.style.cssText = 'transform:translate3d(0,0,0);filter:blur(0);opacity:1;';
      el.classList.remove('is-decoding');
      resolve();
    };
    requestAnimationFrame(frame);
  });
}

/* ─── Smooth-scroll helper ───────────────────────────────────── */
function smoothScrollTo(targetId) {
  const el = document.getElementById(targetId);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

/* ─── Dark-mode SVGs ─────────────────────────────────────────── */
function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

/* ─── Sub-components ─────────────────────────────────────────── */

function MeshBackground() {
  return (
    <div className="mesh-bg" aria-hidden="true">
      <div className="blob blob-1" />
      <div className="blob blob-2" />
      <div className="blob blob-3" />
    </div>
  );
}

function FloatingNav({ onDownloadCV, theme, onToggleTheme }) {
  const handleNavLink = (e, targetId) => {
    e.preventDefault();
    smoothScrollTo(targetId);
  };

  return (
    <nav className="floating-nav" id="floatingNav" aria-label="Site navigation">
      {/* GitHub */}
      <a
        href="https://github.com/mark-0polo"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Visit GitHub profile"
      >
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
        </svg>
      </a>

      {/* LinkedIn */}
      <a
        href="https://www.linkedin.com/in/mark-protik-mondol"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Visit LinkedIn profile"
      >
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      </a>

      {/* Download CV */}
      <a
        href="assets/Mark-Protik-Mondol-CV.pdf"
        onClick={(e) => { e.preventDefault(); onDownloadCV(); }}
        aria-label="Download CV"
      >
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" />
        </svg>
      </a>

      {/* Dark / Light mode toggle */}
      <button
        className="nav-theme-btn"
        onClick={onToggleTheme}
        aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      >
        {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
      </button>
    </nav>
  );
}

function HeroSection() {
  return (
    <section className="hero">
      <div className="intro-box">
        <div className="signature-wrap">
          <img
            className="signature"
            alt="Mark Protik Mondol signature"
            src="assets/sig2.png"
            decoding="async"
          />
        </div>

        <h1 className="name">
          <span className="mark-orange">Mark </span>
          <span className="rest-name">Protik Mondol</span>
        </h1>

        <div className="role" id="heroRole" aria-label="Software Engineer & Researcher">
          <span className="role-part" data-final="Software">Software</span>
          <span className="role-part" data-final="Engineer">Engineer</span>
          <span className="role-part" data-final="& Researcher">&amp; Researcher</span>
        </div>

        <div className="contact">
          <div className="contact-item">
            <a href="tel:+8801759897069" className="contact-link" aria-label="Call Mark">
              <i className="fa-solid fa-phone" aria-hidden="true" />
            </a>
            <span className="contact-tooltip" role="tooltip">+880-1759897069</span>
          </div>
          <div className="contact-item">
            <a href="mailto:markprotik12@gmail.com" className="contact-link" aria-label="Email Mark">
              <i className="fa-solid fa-envelope" aria-hidden="true" />
            </a>
            <span className="contact-tooltip" role="tooltip">markprotik12@gmail.com</span>
          </div>
        </div>
      </div>

      <div className="scroll-arrow-wrapper" id="scrollArrowWrapper" aria-hidden="true">
        <div className="scroll-arrow">
          <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19" />
            <polyline points="19 12 12 19 5 12" />
          </svg>
        </div>
      </div>
    </section>
  );
}

function AboutSection() {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlipToggle = () => {
    setIsFlipped((prev) => !prev);
  };

  const handleCardClick = () => {
    if (window.matchMedia('(hover: none), (pointer: coarse)').matches) {
      handleFlipToggle();
    }
  };

  return (
    <section className="about-showcase">
      <article className="about-card reveal">
        <span className="eyebrow">About Me</span>
        <h2 className="about-title">
          What I do <span className="highlight">best?</span>
        </h2>
        <p className="about-text">
          I am Mark Protik Mondol, a software engineer and researcher focused on building
          intelligent, practical, and impactful digital solutions. My work combines software
          engineering, machine learning, computer vision, and research-driven problem solving
          to create systems that are efficient, modern, and meaningful.
        </p>
        <ul className="about-points">
          <li>Software engineering with strong problem-solving and system design skills</li>
          <li>Research experience in machine learning, computer vision, and green computing</li>
          <li>Hands-on work across AI models, predictive systems, and intelligent applications</li>
          <li>Focused on building solutions that balance usability, innovation, and performance</li>
        </ul>
      </article>

      <div className="about-photo-wrap reveal">
        <div
          className={`about-flip-card${isFlipped ? ' is-flipped' : ''}`}
          aria-label="Interactive profile card for Mark Protik Mondol"
          role="button"
          tabIndex={0}
          aria-pressed={isFlipped}
          onClick={handleCardClick}
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault();
              handleFlipToggle();
            }
          }}
        >
          <div className="about-flip-card-inner">
            <div className="about-flip-face about-flip-front">
              <img
                className="about-photo"
                src="assets/mark.png"
                alt="Portrait of Mark Protik Mondol"
                decoding="async"
                loading="lazy"
              />
              <div className="about-photo-overlay">
                <span className="about-photo-badge">Profile</span>
                <div className="about-photo-caption">
                  <strong>Mark Protik Mondol</strong>
                </div>
              </div>
            </div>

            <div className="about-flip-face about-flip-back">
              <div className="about-flip-back-glow about-flip-back-glow-primary" aria-hidden="true" />
              <div className="about-flip-back-glow about-flip-back-glow-secondary" aria-hidden="true" />
              <div className="about-flip-back-panel">
                <i className="fa-solid fa-brain about-flip-icon" aria-hidden="true" />
                <span className="about-photo-badge about-photo-badge-back">AI Engineer</span>
                <div className="about-flip-copy">
                  <strong>Research meets product thinking</strong>
                  <p>Software engineering, machine learning, and computer vision built for practical impact.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const EDUCATION_ITEMS = [
  {
    id: 'edu-university',
    title: 'University',
    name: 'United International University',
    subtitle: 'BSc in Computer Science & Engineering',
    meta: 'Academic Focus',
    detail: '2021 - 2025',
    icon: 'fa-solid fa-building-columns',
  },
  {
    id: 'edu-status',
    title: 'Current Status',
    name: 'Open to Work',
    subtitle: 'AI / ML / Software Engineering',
    meta: 'Working Status',
    detail: 'Available for full-time roles, internships, and collaborative research opportunities.',
    availability: 'ready',
    icon: 'fa-solid fa-briefcase',
  },
  {
    id: 'edu-college',
    title: 'College',
    name: 'Notre Dame College',
    subtitle: 'Science',
    meta: 'Academic Foundation',
    detail: '2018 - 2020',
    icon: 'fa-solid fa-school',
  },
];

function EducationSection() {
  return (
    <section className="education-section reveal" id="education" aria-labelledby="education-heading">
      <div className="section-title education-title">
        <p>Academic Profile</p>
        <h2 id="education-heading">Education &amp; Status</h2>
      </div>

      <div className="education-grid" role="list">
        {EDUCATION_ITEMS.map(({ id, title, name, subtitle, meta, detail, icon, availability }) => (
          <article key={id} className="education-card" role="listitem" aria-label={`${title}: ${name}`}>
            {availability ? (
              <span
                className={`work-status-dot ${availability}`}
                aria-label={availability === 'ready' ? 'Ready to work' : 'Currently working in a company'}
                title={availability === 'ready' ? 'Ready to work' : 'Currently working in a company'}
              />
            ) : null}
            <div className="education-logo" aria-hidden="true">
              <i className={icon} />
            </div>
            <div className="education-copy">
              <span className="education-kicker">{title}</span>
              <h3>{name}</h3>
              <p className="education-subtitle">{subtitle}</p>
              {detail ? <p className="education-detail">{detail}</p> : null}
              <span className="education-meta">{meta}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

const SKILLS = [
  { cls: 'ai', icon: 'fa-solid fa-brain', label: 'Artificial Intelligence' },
  { cls: 'ml', icon: 'fa-solid fa-robot', label: 'Machine Learning' },
  { cls: 'dl', icon: 'fa-solid fa-network-wired', label: 'Deep Learning' },
  { cls: 'data', icon: 'fa-solid fa-chart-line', label: 'Data Mining' },
  { cls: 'cv', icon: 'fa-solid fa-eye', label: 'Computer Vision' },
  { cls: 'hf', icon: 'fa-solid fa-face-smile', label: 'Hugging Face' },
  { cls: 'colab', icon: 'fa-solid fa-cloud', label: 'Google Colab' },
  { cls: 'kaggle', icon: 'fa-brands fa-kaggle', label: 'Kaggle' },
  { cls: 'roboflow', icon: 'fa-solid fa-camera', label: 'Roboflow' },
  { cls: 'python', icon: 'fa-brands fa-python', label: 'Python' },
  { cls: 'js', icon: 'fa-brands fa-js', label: 'JavaScript' },
  { cls: 'cpp', icon: 'fa-solid fa-code', label: 'C++' },
  { cls: 'php', icon: 'fa-brands fa-php', label: 'PHP' },
  { cls: 'docker', icon: 'fa-brands fa-docker', label: 'Docker' },
  { cls: 'linux', icon: 'fa-brands fa-linux', label: 'Linux' },
  { cls: 'mysql', icon: 'fa-solid fa-database', label: 'MySQL' },
  { cls: 'figma', icon: 'fa-brands fa-figma', label: 'Figma' },
];

function ExpertiseSection() {
  return (
    <section className="expertise-section reveal" aria-labelledby="expertise-heading">
      <div className="expertise-heading">
        <span className="expertise-kicker">What I Know</span>
        <h2 id="expertise-heading">Expertise</h2>
      </div>
      <div className="expertise-card">
        <div className="expertise-tags" role="list">
          {SKILLS.map(({ cls, icon, label }) => (
            <span key={cls} className={`skill-pill ${cls}`} role="listitem">
              <i className={icon} aria-hidden="true" />
              {' '}{label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

const PROJECTS = [
  {
    side: 'left',
    tag: 'Green Computing Research',
    title: 'Virtual Network Embedding',
    body: 'Authored "A Framework for Virtual Network Embedding in Modern Healthcare Infrastructures: Enhancing Privacy and Resource Optimization." This work focuses on efficient and secure resource allocation strategies.',
  },
  {
    side: 'right',
    tag: 'Green Computing & Data Science',
    title: 'Python vs. R: Energy Efficiency Analysis',
    body: 'Conducted a comprehensive energy consumption analysis comparing Python and R environments across diverse OS architectures (macOS, Linux, Windows). Evaluated the energy footprint and computational efficiency of various machine learning models on multiple datasets to benchmark and promote sustainable computing practices.',
  },
  {
    side: 'left',
    tag: 'Deep Learning & CV',
    title: 'Bengali Font Recognition System',
    body: 'Engineered a computer vision pipeline to classify 25 distinct Bengali font families. Built a custom synthetic dataset and benchmarked standard CNNs (ResNet-50, DenseNet-121, MobileNetV3, VGG) against a highly accurate proposed architecture leveraging ConvNeXt-Tiny combined with Supervised Contrastive Learning.',
  },
  {
    side: 'right',
    tag: 'Machine Learning & Computer Vision',
    title: 'Hardware Detection & Analysis',
    body: 'Engineered a custom image dataset spanning 24 distinct hardware classes to train and evaluate object detection models. Conducted an in-depth comparative study between YOLO architectures and various supervised and unsupervised learning algorithms to benchmark accuracy and computational efficiency.',
  },
  {
    side: 'left',
    tag: 'Software Development',
    title: 'Organet: Smart Task Organizer',
    body: 'Engineered a dynamic daily task management system designed to optimize productivity. The platform features automated priority-based reordering, intuitive status tracking, and a streamlined interface to help users efficiently manage and execute their most critical ongoing tasks.',
  },
];

function ProjectsSection() {
  return (
    <section className="projects-area" aria-labelledby="projects-heading">
      <div className="section-title">
        <p>Selected Work</p>
        <h2 id="projects-heading">Projects &amp; Research</h2>
      </div>
      <div className="divider" aria-hidden="true" />
      <div className="project-list">
        {PROJECTS.map(({ side, tag, title, body }) => (
          <article key={title} className={`project-card ${side} reveal`}>
            <span className="tag">{tag}</span>
            <h3>{title}</h3>
            <p>{body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

/* ─── Certificates Section ───────────────────────────────────── */
const CERTIFICATES = [
  {
    id: 'cert-1',
    title: 'Pandas for Data Analysis',
    issuer: 'Kaggle',
    date: '2025',
    icon: 'fa-solid fa-database',
    iconCls: 'cert-icon-data',
    verifyUrl: 'https://www.kaggle.com/learn/certification/markprotikmondol/pandas',
    label: 'Pandas',
  },
  {
    id: 'cert-2',
    title: 'Data Visualization with Python',
    issuer: 'Kaggle',
    date: '2025',
    icon: 'fa-solid fa-chart-pie',
    iconCls: 'cert-icon-data',
    verifyUrl: 'https://www.kaggle.com/learn/certification/markprotikmondol/data-visualization',
    label: 'Data Visualization',
  },
  {
    id: 'cert-3',
    title: 'LinkedIn 101',
    issuer: 'Grameenphone-Academy',
    date: '2026',
    icon: 'fa-brands fa-linkedin',
    iconCls: 'cert-icon-social',
    verifyUrl: 'https://www.grameenphone.academy/cert/3e29b6fd7f13',
    label: 'LinkedIn Profile Optimization',
  },
  {
    id: 'cert-4',
    title: 'Corporate Presentation Skills',
    issuer: 'Grameenphone-Academy',
    date: '2026',
    icon: 'fa-solid fa-person-chalkboard',
    iconCls: 'cert-icon-presentation',
    verifyUrl: 'https://www.grameenphone.academy/cert/045694b6a7e8',
    label: 'Presentation Skills',
  },
  {
    id: 'cert-5',
    title: 'Art of Communication',
    issuer: 'Grameenphone-Academy',
    date: '2026',
    icon: 'fa-solid fa-comments',
    iconCls: 'cert-icon-communication',
    verifyUrl: 'https://www.grameenphone.academy/cert/44d271bcde47',
    label: 'Communication Skills',
  },
  {
    id: 'cert-6',
    title: 'Smart CV',
    issuer: 'Grameenphone-Academy',
    date: '2026',
    icon: 'fa-solid fa-file-lines',
    iconCls: 'cert-icon-cv',
    verifyUrl: 'https://www.grameenphone.academy/cert/08e358f5cffa',
    label: 'CV Building · Personal Branding',
  },
  {
    id: 'cert-7',
    title: 'Tips & Techniques on Interview & Assessment Centre',
    issuer: 'Grameenphone-Academy',
    date: '2026',
    icon: 'fa-solid fa-user-check',
    iconCls: 'cert-icon-interview',
    verifyUrl: 'https://www.grameenphone.academy/cert/6e80a84e8c45',
    label: 'Interview · Assessment Centre',
  },
];

function CertificatesSection() {
  const STACK_DEPTH = 3;
  const [activeCert, setActiveCert] = useState(0);
  const totalCerts = CERTIFICATES.length;

  const getWrappedOffset = (index) => {
    const raw = index - activeCert;
    const candidates = [raw, raw - totalCerts, raw + totalCerts];
    return candidates.reduce((best, candidate) => (
      Math.abs(candidate) < Math.abs(best) ? candidate : best
    ), raw);
  };

  const moveCards = (direction) => {
    setActiveCert((prev) => (prev + direction + totalCerts) % totalCerts);
  };

  const getCardStyle = (index) => {
    const offset = getWrappedOffset(index);
    const limitedOffset = Math.max(-STACK_DEPTH, Math.min(STACK_DEPTH, offset));
    const isActive = limitedOffset === 0;
    const isHidden = Math.abs(offset) > STACK_DEPTH;
    const absOffset = Math.abs(limitedOffset);
    const x = limitedOffset * 124;
    const y = isActive ? -22 : 12 + absOffset * 14;
    const scaleY = isActive ? 1.04 : Math.max(0.74, 1 - absOffset * 0.09);
    const scaleX = isActive ? 1.12 : Math.max(0.88, 1 - absOffset * 0.04);
    const rotate = isActive ? 0 : limitedOffset * 3.8;
    const opacity = isHidden ? 0 : Math.max(0.25, 1 - absOffset * 0.22);

    return {
      zIndex: isActive ? 60 : 50 - Math.round(absOffset * 10),
      opacity,
      pointerEvents: isHidden ? 'none' : 'auto',
      transform: `translate3d(calc(-50% + ${x}px), calc(-50% + ${y}px), 0) rotate(${rotate}deg) scale3d(${scaleX}, ${scaleY}, 1)`,
    };
  };

  return (
    <section className="certs-section reveal" id="certificates" aria-labelledby="certs-heading">
      <div className="section-title">
        <p>Credentials</p>
        <h2 id="certs-heading">Certificates</h2>
      </div>

      <div className="cert-stack-shell">
        <div className="certs-rail-hint" aria-hidden="true">
          <span>Center card is active</span>
          <i className="fa-solid fa-arrows-left-right" />
        </div>

        <div className="cert-stack" aria-label="Stacked certificates deck">
          <button
            type="button"
            className="cert-nav cert-nav-prev"
            aria-label="Show previous certificate"
            onClick={() => moveCards(-1)}
          >
            <i className="fa-solid fa-chevron-left" aria-hidden="true" />
          </button>

          {CERTIFICATES.map(({ id, title, issuer, date, icon, iconCls, verifyUrl, label }, index) => {
            const isActive = index === activeCert;

            return (
              <article
                key={id}
                className={`cert-card cert-swipe-card${isActive ? ' is-active' : ''}`}
                aria-label={`${title} certificate from ${issuer}`}
                style={getCardStyle(index)}
                onClick={() => {
                  setActiveCert(index);
                }}
                role="button"
                tabIndex={0}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    setActiveCert(index);
                  }
                }}
              >
                <div className={`cert-icon-wrap ${iconCls}`}>
                  <i className={icon} aria-hidden="true" />
                </div>

                <div className="cert-body">
                  <span className="cert-label">{label}</span>
                  <h3 className="cert-title">{title}</h3>
                  <div className="cert-meta">
                    <span className="cert-issuer">
                      <i className="fa-solid fa-building-columns" aria-hidden="true" />
                      {issuer}
                    </span>
                    <span className="cert-date">
                      <i className="fa-regular fa-calendar" aria-hidden="true" />
                      {date}
                    </span>
                  </div>
                </div>

                <a
                  href={verifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cert-verify cert-verify-link"
                  aria-label={`Verify certificate: ${title} from ${issuer}`}
                  onClick={(event) => {
                    event.stopPropagation();
                  }}
                >
                  <span>Verify</span>
                  <i className="fa-solid fa-arrow-up-right-from-square" aria-hidden="true" />
                </a>
              </article>
            );
          })}

          <button
            type="button"
            className="cert-nav cert-nav-next"
            aria-label="Show next certificate"
            onClick={() => moveCards(1)}
          >
            <i className="fa-solid fa-chevron-right" aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
}

/* ─── Contact Section ────────────────────────────────────────── */
function ContactSection() {
  const [submitState, setSubmitState] = useState('idle');
  const [submitMessage, setSubmitMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    setSubmitState('submitting');
    setSubmitMessage('');

    try {
      const response = await fetch('https://formspree.io/f/xlgpyeyo', {
        method: 'POST',
        body: formData,
        headers: {
          Accept: 'application/json',
        },
      });

      if (response.ok) {
        form.reset();
        setSubmitState('success');
        setSubmitMessage('Message sent successfully. I will get back to you soon.');
        return;
      }

      let payload = null;
      try {
        payload = await response.json();
      } catch {
        payload = null;
      }

      const fallbackError = 'Message could not be sent right now. Please try again in a moment.';
      const apiError = payload?.errors?.[0]?.message;
      setSubmitState('error');
      setSubmitMessage(apiError || fallbackError);
    } catch {
      setSubmitState('error');
      setSubmitMessage('Network issue while sending the message. Please try again.');
    }
  };

  return (
    <section className="contact-section reveal" id="contact" aria-labelledby="contact-heading">
      <div className="contact-container">
        <div className="contact-panel">

          <div className="contact-copy">
            <span className="contact-kicker">Let's Connect</span>
            <h2 id="contact-heading">Have an idea, project, or research opportunity?</h2>
            <p>
              I'm open to AI, machine learning, software engineering, and research
              collaborations that create meaningful impact.
            </p>
            <div className="contact-links">
              <a href="mailto:markprotik12@gmail.com" className="contact-link-card">
                <i className="fa-solid fa-envelope" aria-hidden="true" />
                <span>markprotik12@gmail.com</span>
              </a>
              <a href="tel:+8801759897069" className="contact-link-card">
                <i className="fa-solid fa-phone" aria-hidden="true" />
                <span>+880-1759897069</span>
              </a>
              <a
                href="https://www.linkedin.com/in/mark-protik-mondol"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-link-card"
              >
                <i className="fa-brands fa-linkedin" aria-hidden="true" />
                <span>LinkedIn Profile</span>
              </a>
            </div>
          </div>

          <form
            className="contact-form compact-form"
            onSubmit={handleSubmit}
          >
            <div className="compact-grid">
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input type="text" id="name" name="name" placeholder="Your name" autoComplete="name" required />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" placeholder="Your email" autoComplete="email" required />
              </div>
              <div className="form-group full">
                <label htmlFor="subject">Subject</label>
                <input type="text" id="subject" name="subject" placeholder="Project, collaboration, or inquiry" required />
              </div>
              <div className="form-group full">
                <label htmlFor="message">Message</label>
                <textarea id="message" name="message" rows="5" placeholder="Tell me a little about your idea or message..." required />
              </div>
            </div>
            <button type="submit" className="contact-submit" disabled={submitState === 'submitting'}>
              <span>{submitState === 'submitting' ? 'Sending...' : 'Send Message'}</span>
              <i className="fa-solid fa-arrow-right" aria-hidden="true" />
            </button>
            {submitMessage ? (
              <p className={`form-feedback ${submitState === 'error' ? 'is-error' : 'is-success'}`} role="status" aria-live="polite">
                {submitMessage}
              </p>
            ) : null}
          </form>

        </div>
      </div>
    </section>
  );
}

function SiteFooter() {
  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    smoothScrollTo(targetId);
  };

  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-top">
          <div className="footer-brand">
            <h3>Mark Protik Mondol</h3>
            <p>AI Engineer · ML Researcher · Software Engineer</p>
          </div>
          <nav className="footer-links" aria-label="Footer navigation">
            <a href="#portfolio" onClick={(e) => handleNavClick(e, 'portfolio')}>Portfolio</a>
            <a href="#certificates" onClick={(e) => handleNavClick(e, 'certificates')}>Certificates</a>
            <a href="#contact" onClick={(e) => handleNavClick(e, 'contact')}>Contact</a>
            <a href="https://github.com/mark-0polo" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href="https://www.linkedin.com/in/mark-protik-mondol" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          </nav>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2026 Mark Protik Mondol. All rights reserved.</p>
          <p>Built with focus, research, and good design.</p>
        </div>
      </div>
    </footer>
  );
}

/* ─── Root App ───────────────────────────────────────────────── */
export default function App() {

  /* ── Dark mode state ───────────────────────────────────────── */
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem('theme') || 'light';
    } catch {
      return 'light';
    }
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try { localStorage.setItem('theme', theme); } catch { /* ignore */ }
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  }, []);

  /* ── CV download helper ────────────────────────────────────── */
  const downloadCV = useCallback(() => {
    const link = document.createElement('a');
    link.href = 'assets/Mark-Protik-Mondol-CV.pdf';
    link.download = 'Mark-Protik-Mondol-CV.pdf';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, []);

  /* ── All side-effects after mount ─────────────────────────── */
  useEffect(() => {

    /* 1. Scroll-reveal — unobserve after reveal to avoid repeat callbacks */
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          observer.unobserve(e.target);
        }
      }),
      { threshold: 0.18 },
    );
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

    /* 2. Scroll → --nav-p + scroll-arrow  (passive = no scroll blocking) */
    const updateScroll = () => {
      const scrollY = window.scrollY;
      const arrowWrapper = document.getElementById('scrollArrowWrapper');
      if (arrowWrapper) arrowWrapper.classList.toggle('hidden', scrollY > 50);
      if (window.innerWidth > 768) {
        const maxScroll = window.innerHeight * 0.65;
        const progress = Math.min(Math.max(scrollY / maxScroll, 0), 1);
        document.documentElement.style.setProperty('--nav-p', progress);
      }
    };
    window.addEventListener('scroll', updateScroll, { passive: true });
    window.addEventListener('resize', updateScroll, { passive: true });
    updateScroll();

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

    /* 3. Mouse follower — dot leads, ring trails */
    const cursor = document.getElementById('mouseFollower');
    const cursorRing = cursor?.querySelector('.mouse-follower-ring');
    const cursorDot = cursor?.querySelector('.mouse-follower-dot');
    const interactiveSelector = 'a, button, [role="button"], input, textarea, select, .project-card, .about-card, .about-flip-card, .cert-card, .contact-link, .skill-pill';
    let mouseX = window.innerWidth / 2, mouseY = window.innerHeight / 2;
    let dotX = mouseX, dotY = mouseY;
    let ringX = mouseX, ringY = mouseY;
    let inside = false, cursorRaf = null, cursorPaused = false;
    const DOT_SIZE = 9;
    const RING_SIZE = 34;

    const stepCursor = () => {
      dotX += (mouseX - dotX) * 0.35;
      dotY += (mouseY - dotY) * 0.35;
      ringX += (dotX - ringX) * 0.16;
      ringY += (dotY - ringY) * 0.16;

      if (cursorDot) {
        cursorDot.style.transform = `translate3d(${dotX - DOT_SIZE / 2}px,${dotY - DOT_SIZE / 2}px,0)`;
      }
      if (cursorRing) {
        cursorRing.style.transform = `translate3d(${ringX - RING_SIZE / 2}px,${ringY - RING_SIZE / 2}px,0)`;
      }
      if (!cursorPaused) cursorRaf = requestAnimationFrame(stepCursor);
    };

    const onVisibilityChange = () => {
      if (document.hidden) {
        cursorPaused = true;
        if (cursorRaf) { cancelAnimationFrame(cursorRaf); cursorRaf = null; }
      } else {
        cursorPaused = false;
        cursorRaf = requestAnimationFrame(stepCursor);
      }
    };

    const onMove = (e) => {
      mouseX = e.clientX; mouseY = e.clientY;
      if (!inside) { inside = true; cursor?.classList.add('active'); }
    };
    const onEnter = () => { inside = true; cursor?.classList.add('active'); };
    const onLeave = () => {
      inside = false;
      cursor?.classList.remove('active');
      cursor?.classList.remove('is-hovering');
    };
    const onHoverChange = (event) => {
      const target = event.target instanceof Element ? event.target.closest(interactiveSelector) : null;
      cursor?.classList.toggle('is-hovering', Boolean(target));
    };

    if (!prefersReducedMotion && isFinePointer && cursor && cursorRing && cursorDot) {
      window.addEventListener('mousemove', onMove, { passive: true });
      window.addEventListener('mouseenter', onEnter);
      window.addEventListener('mouseleave', onLeave);
      window.addEventListener('mouseover', onHoverChange, { passive: true });
      window.addEventListener('focusin', onHoverChange);
      document.addEventListener('visibilitychange', onVisibilityChange);
      cursorRaf = requestAnimationFrame(stepCursor);
    }

    /* 4. Magnetic skill pills — track all RAF IDs for clean teardown */
    const pillRafs = new Map();

    if (!prefersReducedMotion && isFinePointer) {
      const MAX_X = 10, MAX_Y = 8, RETURN_DUR = 180;

      document.querySelectorAll('.skill-pill').forEach((pill) => {
        let cx = 0, cy = 0, tx = 0, ty = 0, active = false;

        const render = () => {
          cx += (tx - cx) * 0.18;
          cy += (ty - cy) * 0.18;
          pill.style.transform = `translate3d(${cx}px,${cy}px,0)`;
          if (active || Math.abs(tx - cx) > 0.08 || Math.abs(ty - cy) > 0.08) {
            pillRafs.set(pill, requestAnimationFrame(render));
          } else {
            pill.style.transform = 'translate3d(0,0,0)';
            pillRafs.delete(pill);
          }
        };
        const startRender = () => {
          if (!pillRafs.has(pill)) pillRafs.set(pill, requestAnimationFrame(render));
        };

        pill.addEventListener('mouseenter', () => {
          active = true;
          pill.style.transitionDuration = '';
          pill.classList.add('is-magnetic');
          startRender();
        });
        pill.addEventListener('mousemove', (e) => {
          const r = pill.getBoundingClientRect();
          tx = ((e.clientX - r.left) / r.width - 0.5) * MAX_X;
          ty = ((e.clientY - r.top) / r.height - 0.5) * MAX_Y;
          startRender();
        }, { passive: true });
        pill.addEventListener('mouseleave', () => {
          active = false;
          pill.classList.remove('is-magnetic');
          tx = 0; ty = 0;
          pill.style.transitionDuration = `${RETURN_DUR}ms`;
          startRender();
        });
      });
    }

    /* 5. Role scramble animation */
    const heroRole = document.getElementById('heroRole');
    if (heroRole) {
      const parts = Array.from(heroRole.querySelectorAll('.role-part'));
      if (parts.length) {
        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        parts.forEach((part) => {
          const finalText = part.dataset.final || part.textContent || '';
          const orig = part.textContent;
          part.textContent = finalText;
          const w = Math.ceil(part.getBoundingClientRect().width);
          part.style.width = part.style.minWidth = part.style.maxWidth = `${w}px`;
          part.textContent = orig;
        });
        Promise.all([
          animatePart(parts[0], parts[0].dataset.final || 'Software', 2300, 0, reduceMotion),
          animatePart(parts[1], parts[1].dataset.final || 'Engineer', 2500, 180, reduceMotion),
          animatePart(parts[2], parts[2].dataset.final || '& Researcher', 2700, 360, reduceMotion),
        ]).catch(() => { });
      }
    }

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', updateScroll);
      window.removeEventListener('resize', updateScroll);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseenter', onEnter);
      window.removeEventListener('mouseleave', onLeave);
      window.removeEventListener('mouseover', onHoverChange);
      window.removeEventListener('focusin', onHoverChange);
      document.removeEventListener('visibilitychange', onVisibilityChange);
      if (cursorRaf) cancelAnimationFrame(cursorRaf);
      pillRafs.forEach((id) => cancelAnimationFrame(id));
      pillRafs.clear();
    };
  }, []);

  return (
    <>
      <MeshBackground />
      <div className="mouse-follower" id="mouseFollower" aria-hidden="true">
        <span className="mouse-follower-ring" />
        <span className="mouse-follower-dot" />
      </div>

      <FloatingNav onDownloadCV={downloadCV} theme={theme} onToggleTheme={toggleTheme} />
      <HeroSection />

      <section className="portfolio" id="portfolio" aria-label="Portfolio content">
        <div className="portfolio-shell">
          <AboutSection />
          <EducationSection />
          <ExpertiseSection />
          <ProjectsSection />
          <CertificatesSection />
        </div>
      </section>

      <ContactSection />
      <SiteFooter />
    </>
  );
}
