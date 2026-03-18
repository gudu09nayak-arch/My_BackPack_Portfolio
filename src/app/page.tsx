'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  HeroSection,
  AboutSection,
  ServicesSection,
  SneakPeekSection,
  ContactSection,
  Footer,
} from '@/components/portfolio';
import { Loader2 } from 'lucide-react';

interface SiteContent {
  hero_title: string;
  hero_subtitle: string;
  hero_cta_text: string;
  hero_trust_badge: string;
  about_title: string;
  about_body: string;
  services_title: string;
  sneakpeek_title: string;
  sneakpeek_body: string;
  sneakpeek_cta_text: string;
  contact_title: string;
  contact_phone: string;
  contact_email: string;
  footer_copyright: string;
  company_name: string;
}

interface Service {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

interface CorePillar {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

interface HeroSlide {
  id: string;
  imageUrl: string;
  altText: string;
  title: string | null;
  subtitle: string | null;
}

interface UpcomingFeature {
  id: string;
  title: string;
}

interface SocialLink {
  platform: string;
  url: string;
  iconName: string;
}

export default function Home() {
  const [content, setContent] = useState<SiteContent | null>(null);
  const [services, setServices] = useState<Service[]>([]);
  const [pillars, setPillars] = useState<CorePillar[]>([]);
  const [slides, setSlides] = useState<HeroSlide[]>([]);
  const [features, setFeatures] = useState<UpcomingFeature[]>([]);
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch all data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [contentRes, servicesRes, pillarsRes, slidesRes, featuresRes, socialRes] = await Promise.all([
          fetch('/api/content'),
          fetch('/api/services'),
          fetch('/api/core-pillars'),
          fetch('/api/hero-slides'),
          fetch('/api/upcoming-features'),
          fetch('/api/social-links'),
        ]);

        const [contentData, servicesData, pillarsData, slidesData, featuresData, socialData] = await Promise.all([
          contentRes.json(),
          servicesRes.json(),
          pillarsRes.json(),
          slidesRes.json(),
          featuresRes.json(),
          socialRes.json(),
        ]);

        setContent(contentData);
        setServices(servicesData);
        setPillars(pillarsData);
        setSlides(slidesData);
        setFeatures(featuresData);
        setSocialLinks(socialData);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handle waitlist submission
  const handleJoinWaitlist = useCallback(async (email: string) => {
    const response = await fetch('/api/waitlist', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      throw new Error('Failed to join waitlist');
    }
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-stone-900">
        <div className="text-center">
          <Loader2 className="mx-auto h-12 w-12 animate-spin text-amber-500" />
          <p className="mt-4 text-stone-400">Loading your adventure...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      {content && slides.length > 0 && (
        <HeroSection
          title={content.hero_title}
          subtitle={content.hero_subtitle}
          ctaText={content.hero_cta_text}
          trustBadge={content.hero_trust_badge}
          slides={slides}
        />
      )}

      {/* About Section */}
      {content && pillars.length > 0 && (
        <AboutSection
          title={content.about_title}
          body={content.about_body}
          pillars={pillars}
        />
      )}

      {/* Services Section */}
      {content && services.length > 0 && (
        <ServicesSection title={content.services_title} services={services} />
      )}

      {/* Sneak Peek Section */}
      {content && features.length > 0 && (
        <SneakPeekSection
          title={content.sneakpeek_title}
          body={content.sneakpeek_body}
          ctaText={content.sneakpeek_cta_text}
          features={features}
          onJoinWaitlist={handleJoinWaitlist}
        />
      )}

      {/* Contact Section */}
      {content && (
        <ContactSection
          title={content.contact_title}
          phone={content.contact_phone}
          email={content.contact_email}
          socialLinks={socialLinks}
        />
      )}

      {/* Footer */}
      {content && (
        <Footer
          copyright={content.footer_copyright}
          companyName={content.company_name}
        />
      )}
    </main>
  );
}
