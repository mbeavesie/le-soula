declare module '@tryghost/content-api' {
  interface GhostPost {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    feature_image: string | null;
    published_at: string;
    url: string;
    html: string;
    tags?: any[];
    authors?: any[];
  }

  interface GhostAPI {
    posts: {
      browse(options?: {
        limit?: number;
        include?: string[];
        filter?: string;
      }): Promise<GhostPost[]>;
    };
  }

  interface GhostAPIOptions {
    url: string;
    key: string;
    version: string;
  }

  export default class GhostContentAPI implements GhostAPI {
    constructor(options: GhostAPIOptions);
    posts: {
      browse(options?: {
        limit?: number;
        include?: string[];
        filter?: string;
      }): Promise<GhostPost[]>;
    };
  }
}