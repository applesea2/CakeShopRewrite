import { Link, NavLink } from 'react-router-dom';
import styles from './NavBar.module.css';

export default function NavBar() {
    return (
        <nav className={styles.nav}>
            <div className={styles.inner}>
                <Link to={"/"} className={styles.brand}>
                    <span className={styles.brandName}>Jesse's Cakes</span>
                    <span className={styles.brandSub}>Homemade with love</span>
                </Link>
                <ul className={styles.links}>
                    <li><NavLink to="/" className={({ isActive }) => isActive ? styles.active : ''}>Home</NavLink></li>
                    <li><NavLink to="/menu" className={({ isActive }) => isActive ? styles.active : ''}>Menu</NavLink></li>
                    <li><NavLink to="/about" className={({ isActive }) => isActive ? styles.active : ''}>About</NavLink></li>
                    <li><NavLink to="/contact" className={({ isActive }) => isActive ? styles.active : ''}>Contact</NavLink></li>
                    <li><Link to="/order" className={styles.orderBtn}>Order Now</Link></li>
                </ul>
            </div>
        </nav>
    );
}