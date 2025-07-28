import React from 'react';
import forbiddenAnimation from '../../assets/Animations/Connection error.json'; // Correctly import JSON as an object
import Lottie from 'lottie-react';

const Forbidden = () => {
  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <h1 style={styles.title}>403 - Forbidden</h1>
        <p style={styles.description}>Sorry, you don't have permission to access this page. Please contact an administrator if you believe this is a mistake.</p>
        
        {/* Lottie animation */}
        <Lottie animationData={forbiddenAnimation} loop={true} style={styles.lottie} />
        
        <button
          style={styles.button}
          onClick={() => window.location.href = '/'} // Redirect to the home page or any other page
        >
          Go Back to Home
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center', // Center horizontally
    alignItems: 'center',     // Center vertically
    height: '100vh',          // Full screen height
    backgroundColor: '#f5f5f5',
    flexDirection: 'column',  // Align items in a column
  },
  content: {
    textAlign: 'center',
    
    borderRadius: '10px',
    padding: '40px',
    
    display: 'flex',
    flexDirection: 'column',  // Stack content vertically
    justifyContent: 'center', // Center vertically
    alignItems: 'center',     // Center horizontally
    width: '100%',            // Ensure it takes up full width within container
    maxWidth: '500px',        // Max width for content
  },
  title: {
    fontSize: '48px',
    fontWeight: 'bold',
    color: '#e74c3c',
  },
  description: {
    fontSize: '18px',
    marginTop: '20px',
    color: '#7f8c8d',
  },
  lottie: {
    width: '300px',          // Animation width
    height: '300px',         // Animation height
    marginTop: '30px',       // Space between the animation and content above
  },
  button: {
    marginTop: '30px',
    padding: '12px 24px',
    backgroundColor: '#3498db',
    color: '#fff',
    fontSize: '16px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
};

export default Forbidden;
