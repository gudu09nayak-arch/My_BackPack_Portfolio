'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Check, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface UpcomingFeature {
  id: string;
  title: string;
}

interface SneakPeekSectionProps {
  title: string;
  body: string;
  ctaText: string;
  features: UpcomingFeature[];
  onJoinWaitlist: (email: string) => Promise<void>;
}

export function SneakPeekSection({ title, body, ctaText, features, onJoinWaitlist }: SneakPeekSectionProps) {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    try {
      await onJoinWaitlist(email);
      setIsSuccess(true);
      setEmail('');
    } catch (error) {
      console.error('Failed to join waitlist:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-stone-900 via-stone-800 to-stone-900 py-24 lg:py-32">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute left-0 top-0 h-full w-full">
          <div className="absolute left-10 top-10 h-72 w-72 rounded-full bg-amber-500/10 blur-3xl" />
          <div className="absolute bottom-10 right-10 h-96 w-96 rounded-full bg-orange-500/10 blur-3xl" />
          <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-500/5 blur-3xl" />
        </div>

        {/* Grid Pattern */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      <div className="container relative z-10 mx-auto px-4">
        <div className="mx-auto max-w-4xl text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full bg-amber-500/10 px-4 py-2"
          >
            <Sparkles className="h-4 w-4 text-amber-400" />
            <span className="text-sm font-medium text-amber-400">Coming Soon</span>
          </motion.div>

          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-6 text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl"
          >
            {title}
          </motion.h2>

          {/* Body */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto mb-12 max-w-2xl text-lg leading-relaxed text-stone-300"
          >
            {body}
          </motion.p>

          {/* Features Checklist */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-12 flex flex-wrap justify-center gap-4"
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                className="flex items-center gap-2 rounded-full border border-stone-700 bg-stone-800/50 px-4 py-2"
              >
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-r from-amber-500 to-orange-500">
                  <Check className="h-3 w-3 text-white" strokeWidth={3} />
                </div>
                <span className="text-sm text-stone-300">{feature.title}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* Waitlist Form */}
          <motion.form
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            onSubmit={handleSubmit}
            className="mx-auto flex max-w-md flex-col gap-3 sm:flex-row"
          >
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-full border-stone-600 bg-stone-800/50 px-6 py-6 text-white placeholder:text-stone-500 focus:border-amber-500"
              required
            />
            <Button
              type="submit"
              disabled={isSubmitting || isSuccess}
              className="group rounded-full bg-gradient-to-r from-amber-500 to-orange-500 px-8 py-6 font-semibold text-white shadow-lg shadow-amber-500/25 transition-all hover:shadow-xl hover:shadow-amber-500/30 disabled:opacity-70"
            >
              {isSuccess ? (
                <span className="flex items-center gap-2">
                  <Check className="h-5 w-5" />
                  Joined!
                </span>
              ) : isSubmitting ? (
                'Joining...'
              ) : (
                <span className="flex items-center gap-2">
                  {ctaText}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              )}
            </Button>
          </motion.form>

          {/* Success Message */}
          {isSuccess && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-4 text-sm text-amber-400"
            >
              🎉 You&apos;re on the list! We&apos;ll notify you when we launch.
            </motion.p>
          )}
        </div>
      </div>
    </section>
  );
}
