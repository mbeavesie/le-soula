import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
// @ts-ignore
import GhostContentAPI from '@tryghost/content-api';

export async function registerRoutes(app: Express): Promise<Server> {
  // Instagram posts endpoint
  app.get("/api/instagram-posts", async (req, res) => {
    try {
      // Instagram post URLs - these should be actual post URLs from @lesoulawine
      const instagramPosts = [
        'https://www.instagram.com/p/EXAMPLE1/', // Replace with actual post URLs
        'https://www.instagram.com/p/EXAMPLE2/', // Replace with actual post URLs  
        'https://www.instagram.com/p/EXAMPLE3/', // Replace with actual post URLs
      ];

      const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;
      
      if (!accessToken) {
        return res.status(500).json({ 
          error: 'Instagram access token not configured. Please set INSTAGRAM_ACCESS_TOKEN environment variable.' 
        });
      }

      const posts = await Promise.all(
        instagramPosts.map(async (postUrl) => {
          try {
            const oEmbedUrl = `https://graph.facebook.com/v18.0/instagram_oembed?url=${encodeURIComponent(postUrl)}&access_token=${accessToken}`;
            const response = await fetch(oEmbedUrl);
            
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const embedData = await response.json();
            return {
              url: postUrl,
              html: embedData.html,
              width: embedData.width,
              height: embedData.height,
              title: embedData.title,
              author_name: embedData.author_name,
              author_url: embedData.author_url,
              provider_name: embedData.provider_name,
              provider_url: embedData.provider_url,
              type: embedData.type,
              version: embedData.version
            };
          } catch (error) {
            return {
              url: postUrl,
              error: error instanceof Error ? error.message : 'Unknown error'
            };
          }
        })
      );

      res.json({ posts });
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch Instagram posts' });
    }
  });

  // Ghost blog posts endpoint
  app.get("/api/ghost-posts", async (req, res) => {
    try {
      const ghostUrl = process.env.GHOST_URL;
      const ghostKey = process.env.GHOST_CONTENT_KEY;

      if (!ghostUrl || !ghostKey) {
        // Return fallback content if Ghost is not configured
        return res.json({
          posts: [
            {
              id: 'fallback-1',
              title: 'Spring in the high valleys',
              slug: 'spring-valleys',
              excerpt: 'Cover crops flourishing after late spring rains bring life to the terraces.',
              feature_image: '/api/assets/vineyard-spring.jpg',
              published_at: '2025-04-15T10:00:00.000Z',
              url: '#',
              html: '<p>Cover crops flourishing after late spring rains bring life to the terraces.</p>'
            },
            {
              id: 'fallback-2', 
              title: 'Coup de Cœur',
              slug: 'coup-de-coeur',
              excerpt: 'Our wines gain accolades in this year\'s "La Revue du Vin".',
              feature_image: '/api/assets/awards.jpg',
              published_at: '2025-01-30T10:00:00.000Z',
              url: '#',
              html: '<p>Our wines gain accolades in this year\'s "La Revue du Vin".</p>'
            },
            {
              id: 'fallback-3',
              title: 'Harvest notes',
              slug: 'harvest-notes',
              excerpt: 'Cool nights; measured ripening; vivid acidity preserved in the final wines.',
              feature_image: '/api/assets/harvest.jpg',
              published_at: '2024-10-12T10:00:00.000Z',
              url: '#',
              html: '<p>Cool nights; measured ripening; vivid acidity preserved in the final wines.</p>'
            }
          ]
        });
      }

      // Initialize Ghost API
      const api = new GhostContentAPI({
        url: ghostUrl,
        key: ghostKey,
        version: 'v5.0'
      });

      // Fetch posts from Ghost
      const posts = await api.posts.browse({
        limit: 6,
        include: ['tags', 'authors'],
        filter: 'visibility:public'
      });

      res.json({ posts });
    } catch (error) {
      console.error('Ghost API Error:', error);
      res.status(500).json({ 
        error: 'Failed to fetch blog posts',
        details: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });

  // Contact form endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      const { email } = req.body;
      
      if (!email || !email.includes('@')) {
        return res.status(400).json({ 
          error: 'Valid email address is required' 
        });
      }

      // Here you would typically save to database or send to email service
      // For now, we'll just return success
      
      // In production, you might want to:
      // - Save to database
      // - Send to email marketing service (Mailchimp, Sendinblue, etc.)
      // - Send confirmation email
      
      res.json({ 
        success: true, 
        message: 'Successfully subscribed to newsletter' 
      });
    } catch (error) {
      res.status(500).json({ 
        error: 'Failed to process subscription. Please try again.' 
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
