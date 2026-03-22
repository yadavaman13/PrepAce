import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import '../style/landing.scss';
import { useAuth } from '../../auth/hooks/useAuth';

const Landing = () => {
    const navigate = useNavigate();
    const { user } = useAuth();

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

    const handleGetStarted = () => {
        if (user) {
            navigate('/dashboard');
        } else {
            navigate('/login');
        }
    };

    return (
        <div className="landing-page">
            <nav className="navbar">
                <div className="navbar__logo">
                    <span className="logo-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
                    </span>
                    Prep<span className="highlight">Ace</span>
                </div>
                <div className="navbar__actions">
                    {user ? (
                        <button className="button primary-button" onClick={() => navigate('/dashboard')}>Dashboard</button>
                    ) : (
                        <>
                            <button className="button outline-button" onClick={() => navigate('/login')}>Login</button>
                            <button className="button primary-button" onClick={() => navigate('/register')}>Get Started</button>
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
                    <div className="badge hero__badge">AI-Powered Career Coach</div>
                    <h1 className="hero__title">
                        From <span className="highlight">Prep</span> to <span className="highlight">Offer</span>,<br /> Ace Every Step.
                    </h1>
                    <p className="hero__subtitle">
                        Struggling to stand out in a competitive job market? Let our AI analyze your unique profile against your dream job description. We automatically generate a tailored interview strategy, pinpoint your skill gaps, and provide a fully optimized resume to help you secure the offer.
                    </p>
                    <div className="hero__actions">
                        <button className="button primary-button hero__cta" onClick={handleGetStarted}>
                            Start Preparing Now
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                        </button>
                    </div>
                </div>
                <div className="hero__visual animate-on-scroll delay-1">
                    <div className="mockup-card">
                        <div className="mockup-card__header">
                            <span className="dot dot--red"></span>
                            <span className="dot dot--yellow"></span>
                            <span className="dot dot--green"></span>
                        </div>
                        <div className="mockup-card__body">
                            <div className="mockup-line title-line"></div>
                            <div className="mockup-line text-line"></div>
                            <div className="mockup-line text-line"></div>
                            <div className="mockup-line text-line loading"></div>
                            
                            <div className="mockup-card__match">
                                <div className="match-circle">
                                    <span className="match-score">92%</span>
                                </div>
                                <div className="match-text">Profile Match</div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <section className="features-section">
                <div className="section-header animate-on-scroll">
                    <h2>Everything you need to <span className="highlight">Stand Out</span></h2>
                    <p>A unified, intelligent workflow designed to turn your standard job applications into successful job offers.</p>
                </div>
                
                <div className="features-grid">
                    <div className="feature-card animate-on-scroll delay-1">
                        <div className="feature-card__icon has-glow">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16h16v-8Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10.4 12.6a2 2 0 1 1 3 3L8 21l-4 1 1-4Z"/></svg>
                        </div>
                        <h3>Smart Resume Optimization</h3>
                        <p>Don't send the same resume to every employer. Upload your current CV alongside the target job description. Our AI instantly analyzes the specific employer requirements, identifies missing keywords, and generates a downloadable, ATS-optimized PDF tailored precisely for that role.</p>
                    </div>

                    <div className="feature-card animate-on-scroll delay-2">
                        <div className="feature-card__icon has-glow">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                        </div>
                        <h3>Targeted Interview Prep</h3>
                        <p>Stop wasting time practicing generic questions. Our engine generates highly specific behavioral and technical interview questions mapped directly to the actual responsibilities of the job you want, ensuring you are prepared for what the hiring manager will genuinely ask.</p>
                    </div>

                    <div className="feature-card animate-on-scroll delay-3">
                        <div className="feature-card__icon has-glow">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
                        </div>
                        <h3>Actionable Success Roadmap</h3>
                        <p>Receive a comprehensive, day-by-day preparation plan. We surface your critical skill gaps and tell you exactly what technical and soft-skill topics to focus your energy on before the big day, helping you bridge the knowledge gap efficiently.</p>
                    </div>
                </div>
            </section>

            <section className="how-it-works">
                <h2 className="animate-on-scroll">How <span className="highlight">PrepAce</span> Works</h2>
                <div className="steps-container">
                    <div className="step animate-on-scroll delay-1">
                        <div className="step__number">1</div>
                        <h3>Provide Your Context</h3>
                        <p>Simply paste the text of the job description you are applying for. Then, upload your current resume or provide a brief self-description of your professional background.</p>
                    </div>
                    <div className="step-connector animate-on-scroll delay-2"></div>
                    <div className="step animate-on-scroll delay-2">
                        <div className="step__number">2</div>
                        <h3>AI-Powered Analysis</h3>
                        <p>Our advanced AI engine cross-references your profile with the job requirements. It calculates your match percentage and pinpoints exactly where your experience aligns perfectly.</p>
                    </div>
                    <div className="step-connector animate-on-scroll delay-3"></div>
                    <div className="step animate-on-scroll delay-3">
                        <div className="step__number">3</div>
                        <h3>Preview & Execute</h3>
                        <p>Review your custom interview strategy, practice the generated mock questions, and download your newly optimized resume. Walk into your interview with complete confidence.</p>
                    </div>
                </div>
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
                            <a href="#">Features</a>
                            <a href="#">Pricing</a>
                            <a href="#">Try Now</a>
                        </div>
                        <div className="link-group">
                            <h4>Legal</h4>
                            <a href="#">Privacy Policy</a>
                            <a href="#">Terms of Service</a>
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
