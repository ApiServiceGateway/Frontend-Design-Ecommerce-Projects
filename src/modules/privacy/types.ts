export interface DecoyArticle {
  id: string;
  title: string;
  snippet: string;
  readTime: string;
  category: string;
}

export interface CamouflageState {
  isCamouflaged: boolean;
  decoyTitle: string;
  decoyFavicon: string;
  emergencyRedirectUrl: string;
  activatedAt?: Date;
  articles: DecoyArticle[];
}

export interface CamouflageConfig {
  defaultDecoyTitle?: string;
  defaultDecoyFavicon?: string;
  emergencyRedirectUrl?: string;
}
