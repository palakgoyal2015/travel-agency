import { useState } from 'react';
import { signUp } from '../api/authApi';

const INITIAL_FIELDS = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
};

function validate(fields) {
    const errors = {};
    const nameRegex = /^.{2,50}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;

    if (!fields.firstName.trim()) {
        errors.firstName = 'First name is required';
    } else if (!nameRegex.test(fields.firstName.trim())) {
        errors.firstName = 'First name must be between 2 and 50 characters';
    }

    if (!fields.lastName.trim()) {
        errors.lastName = 'Last name is required';
    } else if (!nameRegex.test(fields.lastName.trim())) {
        errors.lastName = 'Last name must be between 2 and 50 characters';
    }

    if (!fields.email.trim()) {
        errors.email = 'Email is required';
    } else if (!emailRegex.test(fields.email)) {
        errors.email = 'Invalid email format';
    }

    if (!fields.password) {
        errors.password = 'Password is required';
    } else if (!passwordRegex.test(fields.password)) {
        errors.password = 'Password must be at least 8 characters and contain a letter and a digit';
    }

    if (!fields.confirmPassword) {
        errors.confirmPassword = 'Please confirm your password';
    } else if (fields.confirmPassword !== fields.password) {
        errors.confirmPassword = 'Passwords do not match';
    }

    return errors;
}

export function useRegistration(onSuccess) {
    const [fields, setFields] = useState(INITIAL_FIELDS);
    const [errors, setErrors] = useState({});
    const [serverError, setServerError] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    function handleChange(e) {
        const { name, value } = e.target;
        setFields(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
        setServerError('');
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const validationErrors = validate(fields);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setLoading(true);
        setServerError('');
        try {
            await signUp({
                firstName: fields.firstName.trim(),
                lastName: fields.lastName.trim(),
                email: fields.email.trim(),
                password: fields.password,
            });
            setSuccess(true);
            setTimeout(() => onSuccess?.(), 2000);
        } catch (err) {
            if (err.status === 409) {
                setErrors(prev => ({ ...prev, email: 'This email is already registered' }));
            } else {
                setServerError(err.message || 'Something went wrong. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    }

    return { fields, errors, serverError, loading, success, handleChange, handleSubmit };
}
