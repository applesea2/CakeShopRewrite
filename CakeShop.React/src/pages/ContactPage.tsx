import { useState } from 'react';
import { sendContactEmail } from '../api/contactApi';
import styles from './ContactPage.module.css';

export default function ContactPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [comment, setComment] = useState('');
    const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('sending');
        try {
            await sendContactEmail({ name, email, phone, comment });
            setStatus('success');
            setName('');
            setEmail('');
            setPhone('');
            setComment('');
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
                <form onSubmit={handleSubmit}>
                    <div className={styles.fieldGroup}>
                        <label htmlFor="name" className={styles.label}>Name</label>
                        <input
                            id="name"
                            type="text"
                            className={styles.input}
                            value={name}
                            onChange={e => setName(e.target.value)}
                            placeholder="Your full name"
                            required
                        />
                    </div>
                    <div className={styles.fieldGroup}>
                        <label htmlFor="email" className={styles.label}>Email</label>
                        <input
                            id="email"
                            type="email"
                            className={styles.input}
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            placeholder="you@example.com"
                            required
                        />
                    </div>
                    <div className={styles.fieldGroup}>
                        <label htmlFor="phone" className={styles.label}>Phone</label>
                        <input
                            id="phone"
                            type="tel"
                            className={styles.input}
                            value={phone}
                            onChange={e => setPhone(e.target.value)}
                            placeholder="(555) 123-4567"
                        />
                    </div>
                    <div className={styles.fieldGroup}>
                        <label htmlFor="comment" className={styles.label}>Comment</label>
                        <textarea
                            id="comment"
                            className={styles.textarea}
                            value={comment}
                            onChange={e => setComment(e.target.value)}
                            placeholder="Tell us about your dream cake or ask us anything…"
                            required
                        />
                    </div>
                    <button type="submit" className={styles.button} disabled={status === 'sending'}>
                        {status === 'sending' ? 'Sending…' : 'Send Message'}
                    </button>
                </form>
            </div>
        </div>
    );
}
