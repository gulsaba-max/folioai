/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * ContactFooter — Accessible contact footer with social links, copy-email button, and print styles.
 */

import React, { useState, useCallback } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Mail, Linkedin, Github, Twitter, Copy, Check } from 'lucide-react';

export interface ContactFooterProps {
  email?: string;
  linkedin?: string;
  github?: string;
  twitter?: string;
  name?: string;
}

const socialIconMap: Record<string, React.FC<{ className?: string }>> = {
  linkedin: Linkedin,
  github: Github,
  twitter: Twitter,
  email: Mail
};

export const ContactFooter: React.FC<ContactFooterProps> = ({
  email, linkedin, github, twitter, name = ''
}) => {
  const prefersReducedMotion = useReducedMotion();
  const [copied, setCopied] = useState(false);

  const copyEmail = useCallback(async () => {
    if (!email) return;
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement('textarea');
      textarea.value = email;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [email]);

  const socialLinks = [
    { key: 'email', url: email ? `mailto:${email}` : undefined, label: 'Email', Icon: Mail },
    { key: 'linkedin', url: linkedin, label: 'LinkedIn', Icon: Linkedin },
    { key: 'github', url: github, label: 'GitHub', Icon: Github },
    { key: 'twitter', url: twitter, label: 'Twitter', Icon: Twitter }
  ].filter(link => link.url);

  return (
    <footer
      className="border-t py-10 md:py-14"
      style={{ borderColor: 'var(--theme-border, #e5e5e5)' }}
      role="contentinfo"
      aria-label="Contact and social links"
    >
      <div className="max-w-4xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col gap-1">
          <h3
            className="text-sm font-semibold tracking-wide uppercase"
            style={{ color: 'var(--theme-muted, #666)' }}
          >
            {name ? `Get in touch with ${name}` : 'Get in Touch'}
          </h3>
          {email && (
            <a
              href={`mailto:${email}`}
              className="text-sm font-medium transition-opacity hover:opacity-70"
              style={{ color: 'var(--theme-fg, #111)' }}
              aria-label={`Send email to ${email}`}
            >
              {email}
            </a>
          )}
        </div>

        <div className="flex items-center gap-3">
          {socialLinks.map(({ key, url, label, Icon }) => (
            <motion.a
              key={key}
              href={url}
              target={key !== 'email' ? '_blank' : undefined}
              rel={key !== 'email' ? 'noreferrer noopener' : undefined}
              aria-label={`Visit ${label} profile`}
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 8 }}
              whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={prefersReducedMotion ? {} : { duration: 0.4, delay: 0.05 }}
               className="p-2.5 rounded-full border border-border-subtle transition-colors hover:opacity-80 focus:outline-none focus-visible:ring-2"
               style={{
                  borderColor: 'var(--theme-border, #e5e5e5)',
                  color: 'var(--theme-fg, #111)'
                }}
            >
              <Icon className="w-4 h-4" aria-hidden="true" />
            </motion.a>
          ))}

          {email && (
            <motion.button
              onClick={copyEmail}
              aria-label={copied ? 'Email copied to clipboard' : `Copy ${email} to clipboard`}
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 8 }}
              whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={prefersReducedMotion ? {} : { duration: 0.4, delay: 0.1 }}
               className="p-2.5 rounded-full border border-border-subtle transition-colors hover:opacity-80 focus:outline-none focus-visible:ring-2"
               style={{
                  borderColor: 'var(--theme-border, #e5e5e5)',
                  color: copied ? 'oklch(0.55 0.15 150)' : 'var(--theme-fg, #111)'
                }}
            >
              {copied ? (
                <Check className="w-4 h-4" aria-hidden="true" />
              ) : (
                <Copy className="w-4 h-4" aria-hidden="true" />
              )}
            </motion.button>
          )}
        </div>
      </div>

      <div
        className="max-w-4xl mx-auto px-6 mt-8 pt-6 border-t text-center"
        style={{ borderColor: 'var(--theme-border, #e5e5e5)' }}
      >
        <p
          className="text-xs"
          style={{ color: 'var(--theme-muted, #666)' }}
        >
          {name && `${name} · `}© {new Date().getFullYear()} · All rights reserved
        </p>
      </div>

      <style>{`
        @media print {
          footer { break-inside: avoid; }
        }
      `}</style>
    </footer>
  );
};
