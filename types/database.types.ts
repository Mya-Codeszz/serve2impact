// Hand-written database types matching supabase/schema.sql.
// These can be replaced later with the CLI-generated Supabase types.

export type OpportunityStatus =
  | 'pending'
  | 'verified'
  | 'rejected'
  | 'expired';

export type CommitmentType =
  | 'one_time'
  | 'recurring';

export type LocationType =
  | 'in_person'
  | 'virtual'
  | 'hybrid';

export type ApplicationStatus =
  | 'interested'
  | 'applied'
  | 'accepted'
  | 'completed'
  | 'withdrawn';

export type UserRole =
  | 'student'
  | 'org_admin'
  | 'site_admin';

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

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: Profile;
        Insert: {
          id: string;
          role?: UserRole;
          full_name?: string | null;
          school?: string | null;
          grade_level?: number | null;
          date_of_birth?: string | null;
          bio?: string | null;
          interests?: string[];
          preferred_location_type?: LocationType | null;
          home_zip?: string | null;
          max_travel_miles?: number | null;
          availability?: Record<string, boolean>;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          role?: UserRole;
          full_name?: string | null;
          school?: string | null;
          grade_level?: number | null;
          date_of_birth?: string | null;
          bio?: string | null;
          interests?: string[];
          preferred_location_type?: LocationType | null;
          home_zip?: string | null;
          max_travel_miles?: number | null;
          availability?: Record<string, boolean>;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };

      organizations: {
        Row: Organization;
        Insert: {
          id?: string;
          owner_id?: string | null;
          name: string;
          description?: string | null;
          website?: string | null;
          contact_email?: string | null;
          contact_phone?: string | null;
          logo_url?: string | null;
          is_verified?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          owner_id?: string | null;
          name?: string;
          description?: string | null;
          website?: string | null;
          contact_email?: string | null;
          contact_phone?: string | null;
          logo_url?: string | null;
          is_verified?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };

      categories: {
        Row: Category;
        Insert: {
          id?: string;
          slug: string;
          name: string;
          icon?: string | null;
        };
        Update: {
          id?: string;
          slug?: string;
          name?: string;
          icon?: string | null;
        };
        Relationships: [];
      };

      opportunities: {
        Row: Opportunity;
        Insert: {
          id?: string;
          organization_id: string;
          submitted_by?: string | null;
          title: string;
          description: string;
          location_type: LocationType;
          address?: string | null;
          city?: string | null;
          state?: string | null;
          zip?: string | null;
          latitude?: number | null;
          longitude?: number | null;
          commitment_type: CommitmentType;
          start_date?: string | null;
          end_date?: string | null;
          recurring_schedule?: string | null;
          estimated_hours?: number | null;
          min_age?: number | null;
          max_age?: number | null;
          requires_guardian_consent?: boolean;
          spots_available?: number | null;
          application_url?: string | null;
          application_instructions?: string | null;
          status?: OpportunityStatus;
          rejection_reason?: string | null;
          verified_at?: string | null;
          verified_by?: string | null;
          expires_at?: string | null;
          view_count?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          organization_id?: string;
          submitted_by?: string | null;
          title?: string;
          description?: string;
          location_type?: LocationType;
          address?: string | null;
          city?: string | null;
          state?: string | null;
          zip?: string | null;
          latitude?: number | null;
          longitude?: number | null;
          commitment_type?: CommitmentType;
          start_date?: string | null;
          end_date?: string | null;
          recurring_schedule?: string | null;
          estimated_hours?: number | null;
          min_age?: number | null;
          max_age?: number | null;
          requires_guardian_consent?: boolean;
          spots_available?: number | null;
          application_url?: string | null;
          application_instructions?: string | null;
          status?: OpportunityStatus;
          rejection_reason?: string | null;
          verified_at?: string | null;
          verified_by?: string | null;
          expires_at?: string | null;
          view_count?: number;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };

      student_opportunities: {
        Row: StudentOpportunity;
        Insert: {
          id?: string;
          student_id: string;
          opportunity_id: string;
          status?: ApplicationStatus;
          saved_at?: string;
          applied_at?: string | null;
          completed_at?: string | null;
          hours_logged?: number | null;
          notes?: string | null;
        };
        Update: {
          id?: string;
          student_id?: string;
          opportunity_id?: string;
          status?: ApplicationStatus;
          saved_at?: string;
          applied_at?: string | null;
          completed_at?: string | null;
          hours_logged?: number | null;
          notes?: string | null;
        };
        Relationships: [];
      };

      volunteer_hours_log: {
        Row: VolunteerHoursLogEntry;
        Insert: {
          id?: string;
          student_id: string;
          opportunity_id?: string | null;
          organization_name?: string | null;
          date: string;
          hours: number;
          description?: string | null;
          verified?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          student_id?: string;
          opportunity_id?: string | null;
          organization_name?: string | null;
          date?: string;
          hours?: number;
          description?: string | null;
          verified?: boolean;
          created_at?: string;
        };
        Relationships: [];
      };
    };

    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: {
      opportunity_status: OpportunityStatus;
      commitment_type: CommitmentType;
      location_type: LocationType;
      application_status: ApplicationStatus;
      user_role: UserRole;
    };
    CompositeTypes: Record<string, never>;
  };
}
