// Supabase Edge Function for ML Predictions
// This is a simplified version that runs in Supabase

import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

// Simple disease prediction rules (simplified ML logic)
const diseaseRules = {
  'Common Cold': ['cough', 'runny nose', 'sore throat', 'fatigue'],
  'Flu': ['fever', 'muscle pain', 'headache', 'fatigue', 'cough'],
  'Migraine': ['headache', 'nausea', 'dizziness'],
  'Gastroenteritis': ['nausea', 'vomiting', 'diarrhea', 'abdominal pain'],
  'Hypertension': ['headache', 'dizziness', 'chest pain'],
  'Allergic Reaction': ['skin rash', 'itching', 'swelling'],
  'Anxiety': ['chest pain', 'shortness of breath', 'dizziness'],
  'Pneumonia': ['fever', 'cough', 'shortness of breath', 'chest pain'],
  'Asthma': ['shortness of breath', 'wheezing', 'chest tightness'],
  'Bronchitis': ['cough', 'chest pain', 'fatigue']
}

function predictDisease(symptoms: string[]) {
  const normalizedSymptoms = symptoms.map(s => s.toLowerCase())
  
  let bestMatch = 'General Consultation Needed'
  let maxScore = 0
  let confidence = 0

  for (const [disease, diseaseSymptoms] of Object.entries(diseaseRules)) {
    const matchingSymptoms = normalizedSymptoms.filter(symptom =>
      diseaseSymptoms.some(ds => 
        symptom.includes(ds) || ds.includes(symptom)
      )
    )
    
    const score = matchingSymptoms.length / diseaseSymptoms.length
    
    if (score > maxScore && matchingSymptoms.length > 0) {
      maxScore = score
      bestMatch = disease
      confidence = Math.min(0.95, score + 0.2)
    }
  }

  return {
    disease: bestMatch,
    confidence: confidence,
    matched_symptoms: normalizedSymptoms.length
  }
}

serve(async (req) => {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response('ok', {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST',
        'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
      }
    })
  }

  try {
    const { symptoms, age, gender } = await req.json()

    if (!symptoms || symptoms.length === 0) {
      throw new Error('No symptoms provided')
    }

    // Make prediction
    const prediction = predictDisease(symptoms)

    // Initialize Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    )

    // Save to database
    await supabaseClient
      .from('symptom_logs')
      .insert({
        symptoms,
        age,
        gender,
        predicted_disease: prediction.disease,
        confidence: prediction.confidence
      })

    return new Response(
      JSON.stringify(prediction),
      {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      }
    )
  }
})