'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../app/styles/Homepage.module.css'; // Import the CSS module

const HomePage = () => {
  const router = useRouter();
  const [isUserChecked, setIsUserChecked] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem('authUser');
    if (user) {
      setIsUserChecked(true); // User is logged in, show options if needed
    } else {
      setIsUserChecked(true); // No user, show login/signup options
    }
  }, []);

  // Wait for the user check to complete before rendering anything
  if (!isUserChecked) {
    return null; // Show nothing until the check is done
  }

  return (
    <div className={styles.homePageContainer}>
      <h1 className={styles.welcomeTitle}>Welcome to Text Extraction App</h1>
      <p className={styles.welcomeText}>Please choose an option:</p>
      <div className={styles.buttonContainer}>
        <button className={`${styles.button} ${styles.loginButton}`} onClick={() => router.push('/login')}>
          Login
        </button>
        <button className={`${styles.button} ${styles.signupButton}`} onClick={() => router.push('/signup')}>
          Signup
        </button>
      </div>
    </div>
  );
};

export default HomePage;
