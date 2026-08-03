import { useParams, Link } from "wouter";
import { useEffect } from "react";
import { PortableText } from "@portabletext/react";
import { useLanguage } from "@/hooks/use-language";
import { useSeo } from "@/hooks/use-seo";
import { useJournalPost } from "@/hooks/use-cms";
import { ArrowLeft } from "lucide-react";

const components = {
  types: {
    image: ({ value }: { value: { url?: string; alt?: string } }) =>
      value?.url ? (
        <img
          src={value.url}
          alt={value.alt || ""}
          className="w-full rounded-2xl luxury-shadow my-10"
          loading="lazy"
        />
      ) : null,
  },
};

export default function JournalDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { currentLanguage } = useLanguage();
  const { data: post, isLoading } = useJournalPost(slug);

  const lang = currentLanguage as "en" | "fr";
  const title = post?.title?.[lang] || post?.title?.en || "";
  const excerpt = post?.excerpt?.[lang] || post?.excerpt?.en || "";
  const body =
    lang === "fr" ? post?.bodyFr?.length ? post.bodyFr : post?.bodyEn : post?.bodyEn?.length ? post.bodyEn : post?.bodyFr;

  useSeo({
    title: title ? `${title} — Le Soula` : "Journal — Le Soula",
    description: excerpt.slice(0, 200),
    image: post?.image,
    url: `https://www.le-soula.com/journal/${slug}`,
    type: "article",
    locale: lang === "fr" ? "fr_FR" : "en_US",
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.lang = currentLanguage;
  }, [slug, currentLanguage]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-paper">
        <div className="text-stone-500">Loading…</div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-paper">
        <div className="text-center">
          <h1 className="text-2xl font-serif text-ink">
            {lang === "fr" ? "Article introuvable" : "Article not found"}
          </h1>
          <Link href="/#journal" className="mt-4 inline-block text-honey-600 hover:text-honey-700">
            {lang === "fr" ? "Retour au journal" : "Back to the journal"}
          </Link>
        </div>
      </div>
    );
  }

  const date = new Date(post.publishedAt).toLocaleDateString(
    lang === "fr" ? "fr-FR" : "en-US",
    { year: "numeric", month: "long", day: "numeric" }
  );

  return (
    <div className="min-h-screen bg-paper">
      <div className="fixed top-0 left-0 right-0 z-50 bg-paper/95 backdrop-blur-sm border-b border-stone-200/50">
        <div className="max-w-3xl mx-auto px-6 py-4">
          <Link
            href="/#journal"
            className="flex items-center gap-2 text-ink hover:text-honey-600 transition-colors duration-300 group w-fit"
          >
            <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
            <span className="font-medium">Le Soula</span>
          </Link>
        </div>
      </div>

      <article className="pt-28 pb-24">
        <div className="max-w-3xl mx-auto px-6">
          <time className="text-xs text-honey-600 font-medium tracking-widest uppercase">
            {date}
          </time>
          <h1 className="font-serif text-4xl md:text-5xl font-light text-ink mt-4 mb-6 leading-tight">
            {title}
          </h1>
          {excerpt && (
            <p className="text-xl text-stone-600 font-light leading-relaxed mb-10">{excerpt}</p>
          )}
          {post.image && (
            <img
              src={post.image}
              alt={title}
              className="w-full rounded-3xl luxury-shadow mb-12"
            />
          )}
          {body && body.length > 0 && (
            <div className="prose prose-stone prose-lg max-w-none font-light prose-headings:font-serif prose-headings:font-light prose-a:text-honey-600">
              <PortableText value={body} components={components} />
            </div>
          )}
        </div>
      </article>
    </div>
  );
}
