import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { predictDisease } from '../services/mlService';
import { saveSymptomLog } from '../services/supabaseService';
import './SymptomForm.css';

const SYMPTOMS = [
  'Fever', 'Cough', 'Headache', 'Fatigue', 'Nausea', 'Vomiting',
  'Diarrhea', 'Abdominal Pain', 'Chest Pain', 'Shortness of Breath',
  'Dizziness', 'Muscle Pain', 'Joint Pain', 'Sore Throat', 'Runny Nose',
  'Skin Rash', 'Itching', 'Swelling', 'Weight Loss', 'Weight Gain',
  'Loss of Appetite', 'Difficulty Sleeping', 'Back Pain', 'Neck Pain',
  'Eye Pain', 'Blurred Vision', 'Hearing Loss', 'Ear Pain',
  'Frequent Urination', 'Blood in Urine', 'Constipation', 'Bloating'
];

const SymptomForm = () => {
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSymptomChange = (symptom) => {
    setSelectedSymptoms(prev => 
      prev.includes(symptom) 
        ? prev.filter(s => s !== symptom)
        : [...prev, symptom]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (selectedSymptoms.length === 0) {
      setError('Please select at least one symptom');
      return;
    }
    
    if (!age || !gender) {
      setError('Please fill in all required fields');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const predictionData = {
        symptoms: selectedSymptoms,
        age: parseInt(age),
        gender
      };

      const prediction = await predictDisease(predictionData);
      
      // Save to Supabase (optional - won't fail if not configured)
      try {
        await saveSymptomLog({
          symptoms: selectedSymptoms,
          age: parseInt(age),
          gender,
          predicted_disease: prediction.disease,
          confidence: prediction.confidence
        });
      } catch (supabaseError) {
        console.warn('Supabase not configured, skipping data save:', supabaseError);
      }

      // Navigate to results with prediction data
      navigate('/result', { 
        state: { 
          prediction,
          userInput: predictionData
        } 
      });
    } catch (err) {
      setError('Failed to get prediction. Please try again.');
      console.error('Prediction error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="symptom-form-page">
      <div className="container">
        <div className="form-container">
          <div className="card">
            <h1 className="form-title">Symptom Checker</h1>
            <p className="form-description">
              Select your symptoms and provide basic information to get AI-powered health insights
            </p>

            {error && (
              <div className="alert alert-error">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Age *</label>
                <input
                  type="number"
                  className="form-input"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  min="1"
                  max="120"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Gender *</label>
                <select
                  className="form-select"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">
                  Select Your Symptoms * ({selectedSymptoms.length} selected)
                </label>
                <div className="checkbox-group">
                  {SYMPTOMS.map(symptom => (
                    <label key={symptom} className="checkbox-item">
                      <input
                        type="checkbox"
                        checked={selectedSymptoms.includes(symptom)}
                        onChange={() => handleSymptomChange(symptom)}
                      />
                      {symptom}
                    </label>
                  ))}
                </div>
              </div>

              <button 
                type="submit" 
                className="btn btn-primary btn-large"
                disabled={loading}
              >
                {loading ? (
                  <div className="loading">
                    <div className="spinner"></div>
                    <span>Analyzing...</span>
                  </div>
                ) : (
                  'Get Health Prediction'
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SymptomForm;