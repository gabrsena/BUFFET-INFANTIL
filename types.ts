
export interface NavItem {
  label: string;
  href: string;
}

export interface Feature {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

export interface Testimonial {
  id: string;
  name: string;
  text: string;
  rating: number;
}

export interface PartyPlanResponse {
  partyTheme: string;
  suggestedMenu: string[];
  activities: string[];
  decorConcept: string;
  surpriseFactor: string;
}
