import { coreRegistry } from '../../core/registry';
import { CoreServiceNames } from '../../core/contracts/service-names';
import { AgeRestrictionError, ValidationError } from '../../core/errors';
import {
  CompatibilityGuidance,
  ConciergeRecommendationResult,
  WellnessQueryInput,
} from './types';

export class DiscreetAiConciergeService {
  private readonly medicalDisclaimer =
    'Aura Wellness Concierge provides educational product discovery and anatomical care guidance. This is not medical advice. Consult a healthcare professional for clinical concerns.';

  /**
   * PII Scrubber: Strips phone numbers, emails, addresses, and PIN codes
   * before any prompt text is passed to LLM APIs (Gemini/OpenAI)
   */
  public scrubPiiFromPrompt(rawPrompt: string): string {
    let cleaned = rawPrompt;

    // 1. Strip Indian mobile numbers (+91, 10 digits)
    cleaned = cleaned.replace(/(?:\+91|91|0)?[6-9]\d{9}\b/g, '[PHONE_REDACTED]');

    // 2. Strip Email addresses
    cleaned = cleaned.replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g, '[EMAIL_REDACTED]');

    // 3. Strip 6-digit Indian PIN codes
    cleaned = cleaned.replace(/\b[1-9][0-9]{5}\b/g, '[PIN_REDACTED]');

    // 4. Strip credit card sequences (16 digits)
    cleaned = cleaned.replace(/\b(?:\d{4}[ -]?){3}\d{4}\b/g, '[CARD_REDACTED]');

    return cleaned;
  }

  /**
   * Anatomical and Material Compatibility Engine
   */
  public getMaterialCompatibility(material: string): CompatibilityGuidance {
    const normalized = material.toUpperCase().trim();

    if (normalized.includes('SILICONE')) {
      return {
        material: '100% Medical-Grade Silicone',
        compatibleLubricants: [
          'Water-based lubricants',
          'Aloe-vera based personal lubricants',
          'Natural botanical moisturizing formulas',
        ],
        incompatibleLubricants: [
          'Silicone-based lubricants (causes irreversible silicone degradation and surface pitting)',
          'Oil-based lubricants / Vaseline / Coconut oil',
        ],
        cleaningGuide:
          'Clean with warm water and antibacterial toy cleanser or mild unscented soap. Avoid alcohol and harsh chemicals.',
        waterproofCare:
          'IPX7 certified waterproof. Completely dry magnetic charging pins with a lint-free towel before plugging into USB power.',
      };
    }

    if (normalized.includes('GLASS') || normalized.includes('METAL') || normalized.includes('TITANIUM')) {
      return {
        material: 'Borosilicate Glass / Medical Titanium',
        compatibleLubricants: [
          'Water-based lubricants',
          'Silicone-based lubricants',
          'Hybrid and botanical lubricants',
        ],
        incompatibleLubricants: ['Abrasive scouring powders or scratch-inducing pads'],
        cleaningGuide:
          'Non-porous and hypoallergenic. Can be sanitized in boiling water for 3 minutes or washed with warm soapy water.',
        waterproofCare: '100% Waterproof and body-safe.',
      };
    }

    // Default ABS / Body-safe plastic
    return {
      material: 'Body-Safe ABS Polymer',
      compatibleLubricants: ['Water-based personal lubricants'],
      incompatibleLubricants: ['Acetone / nail polish remover', 'Harsh petrochemical oils'],
      cleaningGuide: 'Wipe with damp cloth and gentle antibacterial soap. Do not submerge USB port.',
      waterproofCare: 'Splash-resistant (avoid prolonged submersion unless IPX7 rated).',
    };
  }

  /**
   * Query the Confidential AI Wellness Concierge with PII scrubbing and 18+ enforcement
   */
  public async askConcierge(input: WellnessQueryInput): Promise<ConciergeRecommendationResult> {
    const { userId, isAgeVerified, userQuery, focusedProductMaterial, userExperienceLevel = 'BEGINNER' } = input;

    // 1. Mandatory 18+ Age Check
    if (!isAgeVerified) {
      throw new AgeRestrictionError(
        'You must verify that you are at least 18 years of age to access the Aura intimate wellness concierge.'
      );
    }

    if (!userQuery || userQuery.trim().length === 0) {
      throw new ValidationError('Query cannot be empty.');
    }

    // 2. Scrub PII from query before sending to any model
    const scrubbedQuery = this.scrubPiiFromPrompt(userQuery);

    // 3. Extract or resolve material compatibility
    let targetMaterial = focusedProductMaterial || 'SILICONE';
    if (/glass/i.test(scrubbedQuery)) targetMaterial = 'GLASS';
    if (/metal|titanium/i.test(scrubbedQuery)) targetMaterial = 'METAL';

    const compatibility = this.getMaterialCompatibility(targetMaterial);

    // 4. Formulate educational, non-judgmental guidance
    let advice = '';
    const recommendedCategories: string[] = [];

    if (/beginner|first time|starter/i.test(scrubbedQuery) || userExperienceLevel === 'BEGINNER') {
      advice =
        'For beginners exploring intimate wellness, we recommend starting with compact, whisper-quiet devices featuring flexible medical-grade silicone heads. Gradual speed increments allow comfortable acclimatization. Always pair with a generous amount of water-based lubricant.';
      recommendedCategories.push('starter-wellness-kits', 'mini-sonic-stimulators');
    } else if (/cleaning|wash|care/i.test(scrubbedQuery)) {
      advice = `Proper hygiene preserves device longevity: ${compatibility.cleaningGuide} Store in a cool, dark, lint-free pouch away from direct sunlight.`;
      recommendedCategories.push('hygiene-and-care');
    } else {
      advice =
        'Aura personal wellness devices feature ergonomic sub-50dB motors designed for whisper-quiet relaxation. Focus on medical-grade body-safe materials (Phthalate-free & Latex-free) for optimal skin comfort.';
      recommendedCategories.push('dual-stimulation-wands', 'silent-stimulators');
    }

    return {
      scrubbedQuery,
      advice,
      compatibility,
      recommendedCategorySlugs: recommendedCategories,
      safetyBadgesHighlight: [
        '100% Medical-Grade Silicone',
        'Phthalate-Free & Latex-Free',
        'Sub-50dB Whisper Quiet',
        'IPX7 Waterproof',
      ],
      medicalDisclaimer: this.medicalDisclaimer,
      timestamp: new Date().toISOString(),
    };
  }
}

// Export singleton instance and register into coreRegistry
export const discreetAiConciergeService = new DiscreetAiConciergeService();
coreRegistry.register(CoreServiceNames.AI_ASSISTANT, discreetAiConciergeService);
