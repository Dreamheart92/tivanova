import Header from "@/components/header/index";
import Footer from "@/components/footer";

import styles from './index.module.css';
import Cart from "@/components/cart";
import {getSession} from "@/lib/session";

export default async function AppLayout({children}: { children: React.ReactNode }) {
    const session = await getSession();

    return (
        <div className={styles.app}>
            <header className={styles.header}>
                <Header isAuth={!!session}/>
            </header>

            <main className={styles.content}>
                {children}
                <Cart/>
            </main>

            <footer className={styles.footer}>
                <Footer/>
            </footer>
        </div>
    )
}