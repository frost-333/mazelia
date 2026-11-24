export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          full_name: string;
          email: string | null;
          phone: string | null;
          avatar_url: string | null;
          role: 'user' | 'admin';
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          full_name: string;
          email?: string | null;
          phone?: string | null;
          avatar_url?: string | null;
          role?: 'user' | 'admin';
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          full_name?: string;
          email?: string | null;
          phone?: string | null;
          avatar_url?: string | null;
          role?: 'user' | 'admin';
          updated_at?: string;
        };
        Relationships: [];
      };
      event_categories: {
        Row: {
          id: number;
          name: string;
          slug: string;
          icon: string;
          display_order: number;
          created_at: string;
        };
        Insert: {
          id?: number;
          name: string;
          slug: string;
          icon?: string;
          display_order?: number;
          created_at?: string;
        };
        Update: {
          id?: number;
          name?: string;
          slug?: string;
          icon?: string;
          display_order?: number;
        };
        Relationships: [];
      };
      events: {
        Row: {
          id: string;
          user_id: string;
          name: string;
          category: string;
          description: string | null;
          event_date: string;
          event_time: string | null;
          city: string;
          location: string | null;
          estimated_budget: number;
          estimated_guest_count: number;
          status: 'planning' | 'active' | 'completed' | 'archived';
          cover_image_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          name: string;
          category?: string;
          description?: string | null;
          event_date: string;
          event_time?: string | null;
          city: string;
          location?: string | null;
          estimated_budget?: number;
          estimated_guest_count?: number;
          status?: 'planning' | 'active' | 'completed' | 'archived';
          cover_image_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          name?: string;
          category?: string;
          description?: string | null;
          event_date?: string;
          event_time?: string | null;
          city?: string;
          location?: string | null;
          estimated_budget?: number;
          estimated_guest_count?: number;
          status?: 'planning' | 'active' | 'completed' | 'archived';
          cover_image_url?: string | null;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "events_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          }
        ];
      };
      event_sessions: {
        Row: {
          id: string;
          event_id: string;
          name: string;
          session_date: string | null;
          start_time: string;
          end_time: string | null;
          location: string;
          address: string | null;
          maps_url: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          event_id: string;
          name: string;
          session_date?: string | null;
          start_time: string;
          end_time?: string | null;
          location: string;
          address?: string | null;
          maps_url?: string | null;
          created_at?: string;
        };
        Update: {
          name?: string;
          session_date?: string | null;
          start_time?: string;
          end_time?: string | null;
          location?: string;
          address?: string | null;
          maps_url?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "event_sessions_event_id_fkey";
            columns: ["event_id"];
            isOneToOne: false;
            referencedRelation: "events";
            referencedColumns: ["id"];
          }
        ];
      };
      event_checklists: {
        Row: {
          id: string;
          event_id: string;
          title: string;
          category: string;
          description: string | null;
          due_date: string | null;
          priority: 'high' | 'medium' | 'low';
          is_completed: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          event_id: string;
          title: string;
          category?: string;
          description?: string | null;
          due_date?: string | null;
          priority?: 'high' | 'medium' | 'low';
          is_completed?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          title?: string;
          category?: string;
          description?: string | null;
          due_date?: string | null;
          priority?: 'high' | 'medium' | 'low';
          is_completed?: boolean;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "event_checklists_event_id_fkey";
            columns: ["event_id"];
            isOneToOne: false;
            referencedRelation: "events";
            referencedColumns: ["id"];
          }
        ];
      };
      event_budgets: {
        Row: {
          id: string;
          event_id: string;
          category: string;
          item_name: string;
          estimated_cost: number;
          actual_cost: number;
          down_payment: number;
          payment_status: 'unpaid' | 'partially_paid' | 'paid';
          notes: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          event_id: string;
          category: string;
          item_name: string;
          estimated_cost?: number;
          actual_cost?: number;
          down_payment?: number;
          payment_status?: 'unpaid' | 'partially_paid' | 'paid';
          notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          category?: string;
          item_name?: string;
          estimated_cost?: number;
          actual_cost?: number;
          down_payment?: number;
          payment_status?: 'unpaid' | 'partially_paid' | 'paid';
          notes?: string | null;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "event_budgets_event_id_fkey";
            columns: ["event_id"];
            isOneToOne: false;
            referencedRelation: "events";
            referencedColumns: ["id"];
          }
        ];
      };
      guest_groups: {
        Row: {
          id: string;
          event_id: string;
          name: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          event_id: string;
          name: string;
          created_at?: string;
        };
        Update: {
          name?: string;
        };
        Relationships: [
          {
            foreignKeyName: "guest_groups_event_id_fkey";
            columns: ["event_id"];
            isOneToOne: false;
            referencedRelation: "events";
            referencedColumns: ["id"];
          }
        ];
      };
      guests: {
        Row: {
          id: string;
          event_id: string;
          group_id: string | null;
          full_name: string;
          phone: string | null;
          address: string | null;
          pax: number;
          rsvp_status: 'pending' | 'attending' | 'not_attending';
          attendance_status: 'unconfirmed' | 'present' | 'absent';
          notes: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          event_id: string;
          group_id?: string | null;
          full_name: string;
          phone?: string | null;
          address?: string | null;
          pax?: number;
          rsvp_status?: 'pending' | 'attending' | 'not_attending';
          attendance_status?: 'unconfirmed' | 'present' | 'absent';
          notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          group_id?: string | null;
          full_name?: string;
          phone?: string | null;
          address?: string | null;
          pax?: number;
          rsvp_status?: 'pending' | 'attending' | 'not_attending';
          attendance_status?: 'unconfirmed' | 'present' | 'absent';
          notes?: string | null;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "guests_event_id_fkey";
            columns: ["event_id"];
            isOneToOne: false;
            referencedRelation: "events";
            referencedColumns: ["id"];
          }
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
