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
    router.push('/signup'); // Navigate to the signup page
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.container}>
        <h1 className={styles.title}>Login</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className={styles.input}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className={styles.input}
          />
          <button type="submit" className={styles.button}>
            Log In
          </button>
        </form>

        {/* Display message if available */}
        {message && (
          <p className={`${styles.message} ${message.includes('success') ? styles.success : styles.error}`}>
            {message}
          </p>
        )}

        {/* Sign Up Redirect */}
        <p className={styles.signupText}>
          New here?{" "}
          <button onClick={handleSignUpRedirect} className={styles.signupButton}>
            Sign Up
          </button>
        </p>
      </div>

      <div className={styles.illustration}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 100 100"
          width="200"
          height="200"
          className={styles.svgAnimation}
        >
          <circle cx="50" cy="50" r="30" fill="transparent" stroke="#2575fc" strokeWidth="4">
            <animate
              attributeName="r"
              from="30"
              to="20"
              dur="1s"
              begin="0s"
              repeatCount="indefinite"
              keyTimes="0; 1"
            />
          </circle>
          <circle cx="50" cy="50" r="5" fill="#2575fc">
            <animate
              attributeName="r"
              from="5"
              to="10"
              dur="1s"
              begin="0s"
              repeatCount="indefinite"
              keyTimes="0; 1"
            />
          </circle>
        </svg>
      </div>
    </div>
  );
}
