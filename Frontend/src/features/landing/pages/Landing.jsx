import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router';
import '../style/landing.scss';
import { useAuth } from '../../auth/hooks/useAuth';

const Landing = () => {
    const navigate = useNavigate();
    const { user, handleLogout } = useAuth();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    const impactItems = [
        'Role-Match Score',
        'ATS Resume Optimization',
        'JD-Aligned Mock Questions',
        'Skill Gap Detection',
        'Personalized Prep Plan',
        'Behavioral + Technical Focus',
        'Faster Screening Readiness',
        'Interview Confidence',
    ];

    const outcomeItems = [
        'Technical Questions',
        'Behavioral Questions',
        'Personalized Roadmap',
        'Match Score Insight',
        'Skill Gap Highlights',
        'Resume Download Ready',
        'Role-Specific Practice',
        'Focused Revision Plan',
    ];

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.1 });

        const elements = document.querySelectorAll('.animate-on-scroll');
        elements.forEach(el => observer.observe(el));

        return () => {
            elements.forEach(el => observer.unobserve(el));
        };
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        };

        if (dropdownOpen) {
            document.addEventListener('click', handleClickOutside);
        }

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [dropdownOpen]);

    const handleGetStarted = () => {
        if (user) {
            navigate('/dashboard');
        } else {
            navigate('/login');
        }
    };

    const handleSeeHowItWorks = () => {
        const targetSection = document.querySelector('.how-it-works');
        targetSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    const handleLogoutClick = async () => {
        setDropdownOpen(false);
        try {
            await handleLogout();
            navigate('/');
        } catch (err) {
            console.error('Logout failed:', err);
        }
    };

    return (
        <div className="landing-page">
            <nav className="navbar">
                <div className="navbar__logo">
                    Prep<span className="highlight">Ace</span>
                </div>
                <div className="navbar__actions">
                    {user ? (
                        <div className="navbar__avatar-container" ref={dropdownRef}>
                            <button 
                                className="navbar__avatar-btn" 
                                onClick={() => setDropdownOpen(prev => !prev)}
                                aria-haspopup="true"
                                aria-expanded={dropdownOpen}
                                aria-label="User menu"
                            >
                                <div className="navbar__avatar">
                                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z" fill="currentColor"/>
                                        <path d="M12.0002 14.5C6.86016 14.5 3.14016 17.65 3.00016 20.91C2.99016 21.11 3.07016 21.31 3.22016 21.45C3.37016 21.59 3.58016 21.66 3.79016 21.66H20.2102C20.4202 21.66 20.6302 21.58 20.7802 21.44C20.9302 21.3 21.0102 21.1 21.0002 20.9C20.8502 17.64 17.1302 14.5 12.0002 14.5Z" fill="currentColor"/>
                                    </svg>
                                </div>
                            </button>
                            {dropdownOpen && (
                                <div className="navbar__dropdown">
                                    <button 
                                        className="navbar__dropdown-item" 
                                        onClick={() => { navigate('/dashboard'); setDropdownOpen(false); }}
                                    >
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="navbar__dropdown-icon">
                                            <rect x="3" y="3" width="7" height="9" />
                                            <rect x="14" y="3" width="7" height="5" />
                                            <rect x="14" y="12" width="7" height="9" />
                                            <rect x="3" y="16" width="7" height="5" />
                                        </svg>
                                        <span>Dashboard</span>
                                    </button>
                                    <button 
                                        className="navbar__dropdown-item logout" 
                                        onClick={handleLogoutClick}
                                    >
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="navbar__dropdown-icon">
                                            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                                            <polyline points="16 17 21 12 16 7" />
                                            <line x1="21" y1="12" x2="9" y2="12" />
                                        </svg>
                                        <span>Logout</span>
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <>
                            <button className="button outline-button" onClick={() => navigate('/login')}>Login</button>
                            <button className="button primary-button" onClick={() => navigate('/register')}>Register</button>
                        </>
                    )}
                </div>
            </nav>

            <header className="hero">
                <div className="hero__background">
                    <div className="hero__glow hero__glow--1"></div>
                    <div className="hero__glow hero__glow--2"></div>
                </div>
                <div className="hero__content animate-on-scroll">
                    <h1 className="hero__title">
                        Know Exactly What It Takes to <span className="highlight">Get Hired.</span>
                    </h1>
                    <p className="hero__subtitle">
                        Analyze any job role and get a <span className="highlight">personalized interview strategy tailored to your profile</span> in seconds.
                    </p>
                    <div className="hero__actions">
                        <button className="button primary-button hero__cta" onClick={handleGetStarted}>
                            Create your interview plan
                        </button>
                        <button type="button" className="button outline-button hero__ghost-cta" onClick={handleSeeHowItWorks}>
                            See How It Works
                        </button>
                    </div>
                    <p className="hero__trust-line">Built for students preparing for placements</p>
                </div>
            </header>

            <section className="carousel-section animate-on-scroll">
                <div className="carousel-row">
                    <div className="carousel-track">
                        {[...impactItems, ...impactItems].map((item, idx) => (
                            <span className="carousel-pill" key={`impact-${idx}`}>{item}</span>
                        ))}
                    </div>
                </div>
                <div className="carousel-row carousel-row--reverse">
                    <div className="carousel-track">
                        {[...outcomeItems, ...outcomeItems].map((item, idx) => (
                            <span className="carousel-pill" key={`audience-${idx}`}>{item}</span>
                        ))}
                    </div>
                </div>
            </section>

            <section className="how-it-works">
                <h2 className="animate-on-scroll">How <span className="highlight">PrepAce</span> Works</h2>
                <div className="steps-container">
                    <div className="step animate-on-scroll delay-1">
                        <div className="step__number">1</div>
                        <h3>Add Job + Profile</h3>
                        <p>Paste the job description and upload your resume, or provide a quick self-summary.</p>
                    </div>
                    <div className="step-connector animate-on-scroll delay-2"></div>
                    <div className="step animate-on-scroll delay-2">
                        <div className="step__number">2</div>
                        <h3>Analyze Gaps</h3>
                        <p>The platform scores role-match, identifies missing skills, and suggests resume improvements.</p>
                    </div>
                    <div className="step-connector animate-on-scroll delay-3"></div>
                    <div className="step animate-on-scroll delay-3">
                        <div className="step__number">3</div>
                        <h3>Practice + Improve</h3>
                        <p>Use generated interview questions and roadmap tasks to improve readiness before interviews.</p>
                    </div>
                </div>
            </section>

            <section className="audience-section">
                <div className="section-header animate-on-scroll">
                    <h2>What you get after your <span className="highlight">submission</span></h2>
                </div>
                <div className="audience-grid">
                    <article className="audience-card animate-on-scroll delay-1">
                        <h3>Result Dashboard</h3>
                        <p>View technical questions, behavioral questions, roadmap, match score, and skill gaps in one structured interface.</p>
                    </article>
                    <article className="audience-card animate-on-scroll delay-2">
                        <h3>Actionable Practice Loop</h3>
                        <p>Use the output to practice weak areas, revise quickly, and reattempt with stronger role alignment before interviews.</p>
                    </article>
                </div>
            </section>

            <section className="cta-section animate-on-scroll">
                <h2>Prepare smarter for placements, not harder.</h2>
                <p>Minimal input, personalized output, and a clear path to interview readiness.</p>
                <button className="button primary-button" onClick={handleGetStarted}>Get Started</button>
            </section>

            <footer className="footer-section">
                <div className="footer-content">
                    <div className="footer-brand">
                        <div className="navbar__logo">Prep<span className="highlight">Ace</span></div>
                        <p>From prep to offer, ace every step.</p>
                    </div>
                    <div className="footer-links">
                        <div className="link-group">
                            <h4>Product</h4>
                            <button type="button" onClick={() => navigate(user ? '/dashboard' : '/register')}>Get Started</button>
                            <button type="button" onClick={() => navigate('/login')}>Login</button>
                        </div>
                    </div>
                </div>
                <div className="footer-bottom">
                    &copy; {new Date().getFullYear()} PrepAce. All rights reserved.
                </div>
            </footer>
        </div>
    );
};

export default Landing;
