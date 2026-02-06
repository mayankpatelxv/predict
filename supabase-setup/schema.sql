-- Create users table
CREATE TABLE IF NOT EXISTS users (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email VARCHAR(255) UNIQUE,
    name VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create diseases table
CREATE TABLE IF NOT EXISTS diseases (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    description TEXT,
    symptoms TEXT,
    specialty VARCHAR(255),
    severity VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create doctors table
CREATE TABLE IF NOT EXISTS doctors (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    specialty VARCHAR(255) NOT NULL,
    description TEXT,
    phone VARCHAR(20),
    email VARCHAR(255),
    location VARCHAR(255),
    rating DECIMAL(3,2) DEFAULT 0.00,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create symptom_logs table
CREATE TABLE IF NOT EXISTS symptom_logs (
    id SERIAL PRIMARY KEY,
    user_id UUID REFERENCES users(id),
    symptoms TEXT[] NOT NULL,
    age INTEGER,
    gender VARCHAR(20),
    predicted_disease VARCHAR(255),
    confidence DECIMAL(5,4),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert sample diseases
INSERT INTO diseases (name, description, symptoms, specialty, severity) VALUES
('Common Cold', 'A viral infection of the upper respiratory tract that is very common and usually mild.', 'Cough, Runny Nose, Sore Throat, Fatigue, Headache', 'General Practice', 'Mild'),
('Flu', 'Influenza is a viral infection that attacks the respiratory system including nose, throat and lungs.', 'Fever, Muscle Pain, Headache, Fatigue, Cough, Sore Throat', 'General Practice', 'Moderate'),
('Pneumonia', 'An infection that inflames air sacs in one or both lungs, which may fill with fluid.', 'Fever, Cough, Shortness of Breath, Chest Pain, Fatigue', 'Pulmonology', 'Severe'),
('Migraine', 'A headache disorder characterized by recurrent headaches that are moderate to severe.', 'Headache, Nausea, Dizziness, Blurred Vision', 'Neurology', 'Moderate'),
('Tension Headache', 'The most common type of headache, often related to stress, depression, or anxiety.', 'Headache, Neck Pain, Dizziness, Fatigue', 'Neurology', 'Mild'),
('Gastroenteritis', 'Inflammation of the lining of the intestines caused by a virus, bacteria or parasites.', 'Nausea, Vomiting, Diarrhea, Abdominal Pain, Fever', 'Gastroenterology', 'Moderate'),
('Gastritis', 'Inflammation of the protective lining of the stomach.', 'Abdominal Pain, Nausea, Bloating, Loss of Appetite', 'Gastroenterology', 'Moderate'),
('Heart Disease', 'A range of conditions that affect the heart including coronary artery disease.', 'Chest Pain, Shortness of Breath, Dizziness, Fatigue', 'Cardiology', 'Severe'),
('Hypertension', 'High blood pressure is a common condition that can lead to serious health problems.', 'Chest Pain, Headache, Dizziness, Fatigue', 'Cardiology', 'Moderate'),
('Allergic Reaction', 'An immune system response to a foreign substance that is not harmful to most people.', 'Skin Rash, Itching, Swelling, Shortness of Breath', 'Allergy & Immunology', 'Mild'),
('Dermatitis', 'A general term for inflammation of the skin.', 'Skin Rash, Itching, Swelling', 'Dermatology', 'Mild'),
('Urinary Tract Infection', 'An infection in any part of the urinary system including kidneys, bladder or urethra.', 'Frequent Urination, Blood in Urine, Abdominal Pain', 'Urology', 'Moderate'),
('Back Strain', 'Injury to the muscles or tendons in the back.', 'Back Pain, Muscle Pain, Fatigue', 'Orthopedics', 'Mild'),
('Arthritis', 'Inflammation of one or more joints causing pain and stiffness.', 'Joint Pain, Muscle Pain, Fatigue, Swelling', 'Rheumatology', 'Moderate'),
('Eye Strain', 'Fatigue of the eyes caused by intense use such as computer work or reading.', 'Eye Pain, Blurred Vision, Headache, Fatigue', 'Ophthalmology', 'Mild'),
('Ear Infection', 'An infection of the middle ear that occurs behind the eardrum.', 'Ear Pain, Hearing Loss, Fever, Dizziness', 'ENT', 'Moderate'),
('Depression', 'A mental health disorder characterized by persistent sadness and loss of interest.', 'Fatigue, Difficulty Sleeping, Loss of Appetite, Weight Loss', 'Psychiatry', 'Moderate'),
('Hypothyroidism', 'A condition where the thyroid gland does not produce enough thyroid hormone.', 'Fatigue, Weight Gain, Difficulty Sleeping, Muscle Pain', 'Endocrinology', 'Moderate'),
('Tonsillitis', 'Inflammation of the tonsils, usually caused by viral or bacterial infection.', 'Fever, Sore Throat, Swelling, Fatigue', 'ENT', 'Moderate'),
('Bronchitis', 'Inflammation of the lining of the bronchial tubes that carry air to the lungs.', 'Cough, Chest Pain, Fatigue, Shortness of Breath', 'Pulmonology', 'Moderate');

-- Insert sample doctors
INSERT INTO doctors (name, specialty, description, phone, email, location, rating) VALUES
-- General Practice
('Dr. Sarah Johnson', 'General Practice', 'Experienced family physician with 15 years of practice. Specializes in preventive care and chronic disease management.', '(555) 123-4567', 'sarah.johnson@healthcenter.com', 'Downtown Medical Center', 4.8),
('Dr. Michael Chen', 'General Practice', 'Board-certified family medicine doctor focusing on comprehensive primary care for all ages.', '(555) 234-5678', 'michael.chen@familycare.com', 'Westside Family Clinic', 4.7),

-- Cardiology
('Dr. Robert Williams', 'Cardiology', 'Interventional cardiologist with expertise in heart disease prevention and treatment.', '(555) 345-6789', 'robert.williams@heartcenter.com', 'Heart & Vascular Institute', 4.9),
('Dr. Lisa Martinez', 'Cardiology', 'Cardiologist specializing in hypertension and cardiovascular risk assessment.', '(555) 456-7890', 'lisa.martinez@cardiocare.com', 'Metropolitan Heart Clinic', 4.6),

-- Neurology
('Dr. David Brown', 'Neurology', 'Neurologist with special interest in headache disorders and migraine treatment.', '(555) 567-8901', 'david.brown@neurocenter.com', 'Neurological Associates', 4.8),
('Dr. Jennifer Davis', 'Neurology', 'Board-certified neurologist treating various neurological conditions including headaches.', '(555) 678-9012', 'jennifer.davis@brainhealth.com', 'Brain & Spine Center', 4.7),

-- Gastroenterology
('Dr. Thomas Wilson', 'Gastroenterology', 'Gastroenterologist with expertise in digestive disorders and inflammatory bowel disease.', '(555) 789-0123', 'thomas.wilson@digestivecare.com', 'Digestive Health Center', 4.8),
('Dr. Maria Garcia', 'Gastroenterology', 'Specialist in gastrointestinal disorders with focus on patient-centered care.', '(555) 890-1234', 'maria.garcia@gihealth.com', 'GI Specialists Clinic', 4.9),

-- Pulmonology
('Dr. James Anderson', 'Pulmonology', 'Pulmonologist specializing in respiratory diseases including pneumonia and asthma.', '(555) 901-2345', 'james.anderson@lungcenter.com', 'Respiratory Care Institute', 4.7),
('Dr. Susan Taylor', 'Pulmonology', 'Board-certified pulmonologist with expertise in lung infections and breathing disorders.', '(555) 012-3456', 'susan.taylor@breathewell.com', 'Pulmonary Medicine Clinic', 4.8),

-- Dermatology
('Dr. Kevin Moore', 'Dermatology', 'Dermatologist specializing in skin conditions, allergic reactions, and dermatitis.', '(555) 123-5678', 'kevin.moore@skincare.com', 'Dermatology Associates', 4.9),
('Dr. Rachel White', 'Dermatology', 'Board-certified dermatologist with focus on inflammatory skin conditions.', '(555) 234-6789', 'rachel.white@dermcenter.com', 'Advanced Dermatology', 4.8),

-- Allergy & Immunology
('Dr. Mark Thompson', 'Allergy & Immunology', 'Allergist-immunologist treating allergic reactions and immune system disorders.', '(555) 345-7890', 'mark.thompson@allergycare.com', 'Allergy & Asthma Center', 4.7),

-- Urology
('Dr. Patricia Lee', 'Urology', 'Urologist specializing in urinary tract infections and bladder disorders.', '(555) 456-8901', 'patricia.lee@urocenter.com', 'Urology Specialists', 4.8),

-- Orthopedics
('Dr. Christopher Hall', 'Orthopedics', 'Orthopedic surgeon with expertise in back pain and musculoskeletal injuries.', '(555) 567-9012', 'christopher.hall@orthocenter.com', 'Orthopedic Institute', 4.9),

-- Rheumatology
('Dr. Amanda Clark', 'Rheumatology', 'Rheumatologist specializing in arthritis and autoimmune joint conditions.', '(555) 678-0123', 'amanda.clark@rheumatology.com', 'Arthritis & Rheumatism Center', 4.8),

-- Ophthalmology
('Dr. Daniel Lewis', 'Ophthalmology', 'Ophthalmologist treating eye strain, vision problems, and eye diseases.', '(555) 789-1234', 'daniel.lewis@eyecenter.com', 'Vision Care Institute', 4.7),

-- ENT
('Dr. Michelle Walker', 'ENT', 'ENT specialist treating ear infections, hearing loss, and throat conditions.', '(555) 890-2345', 'michelle.walker@entcenter.com', 'Ear, Nose & Throat Clinic', 4.8),

-- Psychiatry
('Dr. Steven Young', 'Psychiatry', 'Psychiatrist specializing in depression, anxiety, and mood disorders.', '(555) 901-3456', 'steven.young@mentalhealth.com', 'Mental Health Associates', 4.9),

-- Endocrinology
('Dr. Laura King', 'Endocrinology', 'Endocrinologist treating thyroid disorders and hormonal imbalances.', '(555) 012-4567', 'laura.king@endocenter.com', 'Endocrine & Diabetes Center', 4.8);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_diseases_name ON diseases(name);
CREATE INDEX IF NOT EXISTS idx_doctors_specialty ON doctors(specialty);
CREATE INDEX IF NOT EXISTS idx_symptom_logs_created_at ON symptom_logs(created_at);
CREATE INDEX IF NOT EXISTS idx_symptom_logs_predicted_disease ON symptom_logs(predicted_disease);