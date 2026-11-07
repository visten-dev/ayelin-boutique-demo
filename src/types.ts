export interface ServiceCategory {
  id: string;
  title: string;
  tagline: string;
  description: string;
  highlights: string[];
  timeline: string;
  recommendedFor: string;
  image?: string;
}

export interface CollectionItem {
  id: string;
  title: string;
  category: string;
  categoryName: string;
  description: string;
  craftDetails: string;
  fabric: string;
  image: string;
  aspect: 'portrait' | 'landscape';
}

export interface TestimonialItem {
  id: string;
  clientName: string;
  occasion: string;
  rating: number;
  location: string;
  review: string;
  highlight: string;
}

export interface ConsultationFormData {
  fullName: string;
  phoneNumber: string;
  serviceCategory: string;
  preferredDate: string;
  preferredTimeSlot: string;
  notes: string;
  hasOwnFabric: 'yes' | 'no' | 'consultation_needed';
}

export interface FormValidationResult {
  isValid: boolean;
  errors: Partial<Record<keyof ConsultationFormData, string>>;
}
