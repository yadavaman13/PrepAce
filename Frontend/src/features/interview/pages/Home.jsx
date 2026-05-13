import React, { useEffect, useMemo, useRef, useState } from 'react'
import "../style/home.scss"
import { useInterview } from '../hooks/useInterview.js'
import { useNavigate } from 'react-router'

const Home = () => {

    const { loading, generateReport,reports } = useInterview()
    const [ jobDescription, setJobDescription ] = useState("")
    const [ selfDescription, setSelfDescription ] = useState("")
    const [ resumeFile, setResumeFile ] = useState(null)
    const [ fieldErrors, setFieldErrors ] = useState({})
    const [ toastMessage, setToastMessage ] = useState("")
    const [ showAllReports, setShowAllReports ] = useState(false)
    const [ visibleReportCount, setVisibleReportCount ] = useState(4)
    const resumeInputRef = useRef()
    const reportsSectionRef = useRef()

    const navigate = useNavigate()

    const showToast = (message) => {
        setToastMessage(message)
        window.clearTimeout(showToast.timeoutId)
        showToast.timeoutId = window.setTimeout(() => {
            setToastMessage("")
        }, 2500)
    }

    const handleJobDescriptionChange = (e) => {
        const nextValue = e.target.value.slice(0, 5000)
        setJobDescription(nextValue)

        if (fieldErrors.jobDescription) {
            setFieldErrors((current) => {
                const nextErrors = { ...current }
                delete nextErrors.jobDescription
                return nextErrors
            })
        }
    }

    const handleSelfDescriptionChange = (e) => {
        setSelfDescription(e.target.value)

        if (fieldErrors.selfDescription) {
            setFieldErrors((current) => {
                const nextErrors = { ...current }
                delete nextErrors.selfDescription
                return nextErrors
            })
        }
    }

    const handleResumeChange = (e) => {
        const selectedFile = e.target.files?.[0] || null
        setResumeFile(selectedFile)

        if (selectedFile) {
            showToast("Resume uploaded successfully")
            setFieldErrors((current) => {
                const nextErrors = { ...current }
                delete nextErrors.resume
                return nextErrors
            })
        }
    }

    const handleGenerateReport = async () => {
        const nextErrors = {}

        if (!jobDescription.trim()) {
            nextErrors.jobDescription = "Please enter the job description"
        }

        if (!resumeFile) {
            nextErrors.resume = "Please upload the resume"
        }

        if (!selfDescription.trim()) {
            nextErrors.selfDescription = "Please enter the self description"
        }

        setFieldErrors(nextErrors)

        if (Object.keys(nextErrors).length > 0) {
            return
        }

        const data = await generateReport({ jobDescription, selfDescription, resumeFile })
        if (data?._id) {
            navigate(`/interview/${data._id}`)
        }
    }

    useEffect(() => {
        const updateVisibleCount = () => {
            const availableWidth = reportsSectionRef.current?.clientWidth || window.innerWidth
            setVisibleReportCount(availableWidth >= 1380 ? 5 : 4)
        }

        updateVisibleCount()
        window.addEventListener('resize', updateVisibleCount)
        return () => window.removeEventListener('resize', updateVisibleCount)
    }, [])

    useEffect(() => {
        setShowAllReports(false)
    }, [ visibleReportCount ])

    const displayedReports = useMemo(() => {
        if (showAllReports) return reports
        return reports.slice(0, visibleReportCount)
    }, [ reports, showAllReports, visibleReportCount ])

    const hasHiddenReports = reports.length > visibleReportCount

    if (loading) {
        return (
            <main className='loading-screen'>
                <h1>Loading your interview plan...</h1>
            </main>
        )
    }

    return (
        <div className='home-page'>

            {/* Page Header */}
            <header className='page-header'>
                <h1>Create Your Custom <span className='highlight'>Interview Plan</span></h1>
                <p>Let our AI analyze the job requirements and your unique profile to build a winning strategy.</p>
            </header>

            {/* Main Card */}
            <div className='interview-card'>
                <div className='interview-card__body'>

                    {/* Left Panel - Job Description */}
                    <div className='panel panel--left'>
                        <div className='panel__header'>
                            <span className='panel__icon'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></svg>
                            </span>
                            <h2>Target Job Description</h2>
                            <span className='badge badge--required'>Required</span>
                        </div>
                        <textarea
                            value={jobDescription}
                            onChange={handleJobDescriptionChange}
                            className='panel__textarea'
                            placeholder={`Paste the full job description here...\ne.g. 'Senior Frontend Engineer at Google requires proficiency in React, TypeScript, and large-scale system design...'`}
                            maxLength={5000}
                        />
                        <div className='char-counter'>{jobDescription.length} / 5000 chars</div>
                        {fieldErrors.jobDescription && <p className='field-error'>{fieldErrors.jobDescription}</p>}
                    </div>

                    {/* Vertical Divider */}
                    <div className='panel-divider' />

                    {/* Right Panel - Profile */}
                    <div className='panel panel--right'>
                        <div className='panel__header'>
                            <span className='panel__icon'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                            </span>
                            <h2>Your Profile</h2>
                        </div>

                        {/* Upload Resume */}
                        <div className='upload-section'>
                            <label className='section-label'>
                                Upload Resume
                                <span className='badge badge--best'>Best Results</span>
                            </label>
                            <label className='dropzone' htmlFor='resume'>
                                <span className='dropzone__icon'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 16 12 12 8 16" /><line x1="12" y1="12" x2="12" y2="21" /><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" /></svg>
                                </span>
                                <p className='dropzone__title'>Click to upload or drag &amp; drop</p>
                                <p className='dropzone__subtitle'>PDF (Max 3MB)</p>
                                <input
                                    ref={resumeInputRef}
                                    hidden
                                    type='file'
                                    id='resume'
                                    name='resume'
                                    accept='.pdf,.docx'
                                    onChange={handleResumeChange}
                                />
                            </label>
                            {resumeFile && <p className='selected-file'>Selected: {resumeFile.name}</p>}
                            {fieldErrors.resume && <p className='field-error'>{fieldErrors.resume}</p>}
                        </div>
                        <br></br>

                        {/* Quick Self-Description */}
                        <div className='self-description'>
                            <label className='section-label' htmlFor='selfDescription'>Quick Self-Description</label>
                            <textarea
                                value={selfDescription}
                                onChange={handleSelfDescriptionChange}
                                id='selfDescription'
                                name='selfDescription'
                                className='panel__textarea panel__textarea--short'
                                placeholder="Briefly describe your experience, key skills, and years of experience if you don't have a resume handy..."
                            />
                            {fieldErrors.selfDescription && <p className='field-error'>{fieldErrors.selfDescription}</p>}
                        </div>

                        {/* Info Box */}
                        <div className='info-box'>
                            <span className='info-box__icon'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" stroke="#1a1f27" strokeWidth="2" /><line x1="12" y1="16" x2="12.01" y2="16" stroke="#1a1f27" strokeWidth="2" /></svg>
                            </span>
                            <p><strong>Resume</strong> and a <strong>Self Description</strong> is required to generate a personalized plan.</p>
                        </div>
                    </div>
                </div>

                {/* Card Footer */}
                <div className='interview-card__footer'>
                    <span className='footer-info'>AI-Powered Strategy Generation &bull; Approx 30s</span>
                    <button
                        onClick={handleGenerateReport}
                        className='generate-btn'
                        type='button'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M10.6144 17.7956 11.492 15.7854C12.2731 13.9966 13.6789 12.5726 15.4325 11.7942L17.8482 10.7219C18.6162 10.381 18.6162 9.26368 17.8482 8.92277L15.5079 7.88394C13.7092 7.08552 12.2782 5.60881 11.5105 3.75894L10.6215 1.61673C10.2916.821765 9.19319.821767 8.8633 1.61673L7.97427 3.75892C7.20657 5.60881 5.77553 7.08552 3.97685 7.88394L1.63658 8.92277C.868537 9.26368.868536 10.381 1.63658 10.7219L4.0523 11.7942C5.80589 12.5726 7.21171 13.9966 7.99275 15.7854L8.8704 17.7956C9.20776 18.5682 10.277 18.5682 10.6144 17.7956ZM19.4014 22.6899 19.6482 22.1242C20.0882 21.1156 20.8807 20.3125 21.8695 19.8732L22.6299 19.5353C23.0412 19.3526 23.0412 18.7549 22.6299 18.5722L21.9121 18.2532C20.8978 17.8026 20.0911 16.9698 19.6586 15.9269L19.4052 15.3156C19.2285 14.8896 18.6395 14.8896 18.4628 15.3156L18.2094 15.9269C17.777 16.9698 16.9703 17.8026 15.956 18.2532L15.2381 18.5722C14.8269 18.7549 14.8269 19.3526 15.2381 19.5353L15.9985 19.8732C16.9874 20.3125 17.7798 21.1156 18.2198 22.1242L18.4667 22.6899C18.6473 23.104 19.2207 23.104 19.4014 22.6899Z"></path></svg>
                        Generate My Interview Strategy
                    </button>
                </div>
            </div>

            {toastMessage && <div className='toast-message'>{toastMessage}</div>}

            {/* Recent Reports List */}
            {reports.length > 0 && (
                <section className='recent-reports' ref={reportsSectionRef}>
                    <h2>Recent Interview Plans</h2>
                    <ul className='reports-list'>
                        {displayedReports.map(report => (
                            <li key={report._id} className='report-item' onClick={() => navigate(`/interview/${report._id}`)}>
                                <h3>{report.title || 'Untitled Position'}</h3>
                                <p className='report-meta'>Generated on {new Date(report.createdAt).toLocaleDateString()}</p>
                                <p className={`match-score ${report.matchScore >= 80 ? 'score--high' : report.matchScore >= 60 ? 'score--mid' : 'score--low'}`}>Match Score: {report.matchScore}%</p>
                            </li>
                        ))}
                    </ul>
                    {(hasHiddenReports || showAllReports) && (
                        <button
                            type='button'
                            className='reports-toggle-btn'
                            onClick={() => setShowAllReports(prev => !prev)}
                        >
                            {showAllReports ? 'Show fewer plans' : 'View all plans'}
                        </button>
                    )}
                </section>
            )}

            {/* Page Footer */}
            <footer className='page-footer'>
                <a href='#'>Privacy Policy</a>
                <a href='#'>Terms of Service</a>
                <a href='#'>Help Center</a>
            </footer>
        </div>
    )
}

export default Home