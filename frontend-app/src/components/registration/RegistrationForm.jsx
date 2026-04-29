import { FormInput } from '../common/FormInput';
import { useRegistration } from '../../hooks/useRegistration';
import './RegistrationForm.css';

export function RegistrationForm({ onNavigateToSignIn }) {
    const { fields, errors, serverError, loading, success, handleChange, handleSubmit } =
        useRegistration(onNavigateToSignIn);

    if (success) {
        return (
            <div className="reg-form__success">
                <div className="reg-form__success-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>
                <h2>Account Created!</h2>
                <p>Your account has been successfully created.<br />Redirecting you to Sign In…</p>
            </div>
        );
    }

    return (
        <form className="reg-form" onSubmit={handleSubmit} noValidate>
            <div className="reg-form__header">
                <h1 className="reg-form__title">Create Account</h1>
                <p className="reg-form__subtitle">Start planning your next adventure</p>
            </div>

            <div className="reg-form__row">
                <FormInput
                    label="First Name"
                    name="firstName"
                    value={fields.firstName}
                    onChange={handleChange}
                    error={errors.firstName}
                    placeholder="John"
                />
                <FormInput
                    label="Last Name"
                    name="lastName"
                    value={fields.lastName}
                    onChange={handleChange}
                    error={errors.lastName}
                    placeholder="Doe"
                />
            </div>

            <FormInput
                label="Email Address"
                name="email"
                type="email"
                value={fields.email}
                onChange={handleChange}
                error={errors.email}
                placeholder="john.doe@example.com"
            />

            <FormInput
                label="Create Password"
                name="password"
                type="password"
                value={fields.password}
                onChange={handleChange}
                error={errors.password}
                placeholder="Min 8 chars, letter + digit"
            />

            <FormInput
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                value={fields.confirmPassword}
                onChange={handleChange}
                error={errors.confirmPassword}
                placeholder="Repeat your password"
            />

            {serverError && (
                <div className="reg-form__server-error" role="alert">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10" />
                        <line x1="12" y1="8" x2="12" y2="12" />
                        <line x1="12" y1="16" x2="12.01" y2="16" />
                    </svg>
                    {serverError}
                </div>
            )}

            <button
                type="submit"
                className="reg-form__submit"
                disabled={loading}
            >
                {loading ? (
                    <span className="reg-form__spinner" aria-label="Loading" />
                ) : (
                    'Create Account'
                )}
            </button>

            <p className="reg-form__signin-link">
                Already have an account?{' '}
                <button type="button" className="reg-form__link" onClick={onNavigateToSignIn}>
                    Sign In
                </button>
            </p>
        </form>
    );
}
