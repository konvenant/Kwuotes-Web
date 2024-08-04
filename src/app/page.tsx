import Link from 'next/link';
import styles from './home.module.css';
import Image from 'next/image';

export default function Home() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Image
         src="/logo2.png"
         alt="Logo" 
         width={40} height={40}
        />
        <h1>Kwuotes</h1>
        <p>A quote app that organizes your quotes in categories</p>
      </header>
      <main className={styles.main}>
        <Link href="/login">
          <button className={styles.button}>Login</button>
        </Link>
        <a href="https://drive.google.com/file/d/1onRJ93ZnVyjN7Zjsii7NUcJ-smRcojZQ/view?usp=drive_link" className={styles.downloadButton}>Download APK</a>
      </main>
    </div>
  );
}
