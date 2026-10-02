"use client";

import Link from "next/link";
import { Shield, Sparkles, ArrowRight, Heart } from "lucide-react";
import { TOOLS } from "@/data/tools";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200/80 bg-white text-slate-600 text-xs sm:text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-10">
          {/* Brand Info & Newsletter */}
          <div className="sm:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-600 flex items-center justify-center shadow-xs">
                <span className="font-mono font-bold text-white text-sm">
                  TT
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-slate-900 tracking-tight text-base">
                  texttools<span className="text-indigo-600">ai</span>
                </span>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-indigo-50 text-indigo-700 border border-indigo-200/80">
                  .org
                </span>
              </div>
            </Link>

            <p className="text-slate-500 text-xs leading-relaxed max-w-sm">
              The high-velocity AI text toolkit designed for creators, software engineers, and growth teams. Transforming and optimizing text at the edge.
            </p>

            {/* System Status Indicator */}
            <div className="inline-flex flex-wrap items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-700">
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="font-mono text-[11px] font-medium">All Systems Operational</span>
              <span className="text-slate-300 font-mono">•</span>
              <span className="text-slate-500 text-[11px] font-mono">Edge US-East / EU-Central</span>
            </div>

            {/* Quick newsletter with mobile-friendly stacking */}
            <div className="pt-2">
              <label className="text-[11px] font-mono uppercase text-slate-500 font-semibold tracking-wider block mb-1.5">
                Get Weekly Prompt & Tool Updates
              </label>
              <form onSubmit={(e) => e.preventDefault()} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 max-w-sm">
                <input
                  type="email"
                  placeholder="engineer@company.com"
                  className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 flex-1 min-h-[40px]"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold transition-colors min-h-[40px] active:scale-95 shadow-xs cursor-pointer"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>

          {/* Column 2: 5 Core Tools */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-900 font-bold">
              5 Core Tools
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-600">
              {TOOLS.map((t) => (
                <li key={t.id}>
                  <Link
                    href={`/tools/${t.id}`}
                    className="hover:text-indigo-600 transition-colors flex items-center justify-between py-0.5"
                  >
                    <span>{t.name}</span>
                    <span className="text-[10px] font-mono text-slate-400">{t.badge}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Platform & Tech */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-900 font-bold">
              Platform & Pages
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-600">
              <li>
                <Link href="/" className="hover:text-indigo-600 transition-colors py-0.5 block">
                  Studio Workspace
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-indigo-600 transition-colors py-0.5 block font-medium">
                  About & Architecture
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-indigo-600 transition-colors py-0.5 block">
                  User Dashboard
                </Link>
              </li>
              <li>
                <Link href="/settings/billing" className="hover:text-indigo-600 transition-colors py-0.5 block">
                  Billing & Settings
                </Link>
              </li>
              <li>
                <Link href="/docs" className="hover:text-indigo-600 transition-colors py-0.5 block">
                  Developer Docs & API
                </Link>
              </li>
              <li>
                <Link href="/#pricing" className="hover:text-indigo-600 transition-colors py-0.5 block">
                  Pricing Plans (Pro)
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Trust & Legal */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-900 font-bold">
              Trust & Legal
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-600">
              <li>
                <Link href="/privacy" className="hover:text-indigo-600 transition-colors py-0.5 block">
                  Zero-Retention Privacy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-indigo-600 transition-colors py-0.5 block">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-indigo-600 transition-colors py-0.5 block">
                  GDPR & CCPA Compliance
                </Link>
              </li>
              <li>
                <Link href="/docs" className="hover:text-indigo-600 transition-colors py-0.5 block">
                  Security Architecture
                </Link>
              </li>
              <li>
                <a href="mailto:support@texttoolsai.org" className="hover:text-indigo-600 transition-colors py-0.5 block">
                  Compliance Contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 sm:pt-12 mt-8 sm:mt-12 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} texttoolsai.org. Built for high-velocity creators. All rights reserved.
          </div>

          <div className="flex items-center gap-5">
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="text-slate-400 hover:text-slate-800 transition-colors p-1"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              aria-label="X (Twitter)"
              className="text-slate-400 hover:text-slate-800 transition-colors p-1"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a
              href="https://discord.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Discord"
              className="text-slate-400 hover:text-slate-800 transition-colors p-1"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.893.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
