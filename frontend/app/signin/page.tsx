"use client";

import { motion } from "framer-motion";
import { User } from "lucide-react";
import Link from "next/link";

export default function SignInComingSoon() {
  return (
    <main className="w-full min-h-screen flex items-center justify-center bg-[#0b0f14] text-slate-200 px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-xl text-center space-y-6"
      >
        {/* Icon */}
        <div className="flex justify-center">
          <User className="w-16 h-16 text-orange-500" />
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-extrabold">
          Sign In <span className="text-orange-500">Coming Soon</span>
        </h1>

        {/* Subtitle */}
        <p className="text-slate-400 leading-relaxed">
          Our secure sign-in system is under construction. Soon, you’ll be able
          to log in to ZeroML and access all your projects and tools seamlessly!
        </p>

        {/* CTA buttons */}
        <div className="flex justify-center gap-4 pt-4 flex-wrap">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold shadow-lg hover:scale-105 transition-transform"
          >
            Back Home
          </Link>

          <button
            disabled
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-slate-800/60 ring-1 ring-slate-700/40 text-slate-400 font-semibold cursor-not-allowed"
          >
            Sign In (Coming Soon)
          </button>
        </div>

        {/* Optional small footer text */}
        <p className="text-xs text-slate-500 pt-6">
          ETA: Q4 2025 - stay tuned!
        </p>
      </motion.div>
    </main>
  );
}
