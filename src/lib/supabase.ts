import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://enzdgtwrrclozeyujkni.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVuemRndHdycmNsb3pleXVqa25pIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIyNDAyODUsImV4cCI6MjA3NzgxNjI4NX0.Mp6PVNDo8yfZbMBbAqfo_xZ8caVJxbh6mHySkLU7zeA'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface Recording {
  id: string
  user_id: string
  lead_id?: string
  file_name?: string
  file_size?: number
  stored_file_url?: string
  duration_seconds?: number
  transcript?: string
  call_date?: string
  created_at: string
  leads?: Lead // Joined data
}

export interface Analysis {
  id: string
  recording_id?: string
  user_id: string
  status?: string
  sentiments_score?: number
  engagement_score?: number
  confidence_score_executive?: number
  confidence_score_person?: number
  participants?: {
    count?: number
    names?: string
  }
  lead_type?: string
  objections_handeled?: string
  no_of_objections_detected?: number
  no_of_objections_handeled?: number
  next_steps?: string
  improvements?: string
  call_outcome?: string
  short_summary?: string
  // Detailed explanations
  lead_type_explanation?: string
  sentiments_explanation?: string
  engagement_explanation?: string
  confidence_explanation_executive?: string
  confidence_explanation_person?: string
  objections_detected?: string
  objections_handling_details?: string
  next_steps_detailed?: string
  improvements_for_team?: string
  call_outcome_rationale?: string
  evidence_quotes?: string
  created_at: string
}

export interface MetricsAggregate {
  id: string
  user_id: string
  date: string
  total_calls?: number
  avg_sentiment?: number
  avg_engagement?: number
  conversion_rate?: number
  objections_rate?: number
}

export interface UserProfile {
  id: string
  user_id: string
  email: string
  full_name?: string
  avatar_url?: string
  company_name?: string
  company_email?: string
  company_industry?: string
  position?: string
  use_cases?: string[]
  onboarding_completed: boolean
  created_at: string
  updated_at: string
}

export interface LeadGroup {
  id: string
  user_id: string
  group_name: string
  created_at: string
  updated_at: string
}

export interface Lead {
  id: string
  user_id: string
  name: string
  email: string
  contact: string
  description?: string
  other?: any // JSON object for additional fields
  group_id?: string
  lead_type?: string // hot, warm, cold, closing
  project?: string // Project name
  created_at: string
  updated_at: string
  lead_groups?: LeadGroup // Joined data
}