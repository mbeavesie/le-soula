import { useState } from "react";
import { useLanguage } from "@/hooks/use-language";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Mail } from "lucide-react";

export default function ContactSection() {
  const { t } = useLanguage();
  const { ref: headerRef } = useScrollReveal<HTMLDivElement>();
  const { ref: formRef } = useScrollReveal<HTMLDivElement>();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      toast({
        title: t('contact.error'),
        description: t('contact.emailError'),
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        toast({
          title: t('contact.success'),
          description: t('contact.successMessage'),
        });
        setEmail("");
      } else {
        throw new Error('Failed to submit');
      }
    } catch (error) {
      toast({
        title: t('contact.error'),
        description: t('contact.errorMessage'),
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-32 bg-gradient-to-b from-paper to-stone-50/30 border-t border-stone-200/50">
      <div className="container mx-auto px-6 max-w-4xl">
        <div ref={headerRef} className="reveal text-center mb-16">
          <h2 className="font-serif text-5xl md:text-6xl font-light tracking-tight text-gradient mb-6">
            {t('contact.title')}
          </h2>
          <p className="text-xl text-stone-600 max-w-2xl mx-auto font-light leading-relaxed">
            {t('contact.subtitle')}
          </p>
        </div>

        <div ref={formRef} className="reveal">
          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-stone-400 w-5 h-5" />
                <Input
                  type="email"
                  placeholder={t('contact.emailPlaceholder')}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-12 h-14 text-lg rounded-full sophisticated-border bg-white/90 backdrop-blur-sm focus:bg-white transition-all duration-300"
                  required
                />
              </div>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="h-14 px-8 bg-honey-500 hover:bg-honey-600 text-white font-medium rounded-full transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? t('contact.sending') : t('contact.submit')}
              </Button>
            </div>
          </form>
        </div>

        <div className="text-center mt-12 text-stone-500 text-sm">
          <p>{t('contact.privacy')}</p>
        </div>
      </div>
    </section>
  );
}