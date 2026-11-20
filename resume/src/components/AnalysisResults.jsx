import { useState } from 'react'
import { generateCoverLetter, generateInterviewPrep } from '../api/resumeApi'
import {
  IconBarChart,
  IconTarget,
  IconZap,
  IconMail,
  IconGraduationCap,
  IconCopy,
  IconCheck,
  IconPrinter,
  IconRefreshCw,
  IconCheckCircle2,
  IconAlertTriangle,
  IconSearch,
  IconEdit,
  IconSparkles,
  IconChevronDown,
  IconChevronUp,
} from './Icons'
import Toast from './Toast'

const DEFAULT_EMPTY = {
  atsScore: null,
  strengths: [],
  weaknesses: [],
  improvements: [],
  missingKeywords: [],
  summary: '',
}

export default function AnalysisResults({
  analysis: analysisProp,
  fileName = '',
  extractedText = '',
  initialJd = '',
  onReset,
}) {
  const analysis = {
    ...DEFAULT_EMPTY,
    ...(analysisProp && typeof analysisProp === 'object' ? analysisProp : {}),
  }

  // Active Tab state
  const [activeTab, setActiveTab] = useState('dashboard')

  // Job Description state
  const [jdText, setJdText] = useState(initialJd || '')
  const [editingJd, setEditingJd] = useState(!initialJd)

  // Cover Letter states
  const [coverLetter, setCoverLetter] = useState('')
  const [clLoading, setClLoading] = useState(false)
  const [clError, setClError] = useState('')

  // Interview Coach states
  const [questions, setQuestions] = useState([])
  const [intLoading, setIntLoading] = useState(false)
  const [intError, setIntError] = useState('')
  const [expandedQuestion, setExpandedQuestion] = useState(null)
  const [practicedQuestions, setPracticedQuestions] = useState({})

  // Interactive Checklist states for XYZ suggestions
  const [completedFixes, setCompletedFixes] = useState({})

  // Keyword filter search
  const [keywordSearch, setKeywordSearch] = useState('')
  const [copiedKeyword, setCopiedKeyword] = useState(null)

  // Toast feedback state
  const [toast, setToast] = useState({ message: '', type: 'success' })

  const atsScore =
    typeof analysis.atsScore === 'number' && Number.isFinite(analysis.atsScore)
      ? Math.min(100, Math.max(0, Math.round(analysis.atsScore)))
      : null

  // Score verdict helper
  const getScoreVerdict = (score) => {
    if (score === null) return { text: 'Analyzing', color: 'neutral', desc: 'Score pending' }
    if (score >= 80) {
      return {
        text: 'Top Tier (ATS Optimized)',
        color: 'high',
        desc: 'Highly competitive! Passes strict applicant screening filters with high alignment.',
      }
    }
    if (score >= 60) {
      return {
        text: 'Good Alignment (Optimization Recommended)',
        color: 'medium',
        desc: 'Solid foundation, but lacks critical keywords and quantifiable XYZ metrics.',
      }
    }
    return {
      text: 'Needs Immediate Attention',
      color: 'low',
      desc: 'High risk of automatic ATS rejection due to structural or keyword deficiencies.',
    }
  }

  const verdict = getScoreVerdict(atsScore)

  const showToast = (message, type = 'success') => {
    setToast({ message, type })
  }

  // Handle Cover Letter Generation
  const handleCreateCoverLetter = async () => {
    if (!extractedText) {
      showToast('Resume text is empty. Please re-upload your resume.', 'error')
      return
    }
    if (!jdText.trim()) {
      showToast('Please provide a target Job Description to tailor the cover letter.', 'error')
      return
    }

    setClLoading(true)
    setClError('')

    try {
      const text = await generateCoverLetter(extractedText, jdText.trim())
      setCoverLetter(text)
      showToast('Tailored cover letter generated successfully!')
    } catch (err) {
      setClError(err.message || 'Failed to generate cover letter. Please try again.')
      showToast('Failed to generate cover letter', 'error')
    } finally {
      setClLoading(false)
    }
  }

  // Handle Interview Prep Generation
  const handleCreateInterviewPrep = async () => {
    if (!extractedText) {
      showToast('Resume text is empty. Please re-upload your resume.', 'error')
      return
    }
    if (!jdText.trim()) {
      showToast('Please provide a target Job Description to customize interview questions.', 'error')
      return
    }

    setIntLoading(true)
    setIntError('')
    setExpandedQuestion(null)

    try {
      const data = await generateInterviewPrep(extractedText, jdText.trim())
      setQuestions(data)
      if (data?.length) setExpandedQuestion(data[0].id)
      showToast(`Generated ${data?.length || 0} targeted STAR interview scenarios!`)
    } catch (err) {
      setIntError(err.message || 'Failed to generate interview questions. Please try again.')
      showToast('Failed to generate interview scenarios', 'error')
    } finally {
      setIntLoading(false)
    }
  }

  const handleCopyCoverLetter = () => {
    if (!coverLetter) return
    navigator.clipboard.writeText(coverLetter)
    showToast('Cover letter copied to clipboard!')
  }

  const handleCopySummary = () => {
    if (!analysis.summary) return
    navigator.clipboard.writeText(analysis.summary)
    showToast('Executive summary copied to clipboard!')
  }

  const handleCopyKeyword = (kw) => {
    navigator.clipboard.writeText(kw)
    setCopiedKeyword(kw)
    showToast(`Copied "${kw}" to clipboard!`)
    setTimeout(() => setCopiedKeyword(null), 2000)
  }

  const handleCopyAllKeywords = () => {
    if (!analysis.missingKeywords?.length) return
    const text = analysis.missingKeywords.join(', ')
    navigator.clipboard.writeText(text)
    showToast(`Copied all ${analysis.missingKeywords.length} keywords!`)
  }

  const handlePrintReport = () => {
    window.print()
  }

  const handlePrintCoverLetter = () => {
    const printWindow = window.open('', '_blank')
    if (!printWindow) return
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Cover Letter - ${fileName || 'Candidate'}</title>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');
            body {
              font-family: 'Plus Jakarta Sans', Arial, sans-serif;
              line-height: 1.7;
              padding: 60px 48px;
              color: #1e293b;
              max-width: 780px;
              margin: 0 auto;
            }
            pre {
              white-space: pre-wrap;
              font-family: inherit;
              font-size: 15px;
              color: #334155;
            }
            @media print {
              body { padding: 0; }
            }
          </style>
        </head>
        <body>
          <pre>${coverLetter}</pre>
        </body>
      </html>
    `)
    printWindow.document.close()
    setTimeout(() => {
      printWindow.focus()
      printWindow.print()
    }, 250)
  }

  // Filter missing keywords
  const missingKeywordsList = analysis.missingKeywords || []
  const filteredKeywords = keywordSearch.trim()
    ? missingKeywordsList.filter((k) =>
        k.toLowerCase().includes(keywordSearch.toLowerCase().trim())
      )
    : missingKeywordsList

  // Toggle checklist fixes
  const toggleFix = (index) => {
    setCompletedFixes((prev) => ({
      ...prev,
      [index]: !prev[index],
    }))
  }

  const completedFixCount = Object.values(completedFixes).filter(Boolean).length
  const totalFixCount = analysis.improvements?.length || 0

  return (
    <section className="results" id="results">
      {/* Toast Notification */}
      <Toast
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ message: '', type: 'success' })}
      />

      {/* Modern Glassmorphic Dashboard Header */}
      <div className="results__header">
        <div className="results__header-left">
          <div className="results__status-pill">
            <span className="results__status-dot" />
            <span>{initialJd ? 'Target Role Tailored' : 'Standard ATS Benchmark'}</span>
          </div>
          <h2 className="results__title">{fileName || 'Resume ATS Report'}</h2>
          <p className="results__subtitle">
            Comprehensive algorithmic audit evaluated against Fortune 500 ATS criteria (Workday, Greenhouse, Taleo)
          </p>
        </div>

        <div className="results__header-right">
          {/* Dynamic SVG Score Ring with Linear Gradients */}
          <div className={`results__score-card results__score-card--${verdict.color}`}>
            <div className="results__score-ring-wrap">
              <svg viewBox="0 0 100 100" className="results__score-svg">
                <defs>
                  <linearGradient id="scoreGradHigh" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#22d3ee" />
                    <stop offset="100%" stopColor="#10b981" />
                  </linearGradient>
                  <linearGradient id="scoreGradMedium" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#fbbf24" />
                    <stop offset="100%" stopColor="#f59e0b" />
                  </linearGradient>
                  <linearGradient id="scoreGradLow" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#f87171" />
                    <stop offset="100%" stopColor="#ef4444" />
                  </linearGradient>
                </defs>

                <circle className="results__score-track" cx="50" cy="50" r="41" />
                <circle
                  className="results__score-indicator"
                  cx="50"
                  cy="50"
                  r="41"
                  style={{
                    strokeDasharray: 257.6,
                    strokeDashoffset: 257.6 - (257.6 * (atsScore || 0)) / 100,
                    stroke:
                      verdict.color === 'high'
                        ? 'url(#scoreGradHigh)'
                        : verdict.color === 'medium'
                        ? 'url(#scoreGradMedium)'
                        : 'url(#scoreGradLow)',
                  }}
                />
              </svg>

              <div className="results__score-center">
                <span className="results__score-num">{atsScore !== null ? atsScore : '—'}</span>
                <span className="results__score-denom">/100</span>
              </div>
            </div>

            <div className="results__score-meta">
              <span className={`results__verdict-badge results__verdict-badge--${verdict.color}`}>
                {verdict.text}
              </span>
              <p className="results__verdict-caption">{verdict.desc}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Global Quick Action Toolbar */}
      <div className="results__toolbar">
        <div className="results__toolbar-stats">
          <span className="results__stat-chip">
            <strong>{analysis.strengths?.length || 0}</strong> Strengths
          </span>
          <span className="results__stat-chip">
            <strong>{analysis.weaknesses?.length || 0}</strong> Vulnerabilities
          </span>
          <span className="results__stat-chip">
            <strong>{analysis.missingKeywords?.length || 0}</strong> Missing Keywords
          </span>
        </div>

        <div className="results__toolbar-actions">
          <button type="button" className="results__tool-btn" onClick={handlePrintReport}>
            <IconPrinter size={15} />
            <span>Print Report</span>
          </button>
          {onReset && (
            <button type="button" className="results__tool-btn results__tool-btn--accent" onClick={onReset}>
              <IconRefreshCw size={15} />
              <span>New Analysis</span>
            </button>
          )}
        </div>
      </div>

      {/* Segmented Navigation Tab Bar */}
      <nav className="results__tabs-bar" role="tablist">
        <button
          className={`results__tab-item ${activeTab === 'dashboard' ? 'results__tab-item--active' : ''}`}
          onClick={() => setActiveTab('dashboard')}
          role="tab"
          aria-selected={activeTab === 'dashboard'}
        >
          <IconBarChart size={17} />
          <span>Dashboard</span>
        </button>

        <button
          className={`results__tab-item ${activeTab === 'skills' ? 'results__tab-item--active' : ''}`}
          onClick={() => setActiveTab('skills')}
          role="tab"
          aria-selected={activeTab === 'skills'}
        >
          <IconTarget size={17} />
          <span>Keywords & Skills</span>
          {analysis.missingKeywords?.length > 0 && (
            <span className="results__tab-badge">{analysis.missingKeywords.length}</span>
          )}
        </button>

        <button
          className={`results__tab-item ${activeTab === 'optimizer' ? 'results__tab-item--active' : ''}`}
          onClick={() => setActiveTab('optimizer')}
          role="tab"
          aria-selected={activeTab === 'optimizer'}
        >
          <IconZap size={17} />
          <span>XYZ Bullet Optimizer</span>
          {totalFixCount > 0 && (
            <span className="results__tab-badge results__tab-badge--blue">{totalFixCount}</span>
          )}
        </button>

        <button
          className={`results__tab-item ${activeTab === 'coverletter' ? 'results__tab-item--active' : ''}`}
          onClick={() => setActiveTab('coverletter')}
          role="tab"
          aria-selected={activeTab === 'coverletter'}
        >
          <IconMail size={17} />
          <span>Tailored Cover Letter</span>
        </button>

        <button
          className={`results__tab-item ${activeTab === 'interview' ? 'results__tab-item--active' : ''}`}
          onClick={() => setActiveTab('interview')}
          role="tab"
          aria-selected={activeTab === 'interview'}
        >
          <IconGraduationCap size={17} />
          <span>Mock Interview Prep</span>
        </button>
      </nav>

      {/* TAB CONTENT PANELS */}
      <div className="results__panel-container">
        {/* ================= TAB 1: EXECUTIVE DASHBOARD ================= */}
        {activeTab === 'dashboard' && (
          <div className="results__panel fade-in">
            {analysis.summary && (
              <div className="results__briefing-card">
                <div className="results__briefing-header">
                  <div className="results__briefing-title-group">
                    <IconSparkles size={18} className="results__briefing-icon" />
                    <h3>Executive Summary & ATS Recruiter Review</h3>
                  </div>
                  <button
                    type="button"
                    className="results__copy-pill"
                    onClick={handleCopySummary}
                    title="Copy Summary"
                  >
                    <IconCopy size={13} />
                    <span>Copy Summary</span>
                  </button>
                </div>
                <p className="results__briefing-body">{analysis.summary}</p>
              </div>
            )}

            {/* Key Dimension Stats */}
            <div className="results__dimension-grid">
              <div className="results__dimension-card">
                <div className="results__dimension-icon results__dimension-icon--success">
                  <IconCheckCircle2 size={22} />
                </div>
                <div className="results__dimension-info">
                  <span className="results__dimension-label">Strengths Detected</span>
                  <span className="results__dimension-val">{analysis.strengths?.length || 0}</span>
                  <span className="results__dimension-sub">Competitive hiring signals</span>
                </div>
              </div>

              <div className="results__dimension-card">
                <div className="results__dimension-icon results__dimension-icon--danger">
                  <IconAlertTriangle size={22} />
                </div>
                <div className="results__dimension-info">
                  <span className="results__dimension-label">Areas of Vulnerability</span>
                  <span className="results__dimension-val">{analysis.weaknesses?.length || 0}</span>
                  <span className="results__dimension-sub">Gaps that trigger ATS flags</span>
                </div>
              </div>

              <div className="results__dimension-card">
                <div className="results__dimension-icon results__dimension-icon--accent">
                  <IconZap size={22} />
                </div>
                <div className="results__dimension-info">
                  <span className="results__dimension-label">Recommended Fixes</span>
                  <span className="results__dimension-val">{analysis.improvements?.length || 0}</span>
                  <span className="results__dimension-sub">Targeted bullet improvements</span>
                </div>
              </div>

              <div className="results__dimension-card">
                <div className="results__dimension-icon results__dimension-icon--warning">
                  <IconTarget size={22} />
                </div>
                <div className="results__dimension-info">
                  <span className="results__dimension-label">Target Keywords to Add</span>
                  <span className="results__dimension-val">{analysis.missingKeywords?.length || 0}</span>
                  <span className="results__dimension-sub">Boost search rank</span>
                </div>
              </div>
            </div>

            {/* Strengths & Weaknesses 2-Column Grid */}
            <div className="results__comparison-grid">
              <div className="results__comparison-col results__comparison-col--positive">
                <div className="results__comparison-header">
                  <IconCheckCircle2 size={18} />
                  <h4>Key Competitive Advantages</h4>
                </div>
                <ul className="results__item-list">
                  {analysis.strengths?.map((item, idx) => (
                    <li key={idx} className="results__list-item">
                      <span className="results__item-bullet results__item-bullet--green">✓</span>
                      <p className="results__item-text">{item}</p>
                    </li>
                  ))}
                  {(!analysis.strengths || analysis.strengths.length === 0) && (
                    <li className="results__item-empty">No specific strengths captured.</li>
                  )}
                </ul>
              </div>

              <div className="results__comparison-col results__comparison-col--negative">
                <div className="results__comparison-header">
                  <IconAlertTriangle size={18} />
                  <h4>Critical Gaps & ATS Blindspots</h4>
                </div>
                <ul className="results__item-list">
                  {analysis.weaknesses?.map((item, idx) => (
                    <li key={idx} className="results__list-item">
                      <span className="results__item-bullet results__item-bullet--red">!</span>
                      <p className="results__item-text">{item}</p>
                    </li>
                  ))}
                  {(!analysis.weaknesses || analysis.weaknesses.length === 0) && (
                    <li className="results__item-empty">No critical vulnerabilities detected!</li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 2: SKILLS & KEYWORDS ================= */}
        {activeTab === 'skills' && (
          <div className="results__panel fade-in">
            <div className="results__section-intro">
              <div>
                <h3 className="results__section-title">Applicant Tracking System (ATS) Keyword Audit</h3>
                <p className="results__section-desc">
                  Modern recruiters filter candidates using automated keyword density algorithms.
                  Adding these identified industry and role terms will dramatically increase your interview invitation rate.
                </p>
              </div>

              {analysis.missingKeywords?.length > 0 && (
                <button
                  type="button"
                  className="results__btn-secondary"
                  onClick={handleCopyAllKeywords}
                >
                  <IconCopy size={15} />
                  <span>Copy All ({analysis.missingKeywords.length}) Keywords</span>
                </button>
              )}
            </div>

            {/* Search Filter Bar */}
            <div className="results__keyword-search-bar">
              <IconSearch size={18} className="results__search-icon" />
              <input
                type="text"
                placeholder="Filter missing keywords (e.g. Docker, TypeScript, Microservices)..."
                value={keywordSearch}
                onChange={(e) => setKeywordSearch(e.target.value)}
                className="results__search-input"
              />
              {keywordSearch && (
                <button
                  type="button"
                  className="results__search-clear"
                  onClick={() => setKeywordSearch('')}
                >
                  Clear
                </button>
              )}
            </div>

            {/* Missing Keywords Interactive Tag Cloud */}
            <div className="results__keyword-box">
              <div className="results__keyword-box-header">
                <h4>Missing Role Keywords & Technologies</h4>
                <span className="results__keyword-help">
                  💡 Click any tag to copy it directly to your clipboard
                </span>
              </div>

              {filteredKeywords.length > 0 ? (
                <div className="results__tag-cloud">
                  {filteredKeywords.map((kw, idx) => {
                    const isCopied = copiedKeyword === kw
                    return (
                      <button
                        key={idx}
                        type="button"
                        className={`results__tag-item ${isCopied ? 'results__tag-item--copied' : ''}`}
                        onClick={() => handleCopyKeyword(kw)}
                      >
                        <span className="results__tag-prefix">{isCopied ? '✓' : '+'}</span>
                        <span className="results__tag-text">{kw}</span>
                      </button>
                    )
                  })}
                </div>
              ) : (
                <div className="results__empty-state">
                  <p>
                    {keywordSearch
                      ? `No keywords matching "${keywordSearch}"`
                      : '🎉 Outstanding! No critical keyword deficits were identified.'}
                  </p>
                </div>
              )}
            </div>

            {/* Actionable Keyword Insertion Advice */}
            <div className="results__bullet-card results__bullet-card--info">
              <h4>🎯 Recommended Strategic Insertions</h4>
              <p className="results__card-sub">
                Specific areas where inserting these skills will yield the greatest impact on ATS algorithms:
              </p>
              <ul className="results__item-list">
                {analysis.improvements
                  ?.filter(
                    (imp) =>
                      imp.toLowerCase().includes('skill') ||
                      imp.toLowerCase().includes('technol') ||
                      imp.toLowerCase().includes('keyword') ||
                      imp.toLowerCase().includes('add') ||
                      imp.toLowerCase().includes('tool')
                  )
                  .map((item, idx) => (
                    <li key={idx} className="results__list-item">
                      <span className="results__item-bullet results__item-bullet--cyan">→</span>
                      <p className="results__item-text">{item}</p>
                    </li>
                  ))}
                {(!analysis.improvements || analysis.improvements.length === 0) && (
                  <li className="results__item-empty">No additional skill insertions recommended.</li>
                )}
              </ul>
            </div>
          </div>
        )}

        {/* ================= TAB 3: XYZ BULLET OPTIMIZER ================= */}
        {activeTab === 'optimizer' && (
          <div className="results__panel fade-in">
            <div className="results__section-intro">
              <div>
                <h3 className="results__section-title">Google XYZ Formula Optimizer</h3>
                <p className="results__section-desc">
                  Top tier engineering and product teams (Google, Stripe, Meta) evaluate resumes on the
                  proven <strong>XYZ framework</strong>: <em>"Accomplished [X], as measured by [Y], by doing [Z]"</em>.
                </p>
              </div>

              {totalFixCount > 0 && (
                <div className="results__progress-indicator">
                  <span className="results__progress-text">
                    Checklist: <strong>{completedFixCount}/{totalFixCount}</strong> applied
                  </span>
                  <div className="results__progress-bar-small">
                    <div
                      className="results__progress-bar-inner"
                      style={{ width: `${(completedFixCount / totalFixCount) * 100}%` }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Formula Visual Breakdown */}
            <div className="results__formula-banner">
              <div className="results__formula-parts">
                <div className="results__formula-chip results__formula-chip--x">
                  <span className="results__chip-letter">X</span>
                  <span className="results__chip-name">Accomplished</span>
                  <span className="results__chip-desc">Action Verb & Objective</span>
                </div>
                <span className="results__formula-operator">+</span>
                <div className="results__formula-chip results__formula-chip--y">
                  <span className="results__chip-letter">Y</span>
                  <span className="results__chip-name">Measured By</span>
                  <span className="results__chip-desc">Quantified Metric (%, $, hrs)</span>
                </div>
                <span className="results__formula-operator">+</span>
                <div className="results__formula-chip results__formula-chip--z">
                  <span className="results__chip-letter">Z</span>
                  <span className="results__chip-name">By Doing</span>
                  <span className="results__chip-desc">Specific Tech / Strategy</span>
                </div>
              </div>

              <div className="results__formula-comparison">
                <div className="results__example-box results__example-box--weak">
                  <span className="results__example-tag results__example-tag--bad">Weak Bullet (Passive)</span>
                  <p>"Responsible for creating APIs and improving frontend response times."</p>
                </div>
                <div className="results__example-box results__example-box--strong">
                  <span className="results__example-tag results__example-tag--good">High Impact XYZ Formula</span>
                  <p>
                    "Reduced 95th-percentile API latency by <strong>45% (Y)</strong> across 14 microservices by
                    implementing Redis caching and async worker pools <strong>(Z)</strong>, supporting <strong>2.5M daily active users (X)</strong>."
                  </p>
                </div>
              </div>
            </div>

            {/* Interactive Checklist of AI Suggested Fixes */}
            <div className="results__checklist-card">
              <div className="results__checklist-header">
                <h4>Interactive Resume Action Items</h4>
                <p>Click checkboxes as you apply each rewrite to your document:</p>
              </div>

              <div className="results__checklist-items">
                {analysis.improvements?.map((item, idx) => {
                  const isChecked = Boolean(completedFixes[idx])
                  return (
                    <div
                      key={idx}
                      className={`results__checklist-row ${
                        isChecked ? 'results__checklist-row--completed' : ''
                      }`}
                      onClick={() => toggleFix(idx)}
                    >
                      <div className="results__checkbox">
                        {isChecked && <IconCheck size={14} />}
                      </div>
                      <div className="results__checklist-content">
                        <p className="results__checklist-text">{item}</p>
                      </div>
                    </div>
                  )
                })}
                {(!analysis.improvements || analysis.improvements.length === 0) && (
                  <p className="results__item-empty">No specific bullet point revisions required.</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 4: TAILORED COVER LETTER ================= */}
        {activeTab === 'coverletter' && (
          <div className="results__panel fade-in">
            <div className="results__section-intro">
              <div>
                <h3 className="results__section-title">Targeted AI Cover Letter Builder</h3>
                <p className="results__section-desc">
                  Generates an impactful, professionally framed cover letter linking your quantified resume
                  achievements with the target company's exact requirements.
                </p>
              </div>
            </div>

            {/* JD Input Panel */}
            {editingJd ? (
              <div className="results__jd-editor-card">
                <div className="results__jd-editor-header">
                  <h4>Target Job Description</h4>
                  <span className="results__jd-req-badge">Required for Tailoring</span>
                </div>
                <textarea
                  className="results__jd-editor-textarea"
                  placeholder="Paste the target Job Description (JD) here to generate a tailored cover letter..."
                  value={jdText}
                  onChange={(e) => setJdText(e.target.value)}
                  rows={6}
                />
                <div className="results__jd-editor-actions">
                  {initialJd && (
                    <button
                      type="button"
                      className="results__btn-secondary"
                      onClick={() => {
                        setJdText(initialJd)
                        setEditingJd(false)
                      }}
                    >
                      Reset to Initial JD
                    </button>
                  )}
                  <button
                    type="button"
                    className="results__btn-primary"
                    disabled={!jdText.trim()}
                    onClick={() => setEditingJd(false)}
                  >
                    Lock Job Description & Proceed
                  </button>
                </div>
              </div>
            ) : (
              <div className="results__jd-summary-banner">
                <div className="results__jd-summary-left">
                  <IconTarget size={18} className="results__jd-summary-icon" />
                  <div>
                    <span className="results__jd-summary-title">Active Target Job Description Loaded</span>
                    <span className="results__jd-summary-len">{jdText.length} characters</span>
                  </div>
                </div>
                <button
                  type="button"
                  className="results__btn-secondary"
                  onClick={() => setEditingJd(true)}
                >
                  <IconEdit size={14} />
                  <span>Edit JD</span>
                </button>
              </div>
            )}

            {/* Trigger Button if not generated yet */}
            {!coverLetter && !clLoading && (
              <div className="results__generate-callout">
                <div className="results__generate-callout-icon">
                  <IconMail size={32} />
                </div>
                <h4>Ready to generate a tailored cover letter?</h4>
                <p>
                  Gemini will extract your strongest accomplishments and align them directly with the target role.
                </p>
                <button
                  type="button"
                  className="results__btn-generate"
                  disabled={editingJd || !jdText.trim()}
                  onClick={handleCreateCoverLetter}
                >
                  <IconSparkles size={18} />
                  <span>Generate AI Cover Letter</span>
                </button>
                {!jdText.trim() && (
                  <p className="results__warning-note">
                    ⚠️ Please provide and lock a Target Job Description above to unlock generation.
                  </p>
                )}
              </div>
            )}

            {/* Loading State */}
            {clLoading && (
              <div className="results__loading-box">
                <div className="results__spinner-ring" />
                <h4>Synthesizing your personalized cover letter...</h4>
                <p>Analyzing job criteria and matching resume achievements (typically 8–15s)</p>
              </div>
            )}

            {/* Error Message */}
            {clError && (
              <div className="results__error-card">
                <IconAlertTriangle size={20} />
                <div className="results__error-text">
                  <p>{clError}</p>
                </div>
                <button
                  type="button"
                  className="results__btn-secondary"
                  onClick={handleCreateCoverLetter}
                >
                  Retry
                </button>
              </div>
            )}

            {/* Document Paper Preview */}
            {coverLetter && !clLoading && (
              <div className="results__doc-container fade-in">
                <div className="results__doc-actions">
                  <div className="results__doc-metrics">
                    <span>{coverLetter.trim().split(/\s+/).length} words</span>
                    <span>•</span>
                    <span>~{Math.ceil(coverLetter.trim().split(/\s+/).length / 200)} min read</span>
                  </div>
                  <div className="results__doc-buttons">
                    <button
                      type="button"
                      className="results__doc-btn"
                      onClick={handleCopyCoverLetter}
                    >
                      <IconCopy size={15} />
                      <span>Copy Letter</span>
                    </button>
                    <button
                      type="button"
                      className="results__doc-btn"
                      onClick={handlePrintCoverLetter}
                    >
                      <IconPrinter size={15} />
                      <span>Print / PDF</span>
                    </button>
                    <button
                      type="button"
                      className="results__doc-btn results__doc-btn--danger"
                      onClick={() => setCoverLetter('')}
                    >
                      <IconRefreshCw size={15} />
                      <span>Regenerate</span>
                    </button>
                  </div>
                </div>

                <div className="results__paper-wrapper">
                  <div className="results__paper">
                    <div className="results__paper-header-decor" />
                    <pre className="results__paper-body">{coverLetter}</pre>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ================= TAB 5: MOCK INTERVIEW COACH ================= */}
        {activeTab === 'interview' && (
          <div className="results__panel fade-in">
            <div className="results__section-intro">
              <div>
                <h3 className="results__section-title">STAR Method Mock Interview Simulator</h3>
                <p className="results__section-desc">
                  Interactive behavioral and technical questions derived directly from your experience and the target JD.
                  Each question includes an expert answer blueprint using the <strong>STAR Method</strong> (Situation, Task, Action, Result).
                </p>
              </div>
            </div>

            {/* JD Input Panel if required */}
            {editingJd ? (
              <div className="results__jd-editor-card">
                <div className="results__jd-editor-header">
                  <h4>Target Job Description</h4>
                  <span className="results__jd-req-badge">Required for Interview Scenarios</span>
                </div>
                <textarea
                  className="results__jd-editor-textarea"
                  placeholder="Paste the target Job Description (JD) here to generate tailored interview questions..."
                  value={jdText}
                  onChange={(e) => setJdText(e.target.value)}
                  rows={6}
                />
                <div className="results__jd-editor-actions">
                  {initialJd && (
                    <button
                      type="button"
                      className="results__btn-secondary"
                      onClick={() => {
                        setJdText(initialJd)
                        setEditingJd(false)
                      }}
                    >
                      Reset to Initial JD
                    </button>
                  )}
                  <button
                    type="button"
                    className="results__btn-primary"
                    disabled={!jdText.trim()}
                    onClick={() => setEditingJd(false)}
                  >
                    Lock Job Description & Proceed
                  </button>
                </div>
              </div>
            ) : (
              <div className="results__jd-summary-banner">
                <div className="results__jd-summary-left">
                  <IconTarget size={18} className="results__jd-summary-icon" />
                  <div>
                    <span className="results__jd-summary-title">Active Target Job Description Loaded</span>
                    <span className="results__jd-summary-len">{jdText.length} characters</span>
                  </div>
                </div>
                <button
                  type="button"
                  className="results__btn-secondary"
                  onClick={() => setEditingJd(true)}
                >
                  <IconEdit size={14} />
                  <span>Edit JD</span>
                </button>
              </div>
            )}

            {/* Trigger Button if not generated */}
            {questions.length === 0 && !intLoading && (
              <div className="results__generate-callout">
                <div className="results__generate-callout-icon">
                  <IconGraduationCap size={32} />
                </div>
                <h4>Prepare for high-stakes technical & behavioral interviews</h4>
                <p>
                  AI will act as a hiring manager from top tech firms and generate customized questions tailored to your background.
                </p>
                <button
                  type="button"
                  className="results__btn-generate"
                  disabled={editingJd || !jdText.trim()}
                  onClick={handleCreateInterviewPrep}
                >
                  <IconSparkles size={18} />
                  <span>Generate Custom STAR Interview Prep</span>
                </button>
                {!jdText.trim() && (
                  <p className="results__warning-note">
                    ⚠️ Please provide and lock a Target Job Description above to unlock interview prep.
                  </p>
                )}
              </div>
            )}

            {/* Loading */}
            {intLoading && (
              <div className="results__loading-box">
                <div className="results__spinner-ring" />
                <h4>Synthesizing realistic interview questions...</h4>
                <p>Formulating technical scenarios & STAR response models (10–18s)</p>
              </div>
            )}

            {/* Error */}
            {intError && (
              <div className="results__error-card">
                <IconAlertTriangle size={20} />
                <div className="results__error-text">
                  <p>{intError}</p>
                </div>
                <button
                  type="button"
                  className="results__btn-secondary"
                  onClick={handleCreateInterviewPrep}
                >
                  Retry
                </button>
              </div>
            )}

            {/* Questions Accordion */}
            {questions.length > 0 && !intLoading && (
              <div className="results__interview-container fade-in">
                <div className="results__interview-toolbar">
                  <span className="results__interview-count">
                    {questions.length} Targeted Scenarios Generated
                  </span>
                  <div className="results__interview-actions">
                    <button
                      type="button"
                      className="results__btn-secondary"
                      onClick={() =>
                        setExpandedQuestion(
                          expandedQuestion === 'all' ? null : 'all'
                        )
                      }
                    >
                      {expandedQuestion === 'all' ? 'Collapse All' : 'Expand All'}
                    </button>
                    <button
                      type="button"
                      className="results__btn-secondary results__btn-secondary--danger"
                      onClick={() => setQuestions([])}
                    >
                      <IconRefreshCw size={14} />
                      <span>Regenerate</span>
                    </button>
                  </div>
                </div>

                <div className="results__question-list">
                  {questions.map((q) => {
                    const isExpanded = expandedQuestion === 'all' || expandedQuestion === q.id
                    const isPracticed = Boolean(practicedQuestions[q.id])

                    return (
                      <div
                        key={q.id}
                        className={`results__q-card ${isExpanded ? 'results__q-card--open' : ''} ${
                          isPracticed ? 'results__q-card--practiced' : ''
                        }`}
                      >
                        <div
                          className="results__q-header"
                          onClick={() =>
                            setExpandedQuestion(expandedQuestion === q.id ? null : q.id)
                          }
                        >
                          <div className="results__q-left">
                            <span
                              className={`results__q-type-badge results__q-type-badge--${(
                                q.type || 'technical'
                              )
                                .toLowerCase()
                                .replace(/\s+/g, '-')}`}
                            >
                              {q.type || 'Interview'}
                            </span>
                            <h4 className="results__q-title">{q.question}</h4>
                          </div>

                          <div className="results__q-right">
                            <button
                              type="button"
                              className={`results__q-practice-btn ${
                                isPracticed ? 'results__q-practice-btn--active' : ''
                              }`}
                              onClick={(e) => {
                                e.stopPropagation()
                                setPracticedQuestions((prev) => ({
                                  ...prev,
                                  [q.id]: !prev[q.id],
                                }))
                                showToast(
                                  isPracticed ? 'Marked as unpracticed' : 'Marked as practiced! ✓'
                                )
                              }}
                              title={isPracticed ? 'Mark unpracticed' : 'Mark practiced'}
                            >
                              <IconCheckCircle2 size={16} />
                              <span>{isPracticed ? 'Practiced' : 'Mark Practiced'}</span>
                            </button>

                            <span className="results__q-arrow">
                              {isExpanded ? <IconChevronUp size={18} /> : <IconChevronDown size={18} />}
                            </span>
                          </div>
                        </div>

                        {isExpanded && (
                          <div className="results__q-body fade-in">
                            <div className="results__star-label">
                              <span className="results__star-tag">STAR Response Blueprint:</span>
                              <button
                                type="button"
                                className="results__q-copy-btn"
                                onClick={() => {
                                  navigator.clipboard.writeText(
                                    `Question: ${q.question}\n\nIdeal Strategy:\n${q.answer}`
                                  )
                                  showToast('Interview scenario copied!')
                                }}
                              >
                                <IconCopy size={13} />
                                <span>Copy Answer Guide</span>
                              </button>
                            </div>
                            <div className="results__star-text-wrapper">
                              <p className="results__star-text">{q.answer}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
