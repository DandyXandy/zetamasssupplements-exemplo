'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import type { CatalogItem } from '@/lib/catalog';
import { ComboCarousel } from './ComboCarousel';

export function FeaturedProducts({ combos, total }: { combos: CatalogItem[]; total: number }) {
  return (
    <>
      <ComboCarousel items={combos} />

      <div className="bg-white px-5 pb-20 sm:px-8 sm:pb-28">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center"
        >
          <Link
            href="/tienda"
            className="inline-flex items-center gap-2 rounded-full border border-tinta/15 px-7 py-3.5 text-sm font-bold uppercase tracking-wide text-tinta transition-colors hover:border-tinta/40"
          >
            Ver catálogo completo ({total} productos)
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </>
  );
}
