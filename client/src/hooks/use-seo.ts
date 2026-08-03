import { useEffect } from "react";

interface SeoOptions {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: string;
  locale?: "en_US" | "fr_FR";
}

const DEFAULTS = {
  title: "Le Soula — High-Altitude Organic Wines from the Fenouillèdes",
  description:
    "Le Soula crafts high-altitude organic and biodynamic wines on schist and granite soils in the Fenouillèdes, French Pyrenees.",
  image: "https://www.le-soula.com/og-image.jpg",
  url: "https://www.le-soula.com/",
  type: "website",
  locale: "en_US" as const,
};

function setMetaByName(name: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[name="${name}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute("name", name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setMetaByProperty(property: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[property="${property}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute("property", property);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setCanonical(href: string) {
  let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!link) {
    link = document.createElement("link");
    link.rel = "canonical";
    document.head.appendChild(link);
  }
  link.href = href;
}

export function useSeo(opts: SeoOptions) {
  useEffect(() => {
    const title = opts.title ?? DEFAULTS.title;
    const description = opts.description ?? DEFAULTS.description;
    const image = opts.image ?? DEFAULTS.image;
    const url = opts.url ?? DEFAULTS.url;
    const type = opts.type ?? DEFAULTS.type;
    const locale = opts.locale ?? DEFAULTS.locale;

    document.title = title;
    setMetaByName("description", description);
    setMetaByProperty("og:title", title);
    setMetaByProperty("og:description", description);
    setMetaByProperty("og:image", image);
    setMetaByProperty("og:url", url);
    setMetaByProperty("og:type", type);
    setMetaByProperty("og:locale", locale);
    setMetaByName("twitter:title", title);
    setMetaByName("twitter:description", description);
    setMetaByName("twitter:image", image);
    setCanonical(url);
  }, [opts.title, opts.description, opts.image, opts.url, opts.type, opts.locale]);
}
