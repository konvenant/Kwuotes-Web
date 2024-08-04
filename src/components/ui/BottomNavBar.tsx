"use client"
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from "./bottomNavBar.module.css"
import {MdBookmarks, MdFavorite, MdHome, MdPerson4, MdSearch, MdSupervisedUserCircle} from "react-icons/md"


const BottomNavBar = () => {
    const pathname = usePathname(); // Assuming this hook correctly retrieves current pathname
  
    return (
      <div className={styles.footer}>
        <div className={`${styles['footer-item']} ${pathname === "/dashboard" && styles.active}`}>
          <Link href="/dashboard">
            
              <MdHome size={24} />
              <p>Dashboard</p>
            
          </Link>
        </div>
        <div className={`${styles['footer-item']} ${pathname === "/dashboard/search" && styles.active}`}>
          <Link href="/dashboard/search">
            
              <MdSearch size={24} />
              <p>Search</p>
            
          </Link>
        </div>

        <div className={`${styles['footer-item']} ${pathname === "/dashboard/myQuotes" && styles.active}`}>
          <Link href="/dashboard/myQuotes">
            
             <p> <MdBookmarks size={24} /></p>
              <p>My Quotes</p>
            
          </Link>
        </div>
        <div className={`${styles['footer-item']} ${pathname === "/dashboard/favorite" && styles.active}`}>
          <Link href="/dashboard/favorite">
            
              <MdFavorite size={24} />
              <p>Favourites</p>
            
          </Link>
        </div>
        <div className={`${styles['footer-item']} ${pathname === "/dashboard/authors" && styles.active}`}>
          <Link href="/dashboard/authors">
            
              <MdSupervisedUserCircle size={24} />
              <p>Authors</p>
            
          </Link>
        </div>

      </div>
    );
  };
  

export default BottomNavBar;
