import { IconSparkles, IconShieldCheck, IconFileText } from './Icons'

export default function Header({ onTryDemo }) {
  return (
    <header className="header">
      <div className="header__brand">
        <div className="header__logo-wrapper">
          <div className="header__logo-glow" />
          <div className="header__logo">
            <IconSparkles size={22} className="header__logo-icon" />
          </div>
        </div>
        <div>
          <div className="header__title-row">
            <h1 className="header__title">ResumeAI<span className="header__title-badge">PRO</span></h1>
          </div>
          <p className="header__tagline">Next-Gen ATS Resume Intelligence & Career Co-Pilot</p>
        </div>
      </div>

      <div className="header__right">
        <div className="header__status-chip">
          <span className="header__status-dot" />
          <span className="header__status-text">Gemini AI Online</span>
        </div>

        <nav className="header__nav">
          <a href="#upload" className="header__nav-link">
            <IconFileText size={15} />
            <span>Analyze</span>
          </a>
          <a href="#features" className="header__nav-link">
            <IconShieldCheck size={15} />
            <span>Features</span>
          </a>
          {onTryDemo && (
            <button type="button" className="header__demo-btn" onClick={onTryDemo}>
              <IconSparkles size={14} />
              <span>Load Demo</span>
            </button>
          )}
        </nav>
      </div>
    </header>
  )
}
