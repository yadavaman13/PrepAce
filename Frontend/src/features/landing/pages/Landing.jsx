import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import '../style/landing.scss';
import { useAuth } from '../../auth/hooks/useAuth';

const Landing = () => {
    const navigate = useNavigate();
    const { user } = useAuth();

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

    return (
        <div className="landing-page">
            <nav className="navbar">
                <div className="navbar__logo">
                    Prep<span className="highlight">Ace</span>
                </div>
                <div className="navbar__actions">
                    {user ? (
                        <button className="button primary-button" onClick={() => navigate('/dashboard')}>Dashboard</button>
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
