import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import styles from './NavBar.module.css';

export default function NavBar() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <nav className={styles.nav}>
            <div className={styles.inner}>
                <Link to={"/"} className={styles.brand}>
                    <span className={styles.brandName}>Jesse's Cakes</span>
                    <span className={styles.brandSub}>Homemade with love</span>
                </Link>
                <button
                    className={`${styles.burger} ${menuOpen ? styles.burgerOpen : ''}`}
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Toggle menu"
                >
                    <span />
                    <span />
                    <span />
                </button>
                <ul className={`${styles.links} ${menuOpen ? styles.linksOpen : ''}`}>
                    <li><NavLink to="/" onClick={() => setMenuOpen(false)} className={({ isActive }) => isActive ? styles.active : ''}>Home</NavLink></li>
                    <li><NavLink to="/menu" onClick={() => setMenuOpen(false)} className={({ isActive }) => isActive ? styles.active : ''}>Menu</NavLink></li>
                    <li><NavLink to="/contact" onClick={() => setMenuOpen(false)} className={({ isActive }) => isActive ? styles.active : ''}>Contact</NavLink></li>
                    <li><NavLink to="/about" onClick={() => setMenuOpen(false)} className={({ isActive }) => isActive ? styles.active : ''}>About</NavLink></li>
                    <li><Link to="/order" onClick={() => setMenuOpen(false)} className={styles.orderBtn}>Order Now</Link></li>
                </ul>
            </div>
        </nav>
    );
}
