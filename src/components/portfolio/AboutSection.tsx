'use client';

import { motion } from 'framer-motion';
import { Landmark, Trees, UtensilsCrossed, type LucideIcon } from 'lucide-react';

interface CorePillar {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

interface AboutSectionProps {
  title: string;
  body: string;
  pillars: CorePillar[];
}

const iconMap: Record<string, LucideIcon> = {
  Landmark,
  Trees,
  UtensilsCrossed,
};

export function AboutSection({ title, body, pillars }: AboutSectionProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-stone-50 to-white py-24 lg:py-32">
      {/* Decorative Elements */}
      <div className="absolute left-0 top-0 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-100/50 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-96 w-96 translate-x-1/2 translate-y-1/2 rounded-full bg-emerald-100/50 blur-3xl" />

      <div className="container relative z-10 mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <span className="mb-4 inline-block rounded-full bg-amber-100 px-4 py-2 text-sm font-medium text-amber-700">
            Our Story
          </span>
          <h2 className="mb-6 text-4xl font-bold tracking-tight text-stone-800 md:text-5xl lg:text-6xl">
            {title}
          </h2>
          <p className="mx-auto max-w-3xl text-lg leading-relaxed text-stone-600">
            {body}
          </p>
        </motion.div>

        {/* Core Pillars */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-8 md:grid-cols-3"
        >
          {pillars.map((pillar) => {
            const IconComponent = iconMap[pillar.iconName] || Landmark;
            return (
              <motion.div
                key={pillar.id}
                variants={itemVariants}
                className="group relative overflow-hidden rounded-2xl bg-white p-8 shadow-lg shadow-stone-100 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
              >
                {/* Icon */}
                <div className="mb-6 inline-flex rounded-xl bg-gradient-to-br from-amber-50 to-orange-50 p-4">
                  <IconComponent className="h-8 w-8 text-amber-600" strokeWidth={1.5} />
                </div>

                {/* Content */}
                <h3 className="mb-3 text-xl font-bold text-stone-800">{pillar.title}</h3>
                <p className="leading-relaxed text-stone-600">{pillar.description}</p>

                {/* Decorative Corner */}
                <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-gradient-to-br from-amber-100 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
