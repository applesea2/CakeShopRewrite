import { Link } from 'react-router-dom';
import styles from './AboutPage.module.css';

export default function AboutPage() {
    return (
        <div className={styles.page}>
            {/* ── Hero Banner ── */}
            <section className={styles.hero}>
                <div className={styles.heroOverlay} />
                <div className={styles.heroContent}>
                    <p className={styles.eyebrow}>Our Story</p>
                    <h1 className={styles.heroTitle}>
                        Baked from the <em>Heart</em>
                    </h1>
                    <p className={styles.heroSub}>
                        Every cake that leaves our kitchen carries a piece of who we are — a
                        passion for craft, a love for flavour, and a promise to make your
                        moments sweeter.
                    </p>
                </div>
            </section>

            {/* ── Story Section ── */}
            <section className={styles.story}>
                <p className={styles.sectionTag}>Meet Jesse</p>
                <h2 className={styles.sectionTitle}>
                    A Kitchen Dream Turned <em>Reality</em>
                </h2>
                <p className={styles.storyText}>
                    It all started in a tiny home kitchen with a hand-me-down mixer and a
                    recipe scribbled on the back of an envelope. What began as weekend
                    experiments for family birthdays quickly became a calling. Friends
                    asked for more, neighbours knocked on the door, and before long baking
                    wasn't just a hobby — it was a way of life.
                </p>
                <p className={styles.storyText}>
                    Today, Jesse's Cakes is built on that same foundation: real butter,
                    fresh eggs, quality chocolate, and an uncompromising attention to
                    detail. Every layer is mixed by hand, every decoration placed with
                    care. No shortcuts, no preservatives — just honest, homemade cake the
                    way it should be.
                </p>
                <p className={styles.storyText}>
                    Whether it's a towering wedding centrepiece or a simple vanilla sponge
                    for a Sunday afternoon, we pour the same love into every single bake.
                    Because you deserve a cake that tastes as special as the moment it
                    celebrates.
                </p>
            </section>

            {/* ── Values ── */}
            <section className={styles.values}>
                <div className={styles.valuesGrid}>
                    <div className={styles.valueCard}>
                        <div className={styles.valueIcon}>🧈</div>
                        <h3 className={styles.valueTitle}>Premium Ingredients</h3>
                        <p className={styles.valueDesc}>
                            We source the finest butter, flour, and seasonal fruits so every
                            bite is rich, fresh, and unforgettable.
                        </p>
                    </div>
                    <div className={styles.valueCard}>
                        <div className={styles.valueIcon}>🎂</div>
                        <h3 className={styles.valueTitle}>Handcrafted with Care</h3>
                        <p className={styles.valueDesc}>
                            No factory lines here. Each cake is baked, filled, and decorated
                            entirely by hand — one order at a time.
                        </p>
                    </div>
                    <div className={styles.valueCard}>
                        <div className={styles.valueIcon}>💛</div>
                        <h3 className={styles.valueTitle}>Made for Your Moments</h3>
                        <p className={styles.valueDesc}>
                            Birthdays, weddings, or just because — we create cakes that turn
                            everyday occasions into lasting memories.
                        </p>
                    </div>
                </div>
            </section>

            {/* ── Promise / CTA ── */}
            <section className={styles.promise}>
                <h2 className={styles.promiseTitle}>
                    Ready to Taste the <em>Difference</em>?
                </h2>
                <p className={styles.promiseText}>
                    Life is too short for ordinary cake. Let us craft something
                    extraordinary for your next celebration.
                </p>
                <Link to="/order" className={styles.ctaBtn}>
                    Order Now
                </Link>
            </section>
        </div>
    );
}
