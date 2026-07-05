/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * PrintButton — Triggers window.print() with a print-only label.
 * Hidden in print output via @media print.
 */

import React from 'react';
import { Printer } from 'lucide-react';

export interface PrintButtonProps {
  className?: string;
  label?: string;
  printLabel?: string;
}

export const PrintButton: React.FC<PrintButtonProps> = ({
  className = '',
  label = 'Print',
  printLabel = 'Print this page'
}) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      <button
        onClick={handlePrint}
        aria-label={printLabel}
        className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border transition-colors hover:opacity-80 focus:outline-none focus-visible:ring-2 ${className}`}
        style={{
          background: 'var(--theme-surface, #fff)',
          borderColor: 'var(--theme-border, #e5e5e5)',
          color: 'var(--theme-fg, #111)',
          '--tw-ring-color': 'var(--theme-accent, #6366f1)'
        } as React.CSSProperties}
      >
        <Printer className="w-4 h-4" aria-hidden="true" />
        <span>{label}</span>
      </button>

      <style>{`
        @media print {
          .print-button, [class*="print-button"] {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
};
