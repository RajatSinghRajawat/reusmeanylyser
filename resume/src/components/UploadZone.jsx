import { useState, useRef, useEffect } from 'react'
import {
  IconUploadCloud,
  IconFileText,
  IconSparkles,
  IconX,
  IconAlertTriangle,
  IconRefreshCw,
  IconChevronDown,
  IconChevronUp,
  IconTarget,
  IconCheck,
  IconArrowRight,
} from './Icons'
import { SAMPLE_JOB_DESCRIPTIONS } from '../sampleData'

const ACCEPTED_TYPES = {
  'application/pdf': '.pdf',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': '.docx',
}

const LOADING_STEPS = [
  'Extracting text & formatting from document...',
  'Analyzing syntax against modern ATS parsers...',
  'Evaluating quantifiable metrics & XYZ formula...',
  'Synthesizing actionable career recommendations...',
]

export default function UploadZone({
  onAnalyze,
  loading,
  error,
  errorRetryable,
  onRetry,
  onLoadDemo,
}) {
  const [dragActive, setDragActive] = useState(false)
  const [selectedFile, setSelectedFile] = useState(null)
  const [jobDescription, setJobDescription] = useState('')
  const [showJd, setShowJd] = useState(false)
  const [loadingStepIndex, setLoadingStepIndex] = useState(0)

  const fileInputRef = useRef(null)

  // Rotate through loading steps to provide realistic and reassuring feedback
  useEffect(() => {
    if (!loading) return
    const interval = setInterval(() => {
      setLoadingStepIndex((prev) => (prev < LOADING_STEPS.length - 1 ? prev + 1 : prev))
    }, 4000)
    return () => {
      clearInterval(interval)
      setLoadingStepIndex(0)
    }
  }, [loading])

  const validateAndSelectFile = (file) => {
    if (!file) return
    const isPdfOrDocx =
      ACCEPTED_TYPES[file.type] ||
      file.name.toLowerCase().endsWith('.pdf') ||
      file.name.toLowerCase().endsWith('.docx')

    if (!isPdfOrDocx) {
      onAnalyze(null, 'Invalid file format. Please upload a PDF (.pdf) or Word document (.docx).')
      return
    }

    if (file.size > 10 * 1024 * 1024) {
      onAnalyze(null, 'File size exceeds 10MB limit. Please upload a smaller file.')
      return
    }

    setSelectedFile(file)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setDragActive(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndSelectFile(e.dataTransfer.files[0])
    }
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    setDragActive(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    setDragActive(false)
  }

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      validateAndSelectFile(e.target.files[0])
    }
  }

  const triggerAnalyze = () => {
    if (!selectedFile) return
    onAnalyze(selectedFile, null, jobDescription)
  }

  const formatFileSize = (bytes) => {
    if (!bytes) return '0 B'
    const k = 1024
    const sizes = ['B', 'KB', 'MB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`
  }

  const handlePreFillJd = (text) => {
    setJobDescription(text)
    setShowJd(true)
  }

  return (
    <section className="upload" id="upload">
      <div className="upload__container">
        {/* Main Upload Dropzone */}
        <div
          className={`upload__dropzone ${dragActive ? 'upload__dropzone--drag' : ''} ${
            loading ? 'upload__dropzone--loading' : ''
          }`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => !selectedFile && !loading && fileInputRef.current?.click()}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.docx"
            disabled={loading}
            hidden
            onChange={handleFileChange}
          />

          {!selectedFile ? (
            <div className="upload__empty-state">
              <div className="upload__icon-halo">
                <IconUploadCloud size={32} className="upload__icon-cloud" />
              </div>
              <h3 className="upload__title">Drag & drop your resume here</h3>
              <p className="upload__subtitle">
                Supports <span className="upload__highlight">PDF</span> and <span className="upload__highlight">DOCX</span> documents (up to 10MB)
              </p>

              <div className="upload__actions-row">
                <button
                  type="button"
                  className="upload__btn upload__btn--primary"
                  onClick={(e) => {
                    e.stopPropagation()
                    fileInputRef.current?.click()
                  }}
                  disabled={loading}
                >
                  <IconFileText size={16} />
                  <span>Choose Resume File</span>
                </button>

                {onLoadDemo && (
                  <button
                    type="button"
                    className="upload__btn upload__btn--demo"
                    onClick={(e) => {
                      e.stopPropagation()
                      onLoadDemo()
                    }}
                    disabled={loading}
                  >
                    <IconSparkles size={16} />
                    <span>Try Demo Resume</span>
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="upload__selected-file-card fade-in" onClick={(e) => e.stopPropagation()}>
              <div className="upload__file-info-group">
                <div className="upload__file-icon-box">
                  <IconFileText size={28} />
                </div>
                <div className="upload__file-details">
                  <div className="upload__file-name-row">
                    <span className="upload__file-name" title={selectedFile.name}>
                      {selectedFile.name}
                    </span>
                    <span className="upload__file-badge">
                      {selectedFile.name.endsWith('.docx') ? 'DOCX' : 'PDF'}
                    </span>
                  </div>
                  <span className="upload__file-size">{formatFileSize(selectedFile.size)}</span>
                </div>
              </div>

              <div className="upload__file-actions">
                <button
                  type="button"
                  className="upload__btn-ghost"
                  onClick={() => {
                    setSelectedFile(null)
                    if (fileInputRef.current) fileInputRef.current.value = ''
                  }}
                  disabled={loading}
                  title="Remove selected file"
                >
                  <IconX size={16} />
                  <span>Change File</span>
                </button>

                <button
                  type="button"
                  className="upload__btn upload__btn--analyze"
                  onClick={triggerAnalyze}
                  disabled={loading}
                >
                  <IconSparkles size={16} />
                  <span>{loading ? 'Analyzing...' : 'Run ATS Analysis'}</span>
                  {!loading && <IconArrowRight size={16} />}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Target Job Description Collapsible Accordion */}
        <div className={`upload__jd-card ${showJd ? 'upload__jd-card--open' : ''}`}>
          <div className="upload__jd-header" onClick={() => setShowJd(!showJd)}>
            <div className="upload__jd-header-left">
              <span className="upload__jd-icon-badge">
                <IconTarget size={18} />
              </span>
              <div>
                <h4 className="upload__jd-title">Target Job Description (Optional)</h4>
                <p className="upload__jd-desc">
                  Compare your resume directly against specific role criteria for tailored keyword gap analysis
                </p>
              </div>
            </div>

            <div className="upload__jd-header-right">
              {jobDescription.trim() && (
                <span className="upload__jd-filled-tag">
                  <IconCheck size={12} />
                  {jobDescription.trim().length} chars
                </span>
              )}
              <button
                type="button"
                className="upload__jd-toggle-btn"
                aria-label={showJd ? 'Collapse Job Description' : 'Expand Job Description'}
              >
                {showJd ? <IconChevronUp size={18} /> : <IconChevronDown size={18} />}
              </button>
            </div>
          </div>

          {showJd && (
            <div className="upload__jd-body fade-in">
              <div className="upload__jd-presets">
                <span className="upload__jd-presets-label">Quick Sample Roles:</span>
                {SAMPLE_JOB_DESCRIPTIONS.map((preset, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className="upload__jd-preset-chip"
                    onClick={() => handlePreFillJd(preset.text)}
                  >
                    + {preset.title}
                  </button>
                ))}
              </div>

              <textarea
                className="upload__jd-input"
                placeholder="Paste the target job description or paste responsibilities and requirements here..."
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                disabled={loading}
                rows={5}
              />

              {jobDescription.trim() && (
                <div className="upload__jd-footer">
                  <span className="upload__jd-success-note">
                    ✓ AI will match skills, extract missing role keywords, and prepare custom interview questions for this specific JD.
                  </span>
                  <button
                    type="button"
                    className="upload__jd-clear-btn"
                    onClick={() => setJobDescription('')}
                  >
                    Clear JD
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Error Presentation */}
      {error && (
        <div className="upload__error-card fade-in" role="alert">
          <div className="upload__error-icon">
            <IconAlertTriangle size={24} />
          </div>
          <div className="upload__error-body">
            <h4 className="upload__error-headline">
              {errorRetryable ? 'Analysis Request Paused' : 'Upload Verification Error'}
            </h4>
            <p className="upload__error-description">{error}</p>
          </div>
          {errorRetryable && onRetry && (
            <button
              type="button"
              className="upload__error-retry-btn"
              onClick={onRetry}
              disabled={loading}
            >
              <IconRefreshCw size={14} />
              <span>Retry Analysis</span>
            </button>
          )}
        </div>
      )}

      {/* Modern Multi-Step Loading Experience */}
      {loading && (
        <div className="upload__loading-card fade-in">
          <div className="upload__loading-spinner-wrap">
            <div className="upload__loading-spinner" />
            <IconSparkles size={20} className="upload__loading-sparkle-center" />
          </div>
          <div className="upload__loading-content">
            <h4 className="upload__loading-stage-title">Gemini AI is analyzing your resume</h4>
            <p className="upload__loading-stage-desc">{LOADING_STEPS[loadingStepIndex]}</p>
            <div className="upload__progress-track">
              <div
                className="upload__progress-fill"
                style={{
                  width: `${((loadingStepIndex + 1) / LOADING_STEPS.length) * 100}%`,
                }}
              />
            </div>
            <span className="upload__loading-hint">Typically finishes in 10–25 seconds</span>
          </div>
        </div>
      )}
    </section>
  )
}
