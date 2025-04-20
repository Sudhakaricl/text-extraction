'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './LoginForm.module.css'; // Import the CSS module

interface User {
  username: string;
  password: string;
}

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  // Initialize users array in localStorage if it doesn't exist
  const initializeUsers = () => {
    if (!localStorage.getItem('users')) {
      const initialUsers: User[] = []; // Explicitly typed as an array of User objects
      localStorage.setItem('users', JSON.stringify(initialUsers));
    }
  };

  const handleLogin = () => {
    setError(''); // Reset any error message before each login attempt
    initializeUsers();

    // Retrieve stored users from localStorage
    const storedUsers: User[] = JSON.parse(localStorage.getItem('users') || '[]');

    // Check if the entered credentials match any stored user
    const user = storedUsers.find(
      (user) => user.username === username && user.password === password
    );

    if (user) {
      alert('Login successful!');
      localStorage.setItem('authUser', JSON.stringify(user)); // Store the logged-in user data
      router.push('/text-extraction');
    } else {
      setError('Invalid credentials!');
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginFormBox}>
        <h2 className={styles.loginTitle}>Login</h2>
        <input
          className={styles.inputField}
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        /><br />
        <input
          className={styles.inputField}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        /><br />
        <button className={styles.loginButton} onClick={handleLogin}>Login</button>
        {error && <div className={styles.errorMessage}>{error}</div>}
      </div>
    </div>
  );
};

export default LoginForm;
