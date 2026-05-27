import { motion } from "framer-motion";
import { Network } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

export function Hero() {
  return (
    <header className="relative isolate overflow-hidden">
      {/* Animated gradient background */}
      <motion.div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(120deg, #0b1e4d 0%, #0070F3 40%, #00B386 100%)",
          backgroundSize: "200% 200%",
        }}
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        }}
        transition={{
          duration: 18,
          ease: "easeInOut",
          repeat: Infinity,
        }}
      />

      {/* Floating blobs */}
      <motion.div
        aria-hidden
        className="absolute -top-24 -left-24 -z-10 h-72 w-72 rounded-full bg-white/20 blur-3xl"
        animate={{ y: [0, 30, 0], x: [0, 20, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="absolute -right-32 top-20 -z-10 h-80 w-80 rounded-full bg-[#00B386]/40 blur-3xl"
        animate={{ y: [0, -25, 0], x: [0, -15, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-12 sm:py-16 md:py-20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-white/90">
            <Network className="h-5 w-5" />
            <span className="text-sm font-semibold tracking-widest uppercase">
              SAP BTP Architecture Tool
            </span>
          </div>
          <ThemeToggle />
        </div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="max-w-4xl text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl lg:text-6xl"
        >
          SAP BTP Architecture Decision Tool
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
          className="max-w-2xl text-base text-white/85 sm:text-lg md:text-xl"
        >
          Choose your scenario, explore a reference architecture, and export a
          professional proposal — all grounded in SAP Business Technology
          Platform best practices.
        </motion.p>
      </div>
    </header>
  );
}

export default Hero;
