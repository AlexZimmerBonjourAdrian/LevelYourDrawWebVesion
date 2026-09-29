'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import type { ThemeClasses } from '@/tokens/themes';

interface DatumCardProps {
  readonly label: string;
  readonly value: React.ReactNode;
  readonly onActivate: () => void;
  readonly actionLabel: string;
  readonly th: ThemeClasses;
  readonly fadeDelay?: number;
  readonly spinning?: boolean;
  readonly locked?: boolean;
  readonly spinDelayMs?: number;
  readonly caption?: string;
  readonly gloss?: string | null;
  readonly glossLabel?: string;
  readonly extra?: string | null;
}

export default function DatumCard({
  label, value, onActivate, actionLabel, th,
  fadeDelay = 0, spinning = false, locked = false, spinDelayMs, caption,
  gloss = null, glossLabel = 'ⓘ', extra = null,
}: DatumCardProps) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.22, delay: fadeDelay }}
      className={`border rounded-[14px] p-5 min-h-[120px] min-w-0 ${th.card} ${locked ? 'border-[#C0392B]' : spinning ? 'slot-spinning' : ''}`}
      style={!locked && spinning && spinDelayMs !== undefined ? { animationDelay: `${spinDelayMs}ms` } : undefined}
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <p className={`text-[11px] uppercase tracking-[0.12em] ${th.faint}`}>{label}</p>
        {gloss && (
          <button
            onClick={() => setOpen((o) => !o)}
            aria-label={glossLabel}
            aria-pressed={open}
            title={glossLabel}
            className={`min-w-[44px] min-h-[44px] -m-2 text-[15px] leading-none ${th.faint}`}
          >
            ⓘ
          </button>
        )}
      </div>
      <button
        onClick={onActivate}
        aria-label={actionLabel}
        title={actionLabel}
        className="block w-full text-left"
      >
        <span className={`font-serif text-[18px] leading-snug ${th.value}`}>{value}</span>
      </button>
      {caption && <p className={`text-[11px] mt-2 ${th.faint}`}>{caption}</p>}
      {gloss && open && <p className={`text-[12px] leading-snug mt-2 ${th.muted}`}>{gloss}</p>}
      {extra && open && <p className={`text-[12px] leading-snug mt-1 italic ${th.muted}`}>{extra}</p>}
    </motion.div>
  );
}
