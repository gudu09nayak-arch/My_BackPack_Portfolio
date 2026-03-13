'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Send, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

interface ContactSectionProps {
  title: string;
  phone: string;
  email: string;
  socialLinks: { platform: string; url: string; iconName: string }[];
}

const tripTypes = [
  { value: 'spiritual', label: 'Spiritual' },
  { value: 'beach', label: 'Beach' },
  { value: 'adventure', label: 'Adventure' },
  { value: 'culture', label: 'Culture' },
  { value: 'surprise', label: 'Surprise Me!' },
];

export function ContactSection({ title, phone, email, socialLinks }: ContactSectionProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    tripType: '',
    travelDates: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsSuccess(true);
        setFormData({
          name: '',
          phone: '',
          email: '',
          tripType: '',
          travelDates: '',
          message: '',
        });
      }
    } catch (error) {
      console.error('Failed to submit form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative overflow-hidden bg-white py-24 lg:py-32">
      {/* Decorative Elements */}
      <div className="absolute left-0 top-0 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-50 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-96 w-96 translate-x-1/2 translate-y-1/2 rounded-full bg-orange-50 blur-3xl" />

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
            Get in Touch
          </span>
          <h2 className="mb-6 text-4xl font-bold tracking-tight text-stone-800 md:text-5xl lg:text-6xl">
            {title}
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-stone-600">
            Ready to start your Odisha adventure? Fill out the form below and we&apos;ll get back to you within 24 hours.
          </p>
        </motion.div>

        <div className="mx-auto grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {isSuccess ? (
              <div className="flex h-full flex-col items-center justify-center rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 p-12 text-center">
                <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-r from-amber-500 to-orange-500">
                  <Send className="h-10 w-10 text-white" />
                </div>
                <h3 className="mb-4 text-2xl font-bold text-stone-800">Message Sent!</h3>
                <p className="mb-6 text-stone-600">
                  Thank you for reaching out. We&apos;ll get back to you shortly with your personalized travel plan.
                </p>
                <Button
                  onClick={() => setIsSuccess(false)}
                  variant="outline"
                  className="rounded-full"
                >
                  Send Another Message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Your Name</Label>
                    <Input
                      id="name"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="rounded-xl border-stone-200 bg-stone-50 focus:border-amber-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone / WhatsApp</Label>
                    <Input
                      id="phone"
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                      className="rounded-xl border-stone-200 bg-stone-50 focus:border-amber-500"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="rounded-xl border-stone-200 bg-stone-50 focus:border-amber-500"
                  />
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="tripType">Trip Type</Label>
                    <Select
                      value={formData.tripType}
                      onValueChange={(value) => setFormData({ ...formData, tripType: value })}
                    >
                      <SelectTrigger className="rounded-xl border-stone-200 bg-stone-50 focus:border-amber-500">
                        <SelectValue placeholder="Select trip type" />
                      </SelectTrigger>
                      <SelectContent>
                        {tripTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="travelDates">Estimated Travel Dates</Label>
                    <Input
                      id="travelDates"
                      placeholder="e.g., March 15-20, 2025"
                      value={formData.travelDates}
                      onChange={(e) => setFormData({ ...formData, travelDates: e.target.value })}
                      className="rounded-xl border-stone-200 bg-stone-50 focus:border-amber-500"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Additional Notes (Optional)</Label>
                  <Textarea
                    id="message"
                    placeholder="Tell us about your dream trip..."
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="rounded-xl border-stone-200 bg-stone-50 focus:border-amber-500"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 py-6 text-lg font-semibold text-white shadow-lg shadow-amber-500/25 transition-all hover:shadow-xl hover:shadow-amber-500/30 disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Sending...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Send className="h-5 w-5" />
                      Send Inquiry
                    </span>
                  )}
                </Button>
              </form>
            )}
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col justify-center"
          >
            <div className="rounded-2xl bg-gradient-to-br from-stone-800 to-stone-900 p-8 lg:p-10">
              <h3 className="mb-8 text-2xl font-bold text-white">Direct Contact</h3>

              <div className="space-y-6">
                {/* Phone */}
                <a
                  href={`tel:${phone}`}
                  className="group flex items-start gap-4 transition-opacity hover:opacity-80"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber-500/10">
                    <Phone className="h-6 w-6 text-amber-400" />
                  </div>
                  <div>
                    <p className="mb-1 text-sm text-stone-400">Call Us</p>
                    <p className="text-lg font-medium text-white">{phone}</p>
                  </div>
                </a>

                {/* Email */}
                <a
                  href={`mailto:${email}`}
                  className="group flex items-start gap-4 transition-opacity hover:opacity-80"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber-500/10">
                    <Mail className="h-6 w-6 text-amber-400" />
                  </div>
                  <div>
                    <p className="mb-1 text-sm text-stone-400">Email Us</p>
                    <p className="text-lg font-medium text-white">{email}</p>
                  </div>
                </a>

                {/* Location */}
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber-500/10">
                    <MapPin className="h-6 w-6 text-amber-400" />
                  </div>
                  <div>
                    <p className="mb-1 text-sm text-stone-400">Location</p>
                    <p className="text-lg font-medium text-white">Odisha, India</p>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="mt-10 border-t border-stone-700 pt-8">
                <p className="mb-4 text-sm text-stone-400">Follow us on social media</p>
                <div className="flex gap-4">
                  {socialLinks.map((social) => (
                    <a
                      key={social.platform}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-stone-700 transition-all hover:bg-amber-500"
                    >
                      <span className="text-xs font-bold text-white">
                        {social.platform.charAt(0)}
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
