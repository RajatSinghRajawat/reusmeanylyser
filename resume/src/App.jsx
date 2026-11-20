import { useRef, useState } from 'react'
import { analyzeResume, AnalyzeError } from './api/resumeApi'
import Header from './components/Header'
import UploadZone from './components/UploadZone'
import AnalysisResults from './components/AnalysisResults'
import {
  IconTarget,
  IconZap,
  IconMail,
  IconGraduationCap,
  IconShieldCheck,
  IconSparkles,
} from './components/Icons'
import {
  SAMPLE_ANALYSIS,
  SAMPLE_EXTRACTED_TEXT,
  SAMPLE_JOB_DESCRIPTIONS,
} from './sampleData'

const FEATURES = [
  {
    title: 'Precision ATS Scoring',
    desc: 'Audit your resume against algorithms used by Workday, Greenhouse, Taleo, and Lever to eliminate keyword blindspots.',
    icon: IconTarget,
    badge: 'Real-time Audit',
  },
  {
    title: 'Google XYZ Bullet Optimizer',
    desc: 'Transform passive job descriptions into quantified accomplishments: "Accomplished [X], measured by [Y], by doing [Z]".',
    icon: IconZap,
    badge: 'Recruiter Favorite',
  },
  {
    title: 'Tailored AI Cover Letter',
    desc: 'Generate custom, compelling cover letters laser-focused on specific job descriptions with 1-click export to PDF.',
    icon: IconMail,
    badge: 'Role-Specific',
  },
  {
    title: 'STAR Method Interview Coach',
    desc: 'Practice technical and behavioral questions generated directly from your background with step-by-step STAR blueprints.',
    icon: IconGraduationCap,
    badge: 'Custom Scenarios',
  },
]

const TRUST_METRICS = [
  { value: '98.4%', label: 'ATS Parsing Accuracy' },
  { value: '3.2x', label: 'More Recruiter Callbacks' },
  { value: 'Google XYZ', label: 'Impact Bullet Standard' },
  { value: 'Gemini 2.5', label: 'Advanced Reasoning' },
]

function App() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [errorRetryable, setErrorRetryable] = useState(false)
  const [result, setResult] = useState(null)
  const [extractedText, setExtractedText] = useState('')
  const [fileName, setFileName] = useState('')
  const [targetJd, setTargetJd] = useState('')

  const lastFileRef = useRef(null)
  const lastJdRef = useRef('')

  const runAnalysis = async (file, jobDescription = '') => {
    setError('')
    setErrorRetryable(false)
    setResult(null)
    setExtractedText('')
    setFileName(file.name)
    setTargetJd(jobDescription)

    lastFileRef.current = file
    lastJdRef.current = jobDescription
    setLoading(true)

    try {
      const response = await analyzeResume(file, jobDescription)
      setResult(response.analysis)
      setExtractedText(response.extractedText)

      setTimeout(() => {
        document.getElementById('results')?.scrollIntoView({ behavior: 'smooth' })
      }, 150)
    } catch (err) {
      const retryable = err instanceof AnalyzeError ? err.retryable : true
      setErrorRetryable(retryable)
      setError(
        err instanceof AnalyzeError
          ? err.message
          : 'Could not connect to the backend analysis server. Make sure the API server is running.'
      )
    } finally {
      setLoading(false)
    }
  }

  const handleAnalyze = async (file, validationError, jobDescription = '') => {
    if (validationError) {
      setError(validationError)
      setErrorRetryable(false)
      return
    }
    await runAnalysis(file, jobDescription)
  }

  const handleRetry = () => {
    if (lastFileRef.current && !loading) {
      runAnalysis(lastFileRef.current, lastJdRef.current)
    }
  }

  // Instant Demo Experience (works offline/independent of backend for review)
  const handleLoadDemo = () => {
    setError('')
    setErrorRetryable(false)
    setFileName('Alexander_Morgan_Senior_Engineer_CV.pdf')
    setTargetJd(SAMPLE_JOB_DESCRIPTIONS[0].text)
    setExtractedText(SAMPLE_EXTRACTED_TEXT)
    setResult(SAMPLE_ANALYSIS)

    setTimeout(() => {
      document.getElementById('results')?.scrollIntoView({ behavior: 'smooth' })
    }, 100)
  }

  const handleReset = () => {
    setResult(null)
    setExtractedText('')
    setFileName('')
    setTargetJd('')
    setError('')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="app">
      {/* Subtle Aurora Ambient Lighting */}
      <div className="app__ambient app__ambient--1" />
      <div className="app__ambient app__ambient--2" />
      <div className="app__ambient app__ambient--3" />

      <Header onTryDemo={handleLoadDemo} />

      <main>
        {/* Hero Section */}
        <section className="hero">
          <div className="hero__badge-container">
            <span className="hero__badge">
              <IconSparkles size={14} className="hero__badge-icon" />
              <span>Next-Generation Career Intelligence</span>
            </span>
          </div>

          <h1 className="hero__heading">
            Transform Your Resume Into a <br className="hero__br" />
            <span className="hero__gradient-text">High-Impact Job Magnet</span>
          </h1>

          <p className="hero__description">
            Pass applicant screening filters with confidence. Get immediate ATS compatibility scoring,
            missing keyword intelligence, Google XYZ bullet rewriting, and tailored STAR mock interview practice.
          </p>

          {/* Social Proof / Metrics Bar */}
          <div className="hero__metrics-bar">
            {TRUST_METRICS.map((item, idx) => (
              <div key={idx} className="hero__metric-item">
                <span className="hero__metric-value">{item.value}</span>
                <span className="hero__metric-label">{item.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Upload Zone & Optional Job Description matching */}
        <UploadZone
          onAnalyze={handleAnalyze}
          loading={loading}
          error={error}
          errorRetryable={errorRetryable}
          onRetry={handleRetry}
          onLoadDemo={handleLoadDemo}
        />

        {/* Interactive Career Suite Dashboard Results */}
        {result && (
          <AnalysisResults
            analysis={result}
            fileName={fileName}
            extractedText={extractedText}
            initialJd={targetJd}
            onReset={handleReset}
          />
        )}

        {/* Core Value Proposition Feature Cards */}
        <section className="features" id="features">
          <div className="features__header">
            <span className="features__eyebrow">Enterprise-Grade Features</span>
            <h2 className="features__title">Everything You Need to Land Tier-1 Offers</h2>
            <p className="features__subtitle">
              Engineered by senior recruiters and engineers to reverse-engineer standard ATS filters.
            </p>
          </div>

          <div className="features__grid">
            {FEATURES.map((f) => {
              const IconComp = f.icon
              return (
                <article key={f.title} className="feature-card">
                  <div className="feature-card__header">
                    <div className="feature-card__icon-box">
                      <IconComp size={24} />
                    </div>
                    <span className="feature-card__badge">{f.badge}</span>
                  </div>
                  <h3 className="feature-card__title">{f.title}</h3>
                  <p className="feature-card__desc">{f.desc}</p>
                </article>
              )
            })}
          </div>
        </section>

        {/* Trust & Privacy Assurance Banner */}
        <section className="privacy-banner">
          <div className="privacy-banner__content">
            <div className="privacy-banner__icon">
              <IconShieldCheck size={26} />
            </div>
            <div>
              <h4 className="privacy-banner__title">Data Privacy & Security Guarantee</h4>
              <p className="privacy-banner__text">
                Your resumes and documents are never stored permanently or used for public AI model training.
                All text extraction is encrypted in-memory and processed strictly via isolated API endpoints.
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="footer__container">
          <div className="footer__brand-col">
            <div className="footer__brand">
              <span className="footer__brand-icon">RA</span>
              <span className="footer__brand-name">ResumeAI Pro</span>
            </div>
            <p className="footer__brand-text">
              Intelligent ATS Resume Optimization & Career Suite.
            </p>
          </div>

          <div className="footer__tech-col">
            <span className="footer__tag">React 19</span>
            <span className="footer__tag">Vite 8</span>
            <span className="footer__tag">Gemini AI</span>
            <span className="footer__tag">Express</span>
            <span className="footer__tag">Workday/Greenhouse ATS Ready</span>
          </div>
        </div>

        <div className="footer__bottom">
          <p>© {new Date().getFullYear()} ResumeAI Pro · Precision Career Optimization Platform</p>
        </div>
      </footer>
    </div>
  )
}

export default App
