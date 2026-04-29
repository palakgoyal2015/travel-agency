import './SignInPage.css';

function LuggageIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <rect x="6" y="8" width="12" height="13" rx="2" />
            <path d="M9 8V6a3 3 0 016 0v2" />
            <line x1="12" y1="12" x2="12" y2="16" />
            <line x1="10" y1="14" x2="14" y2="14" />
        </svg>
    );
}

export function SignInPage({ onNavigateToRegister }) {
    return (
        <div className="signin-page">
            <div className="signin-page__card">
                <div className="signin-page__brand">
                    <LuggageIcon />
                    Travel Agency
                </div>
                <h1 className="signin-page__title">Sign In</h1>
                <p className="signin-page__subtitle">
                    Sign In will be implemented in User Story 2.
                </p>
                <button type="button" className="signin-page__back" onClick={onNavigateToRegister}>
                    ← Back to Registration
                </button>
            </div>
        </div>
    );
}
