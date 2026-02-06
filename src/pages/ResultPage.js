import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { getDiseaseInfo, getRecommendedDoctors } from '../services/supabaseService';
import './ResultPage.css';

const ResultPage = () => {
  const location = useLocation();
  const [diseaseInfo, setDiseaseInfo] = useState(null);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  const { prediction, userInput } = location.state || {};

  useEffect(() => {
    const fetchData = async () => {
      if (!prediction) return;

      try {
        const [diseaseData, doctorData] = await Promise.all([
          getDiseaseInfo(prediction.disease).catch(() => null),
          getRecommendedDoctors(prediction.disease).catch(() => [])
        ]);

        setDiseaseInfo(diseaseData);
        setDoctors(doctorData);
      } catch (error) {
        console.warn('Supabase not configured, using prediction data only:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [prediction]);

  if (!prediction) {
    return (
      <div className="result-page">
        <div className="container">
          <div className="card">
            <h1>No Results Found</h1>
            <p>Please go back and complete the symptom checker.</p>
            <Link to="/symptoms" className="btn btn-primary">
              Check Symptoms
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const getConfidenceColor = (confidence) => {
    if (confidence >= 0.8) return '#10b981';
    if (confidence >= 0.6) return '#f59e0b';
    return '#ef4444';
  };

  const getConfidenceText = (confidence) => {
    if (confidence >= 0.8) return 'High';
    if (confidence >= 0.6) return 'Medium';
    return 'Low';
  };

  return (
    <div className="result-page">
      <div className="container">
        <div className="result-header">
          <h1 className="result-title">Health Prediction Results</h1>
          <p className="result-subtitle">
            Based on your symptoms, here's what our AI analysis suggests
          </p>
        </div>

        <div className="result-content">
          <div className="prediction-card card">
            <div className="prediction-header">
              <h2>Predicted Condition</h2>
              <div 
                className="confidence-badge"
                style={{ backgroundColor: getConfidenceColor(prediction.confidence) }}
              >
                {getConfidenceText(prediction.confidence)} Confidence
              </div>
            </div>
            
            <div className="disease-name">
              {prediction.disease}
            </div>
            
            <div className="confidence-details">
              <div className="confidence-bar">
                <div 
                  className="confidence-fill"
                  style={{ 
                    width: `${prediction.confidence * 100}%`,
                    backgroundColor: getConfidenceColor(prediction.confidence)
                  }}
                ></div>
              </div>
              <span className="confidence-percentage">
                {Math.round(prediction.confidence * 100)}% confidence
              </span>
            </div>

            {loading ? (
              <div className="loading">
                <div className="spinner"></div>
                <span>Loading disease information...</span>
              </div>
            ) : diseaseInfo && (
              <div className="disease-info">
                <h3>About This Condition</h3>
                <p>{diseaseInfo.description}</p>
                
                {diseaseInfo.symptoms && (
                  <div className="common-symptoms">
                    <h4>Common Symptoms</h4>
                    <div className="symptom-tags">
                      {diseaseInfo.symptoms.split(',').map((symptom, index) => (
                        <span key={index} className="symptom-tag">
                          {symptom.trim()}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="doctors-card card">
            <h2>Recommended Specialists</h2>
            {loading ? (
              <div className="loading">
                <div className="spinner"></div>
                <span>Loading doctor recommendations...</span>
              </div>
            ) : doctors.length > 0 ? (
              <div className="doctors-list">
                {doctors.map((doctor, index) => (
                  <div key={index} className="doctor-item">
                    <div className="doctor-info">
                      <h3>{doctor.name}</h3>
                      <p className="doctor-specialty">{doctor.specialty}</p>
                      <p className="doctor-description">{doctor.description}</p>
                    </div>
                    <div className="doctor-contact">
                      <span className="doctor-phone">📞 {doctor.phone}</span>
                      <span className="doctor-location">📍 {doctor.location}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p>No specific doctor recommendations available for this condition.</p>
            )}
          </div>

          <div className="user-input-card card">
            <h2>Your Input Summary</h2>
            <div className="input-summary">
              <div className="summary-item">
                <strong>Age:</strong> {userInput?.age} years
              </div>
              <div className="summary-item">
                <strong>Gender:</strong> {userInput?.gender}
              </div>
              <div className="summary-item">
                <strong>Symptoms:</strong>
                <div className="selected-symptoms">
                  {userInput?.symptoms.map((symptom, index) => (
                    <span key={index} className="symptom-tag selected">
                      {symptom}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="disclaimer-card card">
            <h2>⚠️ Important Disclaimer</h2>
            <p>
              This AI-powered prediction is for informational purposes only and should not be used as a substitute 
              for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician 
              or other qualified health provider with any questions you may have regarding a medical condition.
            </p>
          </div>

          <div className="action-buttons">
            <Link to="/symptoms" className="btn btn-secondary">
              Check New Symptoms
            </Link>
            <Link to="/" className="btn btn-primary">
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultPage;