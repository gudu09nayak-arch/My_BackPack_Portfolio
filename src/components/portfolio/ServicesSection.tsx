'use client';

import { motion } from 'framer-motion';
import { Map, Hotel, Car, UserCheck, type LucideIcon } from 'lucide-react';

interface Service {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

interface ServicesSectionProps {
  title: string;
  services: Service[];
}

const iconMap: Record<string, LucideIcon> = {
  Map,
  Hotel,
  Car,
  UserCheck,
  Star: Map,
};

export function ServicesSection({ title, services }: ServicesSectionProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section className="relative bg-stone-900 py-24 lg:py-32">
      {/* Decorative Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-1/4 top-0 h-px w-1/2 bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />
        <div className="absolute bottom-0 left-1/3 h-px w-1/3 bg-gradient-to-r from-transparent via-amber-500/20 to-transparent" />
        <div className="absolute -left-20 top-1/4 h-40 w-40 rounded-full bg-amber-500/5 blur-3xl" />
        <div className="absolute -right-20 bottom-1/4 h-60 w-60 rounded-full bg-orange-500/5 blur-3xl" />
      </div>

      <div className="container relative z-10 mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <span className="mb-4 inline-block rounded-full bg-amber-500/10 px-4 py-2 text-sm font-medium text-amber-400">
            What We Offer
          </span>
          <h2 className="mb-6 text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
            {title}
          </h2>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {services.map((service, index) => {
            const IconComponent = iconMap[service.iconName] || Map;
            return (
              <motion.div
                key={service.id}
                variants={cardVariants}
                className="group relative overflow-hidden rounded-2xl border border-stone-700/50 bg-stone-800/50 p-8 backdrop-blur-sm transition-all duration-500 hover:border-amber-500/50 hover:bg-stone-800"
              >
                {/* Number Badge */}
                <div className="absolute right-4 top-4 text-6xl font-bold text-stone-700/30 transition-all duration-300 group-hover:text-amber-500/20">
                  {String(index + 1).padStart(2, '0')}
                </div>

                {/* Icon */}
                <div className="relative mb-6 inline-flex rounded-xl bg-gradient-to-br from-amber-500/10 to-orange-500/10 p-4 transition-all duration-300 group-hover:from-amber-500/20 group-hover:to-orange-500/20">
                  <IconComponent className="h-7 w-7 text-amber-400" strokeWidth={1.5} />
                </div>

                {/* Content */}
                <h3 className="relative mb-3 text-lg font-bold text-white">{service.title}</h3>
                <p className="relative text-sm leading-relaxed text-stone-400">{service.description}</p>

                {/* Hover Gradient */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 to-orange-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
