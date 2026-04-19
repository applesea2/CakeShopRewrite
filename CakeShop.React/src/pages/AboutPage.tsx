import { Link } from 'react-router-dom';
import styles from './AboutPage.module.css';

export default function AboutPage() {
    return (
        <div className={styles.page}>
            {/* ── Hero Banner ── */}
            <section className={styles.hero}>
                <div className={styles.heroOverlay} />
                <div className={styles.heroContent}>
                    <p className={styles.eyebrow}>About</p>
                    <h1 className={styles.heroTitle}>
                        Baked from the <em>Heart</em>
                    </h1>
                    <p className={styles.heroSub}>
                        Everything made from scratch, at home, because that's the only way
                        I know how to do it.
                    </p>
                </div>
            </section>

            {/* ── Story Section ── */}
            <section className={styles.story}>
                <p className={styles.sectionTag}>Meet Jesse</p>
                <h2 className={styles.sectionTitle}>I've been baking since I was a kid.</h2>
                <p className={styles.storyText}>
                    Not trained, not certified — just someone who grew up in the kitchen
                    and never really stopped. It started with simple stuff: birthday cakes
                    for family, batches of cookies that didn't always turn out right. Over
                    the years I got better, and eventually people started asking if I'd
                    bake for them too.
                </p>
                <p className={styles.storyText}>
                    Everything I make is from scratch, in my home kitchen. No box mixes,
                    no shortcuts, no commercial kitchen. Real butter, real eggs, and
                    recipes I've actually put time into. I care a lot more about how
                    something tastes than how it looks on Instagram.
                </p>
                <p className={styles.storyText}>
                    I mostly bake for people I know — friends, family, the occasional
                    friend-of-a-friend. If you want something delicious and made with
                    actual care, I'd love to bake for you.
                </p>
            </section>

            {/* ── Values ── */}
            <section className={styles.values}>
                <div className={styles.valuesGrid}>
                    <div className={styles.valueCard}>
                        <div className={styles.valueIcon}>01</div>
                        <h3 className={styles.valueTitle}>Scratch, always</h3>
                        <p className={styles.valueDesc}>
                            No box mixes, no pre-made fillings. Everything — batter, frosting,
                            fillings — is made from scratch every single time.
                        </p>
                    </div>
                    <div className={styles.valueCard}>
                        <div className={styles.valueIcon}>02</div>
                        <h3 className={styles.valueTitle}>Flavour first</h3>
                        <p className={styles.valueDesc}>
                            I'm not a cake decorator. I'm someone who genuinely loves baking
                            and wants every bite to be worth it.
                        </p>
                    </div>
                    <div className={styles.valueCard}>
                        <div className={styles.valueIcon}>03</div>
                        <h3 className={styles.valueTitle}>Made for people I know</h3>
                        <p className={styles.valueDesc}>
                            I bake for friends, family, and people they send my way. Every
                            order gets the same care I'd put into something for my own table.
                        </p>
                    </div>
                </div>
            </section>

            {/* ── Promise / CTA ── */}
            <section className={styles.promise}>
                <h2 className={styles.promiseTitle}>Want something made properly?</h2>
                <p className={styles.promiseText}>
                    If you want a cake made from scratch, by someone who actually loves
                    baking — I'd be happy to make it for you.
                </p>
                <Link to="/order" className={styles.ctaBtn}>
                    Get in touch
                </Link>
            </section>
        </div>
    );
}
