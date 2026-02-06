import pandas as pd
import numpy as np
import pickle
import json

class CustomHealthPredictor:
    """
    Custom ML model using only NumPy and Pandas
    Implements a simple K-Nearest Neighbors algorithm from scratch
    """
    
    def __init__(self, k=5):
        self.k = k
        self.X_train = None
        self.y_train = None
        self.symptom_columns = None
        self.disease_mapping = None
        
    def fit(self, X, y):
        """Train the model by storing the training data"""
        self.X_train = X.values if isinstance(X, pd.DataFrame) else X
        self.y_train = y.values if isinstance(y, pd.Series) else y
        self.symptom_columns = list(X.columns) if isinstance(X, pd.DataFrame) else None
        
        # Create disease frequency mapping for confidence calculation
        unique, counts = np.unique(self.y_train, return_counts=True)
        self.disease_mapping = dict(zip(unique, counts))
        
        return self
    
    def euclidean_distance(self, x1, x2):
        """Calculate Euclidean distance between two vectors"""
        return np.sqrt(np.sum((x1 - x2) ** 2))
    
    def predict_single(self, x):
        """Predict disease for a single sample"""
        # Calculate distances to all training samples
        distances = []
        for i, train_sample in enumerate(self.X_train):
            dist = self.euclidean_distance(x, train_sample)
            distances.append((dist, self.y_train[i]))
        
        # Sort by distance and get k nearest neighbors
        distances.sort(key=lambda x: x[0])
        k_nearest = distances[:self.k]
        
        # Get the most common disease among k nearest neighbors
        k_diseases = [disease for _, disease in k_nearest]
        
        # Count occurrences
        disease_counts = {}
        for disease in k_diseases:
            disease_counts[disease] = disease_counts.get(disease, 0) + 1
        
        # Get the most common disease
        predicted_disease = max(disease_counts, key=disease_counts.get)
        
        # Calculate confidence (proportion of k neighbors with same disease)
        confidence = disease_counts[predicted_disease] / self.k
        
        # Adjust confidence based on distance
        avg_distance = np.mean([dist for dist, _ in k_nearest])
        distance_factor = 1 / (1 + avg_distance)  # Closer = higher confidence
        
        adjusted_confidence = (confidence * 0.7) + (distance_factor * 0.3)
        
        return predicted_disease, min(adjusted_confidence, 0.99)
    
    def predict(self, X):
        """Predict diseases for multiple samples"""
        X_array = X.values if isinstance(X, pd.DataFrame) else X
        predictions = []
        confidences = []
        
        for x in X_array:
            disease, confidence = self.predict_single(x)
            predictions.append(disease)
            confidences.append(confidence)
        
        return np.array(predictions), np.array(confidences)
    
    def save(self, filepath):
        """Save the model to a file"""
        model_data = {
            'k': self.k,
            'X_train': self.X_train,
            'y_train': self.y_train,
            'symptom_columns': self.symptom_columns,
            'disease_mapping': self.disease_mapping
        }
        with open(filepath, 'wb') as f:
            pickle.dump(model_data, f)
    
    @classmethod
    def load(cls, filepath):
        """Load the model from a file"""
        with open(filepath, 'rb') as f:
            model_data = pickle.load(f)
        
        model = cls(k=model_data['k'])
        model.X_train = model_data['X_train']
        model.y_train = model_data['y_train']
        model.symptom_columns = model_data['symptom_columns']
        model.disease_mapping = model_data['disease_mapping']
        
        return model


def train_model_from_csv(csv_path='../Final_Augmented_dataset_Diseases_and_Symptoms.csv'):
    """Train the custom model from the CSV dataset"""
    
    print("Loading dataset...")
    df = pd.read_csv(csv_path)
    
    print(f"Dataset shape: {df.shape}")
    print(f"Number of diseases: {df['diseases'].nunique()}")
    print(f"Number of symptoms: {df.shape[1] - 1}")
    
    # Separate features and target
    X = df.drop('diseases', axis=1)
    y = df['diseases']
    
    # Get symptom columns
    symptom_columns = list(X.columns)
    
    # Sample the data if it's too large (for faster training)
    if len(df) > 50000:
        print(f"Sampling 50000 records from {len(df)} for faster training...")
        sample_indices = np.random.choice(len(df), 50000, replace=False)
        X = X.iloc[sample_indices]
        y = y.iloc[sample_indices]
    
    print("\nTraining custom KNN model...")
    model = CustomHealthPredictor(k=7)
    model.fit(X, y)
    
    print("Model trained successfully!")
    
    # Test the model
    print("\nTesting model with sample prediction...")
    test_sample = X.iloc[0:1]
    prediction, confidence = model.predict(test_sample)
    print(f"Test prediction: {prediction[0]} (confidence: {confidence[0]:.3f})")
    print(f"Actual disease: {y.iloc[0]}")
    
    # Save the model
    print("\nSaving model...")
    model.save('custom_health_model.pkl')
    
    # Save symptom columns for reference
    with open('symptom_columns.json', 'w') as f:
        json.dump(symptom_columns, f)
    
    print("Model and symptom list saved successfully!")
    
    # Print some statistics
    print(f"\nModel Statistics:")
    print(f"- Training samples: {len(X)}")
    print(f"- Number of symptoms: {len(symptom_columns)}")
    print(f"- Number of diseases: {len(model.disease_mapping)}")
    print(f"- K value: {model.k}")
    
    return model, symptom_columns


if __name__ == "__main__":
    model, symptoms = train_model_from_csv()
    print("\n✅ Custom ML model ready to use!")