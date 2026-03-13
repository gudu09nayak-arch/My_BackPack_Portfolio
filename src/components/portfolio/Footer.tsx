'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Heart } from 'lucide-react';

interface FooterProps {
  copyright: string;
  companyName: string;
}

export function Footer({ copyright, companyName }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-stone-900 py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          {/* Logo / Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-2"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-amber-500 to-orange-500">
              <span className="text-xl font-bold text-white">MB</span>
            </div>
            <span className="text-lg font-bold text-white">{companyName}</span>
          </motion.div>

          {/* Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="flex gap-6 text-sm text-stone-400"
          >
            <Link href="/privacy" className="transition-colors hover:text-white">
              Privacy Policy
            </Link>
            <Link href="/terms" className="transition-colors hover:text-white">
              Terms of Service
            </Link>
            <Link href="/admin" className="transition-colors hover:text-white">
              Admin
            </Link>
          </motion.div>

          {/* Copyright */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-1 text-sm text-stone-500"
          >
            <span>© {currentYear} {companyName}.</span>
            <span className="flex items-center gap-1">
              Made with <Heart className="h-3 w-3 fill-red-500 text-red-500" /> in Odisha
            </span>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
