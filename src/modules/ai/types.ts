/**
 * Discreet AI Concierge & Anatomical Safety Domain Types
 */

export interface WellnessQueryInput {
  userId: string;
  isAgeVerified: boolean;
  userQuery: string;
  focusedProductMaterial?: 'SILICONE' | 'ABS' | 'GLASS' | 'METAL' | 'TPE';
  userExperienceLevel?: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
}

export interface CompatibilityGuidance {
  material: string;
  compatibleLubricants: string[];
  incompatibleLubricants: string[];
  cleaningGuide: string;
  waterproofCare: string;
}

export interface ConciergeRecommendationResult {
  scrubbedQuery: string;
  advice: string;
  compatibility?: CompatibilityGuidance;
  recommendedCategorySlugs: string[];
  safetyBadgesHighlight: string[];
  medicalDisclaimer: string;
  timestamp: string;
}
