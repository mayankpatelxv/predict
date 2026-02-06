import axios from 'axios';

const ML_API_URL = process.env.REACT_APP_ML_API_URL || 'http://localhost:5000';

export const predictDisease = async (symptomData) => {
  try {
    const response = await axios.post(`${ML_API_URL}/predict`, symptomData, {
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 10000, // 10 second timeout
    });

    return response.data;
  } catch (error) {
    console.error('ML Service Error:', error);
    
    // Fallback prediction if ML service is unavailable
    if (error.code === 'ECONNREFUSED' || error.response?.status >= 500) {
      return getFallbackPrediction(symptomData);
    }
    
    throw error;
  }
};

// Fallback prediction logic when ML service is unavailable
const getFallbackPrediction = (symptomData) => {
  const { symptoms } = symptomData;
  
  // Simple rule-based fallback predictions
  const fallbackRules = {
    'Common Cold': ['Cough', 'Runny Nose', 'Sore Throat', 'Fatigue'],
    'Flu': ['Fever', 'Muscle Pain', 'Headache', 'Fatigue', 'Cough'],
    'Migraine': ['Headache', 'Nausea', 'Dizziness'],
    'Gastroenteritis': ['Nausea', 'Vomiting', 'Diarrhea', 'Abdominal Pain'],
    'Hypertension': ['Headache', 'Dizziness', 'Chest Pain'],
    'Anxiety': ['Chest Pain', 'Shortness of Breath', 'Dizziness', 'Fatigue'],
    'Allergic Reaction': ['Skin Rash', 'Itching', 'Swelling'],
    'Urinary Tract Infection': ['Frequent Urination', 'Blood in Urine', 'Abdominal Pain'],
    'Back Strain': ['Back Pain', 'Muscle Pain'],
    'Eye Strain': ['Eye Pain', 'Blurred Vision', 'Headache']
  };

  let bestMatch = 'General Consultation Needed';
  let maxScore = 0;

  Object.entries(fallbackRules).forEach(([disease, diseaseSymptoms]) => {
    const matchingSymptoms = symptoms.filter(symptom => 
      diseaseSymptoms.includes(symptom)
    );
    const score = matchingSymptoms.length / diseaseSymptoms.length;
    
    if (score > maxScore && matchingSymptoms.length > 0) {
      maxScore = score;
      bestMatch = disease;
    }
  });

  return {
    disease: bestMatch,
    confidence: Math.min(0.7, maxScore + 0.2), // Cap confidence at 0.7 for fallback
    fallback: true
  };
};