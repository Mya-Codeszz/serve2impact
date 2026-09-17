// Hand-written to match supabase/schema.sql.
// Once your Supabase project is live, regenerate the real thing with:
//   npx supabase gen types typescript --project-id YOUR_PROJECT_REF > types/database.types.ts

export type OpportunityStatus = 'pending' | 'verified' | 'rejected' | 'expired';
export type CommitmentType = 'one_time' | 'recurring';
export type LocationType = 'in_person' | 'virtual' | 'hybrid';
export type ApplicationStatus = 'interested' | 'applied' | 'accepted' | 'completed' | 'withdrawn';
export type UserRole = 'student' | 'org_admin' | 'site_admin';

export interface Profile {
  id: string;
  role: UserRole;
  full_name: string | null;
  school: string | null;
  grade_level: number | null;
  date_of_birth: string | null;
  bio: string | null;
  interests: string[];
  preferred_location_type: LocationType | null;
  home_zip: string | null;
  max_travel_miles: number | null;
  availability: Record<string, boolean>;
  created_at: string;
  updated_at: string;
}

export interface Organization {
  id: string;
  owner_id: string | null;
  name: string;
  description: string | null;
  website: string | null;
  contact_email: string | null;
  contact_phone: string | null;
  logo_url: string | null;
  is_verified: boolean;
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  icon: string | null;
}

export interface Opportunity {
  id: string;
  organization_id: string;
  submitted_by: string | null;
  title: string;
  description: string;
  location_type: LocationType;
  address: string | null;
  city: string | null;
  state: string | null;
  zip: string | null;
  latitude: number | null;
  longitude: number | null;
  commitment_type: CommitmentType;
  start_date: string | null;
  end_date: string | null;
  recurring_schedule: string | null;
  estimated_hours: number | null;
  min_age: number | null;
  max_age: number | null;
  requires_guardian_consent: boolean;
  spots_available: number | null;
  application_url: string | null;
  application_instructions: string | null;
  status: OpportunityStatus;
  rejection_reason: string | null;
  verified_at: string | null;
  verified_by: string | null;
  expires_at: string | null;
  view_count: number;
  created_at: string;
  updated_at: string;
  // convenience fields populated by joined queries, not raw columns
  organization?: Organization;
  categories?: Category[];
}

export interface StudentOpportunity {
  id: string;
  student_id: string;
  opportunity_id: string;
  status: ApplicationStatus;
  saved_at: string;
  applied_at: string | null;
  completed_at: string | null;
  hours_logged: number | null;
  notes: string | null;
}

export interface VolunteerHoursLogEntry {
  id: string;
  student_id: string;
  opportunity_id: string | null;
  organization_name: string | null;
  date: string;
  hours: number;
  description: string | null;
  verified: boolean;
  created_at: string;
}

// Minimal Database shape so @supabase/ssr's generics are satisfied.
// Expand table-by-table as you wire up real queries, or swap in the
// CLI-generated file once the project is live.
export interface Database {
  public: {
    Tables: {
      profiles: { Row: Profile; Insert: Partial<Profile>; Update: Partial<Profile> };
      organizations: { Row: Organization; Insert: Partial<Organization>; Update: Partial<Organization> };
      categories: { Row: Category; Insert: Partial<Category>; Update: Partial<Category> };
      opportunities: { Row: Opportunity; Insert: Partial<Opportunity>; Update: Partial<Opportunity> };
      student_opportunities: { Row: StudentOpportunity; Insert: Partial<StudentOpportunity>; Update: Partial<StudentOpportunity> };
      volunteer_hours_log: { Row: VolunteerHoursLogEntry; Insert: Partial<VolunteerHoursLogEntry>; Update: Partial<VolunteerHoursLogEntry> };
    };
  };
}
