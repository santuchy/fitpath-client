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
          onClick={() => window.location.href = '/'} 
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
    justifyContent: 'center', 
    alignItems: 'center',     
    height: '100vh',          
    backgroundColor: '#f5f5f5',
    flexDirection: 'column',  
  },
  content: {
    textAlign: 'center',
    
    borderRadius: '10px',
    padding: '40px',
    
    display: 'flex',
    flexDirection: 'column',  
    justifyContent: 'center', 
    alignItems: 'center',     
    width: '100%',            
    maxWidth: '500px',        
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
    width: '300px',          
    height: '300px',         
    marginTop: '30px',       
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
