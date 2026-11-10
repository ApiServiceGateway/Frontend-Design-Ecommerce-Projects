import { CamouflageState, DecoyArticle, CamouflageConfig } from './types';
import { coreEventBus } from '@/core/event-bus';

export const DEFAULT_DECOY_ARTICLES: DecoyArticle[] = [
  {
    id: 'decoy-1',
    title: '10 Minimalist Decor Ideas to Transform Your Living Room',
    snippet: 'Discover calming neutral tones, Scandinavian wooden accents, and functional decluttering habits.',
    readTime: '4 min read',
    category: 'Home & Decor',
  },
  {
    id: 'decoy-2',
    title: 'Morning Matcha Routine: Sustained Energy Without the Crash',
    snippet: 'Why ceremonial-grade green tea paired with mindful breathing beats your morning espresso.',
    readTime: '3 min read',
    category: 'Wellness & Nutrition',
  },
  {
    id: 'decoy-3',
    title: 'The Art of Capsule Wardrobes: 15 Outfits for Every Season',
    snippet: 'High-quality organic cotton essentials that pair effortlessly for work, travel, and casual outings.',
    readTime: '5 min read',
    category: 'Sustainable Living',
  },
];

export class CamouflageService {
  private isCamouflaged = false;
  private activatedAt?: Date;
  private decoyTitle: string;
  private decoyFavicon: string;
  private emergencyRedirectUrl: string;

  constructor(config: CamouflageConfig = {}) {
    this.decoyTitle = config.defaultDecoyTitle || 'Everyday Minimalist — Mindful Living & Home Decor';
    this.decoyFavicon = config.defaultDecoyFavicon || '/favicon-decoy-leaf.ico';
    this.emergencyRedirectUrl = config.emergencyRedirectUrl || 'https://www.google.com';
  }

  /**
   * Returns current camouflage snapshot (0ms latency, pre-hydrated)
   */
  public getState(): CamouflageState {
    return {
      isCamouflaged: this.isCamouflaged,
      decoyTitle: this.decoyTitle,
      decoyFavicon: this.decoyFavicon,
      emergencyRedirectUrl: this.emergencyRedirectUrl,
      activatedAt: this.activatedAt,
      articles: DEFAULT_DECOY_ARTICLES,
    };
  }

  /**
   * 0ms Panic Button Trigger: Swaps interface instantly & silences running media
   */
  public activate(): CamouflageState {
    this.isCamouflaged = true;
    this.activatedAt = new Date();

    coreEventBus.emit('CAMOUFLAGE_ACTIVATED', {
      timestamp: this.activatedAt,
      decoyTitle: this.decoyTitle,
    });

    return this.getState();
  }

  /**
   * Resets camouflage back to normal Aura interface
   */
  public deactivate(): CamouflageState {
    this.isCamouflaged = false;
    this.activatedAt = undefined;
    return this.getState();
  }

  /**
   * Silences media and triggers emergency external redirect
   */
  public getEmergencyRedirect(): { url: string; silenceMedia: boolean } {
    this.activate();
    return {
      url: this.emergencyRedirectUrl,
      silenceMedia: true,
    };
  }

  /**
   * Deep privacy purge: Clears storage keys on extreme emergency
   */
  public getPurgeKeys(): string[] {
    return [
      'aura_cart_v1',
      'aura_recent_views',
      'aura_search_history',
      'aura_session_token',
    ];
  }
}

export const camouflageService = new CamouflageService();
