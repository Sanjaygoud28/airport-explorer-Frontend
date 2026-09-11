import React from 'react';
import { Link } from 'react-router';
import { Plane, Globe2, Shield, Terminal, ExternalLink, Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="w-full border-t bg-slate-900 text-slate-300 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand & Mission */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-sky-600 text-white">
                <Plane className="h-5 w-5 -rotate-45" />
              </div>
              <span className="font-bold text-lg text-white tracking-tight">
                Airport Explorer
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              A comprehensive global aviation directory and explorer platform. Search, analyze, and visualize airports, runways, coordinates, and cities worldwide.
            </p>
            <div className="flex items-center gap-2 pt-2">
              <span className="inline-flex items-center gap-1 text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800 text-emerald-400 border border-slate-700">
<span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Backend API Connected
              </span>            </div>
          </div>

          {/* Quick Navigation */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider font-mono">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link
                  to="/"
                  className="text-slate-400 hover:text-white transition-colors flex items-center gap-1.5"
                >
                  Home Overview
                </Link>
              </li>
              <li>
                <Link
                  to="/airports"
                  className="text-slate-400 hover:text-white transition-colors flex items-center gap-1.5"
                >
                  Browse Global Airports
                </Link>
              </li>
              <li>
                <Link
                  to="/login"
                  className="text-slate-400 hover:text-white transition-colors flex items-center gap-1.5"
                >
                  Authentication Portal
                </Link>
              </li>
              <li>
                <Link
                  to="/admin"
                  className="text-slate-400 hover:text-white transition-colors flex items-center gap-1.5"
                >
                  Admin Management
                </Link>
              </li>
            </ul>
          </div>

          {/* Featured Hubs */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider font-mono">
              Featured Air Hubs
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link
                  to="/airports/HYD"
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  HYD — Rajiv Gandhi Intl (Hyderabad)
                </Link>
              </li>
              <li>
                <Link
                  to="/airports/DEL"
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  DEL — Indira Gandhi Intl (Delhi)
                </Link>
              </li>
              <li>
                <Link
                  to="/airports/JFK"
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  JFK — John F. Kennedy Intl (New York)
                </Link>
              </li>
              <li>
                <Link
                  to="/airports/LHR"
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  LHR — Heathrow Airport (London)
                </Link>
              </li>
            </ul>
          </div>

         
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} Airport Explorer. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Built with modern web standards & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
