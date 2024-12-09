'use client';

import { useState } from "react";
import { useRouter } from "next/navigation"; 
import axios from "../../utils/api"; 
import styles from "./login.module.css"; 

export default function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/login', {
        email: formData.email,
        password: formData.password,
      });

      setMessage(response.data.message || 'Login successful');
    } catch (error) {
      const errorMessage = error.response?.data?.detail || error.message || 'Error logging in';
      setMessage(errorMessage);
    }
  };

  const handleSignUpRedirect = () => {
    router.push('/signup'); 
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.container}>
        <h1 className={styles.title}>Login</h1>
        <form onSubmit={handleSubmit} className={styles.formContainer}>
          <div className={styles.inputGroup}>
            <label htmlFor="email" className={styles.label}>Email</label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
              className={styles.input}
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="password" className={styles.label}>Password</label>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
              className={styles.input}
            />
          </div>

          <button type="submit" className={styles.button}>
            Log In
          </button>
        </form>

        {message && (
          <p className={`${styles.message} ${message.includes('success') ? styles.success : styles.error}`}>
            {message}
          </p>
        )}

        <p className={styles.signupText}>
          New here?{" "}
          <button onClick={handleSignUpRedirect} className={styles.signupButton}>
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
}
