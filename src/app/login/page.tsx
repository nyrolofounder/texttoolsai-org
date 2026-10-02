"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { 
  ArrowRight, 
  Lock, 
  Mail, 
  Eye, 
  EyeOff, 
  Sparkles, 
  ShieldCheck, 
  AlertCircle,
  Zap,
  ArrowLeft
} from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import NeonBackgroundOrbs from "@/components/NeonBackgroundOrbs";

export default function LoginPage() {
  const router = useRouter();
  const { signInWithGoogle, signInWithEmail, enterDemoMode } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMessage("Please enter both email and password.");
      return;
    }

    setIsLoading(true);
    setErrorMessage("");

    try {
      const { error } = await signInWithEmail(email, password);
      if (error) {
        setErrorMessage(error.message || "Failed to sign in.");
        setIsLoading(false);
      } else {
        router.push("/dashboard");
      }
    } catch {
      setErrorMessage("An unexpected error occurred. Please try again.");
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setErrorMessage("");
    try {
      const { error } = await signInWithGoogle();
      if (error) {
        setErrorMessage(error.message || "Google authentication failed.");
        setIsLoading(false);
      } else {
        router.push("/dashboard");
      }
    } catch {
      setErrorMessage("Could not connect to Google sign in.");
      setIsLoading(false);
    }
  };

  const handleDemoAccess = () => {
    enterDemoMode();
    router.push("/dashboard");
  };

  return (
    <main className="min-h-screen bg-[#030712] text-white selection:bg-cyan-500/30 selection:text-white relative flex items-center justify-center p-4 sm:p-6 overflow-hidden">
      {/* 3D Volumetric Background Canvas */}
      <NeonBackgroundOrbs />

      {/* Top Left Return Link */}
      <div className="absolute top-4 sm:top-6 left-4 sm:left-6 z-20">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-xs font-medium text-white/80 hover:text-white backdrop-blur-xl transition-all shadow-sm active:scale-95 min-h-[38px]"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to texttoolsai.org</span>
        </Link>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: "spring", stiffness: 400, damping: 26 }}
        style={{
          boxShadow: "0 35px 90px -25px rgba(0, 0, 0, 0.95), 0 0 60px -20px rgba(76, 29, 149, 0.3), inset 0 1px 0 0 rgba(255, 255, 255, 0.16)",
        }}
        className="w-full max-w-md rounded-2xl border border-white/10 bg-[#0b0f19]/80 p-6 sm:p-10 backdrop-blur-xl relative z-10 my-12"
      >
        {/* Top Specular Edge Beam */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/40 via-violet-400/40 to-transparent" />

        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-white/[0.06] border border-white/15 shadow-[0_0_20px_rgba(0,242,254,0.2)] mb-4">
            <span className="font-mono font-bold text-white text-base">
              TT
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight sm:tracking-tighter">
            Welcome Back
          </h1>
          <p className="text-xs sm:text-sm text-white/60 mt-1.5">
            Access your saved transformations & high-velocity studio.
          </p>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-5 p-3 rounded-xl bg-rose-950/40 border border-rose-800/50 flex items-center gap-2.5 text-xs text-rose-300"
          >
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
            <span>{errorMessage}</span>
          </motion.div>
        )}

        {/* Google OAuth Button */}
        <motion.button
          type="button"
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          transition={{ type: "spring", stiffness: 450, damping: 20 }}
          onClick={handleGoogleSignIn}
          disabled={isLoading}
          className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl font-semibold text-xs sm:text-sm text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-white/20 backdrop-blur-xl transition-all shadow-sm"
        >
          {/* Official Google SVG */}
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            />
          </svg>
          <span>Continue with Google</span>
        </motion.button>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-1 border-t border-white/[0.08]" />
          <span className="px-3 text-[11px] font-mono uppercase tracking-wider text-neutral-500">
            or with email
          </span>
          <div className="flex-1 border-t border-white/[0.08]" />
        </div>

        {/* Email & Password Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-neutral-300 mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-500">
                <Mail className="w-4 h-4" />
              </div>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#04040d]/90 border border-white/10 hover:border-white/20 focus:border-cyan-400 focus:outline-none text-xs sm:text-sm text-white placeholder-neutral-600 transition-colors shadow-inner"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-medium text-neutral-300">
                Password
              </label>
              <a
                href="mailto:support@texttoolsai.org?subject=Password%20Reset%20Request"
                className="text-[11px] text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                Forgot password?
              </a>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-500">
                <Lock className="w-4 h-4" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-10 pr-10 py-3 rounded-xl bg-[#04040d]/90 border border-white/10 hover:border-white/20 focus:border-cyan-400 focus:outline-none text-xs sm:text-sm text-white placeholder-neutral-600 transition-colors shadow-inner"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-neutral-500 hover:text-neutral-300"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            whileHover={{ scale: 1.015, y: -1 }}
            whileTap={{ scale: 0.985 }}
            transition={{ type: "spring", stiffness: 450, damping: 20 }}
            disabled={isLoading}
            className="w-full relative group inline-flex items-center justify-center p-[1px] rounded-xl overflow-hidden font-bold text-sm tracking-tight transition-all active:scale-95 shadow-[0_0_25px_rgba(0,242,254,0.3)] hover:shadow-[0_0_35px_rgba(0,242,254,0.5)] mt-2"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-indigo-500 to-violet-500 group-hover:opacity-100 opacity-90 transition-opacity" />
            <span className="relative w-full py-3 px-4 rounded-[11px] bg-[#09090b]/90 group-hover:bg-[#09090b]/75 text-white flex items-center justify-center gap-2 backdrop-blur-xl transition-all">
              <span>{isLoading ? "Signing In..." : "Sign In to Studio"}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </motion.button>
        </form>

        {/* Demo Mode Quick Access Button */}
        <div className="mt-5 pt-4 border-t border-white/[0.08] text-center">
          <button
            type="button"
            onClick={handleDemoAccess}
            className="w-full py-2.5 px-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-cyan-300 text-xs font-mono font-medium flex items-center justify-center gap-2 transition-all shadow-sm active:scale-95"
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Instant Demo Preview (Explore Dashboard)</span>
          </button>
        </div>

        {/* Footer Link */}
        <p className="text-center text-xs text-white/60 mt-6">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="text-cyan-300 hover:text-cyan-200 font-semibold underline underline-offset-4">
            Sign up free
          </Link>
        </p>

        {/* Privacy Note */}
        <div className="mt-6 flex items-center justify-center gap-1.5 text-[11px] font-mono text-neutral-500 text-center">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Zero data retention • Encrypted tokens</span>
        </div>
      </motion.div>
    </main>
  );
}
