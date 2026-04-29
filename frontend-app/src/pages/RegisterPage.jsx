import heroImg from '../assets/hero.png';
import previewImg from '../assets/travel-agency-preview.jpg';
import { RegistrationForm } from '../components/registration/RegistrationForm';
import './RegisterPage.css';

function LuggageIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="reg-page__luggage-icon">
            <rect x="6" y="8" width="12" height="13" rx="2" />
            <path d="M9 8V6a3 3 0 016 0v2" />
            <line x1="12" y1="12" x2="12" y2="16" />
            <line x1="10" y1="14" x2="14" y2="14" />
        </svg>
    );
}

export function RegisterPage({ onNavigateToSignIn }) {
    return (
        <div className="reg-page">
            {/* ── Left branding panel ── */}
            <aside className="reg-page__panel">
                <div className="reg-page__brand">
                    <LuggageIcon />
                    <span className="reg-page__brand-name">Travel Agency</span>
                </div>

                <div className="reg-page__hero">
                    <img src={heroImg} alt="" className="reg-page__hero-img" aria-hidden="true" />
                </div>

                <div className="reg-page__tagline">
                    <h2>Let's plan your<br />next trip!</h2>
                    <p>Join thousands of travellers who trust us to craft unforgettable journeys.</p>
                </div>

                <div className="reg-page__preview-wrap">
                    <img src={previewImg} alt="Travel Agency app preview" className="reg-page__preview-img" />
                </div>

                <ul className="reg-page__features">
                    <li><span className="reg-page__dot" />500+ curated destinations</li>
                    <li><span className="reg-page__dot" />Free cancellation on most tours</li>
                    <li><span className="reg-page__dot" />Dedicated personal travel agent</li>
                </ul>
            </aside>

            {/* ── Right form panel ── */}
            <main className="reg-page__form-area">
                <div className="reg-page__card">
                    <RegistrationForm onNavigateToSignIn={onNavigateToSignIn} />
                </div>
            </main>
        </div>
    );
}
