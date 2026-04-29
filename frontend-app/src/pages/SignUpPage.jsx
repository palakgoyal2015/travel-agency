import { useState } from 'react';
import { signUp } from '../api/authApi';

const EyeOff = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/>
    <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/>
    <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/>
    <line x1="2" x2="22" y1="2" y2="22"/>
  </svg>
);

const EyeOn = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
);

function checkPassword(pw) {
  return {
    upper:   /[A-Z]/.test(pw),
    lower:   /[a-z]/.test(pw),
    number:  /[0-9]/.test(pw),
    special: /[^A-Za-z0-9]/.test(pw),
    length:  pw.length >= 8 && pw.length <= 16,
  };
}

const SignUpPage = ({ onNavigateToSignIn }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [showPassword, setShowPassword]               = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [submitted, setSubmitted]                     = useState(false);
  const [loading, setLoading]                         = useState(false);
  const [success, setSuccess]                         = useState(false);
  const [serverError, setServerError]                 = useState('');
  const [fieldErrors, setFieldErrors]                 = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (fieldErrors[name]) setFieldErrors(prev => ({ ...prev, [name]: '' }));
    setServerError('');
  };

  const pwChecks   = checkPassword(formData.password);
  const pwValid    = Object.values(pwChecks).every(Boolean);

  const nameRegex  = /^[A-Za-z'-]{2,50}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validate = () => {
    const errs = {};
    if (!nameRegex.test(formData.firstName.trim()))
      errs.firstName = 'First name must be up to 50 characters. Only Latin letters, hyphens, and apostrophes are allowed.';
    if (!nameRegex.test(formData.lastName.trim()))
      errs.lastName = 'Last name must be up to 50 characters. Only Latin letters, hyphens, and apostrophes are allowed.';
    if (!emailRegex.test(formData.email.trim()))
      errs.email = 'Invalid email address. Please ensure it follows the format: username@domain.com';
    if (!pwValid)
      errs.password = 'Password does not meet the requirements.';
    if (formData.confirmPassword !== formData.password)
      errs.confirmPassword = "Passwords don't match.";
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setFieldErrors(errs);
      return;
    }

    setLoading(true);
    setServerError('');
    try {
      await signUp({
        firstName: formData.firstName.trim(),
        lastName:  formData.lastName.trim(),
        email:     formData.email.trim(),
        password:  formData.password,
      });
      setSuccess(true);
      setTimeout(() => onNavigateToSignIn?.(), 2500);
    } catch (err) {
      if (err.status === 409) {
        setFieldErrors(prev => ({ ...prev, email: 'This email is already registered.' }));
      } else {
        setServerError(err.message || 'Something went wrong. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const isFormFilled = formData.firstName && formData.lastName &&
    formData.email && formData.password && formData.confirmPassword;

  const inputClass = (field) =>
    `w-full px-4 py-3 rounded-xl border focus:outline-none text-sm transition-colors ${
      (submitted || fieldErrors[field]) && fieldErrors[field]
        ? 'border-red-600 focus:border-red-600 focus:ring-1 focus:ring-red-600'
        : 'border-gray-200 focus:border-[#0e7ca5] focus:ring-1 focus:ring-[#0e7ca5]'
    }`;

  if (success) {
    return (
      <div className="min-h-screen bg-[#f8f9fb] flex items-center justify-center p-4 font-['Plus_Jakarta_Sans',sans-serif]">
        <div className="bg-white rounded-2xl shadow-lg p-12 text-center max-w-sm w-full border border-gray-100">
          <div className="w-16 h-16 rounded-full bg-[#0e7ca5] flex items-center justify-center mx-auto mb-5"
            style={{ animation: 'pop .4s cubic-bezier(.34,1.56,.64,1)' }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" width="30" height="30">
              <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h2 className="text-2xl font-extrabold text-[#0f2942] mb-2">Account Created!</h2>
          <p className="text-sm text-gray-500">Your account has been successfully created.<br/>Redirecting to Sign In…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f9fb] flex items-center justify-center p-4 md:p-6 font-['Plus_Jakarta_Sans',sans-serif]">
      <div className="max-w-[1200px] w-full bg-white rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 flex flex-col lg:flex-row overflow-hidden">

        {/* ── Left Panel – Form ── */}
        <div className="w-full lg:w-[55%] p-8 sm:p-12 lg:p-16 flex flex-col justify-center">
          <div className="max-w-md mx-auto w-full">
            <p className="text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-2">
              Let's get you started
            </p>
            <h1 className="text-3xl font-extrabold text-[#0f2942] mb-8">
              Create an account
            </h1>

            <form onSubmit={handleSubmit} className="space-y-5" noValidate>

              {/* Name Row */}
              <div className="flex flex-col sm:flex-row gap-5">
                <div className="flex-1">
                  <label className="block text-[13px] font-bold text-[#0f2942] mb-1.5">First name</label>
                  <input type="text" name="firstName" value={formData.firstName}
                    onChange={handleChange} placeholder="Enter your first name"
                    className={inputClass('firstName')} />
                  {fieldErrors.firstName ? (
                    <p className="mt-1.5 text-[11px] text-red-600 leading-tight">{fieldErrors.firstName}</p>
                  ) : (
                    <p className="mt-1.5 text-[11px] text-gray-400">e.g. Johnson</p>
                  )}
                </div>
                <div className="flex-1">
                  <label className="block text-[13px] font-bold text-[#0f2942] mb-1.5">Last name</label>
                  <input type="text" name="lastName" value={formData.lastName}
                    onChange={handleChange} placeholder="Enter your last name"
                    className={inputClass('lastName')} />
                  {fieldErrors.lastName ? (
                    <p className="mt-1.5 text-[11px] text-red-600 leading-tight">{fieldErrors.lastName}</p>
                  ) : (
                    <p className="mt-1.5 text-[11px] text-gray-400">e.g. Doe</p>
                  )}
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-[13px] font-bold text-[#0f2942] mb-1.5">Email</label>
                <input type="email" name="email" value={formData.email}
                  onChange={handleChange} placeholder="Enter your email"
                  className={inputClass('email')} />
                {fieldErrors.email ? (
                  <p className="mt-1.5 text-[11px] text-red-600">{fieldErrors.email}</p>
                ) : (
                  <p className="mt-1.5 text-[11px] text-gray-400">e.g. username@domain.com</p>
                )}
              </div>

              {/* Password */}
              <div>
                <label className="block text-[13px] font-bold text-[#0f2942] mb-1.5">Password</label>
                <div className="relative">
                  <input type={showPassword ? 'text' : 'password'} name="password"
                    value={formData.password} onChange={handleChange}
                    placeholder="Enter your password"
                    className={`${inputClass('password')} pr-10`} />
                  <button type="button" onClick={() => setShowPassword(v => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700">
                    {showPassword ? <EyeOff /> : <EyeOn />}
                  </button>
                </div>
                <div className="mt-2 space-y-1">
                  {[
                    ['upper',   'At least one uppercase letter required'],
                    ['lower',   'At least one lowercase letter required'],
                    ['number',  'At least one number required'],
                    ['special', 'At least one special character required'],
                    ['length',  'Password must be 8–16 characters long'],
                  ].map(([key, label]) => (
                    <div key={key} className="flex items-center gap-1.5">
                      <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                        formData.password.length === 0
                          ? 'bg-gray-400'
                          : pwChecks[key] ? 'bg-green-500' : 'bg-red-600'
                      }`} />
                      <span className={`text-[11px] ${
                        formData.password.length === 0
                          ? 'text-gray-500'
                          : pwChecks[key] ? 'text-green-600' : 'text-red-600'
                      }`}>{label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-[13px] font-bold text-[#0f2942] mb-1.5">Confirm password</label>
                <div className="relative">
                  <input type={showConfirmPassword ? 'text' : 'password'} name="confirmPassword"
                    value={formData.confirmPassword} onChange={handleChange}
                    placeholder="Confirm your password"
                    className={`${inputClass('confirmPassword')} pr-10`} />
                  <button type="button" onClick={() => setShowConfirmPassword(v => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700">
                    {showConfirmPassword ? <EyeOff /> : <EyeOn />}
                  </button>
                </div>
                {fieldErrors.confirmPassword ? (
                  <p className="mt-1.5 text-[11px] text-red-600">{fieldErrors.confirmPassword}</p>
                ) : (
                  <div className="mt-2 flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-gray-400 flex-shrink-0" />
                    <span className="text-[11px] text-gray-500">Confirm password must match your password</span>
                  </div>
                )}
              </div>

              {/* Server error */}
              {serverError && (
                <div className="px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-[12px] font-semibold">
                  {serverError}
                </div>
              )}

              <button type="submit" disabled={loading}
                className={`w-full py-3.5 rounded-xl text-white text-[14px] font-semibold transition-all mt-4 flex items-center justify-center gap-2 ${
                  isFormFilled && !loading
                    ? 'bg-[#0e7ca5] hover:bg-[#0b6587]'
                    : 'bg-[#89bdd0] cursor-default'
                }`}>
                {loading ? (
                  <span className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                ) : 'Create an account'}
              </button>

              <p className="text-[12px] font-medium text-[#0f2942] pt-1">
                Already have an account?{' '}
                <button type="button" onClick={onNavigateToSignIn}
                  className="text-[#0e7ca5] underline font-bold bg-none border-none cursor-pointer p-0">
                  Login
                </button>{' '}instead
              </p>
            </form>
          </div>
        </div>

        {/* ── Right Panel – Beach Image ── */}
        <div className="hidden lg:block w-[45%] relative m-2 rounded-[1.5rem] overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&q=80"
            alt="Tropical Beach"
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Logo overlay */}
          <div className="absolute top-8 left-8 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24"
              fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect width="14" height="14" x="5" y="8" rx="2" ry="2"/>
              <path d="M8 8V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
              <path d="M10 8v14"/><path d="M14 8v14"/><path d="M8 22h8"/>
            </svg>
            <span className="text-white text-2xl font-bold tracking-tight">Travel Agency</span>
          </div>

          {/* Tagline overlay */}
          <div className="absolute bottom-12 left-10 pr-10">
            <h2 className="text-[3.5rem] leading-[1.1] font-extrabold text-[#0f2942]">
              Let's plan<br />your next trip!
            </h2>
          </div>
        </div>

      </div>
    </div>
  );
};

export default SignUpPage;
