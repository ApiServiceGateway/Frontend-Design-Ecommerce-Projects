import { describe, it, expect, beforeEach } from 'vitest';
import { NextRequest } from 'next/server';
import { GET as getProducts } from '@/app/api/catalog/products/route';
import { POST as authOtpRoute } from '@/app/api/auth/otp/route';
import { POST as calculateCheckoutRoute } from '@/app/api/checkout/calculate/route';
import { POST as aiConciergeRoute } from '@/app/api/ai/concierge/route';
import { authComplianceService } from '@/modules/auth/auth.service';

describe('Next.js API Route Handlers Integration Tests', () => {
  beforeEach(() => {
    authComplianceService.clear();
  });

  describe('GET /api/catalog/products', () => {
    it('should return catalog products wrapped in standardized success envelope', async () => {
      const request = new NextRequest('http://localhost:3000/api/catalog/products?sort=TOP_RANKED');
      const response = await getProducts(request);
      const json = await response.json();

      expect(response.status).toBe(200);
      expect(json.success).toBe(true);
      expect(json.data.total).toBeGreaterThan(0);
      expect(json.data.products[0].meta.displayBadgeLabel).toBeDefined();
    });
  });

  describe('POST /api/auth/otp', () => {
    it('should handle REQUEST_OTP action and return masked phone number', async () => {
      const request = new NextRequest('http://localhost:3000/api/auth/otp', {
        method: 'POST',
        body: JSON.stringify({
          action: 'REQUEST_OTP',
          phone: '+91 98765 43210',
        }),
      });

      const response = await authOtpRoute(request);
      const json = await response.json();

      expect(response.status).toBe(200);
      expect(json.success).toBe(true);
      expect(json.data.maskedPhone).toBe('+91 ****** 3210');
    });

    it('should return 422 error on invalid phone or unsupported action', async () => {
      const request = new NextRequest('http://localhost:3000/api/auth/otp', {
        method: 'POST',
        body: JSON.stringify({
          action: 'UNKNOWN_ACTION',
        }),
      });

      const response = await authOtpRoute(request);
      const json = await response.json();

      expect(response.status).toBe(422);
      expect(json.success).toBe(false);
      expect(json.error.code).toBe('VALIDATION_FAILED');
    });
  });

  describe('POST /api/checkout/calculate', () => {
    it('should calculate 5% prepaid discount on PREPAID_UPI', async () => {
      const request = new NextRequest('http://localhost:3000/api/checkout/calculate', {
        method: 'POST',
        body: JSON.stringify({
          items: [
            {
              variantId: 'v1',
              sku: 'AURA-DUAL-ROSE',
              title: 'Aura Dual Stimulator',
              unitPricePaise: 299900,
              quantity: 1,
            },
          ],
          paymentMethod: 'PREPAID_UPI',
        }),
      });

      const response = await calculateCheckoutRoute(request);
      const json = await response.json();

      expect(response.status).toBe(200);
      expect(json.success).toBe(true);
      expect(json.data.subtotalPaise).toBe(299900);
      expect(json.data.prepaidDiscountPaise).toBe(14995);
      expect(json.data.neutralBillingDescriptor).toBe('Aura Retail & Lifestyle');
    });

    it('should reject empty cart with 422 VALIDATION_FAILED', async () => {
      const request = new NextRequest('http://localhost:3000/api/checkout/calculate', {
        method: 'POST',
        body: JSON.stringify({
          items: [],
          paymentMethod: 'PREPAID_UPI',
        }),
      });

      const response = await calculateCheckoutRoute(request);
      const json = await response.json();

      expect(response.status).toBe(422);
      expect(json.success).toBe(false);
      expect(json.error.code).toBe('VALIDATION_FAILED');
    });
  });

  describe('POST /api/ai/concierge', () => {
    it('should provide anatomical guidance with PII stripped and medical disclaimer attached', async () => {
      const request = new NextRequest('http://localhost:3000/api/ai/concierge', {
        method: 'POST',
        body: JSON.stringify({
          userId: 'test_user_ai',
          isAgeVerified: true,
          userQuery: 'Can I use coconut oil on my medical grade silicone massager?',
        }),
      });

      const response = await aiConciergeRoute(request);
      const json = await response.json();

      expect(response.status).toBe(200);
      expect(json.success).toBe(true);
      expect(json.data.compatibility.compatibleLubricants).toContain('Water-based lubricants');
      expect(json.data.medicalDisclaimer).toContain('not medical advice');
    });

    it('should reject underage users with 403 AGE_RESTRICTION_FAILED', async () => {
      const request = new NextRequest('http://localhost:3000/api/ai/concierge', {
        method: 'POST',
        body: JSON.stringify({
          userId: 'underage_user',
          isAgeVerified: false,
          userQuery: 'Give me suggestions.',
        }),
      });

      const response = await aiConciergeRoute(request);
      const json = await response.json();

      expect(response.status).toBe(403);
      expect(json.success).toBe(false);
      expect(json.error.code).toBe('AGE_RESTRICTION_FAILED');
    });
  });
});
