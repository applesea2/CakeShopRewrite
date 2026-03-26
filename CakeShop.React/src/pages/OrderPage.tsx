import { useEffect, useState, useMemo } from 'react';
import { sendOrderRequest } from '../api/orderApi';
import styles from './OrderPage.module.css';
import type { MenuItem } from '../types/menu';
import type { CakeSize, FrostingOption } from '../types/options';
import { getMenuItems } from '../api/menuApi';
import { getCakeSizes, getFrostingOptions } from '../api/optionsApi';

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

export default function OrderPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
    const [cakeSizes, setCakeSizes] = useState<CakeSize[]>([]);
    const [frostingOptions, setFrostingOptions] = useState<FrostingOption[]>([]);
    const [cakeType, setCakeType] = useState('');
    const [cakeSize, setCakeSize] = useState('');
    const [selectedCakeId, setSelectedCakeId] = useState<number | null>(null);
    const [frostingFlavor, setFrostingFlavor] = useState('');
    const [dateNeeded, setDateNeeded] = useState('');
    const [specialInstructions, setSpecialInstructions] = useState('');
    const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
    const [errors, setErrors] = useState<Record<string, string>>({});

    const categories = useMemo(
        () => [...new Set(menuItems.map((item) => item.category))],
        [menuItems]
    );

    const selectedCake = useMemo(
        () => menuItems.find(item => item.id === selectedCakeId) || null,
        [menuItems, selectedCakeId]
    );

    const showFrosting = useMemo(() => cakeType === 'Celebration Cakes', [cakeType]);

    const resetForm = () => {
        setName('');
        setEmail('');
        setPhone('');
        setCakeType('');
        setCakeSize('');
        setSelectedCakeId(null);
        setFrostingFlavor('');
        setDateNeeded('');
        setSpecialInstructions('');
        setErrors({});
    };

    useEffect(() => {
        getMenuItems().then(setMenuItems);
        getCakeSizes().then(setCakeSizes);
        getFrostingOptions().then(setFrostingOptions);
    }, []);

    const validate = (): Record<string, string> => {
        const newErrors: Record<string, string> = {};
        if (!name.trim()) newErrors.name = 'Name is required.';
        if (!email.trim() || !isValidEmail(email)) newErrors.email = 'Valid email is required.';
        if (!phone.trim() || !isValidPhone(phone)) newErrors.phone = 'Valid phone number is required.';
        if (!selectedCakeId) newErrors.selectedCakeId = 'Please select a cake.';
        if (!cakeSize) newErrors.cakeSize = 'Please select a size.';
        if (showFrosting && !frostingFlavor) newErrors.frostingFlavor = 'Please select a frosting.';
        if (!dateNeeded) newErrors.dateNeeded = 'Please select a date.';
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

    const onCakeSelectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = parseInt(e.target.value);
        setSelectedCakeId(value);
        const item = menuItems.find(m => m.id === value);
        if (item) setCakeType(item.category);
        clearError('selectedCakeId');
        clearError('cakeType');
    };

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const formErrors = validate();
        if (Object.keys(formErrors).length) {
            setErrors(formErrors);
            return;
        }

        setStatus('sending');

        try {
            await sendOrderRequest({
                name, email, phone, cakeType, cakeSize,
                cakeFlavor: selectedCake?.title || '',
                frostingFlavor, dateNeeded, specialInstructions,
            });
            setStatus('success');
            resetForm();
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
                <form onSubmit={onSubmit} noValidate>
                    <h2 className={styles.sectionTitle}>Your Information</h2>
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
                    <div className={styles.fieldRow}>
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
                    </div>

                    <hr className={styles.divider} />
                    <h2 className={styles.sectionTitle}>Cake Details</h2>

                    <div className={styles.fieldGroup}>
                        <label htmlFor="cake" className={styles.label}>Cake</label>
                        <select
                            id="cake"
                            className={`${styles.select} ${errors.selectedCakeId ? styles.inputError : ''}`}
                            value={selectedCakeId || ''}
                            onChange={onCakeSelectionChange}
                        >
                            <option value="">Select a cake…</option>
                            {categories.map(cat => (
                                <optgroup key={cat} label={cat}>
                                    {menuItems.filter(item => item.category === cat).map(cake => (
                                        <option key={cake.id} value={cake.id}>{cake.title}</option>
                                    ))}
                                </optgroup>
                            ))}
                        </select>
                        {errors.selectedCakeId && <p className={styles.fieldError}>{errors.selectedCakeId}</p>}
                    </div>
                    <div className={styles.fieldRow}>
                            <div className={styles.fieldGroup}>
                            <label htmlFor="cakeSize" className={styles.label}>Cake Size</label>
                            <select
                                id="cakeSize"
                                className={`${styles.select} ${errors.cakeSize ? styles.inputError : ''}`}
                                value={cakeSize}
                                onChange={e => { setCakeSize(e.target.value); clearError('cakeSize'); }}>
                                <option value="">Select size…</option>
                                {cakeSizes.map(s => <option key={s.id} value={s.name}>{s.name}</option>)}
                            </select>
                            {errors.cakeSize && <p className={styles.fieldError}>{errors.cakeSize}</p>}
                        </div>                       
                        {showFrosting && (
                            <div className={styles.fieldGroup}>
                                <label htmlFor="frostingFlavor" className={styles.label}>Frosting</label>
                                <select
                                    id="frostingFlavor"
                                    className={`${styles.select} ${errors.frostingFlavor ? styles.inputError : ''}`}
                                    value={frostingFlavor}
                                    onChange={e => { setFrostingFlavor(e.target.value); clearError('frostingFlavor'); }}
                                >
                                    <option value="">Select frosting…</option>
                                    {frostingOptions.map(f => <option key={f.id} value={f.name}>{f.name}</option>)}
                                </select>
                                {errors.frostingFlavor && <p className={styles.fieldError}>{errors.frostingFlavor}</p>}
                            </div>
                        )}
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
