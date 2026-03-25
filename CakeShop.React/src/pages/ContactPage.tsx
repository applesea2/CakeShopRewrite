import { useState } from 'react';
import { sendContactEmail } from '../api/contactApi';
import styles from './ContactPage.module.css';

function formatPhoneNumber(value: string): string {
    const digits = value.replace(/\D/g, '').slice(0, 10);
    if (digits.length === 0) return '';
    if (digits.length <= 3) return `(${digits}`;
    if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

function isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPhone(phone: string): boolean {
    return /^\(\d{3}\) \d{3}-\d{4}$/.test(phone);
}

export default function ContactPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [comment, setComment] = useState('');
    const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
    const [errors, setErrors] = useState<Record<string, string>>({});

    const validate = (): Record<string, string> => {
        const newErrors: Record<string, string> = {};
        if (!name.trim()) newErrors.name = 'Name is required.';
        if (!email.trim()) {
            newErrors.email = 'Email is required.';
        } else if (!isValidEmail(email)) {
            newErrors.email = 'Please enter a valid email address.';
        }
        if (!phone.trim()) {
            newErrors.phone = 'Phone number is required.';
        } else if (!isValidPhone(phone)) {
            newErrors.phone = 'Please enter a valid phone number.';
        }
        if (!comment.trim()) newErrors.comment = 'Comment is required.';
        return newErrors;
    };

    const clearError = (field: string) => {
        if (errors[field]) {
            setErrors(prev => {
                const next = { ...prev };
                delete next[field];
                return next;
            });
        }
    };

    const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setName(value);
        if (value.trim()) clearError('name');
    };

    const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setEmail(value);
        if (isValidEmail(value)) clearError('email');
    };

    const onPhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const formatted = formatPhoneNumber(e.target.value);
        setPhone(formatted);
        if (isValidPhone(formatted)) clearError('phone');
    };

    const onCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value;
        setComment(value);
        if (value.trim()) clearError('comment');
    };

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const validationErrors = validate();
        setErrors(validationErrors);
        if (Object.keys(validationErrors).length > 0) return;

        setStatus('sending');
        try {
            await sendContactEmail({ name, email, phone, comment });
            setStatus('success');
            setName('');
            setEmail('');
            setPhone('');
            setComment('');
            setErrors({});
        } catch {
            setStatus('error');
        }
    };

    return (
        <div className={styles.page}>
            <div className={styles.header}>
                <p className={styles.eyebrow}>Get in Touch</p>
                <h1 className={styles.title}>Contact <em>Us</em></h1>
                <p className={styles.subtitle}>
                    We'd love to hear from you — whether it's a custom cake order, a question, or just to say hello.
                </p>
            </div>
            <div className={styles.card}>
                {status === 'success' && (
                    <p className={styles.success}>Message sent successfully! We'll be in touch soon.</p>
                )}
                {status === 'error' && (
                    <p className={styles.error}>Failed to send message. Please try again.</p>
                )}
                <form onSubmit={onSubmit} noValidate>
                    <div className={styles.fieldGroup}>
                        <label htmlFor="name" className={styles.label}>Name</label>
                        <input
                            id="name"
                            type="text"
                            className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
                            value={name}
                            onChange={onNameChange}
                            placeholder="Your full name"
                        />
                        {errors.name && <p className={styles.fieldError}>{errors.name}</p>}
                    </div>
                    <div className={styles.fieldGroup}>
                        <label htmlFor="email" className={styles.label}>Email</label>
                        <input
                            id="email"
                            type="email"
                            className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
                            value={email}
                            onChange={onEmailChange}
                            placeholder="you@example.com"
                        />
                        {errors.email && <p className={styles.fieldError}>{errors.email}</p>}
                    </div>
                    <div className={styles.fieldGroup}>
                        <label htmlFor="phone" className={styles.label}>Phone</label>
                        <input
                            id="phone"
                            type="tel"
                            className={`${styles.input} ${errors.phone ? styles.inputError : ''}`}
                            value={phone}
                            onChange={onPhoneChange}
                            placeholder="(555) 123-4567"
                        />
                        {errors.phone && <p className={styles.fieldError}>{errors.phone}</p>}
                    </div>
                    <div className={styles.fieldGroup}>
                        <label htmlFor="comment" className={styles.label}>Comment</label>
                        <textarea
                            id="comment"
                            className={`${styles.textarea} ${errors.comment ? styles.inputError : ''}`}
                            value={comment}
                            onChange={onCommentChange}
                            placeholder="Tell us about your dream cake or ask us anything…"
                        />
                        {errors.comment && <p className={styles.fieldError}>{errors.comment}</p>}
                    </div>
                    <button type="submit" className={styles.button} disabled={status === 'sending'}>
                        {status === 'sending' ? 'Sending…' : 'Send Message'}
                    </button>
                </form>
            </div>
        </div>
    );
}
