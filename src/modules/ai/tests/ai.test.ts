import { describe, it, expect, beforeEach } from 'vitest';
import {
  DiscreetAiConciergeService,
  discreetAiConciergeService,
} from '../ai.service';
import { coreRegistry } from '../../../core/registry';
import { CoreServiceNames } from '../../../core/contracts/service-names';
import { AgeRestrictionError, ValidationError } from '../../../core/errors';

describe('Discreet AI Concierge & Anatomical Safety Guide Service', () => {
  let aiService: DiscreetAiConciergeService;
  const testUserId = 'cust_ai_test_1';

  beforeEach(() => {
    aiService = new DiscreetAiConciergeService();
  });

  it('should be registered in the CoreServiceRegistry', () => {
    const service = coreRegistry.get<DiscreetAiConciergeService>(CoreServiceNames.AI_ASSISTANT);
    expect(service).toBeDefined();
    expect(service).toBe(discreetAiConciergeService);
  });

  describe('Zero PII Exposure Guard (Prompt Sanitization)', () => {
    it('should strip phone numbers, email addresses, and postal PIN codes from prompts', () => {
      const rawPrompt =
        'Hi, I live at PIN 400001 and my phone is +919876543210 or email secret@aura.in. What toy is best for beginners?';

      const scrubbed = aiService.scrubPiiFromPrompt(rawPrompt);

      expect(scrubbed).not.toContain('400001');
      expect(scrubbed).not.toContain('+919876543210');
      expect(scrubbed).not.toContain('secret@aura.in');
      expect(scrubbed).toContain('[PIN_REDACTED]');
      expect(scrubbed).toContain('[PHONE_REDACTED]');
      expect(scrubbed).toContain('[EMAIL_REDACTED]');
    });
  });

  describe('18+ Legal Age Verification Guard', () => {
    it('should reject unverified users with AgeRestrictionError', async () => {
      await expect(
        aiService.askConcierge({
          userId: testUserId,
          isAgeVerified: false, // Underage / unverified
          userQuery: 'What are the quietest massagers?',
        })
      ).rejects.toThrow(AgeRestrictionError);
    });

    it('should throw ValidationError on empty query', async () => {
      await expect(
        aiService.askConcierge({
          userId: testUserId,
          isAgeVerified: true,
          userQuery: '   ',
        })
      ).rejects.toThrow(ValidationError);
    });
  });

  describe('Material Compatibility & Safety Engine', () => {
    it('should recommend water-based lubricant and forbid silicone lubricant for medical silicone toys', () => {
      const compatibility = aiService.getMaterialCompatibility('SILICONE');

      expect(compatibility.material).toBe('100% Medical-Grade Silicone');
      expect(compatibility.compatibleLubricants).toContain('Water-based lubricants');
      expect(compatibility.incompatibleLubricants.some((l) => l.includes('Silicone-based'))).toBe(
        true
      );
      expect(compatibility.waterproofCare).toContain('IPX7');
    });

    it('should support silicone and water-based lubricants for glass and metal toys', () => {
      const compatibility = aiService.getMaterialCompatibility('GLASS');

      expect(compatibility.compatibleLubricants).toContain('Silicone-based lubricants');
      expect(compatibility.compatibleLubricants).toContain('Water-based lubricants');
      expect(compatibility.cleaningGuide).toContain('boiling water');
    });
  });

  describe('Anatomical Recommendation & Medical Disclaimer', () => {
    it('should provide beginner tailored discovery with mandatory medical disclaimer', async () => {
      const response = await aiService.askConcierge({
        userId: testUserId,
        isAgeVerified: true,
        userQuery: 'I am a complete beginner looking for something quiet and body-safe.',
        userExperienceLevel: 'BEGINNER',
      });

      expect(response.advice).toContain('beginners');
      expect(response.compatibility?.compatibleLubricants).toContain('Water-based lubricants');
      expect(response.recommendedCategorySlugs).toContain('starter-wellness-kits');
      expect(response.safetyBadgesHighlight).toContain('100% Medical-Grade Silicone');
      expect(response.medicalDisclaimer).toContain('not medical advice');
    });
  });
});
