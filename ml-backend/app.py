from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import numpy as np
import json
import os
from custom_model import CustomHealthPredictor

app = Flask(__name__)
CORS(app)

# Global variables
model = None
symptom_columns = []

def load_or_train_model():
    global model, symptom_columns
    
    model_path = 'custom_health_model.pkl'
    symptom_path = 'symptom_columns.json'
    
    if os.path.exists(model_path) and os.path.exists(symptom_path):
        # Load existing model
        print("Loading custom model...")
        model = CustomHealthPredictor.load(model_path)
        
        with open(symptom_path, 'r') as f:
            symptom_columns = json.load(f)
        
        print(f"Model loaded successfully!")
        print(f"- Symptoms: {len(symptom_columns)}")
        print(f"- Diseases: {len(model.disease_mapping)}")
    else:
        # Train new model
        print("Model not found. Training new model...")
        train_model()

def train_model():
    global model, symptom_columns
    
    csv_path = '../Final_Augmented_dataset_Diseases_and_Symptoms.csv'
    
    if not os.path.exists(csv_path):
        print(f"ERROR: Dataset not found at {csv_path}")
        print("Please ensure Final_Augmented_dataset_Diseases_and_Symptoms.csv is in the project root")
        return
    
    print("Loading dataset...")
    df = pd.read_csv(csv_path)
    
    print(f"Dataset shape: {df.shape}")
    
    # Separate features and target
    X = df.drop('diseases', axis=1)
    y = df['diseases']
    symptom_columns = list(X.columns)
    
    # Sample for faster training
    if len(df) > 50000:
        print(f"Sampling 50000 records from {len(df)}...")
        sample_indices = np.random.choice(len(df), 50000, replace=False)
        X = X.iloc[sample_indices]
        y = y.iloc[sample_indices]
    
    print("Training custom KNN model...")
    model = CustomHealthPredictor(k=7)
    model.fit(X, y)
    
    print("Saving model...")
    model.save('custom_health_model.pkl')
    
    with open('symptom_columns.json', 'w') as f:
        json.dump(symptom_columns, f)
    
    print("Model trained and saved successfully!")

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        
        if not data or 'symptoms' not in data:
            return jsonify({'error': 'No symptoms provided'}), 400
        
        user_symptoms = data['symptoms']
        age = data.get('age', 30)
        gender = data.get('gender', 'unknown')
        
        # Normalize symptom names to match dataset columns
        normalized_symptoms = [s.lower() for s in user_symptoms]
        
        # Create feature vector matching the dataset columns
        features = []
        matched_symptoms = []
        
        for col in symptom_columns:
            col_lower = col.lower()
            # Check if any user symptom matches this column
            match = 0
            for user_symptom in normalized_symptoms:
                if user_symptom in col_lower or col_lower in user_symptom:
                    match = 1
                    matched_symptoms.append(col)
                    break
            features.append(match)
        
        features = np.array(features).reshape(1, -1)
        
        # Make prediction using custom model
        predictions, confidences = model.predict(features)
        prediction = predictions[0]
        confidence = confidences[0]
        
        # Adjust confidence based on symptom matching
        match_ratio = len(matched_symptoms) / max(len(user_symptoms), 1)
        adjusted_confidence = confidence * (0.7 + 0.3 * match_ratio)
        
        return jsonify({
            'disease': prediction,
            'confidence': float(min(adjusted_confidence, 0.99)),
            'matched_symptoms': matched_symptoms,
            'symptom_count': len(user_symptoms),
            'matched_count': len(matched_symptoms)
        })
        
    except Exception as e:
        print(f"Prediction error: {str(e)}")
        import traceback
        traceback.print_exc()
        return jsonify({'error': f'Prediction failed: {str(e)}'}), 500

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({
        'status': 'healthy',
        'model_loaded': model is not None,
        'model_type': 'Custom KNN (NumPy/Pandas only)',
        'symptoms_count': len(symptom_columns),
        'diseases_count': len(model.disease_mapping) if model else 0
    })

@app.route('/symptoms', methods=['GET'])
def get_symptoms():
    # Return a simplified list of common symptoms for the UI
    common_symptoms = [
        'Fever', 'Cough', 'Headache', 'Fatigue', 'Nausea', 'Vomiting',
        'Diarrhea', 'Abdominal Pain', 'Chest Pain', 'Shortness of Breath',
        'Dizziness', 'Muscle Pain', 'Joint Pain', 'Sore Throat', 'Runny Nose',
        'Skin Rash', 'Itching', 'Swelling', 'Weight Loss', 'Weight Gain',
        'Loss of Appetite', 'Difficulty Sleeping', 'Back Pain', 'Neck Pain',
        'Eye Pain', 'Blurred Vision', 'Hearing Loss', 'Ear Pain',
        'Frequent Urination', 'Blood in Urine', 'Constipation', 'Bloating'
    ]
    return jsonify({
        'symptoms': common_symptoms,
        'total_symptoms_in_model': len(symptom_columns)
    })

if __name__ == '__main__':
    load_or_train_model()
    app.run(debug=True, host='0.0.0.0', port=5000)