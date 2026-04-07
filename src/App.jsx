import { useEffect, useCallback, useRef, useState } from 'react';
import './App.css';

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
            style={{ width: '350px', height: 'auto' }}
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
        <div className="about-flip-card" aria-label="Interactive profile card for Mark Protik Mondol">
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
  const STACK_DEPTH = 2;
  const DRAG_THRESHOLD = 84;
  const DRAG_START_DISTANCE = 8;
  const SWAP_DURATION = 340;
  const [activeCert, setActiveCert] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDeckExpanded, setIsDeckExpanded] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isSwapping, setIsSwapping] = useState(false);
  const [swipeDirection, setSwipeDirection] = useState(0);
  const dragRef = useRef({
    active: false,
    pointerId: null,
    startX: 0,
    delta: 0,
    moved: false,
  });
  const suppressClickRef = useRef(false);
  const dragOffsetRef = useRef(0);
  const dragRafRef = useRef(null);
  const swapTimerRef = useRef(null);
  const totalCerts = CERTIFICATES.length;

  useEffect(() => () => {
    if (dragRafRef.current) cancelAnimationFrame(dragRafRef.current);
    if (swapTimerRef.current) window.clearTimeout(swapTimerRef.current);
  }, []);

  const setDragOffsetSmooth = (nextOffset) => {
    dragOffsetRef.current = nextOffset;
    if (dragRafRef.current) return;

    dragRafRef.current = requestAnimationFrame(() => {
      dragRafRef.current = null;
      setDragOffset(dragOffsetRef.current);
    });
  };

  const getWrappedOffset = (index) => {
    const raw = index - activeCert;
    const candidates = [raw, raw - totalCerts, raw + totalCerts];
    return candidates.reduce((best, candidate) => (
      Math.abs(candidate) < Math.abs(best) ? candidate : best
    ), raw);
  };

  const finishDrag = (event, index) => {
    const drag = dragRef.current;
    if (index !== activeCert || !drag.active) return;
    if (event?.pointerId !== undefined && drag.pointerId !== event.pointerId) return;

    const shouldAdvance = drag.moved && Math.abs(drag.delta) > DRAG_THRESHOLD;
    const direction = drag.delta < 0 ? 1 : -1;

    if (shouldAdvance) {
      setIsDragging(false);
      setIsSwapping(true);
      setSwipeDirection(direction);

      if (swapTimerRef.current) window.clearTimeout(swapTimerRef.current);
      swapTimerRef.current = window.setTimeout(() => {
        setActiveCert((prev) => (prev + direction + totalCerts) % totalCerts);
        setIsSwapping(false);
        setSwipeDirection(0);
        setDragOffset(0);
        dragOffsetRef.current = 0;
        swapTimerRef.current = null;
      }, SWAP_DURATION);
    } else {
      setIsDragging(false);
      setDragOffsetSmooth(0);
    }

    if (drag.moved) {
      suppressClickRef.current = true;
      window.setTimeout(() => { suppressClickRef.current = false; }, 0);
    }

    dragRef.current = {
      active: false,
      pointerId: null,
      startX: 0,
      delta: 0,
      moved: false,
    };

    if (!shouldAdvance) {
      dragOffsetRef.current = 0;
    }
  };

  const getCardStyle = (index) => {
    const offset = getWrappedOffset(index);
    const limitedOffset = Math.max(-STACK_DEPTH, Math.min(STACK_DEPTH, offset));
    const isActive = limitedOffset === 0;
    const hidden = Math.abs(offset) > STACK_DEPTH;
    const deckAnimated = isDeckExpanded || isDragging || isSwapping;
    const dragProgress = isDragging ? Math.max(-1, Math.min(1, dragOffset / 180)) : 0;
    const slotShift = isSwapping ? swipeDirection : dragProgress * 0.42;
    const effectiveOffset = isActive ? 0 : limitedOffset - slotShift;
    const absEffectiveOffset = Math.abs(effectiveOffset);
    const spreadUnit = deckAnimated ? 124 : 36;
    const x = isActive ? dragOffset : effectiveOffset * spreadUnit;
    const y = isActive
      ? (deckAnimated ? -40 : -26)
      : 14 + Math.min(absEffectiveOffset, STACK_DEPTH) * 18;
    const scale = isActive
      ? (deckAnimated ? 1.02 : 1)
      : Math.max(0.84, 1 - Math.min(absEffectiveOffset, STACK_DEPTH) * 0.07);
    const rotate = isActive
      ? dragProgress * 2.4
      : effectiveOffset * 5.5;
    const opacity = hidden ? 0 : absEffectiveOffset > 1.35 ? 0.58 : 1;

    return {
      zIndex: isActive ? 40 : 30 - Math.round(absEffectiveOffset * 10),
      opacity,
      pointerEvents: hidden ? 'none' : 'auto',
      transform: `translate3d(calc(-50% + ${x}px), calc(-50% + ${y}px), 0) scale(${scale}) rotate(${rotate}deg)`,
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
          <span>Grab the card</span>
          <i className="fa-solid fa-arrow-right-long" />
        </div>

        <div
          className={`cert-stack${isDeckExpanded ? ' is-expanded' : ''}${isDragging ? ' is-dragging' : ''}${isSwapping ? ' is-swapping' : ''}`}
          onMouseEnter={() => setIsDeckExpanded(true)}
          onMouseLeave={() => {
            if (!dragRef.current.active) setIsDeckExpanded(false);
          }}
          onFocus={() => setIsDeckExpanded(true)}
          onBlur={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) {
              setIsDeckExpanded(false);
            }
          }}
          aria-label="Stacked certificates deck"
        >
          {CERTIFICATES.map(({ id, title, issuer, date, icon, iconCls, verifyUrl, label }, index) => {
            const isActive = index === activeCert;

            return (
              <article
                key={id}
                className={`cert-card cert-swipe-card${isActive ? ' is-active' : ''}${isDragging && isActive ? ' is-dragging' : ''}${isSwapping ? ' is-swapping' : ''}`}
                aria-label={`${title} certificate from ${issuer}`}
                style={getCardStyle(index)}
                onPointerDown={(event) => {
                  if (isSwapping) return;
                  if (!isActive) return;
                  if (event.button !== undefined && event.button !== 0) return;
                  if (event.target.closest('.cert-verify-link')) return;

                  dragRef.current = {
                    active: true,
                    pointerId: event.pointerId,
                    startX: event.clientX,
                    delta: 0,
                    moved: false,
                  };

                  setIsDragging(true);
                  setIsDeckExpanded(true);
                  event.preventDefault();
                  event.currentTarget.setPointerCapture?.(event.pointerId);
                }}
                onPointerMove={(event) => {
                  const drag = dragRef.current;
                  if (!isActive || !drag.active || drag.pointerId !== event.pointerId) return;

                  const delta = event.clientX - drag.startX;
                  const limitedDelta = Math.sign(delta) * Math.min(Math.abs(delta), 260);
                  drag.delta = limitedDelta;
                  drag.moved = drag.moved || Math.abs(limitedDelta) > DRAG_START_DISTANCE;
                  setDragOffsetSmooth(limitedDelta);
                }}
                onPointerUp={(event) => finishDrag(event, index)}
                onPointerCancel={(event) => finishDrag(event, index)}
                onLostPointerCapture={(event) => finishDrag(event, index)}
                onClick={(event) => {
                  if (suppressClickRef.current || isDragging || isSwapping) {
                    event.preventDefault();
                    event.stopPropagation();
                    return;
                  }

                  if (!isActive) {
                    setActiveCert(index);
                  }
                }}
                onMouseEnter={() => setIsDeckExpanded(true)}
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
                  onPointerDown={(event) => {
                    event.stopPropagation();
                  }}
                  onPointerUp={(event) => {
                    event.stopPropagation();
                  }}
                  onClick={(event) => {
                    event.stopPropagation();
                    if (suppressClickRef.current) {
                      event.preventDefault();
                    }
                  }}
                >
                  <span>Verify</span>
                  <i className="fa-solid fa-arrow-up-right-from-square" aria-hidden="true" />
                </a>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─── Contact Section ────────────────────────────────────────── */
function ContactSection() {
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
            action="https://formspree.io/f/xlgpyeyo"
            method="POST"
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
            <button type="submit" className="contact-submit">
              <span>Send Message</span>
              <i className="fa-solid fa-arrow-right" aria-hidden="true" />
            </button>
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

    /* 3. Cursor follower — pauses when tab is hidden */
    const cursor = document.getElementById('cursorFollower');
    let mouseX = window.innerWidth / 2, mouseY = window.innerHeight / 2;
    let curX = mouseX, curY = mouseY;
    let inside = false, rafCursor = null, cursorPaused = false;

    const stepCursor = () => {
      curX += (mouseX - curX) * 0.12;
      curY += (mouseY - curY) * 0.12;
      if (cursor) {
        cursor.style.transform =
          `translate3d(${curX - cursor.offsetWidth / 2}px,${curY - cursor.offsetHeight / 2}px,0)`;
      }
      if (!cursorPaused) rafCursor = requestAnimationFrame(stepCursor);
    };

    const onVisibilityChange = () => {
      if (document.hidden) {
        cursorPaused = true;
        if (rafCursor) { cancelAnimationFrame(rafCursor); rafCursor = null; }
      } else {
        cursorPaused = false;
        rafCursor = requestAnimationFrame(stepCursor);
      }
    };

    const onMove = (e) => {
      mouseX = e.clientX; mouseY = e.clientY;
      if (!inside) { inside = true; cursor?.classList.add('active'); }
    };
    const onEnter = () => { inside = true; cursor?.classList.add('active'); };
    const onLeave = () => { inside = false; cursor?.classList.remove('active'); };

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mouseenter', onEnter);
    window.addEventListener('mouseleave', onLeave);
    document.addEventListener('visibilitychange', onVisibilityChange);

    document.querySelectorAll('a, button, .project-card, .about-card, .about-flip-card, .cert-card').forEach((el) => {
      el.addEventListener('mouseenter', () => cursor?.classList.add('hover'));
      el.addEventListener('mouseleave', () => cursor?.classList.remove('hover'));
    });

    rafCursor = requestAnimationFrame(stepCursor);

    /* 4. Magnetic skill pills — track all RAF IDs for clean teardown */
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
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
      document.removeEventListener('visibilitychange', onVisibilityChange);
      if (rafCursor) cancelAnimationFrame(rafCursor);
      pillRafs.forEach((id) => cancelAnimationFrame(id));
      pillRafs.clear();
    };
  }, []);

  return (
    <>
      <MeshBackground />
      <div className="cursor-follower" id="cursorFollower" aria-hidden="true" />

      <FloatingNav onDownloadCV={downloadCV} theme={theme} onToggleTheme={toggleTheme} />
      <HeroSection />

      <section className="portfolio" id="portfolio" aria-label="Portfolio content">
        <div className="portfolio-shell">
          <AboutSection />
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
