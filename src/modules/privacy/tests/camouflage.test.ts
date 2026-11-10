import { describe, it, expect, beforeEach, vi } from 'vitest';
import { CamouflageService } from '../camouflage.service';
import { coreEventBus } from '@/core/event-bus';

describe('Discreet Camouflage Engine / Panic Button (Service 6 & Document 17)', () => {
  let service: CamouflageService;

  beforeEach(() => {
    service = new CamouflageService();
  });

  it('should initialize with pre-hydrated decoy blog content and un-camouflaged state', () => {
    const state = service.getState();

    expect(state.isCamouflaged).toBe(false);
    expect(state.decoyTitle).toBe('Everyday Minimalist — Mindful Living & Home Decor');
    expect(state.decoyFavicon).toBe('/favicon-decoy-leaf.ico');
    expect(state.articles).toHaveLength(3);
    expect(state.articles[0].title).toContain('Minimalist Decor');
  });

  it('should activate camouflage immediately with 0ms delay and emit CAMOUFLAGE_ACTIVATED event', () => {
    const emitSpy = vi.spyOn(coreEventBus, 'emit');

    const state = service.activate();

    expect(state.isCamouflaged).toBe(true);
    expect(state.activatedAt).toBeDefined();
    expect(emitSpy).toHaveBeenCalledWith('CAMOUFLAGE_ACTIVATED', expect.objectContaining({
      decoyTitle: 'Everyday Minimalist — Mindful Living & Home Decor',
    }));
  });

  it('should deactivate camouflage and return to standard Aura interface', () => {
    service.activate();
    expect(service.getState().isCamouflaged).toBe(true);

    const resetState = service.deactivate();
    expect(resetState.isCamouflaged).toBe(false);
    expect(resetState.activatedAt).toBeUndefined();
  });

  it('should trigger emergency external redirect and silence media', () => {
    const redirectInfo = service.getEmergencyRedirect();

    expect(redirectInfo.url).toBe('https://www.google.com');
    expect(redirectInfo.silenceMedia).toBe(true);
    expect(service.getState().isCamouflaged).toBe(true);
  });

  it('should return strict list of sensitive client storage keys for 1-click privacy purge', () => {
    const keys = service.getPurgeKeys();

    expect(keys).toContain('aura_cart_v1');
    expect(keys).toContain('aura_session_token');
    expect(keys).toContain('aura_recent_views');
    expect(keys).toContain('aura_search_history');
  });
});
