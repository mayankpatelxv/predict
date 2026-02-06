import pandas as pd
import numpy as np
from sklearn.tree import DecisionTreeClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, classification_report
import pickle

def create_sample_dataset():
    """Create a comprehensive sample dataset for training"""
    
    # Extended dataset with more symptoms and diseases
    data = {
        'symptoms': [
            # Respiratory conditions
            ['Fever', 'Cough', 'Fatigue', 'Sore Throat'],
            ['Fever', 'Cough', 'Shortness of Breath', 'Chest Pain'],
            ['Cough', 'Runny Nose', 'Sore Throat', 'Fatigue'],
            ['Fever', 'Muscle Pain', 'Headache', 'Fatigue', 'Cough'],
            ['Shortness of Breath', 'Chest Pain', 'Fatigue'],
            
            # Neurological conditions
            ['Headache', 'Nausea', 'Dizziness', 'Blurred Vision'],
            ['Headache', 'Neck Pain', 'Dizziness'],
            ['Headache', 'Fatigue', 'Difficulty Sleeping'],
            ['Dizziness', 'Fatigue', 'Headache', 'Nausea'],
            
            # Gastrointestinal conditions
            ['Nausea', 'Vomiting', 'Diarrhea', 'Abdominal Pain'],
            ['Abdominal Pain', 'Nausea', 'Bloating', 'Loss of Appetite'],
            ['Constipation', 'Abdominal Pain', 'Bloating'],
            ['Diarrhea', 'Abdominal Pain', 'Fever'],
            
            # Cardiovascular conditions
            ['Chest Pain', 'Shortness of Breath', 'Dizziness', 'Fatigue'],
            ['Chest Pain', 'Headache', 'Dizziness'],
            ['Shortness of Breath', 'Fatigue', 'Swelling'],
            
            # Dermatological conditions
            ['Skin Rash', 'Itching', 'Swelling'],
            ['Skin Rash', 'Itching', 'Fever'],
            ['Itching', 'Skin Rash'],
            
            # Musculoskeletal conditions
            ['Back Pain', 'Muscle Pain', 'Fatigue'],
            ['Joint Pain', 'Muscle Pain', 'Fatigue'],
            ['Neck Pain', 'Muscle Pain', 'Headache'],
            
            # Urological conditions
            ['Frequent Urination', 'Blood in Urine', 'Abdominal Pain'],
            ['Frequent Urination', 'Abdominal Pain'],
            
            # Eye/Ear conditions
            ['Eye Pain', 'Blurred Vision', 'Headache'],
            ['Ear Pain', 'Hearing Loss', 'Fever'],
            
            # Mental health related
            ['Fatigue', 'Difficulty Sleeping', 'Loss of Appetite', 'Weight Loss'],
            ['Fatigue', 'Weight Gain', 'Difficulty Sleeping'],
            
            # Additional combinations
            ['Fever', 'Sore Throat', 'Swelling', 'Fatigue'],
            ['Cough', 'Chest Pain', 'Fatigue', 'Shortness of Breath'],
            ['Headache', 'Fever', 'Neck Pain'],
            ['Nausea', 'Headache', 'Dizziness', 'Fatigue'],
            ['Muscle Pain', 'Joint Pain', 'Fever'],
            ['Weight Loss', 'Fatigue', 'Loss of Appetite', 'Nausea'],
            ['Skin Rash', 'Fever', 'Fatigue', 'Muscle Pain']
        ],
        'disease': [
            # Respiratory
            'Common Cold', 'Pneumonia', 'Common Cold', 'Flu', 'Asthma',
            
            # Neurological
            'Migraine', 'Tension Headache', 'Stress', 'Vertigo',
            
            # Gastrointestinal
            'Gastroenteritis', 'Gastritis', 'Constipation', 'Food Poisoning',
            
            # Cardiovascular
            'Heart Disease', 'Hypertension', 'Heart Failure',
            
            # Dermatological
            'Allergic Reaction', 'Dermatitis', 'Eczema',
            
            # Musculoskeletal
            'Back Strain', 'Arthritis', 'Neck Strain',
            
            # Urological
            'Urinary Tract Infection', 'Bladder Infection',
            
            # Eye/Ear
            'Eye Strain', 'Ear Infection',
            
            # Mental health
            'Depression', 'Hypothyroidism',
            
            # Additional
            'Tonsillitis', 'Bronchitis', 'Meningitis', 'Migraine', 
            'Rheumatoid Arthritis', 'Anemia', 'Viral Infection'
        ]
    }
    
    return data

def train_advanced_model():
    """Train an improved model with better feature engineering"""
    
    # Create dataset
    data = create_sample_dataset()
    
    # Get all unique symptoms
    all_symptoms = set()
    for symptom_list in data['symptoms']:
        all_symptoms.update(symptom_list)
    symptoms_list = sorted(list(all_symptoms))
    
    print(f"Total unique symptoms: {len(symptoms_list)}")
    print(f"Total training samples: {len(data['symptoms'])}")
    
    # Create feature matrix
    X = []
    for symptom_list in data['symptoms']:
        features = [1 if symptom in symptom_list else 0 for symptom in symptoms_list]
        X.append(features)
    
    X = np.array(X)
    y = np.array(data['disease'])
    
    # Split data
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    
    # Train model with better parameters
    model = DecisionTreeClassifier(
        random_state=42,
        max_depth=15,
        min_samples_split=2,
        min_samples_leaf=1,
        criterion='gini'
    )
    
    model.fit(X_train, y_train)
    
    # Evaluate model
    train_accuracy = accuracy_score(y_train, model.predict(X_train))
    test_accuracy = accuracy_score(y_test, model.predict(X_test))
    
    print(f"Training Accuracy: {train_accuracy:.3f}")
    print(f"Testing Accuracy: {test_accuracy:.3f}")
    
    # Save model
    model_data = {
        'model': model,
        'symptom_encoder': None,
        'disease_encoder': None,
        'symptoms_list': symptoms_list,
        'training_accuracy': train_accuracy,
        'testing_accuracy': test_accuracy
    }
    
    with open('health_model.pkl', 'wb') as f:
        pickle.dump(model_data, f)
    
    print("Advanced model trained and saved successfully!")
    
    # Print feature importance
    feature_importance = model.feature_importances_
    important_features = [(symptoms_list[i], importance) for i, importance in enumerate(feature_importance)]
    important_features.sort(key=lambda x: x[1], reverse=True)
    
    print("\nTop 10 Most Important Symptoms:")
    for symptom, importance in important_features[:10]:
        print(f"{symptom}: {importance:.3f}")

if __name__ == "__main__":
    train_advanced_model()