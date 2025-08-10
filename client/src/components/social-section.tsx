import { useLanguage } from "@/hooks/use-language";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef } from "react";

// Declare Instagram embed globals
declare global {
  interface Window {
    instgrm?: {
      Embeds: {
        process(): void;
      };
    };
  }
}

interface InstagramPost {
  url: string;
  html?: string;
  width?: number;
  height?: number;
  title?: string;
  author_name?: string;
  author_url?: string;
  provider_name?: string;
  provider_url?: string;
  type?: string;
  version?: string;
  error?: string;
}

function InstagramEmbed({ post }: { post: InstagramPost }) {
  const { ref } = useScrollReveal<HTMLDivElement>();
  const embedRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (post.html && embedRef.current) {
      embedRef.current.innerHTML = post.html;
      
      // Process Instagram embeds
      if (window.instgrm) {
        window.instgrm.Embeds.process();
      }
    }
  }, [post.html]);

  if (post.error) {
    return (
      <div ref={ref} className="reveal">
        <div className="rounded-3xl sophisticated-border p-6 bg-gradient-to-br from-red-50 to-red-100/50">
          <p className="text-red-600 text-sm">
            Error loading Instagram post: {post.error}
          </p>
          <a 
            href={post.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 text-xs text-red-500 hover:text-red-700 underline"
          >
            View on Instagram
          </a>
        </div>
      </div>
    );
  }

  return (
    <div ref={ref} className="reveal">
      <div 
        ref={embedRef}
        className="instagram-embed-container"
        style={{ maxWidth: '100%' }}
      />
    </div>
  );
}

function LoadingCard() {
  const { ref } = useScrollReveal<HTMLDivElement>();
  
  return (
    <div ref={ref} className="reveal">
      <div className="rounded-3xl sophisticated-border overflow-hidden luxury-shadow bg-gradient-to-br from-white to-stone-50/50 animate-pulse">
        <div className="w-full h-56 bg-stone-200"></div>
        <div className="p-6">
          <div className="flex items-center justify-between mb-3">
            <div className="h-3 bg-stone-200 rounded w-16"></div>
            <div className="h-3 bg-stone-200 rounded w-20"></div>
          </div>
          <div className="space-y-2">
            <div className="h-3 bg-stone-200 rounded w-full"></div>
            <div className="h-3 bg-stone-200 rounded w-3/4"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SocialSection() {
  const { t } = useLanguage();
  const { ref: headerRef } = useScrollReveal<HTMLDivElement>();

  const { data: instagramData, isLoading, error } = useQuery({
    queryKey: ['/api/instagram-posts'],
    refetchInterval: 5 * 60 * 1000, // Refetch every 5 minutes
  });

  // Load Instagram embed script
  useEffect(() => {
    if (!document.getElementById('instagram-embed-script')) {
      const script = document.createElement('script');
      script.id = 'instagram-embed-script';
      script.async = true;
      script.src = '//www.instagram.com/embed.js';
      document.body.appendChild(script);
    }
  }, []);

  return (
    <section id="social" className="py-32 border-t border-stone-200/50">
      <div ref={headerRef} className="reveal text-center mb-20">
        <h2 className="font-serif text-5xl md:text-6xl font-light tracking-tight text-gradient">
          {t('social.title')}
        </h2>
        <p className="mt-6 text-xl text-stone-600 max-w-3xl mx-auto font-light leading-relaxed">
          {t('social.copy')}
        </p>
        <a
          href="https://www.instagram.com/lesoulawine/"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex items-center gap-3 text-sm font-medium text-honey-600 hover:text-honey-700 transition-all duration-300 group/link"
        >
          <span className="tracking-wide">{t('social.cta')}</span>
          <svg className="w-4 h-4 transition-transform duration-300 group-hover/link:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </a>
      </div>
      
      {error && (
        <div className="mb-12 p-6 rounded-2xl bg-honey-50/50 border border-honey-200/30 text-center">
          <p className="text-sm text-stone-600 font-light mb-4">
            Unable to load Instagram posts. Please check the configuration.
          </p>
          <p className="text-xs text-stone-500 font-light">
            {error.message}
          </p>
        </div>
      )}

      <div className="grid gap-10 lg:grid-cols-1 xl:grid-cols-3">
        {isLoading ? (
          // Show loading state
          Array.from({ length: 3 }).map((_, index) => (
            <LoadingCard key={index} />
          ))
        ) : instagramData?.posts ? (
          // Show actual Instagram posts
          instagramData.posts.map((post: InstagramPost, index: number) => (
            <InstagramEmbed key={index} post={post} />
          ))
        ) : (
          // Show fallback message
          <div className="col-span-full text-center py-12">
            <p className="text-stone-600 font-light">
              No Instagram posts available. Please configure the Instagram API integration.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}