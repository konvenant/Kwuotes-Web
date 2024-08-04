import Image from 'next/image'; // Assuming you're using Next.js for image optimization
import styles from './header.module.css'; // Adjust if using a different setup for styles
import Link from 'next/link';
import { Avatar } from '@mui/material';

const Header = () => {
 
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Image src="/logo2.png" alt="logo" width={40} height={40} /> {/* Adjust the path and size as needed */}
      </div>
      <div className={styles.profile}>
       <Link href={"/profile"}>
        <Image src="/kavatar.jpg" alt="Profile" width={40} height={40} /> 
        {/* Adjust the path and size as needed */}</Link>
      </div>
    </header>
  );
};

export default Header;