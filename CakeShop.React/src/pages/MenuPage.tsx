import { useEffect, useState } from "react";
import { getMenuItems } from "../api/menuApi.ts";
import type {MenuItem} from "../types/menu.ts";
import styles from './MenuPage.module.css';

export default function MenuPage(){
    const [items, setItems] = useState<MenuItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    
    useEffect(() => {
        getMenuItems()
            .then((data) => {
                setItems(data);
                setLoading(false);
            })
            .catch(() => {
                setError('Failed to fetch menu items');
                setLoading(false);
            })
            .finally(() => {
                setLoading(false);
            })
    }, [])
    
    if (loading) {
        return (<div className={styles.spinnerWrap}>
            <div className={styles.spinner} />
        </div>
        )
    }
    
    if (error) {
        return (
            <div className={styles.error}>{error}</div>
        )
    }
    
    const grouped = items.reduce<Record<string, MenuItem[]>>((acc, item) => {
        if (!acc[item.category]) {
            acc[item.category] = [];
        }
        acc[item.category].push(item);
        return acc;
    }, {});
    const categories = Object.entries(grouped)
    const mid = Math.ceil(categories.length / 2)
    const leftCol = categories.slice(0, mid)
    const rightCol = categories.slice(mid)

    const renderCategory = ([category, categoryItems]: [string, MenuItem[]]) => (
        <section key={category} className={styles.category}>
            <h2 className={styles.categoryTitle}>{category}</h2>
            {categoryItems.map(item => (
                <div key={item.id} className={styles.row}>
                    <div className={styles.rowLeft}>
                        <p className={styles.itemName}>{item.title}</p>
                        <p className={styles.itemDesc}>{item.description}</p>
                    </div>
                    <div className={styles.dots} />
                    <span className={styles.itemPrice}>${item.price.toFixed(2)}</span>
                </div>
            ))}
        </section>
    )

    return (
        <main className={styles.page}>
            <div className={styles.header}>
                <h1 className={styles.title}>Our <em>Menu</em></h1>
            </div>
            <div className={styles.columns}>
                <div>{leftCol.map(renderCategory)}</div>
                <div>{rightCol.map(renderCategory)}</div>
            </div>
        </main>
    )
}