import Image from "next/image";

type IconProps = {
  className?: string;
};

const sectors = [
  { label: "PRISON", icon: "M5 21V8l7-5 7 5v13M8 21v-8h8v8M9 10h.01M12 10h.01M15 10h.01M3 21h18" },
  { label: "ENERGY", icon: "m13 2-8 12h7l-1 8 8-12h-7l1-8Z" },
  { label: "PORTS", icon: "M3 19h18M5 19l2-8h10l2 8M8 11V6h8v5M10 6V3h4v3M7 15h10" },
  { label: "AIRPORTS", icon: "M2 16 22 8l-9 9-2 5-3-8-6 2Z" },
  { label: "INDUSTRY", icon: "M3 21h18M5 21V9l5 4V9l5 4V5h4v16M8 17h1M13 17h1M18 17h1" },
  { label: "EVENTS", icon: "M8 9a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM16 9a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM12 17a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM5 21v-2a3 3 0 0 1 3-3M19 21v-2a3 3 0 0 0-3-3M9 17a4 4 0 0 0-4-4M15 17a4 4 0 0 1 4-4" },
  { label: "DATA CENTERS", icon: "M3 21h18M5 21V9h4v12M10 21V4h4v17M15 21V8h4v13M7 13h.01M12 9h.01M17 13h.01" },
  { label: "DEFENSE", icon: "M12 3 4 6v5c0 5 3.5 8.5 8 10 4.5-1.5 8-5 8-10V6l-8-3Zm-3 9 2 2 4-5" }
];

const platformFeatures = [
  { label: <>AI C-UAS orchestration<br />&amp; hypervision</>, icon: "M12 3 4 6v5c0 5 3.5 8.5 8 10 4.5-1.5 8-5 8-10V6l-8-3ZM12 8v.01M12 12v.01M12 16v.01" },
  { label: <>Multi-Layer<br />Defense</>, icon: "M4 8h4l2-3 4 6 2-3h4M4 16h4l2 3 4-6 2 3h4M4 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM20 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM4 18a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM20 18a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" },
  { label: <>Soft Kill &amp;<br />Hard Kill</>, icon: "M12 3 4 6v5c0 5 3.5 8.5 8 10 4.5-1.5 8-5 8-10V6l-8-3Zm-3 9 2 2 4-5" },
  { label: <>Civil &amp; Military<br />Deployment</>, icon: "M12 3 7 21M12 3l5 18M7 21h10M5 14l14-4M8 9l8 7M12 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" }
];

const processSteps = [
  {
    title: "DETECT",
    iconClass: "tech-detect",
    body: <>Multi-sensor fusion<br />Radar, RF, LiDAR,<br />EO/IR, Acoustic<br />AI-powered detection</>
  },
  {
    title: "IDENTIFY",
    iconClass: "tech-target",
    body: <>AI classification<br />Behavior analysis<br />Threat scoring</>
  },
  {
    title: "TRACK",
    iconClass: "tech-target",
    body: <>360° real-time tracking<br />Multi-target<br />Geo-positioning</>
  },
  {
    title: "NEUTRALIZE",
    iconClass: "tech-neutral",
    body: <>Soft Kill: Jamming, Dazzling<br />Drone with Laser &amp; LiDAR<br />AI collateral damage risk analysis</>
  }
];

function LineIcon({ path, className = "" }: IconProps & { path: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
      <path d={path} />
    </svg>
  );
}

function GlobeIcon({ className = "" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20" />
    </svg>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#020509] text-white">
      <div className="funding-banner">
        <strong>PRIVATE ROUND</strong>
        <span>Join us in securing the world&apos;s critical sites.</span>
        <a href="#">Invest</a>
      </div>

      <header className="topbar" aria-label="Primary navigation">
        <a className="brand" href="#" aria-label="OnX2 home">
          <Image src="/logo-onx2-alpha.png" alt="OnX2" width={204} height={70} priority />
        </a>
        <nav className="nav" aria-label="Main menu">
          <a href="#">USE CASES</a>
          <a href="#">SOLUTIONS</a>
          <a href="#">TECHNOLOGY</a>
          <a href="#">COMPANY</a>
        </nav>
        <a className="meeting" href="#">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
            <rect x="3" y="4" width="18" height="17" rx="2" />
            <path d="M8 2v5M16 2v5M3 10h18M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01M16 18h.01" />
          </svg>
          MEETING REQUEST
        </a>
      </header>

      <section className="hero" aria-label="AI-powered C-UAS solutions">
        <div className="hero-copy">
          <h1>
            DETECT<span className="dot dot-blue">.</span><br />
            TRACK<span className="dot">.</span><br />
            IDENTIFY<span className="dot">.</span><br />
            NEUTRALIZE<span className="dot">.</span>
          </h1>
          <p className="sub">Complete protection against today&apos;s drone threats.</p>
        </div>
      </section>

      <section className="sectors" aria-label="Sectors">
        {sectors.map((sector) => (
          <div className="sector" key={sector.label}>
            <LineIcon path={sector.icon} />
            {sector.label}
          </div>
        ))}
      </section>

      <section className="ecosystem" aria-label="OnX2 C-UAS ecosystem">
        <div className="eco-title">
          <div className="red-kicker">ONE INTEGRATED PLATFORM</div>
          <h2>Secure and protect your site</h2>
          <div className="features platform-features">
            {platformFeatures.map((feature, index) => (
              <div className="feature" key={index}>
                <LineIcon path={feature.icon} />
                <span>{feature.label}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="process">
          {processSteps.map((step) => (
            <article className="step" key={step.title}>
              <div className={`tech-icon ${step.iconClass}`} aria-hidden="true" />
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="stats" aria-label="Market indicators">
        <div className="stat">
          <GlobeIcon />
          <div><strong>$12B+</strong><span>MARKET BY 2030<br />CAGR 28%</span></div>
        </div>
        <div className="stat">
          <GlobeIcon />
          <div><strong>60+</strong><span>COUNTRIES ADOPTING<br />C-UAS REGULATIONS</span></div>
        </div>
      </section>

      <footer className="footer" aria-label="Footer">
        <div className="footer-main">
          <div className="footer-brand">
            <Image src="/logo-onx2-alpha.png" alt="OnX2" width={178} height={61} />
            <p>AI-powered C-UAS orchestration to detect, track, identify and neutralize drone threats across critical sites.</p>
          </div>

          <div className="footer-menus">
            <FooterColumn title="USE CASES" items={["Prisons", "Energy sites", "Ports", "Airports"]} />
            <FooterColumn title="SOLUTIONS" items={["Detection", "Tracking", "Identification", "Neutralization"]} />
            <FooterColumn title="TECHNOLOGY" items={["AI hypervision", "Multi-sensor fusion", "Laser & LiDAR", "Risk analysis"]} />
            <FooterColumn title="COMPANY" items={["About", "Private round", "Partners", "Newsroom"]} />
          </div>
        </div>

        <div className="footer-contact">
          <div>
            <strong>Contact</strong>
            <p>For site protection, partnership and investor access requests.</p>
          </div>
          <div className="footer-actions">
            <a href="mailto:contact@onx2.ai">contact@onx2.ai</a>
            <a href="#">Request a meeting</a>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© 2026 OnX2. All rights reserved.</span>
          <nav aria-label="Legal links">
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
            <a href="#">Legal notice</a>
          </nav>
        </div>
      </footer>
    </main>
  );
}

function FooterColumn({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h4>{title}</h4>
      <ul>
        {items.map((item) => (
          <li key={item}><a href="#">{item}</a></li>
        ))}
      </ul>
    </div>
  );
}
