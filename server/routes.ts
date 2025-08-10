import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

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
            console.error(`Error fetching Instagram post ${postUrl}:`, error);
            return {
              url: postUrl,
              error: error instanceof Error ? error.message : 'Unknown error'
            };
          }
        })
      );

      res.json({ posts });
    } catch (error) {
      console.error('Error fetching Instagram posts:', error);
      res.status(500).json({ error: 'Failed to fetch Instagram posts' });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
