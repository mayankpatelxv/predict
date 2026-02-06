import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="home-page">
      <div className="container">
        <div className="hero-section">
          <div className="hero-content">
            <h1 className="hero-title">
              AI-Powered Health Assistant
            </h1>
            <p className="hero-subtitle">
              Get instant health predictions based on your symptoms using advanced machine learning technology
            </p>
            <div className="hero-features">
              <div className="feature">
                <span className="feature-icon">🤖</span>
                <span>AI-Powered Predictions</span>
              </div>
              <div className="feature">
                <span className="feature-icon">⚡</span>
                <span>Instant Results</span>
              </div>
              <div className="feature">
                <span className="feature-icon">👨‍⚕️</span>
                <span>Doctor Recommendations</span>
              </div>
            </div>
            <Link to="/symptoms" className="btn btn-primary btn-large">
              Check Your Symptoms
            </Link>
          </div>
          <div className="hero-image">
            <div className="medical-icon">🏥</div>
          </div>
        </div>
        
        <div className="info-section">
          <div className="info-cards">
            <div className="info-card">
              <h3>How It Works</h3>
              <ol>
                <li>Select your symptoms from our comprehensive list</li>
                <li>Provide basic information (age, gender)</li>
                <li>Get AI-powered health predictions</li>
                <li>Receive doctor recommendations</li>
              </ol>
            </div>
            <div className="info-card">
              <h3>Important Notice</h3>
              <p>
                This tool provides preliminary health insights and should not replace professional medical advice. 
                Always consult with qualified healthcare professionals for proper diagnosis and treatment.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;