'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './SignupForm.module.css'; // Import the CSS module

interface User {
  username: string;
  password: string;
}

const SignupForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter(); // Initialize router for redirection

  // Initialize users array in localStorage if it doesn't exist
  const initializeUsers = () => {
    if (!localStorage.getItem('users')) {
      const initialUsers: User[] = []; // Explicitly typed as an array of User objects
      localStorage.setItem('users', JSON.stringify(initialUsers));
    }
  };

  const handleSignup = () => {
    initializeUsers();

    const storedUsers: User[] = JSON.parse(localStorage.getItem('users') || '[]');

    // Check if the username already exists
    const userExists = storedUsers.some(
      (user) => user.username === username
    );

    if (userExists) {
      alert('Username already exists!');
      return;
    }

    // Add new user to the array
    const newUser: User = { username, password };
    storedUsers.push(newUser);
    localStorage.setItem('users', JSON.stringify(storedUsers));

    alert('User signed up successfully!');

    // After successful signup, redirect to the login page
    router.push('/login'); // Redirect to the login page
  };

  return (
    <div className={styles.signupContainer}>
      <div className={styles.signupFormBox}>
        <h2 className={styles.signupTitle}>Signup</h2>
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
        <button className={styles.signupButton} onClick={handleSignup}>Sign Up</button>
      </div>
    </div>
  );
};

export default SignupForm;
