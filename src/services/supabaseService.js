import { createClient } from '@supabase/supabase-js';

// Replace with your Supabase URL and anon key
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || 'YOUR_SUPABASE_URL';
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY || 'YOUR_SUPABASE_ANON_KEY';

export const supabase = createClient(supabaseUrl, supabaseKey);

// Save symptom log to database
export const saveSymptomLog = async (logData) => {
  try {
    const { data, error } = await supabase
      .from('symptom_logs')
      .insert([{
        symptoms: logData.symptoms,
        age: logData.age,
        gender: logData.gender,
        predicted_disease: logData.predicted_disease,
        confidence: logData.confidence,
        created_at: new Date().toISOString()
      }]);

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error saving symptom log:', error);
    throw error;
  }
};

// Get disease information
export const getDiseaseInfo = async (diseaseName) => {
  try {
    const { data, error } = await supabase
      .from('diseases')
      .select('*')
      .eq('name', diseaseName)
      .single();

    if (error && error.code !== 'PGRST116') throw error;
    return data;
  } catch (error) {
    console.error('Error fetching disease info:', error);
    return null;
  }
};

// Get recommended doctors for a disease
export const getRecommendedDoctors = async (diseaseName) => {
  try {
    // First get the disease to find the specialty
    const { data: disease, error: diseaseError } = await supabase
      .from('diseases')
      .select('specialty')
      .eq('name', diseaseName)
      .single();

    if (diseaseError && diseaseError.code !== 'PGRST116') throw diseaseError;

    if (!disease) return [];

    // Then get doctors for that specialty
    const { data: doctors, error: doctorsError } = await supabase
      .from('doctors')
      .select('*')
      .eq('specialty', disease.specialty)
      .limit(3);

    if (doctorsError) throw doctorsError;
    return doctors || [];
  } catch (error) {
    console.error('Error fetching doctors:', error);
    return [];
  }
};

// Get all symptom logs (for admin purposes)
export const getSymptomLogs = async () => {
  try {
    const { data, error } = await supabase
      .from('symptom_logs')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching symptom logs:', error);
    throw error;
  }
};