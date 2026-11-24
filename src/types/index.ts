import { Database } from './database.types';

export type Profile = Database['public']['Tables']['profiles']['Row'];
export type EventCategory = Database['public']['Tables']['event_categories']['Row'];
export type Event = Database['public']['Tables']['events']['Row'];
export type EventSession = Database['public']['Tables']['event_sessions']['Row'];
export type EventChecklist = Database['public']['Tables']['event_checklists']['Row'];
export type EventBudget = Database['public']['Tables']['event_budgets']['Row'];
export type GuestGroup = Database['public']['Tables']['guest_groups']['Row'];
export type Guest = Database['public']['Tables']['guests']['Row'];

export interface EventWithCounts extends Event {
  checklist_count?: number;
  completed_checklist_count?: number;
  total_estimated_budget?: number;
  total_actual_budget?: number;
  total_down_payment?: number;
  total_guests?: number;
  total_pax?: number;
  attending_pax?: number;
}
