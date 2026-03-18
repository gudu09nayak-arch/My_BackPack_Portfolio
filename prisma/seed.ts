import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Site Content
  const siteContent = [
    { key: 'hero_title', value: 'Explore Odisha in Style' },
    { key: 'hero_subtitle', value: 'You work hard all year. It\'s time to let us handle the rest. Discover the rich heritage, vibrant culture, authentic cuisine, and untouched nature of Odisha.' },
    { key: 'hero_cta_text', value: 'Plan My Escape' },
    { key: 'hero_trust_badge', value: 'Proud Co-Partners with MakeMyTrip, Goibibo & Savari' },
    { key: 'about_title', value: 'Explore the Unexplored' },
    { key: 'about_body', value: 'We know how exhausting the yearly grind can be. When you finally get time to travel, you shouldn\'t have to stress about the details. At My Backpack Group of Travels, we specialize in curating premium, hassle-free journeys across Odisha. We don\'t just take you to the famous landmarks; we guide you to the hidden gems, secret beaches, and quiet retreats that only the locals know about.' },
    { key: 'services_title', value: 'Your Journey, Tailored for You' },
    { key: 'sneakpeek_title', value: 'The Future of Travel is Coming Soon' },
    { key: 'sneakpeek_body', value: 'We are currently building a revolutionary, AI-powered travel application designed to put the ultimate Odia adventure right in your pocket.' },
    { key: 'sneakpeek_cta_text', value: 'Join the Waitlist for Early Access' },
    { key: 'contact_title', value: 'Let\'s Cook Your Tour' },
    { key: 'contact_phone', value: '6370769692' },
    { key: 'contact_email', value: 'hello@mybackpacktravels.in' },
    { key: 'footer_copyright', value: '© 2026 My Backpack Group of Travels. All rights reserved.' },
    { key: 'company_name', value: 'My Backpack Group of Travels' },
  ];

  for (const content of siteContent) {
    await prisma.siteContent.upsert({
      where: { key: content.key },
      update: { value: content.value },
      create: content,
    });
  }
  console.log('✅ Site content seeded');

  // Core Pillars
  const corePillars = [
    { title: 'Heritage', description: 'Step back in time at iconic temples and historical sites.', iconName: 'Landmark', order: 1 },
    { title: 'Nature', description: 'Breathe in the tranquility of our secluded beaches and lush landscapes.', iconName: 'Trees', order: 2 },
    { title: 'Culture & Cuisine', description: 'Experience the authentic pulse and flavors of Odisha.', iconName: 'UtensilsCrossed', order: 3 },
  ];

  for (const pillar of corePillars) {
    await prisma.corePillar.upsert({
      where: { id: pillar.title.toLowerCase().replace(/\s+/g, '-') },
      update: pillar,
      create: { id: pillar.title.toLowerCase().replace(/\s+/g, '-'), ...pillar },
    });
  }
  console.log('✅ Core pillars seeded');

  // Services
  const services = [
    { title: 'Customized Tour Packages', description: 'From spiritual retreats to thrilling adventures, we design itineraries based on your exact vibe.', iconName: 'Map', order: 1 },
    { title: 'Premium Stays', description: 'Handpicked hotels, resorts, and homestays that guarantee comfort and luxury.', iconName: 'Hotel', order: 2 },
    { title: 'Reliable Cabs & Transport', description: 'Safe, comfortable, and professional travel throughout your stay in Odisha.', iconName: 'Car', order: 3 },
    { title: 'Local Expert Guides', description: 'Discover the stories behind the scenery with our trusted local specialists.', iconName: 'UserCheck', order: 4 },
  ];

  for (const service of services) {
    await prisma.service.upsert({
      where: { id: service.title.toLowerCase().replace(/\s+/g, '-') },
      update: service,
      create: { id: service.title.toLowerCase().replace(/\s+/g, '-'), ...service },
    });
  }
  console.log('✅ Services seeded');

  // Upcoming Features
  const features = [
    { title: 'AI-Generated Custom Itineraries', order: 1 },
    { title: 'Smart Price Negotiation', order: 2 },
    { title: 'Interactive Traveler Community & Hidden Gem Maps', order: 3 },
  ];

  for (const feature of features) {
    await prisma.upcomingFeature.upsert({
      where: { id: feature.title.toLowerCase().replace(/\s+/g, '-').substring(0, 25) },
      update: feature,
      create: { id: feature.title.toLowerCase().replace(/\s+/g, '-').substring(0, 25), ...feature },
    });
  }
  console.log('✅ Upcoming features seeded');

  // Hero Slides (AI-generated images)
  const heroSlides = [
    { imageUrl: '/images/hero-temple.png', altText: 'Odisha Temple Architecture', title: 'Sacred Heritage', subtitle: 'Ancient temples whispering timeless stories', order: 1 },
    { imageUrl: '/images/hero-beach.png', altText: 'Pristine Beach', title: 'Untouched Beaches', subtitle: 'Where the land meets the endless horizon', order: 2 },
    { imageUrl: '/images/hero-culture.png', altText: 'Cultural Heritage', title: 'Vibrant Culture', subtitle: 'Experience the soul of Odisha', order: 3 },
  ];

  for (const slide of heroSlides) {
    await prisma.heroSlide.upsert({
      where: { id: `slide-${slide.order}` },
      update: slide,
      create: { id: `slide-${slide.order}`, ...slide },
    });
  }
  console.log('✅ Hero slides seeded');

  // Partners
  const partners = [
    { name: 'MakeMyTrip', logoUrl: '/partners/makemytrip.svg', order: 1 },
    { name: 'Goibibo', logoUrl: '/partners/goibibo.svg', order: 2 },
    { name: 'Savari', logoUrl: '/partners/savari.svg', order: 3 },
  ];

  for (const partner of partners) {
    await prisma.partner.upsert({
      where: { id: partner.name.toLowerCase() },
      update: partner,
      create: { id: partner.name.toLowerCase(), ...partner },
    });
  }
  console.log('✅ Partners seeded');

  // Social Links
  const socialLinks = [
    { platform: 'Instagram', url: 'https://instagram.com/mybackpacktravels', iconName: 'Instagram', order: 1 },
    { platform: 'Facebook', url: 'https://facebook.com/mybackpacktravels', iconName: 'Facebook', order: 2 },
    { platform: 'LinkedIn', url: 'https://linkedin.com/company/mybackpacktravels', iconName: 'Linkedin', order: 3 },
  ];

  for (const social of socialLinks) {
    await prisma.socialLink.upsert({
      where: { id: social.platform.toLowerCase() },
      update: social,
      create: { id: social.platform.toLowerCase(), ...social },
    });
  }
  console.log('✅ Social links seeded');

  console.log('🎉 Seeding completed!');
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
