import { useState } from 'react';
import { sendOrderRequest } from '../api/orderApi';
import styles from './OrderPage.module.css';

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

const cakeTypes = ['Birthday Cake', 'Wedding Cake', 'Cupcakes', 'Sheet Cake', 'Custom Cake', 'Other'];
const cakeSizes = ['6"  (serves 8–10)', '8"  (serves 12–16)', '10" (serves 20–28)', '12" (serves 30–40)', 'Tiered / Custom'];
const cakeFlavors = ['Vanilla', 'Chocolate', 'Red Velvet', 'Lemon', 'Strawberry', 'Marble', 'Funfetti', 'Other'];
const frostingFlavors = ['Buttercream', 'Cream Cheese', 'Chocolate Ganache', 'Fondant', 'Whipped Cream', 'Other'];

export default function OrderPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [cakeType, setCakeType] = useState('');
    const [cakeSize, setCakeSize] = useState('');
    const [cakeFlavor, setCakeFlavor] = useState('');
    const [frostingFlavor, setFrostingFlavor] = useState('');
    const [dateNeeded, setDateNeeded] = useState('');
    const [specialInstructions, setSpecialInstructions] = useState('');
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
        if (!cakeType) newErrors.cakeType = 'Please select a cake type.';
        if (!cakeSize) newErrors.cakeSize = 'Please select a cake size.';
        if (!cakeFlavor) newErrors.cakeFlavor = 'Please select a cake flavor.';
        if (!frostingFlavor) newErrors.frostingFlavor = 'Please select a frosting flavor.';
        if (!dateNeeded) newErrors.dateNeeded = 'Please select a date needed.';
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

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setName(value);
        if (value.trim()) clearError('name');
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setEmail(value);
        if (isValidEmail(value)) clearError('email');
    };

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const formatted = formatPhoneNumber(e.target.value);
        setPhone(formatted);
        if (isValidPhone(formatted)) clearError('phone');
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const validationErrors = validate();
        setErrors(validationErrors);
        if (Object.keys(validationErrors).length > 0) return;

        setStatus('sending');
        try {
            await sendOrderRequest({
                name, email, phone, cakeType, cakeSize,
                cakeFlavor, frostingFlavor, dateNeeded, specialInstructions,
            });
            setStatus('success');
            setName('');
            setEmail('');
            setPhone('');
            setCakeType('');
            setCakeSize('');
            setCakeFlavor('');
            setFrostingFlavor('');
            setDateNeeded('');
            setSpecialInstructions('');
            setErrors({});
        } catch {
            setStatus('error');
        }
    };

    const today = new Date().toISOString().split('T')[0];

    return (
        <div className={styles.page}>
            <div className={styles.header}>
                <p className={styles.eyebrow}>Place Your Order</p>
                <h1 className={styles.title}>Custom <em>Cake Order</em></h1>
                <p className={styles.subtitle}>
                    Tell us about your dream cake and we'll make it a reality — handmade with love, just for you.
                </p>
            </div>
            <div className={styles.card}>
                {status === 'success' && (
                    <p className={styles.success}>Order request submitted! We'll reach out to confirm details and pricing.</p>
                )}
                {status === 'error' && (
                    <p className={styles.error}>Failed to submit order. Please try again.</p>
                )}
                <form onSubmit={handleSubmit} noValidate>
                    <h2 className={styles.sectionTitle}>Your Information</h2>
                    <div className={styles.fieldGroup}>
                        <label htmlFor="name" className={styles.label}>Name</label>
                        <input
                            id="name"
                            type="text"
                            className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
                            value={name}
                            onChange={handleNameChange}
                            placeholder="Your full name"
                        />
                        {errors.name && <p className={styles.fieldError}>{errors.name}</p>}
                    </div>
                    <div className={styles.fieldRow}>
                        <div className={styles.fieldGroup}>
                            <label htmlFor="email" className={styles.label}>Email</label>
                            <input
                                id="email"
                                type="email"
                                className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
                                value={email}
                                onChange={handleEmailChange}
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
                                onChange={handlePhoneChange}
                                placeholder="(555) 123-4567"
                            />
                            {errors.phone && <p className={styles.fieldError}>{errors.phone}</p>}
                        </div>
                    </div>

                    <hr className={styles.divider} />
                    <h2 className={styles.sectionTitle}>Cake Details</h2>

                    <div className={styles.fieldRow}>
                        <div className={styles.fieldGroup}>
                            <label htmlFor="cakeType" className={styles.label}>Cake Type</label>
                            <select
                                id="cakeType"
                                className={`${styles.select} ${errors.cakeType ? styles.inputError : ''}`}
                                value={cakeType}
                                onChange={e => { setCakeType(e.target.value); clearError('cakeType'); }}
                            >
                                <option value="">Select type…</option>
                                {cakeTypes.map(t => <option key={t} value={t}>{t}</option>)}
                            </select>
                            {errors.cakeType && <p className={styles.fieldError}>{errors.cakeType}</p>}
                        </div>
                        <div className={styles.fieldGroup}>
                            <label htmlFor="cakeSize" className={styles.label}>Cake Size</label>
                            <select
                                id="cakeSize"
                                className={`${styles.select} ${errors.cakeSize ? styles.inputError : ''}`}
                                value={cakeSize}
                                onChange={e => { setCakeSize(e.target.value); clearError('cakeSize'); }}
                            >
                                <option value="">Select size…</option>
                                {cakeSizes.map(s => <option key={s} value={s}>{s}</option>)}
                            </select>
                            {errors.cakeSize && <p className={styles.fieldError}>{errors.cakeSize}</p>}
                        </div>
                    </div>
                    <div className={styles.fieldRow}>
                        <div className={styles.fieldGroup}>
                            <label htmlFor="cakeFlavor" className={styles.label}>Cake Flavor</label>
                            <select
                                id="cakeFlavor"
                                className={`${styles.select} ${errors.cakeFlavor ? styles.inputError : ''}`}
                                value={cakeFlavor}
                                onChange={e => { setCakeFlavor(e.target.value); clearError('cakeFlavor'); }}
                            >
                                <option value="">Select flavor…</option>
                                {cakeFlavors.map(f => <option key={f} value={f}>{f}</option>)}
                            </select>
                            {errors.cakeFlavor && <p className={styles.fieldError}>{errors.cakeFlavor}</p>}
                        </div>
                        <div className={styles.fieldGroup}>
                            <label htmlFor="frostingFlavor" className={styles.label}>Frosting</label>
                            <select
                                id="frostingFlavor"
                                className={`${styles.select} ${errors.frostingFlavor ? styles.inputError : ''}`}
                                value={frostingFlavor}
                                onChange={e => { setFrostingFlavor(e.target.value); clearError('frostingFlavor'); }}
                            >
                                <option value="">Select frosting…</option>
                                {frostingFlavors.map(f => <option key={f} value={f}>{f}</option>)}
                            </select>
                            {errors.frostingFlavor && <p className={styles.fieldError}>{errors.frostingFlavor}</p>}
                        </div>
                    </div>
                    <div className={styles.fieldGroup}>
                        <label htmlFor="dateNeeded" className={styles.label}>Date Needed</label>
                        <input
                            id="dateNeeded"
                            type="date"
                            className={`${styles.input} ${errors.dateNeeded ? styles.inputError : ''}`}
                            value={dateNeeded}
                            onChange={e => { setDateNeeded(e.target.value); clearError('dateNeeded'); }}
                            min={today}
                        />
                        {errors.dateNeeded && <p className={styles.fieldError}>{errors.dateNeeded}</p>}
                    </div>

                    <hr className={styles.divider} />
                    <h2 className={styles.sectionTitle}>Special Instructions</h2>

                    <div className={styles.fieldGroup}>
                        <label htmlFor="specialInstructions" className={styles.label}>Additional Details</label>
                        <textarea
                            id="specialInstructions"
                            className={styles.textarea}
                            value={specialInstructions}
                            onChange={e => setSpecialInstructions(e.target.value)}
                            placeholder="Colors, themes, inscriptions, dietary needs, or anything else we should know…"
                        />
                    </div>
                    <button type="submit" className={styles.button} disabled={status === 'sending'}>
                        {status === 'sending' ? 'Submitting…' : 'Submit Order Request'}
                    </button>
                </form>
            </div>
        </div>
    );
}
