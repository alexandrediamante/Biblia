export type Plan = 'free' | 'premium';

export interface UserProfile {
  id: string;
  name: string;
  plan: Plan;
}
