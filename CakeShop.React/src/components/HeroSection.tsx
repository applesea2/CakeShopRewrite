import styles from './HeroSection.module.css'

export default function HeroSection() {
    return (
        <section className={styles.hero}>
            <div className={styles.overlay}>
                <p className={styles.tag}>Cake Store</p>
                <h1 className={styles.heading}>Handmade Cakes<br />Baked with Love</h1>
                <button className={styles.orderBtn}>Order Now</button>
            </div>
        </section>
    )
}